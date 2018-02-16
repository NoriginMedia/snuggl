import React, {Component} from 'react';
import Timeline from './timeline/timeline';
import Day from '../day/day';
import moment from 'moment';
import './week.css';

class Week extends Component {
    constructor() {
        super();

        const weekStart = moment().startOf('isoWeek');
        const weekEnd = moment().endOf('isoWeek');

        const days = [];

        for (let i = weekStart.valueOf(); i <= weekEnd.valueOf() - (86400000 * 2); i += 86400000) {
            days.push({
                title: moment(i).format('dddd'),
                startTime: moment(i).add(10, 'hours').valueOf(),
                endTime: moment(i + 86400000).subtract(4, 'hours').valueOf()
            });
        }

        this.state = {
            days
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
