exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 9:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var common_1 = __webpack_require__(6);
var testing_1 = __webpack_require__(16);
var User_entity_1 = __webpack_require__(17);
//주요 동작만 구현
//req , res 이러한 매개변수를 사용하여 코딩하는것은 좋지 않다.?
var AppService = /** @class */ (function () {
    function AppService() {
    }
    AppService.prototype.getHello = function () {
        var hello = new User_entity_1.User();
        var test = new testing_1.Test();
        return "Get REquest";
    };
    AppService.prototype.postHello = function () {
        return 'Hello Post';
    };
    AppService = __decorate([
        common_1.Injectable()
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;


/***/ }),

/***/ 17:
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
var typeorm_1 = __webpack_require__(18);
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], User.prototype, "age", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;


/***/ }),

/***/ 16:
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/testing");;

/***/ }),

/***/ 18:
/***/ ((module) => {

"use strict";
module.exports = require("typeorm");;

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "083d1a9138d34a2b1b26"
/******/ 	})();
/******/ 	
/******/ }
;