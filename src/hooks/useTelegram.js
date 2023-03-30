const tg = window.Telegram.WebApp;

export const useTelegram = () => {
    const onClose = () => {};

    return [tg, onClose];
};
