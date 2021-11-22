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

app.get('/api/employee/:id', function (req, res) {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) res.status(404).send('The Employee with the given ID is not found!');
    return res.send(employee);
});

app.post('/api/employees', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        company: Joi.string().required(),
        team: Joi.array().items(Joi.string()),
        designation: Joi.string().required()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }


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
    if (!employee) res.status(404).send('The Employee with the given ID is not found!');

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        company: Joi.string().required(),
        team: Joi.array().items(Joi.string()),
        designation: Joi.string().required()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    employee.name = req.body.name;
    employee.company = req.body.company;
    employee.team = req.body.team;
    employee.designation = req.body.designation;

    res.send(employee);

});


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));