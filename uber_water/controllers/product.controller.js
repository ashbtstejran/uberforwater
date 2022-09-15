const express = require('express');
const productModel = require('../models/product.model');
const path = require('path');


class productController{
    async create (req, res){
        const image = req.file;
        console.log(req.body);
        const Product = new productModel({
            prdname: req.body.prdname,
            prdprice: req.body.prdprice,
            brand: req.body.brand,
            image: image
        });
        const result = await Product.save();
        console.log(result);
        res.status(201).json({
            status:"sucess",
            result:result,
            message:"Added Successfully"
        });
    }
}
module.exports = new productController();




