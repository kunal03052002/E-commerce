const express = require('express');
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.get("/", (req,res) => {
    res.send("hello");
});

app.get("/products/:userId", verifyToken , async (req,res) => {

    // /products/:userId
    // const ObjectId = require('mongodb').ObjectId;
    const user_id = req.params.userId;
    let products = await Product.find({ userId : user_id });
    // let products = await Product.find();
    if(products.length > 0){
        console.log("1",products);
        res.send(products);
    }
    else{
        console.log("2"+"No product found",products);
        res.send( {result : "No product found"});
    }

})

app.delete("/delete-product/:id", verifyToken , async (req,res) =>{
    // console.log("delete function running");
    const productId = req.params.id;
    const result = await Product.deleteOne({_id: productId});
    res.send(result);
})

app.get("/update-product/:id", verifyToken, async (req, res) => {
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",req.params.id);
    try {
        console.log(req.params.id);
        let result = await Product.findOne({ _id: req.params.id });
        if (result) {
            res.send(result);
        } else {
            res.send({ result: "no result found" });
        }
    } catch (error) {
        console.error("Error fetching producttttttttttt:", error);
        res.status(500).send({ error: "Internal Server Errorrrrrrrrrrrrrr" });
    }
});

app.put("/update-product/:id", verifyToken, async (req,res)=>{
    let result = await Product.updateOne(
        {
            _id : req.params.id
        },
        {
            $set : req.body
        }
    )
    res.send(result);
});




app.post("/register",async (req,res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    Jwt.sign({result}, jwtKey, {expiresIn : "2h"}, (err,token) =>{
        if(err){
            res.send({result : "something went wrong"});
        }
        res.send({result, auth : token})
    })
    // res.send(user);
    // res.send("hello");
});

app.post("/login", async (req,res) =>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            
            Jwt.sign({user}, jwtKey, {expiresIn : "2h"}, (err,token) =>{
                if(err){
                    res.send({result : "something went wrong"});
                }
                res.send({user, auth : token})
            })
            // res.send(user);
        }else{
            res.send({ result : 'NO user Found' });
        }
    }
    else{
        res.send({result : 'No user Found'});
    }
})
app.post("/add-product", verifyToken, async(req,res)=>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/search/:userId/:key", verifyToken, async(req,res)=>{

    const { userId, key } = req.params;
    let result = await Product.find({
        userId: userId,
        "$or":[
            { name : {$regex : key}},
            { company : {$regex : key}}
        ]
    });
    res.send(result);
})


function verifyToken(req,res, next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err,valid)=>{
            if(err){
                res.status(401).send({result: "Please provide valid token"})
            }
            else{
                console.log("yo yo");
                next();
            }
        })
    }
    else{
        res.status(403).send({result: "Please add token with header"})
    }
}

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});

