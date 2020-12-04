const express = require('express');
const app = express();

const PORT = 3000;

const plantsRouter = require('./plants.js');
app.use('/plants', plantsRouter);

app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});