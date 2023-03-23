/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

export const getUsers = async (selectedAuthor, sortByTitle) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books?author=${selectedAuthor}&sortByTitle=${sortByTitle}`;
  const response = await axios.get(apiUrl);
  console.log(`⬇️ apiUrl ⬇️`, apiUrl);
  return response.data.records;
};

export const getBookById = async (bookId) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books/${bookId}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

export const delateBookById = async (bookId) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books/${bookId}`;
  const response = await axios.delete(apiUrl);
  return response.data;
};

export const addBook = async (book) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books`;
  const response = await axios.post(apiUrl, book);
  return response.data;
};


export const updateBook = async (bookId, updatedBookData) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books/${bookId}`;
  const response = await axios.patch(apiUrl, updatedBookData);
  return response.data;
};
