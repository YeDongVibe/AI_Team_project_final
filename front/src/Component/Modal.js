import {Div} from './Div'
import {Icon} from './Icon'

// 모달 창 바깥 배경
export const Modal = ({open, className, ...props}) => {
  // open 프롭스로 참 거짓 판별 후 모달 창 닫고 열기
  const modalClassName = ['modal', open ? 'modal-open' : '', className].join(' ')
  return <Div className={modalClassName} {...props}></Div>
}

export const ModalContents = ({className, children, onColseIcon, closeIconClassName, onCloseIconClicked, ...props}) => {
  const ModalContentsClassName = ['modal-box', className].join(' ')

  // 모달 창 오른쪽 위 닫기 버튼 스타일링
  const CloseIconClassName = closeIconClassName
    ? closeIconClassName
    : ['btn', 'btn-info', 'btn-sm', 'btn-outline', 'text-white'].join(' ')

  // 모달 창 닫는 x버튼 생성 할 건지 여부 판단 후 생성 한다면?
  if (onColseIcon) {
    return (
      <Div className={ModalContentsClassName}>
        <Div className="absolute" right="0.5rem" top="0.5rem">
          <Icon name="close" className={CloseIconClassName} onClick={onCloseIconClicked} />
        </Div>
        {children}
      </Div>
    )
  }

  return (
    <Div className={ModalContentsClassName} {...props}>
      {children}
    </Div>
  )
}

// 모달 작업 버튼용 컨테이너
export const ModalAction = ({className, ...props}) => {
  const ModalActionClassName = ['modal-action', className].join(' ')
  return <Div className={ModalActionClassName} {...props}></Div>
}
