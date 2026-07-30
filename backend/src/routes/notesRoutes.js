import { Router } from 'express';
import { getNotes, createNoteHandler, updateNoteHandler, deleteNoteHandler } from '../controllers/notesController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = Router();

// Semua route notes membutuhkan autentikasi
router.use(authenticate);

/**
 * @openapi
 * /notes:
 *   get:
 *     tags:
 *      - Notes
 *     description: Display All Notes!
 *     security:
 *      - token: []
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', getNotes);

/**
 * @openapi
 * /notes:
 *   post:
 *     tags:
 *      - Notes
 *     description: Add New Notes!
 *     requestBody:
 *       description: Input Title and Content Notes
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required:
 *              - title
 *              - content
 *             type: object
 *             properties:
 *              title:
 *               type: string
 *              content:
 *               type: string
 *     security:
 *      - token: []
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/', createNoteHandler);

/**
 * @openapi
 * /notes/{id}:
 *   patch:
 *     tags:
 *      - Notes
 *     description: Add New Notes!
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of pNotes
 *        required: true
 *        schema:
 *         type: integer
 *     requestBody:
 *       description: Input Title and Content Notes
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             required:
 *              - title
 *              - content
 *             type: object
 *             properties:
 *              title:
 *               type: string
 *              content:
 *               type: string
 *     security:
 *      - token: []
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.patch('/:id', updateNoteHandler);

/**
 * @openapi
 * /notes/{id}:
 *   delete:
 *     tags:
 *      - Notes
 *     description: Add New Notes!
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of pNotes
 *        required: true
 *        schema:
 *         type: integer
 *     security:
 *      - token: []
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.delete('/:id', deleteNoteHandler);

export default router;