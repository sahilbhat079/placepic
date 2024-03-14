import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import placesHandler from './api/places.js';
import userPlacesHandler from './api/user-places.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// CORS configuration
const corsOptions = {
  origin: '*', // Allow requests from any origin. Adjust as needed.
  methods: ['GET', 'PUT'], // Allow GET and PUT requests
};

// Serve images from the public/images directory
const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesPath = join(__dirname, './public/images');
app.use('/images', express.static(imagesPath));

// Enable CORS middleware
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(bodyParser.json());

// Define routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use('/api/places', placesHandler);
app.use('/api/user-places', userPlacesHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
