import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Checkbox, Button, Typography } from 'antd';
import SaveFilterAsModel from '../../../../../components/modals/SaveFilterAsModel';
import FilterModel from '../../../../../components/modals/FilterModel';
import { deleteView, getMyViews } from '../../actions/keyMetricsActions';

const FilterSelectionContainer = props => {
    const { filters, views, changeFilterVisibility, handleDropdownVisibility, hideModal, handleViewSaveCb } = props;

    const [visibleMenu, setVisbleMenu] = useState(false);
    const [search, setSearch] = useState('');
    const [isSaveFilterAsModelVisible, setIsSaveFilterAsModelVisible] = useState(false);
    const [isDefaultView, setIsDefaultView] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);

    useEffect(() => {
        setIsDefaultView(filters.every(f => f.default === f.visible));
        const Visibility = filters.every(f => f.visible);
        if (Visibility) setIsCheckAll(true);
        else setIsCheckAll(false);
    }, [filters]);

    const checkSelected = () => {
        return !!filters.some(f => f.visible);
    };
    const handleOk = () => {
        setIsSaveFilterAsModelVisible(false);
        setVisbleMenu(false);
    };

    const handleOnCheckAllChange = e => {
        const isChecked = e.target.checked;
        setIsCheckAll(isChecked);
        if (isChecked) {
            filters.forEach(f => {
                if (!f.data) {
                    changeFilterVisibility(f.columnName, true);
                }
            });
        } else {
            handleClearAll();
        }
    };

    const handleClearAll = e => {
        filters.forEach(f => changeFilterVisibility(f.columnName, false));
        setIsCheckAll(false);
    };

    const onChange = e => {
        changeFilterVisibility(e.target.value);
    };

    return (
        <>
            <Row className="lgim-styles-wrapper  km-filter-container">
                <Col>
                    <Input.Search
                        className="input-search km-search-btn "
                        placeholder="Search"
                        onChange={e => {
                            setSearch(e.target.value);
                        }}
                    />
                </Col>

                <Col className="km-col-content">
                    <Checkbox checked={isCheckAll} onChange={handleOnCheckAllChange} className="km-check-box-group">
                        <Typography.Text className="km-checkbox-text">All</Typography.Text>
                    </Checkbox>

                    {filters
                        .filter(f => {
                            if (search == '') {
                                return f;
                            } else if (
                                f &&
                                f.displayName
                                    .toString()
                                    .toLowerCase()
                                    .startsWith(search.toLowerCase())
                            ) {
                                return f;
                            }
                        })
                        .map((f, i) => {
                            return (
                                <Row key={i}>
                                    <Col span={24} className="km-check-box-col">
                                        <Checkbox
                                            value={f.columnName}
                                            checked={f.visible}
                                            onChange={onChange}
                                            name={f.displayName}
                                        >
                                            <Typography.Text className="km-checkbox-text">
                                                {f.displayName}
                                            </Typography.Text>
                                        </Checkbox>
                                    </Col>
                                </Row>
                            );
                        })}
                </Col>
            </Row>

            <Row
                type="flex"
                justify="space-between"
                className="lgim-styles-wrapper km-filter-footer km-filter-container"
            >
                <Col span={18}>
                    <Button onClick={handleClearAll} type="link" className="km-clear-all-cm">
                        Clear all
                    </Button>
                </Col>
                <Col span={6} className="text-right">
                    <Button
                        className="km-btn-ant-done"
                        onClick={() => handleDropdownVisibility()}
                        style={{ backgroundColor: checkSelected() ? '#1691c5' : null }}
                    >
                        <Typography.Text className="km-done-btn-text-cn">Done</Typography.Text>
                    </Button>
                </Col>
            </Row>
            {isSaveFilterAsModelVisible && (
                <SaveFilterAsModel
                    show={isSaveFilterAsModelVisible}
                    handleShow={handleOk}
                    views={views}
                    isDefaultView={isDefaultView}
                    hideModal={hideModal}
                    handleViewSaveCb={handleViewSaveCb}
                />
            )}

            {visibleMenu && <FilterModel visibleMenu={visibleMenu} />}
        </>
    );
};

const mapDispatchToProps = dispatch => ({
    doDeleteView: payload => {
        dispatch(deleteView(payload));
    },
    doGetMyViews: () => {
        dispatch(getMyViews());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(FilterSelectionContainer);
