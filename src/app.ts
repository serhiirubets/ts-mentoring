enum Category {
  'JavaScript',
  'CSS',
  'HTML',
  'TypeScript',
  'Angular2'
}

const booksData = [
  { id: 2323, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
  { id: 3454, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.Angular2 },
  { id: 3456, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
  { id: 6443, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.HTML }
];

let IdGenerator: (name: string, id: number) => string;

function getAllBooks(): Array<any> {
  return booksData;
}

function logFirstAvailable(books: Array<any> = booksData): void {
  const booksLength = books.length;
  const firstAvailableBook = books.find((book: any) => book.available);

  console.log(`The first available book name is ${firstAvailableBook.title}`);
  console.log(`Total book length is ${booksLength}`);
}

function getBookTitlesByCategory(category: Category = Category.JavaScript): Array<string> {
  const titles: Array<string> = [];
  const books = getAllBooks();

  for (let book of books) {
    if (book.category === category) {
      titles.push(book.title);
    }
  }

  return titles;
}

function logBookTitles(titles: Array<string>): void {
  for (let title of titles) {
    console.log(title);
  }
}

const getBookByID = (id: number): Object => {
  return getAllBooks().find((book) => book.id === id);
};

const createCustomerID = (name: string, id: number): string => {
  return `Customer ${name} has id ${id}`;
};

const createCustomer = (name: string, age?: string, city?: string): void => {
  console.log(`Hello, my name is ${name}`);

  if (age) {
    console.log(`My age is ${age}`);
  }

  if (city) {
    console.log(`I am from ${city} city`)
  }
};

const сheckoutBooks = (customer: string, ...booksId: Array<number>): Array<string> => {
  const titles: Array<string> = [];
  console.log(`Customer name is ${customer}`);

  for (let bookId of booksId) {
    const book: any = getBookByID(bookId);

    if (book && book.available) {
      titles.push(book.title);
    }
  }

  return titles;
}

logFirstAvailable(getAllBooks());

const booksByJsCategory = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(booksByJsCategory);

booksByJsCategory.forEach((title) => console.log(title));

let myID = createCustomerID('Ann', 10);
IdGenerator = createCustomerID;
getBookByID(3454);
console.log(myID);

myID = IdGenerator('Dima', 20);
console.log(myID);

console.group();
createCustomer('Masha');
createCustomer('Vasya', '20');
createCustomer('Katya', '25', 'Kyiv');
console.groupEnd();

console.log(getBookTitlesByCategory());
logFirstAvailable();

const myBooks: Array<string> = сheckoutBooks('Ann', 2323, 3454);
myBooks.forEach((title) => console.log(title));