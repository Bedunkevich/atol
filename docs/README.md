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
* [LegacyCallback](README.md#legacycallback)
* [LegacySell](README.md#legacysell)
* [MinimumArray](README.md#minimumarray)
* [Options](README.md#options)
* [Payment](README.md#payment)
* [PositionTax](README.md#positiontax)
* [Sell](README.md#sell)
* [SellRequest](README.md#sellrequest)
* [Session](README.md#session)
* [TaskResponce](README.md#taskresponce)
* [TaskResultResponce](README.md#taskresultresponce)
* [TaxationType](README.md#taxationtype)

### Variables

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
* [legacyMapSell](README.md#legacymapsell)
* [rng](README.md#rng)
* [stringify](README.md#stringify)
* [v1](README.md#v1)
* [validate](README.md#validate)
* [validateData](README.md#validatedata)

## Type aliases

### AtolDriverInterface

Ƭ  **AtolDriverInterface**: { cashIn: (sum: number) => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> ; cashOut: (sum: number) => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> ; checkStatus: (uuid: string, callIndex?: undefined \| number) => Promise<[TaskResultStatus](enums/taskresultstatus.md)\> ; closeShift: () => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> ; fprint: any ; openShift: () => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> ; reportX: () => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> ; sell: (data: [Sell](README.md#sell)) => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\>  }

*Defined in [src/types.ts:144](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L144)*

#### Type declaration:

Name | Type |
------ | ------ |
`cashIn` | (sum: number) => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> |
`cashOut` | (sum: number) => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> |
`checkStatus` | (uuid: string, callIndex?: undefined \| number) => Promise<[TaskResultStatus](enums/taskresultstatus.md)\> |
`closeShift` | () => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> |
`fprint` | any |
`openShift` | () => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> |
`reportX` | () => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> |
`sell` | (data: [Sell](README.md#sell)) => Promise<AxiosPromise<[TaskResponce](README.md#taskresponce)\>\> |

___

### Item

Ƭ  **Item**: { amount: number ; department?: undefined \| number ; infoDiscountSum?: undefined \| number ; markingCode: { mark: string ; type?: \"other\" \| \"egais20\" \| \"egais30\"  } ; name: string ; paymentMethod?: \"fullPrepayment\" \| \"prepayment\" \| \"advance\" \| \"fullPayment\" \| \"partialPayment\" \| \"credit\" \| \"creditPayment\" ; paymentObject?: \"commodity\" \| \"excise\" \| \"job\" \| \"service\" ; price: number ; quantity: number ; tax: { sum?: undefined \| number ; type: [PositionTax](README.md#positiontax)  } ; type: \"position\"  }

*Defined in [src/types.ts:88](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L88)*

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

### LegacyCallback

Ƭ  **LegacyCallback**: (success: boolean, data: any) => void

*Defined in [src/types.ts:142](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L142)*

___

### LegacySell

Ƭ  **LegacySell**: *typeof* sellMock

*Defined in [src/mapping.ts:4](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/mapping.ts#L4)*

___

### MinimumArray

Ƭ  **MinimumArray**<T\>: [T]

*Defined in [src/types.ts:131](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L131)*

#### Type parameters:

Name |
------ |
`T` |

___

### Options

Ƭ  **Options**: Partial<{ baseUrl: string ; delayBetweenCalls: number ; maxCalls: number  }\> \| undefined

*Defined in [src/types.ts:11](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L11)*

___

### Payment

Ƭ  **Payment**: { sum: number ; type: \"cash\" \| \"0\" \| \"electronicaly\" \| \"1\" \| \"prepaid\" \| \"2\" \| \"credir\" \| \"3\" \| \"other\" \| \"4\" \| string  }

*Defined in [src/types.ts:115](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L115)*

#### Type declaration:

Name | Type |
------ | ------ |
`sum` | number |
`type` | \"cash\" \| \"0\" \| \"electronicaly\" \| \"1\" \| \"prepaid\" \| \"2\" \| \"credir\" \| \"3\" \| \"other\" \| \"4\" \| string |

___

### PositionTax

Ƭ  **PositionTax**: \"none\" \| \"vat0\" \| \"vat10\" \| \"vat110\" \| \"vat18\" \| \"vat118\" \| \"vat20\" \| \"vat120\"

*Defined in [src/types.ts:78](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L78)*

___

### Sell

Ƭ  **Sell**: { items: [MinimumArray](README.md#minimumarray)<[Item](README.md#item)\> ; payments: [MinimumArray](README.md#minimumarray)<[Payment](README.md#payment)\> ; total?: undefined \| number  }

*Defined in [src/types.ts:133](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L133)*

#### Type declaration:

Name | Type |
------ | ------ |
`items` | [MinimumArray](README.md#minimumarray)<[Item](README.md#item)\> |
`payments` | [MinimumArray](README.md#minimumarray)<[Payment](README.md#payment)\> |
`total?` | undefined \| number |

___

### SellRequest

Ƭ  **SellRequest**: { type: [RequestTypes](enums/requesttypes.md)  } & [Session](README.md#session) & [Sell](README.md#sell)

*Defined in [src/types.ts:140](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L140)*

___

### Session

Ƭ  **Session**: { operator: { name: string ; vatin?: undefined \| string  } ; taxationType: [TaxationType](README.md#taxationtype)  }

*Defined in [src/types.ts:70](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L70)*

#### Type declaration:

Name | Type |
------ | ------ |
`operator` | { name: string ; vatin?: undefined \| string  } |
`taxationType` | [TaxationType](README.md#taxationtype) |

___

### TaskResponce

Ƭ  **TaskResponce**: Partial<{ blockedUUID: string ; error: { code: number ; description: string  } ; isBlocked: boolean ; number: number ; uuid: string  }\>

*Defined in [src/types.ts:19](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L19)*

___

### TaskResultResponce

Ƭ  **TaskResultResponce**: { results: { error: { code: number ; description: string  } ; status: [TaskResultStatus](enums/taskresultstatus.md)  }[]  }

*Defined in [src/types.ts:60](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L60)*

#### Type declaration:

Name | Type |
------ | ------ |
`results` | { error: { code: number ; description: string  } ; status: [TaskResultStatus](enums/taskresultstatus.md)  }[] |

___

### TaxationType

Ƭ  **TaxationType**: \"osn\" \| \"usnIncome\" \| \"usnIncomeOutcome\" \| \"envd\" \| \"esn\" \| \"patent\"

*Defined in [src/types.ts:52](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/types.ts#L52)*

## Variables

### \_clockseq

• `Let` **\_clockseq**: unknown

*Defined in [src/uuid/index.ts:10](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/index.ts#L10)*

___

### \_lastMSecs

• `Let` **\_lastMSecs**: number = 0

*Defined in [src/uuid/index.ts:13](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/index.ts#L13)*

___

### \_lastNSecs

• `Let` **\_lastNSecs**: number = 0

*Defined in [src/uuid/index.ts:14](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/index.ts#L14)*

___

### \_nodeId

• `Let` **\_nodeId**: unknown

*Defined in [src/uuid/index.ts:9](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/index.ts#L9)*

___

### ajv

• `Let` **ajv**: any

*Defined in [src/api.ts:21](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/api.ts#L21)*

___

### byteToHex

• `Const` **byteToHex**: any = []

*Defined in [src/uuid/stringify.ts:7](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/stringify.ts#L7)*

Convert array of 16 byte values to UUID string format of the form:
XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

___

### poolPtr

• `Let` **poolPtr**: number = rnds8Pool.length

*Defined in [src/uuid/rng.ts:2](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/rng.ts#L2)*

___

### rnds8Pool

• `Const` **rnds8Pool**: Uint8Array = new Uint8Array(256)

*Defined in [src/uuid/rng.ts:1](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/rng.ts#L1)*

## Functions

### delay

▸ `Const`**delay**(`time`: number): Promise<void\>

*Defined in [src/helpers.ts:1](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/helpers.ts#L1)*

#### Parameters:

Name | Type |
------ | ------ |
`time` | number |

**Returns:** Promise<void\>

___

### init

▸ `Const`**init**(`__namedParameters`: { options: [Options](README.md#options) ; session: [Session](README.md#session)  }): [AtolDriverInterface](README.md#atoldriverinterface)

*Defined in [src/index.ts:4](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/index.ts#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { options: [Options](README.md#options) ; session: [Session](README.md#session)  } |

**Returns:** [AtolDriverInterface](README.md#atoldriverinterface)

___

### legacyMapSell

▸ `Const`**legacyMapSell**(`data`: [LegacySell](README.md#legacysell)): object

*Defined in [src/mapping.ts:6](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/mapping.ts#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`data` | [LegacySell](README.md#legacysell) |

**Returns:** object

Name | Type |
------ | ------ |
`items` | [Item](README.md#item)[] |
`payments` | [Payment](README.md#payment)[] |

___

### rng

▸ **rng**(): Uint8Array

*Defined in [src/uuid/rng.ts:4](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/rng.ts#L4)*

**Returns:** Uint8Array

___

### stringify

▸ **stringify**(`arr`: any, `offset?`: number): string

*Defined in [src/uuid/stringify.ts:13](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/stringify.ts#L13)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`arr` | any | - |
`offset` | number | 0 |

**Returns:** string

___

### v1

▸ **v1**(`options?`: any, `buf?`: any, `offset?`: any): any

*Defined in [src/uuid/index.ts:17](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/index.ts#L17)*

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

*Defined in [src/uuid/validate.ts:3](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/uuid/validate.ts#L3)*

#### Parameters:

Name | Type |
------ | ------ |
`uuid` | string |

**Returns:** boolean

___

### validateData

▸ `Const`**validateData**(`schema`: any, `data`: any): void

*Defined in [src/api.ts:33](https://github.com/Bedunkevich/atol/blob/cf69cdb/src/api.ts#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`schema` | any |
`data` | any |

**Returns:** void
