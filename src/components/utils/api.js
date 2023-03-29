/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

export const getBooks = async (selectedAuthor, sortByTitle, startPage, limitPage) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books?author=${selectedAuthor}&sortByTitle=${sortByTitle}&startPage=${startPage}&limitPage=${limitPage}`;
  const response = await axios.get(apiUrl);
  console.log(`⬇️ apiUrl ⬇️`, apiUrl);
  return response.data;
};

export const getBookById = async (bookId) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books/${bookId}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

export const deleteBookById = async (bookId) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books/${bookId}`;
  const response = await axios.delete(apiUrl);
  return response.data;
};



export const addBook = async (bookData) => {
  try {
    const response = await axios.post('https://book-store.mvsoft.co.rs/books', bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};



export const updateBook = async (bookId, updatedBookData) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books/${bookId}`;
  const response = await axios.patch(apiUrl, updatedBookData);
  return response.data;
};
