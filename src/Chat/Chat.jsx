import styles from './Chat.module.css';

const Chat = ({ state }) => {
    console.log(state.users)
    return <section className={styles.chat_section}>
        <div className={styles.chat_wrapper}>
            <div className={styles.aside}>
                <h2 className={styles.users_online}>Онлайн {state.users.length}</h2>
                <ul className={styles.users_list}>
                    {state.users.map((name, index) => {
                        return  <li key={name + index} className={styles.user}>
                        <p className={styles.user_name}>{name}</p>
                    </li>
                    })}
                   
                </ul>
            </div>
            <div className={styles.chat}>
                <div className={styles.chat_area}>
                    <ul className={styles.messages_list}>
                        <li className={styles.message}>
                            <div className={styles.message_wrapper}>
                            <p className={styles.message_text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique architecto molestiae sunt eveniet placeat blanditiis quibusdam animi laborum reprehenderit suscipit ipsum mollitia eaque, excepturi, modi soluta necessitatibus iusto voluptate in!</p>
                                </div>
                                <span className={styles.message_author}>Пользователь 1</span>
                                
                        </li>
                           <li className={styles.message}>
                            <div className={styles.message_wrapper}>
                            <p className={styles.message_text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique architecto molestiae sunt eveniet placeat blanditiis quibusdam animi laborum reprehenderit suscipit ipsum mollitia eaque, excepturi, modi soluta necessitatibus iusto voluptate in!</p>
                                </div>
                                <span className={styles.message_author}>Пользователь 1</span>
                                
                        </li>
                    </ul>
                </div>
                <div className={styles.input_area}>
                    <textarea className={styles.textarea} cols="3" />
                    <button className={styles.send_btn}>Отправить</button>
                </div>
            </div>
        </div>
    </section>
}

export default Chat;