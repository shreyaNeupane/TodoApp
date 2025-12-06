const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
//rest object
const app = express();

//middlewares => allows your server to understand JSON data.
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/test',require("./routes/testRouter"));

//port
const PORT = process.env.PORT || 8000    ;

//listen
app.listen(PORT, () => {
  console.log(`Node serverrrr is running on ${process.env.DEV_MODE} mode on port no ${PORT}`);
});
