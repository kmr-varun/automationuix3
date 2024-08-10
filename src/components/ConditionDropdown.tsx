import { ConditionColumn } from '@/app/features/automationSlice';
import { ChevronDown } from '@carbon/icons-react';
import React, { useState } from 'react';
import './customScrollbar.css';  // Import custom scrollbar styles

interface ConditionDropdownProps {
  title: string;
  options: ConditionColumn[];
  onSelect: (option: ConditionColumn) => void;
  selectColumn: keyof ConditionColumn; 
  width?: string;
  bgColor?: string;
  borderColor?: string;
}

const ConditionDropdown: React.FC<ConditionDropdownProps> = ({
  title,
  options,
  onSelect,
  selectColumn,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (columnData: ConditionColumn) => {
    onSelect(columnData);
    setIsOpen(false);
  };

  return (
    <div className="relative text-left">
      <button
        className={`flex items-center justify-between rounded-xl mx-auto px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#0B0B0B] max-h-60 overflow-y-auto custom-scrollbar">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option: ConditionColumn) => (
              <div key={option.columnId}>
                <button
                  onClick={() => handleSelect({
                    columnId: option.columnId,
                    columnName: option.columnName,
                    columnType: option.columnType,
                    uniqueValues: option.uniqueValues,
                    fromValue: "",
                    toValue: "",
                    operator: option.operator,
                    operatorString: option.operatorString,
                    multi: option.operator == 'changes' ? true : false
                  })}
                  className="w-full text-left px-6 py-2 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                  role="menuitem"
                >
                  {option[selectColumn]} 
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConditionDropdown;
