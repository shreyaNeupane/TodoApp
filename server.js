const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

//env config
dotenv.config();
//rest object
const app = express();

//DB connection
connectDB();

//middlewares => allows your server to understand JSON data.
app.use(express.json());
app.use(cors());

//routes
// app.use('/api/v1/test',require("./routes/testRouter"));
app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/todo", require("./routes/todoRoute"));

//port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => {
  console.log(
    `Node serverrrr is running on ${process.env.DEV_MODE} mode on port no ${PORT}`
  );
});
