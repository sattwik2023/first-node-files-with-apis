const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://truei773:9kjHzH09CtyntdWB@cluster0.z9masui.mongodb.net/e-comm?retryWrites=true&w=majority');
        console.log('Connected to mongodb');
    } catch (error) {
        console.error(`Database connection error! :${error}`);
    }
}
(async () => {
    await dbConnection();
})();
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    brand: String,
    category: String
})
const productModel = mongoose.model('products', productSchema);

app.get('/find', async (req, resp) => {
    try {
        const data = await productModel.find({});
        // console.log(data);
        resp.send(data);
    } catch (error) {
        resp.status(500).json({ message: `error in accessing data in database!${error}` })
    }

});
app.post('/add', async (req, resp) => {
    try {
        const body = req.body;
        if (body.length > 1) {
            data = await productModel.insertMany(body)
        } else {
            data = new productModel(body);
            data.save();
        }
        console.log(data);
        resp.status(200).json({message:`record is successfully inserted ${data}`})
    } catch (error) {
        console.error(`Error on inserted data ${error}`);
        resp.status(404).json({ message: `Error on inserted data ${error}` });
    }
})
app.put('/update', async (req, resp) => {
    // const data = req.params.id;
    const queryData = req.query.id;
    try {
        const result = await productModel.updateOne({ "_id": queryData }, { $set: req.body });
        // console.log(result);
        if (result.modifiedCount > 0) {
            resp.status(200).json(result);
            console.log("Record is successfully updated");
        } else {
            console.log('Error in update code!')
            resp.status(404).json({ message: 'Error in update code!' });
        }

    } catch (error) {
        resp.status(500).json({message:`Error on updateing data : ${error}`})
    }

});
app.delete('/delete', async (req, resp) => {
    try {
        const body = req.body;
        if (body.length > 1) {
            data = await productModel.deleteMany({"_id":body});
        } else {
            data = await productModel.deleteOne(body);
        }
        console.log(data);
        resp.status(200).json({ message: `record is successfully deleted ${data}` });
    } catch (error) {
        console.log(`Error on delete data : ${error}`);
        resp.status(404).json({ message: `Error on delete data : ${error}`})
    }
})

app.get('/search/:searchCode', async(req,resp) => {
    try {
        const db = await productModel;
        // let searchQuery = /^m/;
        // const result = await db.find(
        //     { name: searchQuery }
        // );

        // const result = await db.find(
        //     { name: { $regex: req.params.searchCode } }
        // )

        const searchPattern = new RegExp(req.params.searchCode, 'i');
        const result = await db.find({
            $or: [
                { name: { $regex: searchPattern } },
                { price: parseFloat(req.params.searchCode) || 0 },
                { brand: { $regex: searchPattern } },
                { category: { $regex: searchPattern } }
            ]
        });
        console.log(result);
        resp.status(200).json(result);
    } catch (error) {
        console.log(`Error on searching ${error}`);
        resp.status(500).json({ message: `Error on searching ${error}` });
    }
})
app.listen(5400)
