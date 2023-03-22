/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

export const getUsers = async (sortByTitle, sortByAuthor) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books?sortByTitle=${sortByTitle}&sortByAuthor=${sortByAuthor}`;
  const response = await axios.get(apiUrl);
  return response.data.records;
};

export const getBookById = async (bookId) => {
  const apiUrl = `https://book-store.mvsoft.co.rs/books/${bookId}`;
  const response = await axios.get(apiUrl);
  return response.data;
};
