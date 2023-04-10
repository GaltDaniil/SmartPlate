import React from 'react';
import styles from './Pay.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';

export const Pay = ({ setPayIsOpen }) => {
    const [activeItem, setActiveItem] = React.useState({ index: '0', value: 129 });
    console.log(activeItem);
    const addToken = async (cost) => {};

    const pay = function (cost) {
        // eslint-disable-next-line no-undef
        var widget = new cp.CloudPayments();

        widget.pay(
            'auth', // или 'charge'
            {
                //options
                publicId: 'pk_1ae4c5b6c3d7d278f36e9e18db6ee', //id из личного кабинета
                description: 'Пополнить баланс запросов', //назначение
                amount: 0, //сумма
                currency: 'RUB', //валюта
                accountId: 'user@example.com', //идентификатор плательщика (необязательно)
                /* invoiceId: '1234567', //номер заказа  (необязательно) */
                email: 'user@example.com', //email плательщика (необязательно)
                skin: 'mini', //дизайн виджета (необязательно)
                data: {
                    myProp: 'myProp value',
                },
            },

            {
                onSuccess: function (options) {
                    // success
                    console.log('Принята оплата');
                },
                onFail: function (reason, options) {
                    // fail
                    console.log('ошибка');
                },
                onComplete: function (paymentResult, options) {
                    //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
                    //тут должна быть смысловая конструкция else if чтобы отрабатывать ОК
                    //addToken(cost)
                    //await axios.post("https://smartdietai.ru/api/users/pay", cost)

                    console.log('получен ответ');
                    console.log(paymentResult);
                },
            },
        );
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.payContainer}>
                <h2>Добавить запросов</h2>
                <FontAwesomeIcon
                    onClick={() => setPayIsOpen((pred) => !pred)}
                    className={styles.xmark}
                    icon={faXmarkCircle}
                    size="lg"
                />
                <ul className={styles.tarifs}>
                    <li
                        value={10}
                        onClick={() => {
                            setActiveItem((pred) => {
                                return { index: '0', value: 129 };
                            });
                        }}
                        className={activeItem.index === '0' ? `${styles.checked}` : ''}
                    >
                        <h3>10 шт</h3>
                        <span>129 руб.</span>
                    </li>
                    <li
                        value={30}
                        onClick={() => {
                            setActiveItem((pred) => {
                                return { index: '1', value: 299 };
                            });
                        }}
                        className={activeItem.index === '1' ? `${styles.checked}` : ''}
                    >
                        <h3>30 шт</h3>
                        <span>299 руб.</span>
                    </li>
                    <li
                        value={60}
                        onClick={() => {
                            setActiveItem((pred) => {
                                return { index: '2', value: 549 };
                            });
                        }}
                        className={activeItem.index === '2' ? `${styles.checked}` : ''}
                    >
                        <h3>60 шт</h3>
                        <span>549 руб.</span>
                    </li>
                </ul>
                <button onClick={() => pay(activeItem.value)}>Оплатить</button>
            </div>
        </div>
    );
};
