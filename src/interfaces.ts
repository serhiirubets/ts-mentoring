import Category from './enums';

// 08. Defining an Interface for Function Types
interface DamageLogger {
  (a: string): void;
}

interface Person {
  name: string;
  email: string;
}

// 09. Extending Interface
interface Author extends Person {
  numBooksPublished: number;
}

interface Librarian extends Person {
  department: string;
  assistCustomer: (custName) => void;
}

// 07. Defining an Interface for Function Types
interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
  category: Category;
  pages?: number;
  markDamaged?: DamageLogger;
}

interface Magazine {
  title: string;
  publisher: string;
}

export { DamageLogger, Person, Author, Librarian, Book, Magazine };
export { DamageLogger as Logger };
