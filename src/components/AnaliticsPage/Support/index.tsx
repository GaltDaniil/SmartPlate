import React from 'react';
import { MessageCard } from '../components/MessageCard';

import { UserData } from '../../../types';

interface SupportProps {
    accounts: UserData[];
}

export const Support: React.FC<SupportProps> = ({ accounts }) => {
    return (
        <div>
            {accounts
                .filter((el) => el.messages!.length > 0)
                .map((el) => {
                    return <MessageCard {...el} />;
                })}
        </div>
    );
};
