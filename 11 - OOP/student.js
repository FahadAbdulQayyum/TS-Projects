import { Person } from "./person.js";
// Here we can either write or read data to this class
export class Student extends Person {
    //   public Student() {
    constructor() {
        //   constructor(name?: string) {
        super();
        this._name = "";
        // this._name = name;
    }
    // use the Get accessor to read data from the class
    get name() {
        return this._name;
    }
    set name(value) {
        // The value property of the set accessor is automatically created by
        this._name = value;
    }
}
