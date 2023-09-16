import {useEffect} from 'react'
import {Modal, ModalContents, ModalAction} from '../../Component'

export function ImageModal({open, setOpen}) {
  const onCloseIconClicked = () => {
    setOpen(false)
  }

  const imgFileName = 'Wimple_'

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/images/{filename}`)
      .then(response => response.blob())
      .then()
      .catch()
  }, [])

  return (
    <Modal open={open} className="flex justify-center w-full h-screen">
      <ModalContents className="w-2/3 h-2/3" onColseIcon={true} onCloseIconClicked={onCloseIconClicked}>
        <div className=""></div>
      </ModalContents>
      <ModalAction></ModalAction>
    </Modal>
  )
}
