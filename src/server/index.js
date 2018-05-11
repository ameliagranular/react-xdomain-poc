var express = require('express');
var proxy = require('express-http-proxy');
var app = express();

app.use(express.static(__dirname +'./../../')); //serves the index.html

app.use('/ajax/shared/get_organization_users', proxy('local.granular.test:6543/ajax/shared/get_organization_users'));
app.listen(3000); //listens on port 3000 -> http://localhost:3000/