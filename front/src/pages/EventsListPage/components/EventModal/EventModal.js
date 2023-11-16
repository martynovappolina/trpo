import { useEffect, useState } from 'react'
import Modal from '../../../../shared/Modal/Modal'
import api, { apiBaseUrl } from '../../../../shared/api'
import './EventModal.scss'
import CustomCheckbox from '../../../../shared/CustomCheckbox/CustomCheckbox'
import CustomTextArea from '../../../../shared/CustomTextArea/CustomTextArea'

const EventModal = ({currentItemId, setCurrentItemId}) => {
    const [dateTime, setDateTime] = useState('')
    const [imgID, setImgID] = useState('')
    const [note, setNote] = useState('')
    const [isImportant, setIsImportant] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if (currentItemId !== null) {
            api.getEventById(currentItemId)
            .then(resp => {
                setDateTime(resp.data.dateTime)
                setImgID(resp.data.imgID)
                setNote(resp.data.note)
                setIsImportant(resp.data.isImportant)
    
                setLoading(false)
            })
        }
    }, [currentItemId])

    return (
        <Modal
        header='Редактирование отчета'
        open={currentItemId !== null} setOpen={(open)=>{if(!open) setCurrentItemId(null)}}
        buttons={[
            <button className='button'>Сохранить</button>
        ]}
        >
            <div className='event-modal'>
                
                <div style={{display: 'flex'}}>
                    {!loading ? <img src={`${apiBaseUrl}api/events/getImage?imageId=${imgID}`} /> : ''}
                    <div>
                        <CustomCheckbox label='Важно' value={isImportant} setValue={setIsImportant} />
                        <CustomTextArea label='Комментарий' value={note} setValue={setNote} />      
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default EventModal