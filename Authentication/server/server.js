import express from "express";
import routes from './routes/authRoutes.js';
import cors from 'cors';


const app = express();
app.use(cors())
const PORT = 3000;

// accepts json
app.use(express.json());

// Accepts body form post request
app.use(express.urlencoded({extended:true}));

// Use the html
app.use(express.static("public"));


// home route
// app.get('/', (req, res) => {
//     console.log(Users);
// })

app.use("/api/v1", routes);

app.listen(PORT , (req, res) => {
    console.log('Server running on Port', PORT);
})