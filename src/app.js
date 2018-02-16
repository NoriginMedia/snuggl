import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Week from './components/week/week';
import './app.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="snuggl-app">
                     <Week/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
