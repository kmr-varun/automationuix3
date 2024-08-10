import React, { useState } from 'react';

import { AddFilled, Save } from '@carbon/icons-react';
import ConditionDropdown from '../ConditionDropdown';
import IconButton from '../IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { setCondition, ConditionColumn, removeCondition, updateCondition, setTrigger, TriggerState } from '@/app/features/automationSlice';
import { AppDispatch, RootState } from '@/app/store';
import PropertyDropdown from '../PropertyDropdown';
import OperatorDropdown from '../OperatorDropdown';



interface TriggerSettingsProps {
  dropdownOptions: ConditionColumn[];
  handleSelect: (selectedOption: string) => void;
}

const TriggerSettings: React.FC<TriggerSettingsProps> = ({ dropdownOptions, handleSelect }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { condition, workflow } = useSelector((state: RootState) => state.automation);
  const [showCondition, setShowCondition] = useState(false);


  const [newTrigger, setNewTrigger] = useState<TriggerState>({
    id: '',
    selected: false,
    name: '',
    setup: true,
    preview: false,
    orgId: '',
    operationType: '',
    createdBy: '',
    updatedBy: ''
  });

  const [newCondition, setNewCondition] = useState<ConditionColumn>({
    columnId: '0',
    columnName: 'Column',
    columnType: 'string',
    operator: '',
    operatorString: '',
    multi: false,
    uniqueValues: [],
    fromValue: '',
    toValue: ''
  });


  const handleTriggerState = (triggerData: TriggerState) => {
    const newTrigger = {
      id: triggerData.id,
      selected: triggerData.selected,
      name: triggerData.name,
      setup: triggerData.setup,
      preview: triggerData.preview,
      operationType: triggerData.operationType,
      orgId: triggerData.orgId,
      createdBy: triggerData.createdBy,
      updatedBy: triggerData.updatedBy
    };

    setNewTrigger(newTrigger);
    dispatch(setTrigger(newTrigger));
  };

  const handleSetCondition = (conditionOptions: ConditionColumn) => {
    const newConditions: ConditionColumn = {
      columnId: conditionOptions.columnId,
      columnName: conditionOptions.columnName,
      columnType: conditionOptions.columnType,
      uniqueValues: conditionOptions.uniqueValues,
      fromValue: conditionOptions.fromValue,
      toValue: conditionOptions.toValue,
      operator: conditionOptions.operator,
      operatorString: conditionOptions.operatorString,
      multi: false
    }

    setNewCondition(newConditions);
    dispatch(setCondition(newConditions));
  };

  const handleRemoveCondition = () => {
    dispatch(removeCondition());
  };

  const handleUpdateCondition = (conditionOptions: ConditionColumn) => {
    const newConditions: ConditionColumn = {
      columnId: conditionOptions.columnId,
      columnName: conditionOptions.columnName,
      columnType: conditionOptions.columnType,
      uniqueValues: conditionOptions.uniqueValues,
      fromValue: conditionOptions.fromValue,
      toValue: conditionOptions.toValue,
      operator: conditionOptions.operator,
      operatorString: conditionOptions.operatorString,
      multi: conditionOptions.multi
    }
    dispatch(updateCondition(newConditions));
  };

  const handleCondition = () => {
    setShowCondition(!showCondition);
  }



  return (
    <div className='p-8 w-max'>

      <div>
        <div className='text-xl text-[#848694] my-4'>Trigger Settings</div>
        <div className='text-3xl text-white my-2'>
          When a {workflow.name != '' ? workflow.name : 'Entity'} {condition.columnName != '' ? 'in ' + condition.columnName : ''} {condition.operatorString != '' ? condition.operatorString : ''} {condition.multi && 'from'} {condition.multi && condition.fromValue == '' ? <span className='text-[#4E4E58]'>something</span> : condition.fromValue} {condition.toValue == '' && showCondition ? <span className='text-[#4E4E58]'>something</span> : condition.toValue}
        </div>
        <div className='text-[#848694] text-[15px]'>The trigger will fire when a {workflow.name}</div>
        {
          !showCondition &&
          <div className='mt-4 flex flex-row gap-2'>
            <IconButton label="Add Conditions" Icon={AddFilled} onClick={handleCondition} />
            <IconButton label="Save" Icon={Save} onClick={handleTriggerState} />
          </div>
        }
        {
          showCondition &&
          <div className='my-2 p-2'>
            <div className='text-white my-2 text-base'>Conditions</div>
            <div className='flex gap-4 items-center'>
              <div className='py-3 px-6 bg-[#35363A] rounded-xl w-32 text-center'>Where</div>
              <ConditionDropdown
                title={condition.columnName == '' ? 'Column' : condition.columnName}
                options={dropdownOptions}
                onSelect={handleSetCondition} selectColumn={'columnName'} />
              {/* {condition.columnName && */}
                <OperatorDropdown title={condition.operator  != '' && condition.operator != undefined ? condition.operatorString : 'Operation'} datatype={condition.columnType} onSelect={handleUpdateCondition} />
              {/* } */}
            </div>
            {condition.operator != '' &&
              <div className='pt-8 mx-4'>
                {condition.multi &&

                  <div className='flex items-center'>
                    <div className='mx-8'>From</div>
                    <PropertyDropdown
                      title={condition.fromValue == '' ? 'Value' : condition.fromValue}
                      options={condition.uniqueValues}
                      onSelect={handleUpdateCondition} selectColumn={'fromValue'} />
                  </div>
                }
                <div className='flex my-8 items-center'>
                  <div className='mx-8'>To</div>
                  <PropertyDropdown
                    title={condition.toValue == '' ? 'Value' : condition.toValue}
                    options={condition.uniqueValues}
                    onSelect={handleUpdateCondition} selectColumn={'toValue'} />
                </div>
              </div>
            }
            <div className='mt-4'>
              <IconButton label="Save" Icon={Save} onClick={handleTriggerState} />
            </div>

          </div>
        }
      </div>

    </div>
  );
};

export default TriggerSettings;
