export class Person {
    constructor() {
        // private personality: string;
        this.personality = "";
    }
    Person() {
        // constructor() {
        this.personality = "Mystery";
    }
    AskQuestion(answer) {
        if (answer === 1) {
            this.personality = "Extrovert";
        }
        else if (answer === 2) {
            this.personality = "Introvert";
        }
        else {
            this.personality = "You are still a Mystery";
        }
    }
    // This method returns the value of the Personality
    GetPersonality() {
        return this.personality;
    }
}
