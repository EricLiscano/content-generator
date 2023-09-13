import express from 'express';
import CORS from 'cors';
import 'reflect-metadata';
import RouterLoaderService from '../routes/Services/RouterLoaderService';
import cookieParser from 'cookie-parser';

const app = express();
const cors = CORS;
const routerService = new RouterLoaderService(app);
const allowedOrigins = ['http://localhost:8080', 'https://api.contentgenerator.com'];

const PORT = parseInt(process.env.PORT || '3000'),
  HOST = String(process.env.HOST || 'localhost'),
  ORIGIN = String(process.env.ORIGIN || 'http://localhost:3000').trim(),
  BYPASS_CORS = String(process.env.BYPASS_CORS).trim() === 'true' || String(process.env.BYPASS_CORS).trim() === '1';

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

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
