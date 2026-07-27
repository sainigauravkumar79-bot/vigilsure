require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');
const { startScheduler } = require('./src/services/schedulerService');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    startScheduler();
  })
  .catch(err => console.error('❌ MongoDB Error:', err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 VigilSure Backend running on http://localhost:${process.env.PORT || 5000}`);
});
