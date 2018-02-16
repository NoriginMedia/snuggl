import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TogglClient from 'toggl-api';
import moment from 'moment';
import Week from './components/week/week';
import './app.css';

const toggl = new TogglClient({apiToken: '1c97b9df85cc13fc60a5627cab1572a7'});

class App extends Component {
    constructor() {
        super();

        this.state = {
            entries: []
        };
    }
    componentWillMount() {
        const entries = [];

        toggl.getTimeEntries(moment().startOf('isoWeek').format(), moment().endOf('isoWeek').format(), (error, timeEntries) => {

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

        this.updateTogglEntry(
            id,
            {
                start: moment(startTime).format(),
                stop: moment(endTime).format()
            }
        );
    }

    updateTogglEntry(id, data) {
        toggl.updateTimeEntry(id, data, () => {
            console.log("callback");
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
