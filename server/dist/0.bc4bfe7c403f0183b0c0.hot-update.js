exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 8:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var common_1 = __webpack_require__(6);
var app_service_1 = __webpack_require__(9);
//req , res 에 대해서 실질적으로 분석하여 라우트간 분리??
//express에선 하나의 라우트에서 요청에 대한 분석후 주요 로직(비즈니스 로직)이 동작하게되고 res를 통해 프론트단으로 전송해주었지만
//nest는 주요동작과 req,res에 대한 처리를 분리하여 코딩한다. >> 비즈니스 로직을 하나의 서비스로 구현후 재사용할 수 있다.
var UserDro = /** @class */ (function () {
    function UserDro() {
    }
    return UserDro;
}());
var AppController = /** @class */ (function () {
    function AppController(appService) {
        this.appService = appService;
    }
    AppController.prototype.PostUser = function () {
        return this.appService.postHello();
    };
    var _a;
    __decorate([
        common_1.Post(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], AppController.prototype, "PostUser", null);
    AppController = __decorate([
        common_1.Controller(),
        __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "1b33d56009f7196107ec"
/******/ 	})();
/******/ 	
/******/ }
;