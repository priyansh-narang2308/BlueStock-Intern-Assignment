require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const ipoRoutes = require('./routes/ipo');
const documentRoutes = require('./routes/document');
const adminRoutes = require('./routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/ipos', ipoRoutes);
app.use('/api/ipos', documentRoutes);
app.use('/api/admin', adminRoutes);


// Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
