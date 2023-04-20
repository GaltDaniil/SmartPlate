import styles from './Main.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Pay } from '../Pay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCoins,
    faSheetPlastic,
    faMessage,
    faAngleLeft,
    faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';

export const Main = ({ tokens, diets, userId, isLoading }) => {
    const [payIsOpen, setPayIsOpen] = React.useState(false);

    return (
        <>
            <div className={styles.menuBar}>
                <h2 style={{ color: 'white', fontSize: '20px' }}>Smart Diet AI</h2>
            </div>
            <div className={styles.container}>
                {/* <h2 className={styles.title}>
                Составь <b>Идеальный</b>
                <br />
                <b>Рацион</b> Питания
            </h2> */}

                <div className={styles.shape}>
                    <div className={styles.info}>
                        <h2>Статистика</h2>
                        <div style={{ display: 'flex' }}>
                            <h3>Баланс токенов:</h3>
                            <span>{tokens}</span>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <h3>Рационов составлено:</h3>
                            <span>{diets}</span>
                        </div>
                    </div>
                    <Link to={'/form'} className={styles.dietRacions}>
                        <img src="./dietRacions.png" alt="" />
                        <div>
                            <h3>Рацион питания для похудения</h3>
                            <span></span>
                        </div>
                    </Link>
                    <Link className={styles.massRacions}>
                        <img src="./massRacions.png" alt="" />
                        <div>
                            <h3>Рацион питания для набора массы</h3>
                            <span></span>
                        </div>
                    </Link>
                    <Link to={'/recipt'} className={styles.recipt}>
                        <img src="./recipt.png" alt="" />
                        <div>
                            <h3>Генератор рецептов из ваших продуктов</h3>
                            <span></span>
                        </div>
                    </Link>
                    {/* <Link to={'/form'} className={styles.mainButton}>
                    Новый рацион
                </Link>
                <Link to={'/recipt'} className={styles.mainButton}>
                    Собрать рецепт
                </Link> */}
                    <div className={styles.buttons}>
                        <Link
                            onClick={() => setPayIsOpen((pred) => !pred)}
                            className={styles.button}
                        >
                            <FontAwesomeIcon icon={faCoins} size="lg" />
                            <span>Добавить токены</span>
                        </Link>

                        <Link to={'/info'} className={styles.button}>
                            <FontAwesomeIcon icon={faSheetPlastic} size="lg" />
                            <span>Инструкция и советы</span>
                        </Link>
                        <Link to={'/support'} className={styles.button}>
                            <FontAwesomeIcon icon={faMessage} size="lg" />
                            <span>Обратная связь</span>
                        </Link>
                    </div>
                    <span className={styles.version}>Версия 1.2.1</span>

                    {payIsOpen ? <Pay userId={userId} setPayIsOpen={setPayIsOpen} /> : null}
                </div>
            </div>
        </>
    );
};
