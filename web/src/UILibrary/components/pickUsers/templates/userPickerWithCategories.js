import React from 'react';
import _ from 'lodash';
import { Avatar, Collapse, Tooltip } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import constants from '../../../constants';
import { convertArtifacts } from '../../../helpers/ArtifactConverter';

const { SINGLE_CATEGORY, CATEGORY_WITH_SUB_CATEGORIES } = constants;

const { Panel } = Collapse;

const UserItem = ({ classN, user, handleChange, disabled, showSelectBtns }) => {
    let profileImageAvaliable = user.imageUrl && user.imageUrl.indexOf('/profile.png') < 0 ? true : false;
    return (
        <div className={`prof-name ${classN}`}>
            <div>
                <Avatar
                    style={{
                        backgroundColor: '#0099CB',
                        verticalAlign: 'middle'
                    }}
                    size={42}
                    src={profileImageAvaliable ? user.imageUrl : null}
                >
                    {user.firstName.charAt(0).toUpperCase()}
                </Avatar>
                <label className="name">{user.firstName + ' ' + user.lastName}</label>
            </div>
            <div style={{ display: showSelectBtns ? 'block' : 'none' }}>
                <button
                    className={`btn-approval ${user.isSelected ? 'btn-true' : 'btn-false'}`}
                    type="button"
                    onClick={() => {
                        handleChange(user);
                    }}
                    disabled={disabled ? disabled : null}
                >
                    {user.isSelected ? 'Deselect' : 'Select'}
                </button>
            </div>
        </div>
    );
};

const getSelectedCount = cat => {
    return _.get(cat, 'users', []).filter(x => x.isSelected).length;
};

const UserPickerWithCategories = props => {
    const { mainTitle, categories = [], handleSelect, disabled, iIconText, artifacts, showSelectBtns = true } = props;

    return (
        <div className="categorized-user-picker-wrapper">
            <label className="main-title">
                {artifacts ? convertArtifacts(mainTitle, artifacts) : mainTitle}
                {iIconText ? (
                    <Tooltip placement="top" title={iIconText}>
                        <span className="i-icon">
                            <i className="fa fa-info-circle"></i>
                        </span>
                    </Tooltip>
                ) : null}
            </label>
            {categories.length > 0
                ? categories.map((cat, catIndex) =>
                      cat.type == SINGLE_CATEGORY ? (
                          <>
                              {cat.users && cat.users.length > 0 ? (
                                  <>
                                      <div className="trustee-select">
                                          <div className="trusteee-select-head">
                                              {artifacts ? convertArtifacts(cat.title, artifacts) : cat.title}
                                          </div>
                                          <div class="hr-line">
                                              <hr />
                                          </div>
                                          <span className="blue-select">{getSelectedCount(cat) + '  Selected'}</span>
                                      </div>
                                      {cat.users.map((usr, uIdx) => (
                                          <UserItem
                                              classN={uIdx == cat.users.length - 1 ? 'last-name-border' : ''}
                                              user={usr}
                                              handleChange={e => handleSelect(e, cat)}
                                              disabled={disabled}
                                              showSelectBtns={showSelectBtns}
                                          />
                                      ))}
                                  </>
                              ) : null}
                          </>
                      ) : cat.type == CATEGORY_WITH_SUB_CATEGORIES ? (
                          <>
                              {cat.subCategories && cat.subCategories.length > 0 ? (
                                  <>
                                      <div className="trustee-select">
                                          <div className="trusteee-select-head">
                                              {artifacts ? convertArtifacts(cat.title, artifacts) : cat.title}
                                          </div>
                                          <div class="hr-line">
                                              <hr />
                                          </div>
                                      </div>

                                      <Collapse
                                          bordered={false}
                                          expandIconPosition="left"
                                          expandIcon={({ isActive }) => (
                                              <CaretRightOutlined rotate={isActive ? 90 : 0} />
                                          )}
                                          activeKey={cat.subCategories.map((x, i) => i)}
                                      >
                                          {cat.subCategories.map((subCat, subIdx) => (
                                              <Panel
                                                  key={subIdx}
                                                  header={
                                                      <div className="trustee-select colapse-truste-select">
                                                          <div className="colapse-trustee-header">
                                                              {artifacts
                                                                  ? convertArtifacts(subCat.title, artifacts)
                                                                  : subCat.title}
                                                          </div>
                                                          <div class="hr-line">
                                                              <hr />
                                                          </div>
                                                      </div>
                                                  }
                                                  extra={
                                                      <div className="colapse-header-right-select">
                                                          <span className="blue-select colapse-sel">
                                                              {getSelectedCount(subCat) + '  Selected'}
                                                          </span>
                                                      </div>
                                                  }
                                              >
                                                  {subCat.users && subCat.users.length > 0
                                                      ? subCat.users.map((usr, uIdx) => (
                                                            <UserItem
                                                                classN={
                                                                    uIdx == subCat.users.length - 1
                                                                        ? 'last-name-border'
                                                                        : ''
                                                                }
                                                                user={usr}
                                                                handleChange={e => handleSelect(e, cat, subCat)}
                                                                disabled={disabled}
                                                                showSelectBtns={showSelectBtns}
                                                            />
                                                        ))
                                                      : null}
                                              </Panel>
                                          ))}
                                      </Collapse>
                                  </>
                              ) : null}
                          </>
                      ) : null
                  )
                : null}
        </div>
    );
};

export default UserPickerWithCategories;
