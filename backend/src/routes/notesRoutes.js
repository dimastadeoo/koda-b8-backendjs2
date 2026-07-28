import { Router } from 'express'
import { getNotes, createNoteHandler, updateNoteHandler, deleteNoteHandler } from '../controllers/notesController.js'
import { authenticate } from '../middlewares/authMiddleware.js'

const router = Router()

// Semua route notes membutuhkan autentikasi
router.use(authenticate)

router.get('/', getNotes)
router.post('/', createNoteHandler)
router.patch('/:id', updateNoteHandler)
router.delete('/:id', deleteNoteHandler)

export default router