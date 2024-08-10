"use client";
import React, { useState } from "react";
import { Add } from "@carbon/icons-react";
import { Action, Actions, Triggers } from "@/app/models";
import { TriggerState } from "@/app/features/automationSlice";
import "./customScrollbar.css"; // Import custom scrollbar styles

interface OptionsDropdownProps {
  title: string;
  options: Triggers | Actions;
  onSelect: (option: any) => void;
}

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  title,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const keyExists = Object.keys(options).includes("action");

  const handleSelect = (option: TriggerState | Action) => {
    console.log(options);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative text-left">
      <button
        className="flex items-center justify-center w-full rounded-xl px-8 py-3 bg-[#19191B] text-sm font-medium text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Add size={30} className="mr-2" />
        {title}
      </button>

      {isOpen && (
        <div className="origin-center absolute mt-4 w-full rounded-lg z-10 shadow-lg bg-[#242428] max-h-60 overflow-y-auto custom-scrollbar">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Object.keys(options).map((key) => (
              <div key={key}>
                <div className="px-4 py-2 text-[#777777] font-bold text-xs">
                  {key.toUpperCase()}
                </div>
                {(options[key as keyof typeof options] as any[]).map(
                  (option: any, index: number) => (
                    <button
                      key={index}
                      onClick={() =>
                        keyExists
                          ? handleSelect({
                            id: option.id,
                            name: option.name,
                            operation: 'send_mail',
                            setup: false,
                            data: []
                          })
                          : handleSelect({
                              id: option.id,
                              orgId: option.orgId,
                              name: option.name,
                              operationType: option.operationType,
                              selected: true,
                              setup: false,
                              preview: false,
                              createdBy: option.createdBy,
                              updatedBy: option.updatedBy
                            })
                      }
                      className="w-full text-left px-6 py-4 text-white border-b-[1px] border-[#39393A] text-sm hover:bg-[#19191B]"
                      role="menuitem"
                    >
                      {option.name}
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionsDropdown;
