import React from 'react';

interface StatusCardProps {
  triggerLabel: string;
  statusLabel: string;
  barColor: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ triggerLabel, statusLabel, barColor }) => {
    return (
      <div className='bg-[#242428] rounded-xl w-full border-[#848694] border-[1px]'>
        <div className='flex flex-row py-2 px-4 gap-4'>
          <div className='w-1.5 h-16 rounded-s' style={{ backgroundColor: barColor }}></div>
          <div className='py-2'>
            <div className='text-sm text-[#848694]'>{triggerLabel}</div>
            <div className='text-lg'>{statusLabel}</div>
          </div>
        </div>
      </div>
    );
  };


export default StatusCard;
