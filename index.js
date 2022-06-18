const express = require('express');
const path = require('path');
const app = express();
// const compression = require('compression')
app.use(express.static(__dirname + '/dist/regular-angular-starter'));
// app.use(compression({
//     filter: function (req, res) {
//       return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
//     },
//     level: 9
// }));


app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/regular-angular-starter/index.html'));
});

app.listen(process.env.PORT || 8080);