import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import './timeline.css';

class Timeline extends Component {
    constructor() {
        super();

        this.state = {
            from: 10,
            durationInHours: 8
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
                            {from + (point)} {(from + point >= 12 ? "pm" : "am")}
                        </Paper>;
                    })
                }
            </div>
        );
    }
}

export default Timeline;
