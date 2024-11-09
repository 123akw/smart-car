import express from 'express';
import process from 'process';

import bodyParser from 'body-parser';
import loginRouter from './routers/login.js';
import registerRouter from './routers/register.js';

const app = express();
app.use(bodyParser.json());


//路由挂载
app.use('/api', loginRouter);
app.use('/api', registerRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
    console.log(`IP:http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit');
});