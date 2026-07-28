import { getDataPath, readJSON, writeJSON, getNextId } from '../lib/fileHelper.js'

const notesFilePath = getDataPath('notes.json')

export async function findAll() {
    return await readJSON(notesFilePath)
}

export async function findByUserId(userId) {
    const notes = await readJSON(notesFilePath)
    return notes.filter(n => n.userId === userId)
}

export async function findById(id) {
    const notes = await readJSON(notesFilePath)
    return notes.find(n => n.id === id)
}

export async function createNote(userId, title, content) {
    const notes = await readJSON(notesFilePath)
    const newId = await getNextId(notesFilePath)
    const newNote = {
        id: newId,
        userId,
        title,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    notes.push(newNote)
    await writeJSON(notesFilePath, notes)
    return newNote
}

export async function updateNote(id, title, content) {
    const notes = await readJSON(notesFilePath)
    const index = notes.findIndex(n => n.id === id)
    if (index === -1) return null
    const updated = {
        ...notes[index],
        title,
        content,
        updatedAt: new Date().toISOString(),
    }
    notes[index] = updated
    await writeJSON(notesFilePath, notes)
    return updated
}

export async function deleteNote(id) {
    const notes = await readJSON(notesFilePath)
    const filtered = notes.filter(n => n.id !== id)
    if (filtered.length === notes.length) return false
    await writeJSON(notesFilePath, filtered)
    return true
}