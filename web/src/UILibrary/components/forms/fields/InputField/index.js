import React from 'react';
import NotificationHelper from '../../../../helpers/NotificationHelper';

const format = /[!#$%^*()+\=\[\]{};:"\\|<>\/?]+/;

const InputField = ({ input, meta: { touched, error }, disabled, editable, ...props }) => {
    let hasError = touched && error !== undefined;
    const ignoreCharacterValidation =
        props.options && props.options.ignoreCharacterValidation ? props.options.ignoreCharacterValidation : false;

    if (!hasError) {
        if (format.test(input.value) && !ignoreCharacterValidation) {
            hasError = true;
            error = 'Special characters are not allowed.';
            NotificationHelper.getInstance().warning('Special characters are not allowed.');
            input.onChange(input.value.replace(/[!#$%^*()+\=\[\]{};:"\\|<>\/?]+/, ''));
        }
    }

    if (props.isEmail) {
        input.value = input.value.toLocaleLowerCase();
    }

    const { onBlur, ...restInput } = input;

    const className = `input-field ${hasError ? 'has-error' : ''} ${props.className ? props.className : ''}`;
    return (
        <div
            className={`field-wrapper ${props.prefix && 'prefix-wrapper'} ${props.suffix && 'suffix-wrapper'}`}
            title={props.disabled && props.title ? props.title : ''}
        >
            {props.prefix && <span className="prefix">{props.prefix}</span>}
            <input
                disabled={disabled || editable === false}
                {...restInput}
                {...props}
                //onBlur={onBlur}
                className={className}
            />
            {props.suffix && <span className="suffix">{props.suffix}</span>}
            {hasError && <span className="error">{error}</span>}
        </div>
    );
};

export default InputField;
