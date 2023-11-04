const express = require('express');
const app = express();
const port = process.env.PORT || 5400;
const middleWare = (req, resp, next) => {
    if (!req.query.age) {
        return resp.send("Please proved valid age!");
    } else if (req.query.age<10) {
        return resp.send("You are kid!");
    } else if (req.query.age < 18) {
        return resp.send("Your age is not valid for this!");
    } else {
        next();
    }

}
app.get('/', middleWare, (req, resp) => {

    resp.send("Hello This is home page!");
})

app.get('/about',middleWare, (req, resp) => {
    resp.send("Hello This is About page!");
});
// app.get('/notAccess', (req, resp) => {
//     resp.send("Hello This is About page!");
// });
app.listen(port,(err)=> {
    !err && console.warn("Server runing on port ",port)
});