import styles from './Main.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const Main = ({ tokens, diets }) => {
    return (
        <div className={styles.container}>
            <img src="./plate.png" alt="" />
            <div className={styles.shape}>
                <div className={styles.info}>
                    <div style={{ display: 'flex' }}>
                        <h3>Запросов осталось:</h3>
                        <span>{tokens}</span>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <h3>Рационов составлено:</h3>
                        <span>{diets}</span>
                    </div>
                </div>
                <Link to={'/form'} className={styles.button}>
                    Новый рацион
                </Link>
                <Link to={'/pay'} className={styles.button}>
                    Добавить запросов
                </Link>
                <Link to={'/info'} className={styles.button}>
                    Инструкция
                </Link>
            </div>
        </div>
    );
};
