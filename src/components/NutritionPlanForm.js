import React, { useState } from 'react';
import './NutritionPlanForm.css';

export const NutritionPlanForm = () => {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [medicalConditions, setMedicalConditions] = useState('');
    const [balance, setBalance] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbohydrate, setCarbohydrate] = useState('');
    const [variety, setVariety] = useState('');
    const [personalPreferences, setPersonalPreferences] = useState('');
    const [mealFrequency, setMealFrequency] = useState('');

    return (
        <div>
            <h2>Новый рацион</h2>
            <h3>Характеристики клиента</h3>
            <p></p>
            <span>Пол</span>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Выберите пол</option>
                <option value="М">Мужской</option>
                <option value="Ж">Женский</option>
            </select>
            <p></p>
            <span>Возраст</span>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            <p></p>
            <span>Вес и рост</span>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            <p></p>
            <span>Физическая активность</span>
            <input
                type="text"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
            />
            <p></p>
            <span>Заболевания</span>
            <input
                type="text"
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)}
            />
            <h3>Характеристики рациона</h3>
            <p></p>
            <span>Баланс</span>
            <p></p>
            <span>Белки</span>
            <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} />

            <span>Жиры</span>
            <input type="number" value={fat} onChange={(e) => setFat(e.target.value)} />

            <span>Углеводы</span>
            <input
                type="number"
                value={carbohydrate}
                onChange={(e) => setCarbohydrate(e.target.value)}
            />

            <span>Разнообразие</span>
            <input type="text" value={variety} onChange={(e) => setVariety(e.target.value)} />
            <p></p>
            <span>Личные предпочтения</span>
            <input
                type="text"
                value={personalPreferences}
                onChange={(e) => setPersonalPreferences(e.target.value)}
            />
            <p></p>
            <span>Частота приема пищи</span>
            <select value={mealFrequency} onChange={(e) => setMealFrequency(e.target.value)}>
                <option value="">Выберите частоту приема пищи</option>
                <option value="3">3 раза в день</option>
                <option value="4">4 раза в день</option>
                <option value="5">5 раз в день</option>
                <option value="6">6 раз в день</option>
                <option value="7">7 раз в день</option>
                <option value="8">8 раз в день</option>
            </select>
        </div>
    );
};
