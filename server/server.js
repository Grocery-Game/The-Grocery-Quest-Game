const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// load config
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

const app = express();

// BodyParser Middleware
app.use(express.json());

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/mapMaker', require('./routes/api/mapMaker'));

const PORT = process.env.PORT || 3000;

// serve static build files while in propsData
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./', 'client', 'build', 'index.html'))
  } )
}

app.listen(PORT, () => console.log(`Server started on ${PORT}`));