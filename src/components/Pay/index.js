import React from 'react';
import styles from './Pay.module.scss';
import axios from '../../axios.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faRuble } from '@fortawesome/free-regular-svg-icons';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';

export const Pay = ({ setPayIsOpen, userId }) => {
    const [tarif, setTarif] = React.useState(299);

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
                    myProp: `Any props`,
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
                <h2>Подписка на IKIG.AI</h2>
                <p>Пользуйся ботами без ограничений и развивайся в свой сфере еще быстрей.</p>
                <FontAwesomeIcon
                    onClick={() => setPayIsOpen((pred) => !pred)}
                    className={styles.xmark}
                    icon={faXmarkCircle}
                    size="lg"
                />
                <div className={styles.content}>
                    {/* <div className={styles.slider}>
                        <span>Выберите количество токенов</span>
                        <input
                            className={styles.range}
                            type="range"
                            min={100}
                            max={500}
                            step={50}
                            value={value}
                            onChange={handleSliderChange}
                        />
                        <ul className={styles.values}>
                            <li>100</li>

                            <li>500</li>
                        </ul>
                    </div> */}

                    <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <li
                            onClick={() => {
                                setTarif(299);
                            }}
                            className={tarif === 299 ? styles[('shape', 'checked')] : styles.shape}
                        >
                            <span className={styles.payTitle}>1 месяц:</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className={styles.payValue}>299</span>
                                <FontAwesomeIcon
                                    style={{ marginLeft: '3px', color: '#65a38b' }}
                                    icon={faRubleSign}
                                    size="sm"
                                />
                            </div>
                        </li>
                        <li
                            onClick={(e) => {
                                setTarif(699);
                            }}
                            className={tarif === 699 ? styles[('shape', 'checked')] : styles.shape}
                        >
                            <span className={styles.payTitle}>3 месяца:</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className={styles.payValue}>699</span>
                                <FontAwesomeIcon
                                    style={{ marginLeft: '3px', color: '#65a38b' }}
                                    icon={faRubleSign}
                                    size="sm"
                                />
                            </div>
                        </li>
                        <li
                            onClick={(e) => {
                                setTarif(1399);
                            }}
                            className={tarif === 1399 ? styles[('shape', 'checked')] : styles.shape}
                        >
                            <span className={styles.payTitle}>6 месяцев:</span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span className={styles.payValue}>1399</span>
                                <FontAwesomeIcon
                                    style={{ marginLeft: '3px', color: '#65a38b' }}
                                    icon={faRubleSign}
                                    size="sm"
                                />
                            </div>
                        </li>
                    </ul>
                </div>
                <button onClick={() => pay(tarif)}>Оплатить</button>
            </div>
        </div>
    );
};
