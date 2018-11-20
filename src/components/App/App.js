import React from "react";
import "../../styles/index.scss";

const ThemeContext = React.createContext("light");

class ThemeProvider extends React.Component {
  state = {theme: "light"};
  toggleTheme = () => {
    this.setState(({theme}) => ({
      theme: theme === "light" ? "dark" : "light",
    }));
  };

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <button onClick={this.toggleTheme}>toggle theme</button>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

const ThemeConsumer = ThemeContext.Consumer;

const styles = {
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  light: {
    backgroundColor: "white",
    color: "black",
  },
};

class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <ThemeConsumer>
          {theme => <div style={styles[theme]}>{theme}</div>}
        </ThemeConsumer>
      </ThemeProvider>
    );
  }
}

export default App;
