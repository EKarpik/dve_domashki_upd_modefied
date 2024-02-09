import supertest from 'supertest'
import config from '../config/config.js'

const getBooks = async () => {
  const response = await supertest(config.url).get('/BookStore/v1/Books')
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const getBook = async ({ isbn, token }) => {
  const response = await supertest(config.url)
    .get(`/BookStore/v1/Book?ISBN=${isbn}`)
    .set('Authorization', `Bearer ${token}`)

  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const replaceBook = async ({ isbn1, userId, isbn2, token }) => {
  const response = await supertest(config.url)
    .put(`/BookStore/v1/Books/${isbn1}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      userId,
      isbn2
    })
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const addListOfBooks = async ({ userId, isbns, token }) => {
  const payload = {
    userId,
    collectionOfIsbns: isbns.map(isbn => ({isbn}))
  }

  const response = await supertest(config.url)
    .post(`/BookStore/v1/Books`)
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json')
    .send(payload)
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

export default {
  getOne: getBook,
  getAll: getBooks,
  replace: replaceBook,
  addList: addListOfBooks
}
