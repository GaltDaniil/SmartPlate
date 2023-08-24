import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//@ts-ignore
import styles from './Withdraw.module.scss';
import React from 'react';
import { faAngleLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserData } from '../../types';
import axios from '../../axios';

interface WithdrawPopupProps {
    setIsOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
    referralSystem: UserData['referralSystem'];
    earn: number;
    userId: number;
}

export const WithdrawPopup: React.FC<WithdrawPopupProps> = ({
    setIsOpenPopup,
    earn,
    referralSystem,
    userId,
}) => {
    const [amount, setAmount] = React.useState(earn - referralSystem!.withdraw);
    const [cardNumber, setCardNumber] = React.useState('');
    const [cardName, setCardName] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [type, setType] = React.useState('card');

    const [itsOver, setItsOver] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    const withdrawSumHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = Number(e.target.value);
        setItsOver(false);
        setAmount(value);
        let different = earn - referralSystem!.withdraw;
        if (value < 1000 || value > different) {
            setItsOver((pred) => true);
            console.log('error');
        }
    };
    const submitForm = async (): Promise<void> => {
        if (amount && cardNumber && cardName && type) {
            await axios.post('/users/sendWithdraw', {
                userId,
                amount,
                cardNumber,
                cardName,
                comment,
                type,
            });
            setIsOpenPopup((pred) => !pred);
        } else {
            setIsError(true);
        }
    };

    return (
        <div className={styles.popup}>
            <div className={styles.menuBar}>
                <Link to={'/'}>
                    <FontAwesomeIcon
                        className={styles.xmark}
                        color="white"
                        onClick={() => {}}
                        icon={faAngleLeft}
                        size="sm"
                    />
                </Link>

                <h2>Заказ вывода средств</h2>
                <FontAwesomeIcon
                    onClick={() => setIsOpenPopup((pred) => !pred)}
                    icon={faXmark}
                    size="lg"
                />
            </div>
            <div className={styles.container}>
                <div className={styles.inputShape}>
                    <h4>Выберите метод вывода*</h4>
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value="card">Банковская карта</option>
                    </select>
                </div>
                <div className={styles.inputShape}>
                    <h4>Выведите номер карты*</h4>
                    <input
                        onChange={(e) => setCardNumber((pred) => e.target.value)}
                        value={cardNumber}
                        className={styles.inputField}
                        type="number"
                    />
                </div>
                <div className={styles.inputShape}>
                    <h4>ФИО*</h4>
                    <input
                        onChange={(e) => setCardName((pred) => e.target.value)}
                        value={cardName}
                        className={styles.inputField}
                        type="text"
                    />
                </div>
                <div className={styles.inputShape}>
                    <h4>Сумма*</h4>
                    <input
                        onChange={(e) => withdrawSumHandler(e)}
                        value={amount ? amount : ''}
                        className={styles.inputField}
                        type="number"
                        style={{ color: `${itsOver ? 'red' : 'black'}` }}
                    />
                </div>
                <p>
                    Вывод средств возможен от 1000 рублей и занимает от 1 до 4 дней. Разово можно
                    вывести не более 30 000 рублей.
                </p>
                <div className={styles.inputShape}>
                    <h4>Комментарии</h4>
                    <input
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        className={styles.inputField}
                        type="text"
                    />
                </div>
                {isError ? (
                    <span className={styles.error}>Заполните все обязательные поля</span>
                ) : null}
            </div>
            <div className={styles.btns}>
                <button
                    className={styles.declineBtn}
                    onClick={() => setIsOpenPopup((pred) => !pred)}
                >
                    Отмена
                </button>
                <button onClick={() => submitForm()} className={styles.acceptBtn}>
                    Отправить
                </button>
            </div>
        </div>
    );
};
