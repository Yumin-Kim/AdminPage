exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var core_1 = __webpack_require__(4);
var app_module_1 = __webpack_require__(5);
var cookie_parser_1 = __importDefault(__webpack_require__(15));
var passport_1 = __importDefault(__webpack_require__(16));
var express_session_1 = __importDefault(__webpack_require__(17));
var swagger_1 = __webpack_require__(18);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app, config, document;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _a.sent();
                    config = new swagger_1.DocumentBuilder()
                        .setTitle('Test API Swagger')
                        .setDescription('Test API 문서 입니다')
                        .setVersion('1.0')
                        .addCookieAuth('connect.sid')
                        .build();
                    document = swagger_1.SwaggerModule.createDocument(app, config);
                    swagger_1.SwaggerModule.setup('api', app, document);
                    app.use(cookie_parser_1.default());
                    app.use(express_session_1.default({
                        resave: false,
                        saveUninitialized: false,
                        // secret: process.env.COOKIE_SECRET,
                        cookie: {
                            httpOnly: true,
                        },
                    }));
                    app.use(passport_1.default.initialize());
                    app.use(passport_1.default.session());
                    return [4 /*yield*/, app.listen(3000)];
                case 2:
                    _a.sent();
                    if (true) {
                        module.hot.accept();
                        module.hot.dispose(function () { return app.close(); });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "6dd81201d6b744c533fe"
/******/ 	})();
/******/ 	
/******/ }
;