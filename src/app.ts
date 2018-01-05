enum Category {
  'JavaScript',
  'CSS',
  'HTML',
  'TypeScript',
  'Angular2'
}
function getAllBooks(): Array<any> {
  return [
    { title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
    { title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.Angular2 },
    { title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    { title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.HTML }
  ]
}

function logFirstAvailable(books: Array<any>): void {
  const booksLength = books.length;
  const firstAvailableBook = books.find((book: any) => {
    return book.available;
  });

  console.log(`The first available book name is ${firstAvailableBook.title}`);
  console.log(`Total book length is ${booksLength}`);
}

function getBookTitlesByCategory(category: Category): Array<String> {
  const titles: Array<String> = [];
  const books = getAllBooks();

  for (let book of books) {
    if (book.category === category) {
      titles.push(book.title);
    }
  }

  return titles;
}

function logBookTitles(titles: Array<String>): void {
  for (let title of titles) {
    console.log(title);
  }
}

logFirstAvailable(getAllBooks());
const booksByJsCategory = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(booksByJsCategory);