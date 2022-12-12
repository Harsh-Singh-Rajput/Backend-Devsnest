import express from "express";
import {validateName, validateEmail, validatePassword} from '../utils/validator.js';
import bcrypt from 'bcrypt';
import createDB from "../config/db.js";
import User from "../models/userModels.js";

const router = express.Router();

createDB.sync().then(() => {
  console.log("DB is running");
})
// let Users = {};

router.get('/',async (req, res) => {
  const Users = await User.findAll()
  console.log(Users[0]);
  res.send('Server is running')
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
      return res.status(403).send("User Exists");
    }
    if(!validateName(name)){
      return res.status(403).send('Invalid name: Error: Invalid user name: name must be longer than two characters and must not include any numbers or special characters')
      }
    if(!validateEmail(email)){
      return res.status(403).send('Invalid email')
    }
    if(!validatePassword(password)){
      return res.status(403).send('Invalid password: Password must be at least 8 characters long and must include atlest one - one uppercase letter, one lowercase letter, one digit, one special character')
    }

    const hashPassowrd = await bcrypt.hash(password, 10)
    const saveToDB = {
      name, email, password:hashPassowrd
    }
    const createdUser = await User.create(saveToDB);
    console.log(createdUser);
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
      return res.send("User doesn't exists");
    }
    console.log(userExists.dataValues);
    const getPassword = userExists.dataValues.password;
    const passMatch = await bcrypt.compare(password, getPassword);
    console.log(passMatch);
    if(!passMatch){
      return res.send('Password mismatch');
      
    }

    return res.send('success');

  } catch (error) {
    console.log(error);
  }
  
});

export default router;
