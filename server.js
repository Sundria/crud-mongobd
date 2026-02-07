import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';
import cors from 'cors'

const app = express();
const prisma = new PrismaClient();

const rota = 3000;

app.use(express.json());
app.use(cors('http://localhost:3000/'));


app.post('/usuarios', async (req, res) => {
    const { name, email, age } = req.body;

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                age
            }
        });
    } catch (error) {
        return res.status(400).send(`Erro ao criar usuário: ${error.message}`);
    }

    return res.status(201).send("Usuário criado");

})

app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        await prisma.user.findMany();
    }



    res.status(200).json(users);
});

app.put('/usuarios/:id', async (req, res) => {

    const { name, email, age } = req.body;

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            name,
            email,
            age
        }
    });

    return res.status(201).send("Usuário criado");

})

app.delete("/usuarios/:id", async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });
    return res.status(200).json({ message: "Usuário deletado com sucesso" });
})

app.listen(rota, () => {
    console.log(`Rota em https://localhost${rota}`);
}
)

/*
    Criar uma API de usuarios

    - criar um usuario
    - listar usuarios
    - atualizar usuarios
    - deletar usuarios

*/