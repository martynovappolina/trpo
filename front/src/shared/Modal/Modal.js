import './Modal.scss'

const Modal = ({ children, buttons, open, setOpen, header, width, additionFooterLabal, className }) => {

    if (open) {
      return <div 
      onClick={(e) => { 
        e.stopPropagation()
      }} 
      className='modal-wrapper'>
        <div onClick={(e) => {e.stopPropagation()}} style={{width: width}} className={'modal ' + (className ?? '')}>
            <div className='modal-header'>
              {header}
            </div>
            <div className='modal-content'>
              {children}
            </div>
            {
              buttons &&
              <div className='modal-footer'>
                <div className='addition-labal'>{additionFooterLabal}</div>
                {buttons}
              </div>
            }
            <div
            onClick={() => setOpen(false) }
            className='modal-close-icon'
            />
        </div>
      </div>
    }
  
    return null
}

export default Modal;