import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import './timeline.css';

class Timeline extends Component {
    constructor() {
        super();

        this.state = {
            from: 7,
            durationInHours: 12
        };
    }

    render() {
        const {from, durationInHours} = this.state;

        let points = [];

        for (let p = 0; p < durationInHours; ++p) {
            points.push(p);
        }

        return (
            <div className='timeline'>
                {
                    points.map((point) => {
                        return <Paper
                            className="point"
                            key={`point-${point}`}
                            style={{
                                width: `${100 / (durationInHours)}%`
                            }}
                        >
                            {from + (point)} {(from + point >= 12 ? "PM" : "AM")}
                        </Paper>;
                    })
                }
            </div>
        );
    }
}

export default Timeline;
