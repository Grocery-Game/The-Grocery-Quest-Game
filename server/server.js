const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const app = express();

// BodyParser Middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || config.get('Customer.dbConfig.port');

// serve static build files while in propsData
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./', 'client', 'build', 'index.html'))
  } )
}

app.listen(port, () => console.log(`Server started on ${port}`));