import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TogglClient from 'toggl-api';
import moment from 'moment';
import Week from './components/week/week';
import './app.css';

const toggl = new TogglClient({apiToken: '5fcce5b0843d0aea1d21c13b98077550'});

class App extends Component {
    constructor() {
        super();

        this.state = {
            entries: []
        };
    }
    componentWillMount() {
        const entries = [];

        toggl.getTimeEntries(moment(1517810400000).format(), moment(1518199200000).format(), (error, timeEntries) => {
            for (const entry of timeEntries) {
                entries.push({
                    title: entry.description,
                    startTime: moment(entry.start).valueOf(),
                    endTime: moment(entry.stop).valueOf(),
                    id: entry.id
                });
            }

            this.setState({
                entries
            });
        })


    }

    resizeEntry(id, startTime, endTime) {
        const entryIndex = this.state.entries.findIndex((e) => {
            return e.id === id;
        });

        const entries = this.state.entries.slice();

        entries[entryIndex] = {
            ...entries[entryIndex],
            startTime,
            endTime
        };

        this.setState({
            entries
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="snuggl-app">
                     <Week
                        entries={this.state.entries}
                        resizeEntry={this.resizeEntry.bind(this)}
                     />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
