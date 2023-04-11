import styles from './Main.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Pay } from '../Pay';

export const Main = ({ tokens, diets, userId }) => {
    const [payIsOpen, setPayIsOpen] = React.useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.circle}></div>
            <h2 className={styles.title}>
                Составь <b>Идеальный</b>
                <br />
                <b>Рацион</b> Питания
            </h2>
            <img className={styles.image} src="./blackPlate.png" alt="" />
            <div className={styles.shape}>
                <div className={styles.info}>
                    <h2>Статистика</h2>
                    <div style={{ display: 'flex' }}>
                        <h3>Запросов осталось:</h3>
                        <span>{tokens}</span>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <h3>Рационов составлено:</h3>
                        <span>{diets}</span>
                    </div>
                </div>
                <Link to={'/form'} className={styles.mainButton}>
                    Новый рацион
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link
                        onClick={() => setPayIsOpen((pred) => !pred)}
                        to={''}
                        className={styles.button}
                    >
                        Добавить запросов
                    </Link>

                    <Link to={'/info'} className={styles.button}>
                        Инструкция
                    </Link>
                </div>

                {payIsOpen ? <Pay userId={userId} setPayIsOpen={setPayIsOpen} /> : null}
            </div>
        </div>
    );
};
