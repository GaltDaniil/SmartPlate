//@ts-ignore
import styles from './MessageCard.module.scss';
import React from 'react';
import { UserData } from '../../../../types';

export const MessageCard: React.FC<UserData> = ({ userName, messages }) => {
    return (
        <div className={styles.container}>
            <h3>{userName}</h3>
            <p>{messages![0].message}</p>
            <span>{messages![0].date}</span>
            <button></button>
        </div>
    );
};
