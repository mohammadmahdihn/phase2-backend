const express = require('express');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');
const categoryRoutes = require('./routes/categories');
const usersRoutes = require('./routes/users');
const scoreboardRoutes = require('./routes/scoreboard');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', usersRoutes);
app.use('/scoreboard', scoreboardRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
