import { useState } from 'react'
import CustomCheckbox from '../../shared/CustomCheckbox/CustomCheckbox'
import DateTimeComponent from '../../shared/DateTimeComponent/DateTimeComponent'
import GridTable from '../../shared/GridTable/GridTable'
import api, { apiBaseUrl } from '../../shared/api'
import './EventsListPage.scss'
import EventModal from './components/EventModal/EventModal'

const EventsListPage = () => {
    const [currentEventID, setCurrentEventID] = useState(null)
    const [reloadTrigger, setReloadTrigger] = useState(false)

    return (
        <div className='container'>
            <div className='events-list-page'>
                <GridTable 
                load={api.getEventsByOrganizationID}
                onRowClick={row => {setCurrentEventID(row.eventID)}}
                reloadTrigger={reloadTrigger}
                columns={[
                    {
                        title: 'Изображение',
                        style: {width: '120px'},
                        content: val => <img src={`${apiBaseUrl}api/events/getImage?imageId=${val.imgID}&preview=true`} />
                    },
                    {
                        title: 'Дата и время',
                        content: val => <DateTimeComponent date={val.dateTime} />
                    },
                    {
                        title: 'Адрес камеры',
                        content: val => val.cameraAddress
                    },
                    {
                        title: 'Расположение камеры',
                        content: val => val.cameraLocation
                    },
                    {
                        title: 'Комментарий',
                        content: val => val.note
                    },
                    {
                        title: 'Важность',
                        content: val => <CustomCheckbox value={val.isImportant} />
                    },
                ]}
                />
            </div>

            <EventModal
            currentItemId={currentEventID}
            setCurrentItemId={setCurrentEventID}
            reloadTrigger={reloadTrigger}
            setReloadTrigger={setReloadTrigger}
            />
        </div>
    )
}

export default EventsListPage