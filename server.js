import express from 'express';


const app = express();
const rota = 3000;

app.use(express.json());

const users = [{
    id: 1,
    nome: 'João',
    email: 'joao@gmail.com'
}];

app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body

    const newId = users.length + 1;

    const newUser = {
        id: newId,
        nome,
        email
    }

    if (newId > 0) {
        users.push(newUser)
    }

    return res.status(200).send('Usuario criado com sucesso');

})

app.get('/usuarios', (req, res) => {
    res.json(users);
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