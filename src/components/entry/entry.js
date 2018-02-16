import React, {Component} from 'react';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import './entry.css';

const MINUTE_WIDTH = 2;
const DAY_LENGTH_MINUTES = 720;

class Entry extends Component {
    render() {
        const {entry, day} = this.props;

        return (
            <Paper
                zDepth={1}
                className="entry"
                style={{
                    width: `${((entry.endTime - entry.startTime) / 60000) * MINUTE_WIDTH}px`,
                    left: `${((entry.startTime - day.startTime) / 60000) * MINUTE_WIDTH}px`
                }}
            >
                {entry.title}
            </Paper>
        );
    }
}

export default Entry;
