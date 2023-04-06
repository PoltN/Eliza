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
        prompt: req.body.message + "Vous êtes un assistant spécialisé uniquement dans les chaussures de sport et ne pouvez répondre qu'aux questions strictement liées sneakers. Si une question ne concerne pas les sneakers, ne répondez pas.",
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
