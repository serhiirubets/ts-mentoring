import Category from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian } from './classes';
import RefBook from './encyclopedia';
import { purge } from './lib/utility-functions';
import Shelf from './shelf';

// Basic Types
const booksData = [
  {
    id: 2323,
    title: 'Refactoring JavaScript',
    author: 'Evan Burchard',
    available: true,
    category: Category.JavaScript
  },
  {
    id: 3454,
    title: 'JavaScript Testing',
    author: 'Liang Yuxian Eugene',
    available: false,
    category: Category.Angular2
  },
  {
    id: 3456,
    title: 'CSS Secrets',
    author: 'Lea Verou',
    available: true,
    category: Category.CSS
  },
  {
    id: 6443,
    title: 'Mastering JavaScript Object-Oriented Programming',
    author: 'Andrea Chiarelli',
    available: true,
    category: Category.HTML
  }
];

let IdGenerator: (name: string, id: number) => string;

function getAllBooks(): Array<Book> {
  return booksData;
}

function logFirstAvailable(books: Array<Book> = booksData): void {
  const booksLength = books.length;
  const firstAvailableBook = books.find((book: Book) => book.available);

  console.log(`The first available book name is ${firstAvailableBook.title}`);
  console.log(`Total book length is ${booksLength}`);
}

logFirstAvailable(getAllBooks());
logFirstAvailable();

// 02 Enum
function getBookTitlesByCategory(
  category: Category = Category.JavaScript
): Array<string> {
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

const booksByJsCategory = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(booksByJsCategory);

// 03. Arrow Functions
booksByJsCategory.forEach(title => console.log(title));

const getBookByID = (id: number): Book | undefined => {
  return getAllBooks().find(book => book.id === id);
};

const createCustomerID = (name: string, id: number): string => {
  return `Customer ${name} has id ${id}`;
};

// 04 Function Type
let myID = createCustomerID('Ann', 10);
IdGenerator = createCustomerID;
getBookByID(3454);
console.log(myID);

myID = IdGenerator('Dima', 20);
console.log(myID);

console.group();

// 5. Optional, Default and Rest Parameters
const createCustomer = (name: string, age?: string, city?: string): void => {
  console.log(`Hello, my name is ${name}`);

  if (age) {
    console.log(`My age is ${age}`);
  }

  if (city) {
    console.log(`I am from ${city} city`);
  }
};

createCustomer('Masha');
createCustomer('Vasya', '20');
createCustomer('Katya', '25', 'Kyiv');
console.groupEnd();

console.log(getBookTitlesByCategory());

const сheckoutBooks = (
  customer: string,
  ...booksId: Array<number>
): Array<string> => {
  const titles: Array<string> = [];
  console.log(`Customer name is ${customer}`);

  for (let bookId of booksId) {
    const book: any = getBookByID(bookId);

    if (book && book.available) {
      titles.push(book.title);
    }
  }

  return titles;
};

const myBooks: Array<string> = сheckoutBooks('Ann', 2323, 3454);
myBooks.forEach(title => console.log(title));

// 6. Function Overloading
function getTitles(author: string): Array<string>;
function getTitles(available: boolean): Array<string>;
function getTitles(bookProp: any): Array<string> {
  const books: Array<any> = getAllBooks();
  const booksTitles: Array<string> = [];

  if (typeof bookProp === 'string') {
    for (let book of books) {
      if (bookProp === book.author) {
        booksTitles.push(book);
      }
    }
  } else if (typeof bookProp === 'boolean') {
    for (let book of books) {
      if (bookProp === book.available) {
        booksTitles.push(book);
      }
    }
  }

  return booksTitles;
}

const checkedOutBooks: Array<string> = getTitles(false);
checkedOutBooks.forEach(title => console.log(title));

function printBook(book: Book): void {
  console.log(`${book.title} by ${book.author}`);
}

const myBook: Book = {
  id: 5,
  title: 'Colors, Backgrounds, and Gradients',
  author: 'Eric A. Meyer',
  available: true,
  category: Category.CSS,
  pages: 200,
  markDamaged: (reason: string) => {
    console.log(`Damaged: ${reason}`);
  }
};

printBook(myBook);
myBook.markDamaged('missing back cover');

const logDamage: Logger = (reason: string) => {
  console.log(reason);
};

logDamage('test value');

const favoriteAuthor: Author = {
  name: 'Dima',
  email: 'dima@test.com',
  numBooksPublished: 5
};

/*
const favoriteLibrarian: Librarian = {
  name: 'Vanya',
  email: 'vanya@test.com',
  department: 'test',
  assistCustomer: (name) => {
    console.log(name);
  }
}
*/

const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Max';
favoriteLibrarian.department = 'BBC';
favoriteLibrarian.assistCustomer('Viktor');

const refBook: RefBook = new RefBook('About word', 1995, 2);
refBook.printItem();

// Task 17. Generic Functions

const inventory: Array<Book> = [
  {
    id: 10,
    title: 'The C Programming Language',
    author: 'K & R',
    available: true,
    category: Category.Software
  },
  {
    id: 11,
    title: 'Code Complete',
    author: 'Steve McConnell',
    available: true,
    category: Category.Software
  },
  {
    id: 12,
    title: '8-Bit Graphics with Cobol',
    author: 'A. B.',
    available: true,
    category: Category.Software
  },
  {
    id: 13,
    title: 'Cool autoexec.bat Scripts!',
    author: 'C. D.',
    available: true,
    category: Category.Software
  }
];

/*
const purgedBooks: Array<Book> = purge<Book>(inventory);
console.log(purgedBooks);

const purgedNumbers: Array<number> = purge<number>([34, 23, 54, 23, 54, 64]);
console.log(purgedNumbers);
*/

// Task 18. Generic Interfaces and Classes
const bookShelf: Shelf<Book> = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));

const firstBook: Book = bookShelf.getFist();
console.log(firstBook);

const magazines: Array<Magazine> = [
  { title: 'Programming Language Monthly', publisher: 'Code Mags' },
  { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
  { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf: Shelf<Magazine> = new Shelf<Magazine>();
magazines.forEach(magazine => magazineShelf.add(magazine));

const firstMagazine: Magazine = magazineShelf.getFist();
console.log(firstMagazine);

// Task 19. Generic Constraints
magazineShelf.printTitles();
const magazineCodeComplete = magazineShelf.find('Five Points');
console.log(magazineCodeComplete);
