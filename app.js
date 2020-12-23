const express = require('express');
const app = express();
app.use(express.json())
const bookRouter = require('./routes/bookRoutes');

app.use('/books', bookRouter);
app.listen(5000, () => console.log('Server is running'));
