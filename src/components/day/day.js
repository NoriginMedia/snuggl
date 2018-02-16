import React, {Component} from 'react';
import Entry from '../entry/entry';
import './day.css';

class Day extends Component {
    render() {
        const {day, entries, width} = this.props;

        return (
            <div className="day">
                <div className="day-title">{day.title}</div>
                <div
                    className="entries"
                    style={{
                        width
                    }}
                >
                    {entries.map((entry) => {
                        return <Entry
                            key={`entry-${entry.id}`}
                            entry={entry}
                            day={day}
                        />;
                    })}
                </div>
            </div>
        );
    }
}

export default Day;
