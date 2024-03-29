///Portfolio app
///Author: Kate Obertas


//required variables and dependencies
const express = require('express');
const pug = require('pug');
const app = express();
const favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));
const port = process.env.PORT || 3000;
//converting JSON to JS object
const projects = JSON.parse(JSON.stringify(require('./data.json'))).projects;

//middleware setup
app.set('view engine', 'pug');

//route setup
app.get('/', (req, res) => {
    res.render('index', { 'projects': projects });
});
app.get('/about', (req, res) => {
    res.render('about');
});
app.get('/project/:id', (req, res) => {
    res.render('project', { proj: projects[req.params.id] });
});
//404 requests
app.get('*', (req, res) => {
    res.send('Sorry, this page doesn\'t exist.');
    console.log(req.url + " is not a valid url");
});


app.listen(port, () => console.log('Server has started and is listening on port number: ' + port));