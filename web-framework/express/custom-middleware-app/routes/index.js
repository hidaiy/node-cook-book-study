const router = require('express').Router();

// Content-Type: text/html; charset=utf-8
router.get('/', function(req, res) {
    const title = 'Express'
    res.send(`
        <html>
            <head>
                <title>${title}</title> 
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <h1> ${title} </h1>
                <p> Welcome to ${title}</p>
            </body>
        </html>
    `);
});

// Content-Type: text/html; charset=utf-8
router.post('/', (req, res) => {
    res.send("you send post.\n");
});

// Content-Type: application/json; charset=utf-8
router.post('/message.json', (req, res) => {
    res.send({ message: "you send post.\n"});
});

module.exports = router;
