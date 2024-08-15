import db from '../../../src/lib/db';

// Handle GET, PUT, DELETE requests for a single note by ID
export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Mengambil satu catatan berdasarkan ID
    try {
      const result = await db.query('SELECT * FROM notes WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Catatan tidak ditemukan.' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
  } else if (req.method === 'PUT') {
    // Mengupdate catatan berdasarkan ID
    const { title, body } = req.body;
    try {
      const result = await db.query(
        'UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING *',
        [title, body, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Catatan tidak ditemukan.' });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
  } else if (req.method === 'DELETE') {
    // Menghapus catatan berdasarkan ID
    try {
      const result = await db.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Catatan tidak ditemukan.' });
      }
      res.status(200).json({ message: 'Catatan berhasil dihapus.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Metode ${req.method} tidak diizinkan`);
  }
}
