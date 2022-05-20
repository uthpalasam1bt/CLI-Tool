import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { history } from '../../redux/store';
import keyMetricsHooks from './hooks/keyMetricsHooks';
import { DEFAULT_VALUE } from '../../../src/constants/keyMetricsConstants';
class SchemeTable extends Component {
    constructor(props) {
        super(props);
        this.valueOnChange = this.valueOnChange.bind(this);
    }

    redirectToSchemeOptions(type, scheme) {
        if (scheme.status === 'A') {
            if (scheme.transitionStatus && scheme.transitionStatus.value) {
                return history.push(`/scheme/options/active-workflow/${scheme.schemeId}/${scheme.schemeName}`);
            } else {
                return history.push(`/scheme/options/dashboard/${scheme.schemeId}/${scheme.schemeName}`);
            }
        } else {
            return history.push(`/scheme/options/active-workflow/${scheme.schemeId}/${scheme.schemeName}`);
        }
    }

    valueOnChange(schemeId, key, value, schemeName) {
        this.props.updateSchemeFlag(schemeId, key, value, schemeName);
    }

    render() {
        const { loading, type, dataArray, keyMetricsConfig, pageSize } = this.props;
        let columnsMap = [];
        let dataSourceMap = [];

        columnsMap = (dataArray.length
            ? Object.keys(dataArray[0])
            : keyMetricsConfig
            ? keyMetricsConfig.map(x => x.columnName)
            : []
        ).map(k => {
            const kmc = keyMetricsConfig ? keyMetricsConfig.find(c => c.columnName === k) : null;

            return {
                ...(k === 'schemeName' ? { fixed: 'left' } : {}),
                title: kmc ? _.get(kmc, `displayName`) : k,
                key: k,
                dataIndex: k,
                width: kmc ? kmc.width : null,
                sorter: kmc ? (a, b) => keyMetricsHooks.TABLE.sorter[_.get(kmc, `dataType`)](kmc, a[k], b[k]) : null,
                ...(_.get(kmc, `renderConfig`)
                    ? {
                          render: (text, record, index) =>
                              text !== DEFAULT_VALUE &&
                              _.has(
                                  keyMetricsHooks,
                                  `TABLE.render.${_.get(kmc, `renderConfig.type`)}.${_.get(
                                      kmc,
                                      `renderConfig.component`
                                  )}`
                              ) ? (
                                  keyMetricsHooks.TABLE.render[_.get(kmc, `renderConfig.type`)][
                                      _.get(kmc, `renderConfig.component`)
                                  ](k, _.get(kmc, `renderConfig`), text, record, index, {
                                      schemeDataChange: this.props.schemeDataChange,
                                      updateIsFavourite: this.props.updateIsFavourite
                                  })
                              ) : (
                                  <>{text}</>
                              )
                      }
                    : {})
            };
        });

        // Making scheme name item (column) as first item (column) in the columnsMap array
        const found = columnsMap.find(x => x.key === 'schemeName');
        if (found) {
            columnsMap = columnsMap.filter(x => x.key !== 'schemeName');
            columnsMap.unshift(found);
        }

        // Remove SchemeId from columnsMap
        columnsMap = columnsMap.filter(x => x.title !== 'schemeId');

        // Remove isFavorite from columnsMap
        columnsMap = columnsMap.filter(x => x.title !== 'isFavorite');

        // Remove fullRecord from columnsMap
        columnsMap = columnsMap.filter(x => x.title !== 'fullRecord');

        dataSourceMap = dataArray.map((scheme, key) => {
            return {
                key,
                scheme,
                ...scheme
            };
        });

        return (
            <Table
                className="matrix-table"
                loading={loading}
                pagination={{ pageSize }}
                columns={columnsMap}
                scroll={{ x: '100%', y: '100%' }}
                dataSource={dataSourceMap}
                locale={{ emptyText: `No ${type} Schemes` }}
            />
        );
    }
}

const mapDispatchToProps = dispatch => ({});

export default connect(
    null,
    mapDispatchToProps
)(SchemeTable);
