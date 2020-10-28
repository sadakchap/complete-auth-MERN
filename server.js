require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { connectToDB } = require('./db');
const app = express();


// MIDDLEWARES
// TODO: use CORS
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"));
}

// Routes
app.use('/api', require('./routes/auth'));

// 404
app.use((req, res) => {
    return res.status(404).json({
        error: 'Page not found'
    });
});


const PORT = process.env.PORT || 8000;
connectToDB().then(() => app.listen(PORT, () => console.log(`Server is running ${PORT}`)))
