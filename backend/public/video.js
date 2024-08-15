import React from "react";
import videotcc from "../img/videotcc.mp4";
import './styles.css';

function Video() {
    return (
    <div className='video-container'>
            <div className="video">
        <video src={videotcc} autoPlay loop muted />
    </div>
        </div>
        )
}

export default Video;