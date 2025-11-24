import funcionarioController from './controllers/Funcionario';
import comidaController from './controllers/Comida';
import express from 'express';

const app = express();
app.set('view engine', 'ejs');
const port = 3000;

funcionarioController(app);
comidaController(app);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});