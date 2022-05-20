import React, { Component } from 'react';
import { initialize } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button, Modal } from 'antd';
import AddTriggerModal from '../modals/addTriggerModal';
import DefineTriggersModal from '../modals/defineTrigersModel';
import { ADD_NEW_TRIGGER_FORM } from '../constants';
import { isEmpty } from 'lodash';

class FundingLevelTriggerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewTriggerModalVisible: false,
            isDefineTriggerModalVisible: false,
            updateMode: false
        };
    }

    toggleTriggerModal = status => {
        this.setState({
            isNewTriggerModalVisible: status
        });
    };

    toggleDefineTriggerModal = status => {
        this.setState({
            isDefineTriggerModalVisible: status
        });
    };

    enableUpdateMode = record => {
        this.setState({ updateMode: true });
        this.toggleTriggerModal(true);
        this.props.setFormData(record);
    };

    prepareToCreateNewTrigger = () => {
        let { flvTriggersData } = this.props;
        if (flvTriggersData.length >= 20) {
            Modal.warn({
                title: 'limit of 20 reached',
                content: 'Maximum of 20 records are allowed.'
            });
            return;
        }
        this.setState({ updateMode: false });
        this.props.resetFormData();
        this.toggleTriggerModal(true);
    };

    prepareToDefineTriggers = () => {
        this.props.resetFormData();
        this.toggleDefineTriggerModal(true);
    };

    render() {
        let { isNewTriggerModalVisible, isDefineTriggerModalVisible } = this.state;
        let {
            triggerFormSubmit,
            onSubmit,
            flvTriggersData,
            defineTriggersData,
            completed,
            onDefineTriggersSave,
            defineTriggerFormSubmit,
            hasClaim = true
        } = this.props;

        const columns = [
            {
                title: 'Date',
                dataIndex: 'journeyPlanDate',
                key: 'journeyPlanDate',
                className: 'date-column',
                render: value => {
                    return <span className="text-grey">{moment(value).format('DD/MM/YYYY')}</span>;
                }
            },
            {
                title: () => <div> Journey plan</div>,
                dataIndex: 'journeyPlanFundingLvl',
                key: 'journeyPlanFundingLvl',
                render: value => {
                    return <span>{value ? `${value}%` : '-'}</span>;
                }
            },
            {
                title: () => <div> Upside trigger 1</div>,
                dataIndex: 'upperTriggerFundingLvl1',
                key: 'upperTriggerFundingLvl1',
                render: value => {
                    return <span>{value ? `${value}%` : '-'}</span>;
                }
            },
            {
                title: () => <div> Upside trigger 2</div>,
                dataIndex: 'upperTriggerFundingLvl2',
                key: 'upperTriggerFundingLvl2',
                render: value => {
                    return <span>{value ? `${value}%` : '-'}</span>;
                }
            },
            {
                title: () => <div> Downside trigger</div>,
                dataIndex: 'lowerTriggerFundingLvl',
                key: 'lowerTriggerFundingLvl',
                render: value => {
                    return <span>{value ? `${value}%` : '-'}</span>;
                }
            },
            ...(!completed
                ? [
                      {
                          title: '',
                          dataIndex: 'action',
                          key: 'actionDelete',
                          render: (text, record) => (
                              <label
                                  onClick={() => {
                                      this.props.deleteTrigger(record.id);
                                  }}
                                  className="delete-text cursor-pointer"
                              >
                                  {hasClaim ? 'Delete' : ''}
                              </label>
                          )
                      }
                  ]
                : [])
        ];

        const sortedTriggers = flvTriggersData.sort((a, b) => moment(a.journeyPlanDate) - moment(b.journeyPlanDate));

        return (
            <div className="container">
                <div className="status-table">
                    <div className="client-table funding-trigger-table">
                        <Table
                            dataSource={sortedTriggers}
                            columns={columns}
                            pagination={false}
                            ellipsis={true}
                            className="funding-trigger-table"
                            title={() =>
                                hasClaim && !completed ? (
                                    <>
                                        <Button
                                            onClick={this.prepareToDefineTriggers}
                                            className="btn btn-blue-o add-deficit-contributor regular btn-add-more cursor-pointer"
                                            style={{ 'margin-right': 10 }}
                                            disabled={flvTriggersData.length > 0}
                                        >
                                            Define Triggers
                                        </Button>
                                        <Button
                                            onClick={this.prepareToCreateNewTrigger}
                                            className="btn btn-blue-o add-deficit-contributor regular btn-add-more cursor-pointer"
                                            //icon="plus"
                                            disabled={
                                                !isEmpty(flvTriggersData) && isEmpty(defineTriggersData)
                                                    ? false
                                                    : !isEmpty(flvTriggersData) && !isEmpty(defineTriggersData)
                                                    ? false
                                                    : isEmpty(flvTriggersData) && !isEmpty(defineTriggersData)
                                                    ? false
                                                    : isEmpty(flvTriggersData) && isEmpty(defineTriggersData)
                                                    ? true
                                                    : true
                                            }
                                        >
                                            + Add More
                                        </Button>
                                    </>
                                ) : null
                            }
                        />
                        <AddTriggerModal
                            show={isNewTriggerModalVisible}
                            handleCancel={() => this.toggleTriggerModal(false)}
                            triggerFormSubmit={triggerFormSubmit}
                            defineTriggersData={defineTriggersData}
                            onSubmit={formData => {
                                onSubmit(formData);
                                this.toggleTriggerModal(false);
                            }}
                            updateMode={this.state.updateMode}
                        />
                        <DefineTriggersModal
                            show={isDefineTriggerModalVisible}
                            handleCancel={() => this.toggleDefineTriggerModal(false)}
                            defineTriggerFormSubmit={defineTriggerFormSubmit}
                            onSubmit={formData => {
                                onDefineTriggersSave(formData);
                                this.toggleDefineTriggerModal(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFormData: data => {
            dispatch(initialize(ADD_NEW_TRIGGER_FORM, data));
        },
        resetFormData: () => {
            dispatch(initialize(ADD_NEW_TRIGGER_FORM), {});
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(FundingLevelTriggerTable);
