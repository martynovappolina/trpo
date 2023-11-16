import { useEffect, useRef, useState } from 'react'
import './CustomTextArea.scss'

const CustomTextArea = ({
    autoHeigth=false, 
    disabled=false, 
    placeholder,
    value, 
    setValue,
    error=false,
    label,
    setError=()=>{},
    onFocusLeave=()=>{},
    type
}) => {
    const [heigthForAutoHeigth, setHeigthForAutoHeigth] = useState(62);
    let inputRef = useRef()

    useEffect(()=>{
        if(inputRef.current.scrollHeight != 0)
            setHeigthForAutoHeigth(inputRef.current.scrollHeight);
    }, [value])

    return (
        <div className='textarea-container'>
            <div className='textarea-label'>{label}</div>
            <textarea 
            type={type ?? ''}
            ref={inputRef}
            placeholder={placeholder}
            disabled={disabled} 
            className={`custom-input ${error ? 'error': ''}`} 
            value={value}
            onFocus={()=>setError(false)}
            onBlur={onFocusLeave}
            onChange={(e) => setValue(e.target.value)}
            style={{height: autoHeigth ? heigthForAutoHeigth + 'px' : 'auto'}}
            />
        </div>
    )
}

export default CustomTextArea