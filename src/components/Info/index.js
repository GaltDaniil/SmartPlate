import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import styles from './Info.module.scss';

export const Info = () => {
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

                <h2 style={{ color: 'white', fontSize: '20px' }}>Инструкция</h2>
                <FontAwesomeIcon style={{ opacity: '0' }} icon={faCircleQuestion} size="lg" />
            </div>
            <div className={styles.content}>
                <h3> Как Нутрициологу и фитнес-тренеру использовать данный сервис?</h3>

                <p>Задавать вопросы по теме нутрициологии</p>
                <p>
                    Ставить задачи выдать сбалансированный список продуктов на день на определенное
                    КБЖУ, писать рецепты по этому списку или из любых других продуктов
                </p>
                <p>
                    Выдавать список продуктов, в которых содержатся те или иные микро и
                    макронутриенты
                </p>
                <h4>В целом, вы можете использовать бота для:</h4>
                <p>✅ Создания гайдов, собирая информацию с бота с помощью вопросов и задач</p>
                <p>✅ Создания планов питания для клиентов</p>
                <p>✅ Создания постов в социальных сетях</p>
                <p>✅ Организации марафонов и курсов, связанных с нутрициологией</p>

                <h3>
                    1) Формулируйте запрос ясно и конкретно. Чем более точное и развернутое описание
                    вы дадите, тем более точный будет ответ.
                </h3>
                <p>
                    <b>Не правильно:</b> <em>"Составь рацион питания для похудения”</em>
                </p>
                <p>
                    <b>Правильно:</b>{' '}
                    <em>
                        "Напиши список продуктов на день на 100 гр белка, 50гр жира и 200гр
                        углеводов. Напиши количество грамм продуктов в сыром виде. Сбалансируй по
                        диетическим рекомендациям для баланса витаминов, минералов и клетчатки.
                        Добавь крупы, растительное масло, мясо и творог” И затем, получив список
                        продуктов, напишите боту составить определенное количество рецептов из
                        данного количества продуктов
                    </em>
                </p>
                <span>Важно!</span>
                <p>
                    Имейте в виду, бот может допускать ошибки, если вы сформулировали запрос
                    неверно. Если бот дает ответ не совсем точный, просите его изменить.
                </p>
                <img src="/screenshots/1.jpg" alt="" />
                <img src="/screenshots/3.jpg" alt="" />
                <p>
                    Имейте в виду, бот может допускать ошибки, если вы сформулировали запрос
                    неверно. Если бот дает ответ не совсем точный, просите его изменить.
                </p>
                <img src="/screenshots/4.jpg" alt="" />
                <p>
                    Данный ответ лучше предыдущего, осталось изменить, чтобы он картофельное пюре и
                    рис посчитал в граммах до приготовления
                </p>
                <p>
                    В боте могут быть не совсем точные формулировки, потому что искусственный
                    интеллект создан на базе международного английского языка, и он автоматически
                    вам переводит на русский.
                </p>
                <h3>
                    2) Используйте ключевые слова. Указание ключевых слов поможет системе определить
                    контекст вашего запроса и дать более точный ответ.
                </h3>
                <p>
                    <b>Не правильно:</b>{' '}
                    <em>
                        "Напиши рецепт из курицы" Правильно: "У меня есть 200 грамм курицы,
                        луковица, 3 картофеля, перец и 200 грамм макарон. Напиши 2 варианта
                        диетических рецептов"
                    </em>
                </p>
                <img src="/screenshots/5.jpg" alt="" />
                <h3>
                    3) Старайтесь задавать открытые вопросы и писать максимум деталей для наиболее
                    точного ответа.{' '}
                </h3>
                <p>
                    <b>Не правильно:</b>{' '}
                    <em>
                        “Сколько калорий нужно употреблять, чтобы снизить вес при весе 67кг и росте
                        160 см?”
                    </em>
                </p>
                <img src="/screenshots/6.jpg" alt="" />
                <p>
                    <b>Правильно:</b> Напишите максимум деталей: пол, возраст, рост, количество
                    шагов в день, образ жизни, наличие тренировок и их интенсивности. Однако,
                    нутрициологам и фитнес-тренерам я предлагаю самостоятельно считать КБЖУ
                    потребления, так как вы знаете своего клиента лучше, чем бот.
                </p>
                <img src="/screenshots/7.jpg" alt="" />
                <p>
                    Вот еще пример: указывайте единицы измерения. Например, в каком формате написать
                    нормы: в граммах на 1 кг массы тела. Максимум конкретики!
                </p>
                <img src="/screenshots/8.jpg" alt="" />
                <p>
                    Вы также можете использовать бота для уточнения нюансов питания определенных
                    слоев населения:
                </p>
                <img src="/screenshots/9.jpg" alt="" />
                <p>
                    Бот запоминает ваши верхние 12 ответов и учитывает контекст. Можете продолжать
                    задавать уточняющие вопросы:
                </p>
                <img src="/screenshots/10.jpg" alt="" />
                <p>
                    На основе подобных ответов вы можете просить бота сформировать рацион питания на
                    день, задав примерный запрос: “А теперь составь рацион питания на день кормящей
                    женщине, учитывая ее повышенные потребности в тех элементах, которые ты указал”.
                </p>
                <p>
                    Вы можете использовать ответы для создания гайдов. Например, гайд по витаминам и
                    минералам, их потребностях при кормлении и список продуктов, содержащие данные
                    элементы.
                </p>
                <h3>
                    4) Не задавайте слишком много вопросов в одном запросе. Это может привести к
                    тому, что система не сможет дать полноценный ответ на каждый из вопросов
                </h3>
                <p>
                    <b>Не правильно:</b>
                    <em>
                        "Сколько калорий нужно употреблять, чтобы снизить вес при весе 67кг и росте
                        160 см? Стоит ли считать КБЖУ каждого блюда? Есть ли какие-то ресурсы
                        помогающие составлять рационы?"
                    </em>
                </p>
                <p>
                    <b>Правильно:</b>
                    <em>
                        "Сколько калорий нужно употреблять, чтобы снизить вес при весе 67кг и росте
                        160 см и сидячем образе жизни? Возраст 34 года, женщина"
                    </em>
                </p>
                <p>
                    Однако, напоминаю о том, что фитнес-тренерам и нутрициологам следует расчитывать
                    КБЖУ самостоятельно. Вы знаете своего клиента лучше, чем бот. Также вы можете
                    узнавать информацию о популярных диетах на основе современных исследований
                </p>
                <img src="/screenshots/11.jpg" alt="" />
                <img src="/screenshots/12.jpg" alt="" />
                <p>
                    <b>Не правильно:</b>{' '}
                    <em>
                        “Сколько калорий нужно употреблять, чтобы снизить вес при весе 67кг и росте
                        160 см? Стоит ли считать КБЖУ каждого блюда? Есть ли какие-то ресурсы
                        помогающие составлять рационы?"
                    </em>
                </p>
                <p>
                    <b>Правильно:</b>{' '}
                    <em>
                        "Сколько калорий нужно употреблять, чтобы снизить вес при весе 67кг и росте
                        160 см и сидячем образе жизни? Возраст 34 года, женщина"
                    </em>
                </p>
                <p>
                    Однако, напоминаю о том, что фитнес-тренерам и нутрициологам следует расчитывать
                    КБЖУ самостоятельно. Вы знаете своего клиента лучше, чем бот. Также вы можете
                    узнавать информацию о популярных диетах на основе современных исследований
                </p>
                <img src="/screenshots/13.jpg" alt="" />
                <img src="/screenshots/14.jpg" alt="" />
                <p>
                    Бот также может давать рецепты диетических десертов и считать КБЖУ. Однако,
                    проверяйте то количество КБЖУ которое он пишет. Если оно неверно, вы можете
                    уточнить у него и попросить написать исправленную пищевую ценность.
                </p>
                <img src="/screenshots/15.jpg" alt="" />
                <img src="/screenshots/16.jpg" alt="" />
                <p>
                    Проверяйте орфографию. Ошибки в написании могут затруднить понимание запроса
                    системой. Будьте вежливы и уважительны в своих запросах. Это позволит получить
                    более качественный ответ.
                </p>
            </div>
        </>
    );
};
