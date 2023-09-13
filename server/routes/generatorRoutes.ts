import { Router } from "express";

const generatorRoutes = Router();

generatorRoutes.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the API!',
        status: 200,
    });
});

export default generatorRoutes;