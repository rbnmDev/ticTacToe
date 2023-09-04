import express from 'express';
import eventController from './controllers/eventController.js';
import cors from 'cors';
import router from './routes/router.js';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API eventos');
});

app.use('/api', router);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);