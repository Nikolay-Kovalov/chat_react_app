import React, { useState } from "react";
import styles from './JoinSection.module.css';
import axios from "axios";
// import socket from "../socket";

const JoinSection = ({ isLogged }) => {


    const [roomId, setRoomId] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    const handleRoomIdChange = (evt) => {
        setRoomId(evt.currentTarget.value)
    }

    const handleNameChange = (evt) => {
        setName(evt.currentTarget.value)
    }

    const handleSubmitForm = async (evt) => {
        evt.preventDefault();
        if (!roomId || !name) {
            return alert("Input fields can't be empty" )
        }
        const obj = {
            roomId,
            name 
        }
        setIsLoading(true)
      await  axios.post('/rooms', obj)
        isLogged(obj)
       
    }


    return <section className={styles.join_section}>
        <form className={styles.join_form} onSubmit={handleSubmitForm}>
            <input onChange={handleRoomIdChange} value={roomId} placeholder="RoomID" className={styles.input} type="text" name="roomId" id="" />
            <input onChange={handleNameChange} value={name} placeholder="Ваше имя" className={styles.input} type="text" name="name" id="" />
            <button className={styles.submit_btn}>{isLoading ? 'ВХОД...' : 'ВОЙТИ'}</button>
        </form>
    </section>
}

export default JoinSection;