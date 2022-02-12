// This file handles the CRUD processes of the products
const mongoose = require('mongoose');

/**
 * This anonymous function will initiate all the routes, that related to the products
 * @param {import the express app, to send the API requests} app 
 * @param {import the passport to validate the authentication of the user} passport 
 */
module.exports = (app) => {

    // import the Product model, since it will be used on all the routes below
    const Product = mongoose.model('Product');

    app.post('/api/products/create', (req, res) => {
        // console.log(req.user.role);
        if (!req.user) {
            res.status(400);
            res.json({ message: 'you are not logged-in' });
        } else if (req.user.role === 'admin') {
            new Product({
                productName: req.body.productName,
                description: req.body.description,
                category: req.body.category,
                stock: req.body.stock,
                price: req.body.price
            }).save();

            res.status(200);
            res.json({ message: 'the product is created!' });
        } else {
            res.status(400);
            res.json({message: 'This operation requires admin previleges!!!'});
        }
    });

    app.get('/api/products/read', async (req, res) => {
        const allProducts = await Product.find({});
        res.json(allProducts);
    });

    app.get('/api/products/search/category/:caType', async (req, res) => {
        const caType = req.params.caType;
        const queryResult = await Product.find({ category: { $regex: new RegExp(caType, 'i') } }); // ignore case query
        res.json(queryResult);
    });

    app.get('/api/products/search/:something', async (req, res) => {
        const searchContent = req.params.something;

        // now we should apply a searching query using the product name and the description
        const result = await Product.find({ $text: { $search: searchContent } },
            { score: { $meta: "textScore" } }).sort({ score: { $meta: 'textScore' } });

        res.status(200);
        res.json(result);
    });

    app.patch('/api/products/modify/:productId', (req, res) => {
        /*
            There are two conditions to patch a product
                * the user is logged in
                * the user is an admin
        */
        const id = req.params.productId;

        if (!req.user) {
            res.status(400);
            res.json({ message: 'you are not logged in' });
        } else if (req.user.role === 'admin') {
            // we update all the attributes that are available on the body
            Product.findByIdAndUpdate(
                id,
                { $set: req.body },
                (err, result) => {
                    if (err) {
                        res.status(500);
                        res.json({ message: 'The server cannot update the specified product' });
                    } else {
                        res.status(200);
                        res.json({
                            message: 'The product has been modified...',
                            data: result
                        });
                    }
                }
            );
        } else {
            res.status(400);
            res.json({message: 'This operation requires admin previleges!!!'});
        }
    });

    app.delete('/api/products/delete/:productId', async (req, res) => {
        const id = req.params.productId;
        if (!req.user) {
            res.status(400);
            res.json({message: 'you are not logged in'});
        } else if (req.user.role === 'admin') {
            const deletedProduct = await Product.findByIdAndDelete(id);
            if (!deletedProduct) {
                res.status(500);
                res.json({ message: "deletion failed..." });
            } else {
                res.status(200);
                res.json({ message: 'deleted successfully...' });
            }
        } else {
            res.status(400);
            res.json({message: 'This operation requires admin previleges!!!'});
        }
    });
}