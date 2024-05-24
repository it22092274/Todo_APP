const mongoose =  require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_DB_URL)
        .then(()=> {
            console.log( " database connected ");
        })
        .catch( (error) => {
            console.error(
                "Error in connection" + error
            );
        })
}

module.exports = connectDB;