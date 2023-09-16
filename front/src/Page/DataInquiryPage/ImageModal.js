import {useEffect} from 'react'
import {Modal, ModalContents, ModalAction} from '../../Component'

export function ImageModal({open, setOpen, date, time}) {
  const onCloseIconClicked = () => {
    setOpen(false)
  }

  useEffect(() => {
    console.log('date: ', date)
    console.log('time: ', time)

    const imgFileName = `Wimple_${date[0]}_${date[1]}_${date[2]}_${time[0]}_${time[1]}_${time[2]}.png`
    // fetch(`${process.env.REACT_APP_SERVER_URL}/images/${imgFileName}`)
    fetch(`${process.env.REACT_APP_SERVER_URL}/images/Wimple_2023_08_17_10_13_00.png`)
      .then(response => response.blob())
      .then()
      .catch()
  }, [date, time])

  return (
    <Modal open={open} className="flex justify-center w-full h-screen">
      <ModalContents className="w-2/3 h-2/3" onColseIcon={true} onCloseIconClicked={onCloseIconClicked}>
        <div className=""></div>
      </ModalContents>
      <ModalAction></ModalAction>
    </Modal>
  )
}
