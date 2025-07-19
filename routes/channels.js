import express from "express";
const router = express.Router();
import channelControllers from '../controllers/channelControllers.js';

/**
 * @openapi
 * /strp-api/discord/channels/getChannelsData:
 *   get:
 *     description: Get all the Discord Channels from Guild
 *     tags: [Channels]
 *     responses:
 *       200:
 *         description: Success.
 */

router.get('/getChannelsData', channelControllers.ChannelsData);

/**
 * @openapi
 * /strp-api/discord/channels/getChannelName/{id}:
 *   get:
 *     description: Get all the Discord Channels Name of Particular Guild
 *     tags: [Channels]
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

router.get('/getChannelName/:id', channelControllers.ChannelName);

/**
 * @openapi
 * /strp-api/discord/channels/getChannelMessages/{id}:
 *   get:
 *     description: Get all the Discord Channels Messages of Particular Channel
 *     tags: [Channels]
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
router.get('/getChannelMessages/:id', channelControllers.ChannelMessages);

export default router;