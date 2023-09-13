import {useRef, useState} from 'react'

export function ImageUpload() {
  const imgRef = useRef(null)

  const [imgFile, setImgFile] = useState('')

  // 이미지 미리보기
  const saveImgFile = () => {
    const files = imgRef.current?.files
    console.log('file: ', files)
    if (files) {
      const imgPreview = []

      // 각 이미지 파일에 대해 루프를 돌며 미리보기 URL을 생성합니다
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
          const result = reader.result
          if (typeof result === 'string') {
            imgPreview.push(result)

            // 모든 이미지 파일의 미리보기 URL이 준비되면 상태 업데이트를 통해 화면에 표시할 수 있습니다.
            if (imgPreview.length === files.length) {
              console.log(imgPreview)
              setImgFile(imgPreview)
            }
          }
        }
      }
    }
  }

  // 이미지 업로드 버튼 클릭 시
  const ImgUploadClicked = () => {
    console.log(imgFile[0])

    const formData = new FormData()
    formData.append('imageFile', imgFile[0])

    // for (let i = 0; i < imgFile.length; i++) {
    //   formData.append('imageFile', imgFile[i])
    // }
    // fetch(`${process.env.REACT_APP_SERVER_URL}/image`, {
    fetch(`http://localhost:8080/image`, {
      method: 'post',
      body: formData
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch(err => console.error(err.message))
  }

  return (
    <div className="flex flex-col justify-center w-full itmes-center">
      <div className="flex justify-center w-full">
        <input type="file" multiple accept="image/*" id="Img" ref={imgRef} onChange={saveImgFile} />
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex justify-center mt-4">
          {imgFile &&
            imgFile.length > 0 &&
            imgFile.map((imgUrl, index) => <img key={index} src={imgUrl} alt={`이미지 ${index}`} />)}
        </div>
      </div>

      <div className="flex justify-evenly">
        <button className="mt-6 mr-10 text-white btn btn-success" onClick={ImgUploadClicked}>
          등록하기
        </button>
      </div>
    </div>
  )
}
