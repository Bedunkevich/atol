**[@bedunkevich/atol](README.md)**

> Globals

# @bedunkevich/atol

## Index

### Enumerations

* [RequestTypes](enums/requesttypes.md)
* [TaskResultStatus](enums/taskresultstatus.md)

### Type aliases

* [AtolDriverInterface](README.md#atoldriverinterface)
* [AtolResponce](README.md#atolresponce)
* [Session](README.md#session)
* [TaskResultResponce](README.md#taskresultresponce)

### Variables

* [DEFAULT\_BASE\_URL](README.md#default_base_url)
* [DELAY\_BETWEEN\_CALLS](README.md#delay_between_calls)
* [MAX\_CALLS](README.md#max_calls)

### Functions

* [delay](README.md#delay)
* [init](README.md#init)

## Type aliases

### AtolDriverInterface

Ƭ  **AtolDriverInterface**: { checkStatus: (uuid: string, callIndex?: undefined \| number) => Promise<[TaskResultStatus](enums/taskresultstatus.md)\> ; closeShift: () => AxiosPromise<[AtolResponce](README.md#atolresponce)\> ; openShift: () => AxiosPromise<[AtolResponce](README.md#atolresponce)\>  }

*Defined in [types.ts:37](https://github.com/Bedunkevich/atol/blob/e822279/src/types.ts#L37)*

#### Type declaration:

Name | Type |
------ | ------ |
`checkStatus` | (uuid: string, callIndex?: undefined \| number) => Promise<[TaskResultStatus](enums/taskresultstatus.md)\> |
`closeShift` | () => AxiosPromise<[AtolResponce](README.md#atolresponce)\> |
`openShift` | () => AxiosPromise<[AtolResponce](README.md#atolresponce)\> |

___

### AtolResponce

Ƭ  **AtolResponce**: { uuid: string  }

*Defined in [types.ts:3](https://github.com/Bedunkevich/atol/blob/e822279/src/types.ts#L3)*

#### Type declaration:

Name | Type |
------ | ------ |
`uuid` | string |

___

### Session

Ƭ  **Session**: { operator: { name: string ; vatin: string  }  }

*Defined in [types.ts:30](https://github.com/Bedunkevich/atol/blob/e822279/src/types.ts#L30)*

#### Type declaration:

Name | Type |
------ | ------ |
`operator` | { name: string ; vatin: string  } |

___

### TaskResultResponce

Ƭ  **TaskResultResponce**: { results: { error: { code: number ; description: string  } ; status: [TaskResultStatus](enums/taskresultstatus.md)  }[]  }

*Defined in [types.ts:20](https://github.com/Bedunkevich/atol/blob/e822279/src/types.ts#L20)*

#### Type declaration:

Name | Type |
------ | ------ |
`results` | { error: { code: number ; description: string  } ; status: [TaskResultStatus](enums/taskresultstatus.md)  }[] |

## Variables

### DEFAULT\_BASE\_URL

• `Const` **DEFAULT\_BASE\_URL**: \"http://127.0.0.1:16732\" = "http://127.0.0.1:16732"

*Defined in [api.ts:13](https://github.com/Bedunkevich/atol/blob/e822279/src/api.ts#L13)*

___

### DELAY\_BETWEEN\_CALLS

• `Const` **DELAY\_BETWEEN\_CALLS**: 500 = 500

*Defined in [api.ts:15](https://github.com/Bedunkevich/atol/blob/e822279/src/api.ts#L15)*

___

### MAX\_CALLS

• `Const` **MAX\_CALLS**: 3 = 3

*Defined in [api.ts:14](https://github.com/Bedunkevich/atol/blob/e822279/src/api.ts#L14)*

## Functions

### delay

▸ `Const`**delay**(`time`: number): Promise<void\>

*Defined in [helpers.ts:1](https://github.com/Bedunkevich/atol/blob/e822279/src/helpers.ts#L1)*

#### Parameters:

Name | Type |
------ | ------ |
`time` | number |

**Returns:** Promise<void\>

___

### init

▸ `Const`**init**(`__namedParameters`: { baseUrl: string ; session: [Session](README.md#session)  }): [AtolDriverInterface](README.md#atoldriverinterface)

*Defined in [index.ts:4](https://github.com/Bedunkevich/atol/blob/e822279/src/index.ts#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`__namedParameters` | { baseUrl: string ; session: [Session](README.md#session)  } |

**Returns:** [AtolDriverInterface](README.md#atoldriverinterface)
