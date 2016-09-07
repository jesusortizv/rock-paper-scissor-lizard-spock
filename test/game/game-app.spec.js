import GameApp from '../../src/js/components/game/game-app';
import UserChoicesMockup from '../../src/js/components/game/available-choices.json';

describe('Game Component', () => {
  let gameApp;

  beforeEach(() => {
    gameApp = new GameApp();
  });

  it('Should initialise Game class', () => {
    expect(gameApp).to.be.instanceOf(GameApp)
  });
  it('Should initialise the available choices', () => {
    expect(gameApp.availableChoices).to.have.lengthOf(5);
  });
  it('Should get a winner', () => {
    gameApp.getWinner(2);
    expect(gameApp.winner).to.not.be.null;
  });
  it('Should generate a random value if no option has been passed', () => {
    gameApp.play();
    expect(gameApp.playerOne.choice).to.be.within(1,5);
    expect(gameApp.playerTwo.choice).to.be.within(1,5);
  });
  it('Should calculate a random value for computer players', () => {
    const play = gameApp.calculateComputerTurn();
    expect(play).to.be.within(1,5);
  });
  it('Should get infomation from game option', () => {
    const choiceInfo = gameApp.getChoiceInformation(2);
    expect(choiceInfo).to.have.lengthOf(1);
    expect(choiceInfo.reduce(choice => choice)).to.deep.equal(UserChoicesMockup.choices[1]);
  });
  it('Should be able to add a previous game to the history', () => {
    gameApp.getWinner();
    expect(gameApp.history).to.have.lengthOf(1);
  });
  it('Should reset the model when reset method has been called', () => {
    gameApp.getWinner();
    expect(gameApp.winner).to.not.be.null;
    gameApp.restartApp();
    expect(gameApp.winner).to.be.null;
  });
  it('Should bind available choices when constructor has been called', () => {
    gameApp.getWinner();
    expect(gameApp.getData().availableChoices).to.deep.equal(UserChoicesMockup.choices);
  });
  it('Should pass the data to the template', () => {
    gameApp.getWinner();
    const objData = gameApp.getData();
    expect(objData).to.contain.all.keys(['availableChoices', 'winner', 'playerOne', 'playerTwo', 'history']);
  });
  it('Should get and bind the initial model', () => {
    expect(gameApp.winner).to.not.be.undefined;
    expect(gameApp.playerOne).to.not.be.undefined;
    expect(gameApp.playerTwo).to.not.be.undefined;
    expect(gameApp.history).to.not.be.undefined;
  });
});
