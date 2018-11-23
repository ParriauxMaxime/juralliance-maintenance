import { createMuiTheme } from '@material-ui/core';
import lime from '@material-ui/core/colors/lime';
import yellow from '@material-ui/core/colors/yellow';

export default createMuiTheme({
  palette: {
    primary: lime,
    secondary: yellow,
  },
  typography: {
    useNextVariants: true,
  },
});
