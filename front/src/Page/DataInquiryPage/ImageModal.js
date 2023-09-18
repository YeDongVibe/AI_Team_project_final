import {useEffect, useState} from 'react'
import {Modal, ModalContents, ModalAction} from '../../Component'

export function ImageModal({open, setOpen, date, time}) {
  const [fetchImg, setFetchImg] = useState(null)
  const imgFileName = `Wimple_${date[0]}_${date[1]}_${date[2]}_${time[0]}_${time[1]}_${time[2]}.png`

  const onCloseIconClicked = () => {
    setOpen(false)
  }

  useEffect(() => {
    console.log('date: ', date)
    console.log('time: ', time)

    // fetch(`${process.env.REACT_APP_SERVER_URL}/images/${imgFileName}`)
    fetch(`${process.env.REACT_APP_SERVER_URL}/images/${imgFileName}`)
      .then(response => response.blob())
      .then(blob => {
        const imgurl = URL.createObjectURL(blob)
        setFetchImg(imgurl)
      })
      .catch(error => error.message)
  }, [date, time])

  const ImgDownloadClick = () => {
    // 이미지 다운로드 URL 생성
    const downloadUrl = `${process.env.REACT_APP_SERVER_URL}/public/download/${imgFileName}`

    // 새 탭 열기
    const newTab = window.open(downloadUrl, '_blank')

    // 새 탭이 열린 후 이미지가 다운로드되면 새 탭을 닫기
    newTab.onload = () => {
      newTab.close()
    }
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
