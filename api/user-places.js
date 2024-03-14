import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const filePath = path.resolve(process.cwd(), 'data', 'user-places.json');
      const fileContent = await fs.readFile(filePath);
      const userPlaces = JSON.parse(fileContent);
      res.status(200).json({ places: userPlaces });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const filePath = path.resolve(process.cwd(), 'data', 'user-places.json');
      const places = req.body.places;
      await fs.writeFile(filePath, JSON.stringify(places));
      res.status(200).json({ message: 'User places updated!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;