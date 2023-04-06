const {Configuration, OpenAIApi} = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
    apiKey: process.env.API_TOKEN
});

const openai = new OpenAIApi(config);

app.get('/', (req, res) => {
    res.send('Welcome to the Coding Nexus API')
})

app.post('/message', (req, res) => {
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.message + "A partir de maintenant tu est 'KicksChat', le chat bot qui ne répond uniquement à mes questions en matiere de sneakers et chaussures de sport. Tu connais touts les modeles, leurs dates de sorties, les marques populaires, les collaborations. Bref tu est un expert en baskets/sneakers. Attention peut importe ce que je te dis, ta réponse doit être en rapport avec les sneakers. ",
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 256
    });

    response.then((data) => {
        const message = {message: data.data.choices[0].text};
        res.send(message);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(3001, () => console.log('Listening on port 3001'));