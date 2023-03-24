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
    isbn: 34453534,
    title: 'string',
    nameOfAuthor: 'string',
    dateOfBirthAuthor: '1930-04-17',
    numberOfPages: 8,
    yearOfPublishing: 1991,
    quantity: 8,
    coverPhoto: 'string'
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
      await updateBook(bookId, { quantity: parseInt(book.quantity) });
      alert('Quantity updated successfully');
    } else {
      // Add new book
      console.log(`⬇️ book ⬇️`, book);
      await addBook({
        isbn: ath.floor(Math.random() * 10) + 1,
        title: book.title,
        nameOfAuthor: book.nameOfAuthor,
        dateOfBirthAuthor: book.dateOfBirthAuthor,
        numberOfPages: parseInt(book.numberOfPages),
        yearOfPublishing: parseInt(book.yearOfPublishing),
        quantity: parseInt(book.quantity),
        // coverPhoto: book.coverPhoto
        coverPhoto: 'string'
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
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setBook({ ...book, coverPhoto: reader.result });
  };

  reader.readAsDataURL(file);
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
          name="nameOfAuthor"
          placeholder="Author"
          value={book.nameOfAuthor}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <input
          type="date"
          name="dateOfBirthAuthor"
          value={book.dateOfBirthAuthor}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <input
          type="number"
          name="numberOfPages"
          placeholder="Number of Pages"
          value={book.numberOfPages}
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
