import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    isbn: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // allows multiple docs without isbn
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;