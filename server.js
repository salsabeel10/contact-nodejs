const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const contactRoutes = require("./Routes/ContactRoutes");
const userRoutes = require('./Routes/userRoutes');
const ConnectDb = require("./config/dbConnection");

//to use port
const dotenv=require("dotenv").config();
//connect mongodb
ConnectDb();
const app = express();
const port = process.env.PORT || 3000;

//to parse json
app.use(express.json());
//for Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
//for error handling
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`server running at ${port}`);
});
