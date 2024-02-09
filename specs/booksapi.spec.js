import BookService from '../framework/services/BookService.js'
import { books } from '../framework/fixtures/Books.json'
import AuthService from '../framework/services/AuthService.js'
import config from '../framework/config/config.js'
import UserService from '../framework/services/UserService.js'
import UserBookService from '../framework/services/UserBookService.js'

describe('Books', () => {
  const userId = config.credentials.userId
  const userName = config.credentials.username
  const password = config.credentials.password
  const [book1, book2] = books
  const isbnOne = book1.isbn
  const isbnTwo = book2.isbn

  console.log('isb_1', isbnOne)

   let token

  beforeAll(async () => {
    const responseToken = await AuthService.getAuthToken({ userName, password })
    token = responseToken.data.token
    console.log('токен для теcтов с книгами', token)
    console.log('имя и пароль юзера для тестов с книгами', userName, password)
   
  })

  it('Получить список книг', async () => {
    const response = await BookService.getAll()

    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
  })

  it('Удаление всех книг из коллекции пользователя', async () => {
    const responseRemoveAll = await UserBookService.removeAll({ userId, token })
    console.log('тело ответа после удаления всех книг',responseRemoveAll.data)

    expect(responseRemoveAll.status).toBe(204)

    const responseUser = await UserService.userInfo({ userId, token })
    expect(responseUser.body.books).toEqual([])
  })

  it('Получение информации о конкретной книге', async () => {
    const responseGetBook = await BookService.getOne({ isbnOne, token })
    console.log('запрашиваем инфо об этолй книге', isbnOne)
    console.log('стутс код ответа информация о книге', responseGetBook.status,'информация о книге', responseGetBook.data)
    expect(responseGetBook.status).toBe(200)
  })
  it('Замена книги в коллекции к пользователя', async () => {
    const responseAddListOfBooks = await BookService.replaceList({
      isbnOne,
      userId,
      isbnTwo,
      token
    })
    expect(responseAddListOfBooks.status).toBe(200)
  })

  it('Удалить одну книгу у пользователя из коллекции', async () => {
    const responseDelOne = await UserBookService.removeOne({
      userId,
      isbnTwo,
      token
    })
    console.log('Тест про удаление книги у пользователя. Сообщение по факту удаления книги',responseDelOne)
    expect(responseDelOne.status).toBe(204)
    
  })


 })
