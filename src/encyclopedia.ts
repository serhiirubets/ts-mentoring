import { ReferenceItem } from './classes';

// 12. Extending Classes
class Encyclopedia extends ReferenceItem {
    constructor(title: string, year: number, public edition: number) {
        super(title, year);
    }

    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} in ${this.year}`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}

export default Encyclopedia;