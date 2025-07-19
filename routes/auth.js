import express from "express";
const router = express.Router();

import authControllers from '../controllers/authControllers.js';
/**
 * @openapi
 * /auth/discord:
 *   get:
 *     description: Authorize URL
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', authControllers.AuthorizeURL);
/**
 * @openapi
 * /auth/discord/callback:
 *   get:
 *     description: Callback URL
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/callback', authControllers.CallbackURL);

export default router;