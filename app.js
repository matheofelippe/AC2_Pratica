const express = require('express');
const app = express();
const { randomUUID } = require('crypto');
app.use(express.json());
app.listen(3000, () => console.log('Servidor rodando na porta: 3000'));

const clientes = [
    { id: randomUUID(), nome: 'Felippe', idade: 24, ra: '180958' },
    { id: randomUUID(), nome: 'Dhavi', idade: 31, ra: '240409' },
    { id: randomUUID(), nome: 'Alessandro', idade: 22, ra: '229926' },
    { id: randomUUID(), nome: 'Fabio', idade: 50, ra: '152594' }
];

const exames = [
    { nome: 'Radiografia', clinica: 'Clínica Imed Saúde', id: randomUUID() },
    { nome: 'Hemograma', clinica: 'Clínica Modelo', id: randomUUID() },
    { nome: 'Eletrocardiograma', clinica: 'Clínica Saúde Familia', id: randomUUID() }
];

app.get("/clientes", (request, response) => {
    return response.json(clientes);
});

app.get("/exames", (request, response) => {
    return response.json(exames);
});

app.post("/clientes", (request, response) => {
    const { nome, idade, ra } = request.body;

    const cliente = {
        id: randomUUID(),
        'nome': nome,
        'idade': idade,
        'ra' : ra
    }
    clientes.push(cliente);
    return response.status(201).json(cliente);
})

app.post("/exames", (request, response) => {
    const { nome, clinica } = request.body;

    const exame = {
        'nome': nome,
        'clinica': clinica,
        id: randomUUID()
    }
    exames.push(exame);
    return response.status(201).json(exame);
})

app.put("/clientes/:id", (request, response) => {
    const { id } = request.params;
    const { nome, idade, ra } = request.body;

    const index = clientes.findIndex(cliente => cliente.id === id);

    if (index === -1) {
        return response.status(404).json({ error: "Cliente não encontrada" });
    }

    clientes[index] = {
        ...clientes[index],
        nome: nome || clientes[index].nome,
        idade: idade || clientes[index].idade,
        ra: ra || clientes[index].ra
    };

    return response.json(clientes[index]);
});

app.put("/exames/:id", (request, response) => {
    const { id } = request.params;
    const { nome, clinica } = request.body;

    const index = exames.findIndex(exame => exame.id === id);

    if (index === -1) {
        return response.status(404).json({ error: "Exame não encontrado" });
    }

    exames[index] = {
        ...exames[index],
        nome: nome || exames[index].nome,
        clinica: clinica || exames[index].clinica,
    };

    return response.json(exames[index]);
});

app.delete("/clientes/:id", (request, response) => {
    const { id } = request.params;

    const index = clientes.findIndex(cliente => cliente.id === id);

    if (index === -1) {
        return response.status(404).json({ error: "Cliente não encontrada" });
    }

    clientes.splice(index, 1);

    return response.status(200).json({ message: "Cliente excluído com sucesso" });
});

app.delete("/exames/:id", (request, response) => {
    const { id } = request.params;

    const index = exames.findIndex(exame => exame.id === id);

    if (index === -1) {
        return response.status(404).json({ error: "Exame não encontrada" });
    }

    exames.splice(index, 1);

    return response.status(200).json({ message: "Exame excluído com sucesso" });
});