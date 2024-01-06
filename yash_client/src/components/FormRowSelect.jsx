import React from 'react'

// enter props below
const FormRowSelect = ({ name, labelText, list, defaultValue = '', onChange }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <select
                htmlFor={name}
                className='form-select'
                defaultValue={defaultValue || ''}
                name={name}
                onChange={onChange}
            >
                {list.map((itemValue) => {
                    return <option value={itemValue} key={itemValue}>
                        {itemValue}
                    </option>
                })}
            </select>
        </div>
    )
}

export default FormRowSelect;
