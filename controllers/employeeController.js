const User = require("../models/userModel");
const Product = require("../models/productModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error:"+ err.message });
  }
};

const getCartFromUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    const cartPromises = user.shoppingCart.map((item)=>{
      return Product.findById(item).then((product)=>product)
    })
   
    Promise.all(cartPromises).then((shoppingCart)=>{
    
      res.status(200).json(shoppingCart);
    })
   
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error:" + err.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).select(["userName","shoppingCart","role"]);
    const cartPromises = user.shoppingCart.map((item)=>{
      return Product.findById(item).then((product)=>product)
    })
 
    Promise.all(cartPromises).then((shoppingCart)=>{
   
      let obj = {...(user._doc)}
      obj.shoppingCart = shoppingCart
   
      res.status(200).json(obj);
    })
   
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error on getting User:" + err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    if (!user.userName || !user.password || !user.role) {
      return res.status(400).json({ message: "Bad Request: missing parameters" });
    }
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error on creating User:" + err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    
    const user = await User.findByIdAndUpdate(req.id, req.body,{new: true});

    const cartPromises = user.shoppingCart.map((item)=>{
      return Product.findById(item).then((product)=>product)
    })
 
    Promise.all(cartPromises).then((shoppingCart)=>{
   
      let obj = {...(user._doc)}
      obj.shoppingCart = shoppingCart
      res.status(200).json(obj);
    })
  
  } catch (err) {
    res.status(500).json({ message: "Error on updating User:"+err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error on deleting User:"+err.message });
  }
};

module.exports = {
  getCartFromUser,
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
