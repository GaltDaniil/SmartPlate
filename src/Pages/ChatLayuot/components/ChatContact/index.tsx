import { Avatar, List } from 'antd';
import React from 'react';
//@ts-ignore
import styles from './ChatContact.module.scss';

interface IChatContactProps {
    id: string;
    created_at: Date;
    update_at: Date;
    type: string;
    name?: string;
    avatar?: string;
    fromUrl?: string;
    setActiveChatId: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ChatContact: React.FC<IChatContactProps> = (props) => {
    const changeChatId = () => {
        console.log('клик');
        //@ts-ignore
        props.setActiveChatId((pred) => props.id);
    };
    return (
        <>
            <List.Item
                className={styles.item}
                style={{ padding: '12px 10px' }}
                key={props.id}
                onClick={() => {
                    changeChatId();
                }}
            >
                <List.Item.Meta
                    avatar={<Avatar size="large" src={props.avatar ? props.avatar : ''} />}
                    title={<a href="">{props.type === 'beeChat' ? 'Онлайн чат' : props.name}</a>}
                    description={props.name}
                />
            </List.Item>
        </>
    );
};
