const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Admin Backend Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    image: { type: String, required: true }
});

const Product = mongoose.model('products', productSchema);

app.post('/add-product', async (req, res) => {
    try {
        const { title, price, image, rating, description } = req.body;
        const newProduct = new Product({
            title,
            price,
            image,
            rating: rating || { rate: 0, count: 0 },
            description
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Admin Server running on port ${PORT}`));
