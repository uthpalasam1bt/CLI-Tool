import React from 'react';
import { DatePicker, Select, Popover, Tooltip } from 'antd';
import moment from 'moment';

const { Option } = Select;

const content = (
    <div className="matrix-popover">
        <span className="matrix-title">
            <i className="fa fa-exclamation-circle faicon" />
            Proceed with change?
        </span>
        <div className="footer">
            <button className="btn-cancel btn-outline">Cancel</button>
            <button className="btn-ok tpip-btn-blue">Yes</button>
        </div>
    </div>
);

//just a static filler for making it easy for sorting when no values are found
let olderMoment = moment().subtract(200, 'years');

let sortDate = (a, b, format = 'YYYY-MM-DD') =>
    (a === '-' ? olderMoment : moment(a, format)).diff(b === '-' ? olderMoment : moment(b, format));

let numberSort = (a, b) => (parseFloat(a.replace('%', '')) || 0) - (parseFloat(b.replace('%', '')) || 0);

let stringSort = (a, b) => (a ? a : '').localeCompare(b ? b : '');

let booleanSort = (a, b) => (a ? 1 : 0) - (b ? 1 : 0);

//let stringSort = (a, b) => (a === '-' ? '' : a).localeCompare(b === '-' ? b : '');

let convertToBillion = numStr => (numStr === '-' ? numStr : (Number(numStr) / 1000000).toFixed(1) + 'M');

let roundOffTo = (numStr, decimalPlaces) =>
    numStr === '-'
        ? numStr
        : Number(numStr)
              .toFixed(decimalPlaces)
              .toString();

let getGreenDotRedDotClass = (hitValue, value) => {
    if (hitValue === 'Y') return 'red-dot';
    else if (hitValue === 'N') return 'green-dot';
    else return '';
};

const isEclipsable = (text, charLimit) => text.length > charLimit;

