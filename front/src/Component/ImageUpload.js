export function ImageUpload() {
  return (
    <div className="w-full ">
      <div className="flex justify-center w-full">
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
