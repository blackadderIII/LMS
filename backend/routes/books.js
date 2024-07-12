import express from "express"
import Book from "../models/Book.js"
import BookCategory from "../models/BookCategory.js"
import multer from "multer";
import mongoose from "mongoose";
const router = express.Router()
import * as fs from 'fs';

const upload = multer({
    storage: multer.diskStorage({
      destination: '../frontend/public/assets/coverImages',
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
    fileFilter(req, file, cb) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Only JPG and PNG images are allowed'));
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 2, // 2MB
    },
  });
  
  upload.error = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File too large, File should be below 5 MB' });
    } else {
      next(err);
    }
  };// configure the upload directory


// get total number of books
router.get("/booksTotal", async (req, res) => {
    try {
      const totalBookCount = await Book.aggregate([
        {
          $group: {
            _id: null,
            totalBookCount: { $sum: "$bookCountAvailable" }
          }
        }
      ]);
      res.status(200).json({ totalBookCount: totalBookCount[0].totalBookCount });
    } catch (err) {
      return res.status(504).json(err);
    }
  });


/* Get all books in the db */
router.get("/allbooks", async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").sort({ _id: -1 })
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err);
    }
})

/* Get Book by book Id */
router.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions")
        res.status(200).json(book)
    }
    catch {
        return res.status(500).json(err)
    }
})

/* Get books by category name*/
router.get("/", async (req, res) => {
    const category = req.query.category
    try {
        const books = await BookCategory.findOne({ categoryName: category }).populate("books")
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

/* Adding book */
router.post('/addbook', upload.single('bookCoverImage'), async (req, res) => {
    if (!req.body.isAdmin) {
        return res.status(403).json("You don't have permission to add a book!");
      }         
        let categories = [];
        if (req.body.categories) {
            categories = JSON.parse(req.body.categories);
            categories = categories.filter(category => mongoose.Types.ObjectId.isValid(category));
            categories = categories.map(category => mongoose.Types.ObjectId(category));
          }
          if (req.file) {
            try {
              const fileBuffer = fs.readFileSync(req.file.path);
              const bookCoverImage = fileBuffer.toString('base64');

              const newbook = await new Book({
                bookName: req.body.bookName,
                alternateTitle: req.body.alternateTitle,
                author: req.body.author,
                bookCountAvailable: req.body.bookCountAvailable,
                language: req.body.language,
                bookCoverImage,
                publisher: req.body.publisher,
                bookStatus: req.body.bookStatus,
                categories,
            })
            const book = await newbook.save()
             await Promise.all(categories.map((categoryId) => BookCategory.updateOne({ _id: categoryId }, { $push: { books: book._id } })));
            return res.status(200).json(book)
            } catch (err) {
              console.error(err);
              return res.json({message:"Error adding book,please try again later"})
            }
          } else {
            const bookCoverImage = null;
            
            const newbook = await new Book({
              bookName: req.body.bookName,
              alternateTitle: req.body.alternateTitle,
              author: req.body.author,
              bookCountAvailable: req.body.bookCountAvailable,
              language: req.body.language,
              bookCoverImage,
              publisher: req.body.publisher,
              bookStatus: req.body.bookStatus,
              categories,
          })
          const book = await newbook.save()
           await Promise.all(categories.map((categoryId) => BookCategory.updateOne({ _id: categoryId }, { $push: { books: book._id } })));
          return res.status(200).json(book)
          }
    }
)

/* update book */
router.put("/updatebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            await Book.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Book details updated successfully");
        }
        catch (err) {
            res.status(504).json(err);
        }
    }
    else {
        return res.status(403).json("You dont have permission to add a book!");
    }
})

/* Remove book  */
router.delete("/removebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const _id = req.params.id
            const book = await Book.findOne({ _id })
            await book.remove()
            await BookCategory.updateMany({ '_id': book.categories }, { $pull: { books: book._id } });
            res.status(200).json("Book has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

export default router