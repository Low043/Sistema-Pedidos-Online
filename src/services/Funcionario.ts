class Funcionario {
    create(nome: string, idade: number, cargo: string) {
        if (idade < 18) {
            throw new Error("Funcionário deve ser maior de idade.");
        }
    }
}

export default new Funcionario();