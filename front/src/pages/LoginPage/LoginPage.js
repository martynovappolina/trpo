import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.scss'
import api from '../../shared/api'
import toast from '../../utils/toast'

const LoginPage = () => {
    const navigate = useNavigate()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [loginError, setLoginError]= useState(false)
    const [passwordError, setPasswordError] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            
        }
    }, [])

    const onKeyDown = (e) => {
        if(e.key === 'Enter')
            onSignIn()  
    }

    const onSignIn = () => {
        let error = false

        if (login === '') {
            setLoginError(true)
            error = true
        }

        if (password === '') {
            setPasswordError(true)
            error = true
        }

        if (!error) {
            api.login(login, password)
            .then(resp => {
                if (resp.is_ok) {
                    localStorage.setItem('token', resp.token)
                    window.location = '/menu'
                }
                else {
                    toast.error('Неправильный логин или пароль')
                    setLoginError(true)
                    setPasswordError(true)
                }
            })
        }
    }

    return (
        <div className='login'>
            <div className='login-header'>Вход</div>
            <div className='login-input-container'>
                Введите логин
                <input 
                type='text'
                placeholder='Логин'
                className={`custom-input ${loginError && 'error'}`} 
                onFocus={() => setLoginError(false)}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onKeyDown={onKeyDown}
                />
            </div>
            <div 
            style={{marginBottom: '25px'}}
            className='login-input-container'>
                Введите пароль
                <input 
                type='password'
                placeholder='Пароль'
                className={`custom-input ${passwordError && 'error'}`}
                onFocus={() => setPasswordError(false)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={onKeyDown}
                />
            </div>
            <button
            onClick={onSignIn}
            style={{minWidth: '100px'}} 
            className='button'>
                Войти
            </button>
        </div>
    )
}

export default LoginPage