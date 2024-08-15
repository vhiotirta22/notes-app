import db from '../../src/lib/db';

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      const { rows: notes } = await db.query('SELECT * FROM notes');
      res.status(200).json(notes);
      break;
    case 'POST':
      const { title, body, createdAt } = req.body;
      await db.query('INSERT INTO notes (title, body, createdAt) VALUES ($1, $2, $3)', [
        title,
        body,
        createdAt,
      ]);
      res.status(201).json({ message: 'Note created' });
      break;
    case 'PUT':
      const { id, title: updatedTitle, body: updatedBody } = req.body;
      await db.query('UPDATE notes SET title = $1, body = $2 WHERE id = $3', [
        updatedTitle,
        updatedBody,
        id,
      ]);
      res.status(200).json({ message: 'Note updated' });
      break;
    case 'DELETE':
      const { id: deleteId } = req.body;
      await db.query('DELETE FROM notes WHERE id = $1', [deleteId]);
      res.status(200).json({ message: 'Note deleted' });
      break;
    default:
      res.status(404).json({ message: 'Route not found' });
  }
};