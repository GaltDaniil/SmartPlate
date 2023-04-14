import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Recipt.module.scss';
import { useTelegram } from '../../hooks/useTelegram';
import axios from '../../axios.js';
import { Loader } from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircleQuestion, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Recipt = ({ tokens }) => {
    const [tg] = useTelegram();

    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [inputFields, setInputFields] = useState([{ value: '' }]);

    /* React.useEffect(() => {
        if (products && tokens > 0) {
            setIsReady(true);
        }
    }, [products]); */

    const sendToServer = async () => {
        setIsReady(false);
        setIsLoading(true);
        const user = tg.initDataUnsafe.user;
        const userId = user.id;
        await axios.post('/users/gptRecipt/', {
            userId,
            requestText,
        });
        tg.close();
        setIsLoading(false);
    };

    const concat = inputFields.reduce((acc, el) => {
        return acc + `${el.value}, `;
    }, '');

    const requestText = `Напиши варианты рецептов из следующих продуктов:
    ${concat}
  `;

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
        setInputFields(values);
    };

    return (
        <div>
            {isLoading ? (
                <Loader />
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
                            Добавьте ингридиенты в формате "Куринная грудка 200 грамм" или
                            "Авокадо". Каждый продукт добавляйте в новое поле.
                        </span>
                        {inputFields.map((inputField, index) => {
                            return (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        key={index}
                                        type="text"
                                        value={inputField.value}
                                        onChange={(event) => handleInputChange(index, event)}
                                    ></input>
                                    <FontAwesomeIcon
                                        className={styles.delete}
                                        icon={faTrash}
                                        size="lg"
                                    />
                                </div>
                            );
                        })}

                        <button
                            onClick={() => setInputFields([...inputFields, { value: '' }])}
                            className={styles.addIngredient}
                        >
                            +
                        </button>

                        <button
                            disabled={isReady ? false : true}
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
