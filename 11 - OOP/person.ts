export class Person {
  // private personality: string;
  personality: string = "";

  public Person() {
    // constructor() {
    this.personality = "Mystery";
  }
  public AskQuestion(answer: number): void {
    if (answer === 1) {
      this.personality = "Extrovert";
    } else if (answer === 2) {
      this.personality = "Introvert";
    } else {
      this.personality = "You are still a Mystery";
    }
  }

  // This method returns the value of the Personality
  public GetPersonality(): string {
    return this.personality;
  }
}
