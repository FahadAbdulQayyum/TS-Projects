class Person {
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
        else {
            this.personality = "Introvert";
        }
    }
    // This method returns the value of the Personality
    GetPersonality() {
        return this.personality;
    }
}
export {};
