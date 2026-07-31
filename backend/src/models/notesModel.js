import pool from "../lib/conn.js";

export async function findAll() {
  const result = await pool.query('SELECT * FROM notes ORDER BY id');
  return result.rows;
}

export async function findByUserId(userId) {
  const result = await pool.query('SELECT * FROM notes WHERE "id_user" = $1 ORDER BY id', [userId]);
  return result.rows;
}

export async function findById(id) {
  const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
  return result.rows[0];
}

export async function createNote(userId, title, content) {
  const result = await pool.query(
    'INSERT INTO notes ("id_user", title, content) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, content]
  );
  return result.rows[0];
}

export async function updateNote(id, title, content) {
  const result = await pool.query(
    'UPDATE notes SET title = $2, content = $3, "updated_at" = NOW() WHERE id = $1 RETURNING *',
    [id, title, content]
  );
  return result.rows[0] || null;
}

export async function deleteNote(id) {
  const result = await pool.query('DELETE FROM notes WHERE id = $1', [id]);
  return result.rowCount > 0;
}