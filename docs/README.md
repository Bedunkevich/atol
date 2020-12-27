**[@bedunkevich/atol](README.md)**

> Globals

# @bedunkevich/atol

## Index

### Namespaces

* [\_\_global](modules/__global.md)

### Enumerations

* [RequestTypes](enums/requesttypes.md)
* [TaskResultStatus](enums/taskresultstatus.md)

### Type aliases

* [AtolDriverInterface](README.md#atoldriverinterface)
* [Item](README.md#item)
* [MinimumArray](README.md#minimumarray)
* [Payment](README.md#payment)
* [PositionTax](README.md#positiontax)
* [Sell](README.md#sell)
* [SellRequest](README.md#sellrequest)
* [Session](README.md#session)
* [TaskResponce](README.md#taskresponce)
* [TaskResultResponce](README.md#taskresultresponce)
* [TaxationType](README.md#taxationtype)

### Variables

* [DEFAULT\_BASE\_URL](README.md#default_base_url)
* [DELAY\_BETWEEN\_CALLS](README.md#delay_between_calls)
* [MAX\_CALLS](README.md#max_calls)
* [\_clockseq](README.md#_clockseq)
* [\_lastMSecs](README.md#_lastmsecs)
* [\_lastNSecs](README.md#_lastnsecs)
* [\_nodeId](README.md#_nodeid)
* [ajv](README.md#ajv)
* [byteToHex](README.md#bytetohex)
* [poolPtr](README.md#poolptr)
* [rnds8Pool](README.md#rnds8pool)

### Functions

* [delay](README.md#delay)
* [init](README.md#init)
* [rng](README.md#rng)
* [stringify](README.md#stringify)
* [v1](README.md#v1)
* [validate](README.md#validate)

## Type aliases

### AtolDriverInterface

Ƭ  **AtolDriverInterface**: { cashIn: (sum: number) => AxiosPromise<[TaskResponce](README.md#taskresponce)\> ; cashOut: (sum: number) => AxiosPromise<[TaskResponce](README.md#taskresponce)\> ; checkStatus: (uuid: string, callIndex?: undefined \| number) => Promise<[TaskResultStatus](enums/taskresultstatus.md)\> ; closeShift: () => AxiosPromise<[TaskResponce](README.md#taskresponce)\> ; openShift: () => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> ; reportX: () => AxiosPromise<[TaskResponce](README.md#taskresponce)\> ; sell: (data: [Sell](README.md#sell)) => AxiosPromise<[TaskResponce](README.md#taskresponce)\>  }

*Defined in [types.ts:126](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L126)*

#### Type declaration:

Name | Type |
------ | ------ |
`cashIn` | (sum: number) => AxiosPromise<[TaskResponce](README.md#taskresponce)\> |
`cashOut` | (sum: number) => AxiosPromise<[TaskResponce](README.md#taskresponce)\> |
`checkStatus` | (uuid: string, callIndex?: undefined \| number) => Promise<[TaskResultStatus](enums/taskresultstatus.md)\> |
`closeShift` | () => AxiosPromise<[TaskResponce](README.md#taskresponce)\> |
`openShift` | () => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> |
`reportX` | () => AxiosPromise<[TaskResponce](README.md#taskresponce)\> |
`sell` | (data: [Sell](README.md#sell)) => AxiosPromise<[TaskResponce](README.md#taskresponce)\> |

___

### Item

Ƭ  **Item**: { amount: number ; department?: undefined \| number ; infoDiscountSum?: undefined \| number ; markingCode: { mark: string ; type?: \"other\" \| \"egais20\" \| \"egais30\"  } ; name: string ; paymentMethod?: \"fullPrepayment\" \| \"prepayment\" \| \"advance\" \| \"fullPayment\" \| \"partialPayment\" \| \"credit\" \| \"creditPayment\" ; paymentObject?: \"commodity\" \| \"excise\" \| \"job\" \| \"service\" ; price: number ; quantity: number ; tax: { sum?: undefined \| number ; type: [PositionTax](README.md#positiontax)  } ; type: \"position\"  }

*Defined in [types.ts:78](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L78)*

#### Type declaration:

Name | Type |
------ | ------ |
`amount` | number |
`department?` | undefined \| number |
`infoDiscountSum?` | undefined \| number |
`markingCode` | { mark: string ; type?: \"other\" \| \"egais20\" \| \"egais30\"  } |
`name` | string |
`paymentMethod?` | \"fullPrepayment\" \| \"prepayment\" \| \"advance\" \| \"fullPayment\" \| \"partialPayment\" \| \"credit\" \| \"creditPayment\" |
`paymentObject?` | \"commodity\" \| \"excise\" \| \"job\" \| \"service\" |
`price` | number |
`quantity` | number |
`tax` | { sum?: undefined \| number ; type: [PositionTax](README.md#positiontax)  } |
`type` | \"position\" |

___

### MinimumArray

Ƭ  **MinimumArray**<T\>: [T]

*Defined in [types.ts:115](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L115)*

#### Type parameters:

Name |
------ |
`T` |

___

### Payment

Ƭ  **Payment**: { sum: number ; type: \"cash\" \| \"electronicaly\" \| \"prepaid\" \| \"credir\" \| \"other\"  }

*Defined in [types.ts:105](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L105)*

#### Type declaration:

Name | Type |
------ | ------ |
`sum` | number |
`type` | \"cash\" \| \"electronicaly\" \| \"prepaid\" \| \"credir\" \| \"other\" |

___

### PositionTax

Ƭ  **PositionTax**: \"none\" \| \"vat0\" \| \"vat10\" \| \"vat110\" \| \"vat18\" \| \"vat118\" \| \"vat20\" \| \"vat120\"

*Defined in [types.ts:68](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L68)*

___

### Sell

Ƭ  **Sell**: { items: [MinimumArray](README.md#minimumarray)<[Item](README.md#item)\> ; payments: [MinimumArray](README.md#minimumarray)<[Payment](README.md#payment)\> ; total?: undefined \| number  }

*Defined in [types.ts:117](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L117)*

#### Type declaration:

Name | Type |
------ | ------ |
`items` | [MinimumArray](README.md#minimumarray)<[Item](README.md#item)\> |
`payments` | [MinimumArray](README.md#minimumarray)<[Payment](README.md#payment)\> |
`total?` | undefined \| number |

___

### SellRequest

Ƭ  **SellRequest**: { type: [RequestTypes](enums/requesttypes.md)  } & [Session](README.md#session) & [Sell](README.md#sell)

*Defined in [types.ts:124](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L124)*

___

### Session

Ƭ  **Session**: { operator: { name: string ; vatin?: undefined \| string  } ; taxationType: [TaxationType](README.md#taxationtype)  }

*Defined in [types.ts:60](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L60)*

#### Type declaration:

Name | Type |
------ | ------ |
`operator` | { name: string ; vatin?: undefined \| string  } |
`taxationType` | [TaxationType](README.md#taxationtype) |

___

### TaskResponce

Ƭ  **TaskResponce**: { blockedUUID: string ; isBlocked: boolean ; number: number ; uuid: string  } \| { error: { code: number ; description: string  }  }

*Defined in [types.ts:11](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L11)*

___

### TaskResultResponce

Ƭ  **TaskResultResponce**: { results: { error: { code: number ; description: string  } ; status: [TaskResultStatus](enums/taskresultstatus.md)  }[]  }

*Defined in [types.ts:50](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L50)*

#### Type declaration:

Name | Type |
------ | ------ |
`results` | { error: { code: number ; description: string  } ; status: [TaskResultStatus](enums/taskresultstatus.md)  }[] |

___

### TaxationType

Ƭ  **TaxationType**: \"osn\" \| \"usnIncome\" \| \"usnIncomeOutcome\" \| \"envd\" \| \"esn\" \| \"patent\"

*Defined in [types.ts:42](https://github.com/Bedunkevich/atol/blob/8492012/src/types.ts#L42)*

## Variables

### DEFAULT\_BASE\_URL

• `Const` **DEFAULT\_BASE\_URL**: \"http://127.0.0.1:16732\" = "http://127.0.0.1:16732"

*Defined in [api.ts:16](https://github.com/Bedunkevich/atol/blob/8492012/src/api.ts#L16)*

___

### DELAY\_BETWEEN\_CALLS

• `Const` **DELAY\_BETWEEN\_CALLS**: 1000 = 1000

*Defined in [api.ts:18](https://github.com/Bedunkevich/atol/blob/8492012/src/api.ts#L18)*

___

### MAX\_CALLS

• `Const` **MAX\_CALLS**: 3 = 3

*Defined in [api.ts:17](https://github.com/Bedunkevich/atol/blob/8492012/src/api.ts#L17)*

___

### \_clockseq

• `Let` **\_clockseq**: unknown

*Defined in [uuid/index.ts:10](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/index.ts#L10)*

___

### \_lastMSecs

• `Let` **\_lastMSecs**: number = 0

*Defined in [uuid/index.ts:13](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/index.ts#L13)*

___

### \_lastNSecs

• `Let` **\_lastNSecs**: number = 0

*Defined in [uuid/index.ts:14](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/index.ts#L14)*

___

### \_nodeId

• `Let` **\_nodeId**: unknown

*Defined in [uuid/index.ts:9](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/index.ts#L9)*

___

### ajv

• `Let` **ajv**: any

*Defined in [api.ts:20](https://github.com/Bedunkevich/atol/blob/8492012/src/api.ts#L20)*

___

### byteToHex

• `Const` **byteToHex**: any = []

*Defined in [uuid/stringify.ts:7](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/stringify.ts#L7)*

Convert array of 16 byte values to UUID string format of the form:
XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

___

### poolPtr

• `Let` **poolPtr**: number = rnds8Pool.length

*Defined in [uuid/rng.ts:2](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/rng.ts#L2)*

___

### rnds8Pool

• `Const` **rnds8Pool**: Uint8Array = new Uint8Array(256)

*Defined in [uuid/rng.ts:1](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/rng.ts#L1)*

## Functions

### delay

▸ `Const`**delay**(`time`: number): Promise<void\>

*Defined in [helpers.ts:1](https://github.com/Bedunkevich/atol/blob/8492012/src/helpers.ts#L1)*

#### Parameters:

Name | Type |
------ | ------ |
`time` | number |

**Returns:** Promise<void\>

___

### init

▸ `Const`**init**(`__namedParameters`: { baseUrl: string ; session: [Session](README.md#session)  }): [AtolDriverInterface](README.md#atoldriverinterface)

*Defined in [index.ts:4](https://github.com/Bedunkevich/atol/blob/8492012/src/index.ts#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { baseUrl: string ; session: [Session](README.md#session)  } |

**Returns:** [AtolDriverInterface](README.md#atoldriverinterface)

___

### rng

▸ **rng**(): Uint8Array

*Defined in [uuid/rng.ts:4](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/rng.ts#L4)*

**Returns:** Uint8Array

___

### stringify

▸ **stringify**(`arr`: any, `offset?`: number): string

*Defined in [uuid/stringify.ts:13](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/stringify.ts#L13)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`arr` | any | - |
`offset` | number | 0 |

**Returns:** string

___

### v1

▸ **v1**(`options?`: any, `buf?`: any, `offset?`: any): any

*Defined in [uuid/index.ts:17](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/index.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`options?` | any |
`buf?` | any |
`offset?` | any |

**Returns:** any

___

### validate

▸ **validate**(`uuid`: string): boolean

*Defined in [uuid/validate.ts:3](https://github.com/Bedunkevich/atol/blob/8492012/src/uuid/validate.ts#L3)*

#### Parameters:

Name | Type |
------ | ------ |
`uuid` | string |

**Returns:** boolean
