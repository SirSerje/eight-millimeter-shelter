import React from "react";

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
      <div>
        <b>asdasd</b>
        <ThemeContext.Provider value={this.state.theme}>
          <button onClick={this.toggleTheme}>toggle theme</button>
          {this.props.children}
        </ThemeContext.Provider>
      </div>
    );
  }
}

function ContainerComponent() {
  return (<ThemeContext.Consumer>
    {theme =>
      <div style={styles[theme]}>
        <b>some bolded text</b>
      </div>
    }
  </ThemeContext.Consumer>);
}

function AnotherContainerComponent() {
  return (<ThemeContext.Consumer>
    {theme =>
      <div style={styles[theme]}>
        {theme}
      </div>
    }
  </ThemeContext.Consumer>);
}

const NonContainedComponent = () => <AnotherContainerComponent/>;

class App extends React.Component {
  render() {
    return (
      <ThemeProvider>

        <ContainerComponent/>

        <AnotherContainerComponent/>

        <NonContainedComponent/>
      </ThemeProvider>
    );
  }
}

export default App;
