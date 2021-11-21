const express = require('express');
const employees = require('./employee');

const app = express();
app.use(express.json());


app.get('/', function(req, res) {
    res.send(
        employees[0]
    );
});

app.get('/api/posts/:year/:month', function(req, res) {
    res.send(
       [req.params, req.query]
    );
});

app.get('/api/employees', function(req, res) {
    res.send(
       employees
    );
});

app.get('/api/employee/:id', function(req, res) {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if(!employee) res.status(404).send('The Employee with the given ID is not found!');
    return res.send(employee);
});

app.post('/api/employees', (req, res) => {
    const employee = {
        id: employees.length + 1,
        name: req.body.name,
        company: req.body.company,
        team: req.body.team,
        designation: req.body.designation
    }
    employees.push(employee);

    res.send(employee);

});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));