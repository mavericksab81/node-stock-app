"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://hello_flask:hello_flask@localhost:5432/test_db',
    idleTimeoutMillis: 30000
});
//# sourceMappingURL=db.config.js.map