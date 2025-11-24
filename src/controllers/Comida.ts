import type { Express } from "express";
import path from "path";

export default function routes(app: Express) {
    app.get('/getComidas', (req, res) => {
        res.status(200).send('Lista de comidas');
    });

    app.post('/createComida', (req, res) => {
        const { nome, tipo, preco } = req.body;

        // Comida.create(nome, tipo, preco);

        res.status(200).send('Comida criada com sucesso');
    });

    app.get('/exibirComidas', (req, res) => {
        res.render(path.join(__dirname, '../views/comidas.ejs'), { nome: 'tchau' });
    });
}