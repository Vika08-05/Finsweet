import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// --- CORS для фронтенду ---
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Додатково вручну встановлюємо CORS-заголовки для всіх відповідей
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

app.use(express.json());

// --- Підключення MongoDB ---
const mongoUri = 'mongodb+srv://gvika739_db_user:A3Ov1WvdzbUN44T9@finsweet.vlgfrbl.mongodb.net/Finsweet?retryWrites=true&w=majority';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Моделі ---
const DataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model('data', DataSchema);

// --- Роут ---
app.get('/api/data', async (req, res) => {
  try {
    const items = await Data.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
