const express = require('express');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');
const categoryRoutes = require('./routes/categories');

const app = express();
app.use(express.json());

// استفاده از مسیرهای جداگانه
app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);
app.use('/categories', categoryRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
