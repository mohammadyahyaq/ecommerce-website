const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    description: String,
    category: {
        type: String,
        enum: ['books', 'computers', 'phones', 'laptop accessories', 'others']
    },
    productionDate: {
        type: Date,
        default: Date.now
    },
    stock: Number,
    price: Number
});

productSchema.index({productName: 'text', description: 'text'}); // this index will be used for searching

mongoose.model('Product', productSchema); // create the product model