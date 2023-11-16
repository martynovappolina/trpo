import { useEffect, useState } from 'react'
import Modal from '../../../../shared/Modal/Modal'
import api, { apiBaseUrl } from '../../../../shared/api'
import './EventModal.scss'
import CustomCheckbox from '../../../../shared/CustomCheckbox/CustomCheckbox'
import CustomTextArea from '../../../../shared/CustomTextArea/CustomTextArea'
import toast from '../../../../utils/toast';

const EventModal = ({currentItemId, setCurrentItemId, setReloadTrigger, reloadTrigger}) => {
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

    const onSave = () => {
        api
        .updateEvent(currentItemId, note, isImportant)
        .then(res => {
            if (res.is_ok) {
                setReloadTrigger(!reloadTrigger)
                setCurrentItemId(null)
    
                toast.success('Изменения успешно сохранены')
            }
        })
    }

    return (
        <Modal
        header='Редактирование отчета'
        open={currentItemId !== null} setOpen={(open)=>{if(!open) setCurrentItemId(null)}}
        buttons={[
            <button onClick={onSave} className='button'>Сохранить</button>
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