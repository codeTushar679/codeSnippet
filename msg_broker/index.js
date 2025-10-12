import axios from 'axios';
import express from 'express';

const app = express();
const PORT = 8005;

app.use(express.json());

app.post('/events', (req, res) => {
    const msgs = req.body;
    axios.post('http://localhost:8000/events', msgs)  // snippet service
    axios.post('http://localhost:8001/events', msgs)  // comment service
    axios.post('http://localhost:8002/events', msgs)  // query service

    return res.status(200).json({});
});

app.listen( PORT, () => {
    console.log(`Message Broker at ${PORT}`);
});