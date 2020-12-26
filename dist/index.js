/*!
 * @bedunkevich/atol v0.1.0
 * (c) Stanislav Bedunkevich
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var $schema = "http://json-schema.org/draft-07/schema#";
var $ref = "#/definitions/Session";
var definitions = {
	Session: {
		type: "object",
		properties: {
			taxationType: {
				$ref: "#/definitions/TaxationType"
			},
			operator: {
				type: "object",
				properties: {
					name: {
						type: "string"
					},
					vatin: {
						type: "string"
					}
				},
				required: [
					"name"
				],
				additionalProperties: false
			}
		},
		required: [
			"taxationType",
			"operator"
		],
		additionalProperties: false
	},
	TaxationType: {
		type: "string",
		"enum": [
			"osn",
			"usnIncome",
			"usnIncomeOutcome",
			"envd",
			"esn",
			"patent"
		]
	}
};
var SessionSchema = {
	$schema: $schema,
	$ref: $ref,
	definitions: definitions
};

var rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
var poolPtr = rnds8Pool.length;
function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
        crypto.getRandomValues(rnds8Pool);
        poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
    return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).substr(1));
}
function stringify(arr, offset) {
    if (offset === void 0) { offset = 0; }
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    var uuid = (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
    // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!validate(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
var _nodeId;
var _clockseq;
// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;
// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    var i = (buf && offset) || 0;
    var b = buf || new Array(16);
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;
    // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        var seedBytes = options.random || (options.rng || rng)();
        if (node == null) {
            // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
            node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5],
            ];
        }
        if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = _clockseq = ((seedBytes[6] << 8) | seedBytes[7]) & 0x3fff;
        }
    }
    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs !== undefined ? options.msecs : Date.now();
    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;
    // Time since last uuid creation (in msecs)
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000;
    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = (clockseq + 1) & 0x3fff;
    }
    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    }
    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;
    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = (tl >>> 24) & 0xff;
    b[i++] = (tl >>> 16) & 0xff;
    b[i++] = (tl >>> 8) & 0xff;
    b[i++] = tl & 0xff;
    // `time_mid`
    var tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    b[i++] = (tmh >>> 8) & 0xff;
    b[i++] = tmh & 0xff;
    // `time_high_and_version`
    b[i++] = ((tmh >>> 24) & 0xf) | 0x10; // include version
    b[i++] = (tmh >>> 16) & 0xff;
    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = (clockseq >>> 8) | 0x80;
    // `clock_seq_low`
    b[i++] = clockseq & 0xff;
    // `node`
    for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
    }
    return buf || stringify(b);
}

var delay = function (time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
};

var TaskResultStatus;
(function (TaskResultStatus) {
    TaskResultStatus["ready"] = "ready";
    TaskResultStatus["error"] = "error";
    TaskResultStatus["wait"] = "wait";
    TaskResultStatus["inProgress"] = "inProgress";
    TaskResultStatus["interrupted"] = "interrupted";
    TaskResultStatus["blocked"] = "blocked";
    TaskResultStatus["canceled"] = "canceled";
})(TaskResultStatus || (TaskResultStatus = {}));
var RequestTypes;
(function (RequestTypes) {
    RequestTypes["openShift"] = "openShift";
    RequestTypes["closeShift"] = "closeShift";
    RequestTypes["cashIn"] = "cashIn";
    RequestTypes["cashOut"] = "cashOut";
    RequestTypes["sell"] = "sell";
    RequestTypes["sellReturn"] = "sellReturn";
    RequestTypes["buy"] = "buy";
    RequestTypes["buyReturn"] = "buyReturn";
    RequestTypes["reportX"] = "reportX";
})(RequestTypes || (RequestTypes = {}));

var DEFAULT_BASE_URL = 'http://127.0.0.1:16732';
var MAX_CALLS = 3;
var DELAY_BETWEEN_CALLS = 1000;
var ajv;
if (window.ajv7) {
    var Ajv = window.ajv7.default;
    ajv = new Ajv({
        allErrors: true,
        removeAdditional: true,
        useDefaults: true,
    });
}
var API = (function (session, baseURL) {
    if (baseURL === void 0) { baseURL = DEFAULT_BASE_URL; }
    var API = axios__default['default'].create({
        baseURL: baseURL,
        timeout: 1000,
    });
    if (window.ajv7) {
        var validate = ajv.compile(SessionSchema);
        if (!validate(session)) {
            console.log('%c[ATOL] [validation]', 'color:red', ajv.errorsText(validate.errors));
            throw new Error(ajv.errorsText(validate.errors));
        }
    }
    var operator = session.operator, taxationType = session.taxationType;
    var post = function (uuid, request) {
        return API.post('/api/v2/request', { uuid: uuid, request: request });
    };
    var get = function (uuid) {
        return API.get("/api/v2/request/" + uuid);
    };
    /*
     * Открытие смены
     */
    var openShift = function () { return __awaiter(void 0, void 0, void 0, function () {
        var uuid, responce, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uuid = v1();
                    console.log("%c[ATOL] [openShift] " + uuid, 'color:green');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, post(uuid, [
                            {
                                type: RequestTypes[RequestTypes.openShift],
                                operator: operator,
                            },
                        ])];
                case 2:
                    responce = _a.sent();
                    console.log("%c[ATOL] [openShift] SUCCESS", 'color:green', responce.data);
                    return [2 /*return*/, responce];
                case 3:
                    error_1 = _a.sent();
                    console.log("%c[ATOL] [openShift] FAIL", 'color:red', error_1.response.data);
                    return [2 /*return*/, error_1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    /*
     * Закрытие смены
     */
    var closeShift = function () {
        var uuid = v1();
        return post(uuid, [
            {
                type: RequestTypes[RequestTypes.closeShift],
                operator: operator,
            },
        ]);
    };
    /*
     * X-отчет
     */
    var reportX = function () {
        var uuid = v1();
        return post(uuid, [
            {
                type: RequestTypes[RequestTypes.reportX],
                operator: operator,
            },
        ]);
    };
    /*
     * Внесение наличных
     */
    var cashIn = function (cashSum) {
        var uuid = v1();
        return post(uuid, [
            {
                type: RequestTypes[RequestTypes.cashIn],
                operator: operator,
            },
            cashSum,
        ]);
    };
    /*
     * Выплата наличных
     */
    var cashOut = function (cashSum) {
        var uuid = v1();
        return post(uuid, [
            {
                type: RequestTypes[RequestTypes.cashOut],
                operator: operator,
            },
            cashSum,
        ]);
    };
    /*
     * Чек прихода – продажа
     */
    var sell = function (data) {
        var uuid = v1();
        return post(uuid, [
            __assign({ type: RequestTypes[RequestTypes.sell], taxationType: taxationType,
                operator: operator }, data),
        ]);
    };
    /*
     * Проверка статуса задания
     */
    var checkStatus = function (uuid, callIndex) {
        if (callIndex === void 0) { callIndex = 0; }
        return __awaiter(void 0, void 0, void 0, function () {
            var results, status_1, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 6]);
                        return [4 /*yield*/, get(uuid)];
                    case 1:
                        results = (_b.sent()).data.results;
                        status_1 = (_a = results === null || results === void 0 ? void 0 : results[0]) === null || _a === void 0 ? void 0 : _a.status;
                        console.log('%c[ATOL] [checkStatus]', 'color:green', results);
                        if (callIndex >= MAX_CALLS) {
                            throw new Error('MAX_CALLS LIMIT!');
                        }
                        if (!(status_1 !== TaskResultStatus['ready'])) return [3 /*break*/, 3];
                        return [4 /*yield*/, delay(DELAY_BETWEEN_CALLS)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, checkStatus(uuid, callIndex + 1)];
                    case 3: return [2 /*return*/, status_1];
                    case 4:
                        error_2 = _b.sent();
                        console.log('%c[ATOL] [checkStatus]', 'color:red', error_2.message);
                        if (callIndex >= MAX_CALLS) {
                            throw new Error('MAX_CALLS LIMIT!');
                        }
                        return [4 /*yield*/, delay(DELAY_BETWEEN_CALLS)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, checkStatus(uuid, callIndex + 1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return { openShift: openShift, closeShift: closeShift, cashIn: cashIn, cashOut: cashOut, sell: sell, reportX: reportX, checkStatus: checkStatus };
});

var init = function (_a) {
    var session = _a.session, baseUrl = _a.baseUrl;
    return API(session, baseUrl);
};

exports.init = init;
//# sourceMappingURL=index.js.map
