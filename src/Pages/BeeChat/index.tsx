import React from 'react';
//import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';
//import socket from '../../socket';

import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import { ChatFrameMessage } from './components/ChatFrameMessage';

//@ts-ignore
import styles from './beeChat.module.scss';
import socket from '../../socket';
import axios from 'axios';

/* interface IChatData {
    id: number;
    name: string;
    avatar: string;
    messages: any[];
} */
//@ts-ignore
/* const fish: IChatData[] = [
    {
        id: 1,
        name: 'Пупсик Cообщения',
        avatar: '123',
        messages: [
            {
                name: 'Неизвестный хер',
                fromClient: true,
                message: 'Привет, как дела',
                sended_at: new Date('2023-06-12T15:30:00'),
            },
            {
                name: 'Менеджер',
                fromClient: false,
                message: 'Тебя ебет',
                sended_at: new Date('2023-06-12T15:32:00'),
            },
            {
                name: 'Неизвестный хер',
                fromClient: true,
                message: 'Ээ, че базаришь шакал',
                sended_at: new Date('2023-06-12T15:33:00'),
            },
            {
                name: 'Менеджер',
                fromClient: false,
                message: 'Пошел в пизду пидорас!',
                sended_at: new Date('2023-06-12T15:34:00'),
            },
        ],
    },
    { id: 2, name: 'Пупсик Пупсичек', avatar: '123', messages: [] },
    { id: 3, name: 'Пупсик Пупсичек', avatar: '123', messages: [] },
    { id: 4, name: 'Пупсик Пупсичек', avatar: '123', messages: [] },
    { id: 5, name: 'Пупсик Пупсичек', avatar: '123', messages: [] },
    { id: 6, name: 'Пупсик Пупсичек', avatar: '123', messages: [] },
    { id: 7, name: 'Пупсик Пупсичек', avatar: '123', messages: [] },
]; */

/* const fish2 = [
    {
        message: 'Мы онлайн! Задайте ваш вопрос в чате',
        fromClient: true,
        sended_at: new Date('2023-06-12T15:34:00'),
    },
    {
        message: 'ergergdrgergsxdrgsergsdrgsergsdr',
        fromClient: false,
        sended_at: new Date('2023-06-12T15:35:00'),
    },
    {
        message:
            'Здравствуйте!) Наш отдел заботы спешит к вам на помощь. \n  А пока менеджер подключается - напишите ваш номер телефона и мессенджер в котором удобней вам ответить, иначе после закрытия сайта мы вас потеряем)',
        fromClient: true,
        sended_at: new Date('2023-06-12T15:36:00'),
    },
    { message: '4 сообщение', fromClient: false, sended_at: new Date('2023-06-12T15:37:00') },
    { message: '5 сообщение', fromClient: false, sended_at: new Date('2023-06-12T15:38:00') },
    { message: '6 сообщение', fromClient: true, sended_at: new Date('2023-06-12T15:39:00') },
    {
        message:
            'Здравствуйте!) Наш отдел заботы спешит к вам на помощь. \n  А пока менеджер подключается - напишите ваш номер телефона и мессенджер в котором удобней вам ответить, иначе после закрытия сайта мы вас потеряем)',
        fromClient: true,
        sended_at: new Date('2023-06-12T15:39:00'),
    },
]; */

