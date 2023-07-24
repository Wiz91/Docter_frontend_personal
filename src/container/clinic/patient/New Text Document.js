import React, { useState } from 'react';

function CheckboxExample() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

 console.log(isChecked,"cheerrr")

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Checkbox
      </label>
      <p>Checkbox value: {isChecked ? 'Checked' : 'Unchecked'}</p>
    </div>
  );
}

export default CheckboxExample;
