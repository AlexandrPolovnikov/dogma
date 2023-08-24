import React from 'react';
import './index.scss';

const Select = ({ options, defaultValue, value, onChange }: any) => {
    return (
        <select className="sorted" value={value} onChange={(event) => onChange(event.target.value)}>
            <option disabled={true} value="">
                {defaultValue}
            </option>
            {options.map((option: { value: string; name: string; key: string }) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default Select;
