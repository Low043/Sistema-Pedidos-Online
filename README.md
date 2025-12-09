# Sistema de Pedidos Online

Typescript -> Melhor controle de tipos (evitar erros antes que aconteçam)
ts-node -> Executar arquivos .ts sem buildar
nodemon -> Recarrega o código quando algo é modificado

## Modelo de .env
DATABASE_URL é usado em testes locais com start-dev e as variáveis abaixo são usadas no container docker. Eles podem apontar para bancos de dados diferentes

```bash
DATABASE_URL = "postgresql://<user>:<password>@localhost:<port>/<db_name>"

DATABASE_USER = "postgres"
DATABASE_PASSWORD = "senha"
DATABASE_NAME = "cafeteria"
```