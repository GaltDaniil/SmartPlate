declare module '*.scss';

export interface PaymentInfo {
    amount: number;
    date: string;
}
export type Messages = {
    message: string;
    date: string;
};

export interface WithdrawRequests {
    amount: number;
    cardNumber: number;
    cardName: string;
    comment: string;
    type: string;
    date: Date;
    status: 'Ожидается' | 'Выполнен' | 'Отмена';
}

export interface UserData {
    userId: number;
    name: string;
    userName: string;
    avatar: string;
    phone: string;
    profession: string;
    metrics: {
        utm_source: string;
        utm_medium: string;
        utm_campaign: string;
    };
    referralSystem:
        | {
              link: string;
              from: mongoose.Types.ObjectId;
              withdrawInfo: {
                  cardNumber: string;
                  cardFullName: string;
              };
              withdraw: number;
              withdrawRequests: object[];
          }
        | undefined;
    subscription: {
        isActive: boolean;
        dateEnd: string;
    };
    bots: object;
    chatSession: {
        activeBot: string;
        session: object[];
    };
    members: object[] | undefined;
    paymentInfo: PaymentInfo[] | undefined;
    totalAmount: number;
    messages: Messages[] | undefined;
    isNotificationSent: boolean;
    createdAt: string;
}

export interface BotData {
    img: string;
    title: string;
    miniDescription: string;
    options: {
        specialization: string;
        possibilities: string;
        adviсe: string;
    };
    name: string;
}
