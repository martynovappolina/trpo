import './DateTimeComponent.scss'
import moment from 'moment'

const DateTimeComponent = ({date}) => {
    const dateTime = moment(date)

    return (
    <>
        <div>{dateTime.format('DD.MM.YYYY')}</div>
        <div style={{color: 'gray'}}>{dateTime.format('HH:mm')}</div>
    </>
    )
}

export default DateTimeComponent