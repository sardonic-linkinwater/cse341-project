const http = require('http');
const fs = require('fs');

module.exports = function(app) {
    app.get('/', function(req, res){
        console.log("root page");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<html>");
        res.write("<head>");
        res.write("<title>Root Page</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<h1>Greetings. This is the root page</h1>");
        res.write(`<form action="/create-user" method="POST">
                        <input type="text" id="username" name="username" value="username"></br>
                        <input type="submit" value="submit">
                    </form>`);
        res.write("</body>");
        res.write("</html>");
        return res.end();
    });
    app.get('/users', function(req, res) {
        console.log("users page");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>Greetings. This is the users page</h1>");
        res.write("<p>users are:<p></br>");
        const buffer = fs.readFileSync('message.txt');
        const fileContents = buffer.toString();
        res.write(fileContents);
        res.write(`</br></br><a href="/">back to root</a>`);
        return res.end();
    });
    app.post('/create-user', function(req, res) {
        console.log("create-user page");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<h1>Greetings. Welcome to the create users page.</h1>");
        res.write(`<a href="/users">go to users page</a>`);
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.appendFileSync('message.txt', message + "\n", "UTF-8", {'flags': 'a+'});
        });
        return res.end();
    });
};
