import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Form.module.scss';
import { useTelegram } from '../../hooks/useTelegram';
import axios from '../../axios.js';
import { Loader } from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Done } from '../Done';

export const Form = ({ tokens }) => {
    const [tg] = useTelegram();

    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckedSpecial, setIsCheckedSpecial] = useState(false);
    const [isCheckedPro, setIsCheckedPro] = useState(false);

    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [deal, setDeal] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [medicalConditions, setMedicalConditions] = useState('');
    /* const [balance, setBalance] = useState(''); */
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbohydrate, setCarbohydrate] = useState('');
    const [calories, setCalories] = useState('');

    const [variety, setVariety] = useState('');
    const [without, setWithout] = useState('');
    const [mealFrequency, setMealFrequency] = useState('');

    React.useEffect(() => {
        if (gender && age && weight && height && activityLevel && mealFrequency && tokens > 0) {
            setIsReady(true);
        }
    }, [gender, age, weight, height, activityLevel, mealFrequency]);

    const sendToServer = async () => {
        setIsLoading(true);
        const user = tg.initDataUnsafe.user;
        //const userId = user.id;
        const userId = '299602933';

        await axios.post('/users/sendGpt2/', {
            userId,
            requestText,
        });
        tg.close();
    };

    const requestText = `Составь рацион питания на день для ${gender}
    Возраст ${age},
    рост  ${height} см,
    вес  ${weight} кг. 
    Физическая активность -  ${activityLevel},
    Приемов пищи в день -  ${mealFrequency},
    ${
        isCheckedSpecial
            ? `Рацион должен содержать -  ${variety} , 
    Рацион не должен содержать -  ${without}, 
    Противопоказания и заболевания - ${medicalConditions ? `${medicalConditions}` : 'отсутствуют'}`
            : ''
    } 
    
    
    ${
        isCheckedPro
            ? `Общее количество калорий рациона должна быть около ${calories} калорий. Из суточной калорийности ${protein}% из белка, ${carbohydrate}% из углеводов и ${fat}% из жиров`
            : ''
    } `;

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

                <h2 style={{ color: 'white', fontSize: '20px' }}>Новый рацион</h2>
                <FontAwesomeIcon style={{ opacity: '0' }} icon={faCircleQuestion} size="lg" />
            </div>

            <div className={styles.container}>
                {isLoading ? (
                    <Done />
                ) : (
                    <div className={styles.field}>
                        <h3>Базовые параметры</h3>
                        <span>
                            Рационы питания рассчитываются из ваших индивидуальных характиристик.
                            Чем более детальную информацию вы предоставите, тем более точным,
                            вкусным и эффективным будет рацион.
                        </span>
                        {/* <span>Пол</span> */}
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">Выберите пол*</option>
                            <option value="Мужчины">Мужской</option>
                            <option value="Женщины">Женский</option>
                        </select>
                        {/* <p></p> */}

                        {/* <p>
питание может отличаться в зависимости от возрастных групп. Детям и подросткам
необходимо больше кальция и белка для роста и развития, а пожилым людям может
потребоваться больше витаминов и минералов для поддержания здоровья.
</p> */}
                        <div className={styles.flex}>
                            {/* <span>Возраст</span> */}
                            <input
                                className={styles.inputWaH}
                                type="number"
                                value={age}
                                placeholder={'Возраст*'}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            {/* <span>Вес (кг)</span> */}
                            <input
                                className={styles.inputWaH}
                                type="number"
                                value={weight}
                                placeholder={'Вес* (кг)'}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                            {/* <span>Рост (см)</span> */}
                            <input
                                className={styles.inputWaH}
                                type="number"
                                value={height}
                                placeholder={'Рост* (см)'}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </div>

                        {/* <span>Цель рациона</span> */}
                        {/* <select value={deal} onChange={(e) => setDeal(e.target.value)}>
                            <option value="0">Цель рациона*</option>
                            <option value="Набор мышечной массы">Набор мышечной массы</option>
                            <option value="Снижение веса">Снижение веса</option>
                            <option value="Поддержание формы">Поддержание формы</option>
                        </select> */}

                        {/* <p></p> */}
                        {/* <span>Физическая активность</span> */}
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                        >
                            <option value="0">Физическая активность*</option>
                            <option value="Активный образ жизни 3 или более тренировки в день">
                                Активный образ жизни 3 или более тренировки в день
                            </option>
                            <option value="Активный образ жизни, без тренировок">
                                Активный образ жизни, без тренировок
                            </option>
                            <option value="2-3 тренировки в неделю, образ жизни малоактивный">
                                2-3 тренировки в неделю, образ жизни малоактивный
                            </option>
                            <option value="Малоактивный образ жизни">
                                Малоактивный образ жизни
                            </option>
                        </select>

                        {/* <span>Частота приема пищи</span> */}
                        <select
                            value={mealFrequency}
                            onChange={(e) => setMealFrequency(e.target.value)}
                        >
                            <option value="">Частота приема пищи*</option>
                            <option value="2">2 раза в день</option>
                            <option value="3">3 раза в день</option>
                            <option value="4">4 раза в день</option>
                        </select>

                        <div style={{ display: 'flex' }}>
                            <input
                                className={styles.check}
                                type="checkbox"
                                onChange={() => {
                                    setIsCheckedSpecial((pred) => !pred);
                                }}
                            />
                            <h3 className={!isCheckedSpecial ? `${styles.isCheckedTitle}` : ''}>
                                Особенности рациона
                            </h3>
                        </div>

                        {/* <p></p> */}
                        {/* <span>Заболевания</span> */}
                        <input
                            className={!isCheckedSpecial ? `${styles.isCheckedInput}` : ``}
                            type="text"
                            disabled={isCheckedSpecial ? false : true}
                            placeholder={'Противопоказания'}
                            value={medicalConditions}
                            onChange={(e) => setMedicalConditions(e.target.value)}
                        />

                        {/* <span>Разнообразие и предпочтения</span> */}
                        <input
                            className={!isCheckedSpecial ? `${styles.isCheckedInput}` : ``}
                            type="text"
                            disabled={isCheckedSpecial ? false : true}
                            placeholder={'Включить продукты'}
                            value={variety}
                            onChange={(e) => setVariety(e.target.value)}
                        />
                        {/* <p></p> */}
                        {/* <span>Не должно быть в рационе</span> */}
                        <input
                            className={!isCheckedSpecial ? `${styles.isCheckedInput}` : ``}
                            type="text"
                            disabled={isCheckedSpecial ? false : true}
                            placeholder={'Исключить продукты'}
                            value={without}
                            onChange={(e) => setWithout(e.target.value)}
                        />
                        {/* <p></p> */}
                        <div style={{ display: 'flex' }}>
                            <input
                                className={styles.check}
                                type="checkbox"
                                onChange={() => {
                                    setIsCheckedPro((pred) => !pred);
                                }}
                            />
                            <h3 className={!isCheckedPro ? `${styles.isCheckedTitle}` : ''}>
                                Баланс
                            </h3>
                        </div>
                        <span>
                            Если вы не используете данные настройки, рассчет КБЖУ происходит
                            автоматически основных характеристик и цели
                        </span>

                        <div className={styles.flex}>
                            {/* <span>Белки</span> */}
                            <input
                                className={
                                    !isCheckedPro
                                        ? `${styles.inputWaH} ${styles.isCheckedInput}`
                                        : `${styles.inputWaH}`
                                }
                                disabled={isCheckedPro ? false : true}
                                type="number"
                                placeholder={'Белки %'}
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                            />

                            {/* <span>Жиры</span> */}
                            <input
                                className={
                                    !isCheckedPro
                                        ? `${styles.inputWaH} ${styles.isCheckedInput}`
                                        : `${styles.inputWaH}`
                                }
                                disabled={isCheckedPro ? false : true}
                                type="number"
                                placeholder={'Жиры %'}
                                value={fat}
                                onChange={(e) => setFat(e.target.value)}
                            />

                            {/* <span>Углеводы</span> */}
                            <input
                                className={
                                    !isCheckedPro
                                        ? `${styles.inputWaH} ${styles.isCheckedInput}`
                                        : `${styles.inputWaH}`
                                }
                                disabled={isCheckedPro ? false : true}
                                type="number"
                                placeholder={'Углеводы %'}
                                value={carbohydrate}
                                onChange={(e) => setCarbohydrate(e.target.value)}
                            />
                        </div>
                        <input
                            className={!isCheckedPro ? `${styles.isCheckedInput}` : ``}
                            type="text"
                            disabled={isCheckedPro ? false : true}
                            placeholder={'Количество калорий'}
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                        />
                        <button
                            disabled={isReady ? false : true}
                            onClick={() => {
                                sendToServer();
                            }}
                        >
                            Составить рацион
                        </button>
                    </div>
                )}{' '}
            </div>
        </>
    );
};
