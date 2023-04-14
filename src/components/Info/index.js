import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import styles from './Info.module.scss';

export const Info = () => {
    return (
        <>
            <div className={styles.menuBar}>
                <Link to={'/'}>
                    <FontAwesomeIcon
                        color="white"
                        onClick={() => {}}
                        icon={faAngleLeft}
                        size="sm"
                    />
                </Link>

                <h2 style={{ color: 'white', fontSize: '20px' }}>Инструкция</h2>
                <FontAwesomeIcon style={{ opacity: '0' }} icon={faCircleQuestion} size="lg" />
            </div>
            <div className={styles.content}>
                <h3> О технологии.</h3>
                <p>
                    Для составления рационов мы используем алгоритмы основанные на на огромной базе
                    данных, научных иследованиях и работе команды нутрициологов.
                </p>
                <h3>Как пользоваться.</h3>
                <p>
                    Для сосотавления уникализированных рационов мы используем ваши данные и личные
                    предпочтения. Чем больше данных вы нам предоставите, тем более точно и
                    эффективно будет подобран рацион. Поля помеченные звездочкой "*" обязательны для
                    заполнения. Это самые важние характеристики от которых мы будем отталкиваться
                    при составлении рациона. Так же вы можете включать дополнительные поля, если
                    имеете более точную информацию о состоянии здоровья, личных предпочтениях и
                    требуемом объеме каллорий и процентном соотношении БЖУ.
                </p>
            </div>
        </>
    );
};
