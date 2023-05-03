import React from 'react';
import styles from './BotButton.module.scss';

export const BotButton = ({
    img,
    title,
    options,
    miniDescription,
    name,
    setIsBotPageOpen,
    setProps,
}) => {
    return (
        <div
            onClick={() => {
                setIsBotPageOpen((pred) => !pred);
                setProps((pred) => {
                    return { img, title, options, name };
                });
            }}
            className={styles.container}
        >
            <div className={styles.botAvatar}>
                <img src={`/botAvatars/${img}`} alt="" />
                <div className={styles.online}></div>
            </div>
            <div className={styles.text}>
                <h3>{title}</h3>
                <span>{miniDescription}</span>
            </div>
        </div>
    );
};
