import React from "react";
import imagem2 from "../img/imagem2.mp4";
import './styles.css';

function Imagem2() {
    return (
    <div className='imagem2-container'>
            <div className="imagem2">
        <video src={imagem2} autoPlay loop muted/>
    </div>
        </div>
        )
}

export default Imagem2;