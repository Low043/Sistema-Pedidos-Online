import type { Express } from "express";
import Funcionario from "../services/Funcionario";
import path from "path";

export default function routes(app: Express) {
    app.get('/getFuncionarios', (req, res) => {
        res.status(200).send('Lista de funcionários');
    });

    app.post('/createFuncionario', (req, res) => {
        const { nome, idade, cargo } = req.body;

        Funcionario.create(nome, idade, cargo);

        res.status(200).send('Funcionário criado com sucesso');
    });

    app.get('/exibirFuncionarios', (req, res) => {
        const contaUltraSecreta = 1 + 1;
        res.render(path.join(__dirname, '..', 'views', 'funcionarios.ejs'), {
            nome: 'Luis Gustavo',
            resultado: contaUltraSecreta
        });
    });
}