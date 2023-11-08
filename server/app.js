const express = require('express');
const app = express();
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes');
const pdfRoutes = require('./routes/pdfRoutes');

app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/upload', uploadRoutes);
app.use('/api/pdf', pdfRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
