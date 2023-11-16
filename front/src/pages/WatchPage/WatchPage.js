import { useEffect } from 'react';
import './WatchPage.scss'
import api from '../../shared/api';

const WatchPage = () => {
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
            let video = document.getElementById('video')
            video.srcObject = stream;
            video.play();
        });
    }, [])
    const takePhoto = () => {
        let canvas = document.getElementById('canvas')
        let context = canvas.getContext('2d');
        let video = document.getElementById('video')
        context.drawImage(video, 0, 0, 640, 480);
        var data = canvas.toDataURL();
        api
            .sendPhoto(data)
    }

    return (
        <div className='container'>
            <div className='watch-page'>
            <video id="video" width="640" height="480" autoplay></video>
            <button id="click-photo" onClick={takePhoto}>Зафиксировать</button>
            <canvas id="canvas" width="640" height="480"></canvas>
            </div>
        </div>
    )
}

export default WatchPage