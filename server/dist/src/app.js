"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const DatabaseClient_1 = __importDefault(require("./core/DatabaseClient"));
require("reflect-metadata");
const RouterLoaderService_1 = __importDefault(require("./routes/Services/RouterLoaderService"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const cors = cors_1.default;
const routerService = new RouterLoaderService_1.default(app);
const allowedOrigins = ['http://localhost:8080', 'https://api.contentgenerator.com'];
const PORT = parseInt(process.env.PORT || '3000'), HOST = String(process.env.HOST || 'localhost'), ORIGIN = String(process.env.ORIGIN || 'http://localhost:3000').trim(), BYPASS_CORS = String(process.env.BYPASS_CORS).trim() === 'true' ||
    String(process.env.BYPASS_CORS).trim() === '1';
// app.use(
//   cors({
//     origin: BYPASS_CORS ? '*' : `${ORIGIN}:${PORT}`,
//   })
// );
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://api.contentgenerator.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const db = DatabaseClient_1.default.getInstance();
db.then(() => {
    DatabaseClient_1.default.setStatus('Connected');
}).catch((error) => {
    if (error.code === 'ECONNREFUSED') {
        console.error('Database connection refused');
        return;
    }
    DatabaseClient_1.default.setStatus('Connected');
});
//userTokenService.checkToken();
routerService.loadRoutes();
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API!',
        status: 200,
    });
});
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
//# sourceMappingURL=app.js.map