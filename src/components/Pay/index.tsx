import React from 'react';
//@ts-ignore
import styles from './Pay.module.scss';
import axios from '../../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { faRubleSign } from '@fortawesome/free-solid-svg-icons';
import { useTelegram } from '../../hooks/useTelegram';

interface PayProps {
    setPayIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: number;
}

export const Pay: React.FC<PayProps> = ({ setPayIsOpen, userId }) => {
    const [tg] = useTelegram();
    const [tarif, setTarif] = React.useState(299);
    const [isDisabled, setIsDisabled] = React.useState(false);

    const pay = function (cost: number): void {
        // eslint-disable-next-line no-undef
        // @ts-ignore
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
                onSuccess: function (options: Response) {
                    // success
                    console.log('Принята оплата');
                    console.log(options);
                },
                onFail: function (reason: Response, options: Response) {
                    // fail
                    console.log('ошибка');
                    console.log(reason);
                    console.log(options);
                },
                onComplete: async function (
                    paymentResult: { success: string },
                    options: { email: string },
                ) {
                    if (paymentResult.success) {
                        await axios.post('/pay/cloudPayments', {
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
    const payForPayPal = async (cost: number): Promise<void> => {
        setIsDisabled(true);
        setTimeout(() => {
            tg.close();
        }, 1000);
        await axios.post('/pay/create-payment', {
            amount: cost,
            userId: userId,
        });
        setIsDisabled(false);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.payContainer}>
                <h2>Подписка на IKIG.AI</h2>
                <p>Пользуйся ботами без ограничений и развивайся в своей сфере еще быстрей.</p>
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
                            className={
                                tarif === 299 ? `${styles.shape} ${styles.checked}` : styles.shape
                            }
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
                        {/* <li
                            onClick={(e) => {
                                setTarif(699);
                            }}
                            className={
                                tarif === 699 ? `${styles.shape} ${styles.checked}` : styles.shape
                            }
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
                            className={
                                tarif === 1399 ? `${styles.shape} ${styles.checked}` : styles.shape
                            }
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
                        </li> */}
                    </ul>
                </div>
                <button onClick={() => pay(tarif)}>Оплатить</button>
                <button disabled={isDisabled ? true : false} onClick={() => payForPayPal(tarif)}>
                    Оплатить PayPal
                </button>
                {/* {isLoadingPayPal?<div className={styles.paypalShape}>
                    <h2>Подготавливается</h2>
                    <h2>Ссылка на оплату</h2>
                </div>:null} */}
            </div>
        </div>
    );
};
