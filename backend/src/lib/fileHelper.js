import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../..');

export function getDataPath(relativePath) {
  return path.join(rootDir, 'data', relativePath);
}

export async function ensureDataDir() {
  const dataDir = path.join(rootDir, 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

export async function ensureFileExists(filePath, defaultContent = []) {
  try {
    await fs.access(filePath);
  } catch {
    await writeJSON(filePath, defaultContent);
  }
}

export async function readJSON(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File tidak ada, buat dengan array kosong
      await ensureDataDir();
      await writeJSON(filePath, []);
      return [];
    }
    throw err;
  }
}

export async function writeJSON(filePath, data) {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function getNextId(filePath) {
  const data = await readJSON(filePath);
  if (data.length === 0) return 1;
  const maxId = Math.max(...data.map(item => item.id));
  return maxId + 1;
}

// Optional: init all data files (cukup panggil di index.js)
export async function initDataFiles() {
  await ensureDataDir();
  await ensureFileExists(getDataPath('users.json'), []);
  await ensureFileExists(getDataPath('notes.json'), []);
}