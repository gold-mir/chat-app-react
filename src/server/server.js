const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
const dist = path.join(__dirname, '../../dist');
app.use(express.static(dist));

console.log(path.join(__dirname, '../../dist'));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(dist, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('App is listening on port ' + port);