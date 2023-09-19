import {useEffect, useState} from 'react'
import {Modal, ModalContents, ModalAction} from '../../Component'
import {getCookie} from '../../util'
import axios from 'axios'

export function ImageModal({open, setOpen, id}) {
  const [fetchImg, setFetchImg] = useState(null)
  const [caption, setCaption] = useState('')

  const onCloseIconClicked = () => {
    setOpen(false)
  }

  useEffect(() => {
    const formData = new FormData()
    fetch(`${process.env.REACT_APP_SERVER_URL}/find/images/${id}`)
      .then(response => response.blob())
      .then(blob => {
        const imgurl = URL.createObjectURL(blob)
        setFetchImg(imgurl)

        fetch(`${process.env.REACT_APP_SERVER_URL}/find/imagename`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setCaption(data[id - 1][1])
          })
          .catch(error => error.message)

        // formData.append('img', blob)
        // for (const [key, value] of formData.entries()) {
        //   console.log('key: ', key, 'value: ', value)
        // }
        //error
        // fetch(`${process.env.REACT_APP_SERVER_URL}/manager/prediction/put_image`, {
        //   method: 'post',
        //   body: formData
        // })
        //   .then(response => console.log(response.text()))
        //   .then(data => console.log(data))
        //   .catch(error => console.error(error))

        // axios
        //   .post(`${process.env.REACT_APP_SERVER_URL}/manager/prediction/put_image`, formData)
        //   .then(response => console.log(response.data))
        //   .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }, [id])

  const ImgDownloadClick = () => {
    //   // 이미지 다운로드 URL 생성
    //   const downloadUrl = `${process.env.REACT_APP_SERVER_URL}/public/download/${imgFileName}`
    //   // 새 탭 열기
    //   const newTab = window.open(downloadUrl, '_blank')
    //   // 새 탭이 열린 후 이미지가 다운로드되면 새 탭을 닫기
    //   newTab.onload = () => {
    //     newTab.close()
    //   }
  }

  return (
    <Modal open={open} className="flex justify-center w-screen h-screen">
      <ModalContents className="relative w-full h-3/5" onColseIcon={true} onCloseIconClicked={onCloseIconClicked}>
        <div className="mt-6">
          <img src={fetchImg} alt="" />
        </div>
        <ModalAction className="w-full">
          {/* <a href="http://localhost:8080/public/download/Wimple_2023_08_17_10_13_00.png" className=""> */}
          <button className="text-white btn btn-success" onClick={ImgDownloadClick}>
            이미지 다운로드
          </button>
          {/* </a> */}
          <div className="absolute w-full text-xl font-semibold text-center bottom-16">{caption}</div>
        </ModalAction>
      </ModalContents>
    </Modal>
  )
}
