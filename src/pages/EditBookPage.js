import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addBook, updateBook, getBookById as fetchBookById } from '../components/utils/api';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const EditBookPage = () => {
  const navigate = useNavigate();
  const bookId = useSelector((state) => state?.books?.bookId);
  const mode = useSelector((state) => state?.books?.mode);
const [errors, setErrors] = useState({
  title: false,
  nameOfAuthor: false,
  dateOfBirthAuthor: false,
  numberOfPages: false,
  yearOfPublishing: false,
  quantity: false
});

  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({
    isbn: 34453534,
    title: '',
    nameOfAuthor: '',
    dateOfBirthAuthor: '',
    numberOfPages: null,
    yearOfPublishing: null,
    quantity: null,
    coverPhoto: ''
  });

  const validateFields = () => {
    const newErrors = {
      title: !book.title,
      nameOfAuthor: !book.nameOfAuthor,
      dateOfBirthAuthor: !book.dateOfBirthAuthor,
      numberOfPages: !(book.numberOfPages > 0),
      yearOfPublishing: !(book.yearOfPublishing > 0),
      quantity: !(book.quantity > 0)
    };

    setErrors(newErrors);
    // Return true if there are no errors
    return !Object.values(newErrors).some((error) => error);
  };

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

    if (!validateFields()) {
      return;
    }

    try {
      if (mode === 'edit') {
        // Update existing book
        await updateBook(bookId, { quantity: parseInt(book.quantity) });
        alert('Quantity updated successfully');
          navigate(-1);
      } else {
        // Add new book
        console.log(`⬇️ book ⬇️`, book);
        await addBook({
          isbn: Math.floor(Math.random() * 1000000) + 1,
          title: book.title,
          nameOfAuthor: book.nameOfAuthor,
          dateOfBirthAuthor: book.dateOfBirthAuthor,
          numberOfPages: parseInt(book.numberOfPages),
          yearOfPublishing: parseInt(book.yearOfPublishing),
          quantity: parseInt(book.quantity),
          coverPhoto: book.coverPhoto
          // coverPhoto: 'string'
        });
        alert('Book added successfully');
        setTimeout(() => {
          navigate(-1);
        }, 500);
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
    console.log(`⬇️ { ...book, coverPhoto: reader.result } ⬇️`, {
      ...book,
      coverPhoto: reader.result
    });

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
      <Grid sx={{ background: '#0b4994', height: '150px', width: '100vw' }}>
        <ArrowBackIcon
          onClick={() => navigate(-1)}
          sx={{ paddingLeft: '5vw', marginTop: '2vh', background: '#0b4994', color: 'white' }}
        />
        <Typography
          variant="h4"
          sx={{ paddingLeft: '5vw', marginTop: '3vh', background: '#0b4994', color: 'white' }}>
          {mode == 'edit' ? 'Edit' : 'Add Book'}
        </Typography>
      </Grid>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingLeft: '5vw',
          marginTop: '3vh',
          width: '100%'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}>
        <TextField
          error={errors.title}
          helperText={errors.title ? 'Title is required' : ''}
          label="Title"
          variant="standard"
          margin="normal"
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <TextField
          error={errors.nameOfAuthor}
          helperText={errors.nameOfAuthor ? 'Author Name is required' : ''}
          label="Author"
          variant="standard"
          margin="normal"
          type="text"
          name="nameOfAuthor"
          placeholder="Author"
          value={book.nameOfAuthor}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <TextField
          error={errors.dateOfBirthAuthor}
          helperText={errors.dateOfBirthAuthor ? 'Date Of Birth is required' : ''}
          variant="standard"
          margin="normal"
          type="date"
          name="dateOfBirthAuthor"
          value={book.dateOfBirthAuthor}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <Typography>Date of birth(author)</Typography>
        <TextField
          error={errors.numberOfPages}
          helperText={errors.numberOfPages ? 'Number Of Pages is required' : ''}
          label="Number of pages"
          variant="standard"
          margin="normal"
          type="number"
          name="numberOfPages"
          placeholder="Number of Pages"
          value={book.numberOfPages}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <TextField
          error={errors.yearOfPublishing}
          helperText={errors.yearOfPublishing ? 'Year Of Publishing is required' : ''}
          label="Year of publishing"
          variant="standard"
          margin="normal"
          type="number"
          name="yearOfPublishing"
          placeholder="Year of Publishing"
          value={book.yearOfPublishing}
          onChange={handleInputChange}
          disabled={mode === 'edit'}
          required
        />
        <TextField
          error={errors.quantity}
          helperText={errors.quantity ? 'Quantity is required' : ''}
          label="Quantity"
          variant="standard"
          margin="normal"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={book.quantity}
          onChange={handleInputChange}
          required
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
          <TextField
            label="Cover Photo"
            variant="standard"
            margin="normal"
            type="file"
            onChange={handleFileChange}
            disabled={mode === 'edit'}
            required={mode !== 'edit'}
          />
          <Button variant="contained" type="submit">
            {mode === 'edit' ? 'Update Quantity' : 'Add Book'}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default EditBookPage;
