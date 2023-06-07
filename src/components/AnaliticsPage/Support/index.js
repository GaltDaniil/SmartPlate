import React from 'react';
import { MessageCard } from '../components/MessageCard';

import styles from './Support.module.scss';

export const Support = ({ accounts }) => {
    return (
        <div>
            {accounts
                .filter((el) => el.messages.length > 0)
                .map((el) => {
                    return <MessageCard {...el} />;
                })}
        </div>
    );
};
