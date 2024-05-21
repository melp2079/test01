const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const loginRoute = require('./routes/login');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', loginRoute);

mongoose.connect('mongodb+srv://admin:admin123@myapp.n3h5bxx.mongodb.net/myapp?retryWrites=true&w=majority&appName=myapp', {
      useNewUrlParser : true,
      useUnifiedTopology : true
    }).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));




const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



