//Mongoose commandline console tutorial
const mongoose = require('mongoose');
const database = async () => {
    await mongoose.connect('mongodb+srv://truei773:9kjHzH09CtyntdWB@cluster0.z9masui.mongodb.net/e-comm?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const productsSchema = mongoose.Schema({
        name: String,
        brand: String,
        price: Number,
        category: String,
    });
    return mongoose.model('products', productsSchema);
}


const findData = async () => {
    try {
        const Product = await database(); // Get the model from the database function
        const data = await Product.find({});
        console.log(data)
    } catch (error) {
        console.error("Error fetching data :", error)
    } finally {
        mongoose.disconnect(); // Close the database connection when done
    }

}
(async () => {
    await findData(); // Fetch and display data
})();

const addNewData = async () => {
    const productModel = await database();
    const data = new productModel(
        { name: "demo 1", brand: "demo", price: 100, category: "mobile" }
    )
    const result = await data.save();
    console.log(result);
}
// (async () => {
//     await addNewData();
// })();

const addManyProduct = async () => {
    try {
        const productModel = await database();
        const data = await productModel.insertMany(
            [
                { name: "max 1", brand: "micromax", price: 430, category: "mobile" },
                { name: "max 2", brand: "micromax", price: 290, category: "mobile" },
                { name: "max 3", brand: "micromax", price: 345, category: "mobile" },
            ]
        )
        console.log(data);
    } catch (error) {
        console.log("Error in adding multipe product", error)
    }
}
// (async () => {
//     await addManyProduct();
// })();

const updateData = async () => {
    try {
        const productModel = await database();
        const data = await productModel.updateOne({ name: "demo 2" }, { $set: { name: "demo 1" } });
        console.log(data);
    } catch (error) {
        console.error("Error for updating data", error);
    }

}
// (async () => {
//     await updateData();
// })();

const deleteData = async () => {
    try {
        const productModel = await database();
        const data = await productModel.deleteMany({
            _id: {
                $in: [
                    "6524fb02ee0305cb4ffcefc9",
                    "6524fe49b12ab081cdd53928",
                    "6524feaa27ec4339a8771d04"
                ]
            }
        });
        console.warn(data);
    } catch (error) {
        console.error("error for deleting data :", error);
    }
}
// (async () => {
//     deleteData();
// })();
