import html from '../../utils.js';

export default class Template {
  constructor(data) {
    this.data = data;
  }

  getTemplate() {

    const icon = (choiceId) => {
      let icon;
      switch (choiceId) {
        case 1:
          icon = 'rock';
          break;
        case 2:
          icon = 'paper';
          break;
        case 3:
          icon = 'scissors';
          break;
        case 4:
          icon = 'lizard';
          break;
        case 5:
          icon = 'spock';
          break;
        default:
      }

      return `<i class="fa fa-hand-${icon}-o"></i>`;
    }

    const button = (choice) => html`
      <button class="btn btn-primary" data-choice="${choice.id}">
        ${ icon(choice.id) } ${choice.name}
      </button>
    `;

    const winner = (winner) => {
      let message,
        typeClassAlert;

      switch (winner) {
        case 0:
          message = `You've tied`;
          typeClassAlert = 'alert-info';
          break;
        case 1:
          message = `Well done! You've won`;
          typeClassAlert = 'alert-success';
          break;
        case 2:
          message = `I'm sorry You've lost`;
          typeClassAlert = 'alert-warning';
          break;
        default:
          typeClassAlert = 'alert-no-message'
      }

      return `<div class="alert ${typeClassAlert}">
        ${message}...
      </div>`;
    };

    const scores = (player) => {
      const scoreColumn = column => {
        return html`
          <li class="">
            <label class="">${column}</label>
            <span class="badge">${player.score[column]}</span>
          </li>
        `;
      }

      return html`<ul class="game__score__list text-center">
        ${Object.keys(player.score).map(key => scoreColumn(key))}
      </ul>`;
    }

    const recordRow = (record, $index) => {
      let playerOneClass,
        playerTwoClass;

      switch (record.winner) {
        case 1:
          playerOneClass = 'game__history__list--winner';
          playerTwoClass = 'game__history__list--loser';
          break;
        case 2:
          playerOneClass = 'game__history__list--loser';
          playerTwoClass = 'game__history__list--winner';
          break;
        default:
          playerOneClass = '';
          playerTwoClass = '';
      }

      return html`
        <ul class="col-xs-12 game__history__list">
          <li class="text-center">
            <div class="col-xs-4 ${playerOneClass}">
              ${ icon(record.player1Choice) }
            </div>
            <div class="col-xs-4">
              <h5>Round ${ $index + 1 }</h5>
            </div>
            <div class="col-xs-4 ${playerTwoClass}">
              ${ icon(record.player2Choice) }
            </div>
          </li>
        </ul>`
    };

    const currentChoice = (choice) => {
      return html`
        <div class="col-xs-12">
          ${ icon(choice) }
        </div>`;
    };

    return html`<div class="container game">
      <div class="row">
        <div class="col-md-12 text-center">
          <h1>
            Welcome to the Game
            <button id="restart-app" class="btn btn-default">Restart APP</button>
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="row">
                <div class="col-xs-6">
                  <h3 class="panel-title text-center">Human</h3>
                </div>
                <div class="col-xs-6">
                  <button id="switch-to-computer" class="btn btn-info btn-xs pull-right">Let computer decide your choice</button>
                </div>
              </div>
            </div>
            <div class="panel-body text-center">
              <div class="row game__score">
                ${ scores(this.data.playerOne)}
              </div>
              <div class="row game__current-choice">
                ${ currentChoice(this.data.playerOne.choice)}
              </div>
              <div class="row">
                <div class="col-xs-12 game__user-choices">
                  <div class="btn-group btn-group-sm" id="user-choices">
                      ${this.data.availableChoices.map(data => button(data))}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <div class="game__result" id="game-result">
                    ${ winner(this.data.winner) }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 game__history">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title text-center">History</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <h4 class="text-center game__history__round">Round ${ this.data.history.length + 1}</h4>
                ${ this.data.history.map((data, $index) => recordRow(data, $index)) }
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="panel panel-default">
            <div class="panel-heading text-center">
              <h3 class="panel-title">Computer</h3>
            </div>
            <div class="panel-body text-center">
              <div class="row game__score">
                ${ scores(this.data.playerTwo)}
              </div>
              <div class="row game__current-choice">
                ${ currentChoice(this.data.playerTwo.choice)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
}
