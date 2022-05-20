import React, { Component, useEffect, useState } from 'react';
import { initialize, submit, getFormValues, getFormSyncErrors, change } from 'redux-form';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import FundingLevelTriggerTable from './components/triggerTable';
import { ADD_NEW_TRIGGER_FORM, DEFINE_TRIGGER_FORM, FLV_DATA_KEY, DEFINE_TRIGGERS_DATA_KEY } from './constants';

const { confirm } = Modal;

// class FundingLevelTriggersField extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             formData: {},
//             fLvlTriggers: [],
//             defineTriggers: {}
//         };
//     }

//     UNSAFE_componentWillReceiveProps = nextProps => {
//         const {
//             options: { tabKey = null },
//             dirtyFormValues = {}
//         } = nextProps;

//         const formData = tabKey ? dirtyFormValues[tabKey] : dirtyFormValues;

//         this.setState({ formData });

//         if (formData && Object.keys(formData).length > 0) {
//             const { [FLV_DATA_KEY]: fLvlTriggers = [], [DEFINE_TRIGGERS_DATA_KEY]: defineTriggers = {} } = formData;

//             const initialDefine = Object.keys(defineTriggers).length ? defineTriggers : {};

//             this.setState({ fLvlTriggers, defineTriggers, defineTriggersDraft: initialDefine });
//             if (Object.keys(defineTriggers).length) {
//                 const initializeData = Object.keys(defineTriggers).length ? defineTriggers : {};
//                 nextProps.defineTriggerFormInitialize(initializeData);
//             } else {
//                 nextProps.defineTriggerFormInitialize({});
//             }
//         }
//     };

//     triggerFormSubmit = () => {
//         this.props.triggerFormSubmit();
//     };

//     defineTriggerFormSubmit = () => {
//         this.props.defineTriggerFormSubmit();
//     };

//     onSubmit = formData => {
//         let { fLvlTriggers } = this.state;
//         const {
//             changeParentFormField,
//             options: { tabKey = null, formName }
//         } = this.props;

//         if (formData.id) {
//             //update
//             const trIndex = fLvlTriggers.findIndex(tr => tr.id === formData.id);
//             fLvlTriggers[trIndex] = formData;
//             this.setState({ fLvlTriggers });
//             changeParentFormField(formName, tabKey ? `${tabKey}.${FLV_DATA_KEY}` : FLV_DATA_KEY, fLvlTriggers);
//         } else {
//             //create
//             formData.id = new Date().getTime(); //no need to generate guid, this is more than enough unless you are a super computer
//             //that can generate multiple funding lvl triggers per millisecond
//             this.setState({ fLvlTriggers: [...fLvlTriggers, formData] });
//             changeParentFormField(formName, tabKey ? `${tabKey}.${FLV_DATA_KEY}` : FLV_DATA_KEY, [
//                 ...fLvlTriggers,
//                 formData
//             ]);
//         }
//     };

//     onDefineTriggersSave = data => {
//         this.setState({ defineTriggers: data });
//         const {
//             changeParentFormField,
//             options: { tabKey = null, formName }
//         } = this.props;
//         changeParentFormField(
//             formName,
//             tabKey ? `${tabKey}.${DEFINE_TRIGGERS_DATA_KEY}` : DEFINE_TRIGGERS_DATA_KEY,
//             data
//         );
//     };

//     deleteTrigger = triggerId => {
//         let { fLvlTriggers } = this.state;
//         const {
//             changeParentFormField,
//             options: { tabKey = null, formName }
//         } = this.props;
//         const { confirm } = Modal;
//         confirm({
//             title: 'Are you sure you want to delete this row?',
//             content: 'Data associated with this row will be deleted.',
//             onOk: () => {
//                 fLvlTriggers = fLvlTriggers.filter(tr => tr.id !== triggerId);
//                 this.setState({ fLvlTriggers });
//                 changeParentFormField(formName, tabKey ? `${tabKey}.${FLV_DATA_KEY}` : FLV_DATA_KEY, fLvlTriggers);
//             },
//             onCancel: () => {}
//         });
//     };

//     render() {
//         const { fLvlTriggers, defineTriggers } = this.state;
//         const {
//             options: { hasPermissionToManage = true },
//             disabled = false
//         } = this.props;

//         return (
//             <>
//                 <div className="root-form-wrapper">
//                     <div className="card card-wrapper">
//                         <FundingLevelTriggerTable
//                             triggerFormSubmit={this.triggerFormSubmit}
//                             defineTriggerFormSubmit={this.defineTriggerFormSubmit}
//                             onDefineTriggersSave={this.onDefineTriggersSave}
//                             onSubmit={this.onSubmit}
//                             flvTriggersData={fLvlTriggers}
//                             defineTriggersData={defineTriggers}
//                             deleteTrigger={this.deleteTrigger}
//                             hasClaim={hasPermissionToManage}
//                             completed={disabled}
//                         />
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }

