import express from "express";
import {validateName, validateEmail, validatePassword} from '../utils/validator.js';
import bcrypt from 'bcrypt';
import createDB from "../config/db.js";
import User from "../models/userModels.js";

const router = express.Router();

createDB.sync().then(() => {
  console.log("DB is running");
})
let Users = {};

router.get('/',(req, res) => {
  console.log(Users);
  res.status(201).send("Server is running")
})

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({
      where:{
        email
      }
    }) 
    if (userExists) {
      return
    }
    res.status(403).send("User Exists");
    if(!validateName(name)){
        res.send('Invalid name')
    }
    if(!validateEmail(email)){
        res.send('Invalid email')
    }
    if(!validatePassword(password)){
        res.send('Invalid password')
    }

    const hashPassowrd = await bcrypt.hash(password, 10)
    const saveToDB = {
      name, email, password:hashPassowrd
    }
    const createdUser = await User.create(saveToDB);
    console.log(Users);
    res.status(201).send(createdUser);
  } catch (error) {
    console.log(error);
  }

  
});

router.post("/signin", async (req, res) => {
  try {
    const {email, password} = req.body;
    const userExists = await User.findOne({
      where:{
        email
      }
    }) 
    if(!userExists){
      res.send("User doesn't exists");
    }
    console.log(userExists);
    const passMatch = await bcrypt.compare(password, Users[email].password);
    console.log(passMatch);
    if(!passMatch){
      res.send('Password mismatch');
      return
    }

    res.send('success');

  } catch (error) {
    console.log(error);
  }
  
});

export default router;
