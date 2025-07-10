const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express()
const PORT = 8000;


app.set('view engine', 'ejs');


app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.use(express.urlencoded({ extended: true}));


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit-form', (req, res) => {
    const {name, email, message} = req.body;

    const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

    fs.appendFile('form-submissions.txt', data, (err) => {
        if(err) {
            console.error('Error saving data: ', err);
            res.status(500).send('Internal Server Error'); 
        } else {
            res.send(`                
                <h1>Thank you for contacting us!</h1>
                <p>We have received your message.</p>
                <a href='/'> Back to Home</a>
                `);
        }
    });
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});