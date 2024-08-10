"use client";
import React, { useState } from 'react';
import { ChevronDown } from '@carbon/icons-react';
import { Actions, Triggers } from '@/app/models';
import { ConditionColumn } from '@/app/features/automationSlice';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import './customScrollbar.css';  // Import custom scrollbar styles

interface PropertyDropdownProps {
  title: string;
  options: any[];
  selectColumn?: keyof ConditionColumn; 
  onSelect: (option: any) => void;
}

const PropertyDropdown: React.FC<PropertyDropdownProps> = ({ title, options, selectColumn, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { condition } = useSelector((state: RootState) => state.automation);

  const handleSelect = (optionValue: string) => {
    const conditionUpdate: ConditionColumn = {
      columnId: condition.columnId,
      columnName: condition.columnName,
      columnType: condition.columnType,
      operator: condition.operator,
      operatorString: condition.operatorString,
      multi: condition.multi,
      uniqueValues: condition.uniqueValues,
      fromValue: selectColumn === 'fromValue' ? optionValue : condition.fromValue,
      toValue: selectColumn === 'toValue' ? optionValue : condition.toValue
    };
    onSelect(conditionUpdate);
    setIsOpen(false);
  };

  return (
    <div className="relative text-left">
      <button
        className="flex items-center justify-between rounded-xl mx-auto px-8 py-3 w-56 bg-transparent text-sm font-medium text-white focus:outline-none border bg-[#242428] border-[#848694]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <div key={index}>
                <button
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                  role="menuitem"
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDropdown;
