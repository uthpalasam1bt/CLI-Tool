import React from 'react';
import { Button, Row, Typography } from 'antd';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { ADD_TRUSTEE_POPUP_FORM } from '../../constants';

const PopUpFormFooter = ({ handleShow, isEdit, dispatch }) => {
    return (
        <>
            <Row className="row-trustee-footer">
                <div className="footer clearfix trustee-footer">
                    <Button key="cancel" onClick={handleShow} className="cancel-trustee-btn">
                        <Typography.Text className="kcancel-trustee-btn-lable">Cancel</Typography.Text>
                    </Button>
                    <Button onClick={() => dispatch(submit(ADD_TRUSTEE_POPUP_FORM))} className="add-tustee-btn ">
                        <Typography.Text className="add-trustee-btn-lable">{isEdit ? 'Update' : 'Add'}</Typography.Text>
                    </Button>
                </div>
            </Row>
        </>
    );
};
export default connect()(PopUpFormFooter);
