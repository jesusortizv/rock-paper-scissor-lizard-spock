import UserChoices from './available-choices.json';

/** Class representing game logic. */
class GameApp {
  /**
    * Create a new game.
  */
  constructor() {
    //GET game choices from json file and assign to property
    this.availableChoices = UserChoices.choices;
    this.bindModel();
  }
  /**
    * Get winner.
    * @param {number} userChoice - The option chose by the user
  */
  getWinner(userChoice = null) {
    this.winner = this.play(userChoice);
    this.addToHistory();
  }
  /**
    * Play turn.
    * @param {number} userChoice - The option chose by the user
    * @return {number} The winner.
  */
  play(userChoice) {
    let winner;
    this.playerOne.choice = userChoice || this.calculateComputerTurn();
    this.playerTwo.choice = this.calculateComputerTurn();

    if (this.playerOne.choice === this.playerTwo.choice) {
      winner = 0;
      this.playerOne.score.ties += 1;
      this.playerTwo.score.ties += 1;
    } else {
      const userChoiceInfo = this.getChoiceInformation(this.playerOne.choice).reduce(choice => choice).wins;

      if (userChoiceInfo.indexOf(this.playerTwo.choice) >= 0) {
        winner = 1;
        this.playerOne.score.wins += 1;
        this.playerTwo.score.loses += 1;
      } else {
        winner = 2;
        this.playerOne.score.loses += 1;
        this.playerTwo.score.wins += 1;
      }
    }
    return winner;
  }
  /**
    * Play turn.
    * @return {number} The option played randomly by the computer.
  */
  calculateComputerTurn() {
    const idsChoices = this.availableChoices.map((choice) => choice.id);
    const minPlay = Math.min(...idsChoices);
    const maxPlay = Math.max(...idsChoices);

    return Math.floor( Math.random() * ( maxPlay - minPlay + 1 ) + minPlay )
  }
  /**
    * Get choice information.
    * @param {number} playerChoice - The option chose by the user
  */
  getChoiceInformation(playerChoice) {
    return this.availableChoices
      .filter((choice) => choice.id === playerChoice);
  }
  /**
    * Add new item into history.
  */
  addToHistory() {
    this.history.push({
      player1Choice: this.getChoiceInformation(this.playerOne.choice).reduce(choice => choice).id,
      player2Choice: this.getChoiceInformation(this.playerTwo.choice).reduce(choice => choice).id,
      winner: this.winner
    });
  }
  /**
    * Restart App.
  */
  restartApp() {
    this.bindModel();
  }
  /**
    * Return initial model app.
    * @return {object} default options for the constructor
  */
  getInitialModel() {
    return {
      winner: null,
      playerOne: {
        choice: null,
        score: {
          wins: 0,
          loses: 0,
          ties: 0
        },
        isComputer: true
      },
      playerTwo: {
        choice: null,
        score: {
          wins: 0,
          loses: 0,
          ties: 0
        }
      },
      history: []
    };
  }
  /**
    * Bind model into constructor based on the default data model.
  */
  bindModel() {
    const preModel = this.getInitialModel();

    Object.keys(preModel).forEach(key => {
      this[key] = preModel[key];
    });
  }
  /**
    * Get data to render inside template.
    * @return {object} data to render on the template
  */
  getData() {
    return {
      availableChoices: this.availableChoices,
      winner: this.winner,
      playerOne: this.playerOne,
      playerTwo: this.playerTwo,
      history: this.history
    };
  }
}

export default GameApp;
