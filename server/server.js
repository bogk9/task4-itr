const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
//require("dotenv").config({ path: "./config.env" });

//const {ATLAS_URI} = require('./config/db.js');
const {PORT, SECRET} = require('./config/server.js');


const dbo = require("./db/conn");
const publicPath = path.join(__dirname, '..', 'build');


// =================================auth server========================================
const app = express();
var corsOptions = {
  origin: "http://localhost:" + PORT.toString()
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app); 

app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT || 8081, () => {
    dbo.connectToServer(function (err) {
      if (err) console.error(err);
	
    });
  console.log(`Server is running on port ${PORT}.`);
});
// =================================/auth server========================================