import stules from './Loader.module.scss';

import React from 'react';

export const Loader = () => {
    const ref = React.useRef;
    const texts = [
        'Анализируем ваши данные...',
        'Подбираем продукты...',
        'Рассчитываем КБЖУ...',
        'Моем тарелки...',
        'Подбираем вкусные рецепты...',
        'Расписываем рационы по дням...',
    ];

    const [textIndex, setTextIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [texts]);

    const loadingText = () => {
        setInterval(() => {}, 2000);
    };
    console.log(ref);
    return (
        <div className="container">
            <div className="loader"></div>
            <span>{texts[textIndex]}</span>
        </div>
    );
};
