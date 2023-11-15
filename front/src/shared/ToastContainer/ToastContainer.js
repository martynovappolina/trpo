import './ToastContainer.scss'
import { useEffect } from 'react'
import { displayTime } from '../../utils/toast'

const ToastContainer = () => {
    useEffect (() => {
        const refreshInterval = 20
        const intervalId = setInterval(() => {
            let toasts = document.getElementsByClassName('toast')

            for (let i = 0; i < toasts.length; i++) {
                if (toasts[i].classList.contains('mouse-over')) continue
                
                let timeLeft = parseInt(toasts[i].dataset.timeleft)
                timeLeft -= refreshInterval
                toasts[i].dataset.timeleft = timeLeft 

                const progressBar = toasts[i].getElementsByClassName('toast-progress-bar')[0]
                progressBar.style.width=`${(timeLeft/displayTime)*100}%`;

                if (timeLeft <= 0) toasts[i].remove()
            }
        }, refreshInterval)
        
        return () => clearInterval(intervalId)
    }, [])

    return (
        <div className='toast-container'>
            
        </div>
    )
}

export default ToastContainer