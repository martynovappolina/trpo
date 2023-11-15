import { uuidv4 } from "./uuidv4";

export const displayTime = 8000;

const toast = () => {
    const generateToast = (text, status) => {
        let id = uuidv4()
        let toastContainer = document.getElementsByClassName("toast-container")[0];
        let el = document.createElement('div');           
        el.id = id;
        el.innerHTML = `<div 
        data-timeleft="${displayTime}"
        onmouseover="document.getElementById('${el.id}').children[0].classList.add('mouse-over')" 
        onmouseleave="document.getElementById('${el.id}').children[0].classList.remove('mouse-over')"
        class="toast ${status}"> 
            <div class="toast-icon-${status}"></div>
            <div class="toast-progress-bar"></div> 
            <div>${text}</div>
            <div onclick="document.getElementById('${el.id}').remove()" class="toast-close-icon"></div>
        </div>`
        toastContainer.appendChild(el);
    }

    const success = (text) => {
        generateToast(text, 'success')
    }

    const error = (text) => {
        generateToast(text, 'error')
    }

    return { 
        success: success,
        error: error
    }
}

export default toast()