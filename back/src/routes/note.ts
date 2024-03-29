import { Router } from "express"
import { createNote, deleteNote, getNote, updateNote } from "../controllers/note"

const router = Router()

router.post("/", createNote)
router.get("/", getNote)
router.patch("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router