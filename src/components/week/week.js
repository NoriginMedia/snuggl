import React, {Component} from 'react';
import Timeline from './timeline/timeline';
import Day from '../day/day';
import moment from 'moment';
import './week.css';

class Week extends Component {
    constructor() {
        super();

        this.state = {
            days: [
                {
                    title: "Monday",
                    startTime: 1517810400000,
                    endTime: 1517853600000
                },
                {
                    title: "Tuesday",
                    startTime: 1517896800000,
                    endTime: 1517940000000
                },
                {
                    title: "Wednesday",
                    startTime: 1517983200000,
                    endTime: 1518026400000
                },
                {
                    title: "Thursday",
                    startTime: 1518069600000,
                    endTime: 1518112800000
                },
                {
                    title: "Friday",
                    startTime: 1518156000000,
                    endTime: 1518199200000
                }
            ]
        };
    }

    render() {
        const {days} = this.state;
        const {entries, resizeEntry} = this.props;

        return (
            <div className="week">
                <Timeline/>

                {days.map((day) => {
                    return <Day
                        key={`day-${day.title}`}
                        day={day}
                        entries={entries.filter((entry) => {
                            return moment(entry.startTime).format('dddd') === day.title || moment(entry.endTime).format('dddd') === day.title;
                        })}
                        resizeEntry={resizeEntry}
                    />;
                })}
            </div>
        );
    }
}

export default Week;
