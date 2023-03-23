import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addBook, updateBook, getBookById as fetchBookById } from '../components/utils/api';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditBookPage = () => {
  const navigate = useNavigate();
  const bookId = useSelector((state) => state?.books?.bookId);
  const mode = useSelector((state) => state?.books?.mode);
  console.log(`⬇️ mode ⬇️`, mode);

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    isbn: 0,
    title: '',
    author: '',
    date: '',
    pages: '',
    yearOfPublishing: '',
    quantity: '',
    coverPhoto: '',
  });

  const getBookById = async (id) => {
    setLoading(true);
    const bookData = await fetchBookById(id);
    setBook(bookData);
    setLoading(false);
  };

  useEffect(() => {
    if (mode === 'edit' && bookId) {
      getBookById(bookId);
    }
  }, [bookId, mode]);


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (mode === 'edit') {
      // Update existing book
      await updateBook(bookId, { quantity: book.quantity });
      alert('Quantity updated successfully');
    } else {
      // Add new book
      console.log(`⬇️ book ⬇️`, book);
      await addBook({
        isbn: 0,
        title: book.title,
        nameOfAuthor: book.author,
        dateOfBirthAuthor: book.date,
        numberOfPages: book.pages,
        yearOfPublishing: book.yearOfPublishing,
        quantity: book.quantity,
        coverPhoto: book.coverPhoto
      });
      alert('Book added successfully');
    }
  } catch (error) {
    alert('An error occurred while saving the book');
  }
};

const handleInputChange = (e) => {
  setBook({ ...book, [e.target.name]: e.target.value });
};

const handleFileChange = (e) => {
  setBook({ ...book, coverPhoto: e.target.files[0] });
};

if (loading) {
  return <div>Loading...</div>;
}
  
  return (
    <div>
      {' '}
      <button onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <input
          type="date"
          name="date"
          value={book.date}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <input
          type="number"
          name="pages"
          placeholder="Number of Pages"
          value={book.pages}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <input
          type="number"
          name="yearOfPublishing"
          placeholder="Year of Publishing"
          value={book.yearOfPublishing}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={book.quantity}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          disabled={mode === 'edit'}
          required={mode !== 'edit'}
        />
        <button type="submit">{mode === 'edit' ? 'Update Quantity' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default EditBookPage;
