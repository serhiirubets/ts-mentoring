import Category from './enums';
import { Book, Logger, Author, Librarian, Magazine } from './interfaces';
import { UniversityLibrarian } from './classes';
import RefBook from './encyclopedia';
import { purge } from './lib/utility-functions';
import Shelf from './shelf';
import {
  logFirstAvailable,
  getAllBooks,
  getBookTitlesByCategory,
  logBookTitles,
  createCustomerID,
  getBookByID,
  createCustomer,
  сheckoutBooks,
  getTitles,
  printBook,
  getBooksByCategory,
  logCategorySearch,
  getBooksByCategoryPromise
} from './lib/utility-functions';

let IdGenerator: (name: string, id: number) => string;

logFirstAvailable(getAllBooks());
logFirstAvailable();

const booksByJsCategory = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(booksByJsCategory);

// 04 Function Type
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

const myBooks: Array<string> = сheckoutBooks('Ann', 2323, 3454);
myBooks.forEach(title => console.log(title));

const checkedOutBooks: Array<string> = getTitles(false);
checkedOutBooks.forEach(title => console.log(title));

booksByJsCategory.forEach(title => console.log(title));

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

const favoriteLibrarian = new UniversityLibrarian();
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

// Task 21 Method Decorator
favoriteLibrarian.assistFaculty = () => console.log('assistFaculty');
// favoriteLibrarian.teachCommunity = () => console.log('teachCommunity');

// Task 22. Callback Functions
console.log('begin');
getBooksByCategory(Category.JavaScript, logCategorySearch);
console.log('end');

// Task 23. Promise
console.log('begin promise');
getBooksByCategoryPromise(Category.CSS)
  .then(titles => {
    console.log(titles);
    return titles.length;
  })
  .then(countOfBooks => console.log(countOfBooks))
  .catch(err => {
    console.log(err);
  });
