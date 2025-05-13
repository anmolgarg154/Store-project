import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import storeRouter from "./routes/store.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config(); 

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type, Authorization', 
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json()); 

// Example route
app.get('/', async (req, res) => {
  try {
    res.send("OK");
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch' });
  }
});
app.use("/api/v1/store", storeRouter)
app.use("/api/v1/auth", authRoutes);


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
