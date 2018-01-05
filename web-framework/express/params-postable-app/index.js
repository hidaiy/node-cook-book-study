const {join} = require('path');
const express = require('express');
const index = require('./routes/index');
const bodyParser = require('body-parser');


const app = express();
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: false}));

if (dev) {
    app.use(express.static(join(__dirname, 'public')))
}

app.use('/', index);

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