const FundingLevelTriggersField = props => {
    const [formData, setFormData] = useState({});
    const [fLvlTriggers, setFLvlTriggers] = useState([]);
    const [defineTriggers, setDefineTriggers] = useState({});
    const [defineTriggersDraft, setDefineTriggersDraft] = useState();

    const {
        dirtyFormValues,
        options: { tabKey = null, hasPermissionToManage = true },
        disabled = false,
        defineTriggerFormInitialize
    } = props;

    useEffect(() => {
        if (Object.keys(defineTriggers).length) {
            const initializeData = Object.keys(defineTriggers).length ? defineTriggers : {};
            defineTriggerFormInitialize(initializeData);
        } else {
            defineTriggerFormInitialize({});
        }
    });

    useEffect(() => {
        let _formData = null;
        if (dirtyFormValues) _formData = tabKey ? dirtyFormValues[tabKey] : dirtyFormValues;

        if (_formData && Object.keys(_formData).length) {
            const { [FLV_DATA_KEY]: fLvlTriggers = [], [DEFINE_TRIGGERS_DATA_KEY]: defineTriggers = {} } = _formData;
            const initialDefine = Object.keys(defineTriggers).length ? defineTriggers : {};
            setFLvlTriggers(fLvlTriggers);
            setDefineTriggers(defineTriggers);
            setDefineTriggersDraft(initialDefine);
        }
        setFormData(_formData);
    }, [defineTriggerFormInitialize, dirtyFormValues, tabKey]);

    const triggerFormSubmit = () => {
        props.triggerFormSubmit();
    };

    const defineTriggerFormSubmit = () => {
        props.defineTriggerFormSubmit();
    };

    const onSubmit = formData => {
        const {
            changeParentFormField,
            options: { tabKey = null, formName }
        } = props;

        if (formData.id) {
            //update
            const trIndex = fLvlTriggers.findIndex(tr => tr.id === formData.id);
            fLvlTriggers[trIndex] = formData;
            setFLvlTriggers(fLvlTriggers);
            changeParentFormField(formName, tabKey ? `${tabKey}.${FLV_DATA_KEY}` : FLV_DATA_KEY, fLvlTriggers);
        } else {
            //create
            formData.id = new Date().getTime(); //no need to generate guid, this is more than enough unless you are a super computer
            //that can generate multiple funding lvl triggers per millisecond
            setFLvlTriggers([...fLvlTriggers, formData]);
            changeParentFormField(formName, tabKey ? `${tabKey}.${FLV_DATA_KEY}` : FLV_DATA_KEY, [
                ...fLvlTriggers,
                formData
            ]);
        }
    };

    const onDefineTriggersSave = data => {
        const {
            changeParentFormField,
            options: { tabKey = null, formName }
        } = props;
        changeParentFormField(
            formName,
            tabKey ? `${tabKey}.${DEFINE_TRIGGERS_DATA_KEY}` : DEFINE_TRIGGERS_DATA_KEY,
            data
        );
        setDefineTriggers(data);
    };

    const deleteTrigger = triggerId => {
        const {
            changeParentFormField,
            options: { tabKey = null, formName }
        } = props;

        confirm({
            title: 'Are you sure you want to delete this row?',
            content: 'Data associated with this row will be deleted.',
            onOk: () => {
                const _fLvlTriggers = fLvlTriggers.filter(tr => tr.id !== triggerId);
                setFLvlTriggers([..._fLvlTriggers]);
                changeParentFormField(formName, tabKey ? `${tabKey}.${FLV_DATA_KEY}` : FLV_DATA_KEY, _fLvlTriggers);
            },
            onCancel: () => {}
        });
    };

    return (
        <>
            <div className="root-form-wrapper">
                <div className="card card-wrapper">
                    <FundingLevelTriggerTable
                        triggerFormSubmit={triggerFormSubmit}
                        defineTriggerFormSubmit={defineTriggerFormSubmit}
                        onDefineTriggersSave={onDefineTriggersSave}
                        onSubmit={onSubmit}
                        flvTriggersData={fLvlTriggers}
                        defineTriggersData={defineTriggers}
                        deleteTrigger={deleteTrigger}
                        hasClaim={hasPermissionToManage}
                        completed={disabled}
                    />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        dirtyFormValues: getFormValues(ownProps.options.formName)(state),
        asyncErrors: getFormSyncErrors(ownProps.options.formName)(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        triggerFormSubmit: () => {
            dispatch(submit(ADD_NEW_TRIGGER_FORM));
        },
        defineTriggerFormSubmit: () => {
            dispatch(submit(DEFINE_TRIGGER_FORM));
        },
        defineTriggerFormInitialize: data => {
            dispatch(initialize(DEFINE_TRIGGER_FORM, data));
        },
        changeParentFormField: (formName, field, data) => {
            dispatch(change(formName, field, data));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FundingLevelTriggersField);
