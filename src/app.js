//import http from "http"

// const server = http.createServer(function(req, res){
//     //console.log("Requed received",req.url);
//     const products =[
//     {
//         id:1,name:"productA"
        
//     },
//     {
//         id:2,name:"productB"
        
//     }
// ];
// if(req.url=="/"){
//     res.setHeader("Content-type","text/html")
//     res.end(`<h1>Welcome to our homepage</h1>`)
// }
// if(req.url==="/api/product"){
// res.setHeader("Content-type","application/json");
// res.end(JSON.stringify(products));
// }
// })
// server.listen(8080,function(){
//     console.log("server running on sport 8080")
// // });
// import axios from "axios";
// import  express  from "express";
// const app = express()
// app.use(express.json())

// //LIST
// app.get("/api/products", async function(req,res){
//     const {data:products} = await axios.get("http://localhost:3002/products")
//     res.json(products)
// })

// //SIGNLE
// app.get("/api/products/:id",async function(req,res){
//     const {data : products} = await axios.get(`http://localhost:3002/products/${req.params.id}`)
//     res.json({
//         // message : "Detailt product",
//         data: products
//     })
// })

// // POST
// app.post("/api/products", async function(req,res){
//     const {data : products} = await axios.post("http://localhost:3002/products",
//         rep.body
//     )
//     res.json({
//         message : "Thêm sản phẩm thành công",
//         data: products
//     })
// })

// //PUT
// app.put("/api/products/:id", async function(req,res){
//     const {data : products} = await axios.put(`http://localhost:3002/products/${req.params.id}`,
//     res.body
//     )
//     res.json({
//         message: "Cập nhật thành công",
//         data : products
//     })
// })

// //DELETE
// app.delete("/api/products/:id", async function(req,res){
//     const {data : products} = await axios.delete(`http://localhost:3002/products/${req.params.id}`,)
//     res.json({
//         message: "Xóa thành công",
//         data: products
//     })
// })
// app.listen(8080,function(){
//     console.log("Server running on port 8080");
// })
import express from "express";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import cors from "cors";

dotenv.config();

 
const app = express();
//middleware
app.use(express.json());
app.use(cors());
//router
app.use("/api", productRouter);
app.use("/api", categoryRouter);

app.use("/api",authRouter);
//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/we17309");
export const viteNodeApp = app;


