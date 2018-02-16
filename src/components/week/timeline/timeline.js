import React, {Component} from 'react';
import './timeline.css';

class Timeline extends Component {
    constructor() {
        super();

        this.state = {
            from: 6,
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
                        return <div className='point'
                             style=
                             {
                                 {
                                    width: `${100 / (durationInHours)}%`
                                 }
                             }>
                            {from + (point)} {(from + point >= 12 ? "PM" : "AM")}
                        </div>
                    })
                }
            </div>
        );
    }
}

export default Timeline;
