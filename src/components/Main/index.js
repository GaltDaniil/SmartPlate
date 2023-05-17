import styles from './Main.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Pay } from '../Pay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { BotButton } from '../BotButton';
import { BotPage } from '../BotPage';

const botsData = [
    {
        img: 'jora.png',
        title: 'Жора 🥑',
        miniDescription: 'Эксперт по здоровому питанию',
        options: {
            specialization: 'Нутрициология',
            possibilities:
                'Советы по правильному питанию, рационам, продуктам и их питательным свойствам, информация о диетических ограничениях и рекомендации.',
            adviсe: 'Точно пишите граммовку и состояние продуктов (готовые, сырые), уточняйте свои диетические потребности и ограничения. Уточняйте и дополняйте мои ответы по необходимости.',
        },
        name: 'Jora',
    },
    /* {
        img: 'ilon.png',
        title: 'Илон 💰',
        miniDescription: 'Эксперт по финансам и финансовой грамотности',
        options: {
            specialization: 'Финансы и доход',
            possibilities:
                'Поможет грамотно управлять бюджетом, основываясь на ваших личных тратах и доходе. Поможет планировать, копить и инвестировать.',
            adviсe: 'Не стесняйтесь рассказывать о ваших доходах, вспонтанных тратах, проблемах с кредитами. Чем более точную информацию о текущем состоянии дел я получу, тем лучше спланирую ваш бюджет.',
        },
        name: 'Ilon',
    },
    {
        img: 'slava.png',
        title: 'Слава 📣',
        miniDescription: 'Эксперт по маркетингу и продвижению',
        options: {
            specialization: 'Маркетинг',
            possibilities:
                'Создание стратегии продвижения под ваш бюджет, сбор информации о целевой аудитории, создание воронки продаж',
            adviсe: 'Опишите свою сферу, рекламный бюджет, кто ваши текущие клиенты, средний чек и какими способами продвижения пользуетесь в данный момент. Не забывайте, что все мои ответы можно уточнять дополнительными данными.',
        },
        name: 'Slava',
    },
    {
        img: 'kostya.png',
        title: 'Костя 🦴',
        miniDescription: 'Эксперт по анатомии',
        description:
            'Я твой чат-бот по нутрициологии. Я помогу тебе создать здоровый рацион питания, расчитать оптимальное количество калорий и питательных веществ, предложить рецепты блюд и ответить на любые вопросы по этой теме. Моя цель - помочь тебе достичь своих целей и сохранить твое здоровье.',
        options: {
            specialization: 'Анатомия человека',
            possibilities:
                'Описание анатомических структур человеческого тела (органов, костей, мышц и т.д.), их расположение и функционал',
            adviсe: 'Задавайте вопросы спользуя анатомические термины, чтобы получить более точный ответ.',
        },
        name: 'Kostya',
    }, */
    {
        img: 'knopka.png',
        title: 'Кнопка 🖌',
        miniDescription: 'Эксперт по копирайтингу и написанию текстов',
        description:
            'Я твой чат-бот по нутрициологии. Я помогу тебе создать здоровый рацион питания, расчитать оптимальное количество калорий и питательных веществ, предложить рецепты блюд и ответить на любые вопросы по этой теме. Моя цель - помочь тебе достичь своих целей и сохранить твое здоровье.',
        options: {
            specialization: 'Копирайтинг',
            possibilities:
                'Создание уникальных и качественных текстов для сайтов, блогов, социальных сетей, рекламных материалов и других целей. Генерация идей и концепций для написания статей, рекламных текстов, описаний товаров и услуг и других материалов.',
            adviсe: 'Укажите тематику текста, который вам необходимо написать, желаемый объем текста, основные идеи и пожелания по стилю и тону текста, ключевые слова или фразы, которые необходимо использовать в тексте и на какую аудиторию будет ориентироваться текст.',
        },
        name: 'Knopka',
    },
    /* {
        img: 'victorya.png',
        title: 'Виктория 🏆',
        miniDescription: 'Эксперт по саморазвитию, мотивации и целям',
        options: {
            specialization: 'Личный коучинг',
            possibilities:
                'Помощь в достижении личных целей и развитии, поддержка в планировании и управлении временем, мотивационные сообщения, оценка прогресса и анализ результатов, советы и рекомендации.',
            adviсe: 'Определите свои цели и задачи, сформулировать конкретные вопросы, быть открытым для новых идей и подходов, не стесняться задавать вопросы и просить помощи.',
        },
        name: 'Victorya',
    }, */
];

export const Main = ({ tokens, userId, subscription, createdAt }) => {
    const [payIsOpen, setPayIsOpen] = React.useState(false);
    const [isBotPageOpen, setIsBotPageOpen] = React.useState(false);
    const [props, setProps] = React.useState(null);

    const createDate = new Date(createdAt);

    const days = () => {
        if (subscription.freePeriod) {
            const today = new Date();
            const endTime = createDate.getTime() + 259200000;
            const leftTime = endTime - today.getTime();
            const leftDays = Math.round(leftTime / (1000 * 60 * 60 * 24));
            if (leftDays < 0) {
                return 0;
            }
            return leftDays;
        }
    };

    return (
        <>
            <div className={styles.menuBar}>
                <h2 style={{ color: 'white', fontSize: '20px' }}>IKIG.AI</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.shape}>
                    <div>
                        <div className={styles.info}>
                            <div className={styles.shapes}>
                                <p>Тарифный план</p>
                                <h3>{subscription.isActive ? 'Pro' : 'Стартовый'}</h3>
                            </div>
                            <div className={styles.shapes}>
                                <p>Осталось дней</p>
                                <h3>{days()}</h3>
                            </div>
                            <button
                                onClick={() => {
                                    setPayIsOpen((pred) => !pred);
                                }}
                            >
                                +
                            </button>
                        </div>
                        <div className={styles.instruction}>
                            <h3>Инструкция</h3>
                            <p>
                                Обязательно прочтите инструкцию перед использованием ботов. Это
                                позволит вам составлять идеальные запросы для качественных ответов.
                            </p>
                            <Link to={'/info'} className={styles.infoButton}>
                                Читать
                            </Link>
                        </div>

                        <h3>Боты-эксперты</h3>
                        {botsData.map((el) => {
                            return (
                                <BotButton
                                    {...el}
                                    setProps={setProps}
                                    setIsBotPageOpen={setIsBotPageOpen}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.footer}>
                        <Link to={'/support'} className={styles.support}>
                            <FontAwesomeIcon icon={faMessage} size="lg" />
                            <span> Обратная связь</span>
                        </Link>
                        <span className={styles.version}>Версия 1.1.0</span>
                    </div>

                    {payIsOpen ? <Pay userId={userId} setPayIsOpen={setPayIsOpen} /> : null}
                    {isBotPageOpen ? (
                        <BotPage
                            {...props}
                            subscription={subscription}
                            tokens={tokens}
                            userId={userId}
                            setIsBotPageOpen={setIsBotPageOpen}
                        />
                    ) : null}
                </div>
            </div>
        </>
    );
};
