const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require("./schema")
const secretKey = crypto.randomBytes(32).toString('hex');
const express = require('express');
const jwt = require('jsonwebtoken');
const { Console } = require('console');
const app = express();
const port = 4000;
const router = require('./Router/authentification')
mongoose.connect("mongodb+srv://aichaazeroual03:DzGFNs7ckBEBl8gt@cluster0.o3qmn3i.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("you are connected"))
.catch((e) => {
    console.error('Failed to connect to MongoDB:', e.message);
  })
  app.use(express.json());
  app.use('/', router);  

    

app.listen(port, ()=>{
  console.log(`app listining at http://localhost:${port}/`);
})
/* async function run(){
  try{
   const user = await User.create({
   name: "salima",
   password: "salima2002"
})
console.log(user);
   }catch(e){
     console.log(e.message)
   }
 }
run();
*/
/* app.get('/',(req,res)=>{
    const idToken = req.headers.authorization;
    jwt.verify(idToken, publicKey, (err, decoded)=>{
        if(err){
            res.status(401).send('unauthorized');
          }else{
            res.send('good')
          }
        
    })
    res.send('hello')
    console.log(idToken); 
  })*/

 //res.send(`name: ${name}, pass: ${passeword}`);
   // const token = jwt.sign({name}, secretKey, {algorithm:'HS256'});

/*
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHTsOfQL9Vvdd1WpxQUkp5BRR8rIpduMiQ7mRahlMmT20YqVXbi2
AsTkg1uUc7kl9p5pU7MNt2jK97W1iLYtHLdsHJhJkNTvQTo6uYBOuE2QrJQ5l66Q
iJOXI9hx2UR9NnW8KoKaMoymlu5+MZ5zBzO/D0gcGhTEGAzNzVN5maSXAgMBAAEC
gYApvfAOrXpB+rXQ0lQxOt3LiwkLX0i/MdP4isMRlFdCbk9un1afS/N/IWm39y69
Sc1azpWAFgSFl/iJWa7eAwr+AAh15a6T/3bXgiyU1ODk03ZIh7sZgKtwJsZqMeis
BOd8UtHxtKuidef84uKsMEcs1IieYe5WXTdbyXE/3OWmoQJBAMdOzg/FItU06ePv
Jn++NyPqy0A9TmPhX7fXWdIbO10QHIPBg749T5cN0fPPQ1DoxFsqvMniUy97flRB
42t4V7ECQQCWLk5rmLYjg6ow6OOA0DTcQugaR8AlPxAMFmC//RTvqYN7+3yMnexf
IXE9nKx8AsjaCPKgH/dJYVzS+EJfXZrHAkEAgFJBo6+mHKWDzUhFfkumzs417HdM
SExrxz60yuzTjLh50269dreczcGNIq+YRLiI67WZdVXtfw3AqVj+pkwGEQJAJ9j/
i8MISOINjU6t1qbn7619AkQZcoiKDHr/jtFq9bBHp+Txhin85rzr3AovJfRjMJ8B
KYVxyrGfvIaMrdsbTwJARHpkXEZyI1OH9yErV+gAtYxfzJdFd4D8E3tj7qqH3+vo
lyTfWsR2FeiZ3oRg7S4BRdUvMvSLTLG2BHGXe1cEkw==
-----END RSA PRIVATE KEY-----`;
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHTsOfQL9Vvdd1WpxQUkp5BRR8rI
pduMiQ7mRahlMmT20YqVXbi2AsTkg1uUc7kl9p5pU7MNt2jK97W1iLYtHLdsHJhJ
kNTvQTo6uYBOuE2QrJQ5l66QiJOXI9hx2UR9NnW8KoKaMoymlu5+MZ5zBzO/D0gc
GhTEGAzNzVN5maSXAgMBAAE=
-----END PUBLIC KEY-----`;

//https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWljaGEiLCJpYXQiOjE3MDUzMjgxODR9.Cx-sUOeOQUZtt2SYWcBkpcPjrtNzGoyOXVwDVbBJU6g
app.get('/', auth, async (req, res) => {
  try {
    const filteredUser = await User.findOne({ name: req.user.name });

      if (filteredUser) {
          // Si l'utilisateur est trouvé, renvoyer les détails de l'utilisateur
          return res.json(filteredUser)
      } else {
          // Si l'utilisateur n'est pas trouvé, renvoyer un message approprié
          return res.status(404).send("Utilisateur non trouvé");
        }
        
      } catch (e) {
        console.error(e.message);
        res.status(500).send("Erreur serveur");
      }
});
app.post('/auth', (req, res) => {
const { name, password } = req.body;
const user = { name: name,
password: password };
async function create(){
  try{
    const us = await User.create(user)
    console.log(us);
    const token = jwt.sign(user, secretKey);
    res.json({ token });
  }catch(e){
    console.log(e.message);
  }
}
create();

});

function auth(req, res, next){
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
if(token == null)res.sendStatus(401)

jwt.verify(token, secretKey, (err, user)=>{
    if(err){
        res.sendStatus(403);
      }
      req.user = user;
    next();
    
})

}
function auth(req, res, next) {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (token == null) {
  return res.sendStatus(401);
}

jwt.verify(token, secretKey, (err, user) => {
  if (err) {
    return res.sendStatus(403);
  }
  
  req.user = user;
  next();
});
  */