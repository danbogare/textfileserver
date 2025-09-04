import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db';
import router from './routes/fileRoute';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/file', router);
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: 'Welcome to TXT File Server'});
});
app.use((req: Request, res: Response) => {
    res.status(404).json({message: 'NOT FOUND'});
});

const port: number = Number(process.env.PORT);

connectDB();

app.listen(port, () => console.log(`Server running on port ${port}`));

