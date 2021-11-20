const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.send(
        {
            id: 505,
            name: 'Maksudur Rahman Maruf',
            Company: 'Dynamic Solution Innovators',
            Team: ['Banbeis', 'InfoImage'],
            Designation: 'Junior Software Engineer'
        }
    );
});

app.listen(3000);