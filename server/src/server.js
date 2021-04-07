import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import shoppingCartRoutes from './routes/shoppingCartRoutes.routes.js';
import productRoutes from './routes/products.routes.js';
import customerRoutes from './routes/customerRoutes.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.routes.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

const DB_CONNECTION =
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/wizard-shop';

const connectionString = DB_CONNECTION;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

server.use(express.static('./client/build'));

server.get('/api', (req, res) =>
  res.json({ status: 'Server is up and running.' })
);

server.use('/api', [
  shoppingCartRoutes,
  customerRoutes,
  productRoutes,
  wishlistRoutes,
  maintenanceRoutes,
]);

const port = 4000;
server.listen(port, () => console.log(`Server listens on port ${port}.`));
