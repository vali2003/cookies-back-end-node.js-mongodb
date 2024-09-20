const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/cookies'; // Replace with your database name
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String
});

// Create a User model
const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { name, email, mobile } = req.body;

    // Create a new user instance
    const newUser = new User({ name, email, mobile });

    // Save the user to the database
    newUser.save()
        .then(() => {
            console.log('User saved:', newUser);
            res.status(200).send('Data received');
        })
        .catch(err => {
            console.error('Error saving user:', err);
            res.status(500).send('Error saving data');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
