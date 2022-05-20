import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { Row, Col, Tooltip, Button, Divider } from 'antd';

import { FormField, CheckboxField, FileDownloader } from '../fields';
import { convertArtifacts } from '../../../helpers/ArtifactConverter';

export const FullContainer = ({
    label,
    field,
    rawComponents,
    blockComponent,
    disabled,
    iIcon,
    classN,
    hide,
    artifacts
}) => {
    const className =
        field && field.generate ? 'pull-right' : `input-wrapper ${blockComponent ? 'block-input' : ''} ${classN}`;

    return (
        <Row className={hide ? 'hide-ele' : 'input-row'}>
            <Col xl={15} lg={12} xs={24} className="label-wrapper">
                {typeof label === 'object' ? (
                    <label {...label.props} className={`input-title ${label.props.className}`}>
                        {convertArtifacts(label.value, artifacts)}{' '}
                        {iIcon ? (
                            <Tooltip placement="top" title={iIcon}>
                                <span className="i-icon">
                                    <i className="fa fa-info-circle"></i>
                                </span>
                            </Tooltip>
                        ) : null}
                    </label>
                ) : (
                    <label className="input-title">
                        {convertArtifacts(label, artifacts)}

                        {iIcon ? (
                            <Tooltip placement="top" title={iIcon}>
                                <span className="i-icon">
                                    <i className="fa fa-info-circle"></i>
                                </span>
                            </Tooltip>
                        ) : null}
                    </label>
                )}
            </Col>
            <Col xl={9} lg={12} xs={24} className={className}>
                {rawComponents ? (
                    <> {rawComponents} </>
                ) : Array.isArray(field) ? (
                    <div className="fields-holder">
                        {field.map((f, fKey) => (
                            <FormField
                                {...f}
                                disabled={typeof disabled !== 'undefined' ? disabled : f.disabled}
                                key={fKey}
                            />
                        ))}
                    </div>
                ) : field && field.generate ? (
                    <div className="buttons-holder">
                        <FormField {...field} disabled={typeof disabled !== 'undefined' ? disabled : field.disabled} />
                        <button
                            className="btn btn-generate"
                            disabled={field.generateoptions ? field.generateoptions.disabled : true}
                        >
                            <i className="fa fa-cog icon" /> Generate
                        </button>
                    </div>
                ) : field ? (
                    <FormField {...field} disabled={typeof disabled !== 'undefined' ? disabled : field.disabled} />
                ) : null}
            </Col>
        </Row>
    );
};

