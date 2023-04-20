import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Recipt.module.scss';
import { useTelegram } from '../../hooks/useTelegram';
import axios from '../../axios.js';
import { Loader } from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Done } from '../Done';

export const Recipt = ({ tokens }) => {
    const [tg] = useTelegram();

    const [text, setText] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        if (text /*  && tokens > 0 */) {
            setIsDisable(false);
        }
        if (!text /*  && tokens > 0 */) {
            setIsDisable(true);
        }
    }, [text]);

    const sendToServer = async () => {
        setIsLoading(true);
        const user = tg.initDataUnsafe.user;
        const userId = user.id;
        //const userId = '299602933';

        await axios.post('/users/sendGpt', {
            userId,
            requestText,
        });
        tg.close();
        setIsLoading(false);
    };

    const requestText = `Напиши два варианта рецептов из ${text}. Распиши алгоритм готовки и конечное количество калорий`;
    //const requestText = `В моем холодильнике есть ${text}. Что можно приготовить из этих продуктов?`;

    return (
        <div>
            {isLoading ? (
                <Done />
            ) : (
                <div className={styles.container}>
                    <div className={styles.menuBar}>
                        <Link to={'/'}>
                            <FontAwesomeIcon
                                color="white"
                                onClick={() => {}}
                                icon={faAngleLeft}
                                size="sm"
                            />
                        </Link>

                        <h2 style={{ color: 'white', fontSize: '20px' }}>Подбор рецептов</h2>
                        <FontAwesomeIcon
                            style={{ opacity: '0' }}
                            icon={faCircleQuestion}
                            size="lg"
                        />
                    </div>
                    <div className={styles.field}>
                        <h3>Теперь посмотрим, что есть в твоем холодильнике...</h3>
                        <span>
                            Добавьте ингридиенты через запятую в формате "Куриное филе, картофель,
                            сметана..."
                        </span>

                        <input
                            type="text"
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                        ></input>

                        {/* <button
                            onClick={() => setInputFields([...inputFields, { value: '' }])}
                            className={styles.addIngredient}
                        >
                            +
                        </button> */}

                        <button
                            disabled={isDisable ? true : false}
                            onClick={() => {
                                sendToServer();
                            }}
                        >
                            Сгенерировать рецепты
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
