const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb+srv://admin:admin123@myapp.n3h5bxx.mongodb.net/myapp?retryWrites=true&w=majority&appName=myapp', {
      useNewUrlParser : true,
      useUnifiedTopology : true
    }
).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const seedUser = async () => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password123', salt);

  const newUser = new User({
    email: 'test@example.com',
    password
  });

  await newUser.save();
  console.log('User seeded');
  mongoose.disconnect();
};

seedUser();


