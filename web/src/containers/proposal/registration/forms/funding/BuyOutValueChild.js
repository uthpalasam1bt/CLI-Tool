import React from 'react';
import { CustomInputSection } from '../../../../../components/customFields/FieldInputWithLabel';
import data from './FundingData.json';

const BuyOutValueChild = () => {
    return (
        <div>
            {data.buyOutValueChild.map((props, index) => (
                <CustomInputSection key={index} name={props.name} label={props.label} placeHolder={props.placeHolder} />
            ))}
        </div>
    );
};

export default BuyOutValueChild;
