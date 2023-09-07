import React, {useState, useRef} from 'react'
import axios from 'axios'

export const FileUpload = () => {
  const fileRef = useRef()
  const [fileName, setFileName] = useState('')

  // 서버 url 호출 시
  // process.env.REACT_APP_Server_URL 사용

  const handleUpload = async () => {
    const file = fileRef.current.files[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
     let url = 'http://localhost:8080/file';

      // fetch data
      await axios.post(url,formData)
            .then((resp)=> console.log('upload success',resp.data));
      // console.log(response.data); // Upload 결과 확인
    } catch (error) {
      console.error('Upload error:', error);
    }
  }

  const handleFileChange = () => {
    if (fileRef.current.files.length > 0) {
      const selectedFileName = fileRef.current.files[0].name
      setFileName(selectedFileName)
    } else {
      setFileName('')
    }
  }

  return (
    <div className="w-full ">
      <div className='flex justify-center w-full'>
        <label htmlFor="file" className="flex items-center w-3/5 pl-4 bg-gray-300 border border-gray-200 text-xm ">
          {fileName ? fileName : '파일 찾기'}
       </label>
        <button className="p-4 ml-10 text-white btn btn-info btn-xm" onClick={handleUpload}>
          업로드
        </button>
      </div>
      <input type="file" id="file" ref={fileRef} className="hidden" onChange={handleFileChange} />
    </div>
  )
}
