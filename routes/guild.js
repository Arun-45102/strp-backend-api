import express from "express";
const router = express.Router();

import guildControllers from '../controllers/guildControllers.js';
/**
 * @openapi
 * /strp-api/discord/guild/getGuildData:
 *   get:
 *     description: Get all the Guild Data
 *     tags: [Guild]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getGuildData', guildControllers.GuildData);
/**
 * @openapi
 * /strp-api/discord/guild/getScheduledEvents/{id}:
 *   get:
 *     description: Get the Scheduled Events in Particular Guild
 *     tags: [Guild]
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
router.get('/getScheduledEvents/:id', guildControllers.ScheduledEvents);

export default router;