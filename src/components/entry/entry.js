import React, {Component} from 'react';
import Rnd from 'react-rnd';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import './entry.css';

let MINUTE_WIDTH = ((window.innerWidth - window.innerWidth / 10) / 720);

class Entry extends Component {

    constructor(props) {
        super();

        const {entry, day} = props;

        this.state = {
            positionX: ((entry.startTime - day.startTime) / 60000) * MINUTE_WIDTH,
            width: ((entry.endTime - entry.startTime) / 60000) * MINUTE_WIDTH,
            widthDiff: 0
        };

        window.addEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        MINUTE_WIDTH = ((window.innerWidth - window.innerWidth / 10) / 720);
    }

    positionToTime(position) {
        const {day} = this.props;

        return Math.round(day.startTime + ((position / MINUTE_WIDTH) * 60000));
    }

    onDragStop(e, drag) {
        const {x} = drag;
        const {resizeEntry, entry: {id}} = this.props;

        this.setState({
            positionX: x
        }, () => {
            resizeEntry(id, this.positionToTime(x), this.positionToTime(x + this.state.width));
        });
    }

    onDrag(e, drag) {
        const {x} = drag;

        this.setState({
            positionX: x
        });
    }

    onResize(e, dir, refToElement, delta, position) {
        this.setState({
            widthDiff: delta.width,
            positionX: position.x
        });
    }

    onResizeStop(e, dir, refToElement, delta, position) {
        const {resizeEntry, entry: {id, endTime}} = this.props;

        this.setState({
            width: this.state.width + delta.width,
            widthDiff: 0,
            positionX: position.x
        }, () => {
            resizeEntry(id, this.positionToTime(position.x), this.positionToTime(position.x + this.state.width));
        });
    }

    render() {
        const {entry} = this.props;
        const {positionX, width, widthDiff} = this.state;

        const startTime = this.positionToTime(positionX);
        const endTime = this.positionToTime(positionX + width + widthDiff);

        return (
            <Rnd
                onDragStop={this.onDragStop.bind(this)}
                onDrag={this.onDrag.bind(this)}
                onResize={this.onResize.bind(this)}
                onResizeStop={this.onResizeStop.bind(this)}
                dragAxis="x"
                position={{x: positionX, y: 0}}
                size={{
                    width: `${width + widthDiff}px`,
                    height: 80
                }}
                style={{
                    zIndex: entry.startTime / 1000
                }}
                enableResizing={{ top: false, right: true, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
                bounds="parent"
            >
                <Paper
                    zDepth={1}
                    className="entry"
                    style={{
                        width: `${width + widthDiff}px`
                    }}
                >
                    <div className='entry-title'>{entry.title}</div>
                    <div className='entry-times'>
                        <div className='entry-startTime'>{moment(startTime).format('h:mm a')}</div>
                        <div className='entry-endTime'>{moment(endTime).format('h:mm a')}</div>
                    </div>
                </Paper>
            </Rnd>
        );
    }
}

export default Entry;
