import {useEffect, useState} from 'react'
import {Modal, ModalContents, ModalAction} from '../../Component'

export function ImageModal({open, setOpen, id}) {
  const [fetchImg, setFetchImg] = useState(null)

  const onCloseIconClicked = () => {
    setOpen(false)
  }

  useEffect(() => {
    const formData = new FormData()

    console.log(id)
    fetch(`${process.env.REACT_APP_SERVER_URL}/find/images/${id}`)
      .then(response => response.blob())
      .then(blob => {
        formData.append('img', blob)
        console.log(blob)
        const imgurl = URL.createObjectURL(blob)
        setFetchImg(imgurl)
      })
      .catch(error => error.message)

    // fetch(`${process.env.REACT_APP_SERVER_URL}/manager/prediction/put_image`, {
    //   method: 'post',
    //   body: {
    //     img: formData
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => error.message)
  }, [id])

  const ImgDownloadClick = () => {
    // 이미지 다운로드 URL 생성
    // const downloadUrl = `${process.env.REACT_APP_SERVER_URL}/public/download/${imgFileName}`
    // 새 탭 열기
    // const newTab = window.open(downloadUrl, '_blank')
    // 새 탭이 열린 후 이미지가 다운로드되면 새 탭을 닫기
    // newTab.onload = () => {
    //   newTab.close()
    // }
  }

  return (
    <Modal open={open} className="flex justify-center w-screen h-screen">
      <ModalContents className="w-full h-3/5" onColseIcon={true} onCloseIconClicked={onCloseIconClicked}>
        <div className="mt-6">
          <img src={fetchImg} alt="" />
        </div>
        <ModalAction>
          {/* <a href="http://localhost:8080/public/download/Wimple_2023_08_17_10_13_00.png" className=""> */}
          <button className="text-white btn btn-success" onClick={ImgDownloadClick}>
            이미지 다운로드
          </button>
          {/* </a> */}
        </ModalAction>
      </ModalContents>
    </Modal>
  )
}
