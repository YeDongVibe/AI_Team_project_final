import {Modal, ModalContents, ModalAction} from '../../Component'

export function ImageModal({open}) {
  return (
    <Modal open={open} className="flex justify-center w-full h-screen">
      <ModalContents className="w-2/3 h-2/3" onColseIcon={true} onCloseIconClicked={!open}></ModalContents>
      <ModalAction></ModalAction>
    </Modal>
  )
}
