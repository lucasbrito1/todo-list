import React from 'react'
import './Modal.sass'

const Modal = ({ show, setClose, taskTrash }) => {
    if (!show) return null;

    return (
        <div onClick={setClose} className="overlay">
            <div onClick={(e) => { e.stopPropagation() }} className="modalContainer">
                <div className="content">
                    <p>Você deseja remover a tarefa?</p>
                </div>
                <div className="btnContent">
                    <button onClick={taskTrash} className='removeBtn'>Remover</button>
                    <button onClick={setClose} className='closeBtn'>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default Modal