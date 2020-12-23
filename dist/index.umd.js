/*!
 * @bedunkevich/atol v0.0.2
 * (c) Stanislav Bedunkevich
 * Released under the MIT License.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('uuid')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios', 'uuid'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.atol = {}, global.axios, global.uuid));
}(this, (function (exports, axios, uuid) { 'use strict';

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
    })(RequestTypes || (RequestTypes = {}));

    var DEFAULT_BASE_URL = 'http://127.0.0.1:16732';
    var MAX_CALLS = 3;
    var DELAY_BETWEEN_CALLS = 500;
    var API = (function (session, baseURL) {
        if (baseURL === void 0) { baseURL = DEFAULT_BASE_URL; }
        var API = axios__default['default'].create({
            baseURL: baseURL,
            timeout: 1000,
        });
        var operator = session.operator;
        var post = function (uuid, request) {
            return API.post('/api/v2/request', { uuid: uuid, request: request });
        };
        var get = function (uuid) {
            return API.get("/api/v2/request/" + uuid);
        };
        /*
         * Открытие смены
         */
        var openShift = function () {
            var uuid$1 = uuid.v1();
            return post(uuid$1, [
                {
                    type: RequestTypes[RequestTypes.openShift],
                    operator: operator,
                },
            ]);
        };
        /*
         * Закрытие смены
         */
        var closeShift = function () {
            var uuid$1 = uuid.v1();
            return post(uuid$1, [
                {
                    type: RequestTypes[RequestTypes.closeShift],
                    operator: operator,
                },
            ]);
        };
        var checkStatus = function (uuid, callIndex) {
            if (callIndex === void 0) { callIndex = 0; }
            return __awaiter(void 0, void 0, void 0, function () {
                var results, status_1, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, get(uuid)];
                        case 1:
                            results = (_b.sent()).data.results;
                            status_1 = (_a = results === null || results === void 0 ? void 0 : results[0]) === null || _a === void 0 ? void 0 : _a.status;
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
                            error_1 = _b.sent();
                            return [2 /*return*/, TaskResultStatus['error']];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return { openShift: openShift, closeShift: closeShift, checkStatus: checkStatus };
    });

    var init = function (_a) {
        var session = _a.session, baseUrl = _a.baseUrl;
        return API(session, baseUrl);
    };

    exports.init = init;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
