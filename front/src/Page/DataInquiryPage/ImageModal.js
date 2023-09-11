import {Modal, ModalContents, ModalAction} from '../../Component'

export function ImageModal({open}) {
  return (
    <Modal open={open} className="w-full h-screen">
      <ModalContents className="" onColseIcon={true} onCloseIconClicked={!open}></ModalContents>
      <ModalAction></ModalAction>
    </Modal>
  )
}
