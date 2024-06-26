import { useState } from 'react';

    interface CheckProps {
        color: string;
    }
  
  const Checkbox: React.FC<CheckProps> = ({ color }) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        <label className="inline-flex items-center">
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <div className={` w-4 h-4 border border-gray-400 rounded-sm flex items-center justify-center cursor-pointer ${checked ? `bg-${color}-500` : ''}`}>
                {checked && color === 'red' && <span className="text-white">X</span>}
                {checked && color === 'green' && <span className="text-white">✓</span>}
            </div>
        </label>
    );
};

export default Checkbox;
