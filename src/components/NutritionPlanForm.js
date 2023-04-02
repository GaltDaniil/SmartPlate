import React, { useState } from 'react';
import './NutritionPlanForm.css';
import { useTelegram } from '../hooks/useTelegram';
import axios from 'axios';
import { Loader } from './Loader.js';

export const NutritionPlanForm = () => {
    const [tg] = useTelegram();

    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const [variety, setVariety] = useState('');
    const [without, setWithout] = useState('');
    const [mealFrequency, setMealFrequency] = useState('');

    React.useEffect(() => {
        if (gender && age && weight && height && deal && activityLevel && mealFrequency) {
            setIsReady(true);
        }
    }, [gender, age, weight, height, deal, activityLevel, mealFrequency]);

    const sendToServer = async () => {
        setIsReady(false);
        setIsLoading(true);
        const user = tg.initDataUnsafe.user;
        await axios.post('http://localhost:8080/api/users/send/', {
            user,
            requestText,
        });
        tg.close();
        setIsLoading(false);
    };

    const requestText = `Составь рацион питания на день для ${gender}
    Возраст ${age},
    рост  ${height} см,
    вес  ${weight} кг. 
    Цель -  ${deal}. 
    Физическая активность -  ${activityLevel}. 
    Заболевания -  ${medicalConditions}. 
    Рацион должен содержать -  ${variety} . 
    Рацион не должен содержать -  ${without}. 
    Приемов пищи в день -  ${mealFrequency}. 
    
    Распредели продукты по граммам и напиши калорийность каждого приема пищи, а так же общую калорийность всего рациона. 
  `;

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="container2">
                    <h2>Новый рацион</h2>
                    <h3>Характеристики клиента</h3>

                    <span>Пол</span>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Выберите пол</option>
                        <option value="Мужчины">Мужской</option>
                        <option value="Женщины">Женский</option>
                    </select>
                    {/* <p></p> */}
                    <span>Возраст</span>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                    {/* <p>
                питание может отличаться в зависимости от возрастных групп. Детям и подросткам
                необходимо больше кальция и белка для роста и развития, а пожилым людям может
                потребоваться больше витаминов и минералов для поддержания здоровья.
            </p> */}
                    <div className="flex">
                        <span>Вес (кг)</span>
                        <input
                            className="inputWaH"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <span>Рост (см)</span>
                        <input
                            className="inputWaH"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>

                    <span>Цель рациона</span>
                    <select value={deal} onChange={(e) => setDeal(e.target.value)}>
                        <option value="0">Выбрать цель</option>
                        <option value="Набор мышечной массы">Набор мышечной массы</option>
                        <option value="Снижение веса">Снижение веса</option>
                        <option value="Поддержание формы">Поддержание формы</option>
                    </select>

                    {/* <p></p> */}
                    <span>Физическая активность</span>
                    <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                    >
                        <option value="0">Выбрать вид</option>
                        <option value="Активный образ жизни 3 или более тренировки в день">
                            Активный образ жизни 3 или более тренировки в день
                        </option>
                        <option value="Активный образ жизни, без тренировок">
                            Активный образ жизни, без тренировок
                        </option>
                        <option value="2-3 тренировки в неделю, образ жизни малоактивный">
                            2-3 тренировки в неделю, образ жизни малоактивный
                        </option>
                        <option value="Малоактивный образ жизни">Малоактивный образ жизни</option>
                    </select>
                    {/* <p></p> */}
                    <span>Заболевания</span>
                    <input
                        type="text"
                        value={medicalConditions}
                        onChange={(e) => setMedicalConditions(e.target.value)}
                    />
                    <h3>Характеристики рациона</h3>
                    {/* <p></p> */}

                    <span>Разнообразие и предпочтения</span>
                    <input
                        type="text"
                        value={variety}
                        onChange={(e) => setVariety(e.target.value)}
                    />
                    {/* <p></p> */}
                    <span>Не должно быть в рационе</span>
                    <input
                        type="text"
                        value={without}
                        onChange={(e) => setWithout(e.target.value)}
                    />
                    {/* <p></p> */}
                    <span>Частота приема пищи</span>
                    <select
                        value={mealFrequency}
                        onChange={(e) => setMealFrequency(e.target.value)}
                    >
                        <option value="">Выберите частоту приема пищи</option>
                        <option value="3">3 раза в день</option>
                        <option value="4">4 раза в день</option>
                        <option value="5">5 раз в день</option>
                        <option value="6">6 раз в день</option>
                        <option value="7">7 раз в день</option>
                        <option value="8">8 раз в день</option>
                    </select>

                    <h3>Баланс</h3>
                    <div className="flex">
                        {/* <p></p> */}
                        <span>Белки</span>
                        <input
                            className="inputWaH"
                            type="number"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                        />

                        <span>Жиры</span>
                        <input
                            className="inputWaH"
                            type="number"
                            value={fat}
                            onChange={(e) => setFat(e.target.value)}
                        />

                        <span>Углеводы</span>
                        <input
                            className="inputWaH"
                            type="number"
                            value={carbohydrate}
                            onChange={(e) => setCarbohydrate(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={isReady ? false : true}
                        onClick={() => {
                            sendToServer();
                        }}
                    >
                        Составить рацион
                    </button>
                </div>
            )}
        </div>
    );
};
