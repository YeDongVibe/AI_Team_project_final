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
    fetch(`${process.env.REACT_APP_SERVER_URL}/find/images/${id}`)
      .then(response => response.blob())
      .then(blob => {
        const imgurl = URL.createObjectURL(blob)
        setFetchImg(imgurl)

        fetch(`${process.env.REACT_APP_SERVER_URL}/find/imagename`)
          .then(response => response.json())
          .then(data => {
            setCaption(data[id - 1][1])
          })
          .catch(error => error.message)
      })
      .catch(error => console.error(error))
  }, [id])

  return (
    <Modal open={open} className="flex justify-center w-screen h-screen">
      <ModalContents className="relative w-full h-3/5" onColseIcon={true} onCloseIconClicked={onCloseIconClicked}>
        <div className="mt-6">
          <img src={fetchImg} alt="" />
        </div>
        <ModalAction className="w-full">
          <div className="absolute w-full text-3xl font-semibold text-center bottom-16">{caption}</div>
        </ModalAction>
      </ModalContents>
    </Modal>
  )
}
