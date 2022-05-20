import React, { useState } from 'react';
import { Row, Col, Radio, Modal, Button } from 'antd';
import FilterSaveChangesModal from './FilterSaveChangesModal';

function SaveFilterAsModel(props) {
    const { show, handleShow, views, hideModal, handleViewSaveCb } = props;
    const [viewId, setViewId] = useState(null);
    const [viewName, setViewName] = useState('');
    const [viewFilterSaveChangesModal, setViewFilterSaveChangesModal] = useState(false);

    const handleViewModal = () => {
        setViewFilterSaveChangesModal(true);
    };

    const handleShowModal = () => {
        setViewFilterSaveChangesModal(false);
        handleShow();
    };

    const handleOnCancle = e => {
        handleShow();
    };

    const onChangeCheckBoxAll = (e, viewName = null, viewId = null) => {
        setViewName(viewName ? viewName : e.target.value);
        if (viewId) setViewId(viewId);
    };

    return (
        <>
            <Modal
                title="Save Filter As"
                visible={show}
                onCancel={handleOnCancle}
                footer={[
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            key="submit"
                            onClick={handleViewModal}
                            style={{ backgroundColor: '#1899CC', color: 'white' }}
                        >
                            Done
                        </Button>
                        ,
                    </div>
                ]}
                width={320}
            >
                <Row>
                    <Col span={24} style={{ overflowY: 'scroll', height: '100px' }}>
                        <Radio.Group>
                            {views.map((v, k) =>
                                v.userId ? (
                                    <Radio
                                        key={k}
                                        value={v.viewId}
                                        style={{ display: 'block' }}
                                        onClick={e => {
                                            onChangeCheckBoxAll(e, v.viewName, v.viewId);
                                        }}
                                    >
                                        {v.viewName}
                                    </Radio>
                                ) : null
                            )}
                        </Radio.Group>
                    </Col>
                </Row>
            </Modal>

            {viewFilterSaveChangesModal && (
                <FilterSaveChangesModal
                    show={viewFilterSaveChangesModal}
                    handleShow={handleShowModal}
                    hideModal={handleOnCancle}
                    viewId={viewId}
                    viewName={viewName}
                    visibleModal={hideModal}
                    handleViewSaveCb={handleViewSaveCb}
                />
            )}
        </>
    );
}

export default SaveFilterAsModel;
