const express = require('express')
const app = express()
const {open} = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')
const dbpath = path.join(__dirname, 'goodreads.db')
let db = null
const startDb = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server running')
    })
  } catch (e) {
    console.log(`Db error ${e.message}`)
    process.exit(1)
  }
}
startDb()
app.get('/books', async (request, response) => {
  const getBooksArray = `
                  select * from book order by book_id; 
  `
  const booksArray = await db.all(getBooksArray)
  respone.send(booksArray)
})
