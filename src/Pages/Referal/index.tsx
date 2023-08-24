import React from 'react';
//@ts-ignore
import styles from './Referral.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import { faAngleLeft, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import { UserData, WithdrawRequests } from '../../types';
import { WithdrawPopup } from '../../components/WithdrawPopup';
import { WithdrawRequest } from '../../components/WithdrawRequest';

interface ReferralPageProps {
    refInfo: {
        referrals: UserData[];
        referralSystem: UserData['referralSystem'];
    };
    userId: number;
}

export const ReferralPage: React.FC<ReferralPageProps> = ({ userId, refInfo }) => {
    const [sell, setSell] = React.useState(0);
    const [sellCount, setSellCount] = React.useState(0);
    const [isOpenPopup, setIsOpenPopup] = React.useState(false);
    const [isCopy, setIsCopy] = React.useState(false);

    const [earn, setEarn] = React.useState(0);
    const handleCopyToClipboard = (refCode: string): void => {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = `https://t.me/fitness_ikigai_bot?start=ref=${refCode}`;
        // Добавляем временный элемент в DOM
        document.body.appendChild(tempTextArea);
        // Выделяем текст во временном элементе
        tempTextArea.select();
        try {
            // Копируем текст в буфер обмена
            document.execCommand('copy');
            setIsCopy((pred) => true);
        } catch (err) {
            console.error('Не удалось скопировать текст в буфер обмена:', err);
        }

        // Удаляем временный элемент
        document.body.removeChild(tempTextArea);
    };

    const sellCountFunction = () => {
        const payments = refInfo.referrals.filter((el) => el.paymentInfo);
        setSell((pred) => payments.length);
        let sellCount = 0;
        const earn = payments.reduce(
            (acc, el) =>
                acc +
                el.paymentInfo!.reduce((acc, el) => {
                    sellCount += 1;
                    return acc + Number(el.amount);
                }, 0),
            0,
        );
        setSellCount((pred) => sellCount);
        setEarn((pred) => earn);
    };
    React.useEffect(() => {
        sellCountFunction();
    }, []);

    return (
        <div>
            <div>
                <div className={styles.menuBar}>
                    <Link to={'/'}>
                        <FontAwesomeIcon
                            color="white"
                            onClick={() => {}}
                            icon={faAngleLeft}
                            size="sm"
                        />
                    </Link>

                    <h2 style={{ color: 'white', fontSize: '20px' }}>Реферальная программа</h2>
                    <FontAwesomeIcon style={{ opacity: '0' }} icon={faCircleQuestion} size="lg" />
                </div>
                <div className={styles.container}>
                    <div className={styles.referralLink}>
                        <h4>Ваша реферальная ссылка</h4>
                        <span>{`https://t.me/fitness_ikigai_bot?start=ref=${refInfo.referralSystem?.link}`}</span>
                        <button
                            onClick={() => handleCopyToClipboard(refInfo.referralSystem!.link)}
                            className={styles.copyButton}
                            style={{ background: `${isCopy ? '#8ae08e' : '#87acfc'}` }}
                        >
                            Скопировать ссылку
                            {!isCopy ? (
                                <FontAwesomeIcon
                                    className={styles.copyIcon}
                                    color="white"
                                    onClick={() => {}}
                                    icon={faCopy}
                                    size="lg"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className={styles.copyIcon}
                                    color="white"
                                    onClick={() => {}}
                                    icon={faCheck}
                                    size="lg"
                                />
                            )}
                        </button>
                    </div>
                    <div className={styles.analitics}>
                        <h4 className={styles.statLine}>Статистика</h4>
                        <div className={styles.statLine}>
                            <span className={styles.title}>Количество профилей</span>
                            <span className={styles.count}>{sell}</span>
                        </div>

                        <div className={styles.statLine}>
                            <span>Количество продаж</span>
                            <span>{sellCount}</span>
                        </div>
                        <div className={styles.statLine}>
                            <span>Процент отчислений</span>
                            <span>25%</span>
                        </div>
                        <div className={styles.statLine}>
                            <span>Доход</span>
                            <span>{earn}</span>
                        </div>
                        <div className={styles.statLine}>
                            <span>Выведено</span>
                            <span>{refInfo.referralSystem!.withdraw}</span>
                        </div>
                        <button
                            onClick={() => setIsOpenPopup((pred) => !pred)}
                            className={styles.withdrawBtn}
                        >
                            Вывести средства
                        </button>
                    </div>
                    {refInfo.referralSystem?.withdrawRequests
                        ? refInfo.referralSystem.withdrawRequests.map((el) => (
                              <WithdrawRequest {...(el as WithdrawRequests)} />
                          ))
                        : null}
                </div>
            </div>
            {isOpenPopup ? (
                <WithdrawPopup
                    setIsOpenPopup={setIsOpenPopup}
                    referralSystem={refInfo.referralSystem}
                    earn={earn}
                    userId={userId}
                />
            ) : null}
        </div>
    );
};
