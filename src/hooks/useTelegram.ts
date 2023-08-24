import { TelegramWebApps } from '../../node_modules/telegram-webapps-types/dist/index';

const tg = window.Telegram.WebApp;

declare global {
    interface Window {
        Telegram: {
            WebApp: TelegramWebApps.WebApp;
        };
    }
}

export const useTelegram = () => {
    return [tg];
};
