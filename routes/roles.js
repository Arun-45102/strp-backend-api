import express from "express";
const router = express.Router();
import roleControllers from '../controllers/roleControllers.js';
/**
 * @openapi
 * /strp-api/discord/roles/getRolesData:
 *   get:
 *     description: Get all the Roles in Particular Guild
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getRolesData', roleControllers.RolesData);
/**
 * @openapi
 * /strp-api/discord/roles/getRolesName/{id}:
 *   get:
 *     description: Get the Role Name of Particular Role ID
 *     tags: [Roles]
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
router.get('/getRolesName/:id', roleControllers.RolesName);
/**
 * @openapi
 * /strp-api/discord/roles/getRoleData/{id}:
 *   get:
 *     description: Get the Role Data of Particular ID
 *     tags: [Roles]
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
router.get('/getRoleData/:id', roleControllers.RoleData);

export default router;