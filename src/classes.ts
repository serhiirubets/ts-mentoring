import * as Interfaces from './interfaces';
import { sealed, logger, writable } from './decorators';

// 10. Interfaces for Class Types
@sealed('UniversityLibrarian')
@logger
class UniversityLibrarian implements Interfaces.Librarian {
  name: string;
  email: string;
  department: string;

  assistCustomer(name: string): void {
    console.log(`${name} from department ${this.department}`);
  }

  @writable(true)
  assistFaculty() {
    console.log('Assisting faculty');
  }

  @writable(false)
  teachCommunity() {
    console.log('Teaching Comunity');
  }
}

// 11. Creating and Using Classes
abstract class ReferenceItem {
  // title: string;
  // year: number;

  static department = 'BBC';

  private _publisher: string;

  get publisher(): string {
    return this._publisher.toUpperCase();
  }

  set publisher(newPublisher: string) {
    this._publisher = newPublisher;
  }

  abstract printCitation(): void;

  constructor(public title: string, protected year: number) {
    // this.title = newTitle;
    // this.year = newYear;
    console.log('Creating a new ReferenceItem...');
  }

  printItem(): void {
    console.log(
      `${this.title} was published in ${this.year} in ${
        ReferenceItem.department
      }`
    );
  }
}

// const ref = new ReferenceItem('Them', 1990);
// ref.printItem();
// ref.publisher = 'Viktor';
// console.log(ref.publisher);

export { UniversityLibrarian, ReferenceItem };
