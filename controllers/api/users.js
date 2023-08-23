const User = require('../../models/user');
const jwt = require('jsonwebtoken'); //https://jwt.io/libraries
const bcrypt = require('bcrypt')

module.exports = {
  create,
  login,
  checkToken,
};

/* -----------CREATE A NEW USER-------------- */
async function create (req, res){
  try {
    // Add the user to the db
    const user = await User.create(req.body)
    const token = createJWT(user);
    res.json(token); //here, we are using json to send back only a string (not an object data)
  } catch (err) {
    res.status(400).json(err); //the user won't see this error, but the developer will, which is great for debugging
  }
  // Baby step...
  res.json({
    user: {
      name: req.body.name,
      email: req.body.email
    }
  }) //remember: there is NO RENDERING!!
}

/* Helper Functions */

function createJWT(user){
  return jwt.sign(
    //data payload
    { user },
    //secret
    process.env.SECRET,
    //token expiration time
    { expiresIn: '24h'}
  );
}

/* ------------LOGIN AN EXISTING USER------------ */

async function login (req,res){
  try{
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email:email});
    if(!user) throw new Error(); //stops if there is no user
    const compare = await bcrypt.compare(password, user.password); //compare hashed passwords
    if(!compare) throw new Error(); //stops if passwords don't match
    const token = createJWT(user);
    res.json(token);
  } catch {
    res.status(400).json('Login Error');
  }
}

/* -----------CHECK TOKEN---------------- */

function checkToken(req, res){
  console.log('req.user:', req.user);
  res.json(req.exp);
}

