import CustomCheckbox from '../../shared/CustomCheckbox/CustomCheckbox'
import DateTimeComponent from '../../shared/DateTimeComponent/DateTimeComponent'
import GridTable from '../../shared/GridTable/GridTable'
import api from '../../shared/api'
import './EventsListPage.scss'

const EventsListPage = () => {
    return (
        <div className='container'>
            <div className='events-list-page'>
                <GridTable 
                load={api.getEventsByOrganizationID}
                columns={[
                    {
                        title: 'Изображение',
                        content: val => val.imgID
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
        </div>
    )
}

export default EventsListPage