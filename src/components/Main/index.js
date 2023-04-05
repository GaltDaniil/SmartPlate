import styles from './Main.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const Main = ({ tokens, diets }) => {
    const pay = function () {
        var widget = new cp.CloudPayments();
        widget.pay(
            'auth', // или 'charge'
            {
                //options
                publicId: 'pk_1ae4c5b6c3d7d278f36e9e18db6ee', //id из личного кабинета
                description: 'Оплата токенов', //назначение
                amount: 50, //сумма
                currency: 'RUB', //валюта
                accountId: 'user@example.com', //идентификатор плательщика (необязательно)
                invoiceId: '1234567', //номер заказа  (необязательно)
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
                    //например вызов вашей аналитики Facebook Pixel
                    console.log('получен ответ');
                    console.log(paymentResult);
                },
            },
        );
    };

    return (
        <div className={styles.container}>
            <img src="./plate.png" alt="" />
            <div className={styles.shape}>
                <div className={styles.info}>
                    <div style={{ display: 'flex' }}>
                        <button onClick={() => pay()}>123asdafqefsefsefsef</button>
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
