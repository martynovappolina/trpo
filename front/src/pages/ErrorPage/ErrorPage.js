import { useNavigate, useRouteError } from 'react-router-dom'
import './ErrorPage.scss'

const ErrorPage = () => {
    const navigate = useNavigate()
    
    return (
        <div className='error-page'>
            <h1>Oops!</h1>
            <p>Что-то пошло не так..</p>
            <p>Мы уже приняли соответствующие меры!</p>
        </div>
    )
}

export default ErrorPage
