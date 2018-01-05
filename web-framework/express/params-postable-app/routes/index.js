const router = require('express').Router();
const debug = require('debug')('my-app');

// Content-Type: text/html; charset=utf-8
router.get('/:name?', function(req, res) {
    const title = 'Express';
    debug(`req.params: ${JSON.stringify(req.params)}`);
    const name = req.params.name || '';

    res.send(`
        <html>
            <head>
                <title>${title}</title> 
                <link rel="stylesheet" href="styles.css">
            </head>
            <body>
                <h1> ${title} </h1>
                <p> Welcome to ${title} ${name}</p>
                
                <form method="POST" action="data">
                    Name: <input name="name"> <input type="submit">
                </form>
            </body>
        </html>
    `);
});


router.post('/data', (req, res) => {
    debug(req.body);
    debug(typeof req.body);

    // console.debug(`req.body: ${req.body}`); // error
    debug(`req.body: ${JSON.stringify(req.body)}`);
    res.redirect(`/${req.body.name}`);
});


module.exports = router;
