import Template from './game.template';
import GameApp from './game-app';

/** Class representing game view. */
export default class View {
  /**
    * Create a new view.
  */
  constructor() {
    this.$el = document.getElementById('rock-paper-scissors');
    this.model = new GameApp();
    const html = this.render(this.$el, this.model.getData());
    html();
  }
  /**
    * Render HTML based on a container and data model.
    * @return {function} Callbacl to be executed.
  */
  render($el, data) {
    $el.innerHTML = new Template(data).getTemplate();
    return () => {
      this.templates = this.getTemplates();
      this.listeners();
    };
  }
  /**
    * Bind listeners in the template
  */
  listeners() {
    // Listeners
    this.templates.userChoices.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.model.getWinner(Number(event.target.dataset.choice));
        this.render(this.$el, this.model.getData())();
      });
    });

    this.templates.restartApp.addEventListener('click', (event) => {
      event.preventDefault();
      this.model.restartApp();
      this.render(this.$el, this.model.getData())();
    });

    this.templates.switchToComputer.addEventListener('click', (event) => {
      event.preventDefault();
      this.model.getWinner();
      this.render(this.$el, this.model.getData())();
    });
  }
  /**
    * Get templates to use
    * @return {object} Templates to use
  */
  getTemplates() {
    return {
      userChoices: document.getElementById('user-choices'),
      restartApp: document.getElementById('restart-app'),
      switchToComputer: document.getElementById('switch-to-computer')
    };
  }
}
