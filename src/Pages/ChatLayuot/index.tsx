import React from 'react';
//@ts-ignore
import { Layout, Avatar, List, message } from 'antd';
import socket from '../../socket';
//@ts-ignore
import styles from './ChatLayout.module.scss';
import { ChatAdminMessage } from './components/ChatAdminMessage';
//import { ChatContact } from './components/ChatContact';
import axios from 'axios';
import { ChatContact } from './components/ChatContact';

const { Sider, Content } = Layout;
//@ts-ignore
interface IChatData {
    id: number;
    name: string;
    avatar: string;
    messages: any[];
}

export const ChatLayuot = () => {
    const [activeChatId, setActiveChatId] = React.useState(null);
    const [messages, setMessages] = React.useState([]);
    const [chats, setChats] = React.useState([] as any[]);

    const [text, setText] = React.useState('');

    React.useEffect(() => {
        const fx = async () => {
            const { data } = await axios.get(`http://localhost:8080/api/beechat/`);
            console.log(data);
            setChats((pred) => data);
        };
        fx();
        socket.on('get', (data) => {});
        socket.on('message_up', (data) => {
            //@ts-ignore
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    React.useEffect(() => {
        const fx = async () => {
            console.log('изменения массива сообщений');
            const result = await axios.get(
                `http://localhost:8080/api/beechat/messages?chat_id=${activeChatId}`,
            );
            console.log(result);
            //@ts-ignore
            console.log(result.data);
            //@ts-ignore
            setMessages((pred) => result.data.reverse());
            socket.emit('join', { beechat_session: activeChatId });
        };
        fx();
    }, [activeChatId]);

    const sendMessage = async () => {
        socket.emit('message', { beechat_session: activeChatId, text });
        /* await axios.post(
            `http://localhost:8080/api/beechat/send`, {text, fromClient: false, }
        ); */
    };

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    width={180}
                    style={{ background: '#fff', padding: '0 20px', border: '1px solid #eee' }}
                >
                    <List>
                        <List.Item>Новые</List.Item>
                        <List.Item>Отвеченные</List.Item>
                        <List.Item>В архиве</List.Item>
                    </List>
                </Sider>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        width={250}
                        style={{ background: '#fff', padding: '0 0px', border: '1px solid #eee' }}
                    >
                        <List>
                            {chats
                                ? chats.map((e) => (
                                      <ChatContact setActiveChatId={setActiveChatId} {...e} />
                                  ))
                                : ''}
                        </List>
                    </Sider>
                    <Content>
                        <div className={styles.content}>
                            <div className={styles.chatSpace}>
                                {messages
                                    ? messages.map((el) => (
                                          //@ts-ignore
                                          <ChatAdminMessage {...el} />
                                      ))
                                    : ''}
                            </div>
                            <div className={styles.inputHolder}>
                                <textarea
                                    onChange={(e) => {
                                        setText((pred) => e.target.value);
                                    }}
                                    value={text}
                                    cols={60}
                                    rows={5}
                                ></textarea>
                                <button onClick={sendMessage}>Send</button>
                            </div>
                        </div>
                    </Content>
                    {/* <Sider></Sider> */}
                </Layout>
            </Layout>
        </>
    );
};
