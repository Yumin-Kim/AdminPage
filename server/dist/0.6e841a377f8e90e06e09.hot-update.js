exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 5:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var common_1 = __webpack_require__(6);
var config_1 = __webpack_require__(7);
var app_controller_1 = __webpack_require__(8);
var app_service_1 = __webpack_require__(9);
// import { LoggerMiddleWare } from './middlewares/logger.middleware';
// import { DmsModule } from './dms/dms.module';
// import { Database } from './database/database.providers';
// import { DatabaseModule } from './database/database.module';
var typeorm_1 = __webpack_require__(10);
var ormconfig_1 = __importDefault(__webpack_require__(15));
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        // consumer.apply(LoggerMiddleWare).forRoutes('*');
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [config_1.ConfigModule.forRoot(), typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default)],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ 15:
/***/ ((module) => {

"use strict";

var connectionOptions = {
    type: 'mysql',
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/src/entities/**/*.ts'],
    subscribers: [__dirname + '/src/subscribers/**/*.ts'],
    migrations: [__dirname + '/databases/migrations/**/*.ts'],
    migrationsTableName: 'migrations',
    cli: {
        entitiesDir: 'src/entities',
        subscribersDir: 'src/subscribers',
        migrationsDir: 'databases/migrations',
    },
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    dropSchema: false,
};
function getMigrationDirectory() {
    var directory = process.env.NODE_ENV === 'migration' ? 'src' : "" + __dirname;
    return directory + "/migrations/**/*{.ts,.js}";
}
module.exports = connectionOptions;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "7e8f255e219231c93e57"
/******/ 	})();
/******/ 	
/******/ }
;