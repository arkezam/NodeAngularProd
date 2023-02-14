const mongoose = require("mongoose");

const dbConection = async ()=>{
    mongoose.set("strictQuery", true);
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log("db conectado");
    } catch (error) {
        console.log(error);
        throw new Error("error al momento de inicar la BD");
    }

}


module.exports = {dbConection}



