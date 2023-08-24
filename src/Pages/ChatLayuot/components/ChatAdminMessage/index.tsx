import React from 'react';
//@ts-ignore
import styles from './ChatMessage.module.scss';
import { CheckOutlined } from '@ant-design/icons';
import moment from 'moment';

interface IProps {
    name: string;
    fromClient: boolean;
    text: string;
    sended_at: Date;
}

export const ChatAdminMessage: React.FC<IProps> = (props) => {
    return (
        <div
            className={
                props.fromClient
                    ? `${styles.messageShape} ${styles.client}`
                    : `${styles.messageShape} ${styles.manager}`
            }
        >
            <div className={styles.message}>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.text}>{props.text}</div>
            </div>
            <div className={styles.time}>
                <div>{moment(props.sended_at).format('HH:mm')}</div>
                <CheckOutlined />
            </div>
        </div>
    );
};
