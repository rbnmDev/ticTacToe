import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza esto con la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita el envío de cookies y encabezados de autorización
  }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Soy tu backend!! Huye!!!');
});

app.use('/', router);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);