const { ObjectId } = require('mongodb');
const { initMongoDb } = require('../../db')


const getBooks = async (req, res) => {
    try {
        const db = await initMongoDb();

        const books = [];
        await db.books.find().sort({ author: 1 }).forEach(book => {
            books.push(book)
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ msg: "Cant fetch database from MongoDB!" })

    }
}

const getOneBook = async (req, res) => {
    const { id } = req.params;
    try {
        if (ObjectId.isValid(id)) {
            const db = await initMongoDb();
            const book = await db.books.findOne({ _id: new ObjectId(id) });
            res.status(200).json(book);
        }
        else {
            res.status(500).json({ msg: 'Not valid doc id' })

        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ msg: 'Cant fetch database from MongoDB!' })
    }
}

const addBook = async (req, res) => {
    const book = req.body;
    try {
        const db = await initMongoDb();
        const newBook = await db.books.insertOne(book);
        res.status(200).json(newBook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Cant create a book of MongoDB!' })

    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const db = await initMongoDb();
        if (ObjectId.isValid(id)) {
            const result = await db.books.deleteOne({ _id: new ObjectId(id) });
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Cant delete a book of MongoDB!' })

    }
}

const updateBook = async (req, res) => {
    const { id } = req.params;
    const updateBook = req.body;
    console.log(updateBook);
    try {
        const db = await initMongoDb();
        const result = await db.books.updateOne({ _id: new ObjectId(id) }, {$set: updateBook});
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ msg: 'Cant update a book of MongoDB!' })

    }
}
module.exports = { getBooks, getOneBook, addBook, deleteBook, updateBook }