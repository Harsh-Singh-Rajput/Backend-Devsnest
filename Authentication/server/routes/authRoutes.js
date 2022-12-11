import express from "express";
import {validateName, validateEmail, validatePassword} from '../utils/validator.js';
import bcrypt from 'bcrypt';

const router = express.Router();

let Users = {};

router.get('/',(req, res) => {
  console.log(Users);
  res.send(Users)
})

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = Users.hasOwnProperty(email);
    if (userExists) {
      res.send("User Exists");
    }
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
    // console.log(name, email, password, hashPassowrd);
    Users[email] = { name, password:hashPassowrd };
    console.log(Users);
    res.send("Success, You have signed Up");
  } catch (error) {
    console.log(error);
  }

  
});

router.post("/signin", async (req, res) => {
  try {
    const {email, password} = req.body;
    const userExists = Users.hasOwnProperty(email);
    if(!userExists){
      res.send("User doesn't exists");
    }

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
