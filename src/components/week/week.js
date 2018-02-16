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
                    startTime: 1518415200000,
                    endTime: 1518458400000
                },
                {
                    title: "Tuesday",
                    startTime: 1518501600000,
                    endTime: 1518544800000
                },
                {
                    title: "Wednesday",
                    startTime: 1518588000000,
                    endTime: 1518631200000
                },
                {
                    title: "Thursday",
                    startTime: 1518674400000,
                    endTime: 1518717600000
                },
                {
                    title: "Friday",
                    startTime: 1518760800000,
                    endTime: 1518804000000
                }
            ],
            entries: [
                {
                    title: "OSP - Task 132",
                    startTime: 1518763458000,
                    endTime: 1518774258000,
                    id: 134245345,
                },
                {
                    title: "OSP - Task 909",
                    startTime: 1518534840000,
                    endTime: 1518538740000,
                    id: 989898,
                },
                {
                    title: "OSP - Task 909",
                    startTime: 1518526800000,
                    endTime: 1518534780000,
                    id: 989898,
                },
            ]
        };
    }

    render() {
        const {days, entries} = this.state;

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
                    />;
                })}
            </div>
        );
    }
}

export default Week;
