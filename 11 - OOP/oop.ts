class Person {
  // private personality: string;
  personality: string = "";

  public Person() {
    // constructor() {
    this.personality = "Mystery";
  }
  public AskQuestion(answer: number): void {
    if (answer === 1) {
      this.personality = "Extrovert";
    } else {
      this.personality = "Introvert";
    }
  }

  // This method returns the value of the Personality
  public GetPersonality(): string {
    return this.personality;
  }
}