let columnsMap = (isLgim, hasClaim, updateIsFavourite, valueOnChange, navigateScheme) => [
    {
        title: 'Name',
        key: 'schemeName',
        className: 'w-227',
        width: 227,
        dataIndex: 'schemeName',
        fixed: 'left',
        sorter: (a, b) => a.schemeName.localeCompare(b.schemeName),
        render: (schemeName, scheme) => (
            <div className="w-203-content td-word-wrap text-link" onClick={() => navigateScheme(undefined, scheme)}>
                <i
                    className={`fa fa-icon ${scheme.isFavorite ? 'fa-star selected' : 'fa-star-o'}`}
                    onClick={() => updateIsFavourite(scheme)}
                ></i>
                {isEclipsable(schemeName, 25) ? (
                    <Tooltip placement="topRight" title={schemeName}>
                        {schemeName}
                    </Tooltip>
                ) : (
                    schemeName
                )}
            </div>
        )
    },
    {
        title: 'Policy',
        dataIndex: 'policy',
        key: 'policy',
        className: 'w-133',
        width: 133,
        render: policy => (
            <div className="w-133-content td-word-wrap">
                {isEclipsable(policy, 12) ? (
                    <Tooltip placement="topRight" title={policy}>
                        {policy}
                    </Tooltip>
                ) : (
                    policy
                )}
            </div>
        ),
        sorter: (a, b) => numberSort(a.policy, b.policy)
    },
    {
        title: 'Val. Date',
        dataIndex: 'valuationDate',
        key: 'valuationDate',
        className: 'w-111',
        sorter: (a, b) => sortDate(a.valuationDate, b.valuationDate)
    },
    {
        title: 'Assets',
        dataIndex: 'assets',
        key: 'assets',
        className: 'text-righht w-100',
        sorter: (a, b) => numberSort(a.assets, b.assets),
        render: assets => (
            <div className="flex-table">
                <span className="table-text-gray"> {assets && assets !== '-' && '£'} </span>
                <span>{assets}</span>
            </div>
        )
    },
    {
        title: 'Liabilities',
        dataIndex: 'liabilities',
        key: 'liabilities',
        className: 'text-righht w-115',
        sorter: (a, b) => numberSort(a.liabilities, b.liabilities),
        render: liabilities => (
            <div className="flex-table">
                <span className="table-text-gray"> {liabilities && liabilities !== '-' && '£'} </span>
                <span>{liabilities}</span>
            </div>
        )
    },
    {
        title: 'Funding',
        dataIndex: 'funding',
        key: 'funding',
        className: 'text-righht w-115',
        sorter: (a, b) => numberSort(a.funding, b.funding)
    },
    {
        title: 'Liability Basis',
        children: [
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                className: 'text-righht w-100',
                sorter: (a, b) => a.type.localeCompare(b.type)
            },
            {
                title: 'Margin',
                dataIndex: 'liabilityMargin',
                key: 'liabilityMargin',
                className: 'text-righht w-100',
                sorter: (a, b) => numberSort(a.liabilityMargin, b.liabilityMargin)
            }
        ]
    },
    {
        title: 'Target Rtn.',
        dataIndex: 'liveTargetReturn',
        key: 'liveTargetReturn',
        className: 'text-righht w-100',
        sorter: (a, b) => numberSort(a.liveTargetReturn, b.liveTargetReturn)
    },
    {
        title: 'Growth %',
        dataIndex: 'growth',
        key: 'growth',
        className: 'text-righht w-100',
        sorter: (a, b) => numberSort(a.growth, b.growth)
    },
    {
        title: 'Hedge Ratio(% assets)',
        children: [
            {
                title: 'Interest',
                dataIndex: 'interestRate',
                key: 'interestRate',
                className: 'text-righht w-115',
                sorter: (a, b) => numberSort(a.interestRate, b.interestRate)
            },
            {
                title: 'Inflation',
                dataIndex: 'inflation',
                key: 'inflation',
                className: 'text-righht w-115',
                sorter: (a, b) => numberSort(a.inflation, b.inflation)
            }
        ]
    },
    {
        title: 'Triggers',
        children: [
            {
                title: 'Downside',
                dataIndex: 'downSide',
                key: 'downSide',
                className: 'text-righht w-115',
                sorter: (a, b) => numberSort(a.downSide, b.downSide),
                render: (downSide, scheme) => (
                    <div className="flex-table">
                        <span
                            className={`dot ${getGreenDotRedDotClass(scheme.analyticsSum.downSideHit, downSide)}`}
                        ></span>
                        {downSide}
                    </div>
                )
            },
            {
                title: 'Upside1',
                dataIndex: 'upside1',
                key: 'upside1',
                className: 'text-righht w-115',
                sorter: (a, b) => numberSort(a.upside1, b.upside1),
                render: (upside1, scheme) => (
                    <div className="flex-table">
                        <span
                            className={`dot ${getGreenDotRedDotClass(scheme.analyticsSum.upside1Hit, upside1)}`}
                        ></span>
                        {upside1}
                    </div>
                )
            },
            {
                title: 'Upside2',
                dataIndex: 'upside2',
                key: 'upside2',
                className: 'text-righht w-115',
                sorter: (a, b) => numberSort(a.upside2, b.upside2),
                render: (upside2, scheme) => (
                    <div className="flex-table">
                        <span
                            className={`dot ${getGreenDotRedDotClass(scheme.analyticsSum.upside2Hit, upside2)}`}
                        ></span>
                        {upside2}
                    </div>
                )
            },
            {
                title: 'Upside3',
                dataIndex: 'upside3',
                key: 'upside3',
                className: 'text-righht w-115',
                sorter: (a, b) => numberSort(a.upside3, b.upside3),
                render: (upside3, scheme) => (
                    <div className="flex-table">
                        <span
                            className={`dot ${getGreenDotRedDotClass(scheme.analyticsSum.upside3Hit, upside3)}`}
                        ></span>
                        {upside3}
                    </div>
                )
            },
            {
                title: 'LivePrice™',
                dataIndex: 'livePrice',
                key: 'livePrice',
                className: 'text-righht w-120',
                sorter: (a, b) => numberSort(a.livePrice, b.livePrice)
            }
        ]
    },
    {
        title: 'Liabilities',
        children: [
            {
                title: 'Gilt',
                dataIndex: 'giltLiabilityValue',
                key: 'giltLiabilityValue',
                className: 'text-righht w-100',
                sorter: (a, b) => numberSort(a.giltLiabilityValue, b.giltLiabilityValue),
                render: giltLiabilityValue => (
                    <div className="flex-table">
                        <span className="table-text-gray">
                            {' '}
                            {giltLiabilityValue && giltLiabilityValue !== '-' && '£'}{' '}
                        </span>
                        <span>{giltLiabilityValue}</span>
                    </div>
                )
            },
            {
                title: 'Buy Out',
                dataIndex: 'buyOutValCalc',
                key: 'buyOutValCalc',
                className: 'text-righht w-100',
                sorter: (a, b) => numberSort(a.buyOutValCalc, b.buyOutValCalc)
            }
        ]
    },

    {
        title: 'Performance',
        children: [
            {
                title: '3 month',
                dataIndex: 'threeMonthsAssetvsGiltReturn',
                key: 'threeMonthsAssetvsGiltReturn',
                className: 'text-righht w-111',
                sorter: (a, b) => numberSort(a.threeMonthsAssetvsGiltReturn, b.threeMonthsAssetvsGiltReturn)
            },
            {
                title: '1 year',
                dataIndex: 'oneYearAssetvsGiltReturn',
                key: 'oneYearAssetvsGiltReturn',
                className: 'text-righht w-111',
                sorter: (a, b) => numberSort(a.oneYearAssetvsGiltReturn, b.oneYearAssetvsGiltReturn)
            },
            {
                title: 'Inception',
                dataIndex: 'annualisedAssetvsGiltReturn',
                key: 'annualisedAssetvsGiltReturn',
                className: 'text-righht w-120',
                sorter: (a, b) => numberSort(a.annualisedAssetvsGiltReturn, b.annualisedAssetvsGiltReturn)
            }
        ]
    },
    {
        title: 'Inception',
        dataIndex: 'mandateInceptionDate',
        key: 'mandateInceptionDate',
        className: 'text-righht w-120',
        sorter: (a, b) => sortDate(a.mandateInceptionDate, b.mandateInceptionDate, 'DD-MM-YYYY')
    },
    {
        title: 'Status',
        dataIndex: 'transitionStatus',
        key: 'transitionStatus',
        className: 'text-righht w-133',
        render: (transitionStatus, scheme) => (
            <div className="flex-table flex-start">
                <span className={`dot ${transitionStatus.value ? 'yellow-dot' : 'green-dot'}`}></span>{' '}
                {transitionStatus.status}
            </div>
        ),
        sorter: (a, b) => a.transitionStatus.localeCompare(b.transitionStatus)
    },

    //Show only for lgim users
    ...(isLgim
        ? [
              {
                  title: 'IMA Update',
                  dataIndex: 'imaUpdateDate',
                  key: 'imaUpdateDate',
                  className: 'text-righht w-133',
                  sorter: (a, b) => sortDate(a.imaUpdateDate, b.imaUpdateDate, 'DD-MM-YYYY')
              },
              {
                  title: 'Current Fee',
                  dataIndex: 'lgimTotalFee_P',
                  key: 'lgimTotalFee_P',
                  className: 'text-righht w-133',
                  sorter: (a, b) => numberSort(a.lgimTotalFee_P, b.lgimTotalFee_P)
              },
              {
                  title: 'IMA Growth Ranges',
                  children: [
                      {
                          title: 'Min',
                          dataIndex: 'imaMinRange',
                          key: 'imaMinRange',
                          className: 'text-righht w-100',
                          sorter: (a, b) => numberSort(a.imaMinRange, b.imaMinRange)
                      },
                      {
                          title: 'Max',
                          dataIndex: 'imaMaxRange',
                          key: 'imaMaxRange',
                          className: 'text-righht w-100',
                          sorter: (a, b) => numberSort(a.imaMaxRange, b.imaMaxRange)
                      }
                  ]
              },
              {
                  title: 'Hedging Details',
                  children: [
                      {
                          title: 'Duration',
                          dataIndex: 'liabDurn',
                          key: 'liabDurn',
                          className: 'text-righht w-120',
                          sorter: (a, b) => numberSort(a.liabDurn, b.liabDurn)
                      },
                      {
                          title: '% real',
                          dataIndex: 'liabReal',
                          key: 'liabReal',
                          className: 'text-righht w-120',
                          sorter: (a, b) => numberSort(a.liabReal, b.liabReal)
                      },
                      {
                          title: 'Liab PV01',
                          dataIndex: 'clientPSLiabilityPV01',
                          key: 'clientPSLiabilityPV01',
                          className: 'text-righht w-120',
                          sorter: (a, b) => numberSort(a.clientPSLiabilityPV01, b.clientPSLiabilityPV01)
                      },
                      {
                          title: 'Liab IE01',
                          dataIndex: 'clientPSLiabilityIE01',
                          key: 'clientPSLiabilityIE01',
                          className: 'text-righht w-120',
                          sorter: (a, b) => numberSort(a.clientPSLiabilityIE01, b.clientPSLiabilityIE01)
                      },
                      {
                          title: 'Asset PV01',
                          dataIndex: 'assetPV01',
                          key: 'assetPV01',
                          className: 'text-righht  w-120',
                          sorter: (a, b) => numberSort(a.assetPV01, b.assetPV01)
                      },
                      {
                          title: 'Asset IE01',
                          dataIndex: 'assetIE01',
                          key: 'assetIE01',
                          className: 'text-righht w-120',
                          sorter: (a, b) => numberSort(a.assetIE01, b.assetIE01)
                      }
                  ]
              },
              {
                  title: 'Input Flags',
                  children: [
                      {
                          title: 'In transition',
                          dataIndex: 'transitionStatus',
                          key: 'transitionStatus',
                          className: 'w-160',
                          render: (transitionStatus, scheme) => (
                              <Popover placement="bottom" content={content} trigger="click">
                                  <Select
                                      disabled={!hasClaim}
                                      defaultValue={transitionStatus.value}
                                      value={transitionStatus.value}
                                      style={{ width: 120 }}
                                      onChange={value =>
                                          valueOnChange(scheme.schemeId, 'transitionStatus', value, scheme.schemeName)
                                      }
                                  >
                                      <Option value={false}>Active</Option>
                                      <Option value={true}>Transition</Option>
                                  </Select>
                              </Popover>
                          ),
                          sorter: (a, b) => booleanSort(a.transitionStatus.value, b.transitionStatus.value)
                      },
                      {
                          title: 'Live Price',
                          dataIndex: 'livePriceFlag',
                          key: 'livePriceFlag',
                          className: 'w-160',
                          //sorter: (a, b) => a.age - b.age,
                          render: (livePriceFlag, scheme) => (
                              <Select
                                  disabled={!hasClaim}
                                  defaultValue={livePriceFlag}
                                  value={livePriceFlag}
                                  style={{ width: 120 }}
                                  onChange={value =>
                                      valueOnChange(scheme.schemeId, 'livePriceFlag', value, scheme.schemeName)
                                  }
                              >
                                  <Option value="Y">Yes</Option>
                                  <Option value="N">No</Option>
                              </Select>
                          ),
                          sorter: (a, b) => stringSort(a.livePriceFlag, b.livePriceFlag)
                      },
                      {
                          title: 'Monitoring Only',
                          dataIndex: 'monitorOnlyFlag',
                          key: 'monitorOnlyFlag',
                          className: 'w-160',
                          render: (monitorOnlyFlag, scheme) => (
                              <Select
                                  disabled={!hasClaim}
                                  defaultValue={monitorOnlyFlag}
                                  value={monitorOnlyFlag}
                                  style={{ width: 120 }}
                                  onChange={value =>
                                      valueOnChange(scheme.schemeId, 'monitorOnlyFlag', value, scheme.schemeName)
                                  }
                              >
                                  <Option value="Y">Yes</Option>
                                  <Option value="N">No</Option>
                              </Select>
                          ),
                          sorter: (a, b) => stringSort(a.monitorOnlyFlag, b.monitorOnlyFlag)
                      },
                      {
                          title: 'Portfolio Chart',
                          dataIndex: 'chartingType',
                          key: 'chartingType',
                          className: 'w-160',
                          render: (chartingType, scheme) => (
                              <Select
                                  disabled={!hasClaim}
                                  defaultValue={chartingType}
                                  value={chartingType}
                                  style={{ width: 120 }}
                                  onChange={value =>
                                      valueOnChange(scheme.schemeId, 'chartingType', value, scheme.schemeName)
                                  }
                              >
                                  <Option value="SIMPLE">Simple</Option>
                                  <Option value="COMPLEX">Complex</Option>
                              </Select>
                          ),
                          sorter: (a, b) => stringSort(a.chartingType, b.chartingType)
                      },
                      {
                          title: 'Hedge ratio chart',
                          dataIndex: 'showHr',
                          key: 'showHr',
                          className: 'w-160',
                          render: (showHr, scheme) => (
                              <Select
                                  disabled={!hasClaim}
                                  defaultValue={showHr}
                                  value={showHr}
                                  style={{ width: 120 }}
                                  onChange={value => valueOnChange(scheme.schemeId, 'showHr', value, scheme.schemeName)}
                              >
                                  <Option value="ASSETS">Assets</Option>
                                  <Option value="LIABILITIES">Liabilities</Option>
                              </Select>
                          ),
                          sorter: (a, b) => stringSort(a.showHr, b.showHr)
                      },
                      {
                          title: 'Buy-in chart',
                          dataIndex: 'showBuyin',
                          key: 'showBuyin',
                          className: 'w-160',
                          render: (showBuyin, scheme) => (
                              <Select
                                  disabled={!hasClaim}
                                  defaultValue={showBuyin}
                                  value={showBuyin}
                                  style={{ width: 120 }}
                                  onChange={value =>
                                      valueOnChange(scheme.schemeId, 'showBuyin', value, scheme.schemeName)
                                  }
                              >
                                  <Option value="Y">Yes</Option>
                                  <Option value="N">No</Option>
                              </Select>
                          ),
                          sorter: (a, b) => stringSort(a.showBuyin, b.showBuyin)
                      },
                      {
                          title: 'Reporting',
                          dataIndex: 'reportFlag',
                          key: 'reportFlag',
                          className: 'w-160',
                          render: (reportFlag, scheme) => (
                              <Select
                                  disabled={!hasClaim}
                                  defaultValue={reportFlag}
                                  value={reportFlag}
                                  style={{ width: 120 }}
                                  onChange={value =>
                                      valueOnChange(scheme.schemeId, 'reportFlag', value, scheme.schemeName)
                                  }
                              >
                                  <Option value="CORE">Core</Option>
                                  <Option value="NAVGUIDE">Nav Guide</Option>
                                  <Option value="DDF">DDF</Option>
                                  <Option value="BESPOKE">Bespoke</Option>
                                  <Option value="NONE">None</Option>
                              </Select>
                          ),
                          sorter: (a, b) => stringSort(a.reportFlag, b.reportFlag)
                      },
                      {
                          title: 'Inception',
                          dataIndex: 'inceptionOverride',
                          key: 'inceptionOverride',
                          className: 'w-140',
                          render: (inceptionOverride, scheme) => (
                              <DatePicker
                                  disabled={!hasClaim}
                                  onChange={date =>
                                      valueOnChange(
                                          scheme.schemeId,
                                          'inceptionOverride',
                                          date.format('YYYY-MM-DD'),
                                          scheme.schemeName
                                      )
                                  }
                                  format={'DD-MM-YYYY'}
                                  value={inceptionOverride && moment(inceptionOverride, 'YYYY-MM-DD')}
                              />
                          ),
                          sorter: (a, b) =>
                              sortDate(
                                  a.inceptionOverride || '1900=01-01',
                                  b.inceptionOverride || '1900=01-01',
                                  'YYYY-MM-DD'
                              )
                      }
                  ]
              }
          ]
        : [])
];

export default columnsMap;
