const express = require("express");
const app = express();
app.use('/static', express.static('public'));
app.get("/", function(request, response){
    response.sendFile(__dirname+'/views/index.html');
});
app.listen(3000);
console.log('Server running at localhost:3000');