import { getDataPath, readJSON, writeJSON, getNextId } from '../lib/fileHelper.js'

const usersFilePath = getDataPath('users.json')

export async function findAll() {
    return await readJSON(usersFilePath)
}

export async function findByEmail(email) {
    const users = await readJSON(usersFilePath)
    return users.find(u => u.email === email)
}

export async function findById(id) {
    const users = await readJSON(usersFilePath)
    return users.find(u => u.id === id)
}

export async function createUser(email, password, name) {
    const users = await readJSON(usersFilePath)
    const newId = await getNextId(usersFilePath)
    const newUser = {
        id: newId,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    users.push(newUser)
    await writeJSON(usersFilePath, users)
    return newUser
}