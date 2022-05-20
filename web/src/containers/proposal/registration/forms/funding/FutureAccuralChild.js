import React from 'react';
import { CustomInputSection } from '../../../../../components/customFields/FieldInputWithLabel';
import data from './FundingData.json';

let FutureAccuralChild = () => {
    return (
        <div>
            {data.futureAccuralChild.map((props, key) => (
                // <CustomInputSection key={index} name={props.name} label={props.label} placeHolder={props.placeHolder} type={props.type}/>)
                <CustomInputSection {...props} key={key} type="number" />
            ))}
        </div>
    );
};

export default FutureAccuralChild;
