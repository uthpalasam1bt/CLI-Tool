import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { history } from 'store';
import { range } from 'lodash';

import { getChartList } from '../../actions';
import { updateChartList } from './actions';
import { Motion, spring } from 'react-motion';
import { CHART_IMG_MAP } from '../../constants';

const springSetting1 = { stiffness: 180, damping: 10 };
const springSetting2 = { stiffness: 120, damping: 17 };
const chartPositionArray = [0, 1, 4, 5, 2, 3, 6, 7, 8, 9, 12, 13, 10, 11, 14, 15];

function reinsert(arr, from, to) {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
}

function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
}

const [count, width, height] = [16, 276, 160];
// indexed by visual position
const layout = range(count).map(n => {
    const row = Math.floor(n / 4);
    const col = n % 4;
    return [width * col, height * row];
});

export default class Rearrange extends Component {
    static defaultProps = {
        chartIds: []
    };

    state = {
        mouseXY: [0, 0],
        mouseCircleDelta: [0, 0], // difference between mouse and circle pos for x + y coords, for dragging
        lastPress: null, // key of the last pressed component
        isPressed: false,
        order: range(count) // index: visual position. value: component key/id
    };

    componentDidMount() {
        const {
            match: { params },
            loggedUser: { email }
        } = this.props;
        this.props.getChartList({ schemeId: params.schemeId, userEmail: email });
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleTouchStart = (key, pressLocation, e) => {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    };

    handleTouchMove = e => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    };

    handleMouseMove = ({ pageX, pageY }) => {
        const {
            order,
            lastPress,
            isPressed,
            mouseCircleDelta: [dx, dy]
        } = this.state;
        if (isPressed) {
            const mouseXY = [pageX - dx, pageY - dy];
            const col = clamp(Math.floor(mouseXY[0] / width), 0, 3);
            const row = clamp(Math.floor(mouseXY[1] / height), 0, Math.floor(count / 4));
            const index = row * 4 + col;
            const newOrder = reinsert(order, order.indexOf(lastPress), index);
            this.setState({ mouseXY, order: newOrder });
        }
    };

    handleMouseDown = (key, [pressX, pressY], { pageX, pageY }) => {
        this.setState({
            lastPress: key,
            isPressed: true,
            mouseCircleDelta: [pageX - pressX, pageY - pressY],
            mouseXY: [pressX, pressY]
        });
    };

    handleMouseUp = () => {
        const {
            match: { params },
            loggedUser: { email },
            chartIds,
            chartById,
            preLiabilityFlag
        } = this.props;
        this.setState({ isPressed: false, mouseCircleDelta: [0, 0] }, () => {
            const chartArray = [];
            if (chartById && chartIds && chartIds.length) {
                const newOderFromReArrangeViewPositionIndexes = this.state.order;

                newOderFromReArrangeViewPositionIndexes.map((position, index) => {
                    const actualChartInPosition = chartPositionArray[position];
                    const actualNewPosition = chartPositionArray[index];
                    const movedChart = chartIds[actualChartInPosition];
                    chartArray[actualNewPosition] = chartById[movedChart];
                });
                this.props.updateChartList(this.state.order, params.schemeId, email, chartArray, preLiabilityFlag);
            }
        });
    };

    render() {
        const { order, lastPress, isPressed, mouseXY } = this.state;
        const { chartIds, chartById } = this.props;

        //rearange view oder
        const newChartIds = chartPositionArray.map(i => {
            return chartIds[i];
        });

        return (
            <>
                <section className="active-scheme-options">
                    <div className="header clearfix">
                        <div className="container">
                            <div className="div-back">
                                <span className="back-text" onClick={() => history.goBack()}>
                                    <i className="fa fa-chevron-left icon"></i>Back
                                </span>
                                <span className="user-name">Rearrange</span>
                            </div>
                        </div>
                    </div>
                    <div className="content clearfix">
                        <div className="container">
                            <section className="active-dashboard-section">
                                <Row gutter={30}>
                                    <Col lg={24} md={24} xs={24}>
                                        <div className="card dashboard-card dashboard-card-list">
                                            <div>
                                                {newChartIds &&
                                                    newChartIds.length &&
                                                    newChartIds.map((item, key) => {
                                                        let style;
                                                        let x;
                                                        let y;
                                                        const visualPosition = order.indexOf(key);
                                                        if (key === lastPress && isPressed) {
                                                            [x, y] = mouseXY;
                                                            style = {
                                                                translateX: x,
                                                                translateY: y,
                                                                scale: spring(1.2, springSetting1)
                                                            };
                                                        } else {
                                                            [x, y] = layout[visualPosition];
                                                            style = {
                                                                translateX: spring(x, springSetting2),
                                                                translateY: spring(y, springSetting2),
                                                                scale: spring(1, springSetting1)
                                                            };
                                                        }
                                                        return (
                                                            <Motion key={key} style={style}>
                                                                {({ translateX, translateY, scale, boxShadow }) => (
                                                                    <div
                                                                        className="chart-box"
                                                                        style={{
                                                                            WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                                                            transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                                                            zIndex:
                                                                                key === lastPress ? 99 : visualPosition,
                                                                            boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`
                                                                        }}
                                                                    >
                                                                        <div className="card custom-dashboard-card">
                                                                            <div className="custom-graph-container">
                                                                                <img
                                                                                    src={
                                                                                        chartById[item] &&
                                                                                        chartById[item].show
                                                                                            ? CHART_IMG_MAP[item]
                                                                                            : CHART_IMG_MAP[
                                                                                                  'developmentProgress'
                                                                                              ]
                                                                                    }
                                                                                    alt="chart"
                                                                                    className="img img-fluid"
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                onMouseDown={
                                                                                    chartById[item] &&
                                                                                    chartById[item].show
                                                                                        ? this.handleMouseDown.bind(
                                                                                              null,
                                                                                              key,
                                                                                              [x, y]
                                                                                          )
                                                                                        : null
                                                                                }
                                                                                onTouchStart={
                                                                                    chartById[item] &&
                                                                                    chartById[item].show
                                                                                        ? this.handleTouchStart.bind(
                                                                                              null,
                                                                                              key,
                                                                                              [x, y]
                                                                                          )
                                                                                        : null
                                                                                }
                                                                                className="img-footer"
                                                                            >
                                                                                <span className="icon">
                                                                                    <i className="fa fa-ellipsis-v"></i>
                                                                                    <i className="fa fa-ellipsis-v"></i>
                                                                                </span>
                                                                                <span className="title">
                                                                                    {chartById[item] &&
                                                                                    chartById[item].title
                                                                                        ? chartById[item].title
                                                                                        : null}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Motion>
                                                        );
                                                    })}
                                            </div>
                                            <div class="abs top-left"></div>
                                            <div class="abs top-right"></div>
                                            <div class="abs bottom-left"></div>
                                            <div class="abs bottom-right"></div>
                                        </div>
                                    </Col>
                                </Row>
                            </section>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        chartById: state.dashboardRearrangeReducer.chartListById,
        chartIds: state.dashboardRearrangeReducer.visibleChartIds,
        preLiabilityFlag: state.dashboardRearrangeReducer.preLiabilityFlag
    };
};
export const RearrangeContainer = connect(
    mapStateToProps,
    { getChartList, updateChartList }
)(Rearrange);
