exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 17:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var path = __webpack_require__(18);
console.log('ORM Connection');
exports.connectionOptions = {
    // Other configs here
    type: 'mysql',
    database: 'test',
    port: 3306,
    host: 'localhost',
    username: 'root',
    password: 'admin',
    // My ormconfig isn't in root folder
    entities: [path.join(__dirname, '**', '*.entity.{ts}')],
    synchronize: false,
    dropSchema: false,
    migrationsRun: false,
    migrations: [getMigrationDirectory()],
    cli: {
        migrationsDir: 'src/migrations',
    },
};
function getMigrationDirectory() {
    var directory = process.env.NODE_ENV === 'migration' ? 'src' : "" + __dirname;
    return directory + "/migrations/**/*{.ts}";
}


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "6cfa4c6ba9de61f7a678"
/******/ 	})();
/******/ 	
/******/ }
;