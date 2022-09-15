const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    prdname:{
        type:String,
        required:true
    },
    prdprice:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports=new mongoose.model('product',productSchema);