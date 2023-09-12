import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Select = ({ items, onChange, ClassName, label, keyName, defaultValue }) => {
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  const handleOnChangeSelect = (event) => {
    const val = event.target.value;
    setSelectedValue(val);
    onChange(val);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleOnChangeSelect}
      className={classNames(
        " w-full md:py-5 py-2 text-sm dark:text-white text-black px-2 ",
        ClassName
      )}
          >
      {label && (
        <option className="text-sm dark:text-gray-100 text-gray-700 p-1">{label}</option>
      )}

      {items.length > 0 ? (
        items.map((item) => (
          <option
            className="text-sm dark:text-gray-100 text-gray-700 p-1"
            key={item.value}
            value={item.id}
          >
            {item[keyName]}
          </option>
        ))
      ) : (
        <p></p>
      )}
    </select>
  );
};

export default Select;