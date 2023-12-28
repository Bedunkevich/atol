import type { AxiosPromise } from 'axios';

declare global {
  interface Window {
    ajv7: {
      default: any;
    };
  }
}

export type Options =
  | Partial<{
      baseUrl: string;
      maxCalls: number;
      delayBetweenCalls: number;
      maxCodeLength: number;
      useMarkingCode: boolean;
    }>
  | undefined;

export type TaskResponce = Partial<{
  uuid: string;
  number: number;
  isBlocked: boolean;
  blockedUUID: string;
  error: {
    code: number;
    description: string;
  };
}>;

export enum TaskResultStatus {
  ready = 'ready',
  error = 'error',
  wait = 'wait',
  inProgress = 'inProgress',
  interrupted = 'interrupted',
  blocked = 'blocked',
  canceled = 'canceled',
}

export enum RequestTypes {
  openShift = 'openShift',
  closeShift = 'closeShift',
  cashIn = 'cashIn',
  cashOut = 'cashOut',
  sell = 'sell',
  sellReturn = 'sellReturn',
  buy = 'buy',
  buyReturn = 'buyReturn',
  reportX = 'reportX',
}

export type TaxationType =
  | 'osn' // общая
  | 'usnIncome' // упрощенная (Доход)
  | 'usnIncomeOutcome' // упрощенная (Доход минус Расход)
  | 'envd' // единый налог на вмененный доход
  | 'esn' // единый сельскохозяйственный налог
  | 'patent'; // патентная система налогообложения

export type TaskResultResponce = {
  results: {
    error: {
      code: number;
      description: string;
    };
    status: TaskResultStatus;
  }[];
};

export type Session = {
  taxationType: TaxationType;
  operator: {
    name: string;
    vatin?: string; // ИНН оператора
  };
};

export type PositionTax =
  | 'none' // без НДС
  | 'vat0' // НДС 0%
  | 'vat10' // НДС 10%
  | 'vat110' // НДС 10/110
  | 'vat18' // НДС 18%
  | 'vat118' // НДС 18/118%
  | 'vat20' // НДС 20%
  | 'vat120'; // НДС 20/120%

export type Item = {
  type: 'position';
  name: string; // Наименование
  price: number; // Цена за единицу товара
  quantity: number; // Количество товара
  amount: number; // Сумма позиции
  infoDiscountAmount?: number; // Информационная скидка. Не влияет на сумму позиции, остальные параметры должны передаваться с учетом её.
  tax: {
    type: PositionTax;
    sum?: number; // Сумма налога
  };
  paymentMethod?:
    | 'fullPrepayment' // По умолчанию: предоплата 100%
    | 'prepayment' // предоплата
    | 'advance' // аванс
    | 'fullPayment' // полный расчет
    | 'partialPayment' // частичный расчет и кредит
    | 'credit' // передача в кредит
    | 'creditPayment'; // оплата кредита
  paymentObject?: 'commodity' | 'excise' | 'job' | 'service'; // По умолчанию: commodity
  department?: number; // Отдел / секция. По умолчанию: 1
  // Единицы измерения количества предмета расчета
  measurementUnit?: string;
  // • 0 - Применяется для предметов расчета, которые могут быть
  // реализованы поштучно или единицами
  // • 10 - Грамм
  // • 11 - Килограмм
  // • 12 - Тонна
  // • 20 - Сантиметр
  // • 21 - Дециметр
  // • 22 - Метр
  // • 30 - Квадратный сантиметр
  // • 31 - Квадратный дециметр
  // • 32 - Квадратный метр
  // • 40 - Миллилитр
  // • 41 - Литр
  // • 42 - Кубический метр
  // • 50 - Киловатт час
  // • 51 - Гигакалория
  // • 70 - Сутки (день)
  // • 71 - Час
  // • 72 - Минута
  // • 73 - Секунда
  // • 80 - Килобайт
  // • 81 - Мегабайт
  // • 82 - Гигабайт
  // • 83 - Терабайт
  // • 255 - Применяется при использовании иных единиц измерения
  markingCode?: {
    type?: 'other' | 'egais20' | 'egais30'; // Тип марки. По умолчанию: other
    mark: string; // base64-представление кода маркировки
  };
};

export type Payment = {
  type:
    | 'cash' // наличными
    | '0'
    | 'electronicaly' // безналичными
    | '1'
    | 'prepaid' // предварительная оплата (аванс)
    | '2'
    | 'credir' // последующая оплата (кредит)
    | '3'
    | 'other' // иная форма оплаты (встречное предоставление)
    | '4'
    | string;
  sum: number;
};

export type MinimumArray<T> = [T, ...T[]];

export type Sell = {
  items: MinimumArray<Item>;
  payments: MinimumArray<Payment>;
  total?: number; // Итог чека. Может отличаться от суммы позиций на значение,
  // равное копейкам чека. Если не задан - высчитывается автоматически из суммы всех позиций
};

export type SellRequest = { type: RequestTypes } & Session & Sell;

export type LegacyCallback = (success: boolean, data: any) => void;

export type AtolDriverInterface = {
  openShift: () => Promise<AxiosPromise<TaskResponce>>;
  closeShift: () => Promise<AxiosPromise<TaskResponce>>;
  cashIn: (sum: number) => Promise<AxiosPromise<TaskResponce>>;
  cashOut: (sum: number) => Promise<AxiosPromise<TaskResponce>>;
  sell: (data: Sell) => Promise<AxiosPromise<TaskResponce>>;
  reportX: () => Promise<AxiosPromise<TaskResponce>>;
  checkStatus: (uuid: string, callIndex?: number) => Promise<TaskResultStatus>;
  fprint: any;
};

type LegacyPayment = {
  value: number;
  id: number;
};

type LegacyProduct = {
  discount: number;
  description: string;
  cost: number;
  quantity: number;
  name: string;
  total: number;
};

export type LegacyObject = {
  hurry: number;
  number: string;
  other_payments: LegacyPayment[];
  payments: {
    card: number;
    cash: number;
  };
  products: LegacyProduct[];
  topay: number;
  total_price: number;
  user: string;
};
