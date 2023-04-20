import React from 'react';
import styles from './Pay.module.scss';
import axios from '../../axios.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

export const Pay = ({ setPayIsOpen, userId }) => {
    const [value, setValue] = React.useState(10);
    const [bonus, setBonus] = React.useState(0);
    const [price, setPrice] = React.useState(99);

    const handleSliderChange = (e) => {
        const newValue = parseInt(e.target.value, 10); // преобразуем значение в число
        setValue(newValue); // обновляем значение ползунка
        if (newValue > 20 && newValue <= 40) {
            setBonus(2);
        } else if (newValue > 40 && newValue < 60) {
            setBonus(4);
        } else if (newValue >= 60 && newValue < 80) {
            setBonus(7);
        } else if (newValue >= 80 && newValue < 100) {
            setBonus(10);
        } else if (newValue === 100) {
            setBonus(15);
        } else {
            setBonus(0);
        }
        setPrice((pred) => newValue * 10 - 1);
    };

    const pay = function (cost) {
        // eslint-disable-next-line no-undef
        var widget = new cp.CloudPayments();

        widget.pay(
            'auth', // или 'charge'
            {
                //options
                publicId: 'pk_1ae4c5b6c3d7d278f36e9e18db6ee', //id из личного кабинета
                description: 'Пополнить баланс запросов', //назначение
                amount: cost, //сумма
                currency: 'RUB', //валюта
                accountId: userId, //идентификатор плательщика (необязательно)
                /* invoiceId: '1234567', //номер заказа  (необязательно) */
                email: 'user@example.com', //email плательщика (необязательно)
                skin: 'mini', //дизайн виджета (необязательно)
                data: {
                    myProp: `${value + bonus}`,
                },
            },

            {
                onSuccess: function (options) {
                    // success
                    console.log('Принята оплата');
                    console.log(options);
                },
                onFail: function (reason, options) {
                    // fail
                    console.log('ошибка');
                    console.log(reason);
                    console.log(options);
                },
                onComplete: async function (paymentResult, options) {
                    if (paymentResult.success) {
                        await axios.post('/users/pay', {
                            amount: cost,
                            userId: userId,
                            email: options.email,
                        });
                    }

                    console.log('получен ответ');
                    console.log(paymentResult);
                    console.log(options);
                },
            },
        );
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.payContainer}>
                <h2>Добавить токенов</h2>
                <FontAwesomeIcon
                    onClick={() => setPayIsOpen((pred) => !pred)}
                    className={styles.xmark}
                    icon={faXmarkCircle}
                    size="lg"
                />
                <div className={styles.content}>
                    <div className={styles.slider}>
                        <span>Выберите количество токенов</span>
                        <input
                            className={styles.range}
                            type="range"
                            min={10}
                            max={100}
                            step={10}
                            value={value}
                            onChange={handleSliderChange}
                        />
                        <ul className={styles.values}>
                            <li>10</li>

                            <li>100</li>
                        </ul>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className={styles.chape}>
                            <span className={styles.payTitle}>Токены:</span>
                            <span className={styles.payValue}>{value}</span>
                        </div>
                        <div className={styles.chape}>
                            <span className={styles.payTitle}>Бонус:</span>
                            <span className={styles.payValue}>{bonus}</span>
                        </div>
                        <div className={styles.chape}>
                            <span className={styles.payTitle}>Сумма:</span>
                            <span className={styles.payValue}>{price}₽</span>
                        </div>
                    </div>
                </div>
                <button onClick={() => pay(price)}>Оплатить</button>
            </div>
        </div>
    );
};
