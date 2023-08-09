//TRONG BÀI NÀY, CHÚNG TA SẼ SỬ DỤNG MONGODB ĐỂ KẾT NỐI TỚI DATABASE. KHONG SỬ DỤNG MONGOOSE NHƯ MỌI LẦN
const { MongoClient } = require("mongodb");
require('dotenv').config();
let dbConnection;
// initial connection
const initMongoDb = async () => {
    try {
        const client = await MongoClient.connect(process.env.URI)
        const db = client.db('bookstore');
        const books = db.collection('books');
        return { books }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { initMongoDb }