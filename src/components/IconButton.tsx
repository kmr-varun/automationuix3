import React from 'react';
import { CarbonIconType } from '@carbon/icons-react';// Adjust the import based on your icon library
import { TriggerState } from '@/app/features/automationSlice';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

interface IconButton {
  label: string;
  Icon: CarbonIconType; // Use the correct type for your icons
  iconSize?: number;
  className?: string;
  onClick: (option: any) => void;
}

const IconButton: React.FC<IconButton> = ({
  label,
  Icon,
  iconSize = 20,
  className,
  onClick,
}) => {

  const { workflow } = useSelector((state: RootState) => state.automation);

  const handleTrigger = (triggerData: TriggerState) => {
    onClick(triggerData);
  }
  return (
    <button
      className={`flex items-center justify-center w-fit rounded-xl px-6 py-2 bg-[#080808] border-[1px] border-[#4F4F4F] text-sm font-medium text-white focus:outline-none ${className}`}
      onClick={() => handleTrigger({
        id: workflow.id,
        orgId: workflow.orgId,
        operationType: workflow.operationType,
        selected: workflow.selected,
        name: workflow.name,
        preview: workflow.preview,
        createdBy: workflow.createdBy,
        updatedBy: workflow.updatedBy,
        setup: true
      })}
    >
      <Icon style={{ fontSize: iconSize }} className="mr-2" />
      {label}
    </button>
  );
};


export default IconButton;
