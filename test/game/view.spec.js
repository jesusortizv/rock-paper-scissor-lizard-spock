import View from '../../src/js/components/game/view';

describe('Game Component -- View', () => {
  let view;
  beforeEach(() => {
    let htmlContainer = document.createElement("div");
    htmlContainer.id = 'rock-paper-scissors';
    document.getElementsByTagName('body')[0].appendChild(htmlContainer);
    view = new View();
  });

  it('Should load the model', () => {
    expect(view.model).to.not.be.undefined;
  });

  it('Should get a list of templates', () => {
    const templates = view.getTemplates();
    expect(templates.userChoices).to.not.be.undefined;
    expect(templates.restartApp).to.not.be.undefined;
    expect(templates.switchToComputer).to.not.be.undefined;
  });
});
