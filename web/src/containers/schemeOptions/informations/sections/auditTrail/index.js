import React, { Component } from 'react';
import { Col, Row, Empty, Spin } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Moment from 'helpers/Moment';

import { store_schemeData } from '../../../selector';
import { audit_trail_data_inProgress, audit_trail_data } from './selector';
import { doRequestAuditTrail } from './action';
import { getPrimaryRole } from '../../../../../helpers/validateUser';

const dateToday = new Date();
const dateAMonthAgo = new Date(dateToday.setDate(dateToday.getDate() - 30));

class AuditTrailView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: dateAMonthAgo,
            startDateMilisecond: dateAMonthAgo.getTime(),
            endDate: new Date(),
            endDateMilisecond: new Date().getTime(),
            audit_trail_data: null
        };

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.getLogs = this.getLogs.bind(this);
    }

    componentDidMount() {
        this.getLogs();
    }

    // componentWillUnmount() {
    //   let { audit_trail_data } = this.props;
    //   if(audit_trail_data) audit_trail_data = [];
    // }

    getLogs() {
        const {
            store_schemeData: { schemeId },
            doRequestAuditTrail,
            loggedUser: { email },
            loggedUser
        } = this.props;
        const { startDate, endDate } = this.state; //startDateMilisecond, endDateMilisecond,

        let atStartDate = moment(startDate).format('YYYY-MM-DD') + ' 00:00:00';
        atStartDate = moment(atStartDate, 'YYYY-MM-DD HH:mm:ss')
            .toDate()
            .getTime();

        let atEndDate = moment(endDate).format('YYYY-MM-DD') + ' 23:59:59';
        atEndDate = moment(atEndDate, 'YYYY-MM-DD HH:mm:ss')
            .toDate()
            .getTime();

        doRequestAuditTrail({
            email,
            schemeId,
            primaryRole: getPrimaryRole(loggedUser),
            start: atStartDate,
            end: atEndDate
        });
    }

    handleChangeStart(event) {
        if (!event) return;

        this.setState({ startDate: event, startDateMilisecond: event.getTime() }, () => {
            this.getLogs();
        });
    }

    handleChangeEnd(event) {
        if (!event) return;

        this.setState({ endDate: event, endDateMilisecond: event.getTime() }, () => {
            this.getLogs();
        });
    }

    render() {
        let { audit_trail_data, audit_trail_data_inProgress } = this.props;
        const { endDate, startDate } = this.state;
        audit_trail_data =
            audit_trail_data &&
            audit_trail_data.length &&
            audit_trail_data.sort(function(a, b) {
                var c = new Date(a.dateTime);
                var d = new Date(b.dateTime);
                return d - c;
            });

        return (
            <div>
                <div className="audit-trial-select">
                    <Row>
                        <Col xl={10} lg={12} xs={24} className="input-wrapper">
                            <span className="range-picker-container">
                                <label>Start Date</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={this.handleChangeStart}
                                    placeholderText="Start date"
                                    className="daterange-picker"
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={endDate}
                                />
                            </span>
                        </Col>
                        <Col xl={10} lg={12} xs={24} className="input-wrapper">
                            <span className="range-picker-container">
                                <label>End Date</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={this.handleChangeEnd}
                                    placeholderText="End date"
                                    className="daterange-picker"
                                    dateFormat="dd/MM/yyyy"
                                    minDate={startDate}
                                    maxDate={new Date()}
                                />
                            </span>
                        </Col>
                        <Col xl={4} lg={12} xs={24} className="input-wrapper"></Col>
                    </Row>
                </div>
                <div className="audit-trial-view">
                    <div className="text-center">{audit_trail_data_inProgress && <Spin />}</div>
                    {audit_trail_data && audit_trail_data.length ? (
                        audit_trail_data.map((item, index) => {
                            return (
                                <div className="audit-trial-record" key={index}>
                                    <Row>
                                        <Col xl={20} xs={24} sm={20} className="audit-trial-content">
                                            {item.content}
                                        </Col>
                                        <Col className="audit-trial-date" xl={4} xs={24} sm={4}>
                                            <span>
                                                {moment(item.dateTime).format(
                                                    'Do MMM YYYY h:mm:ss a'
                                                )}
                                            </span>
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })
                    ) : (
                        <Empty />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    store_schemeData: store_schemeData(),

    audit_trail_data_inProgress: audit_trail_data_inProgress(),
    audit_trail_data: audit_trail_data()
});

const mapDispatchToProps = dispatch => ({
    doRequestAuditTrail: payload => {
        dispatch(doRequestAuditTrail(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuditTrailView);
