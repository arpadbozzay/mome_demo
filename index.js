const express = require("express");
const JSONdb = require('simple-json-db');
const db = new JSONdb('./storage.json');
const db_data = 'data';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  
app.get("/", (req, res) => {
      res.send("Backend is working");
    });

app.get("/load", (req, res) => {
    if (db.has(db_data)) {
        res.status(200).json({ data: db.get(db_data) });
    }
});
    
app.post('/save', function requestHandler(req, res) {
    if(req.body) {
        db.set(db_data, req.body);
        res.status(200).json({'ok': true});
    } else {
        res.status(500).json({'ok': false});
    }
});

app.listen(3001,() => console.log("Server listening at port 3001"));