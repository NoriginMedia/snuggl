import React, {Component} from 'react';
import Rnd from 'react-rnd';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import './entry.css';

const MINUTE_WIDTH = 2;
const DAY_LENGTH_MINUTES = 720;

class Entry extends Component {

    constructor(props) {
        super();

        const {entry, day} = props;

        this.state = {
            positionX: ((entry.startTime - day.startTime) / 60000) * MINUTE_WIDTH,
            width: ((entry.endTime - entry.startTime) / 60000) * MINUTE_WIDTH,
            widthDiff: 0
        };
    }

    positionToTime(position) {
        const {entry, day} = this.props;

        return day.startTime + ((position / MINUTE_WIDTH) * 60000);
    }

    onDragStop(e, drag) {
        const {x, y} = drag;
        const {resizeEntry, entry: {id}} = this.props;

        this.setState({
            positionX: x
        }, () => {
            resizeEntry(id, this.positionToTime(x), this.positionToTime(x + this.state.width));
        });
    }

    onResize(e, dir, refToElement, delta, position) {
        this.setState({
            widthDiff: delta.width,
            positionX: position.x
        });
    }

    onResizeStop(e, dir, refToElement, delta, position) {

        const {resizeEntry, entry: {id}} = this.props;

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

        return (
            <Rnd
                onDragStop={this.onDragStop.bind(this)}
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
                    <div>{entry.title}</div>
                    <div>{moment(entry.startTime).format('h:mm:ss')}</div>
                    <div>{moment(entry.endTime).format('h:mm:ss')}</div>
                </Paper>
            </Rnd>
        );
    }
}

export default Entry;