export const HalfContainer = ({ childComponents, disabled, artifacts }) => {
    return (
        <Row gutter={20}>
            {childComponents.map((data, key) => (
                <Col xl={12} lg={12} xs={24} key={key}>
                    <Row className="input-row">
                        <Col xl={12} lg={12} xs={24} className="label-wrapper">
                            {typeof data.label === 'object' ? (
                                <label {...data.label.props} className={`input-title ${data.label.props.className}`}>
                                    {convertArtifacts(data.label.text, artifacts)}
                                </label>
                            ) : (
                                <label className="input-title"> {convertArtifacts(data.label, artifacts)}</label>
                            )}
                        </Col>
                        <Col xl={12} lg={12} xs={24} className="input-wrapper">
                            <FormField
                                {...data.field}
                                disabled={typeof disabled !== 'undefined' ? disabled : data.field.disabled}
                            />
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
    );
};

export const FullViewContainer = ({ field, rawComponents, disabled, classN, hide }) => {
    return (
        <Row className="input-row">
            {rawComponents ? (
                <> {rawComponents} </>
            ) : Array.isArray(field) ? (
                <div className="fields-holder">
                    {field.map((f, fKey) => (
                        <FormField
                            {...f}
                            disabled={typeof disabled !== 'undefined' ? disabled : f.disabled}
                            key={fKey}
                        />
                    ))}
                </div>
            ) : field ? (
                <FormField {...field} disabled={typeof disabled !== 'undefined' ? disabled : field.disabled} />
            ) : null}
        </Row>
    );
};

export const PublishCheckbox = ({
    name,
    label,
    resourceName,
    resourceUrl,
    props,
    disabled,
    bucketName,
    api,
    artifacts,
    ...rest
}) => {
    return (
        <Row className="input-row checkbox-row">
            <Col xl={14} lg={12} sm={12} xs={24} className="label-wrapper">
                <label className="input-title">{convertArtifacts(label, artifacts)}</label>
                <Field
                    name={name}
                    component={CheckboxField}
                    {...props}
                    disabled={disabled === undefined ? props.disabled : disabled}
                    {...rest}
                />
            </Col>
            <Col xl={10} lg={12} sm={12} xs={24} className="pull-right">
                {resourceUrl && (
                    <div className="resource-wrapper">
                        <FileDownloader
                            type="resource"
                            fileName={convertArtifacts(resourceName, artifacts)}
                            url={resourceUrl}
                            bucketNameProp={bucketName}
                            api={api}
                        />
                    </div>
                )}
            </Col>
        </Row>
    );
};

export class AddMoreContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repeatTimes: props.element.repeatTimes,
            lastKnownRepeatTimes: 0,
            showArrayFields: true,
            maxLimit: props.element.maxLimit,
            intentionalAdd: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.element.repeatTimes && prevState.repeatTimes !== nextProps.element.repeatTimes) {
            return {
                repeatTimes: nextProps.element.repeatTimes,
                showArrayFields: false
            };
        }
        if (!isNaN(nextProps.element.maxLimit) && nextProps.element.maxLimit !== prevState.maxLimit) {
            return {
                showArrayFields: false,
                maxLimit: nextProps.element.maxLimit
            };
        }
        return null;
    }

    renderRepeatingElements = ({ fields, meta: { error, submitFailed } }) => {
        const {
            repeatingComponent,
            showRemoveButton,
            addMoreButtonVisible,
            addMoreButtonText,
            border,
            // repeatTimes,
            divider,
            completed
        } = this.props.element;

        const { maxLimit } = this.state;

        if (
            this.state.repeatTimes &&
            this.state.repeatTimes !== this.state.lastKnownRepeatTimes &&
            fields.length !== this.state.repeatTimes &&
            !this.state.intentionalAdd
        ) {
            this.setState(
                {
                    lastKnownRepeatTimes: this.state.repeatTimes
                },
                () => {
                    if (fields.getAll() == null) {
                        fields.removeAll();
                        new Array(this.state.repeatTimes).fill(-1).forEach(() => {
                            fields.push({});
                        });
                    } else {
                        if (this.state.repeatTimes > fields.getAll().length) {
                            //need to add more
                            new Array(this.state.repeatTimes - fields.getAll().length).fill(-1).forEach(() => {
                                fields.push({});
                            });
                        } else {
                            new Array(fields.getAll().length - this.state.repeatTimes).fill(-1).forEach(() => {
                                fields.pop();
                            });
                        }
                    }
                }
            );
        }
        if (this.state.intentionalAdd) this.setState({ intentionalAdd: false });
        return (
            <>
                <div>
                    {fields &&
                        fields.map((prefix, i) => {
                            if (i + 1 > maxLimit && this.props.autoPruneOnHittingMaxLimit) fields.remove(i);
                            return (
                                <div key={i}>
                                    <div className={border ? 'border rounded p-3 mt-2 mb-4' : ''}>
                                        {showRemoveButton && (
                                            <Row className="input-row">
                                                {fields && !completed && (
                                                    <div className="add-manager-wrapper">
                                                        <i
                                                            className="fa fa-times icon"
                                                            onClick={() => {
                                                                fields.remove(i);
                                                            }}
                                                        ></i>
                                                        {/* <ExitIcon /> */}
                                                    </div>
                                                )}
                                            </Row>
                                        )}

                                        {repeatingComponent(prefix, i)}
                                    </div>
                                    {divider && !border && <Divider />}
                                </div>
                            );
                        })}
                </div>
                <Row>
                    {addMoreButtonVisible && fields && fields.length < maxLimit ? (
                        <Button
                            // type="dashed"
                            className="mt-4 pull-right btn btn-blue-o add-deficit-contributor regular btn-add-more cursor-pointer"
                            onClick={() => {
                                this.setState(
                                    {
                                        intentionalAdd: true
                                    },
                                    () => {
                                        fields.push({});
                                    }
                                );
                            }}
                        >
                            {addMoreButtonText ? addMoreButtonText : ''}
                        </Button>
                    ) : null}
                </Row>
            </>
        );
    };

    render() {
        const { name, title } = this.props.element;
        const { artifacts } = this.props;
        if (!this.state.showArrayFields) this.setState({ showArrayFields: true });

        return (
            <div className="pb-3 input-row">
                <div className="label-wrapper">
                    <label className="input-title active-heading font-weight-bold text-dark">
                        {convertArtifacts(title, artifacts)}
                    </label>
                </div>
                <div>
                    {this.state.showArrayFields && (
                        // FieldArray dosent rerender on prop change, so we unmount and mount it to force render
                        <FieldArray name={name} component={this.renderRepeatingElements} />
                    )}
                </div>
            </div>
        );
    }
}
