import express from 'express';
import process from 'process';

import bodyParser from 'body-parser';
import loginRouter from './routers/login.js';
import registerRouter from './routers/register.js';
import personalPageRouter from './routers/personalPage.js';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//路由挂载
app.use('/api/user', loginRouter);
app.use('/api/user', registerRouter);
app.use('/api/personalPage', personalPageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m',`Server is running at port ${PORT}`);
    console.log('\x1b[36m%s\x1b[0m',`IP:http://localhost:${PORT}`);
    console.log('\x1b[36m%s\x1b[0m','Press Ctrl+C to quit');
});