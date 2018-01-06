namespace Utility {
    export namespace Fees {
        export function CalculateLateFee(daysLate: number): number {
            return daysLate * 0.25;
        }
    }

    export function MaxBooksAllowed(age: number) {
        return age < 12 ? 3 : 10;
    }

    function privateFunc() {
        console.log('This is a private');
    }
}