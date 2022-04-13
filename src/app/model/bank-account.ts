export class BankAccount {
    public constructor(
        private readonly _name: string,
        private readonly _accountNumber: string = 'SI64397745065188826', // not needed for this task
        private readonly _img: string = ''
    ) { }

    public get name(): string {
        return this._name;
    }

    public get accountNumber(): string {
        return this._accountNumber;
    }

    public get img(): string {
        return this._img;
    }
}