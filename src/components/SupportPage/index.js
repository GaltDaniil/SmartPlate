import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { faAngleLeft, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import axios from '../../axios';

import styles from './SupportPage.module.scss';
import { Done } from '../Done';

export const SupportPage = ({ userId }) => {
    const [isChecked, setIsChecked] = React.useState('');
    const [isMessage, setIsMessage] = React.useState('');
    const [isReady, setIsReady] = React.useState(false);
    const [isSended, setIsSended] = React.useState(false);

    React.useEffect(() => {
        if (isChecked && isMessage) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [isChecked, isMessage]);

    const sendMessage = async () => {
        const params = {
            userId,
            userMessage: isMessage,
            type: isChecked,
        };
        await axios.post('/users/sendSupport', params);
    };

    return (
        <>
            <div className={styles.menuBar}>
                <Link to={'/'}>
                    <FontAwesomeIcon color="white" icon={faAngleLeft} size="sm" />
                </Link>

                <h2 style={{ color: 'white', fontSize: '20px' }}>Обратная связь</h2>
                <FontAwesomeIcon style={{ opacity: '0' }} icon={faCircleQuestion} size="lg" />
            </div>
            {!isSended ? (
                <div className={styles.container}>
                    <h3>Выберите один из вариантов</h3>
                    <ul>
                        <li>
                            <input
                                onClick={() => {
                                    setIsChecked('1');
                                }}
                                checked={isChecked === '1' ? true : false}
                                type="checkbox"
                            />
                            <span>Возникла проблема</span>
                        </li>
                        <li>
                            <input
                                onClick={() => {
                                    setIsChecked('2');
                                }}
                                checked={isChecked === '2' ? true : false}
                                type="checkbox"
                            />
                            <span>Предложения по улучшению сервиса</span>
                        </li>
                        <li>
                            <input
                                onClick={() => {
                                    setIsChecked('3');
                                }}
                                checked={isChecked === '3' ? true : false}
                                type="checkbox"
                            />
                            <span>Оставить отзыв и впечатления</span>
                        </li>
                        <textarea
                            className={styles.textarea}
                            onChange={(e) => {
                                setIsMessage(e.target.value);
                            }}
                            name="textarea"
                            id=""
                            cols="40"
                            rows="8"
                        ></textarea>
                        <button
                            onClick={() => {
                                sendMessage();
                                setIsSended(true);
                            }}
                            className={styles.sendBtn}
                            disabled={isReady ? false : true}
                        >
                            Отправить
                        </button>
                    </ul>
                </div>
            ) : (
                <Done page="support" />
            )}
        </>
    );
};
