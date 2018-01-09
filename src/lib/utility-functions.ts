import Category from '../enums';
import { Book } from '../interfaces';

interface LibMgrCallback {
  (err: Error, titles: Array<string>): void;
}

export function getBooksByCategory(
  category: Category,
  callback: LibMgrCallback
): void {
  setTimeout(() => {
    try {
      const foundBooks: Array<string> = getBookTitlesByCategory(category);

      if (foundBooks.length > 0) {
        callback(null, foundBooks);
      } else {
        throw new Error('No books found');
      }
    } catch (error) {
      callback(error, null);
    }
  }, 2000);
}

export function logCategorySearch(err: Error, titles: Array<string>): void {
  if (err) {
    console.log(`Error message ${err.message}`);
  } else {
    console.log(titles);
  }
}

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

export function purge<T>(inventory: Array<T>): Array<T> {
  return inventory.splice(2, inventory.length);
}

export function getAllBooks(): Array<Book> {
  return booksData;
}

export function logFirstAvailable(books: Array<Book> = booksData): void {
  const booksLength = books.length;
  const firstAvailableBook = books.find((book: Book) => book.available);

  console.log(`The first available book name is ${firstAvailableBook.title}`);
  console.log(`Total book length is ${booksLength}`);
}

// 02 Enum
export function getBookTitlesByCategory(
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

export function logBookTitles(titles: Array<string>): void {
  for (let title of titles) {
    console.log(title);
  }
}

// 03. Arrow Functions
export const getBookByID = (id: number): Book | undefined => {
  return getAllBooks().find(book => book.id === id);
};

export const createCustomerID = (name: string, id: number): string => {
  return `Customer ${name} has id ${id}`;
};

// 5. Optional, Default and Rest Parameters
export const createCustomer = (
  name: string,
  age?: string,
  city?: string
): void => {
  console.log(`Hello, my name is ${name}`);

  if (age) {
    console.log(`My age is ${age}`);
  }

  if (city) {
    console.log(`I am from ${city} city`);
  }
};

export const сheckoutBooks = (
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

// 6. Function Overloading
export function getTitles(author: string): Array<string>;
export function getTitles(available: boolean): Array<string>;
export function getTitles(bookProp: any): Array<string> {
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

export function printBook(book: Book): void {
  console.log(`${book.title} by ${book.author}`);
}

export function getBooksByCategoryPromise(
  category: Category
): Promise<Array<string>> {
  const promise: Promise<Array<string>> = new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundBooks: Array<string> = getBookTitlesByCategory(category);

      if (foundBooks.length > 0) {
        resolve(foundBooks);
      } else {
        reject('No found');
      }
    }, 2000);
  });

  return promise;
}

export async function logSearchResults(category: Category) {
  let foundBooks = await getBooksByCategoryPromise(category);
  console.log(foundBooks);
}
