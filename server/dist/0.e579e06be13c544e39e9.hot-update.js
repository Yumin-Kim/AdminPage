exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 15:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(__webpack_require__(16));
const photo_entity_1 = __webpack_require__(17);
console.log('ORM Connection');
const connectionOptions = {
    type: 'mysql',
    database: 'test',
    port: 3306,
    host: 'localhost',
    username: 'root',
    password: 'admin',
    entities: [path_1.default.join(__dirname, '**', '*.entity.{ts}'), photo_entity_1.Photo],
    synchronize: false,
    dropSchema: false,
    migrationsRun: false,
    migrations: [getMigrationDirectory()],
    cli: {
        migrationsDir: 'src/migrations',
    },
};
function getMigrationDirectory() {
    const directory = process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
    return `${directory}/migrations/**/*{.ts}`;
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
/******/ 		__webpack_require__.h = () => "057d33ceda4f9da5920b"
/******/ 	})();
/******/ 	
/******/ }
;