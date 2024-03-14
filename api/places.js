import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filePath = path.resolve(process.cwd(), 'data', 'places.json');
    const fileContent = await fs.readFile(filePath);
    const placesData = JSON.parse(fileContent);
    res.status(200).json({ places: placesData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;