import express from "express";
const router = express.Router();

import userControllers from '../controllers/userControllers.js';
/**
 * @openapi
 * /strp-api/discord/users/getOnlineMembers:
 *   get:
 *     description: Get all the Discord Channels Name of Particular Guild
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getOnlineMembers', userControllers.OnlineMembers);
/**
 * @openapi
 * /strp-api/discord/users/getUserData/{id}:
 *   get:
 *     description: Get the Userdata of the user in Particular Guild
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getUserData/:id', userControllers.UserData);
/**
 * @openapi
 * /strp-api/discord/users/getUserRoles/{id}:
 *   get:
 *     description: Get the Userroles of the user in Particular Guild
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getUserRoles/:id', userControllers.UserRoles);

/**
 * @openapi
 * /strp-api/discord/users/getUserRole/{id}:
 *   get:
 *     description: Get the Userroles of the user in Particular Guild
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getUserRole/:id', userControllers.UserRole);

export default router;