export const BeeChat: React.FC = () => {
    const [text, setText] = React.useState('');

    const [isOpenChat, setIsOpenChat] = React.useState(false);
    const [isOpenMessengers, setIsOpenMessengers] = React.useState(true);
    const [beechat_session, setBeechat_session] = React.useState('');
    const [messages, setMessages] = React.useState([] as any[]);
    //const [fromUrl, setFromUrl] = React.useState('');

    const contentDivRef = React.useRef(null);
    const urlParams = new URLSearchParams(window.location.search);
    const account_id = urlParams.get('userId');

    React.useEffect(() => {
        socket.on('message', (data) => {
            setMessages((pred) => [...pred, data]);
        });
        /* socket.on('get', (data) => {
            setMessages((pred) => data.rows);
        }); */
        /* const currentPage = window.location.href;
        window.parent.postMessage({ currentPage }, '*');
        window.addEventListener('message', (event) => {
            setFromUrl((pred) => event.data);
        }); */
        return () => {
            socket.close();
        };
    }, [beechat_session]);

    React.useEffect(() => {
        if (contentDivRef.current) {
            //@ts-ignore
            contentDivRef.current.scrollTop = contentDivRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        await axios.post('http://localhost:8080/api/beechat/send', {
            account_id,
            chat_id: beechat_session,
        });
        socket.emit('message', { text, beechat_session, from_client: true });
        setText((pred) => '');
    };

    const openChat = async () => {
        let beechat_session = window.localStorage.getItem('beechat_session');
        if (!beechat_session) {
            beechat_session = uuidv4();
            window.localStorage.setItem('beechat_session', beechat_session!);
            socket.emit('create', { account_id, beechat_session });

            await axios.post('http://localhost:8080/api/beechat/create', {
                account_id,
                chat_id: beechat_session,
                from: 'beeChat',
            });
        }
        setBeechat_session((pred) => beechat_session!);

        const { data } = await axios.get(
            `http://localhost:8080/api/beechat/messages?chat_id=${beechat_session}`,
        );
        setMessages((prev) => data);
        socket.emit('join', { account_id, beechat_session });
        setIsOpenChat((pred) => true);
        setIsOpenMessengers((pred) => true);
    };

    const openWidgets = () => {
        setIsOpenChat((pred) => false);
        setIsOpenMessengers((pred) => true);
    };

    const closeAll = () => {
        setIsOpenChat((pred) => false);
        setIsOpenMessengers((pred) => false);
    };

    const textAreaSize = (value: string) => {
        if (value.length >= 30 && value.length <= 59)
            return `${styles.textarea60} ${styles.textarea}`;
        else if (value.length >= 60 && value.length <= 89)
            return `${styles.textarea80} ${styles.textarea}`;
        else if (value.length >= 90 && value.length <= 119)
            return `${styles.textarea100} ${styles.textarea}`;
        else if (value.length >= 120 && value.length <= 149)
            return `${styles.textarea120} ${styles.textarea}`;
        else if (value.length >= 150 && value.length <= 179)
            return `${styles.textarea140} ${styles.textarea}`;
        else if (value.length >= 180 && value.length <= 209)
            return `${styles.textarea160} ${styles.textarea}`;
        else if (value.length >= 210) return `${styles.textarea180} ${styles.textarea}`;
        else {
            return `${styles.textarea}`;
        }
    };

    return !isOpenMessengers && !isOpenChat ? (
        <div className={styles.btnPosition}>
            <button className={styles.messengerBtn} onClick={() => openWidgets()}>
                123
            </button>
        </div>
    ) : isOpenMessengers && !isOpenChat ? (
        <div className={styles.btnPosition}>
            <button
                className={
                    isOpenMessengers
                        ? `${styles.messengerBtn} ${styles.telegram_btn}`
                        : `${styles.messengerBtn}`
                }
                onClick={() => openChat()}
            >
                Чат
            </button>
            <button
                className={
                    isOpenMessengers
                        ? `${styles.messengerBtn} ${styles.telegram_btn}`
                        : `${styles.messengerBtn}`
                }
                onClick={() => {}}
            >
                Вотс
            </button>
            <button
                className={
                    isOpenMessengers
                        ? `${styles.messengerBtn} ${styles.telegram_btn}`
                        : `${styles.messengerBtn}`
                }
                onClick={() => {}}
            >
                Теле
            </button>
            <button className={styles.messengerBtn} onClick={() => closeAll()}>
                Х
            </button>
        </div>
    ) : (
        <div className={styles.app}>
            <div className={styles.header}>
                <div>
                    <img src="./logo192.png" alt="" />
                    <p>Имя менеджера</p>
                </div>

                <CloseOutlined onClick={() => closeAll()} className={styles.close_chat} />
            </div>
            <div className={styles.space}>
                <div ref={contentDivRef} className={styles.content}>
                    {messages.map((el, index) => (
                        <ChatFrameMessage key={index} {...el} />
                    ))}
                </div>
            </div>
            <div className={styles.input}>
                <textarea
                    value={text}
                    onChange={(e) => setText((pred) => e.target.value)}
                    className={textAreaSize(text)}
                    placeholder="Написать сообщение..."
                    name=""
                    id=""
                    rows={2}
                ></textarea>
                <SendOutlined onClick={() => sendMessage()} className={styles.send} />
            </div>
        </div>
    );
};
