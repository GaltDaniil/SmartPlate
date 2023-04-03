import styles from './Main.module.scss';
import React from 'react';

export const Main = () => {
    return (
        <div className={styles.container}>
            <img src="./plate.png" alt="" />
            <div className={styles.shape}>
                <div className={styles.info}>
                    <div style={{ display: 'flex' }}>
                        <h3>Запросов осталось:</h3>
                        <span>2</span>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <h3>Рационов составлено:</h3>
                        <span>0</span>
                    </div>
                </div>
                <button>Новый рацион</button>
                <button>Добавить запросов</button>
                <button>Инструкция</button>
            </div>
        </div>
    );
};
