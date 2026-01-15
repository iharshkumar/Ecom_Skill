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
    originalPrice: { type: Number },
    description: { type: String },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    image: { type: String, required: true },
    images: [String],
    category: { type: String },
    brand: { type: String },
    sizes: [String]
});

const Product = mongoose.model('products', productSchema);

app.post('/products', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const products = await Product.insertMany(req.body);
            return res.status(201).json({ message: 'Products added successfully', products });
        }

        const { title, price, image, rating, description, originalPrice, category, brand, sizes, images } = req.body;
        const newProduct = new Product({
            title,
            price,
            image,
            rating: rating || { rate: 0, count: 0 },
            description,
            originalPrice,
            category,
            brand,
            sizes,
            images
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Admin Server running on port ${PORT}`));
