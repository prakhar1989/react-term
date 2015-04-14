var React = require('react');

var App = React.createClass({
  getInitialState: function() {
      return {
        commands: {},
        history: [],
        prompt: '$ '
      }
  },
  clearHistory: function() {
      this.setState({ history: [] });
  },
  registerCommands: function() {
    this.setState({
      commands: {
        'clear' : this.clearHistory,
        'intro' : this.showWelcomeMsg,
        'help'  : this.showHelp,
        'source': this.openLink('https://github.com/prakhar1989/react-term/blob/master/src/app.js'),
        'github': this.openLink('http://github.com/prakhar1989'),
        'blog'  : this.openLink('http://prakhar.me')
      }
    });
  },
  showWelcomeMsg: function() {
      this.addHistory("I'm Prakhar Srivastav and I'll be joining Columbia university this fall in the Computer Science department.");
      this.addHistory("Type `help` to see what all commands are available");
  },
  openLink: function(link) {
      return function() {
        window.open(link, '_blank');
      }
  },
  showHelp: function() {
      this.addHistory("help - this help text");
      this.addHistory("github - view my github profile");
      this.addHistory("source - browse the code for this page");
      this.addHistory("intro - print intro message");
      this.addHistory("blog - read some stuff that I've written");
      this.addHistory("clear - clear screen");
  },
  componentDidMount: function() {
      var term = this.refs.term.getDOMNode();

      this.registerCommands();
      this.showWelcomeMsg();
      term.focus();
  },
  handleInput: function(e) {
      var input = this.refs.term.getDOMNode().value;
      if (e.key === "Enter") {
          var command = this.state.commands[input];

          // log command
          this.addHistory(this.state.prompt + " " + input);

          if (command === undefined) {
              this.addHistory("sh: command not found: " + input);
          } else {
              command();
          }
          this.clearInput();
      }
  },
  clearInput: function() {
      this.refs.term.getDOMNode().value = "";
  },
  addHistory: function(output) {
    var history = this.state.history;
    history.push(output)
    this.setState({
      'history': history
    });
  },
  handleClick: function() {
    var term = this.refs.term.getDOMNode();
    term.focus();
  },
  render: function() {
      var output = this.state.history.map(function(op, i) {
          return <p key={i}>{op}</p>
      });
      return (
        <div className='input-area' onClick={this.handleClick}>
          {output}
          <p>
            <span className="prompt">{this.state.prompt}</span> 
            <input type="text" onKeyPress={this.handleInput} ref="term" />
          </p>
        </div>
      )
  }
});

// render it dawg!
var AppComponent = React.createFactory(App);
React.render(AppComponent(), document.getElementById('app'));
