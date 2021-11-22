const express = require('express');
const Joi = require('joi');
const employees = require('./employee');

const app = express();
app.use(express.json());


app.get('/', function (req, res) {
    res.send(
        "Hello Express JS !!!"
    );
});

app.get('/api/posts/:year/:month', function (req, res) {
    res.send(
        [req.params, req.query]
    );
});

app.get('/api/employees', function (req, res) {
    res.send(
        employees
    );
});

app.get('/api/employees/:id', function (req, res) {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The Employee with the given ID was not found!');
    return res.send(employee);
});

app.post('/api/employees', (req, res) => {

    const { error } = validateEmployee(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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

app.put('/api/employees/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The Employee with the given ID was not found!');

    const { error } = validateEmployee(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    employee.name = req.body.name;
    employee.company = req.body.company;
    employee.team = req.body.team;
    employee.designation = req.body.designation;

    res.send(employee);

});

app.delete('/api/employees/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).send('The Employee with the given ID was not found!');

    const index = employees.indexOf(employee);
    employees.splice(index, 1);

    res.send(employee);
});


function validateEmployee(employee) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        company: Joi.string().required(),
        team: Joi.array().items(Joi.string()),
        designation: Joi.string().required()
    });

    return schema.validate(employee);

}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));