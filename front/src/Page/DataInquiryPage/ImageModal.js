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
    fetch(`${process.env.REACT_APP_SERVER_URL}/images/Wimple_2023_08_17_10_13_00.png`)
      .then(response => response.blob())
      .then(blob => {
        const imgurl = URL.createObjectURL(blob)
        setFetchImg(imgurl)
      })
      .catch(error => error.message)
  }, [date, time])

  const ImgDownloadClick = () => {
    let a = document.createElement('a')
    a.href = `http://localhost:8080/public/download/Wimple_2023_08_17_10_13_00.png`
    a.download = `${imgFileName}.png` // 파일명을 원하는대로 변경하세요.
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
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
