// import React from 'react';

// import { AddFilled } from '@carbon/icons-react'; // Adjust import path as needed
// import ConditionDropdown from '../ConditionDropdown';
// import IconButton from '../IconButton';

// interface ActionSettingsProps {
//   dropdownOptions: { [key: string]: any }; // Adjust type if needed
//   handleSelect: (selectedOption: string) => void;
// }

// const ActionSettings: React.FC<ActionSettingsProps> = ({ dropdownOptions, handleSelect }) => {
//   return (
//     <div className='p-8'>
//       <div className='text-xl text-[#848694] my-4'>Action Settings</div>
//       <div className='text-3xl text-white my-2'>Send a follow Reminder</div>
//       <div className='text-[#848694] text-[15px]'>The Action will fire when send a follow up reminder</div>
//       <div className='my-12'>
//         <div className='text-white my-2 text-base'>Conditions</div>
//         <div className='flex gap-4 items-center'>
//           <ConditionDropdown
//             title="After"
//             options={dropdownOptions}
//             onSelect={handleSelect}
//             width='w-32'
//             bgColor='#35363A'
//             borderColor='transparent'
//           />
//           <ConditionDropdown
//             title="A Week"
//             options={dropdownOptions}
//             onSelect={handleSelect}
//           />
//           <ConditionDropdown
//             title="Sent Date"
//             options={dropdownOptions}
//             onSelect={handleSelect}
//           />
//         </div>
//         <div className='py-6'>
//           <div className='my-4'>
//             <IconButton label="Add Conditions" Icon={AddFilled} onClick={() => {}} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActionSettings;
