import './CustomCheckbox.scss'

const CustomCheckbox = ({ label, value, setValue=()=>{}, onClick }) => {
    return (
        <div 
        onClick={(e) => {
            e.stopPropagation()
            if (onClick) onClick()
            else if (setValue) setValue(!value)
        }}
        className={`custom-checkbox ${value ? ' checked' : ''}`}>
            <input type='checkbox' value={value} />
            <div className='custom-checkbox-label'>{label}</div>
        </div> 
    )
}

export default CustomCheckbox