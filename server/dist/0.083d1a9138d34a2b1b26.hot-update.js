exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 11:
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
/******/ 		__webpack_require__.h = () => "dcfbcd304d40dd1a1934"
/******/ 	})();
/******/ 	
/******/ }
;