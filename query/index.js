import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8002;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const snippets = {};

app.get('/snippets', (req, res) => {
    return res.status(200).json(snippets);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    if (type === 'SnippetCreated') {
        const { id, title, code } = data;
        snippets[id] = { id, title, code, comments: [] };
    }

    if (type === 'CommentCreated') {
    const { id, content, snippetID } = data;
    if (snippets[snippetID]) {
        snippets[snippetID].comments.push({ id, content });
    } else {
        console.log(`Snippet with ID ${snippetID} not found`);
    }
}
// filepath: d:\CODING PRACTICE\microservices\code snippet\query\index.js
    
    return res.status(200).json({});
});

app.listen(PORT, () => {
    console.log(`Query service listening on port ${PORT}`);
});