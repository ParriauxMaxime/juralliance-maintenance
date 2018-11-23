import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './utils/theme';
import Base from './screen/Base';
import store from './utils/store';

class App extends PureComponent {
  render() {
    const { classes, children } = this.props;
    const short = 'Un essai';
    const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat impedit neque eos, et consequatur recusandae, cupiditate error voluptas fugit quisquam sed consectetur autem atque cum reprehenderit cumque quia exercitationem maxime.';
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Base>
            { children }
            <div>
              {short}
              {lorem}

            </div>
          </Base>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
