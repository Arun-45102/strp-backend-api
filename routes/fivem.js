import express from "express";
const router = express.Router();
import fivemControllers from '../controllers/fivemControllers.js';

/**
 * @openapi
 * /strp-api/fivem/getFivemData:
 *   get:
 *     description: Get all the Fivem Data
 *     tags: [Fivem]
 *     responses:
 *       200:
 *         description: Success.
 */

router.get('/getFivemData', fivemControllers.getFivemData);

export default router;