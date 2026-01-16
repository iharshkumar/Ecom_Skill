const express = require('express');
//s1
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); //to allow cross-origin requests
//const express = require('express');
const bcrypt = require('bcrypt');
const { rateLimit } = require('express-rate-limit');
const jwt = require('jsonwebtoken');
//const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const secretkey = process.env.SECRETKEY


//module 


//configuration for rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
})


// const nodemailer = require('nodemailer');
// 
// // Gmail SMTP configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail', 
//   auth: {
//     user: process.env.GMAIL_USER, 
//     pass: process.env.GMAIL_APP_PASSWORD 
//   }
// });

// // Test connection first
// console.log('🔗 Testing Gmail connection...');
// transporter.verify((error, success) => {
//   if (error) {
//     console.log('❌ Connection failed:', error.message);
//     console.log('💡 Possible fixes:');
//     console.log('   1. Check if 2-Step Verification is enabled');
//     console.log('   2. Generate a new App Password');
//     console.log('   3. Make sure email address is correct');
//   } else {
//     console.log('✅ Gmail connection successful!');
//     sendEmail();
//   }
// });

// Email configuration
// const mailOptions = {
//   from: process.env.GMAIL_USER,
//   to: '2020aara@gmail.com', 
//   subject: 'Test Email from Gmail',
//   text: 'Hello! This is a test email sent through Gmail using Nodemailer.',
//   html: `
//     <h2>Hello from Gmail!</h2>
//   `
// };

// console.log('📧 Sending email...');

// Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log('❌ Error occurred:', error.message);
//   } else {
//     console.log('✅ Email sent successfully!');
//     console.log('Message ID:', info.messageId);
//     console.log('Response:', info.response);
//   }
// });


app.use(limiter);
//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Global request logger removed



app.use(cors()); // Allow all origins for now to ensure production works

//s2
async function connection() {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: 'test' });
}

//s3

let productschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: Number,
    rating: {
        rate: Number,
        count: Number
    },
    image: {
        type: String,
        required: true
    },
    images: [String],
    category: {
        type: String,
        default: 'General'
    },
    brand: {
        type: String,
        default: 'Generic'
    },
    description: String,
    sizes: [String],
    reviews: [{
        user: String,
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now }
    }],
    questions: [{
        user: String,
        question: String,
        answer: String,
        date: { type: Date, default: Date.now }
    }]
});


//s4
let productmodel = new mongoose.model('products', productschema);





//api.health-checkup 
app.get('/status', (req, res) => {
    res.json({
        message: 'Server is running'
    });
})

//products api
// app.get('/products',(req,res)=>{
//     res.json({});
// });

//userschema
//username password 
let userschema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
});

let usermodel = new mongoose.model('users', userschema);



app.post('/products', async (req, res) => {
    try {
        // Pass req.body directly to support both single object and array of objects
        let productdata = await productmodel.insertMany(req.body);
        res.status(201).json({
            message: 'Product(s) created successfully',
            data: productdata
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});



app.post('/register', async (req, res) => {
    try {
        const users = Array.isArray(req.body) ? req.body : [req.body];

        const usernames = users.map(u => u.username);
        const emails = users.map(u => u.email);

        // Check for existing users
        const existingUsers = await usermodel.findOne({
            $or: [{ username: { $in: usernames } }, { email: { $in: emails } }]
        });

        if (existingUsers) {
            return res.status(400).json({
                message: 'One or more users already exist with the same username or email'
            });
        }

        // Hash passwords and prepare for insertion
        const usersToInsert = await Promise.all(users.map(async (user) => {
            const hashpassword = await bcrypt.hash(user.password, 10);
            return {
                username: user.username,
                password: hashpassword,
                email: user.email
            };
        }));

        const result = await usermodel.insertMany(usersToInsert);

        res.status(201).json({
            message: 'User(s) registered successfully',
            count: result.length
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// how can i implement login
//s1- fetch the user details from the db
////s2 - compare the password
//s3 - if password matches then send success else failure   
//s4 - if it matches generate a jwt token and send it to the user
//s5 - for protected routes verify the token


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usermodel.find({ username });
        if (!user || user.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        let finaluser = await bcrypt.compare(password, user[0].password);
        if (!finaluser) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // generate a token if details are authentucated using
        //1. payload 
        //2. secret key
        // 3. expiration date 
        let payload = {
            username: username
        };
        let token = await jwt.sign(payload, secretkey, { expiresIn: '1h' });
        if (!token) {
            return res.status(500).json({ message: 'Token generation failed' });
        }

        //send the token to the user
        res.status(200).json({
            message: 'Login successful', token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Groq Chat Endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        // 1. Fetch all products to build context
        const products = await productmodel.find({});

        // 2. Create a systematic context string (Highly Optimized for Rate Limits)
        // Limit to top 20 products to stay within 6000 TPM limit
        const limitedProducts = products.slice(0, 20);

        const productContext = limitedProducts.map(p =>
            `${p.title}|₹${p.price}|${p.category}|${p.description ? p.description.substring(0, 100) : "N/A"}`
        ).join('\n');

        const systemInstruction = `You are an AI Shopping Assistant. 
        CONTEXT:
        ${productContext}
        
        RULES:
        1. Answer in the user's chosen language (English, Hindi, Kannada, Hinglish).
        2. STRICTLY use only the provided product data.
        3. No probing or external info.
        
        Current User Question: ${message}`;

        // 3. Initialize Groq
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        // 4. Prepare messages for Groq (System + History + User)
        // Keep only last 10 messages to save context window
        const recentHistory = (history || []).slice(-10);

        const groqMessages = [
            { role: "system", content: systemInstruction },
            ...recentHistory.map(msg => ({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.text || msg.parts?.[0]?.text || ""
            })),
            { role: "user", content: message }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: groqMessages,
            model: "llama-3.1-8b-instant",
            temperature: 0.6,
            max_tokens: 1024,
        });

        const reply = chatCompletion.choices[0]?.message?.content || "Maaf kijiye, main abhi answer nahi de pa raha hoon.";

        res.json({ reply });

    } catch (error) {
        console.error("Groq Chat Error:", error);
        res.status(500).json({ message: "Failed to generate response", error: error.message });
    }
});



//api1-which deletes the users
app.delete('/users', async (req, res) => {
    try {
        const { _id } = req.body;
        const deletedUser = await usermodel.findByIdAndDelete(_id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'User deleted successfully'
        }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);



//perform curd operations on users
//api1-which deletes



// async function hashing(){
//     //hashing logic
//     let password="Harsh@123";
//     let hashpassword = await bcrypt.hash(password, 5,)
//     console.log(`Password:`, hashpassword);
// }

// hashing();



//api-s\fetch all the products from db
app.get('/products', async function (req, res) {
    try {
        let Allproducts = await productmodel.find()
        res.status(200).json(Allproducts)
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
})

//api for delete
//api for delete
app.delete('/products/:id', async function (req, res) {
    try {
        const { id } = req.params;
        const deleted = await productmodel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Product not found' });
        }


        res.status(200).json({
            message: 'Product deleted successfully',
            deleted
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

//api for update
app.put('/products/:id', async function (req, res) {
    try {
        const { id } = req.params;
        const updatedProduct = await productmodel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//data
//body - req.body
//query - req.query
//params - req.params
// request header - req.headers
// cookies - req.cookies

//api using query   


app.get('/details', function (req, res) {
    const age = req.query.age;
    const location = req.query.location;
    res.send(`The user is ${age} and location is ${location}`)
})





app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
    connection();
    console.log('Connected to MongoDB');
});
