import type { AxiosPromise } from 'axios';

export type TaskResponce =
  | { uuid: string; number: number; isBlocked: boolean; blockedUUID: string }
  | {
      error: {
        code: number;
        description: string;
      };
    };

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
    vatin: string; // ИНН оператора
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
  infoDiscountSum?: number; // Информационная скидка. Не влияет на сумму позиции, остальные параметры должны передаваться с учетом её.
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
  markingCode: {
    type?: 'other' | 'egais20' | 'egais30'; // Тип марки. По умолчанию: other
    mark: string; // base64-представление кода маркировки
  };
};

export type Payment = {
  type:
    | 'cash' // наличными
    | 'electronicaly' // безналичными
    | 'prepaid' // предварительная оплата (аванс)
    | 'credir' // последующая оплата (кредит)
    | 'other'; // иная форма оплаты (встречное предоставление)
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

export type AtolDriverInterface = {
  openShift: () => AxiosPromise<TaskResponce>;
  closeShift: () => AxiosPromise<TaskResponce>;
  cashIn: (sum: number) => AxiosPromise<TaskResponce>;
  cashOut: (sum: number) => AxiosPromise<TaskResponce>;
  sell: (data: Sell) => AxiosPromise<TaskResponce>;
  checkStatus: (uuid: string, callIndex?: number) => Promise<TaskResultStatus>;
};
