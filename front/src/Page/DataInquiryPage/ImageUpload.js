import {useRef, useState} from 'react'
import axios from 'axios'

export function ImageUpload() {
  const imgRef = useRef(null)

  const [imgFile, setImgFile] = useState([])
  const [imageName, setImageName] = useState('')

  // 이미지 미리보기
  const saveImgFile = () => {
    const files = imgRef.current?.files
    if (files) {
      const imgPreview = []
      setImgFile([])
      // 각 이미지 파일에 대해 루프를 돌며 미리보기 URL을 생성합니다
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setImageName(file.name)
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
          const result = reader.result
          if (typeof result === 'string') {
            imgPreview.push(result)

            // 모든 이미지 파일의 미리보기 URL이 준비되면 상태 업데이트를 통해 화면에 표시할 수 있습니다.
            if (imgPreview.length === files.length) {
              setImgFile(imgPreview)
            }
          }
        }
      }
    }
  }

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ab], {type: mimeString})
  }

  // 이미지 업로드 버튼 클릭 시
  const ImgUploadClicked = () => {
    if (imgFile.length === 0) {
      console.error('이미지를 선택해주세요.') // 예외 처리
      return
    }
    console.log(dataURItoBlob(imgFile[0]))
    // const imageName = 'myImage.png'
    const formData = new FormData()
    formData.append('imageFile', dataURItoBlob(imgFile[0]), imageName)

    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1])
    // }

    // for (let i = 0; i < imgFile.length; i++) {
    //   formData.append('imageFile', imgFile[i])
    // }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/manager/files/image`, formData)
      .then(response => {
        console.log(response.data)
        alert('이미지 업로드가 완료 되었습니다.')
      })
      .catch(error => {
        console.error(error)
      })
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
