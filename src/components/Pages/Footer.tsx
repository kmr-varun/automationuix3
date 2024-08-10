'use client';
import React, { useState } from 'react';
import Button from '@/components/Button';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { ConditionColumn, selectActions, setTrigger, TriggerState } from '@/app/features/automationSlice';

const Footer = () => {
  const automationState = useSelector((state: RootState) => state.automation);
  const { workflow } = useSelector((state: RootState) => state.automation);
  const actions = useSelector(selectActions);
  const dispatch = useDispatch<AppDispatch>();
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

  const handleTriggerState = (triggerData: TriggerState) => {
    const newTrigger = {
      id: triggerData.id,
      selected: triggerData.selected,
      name: triggerData.name,
      setup: triggerData.setup,
      preview: triggerData.preview,
      orgId: triggerData.orgId,
      operationType: triggerData.operationType,
      createdBy: triggerData.createdBy,
      updatedBy: triggerData.updatedBy
    };

    setNewTrigger(newTrigger);
    dispatch(setTrigger(newTrigger));
  };

  const handleSave = async () => {
    handleTriggerState({
      id: workflow.id,
      selected: workflow.selected,
      name: workflow.name,
      setup: workflow.setup,
      preview: workflow.preview,
      orgId: 'varun',
      operationType: workflow.name,
      createdBy: 'ggdgr',
      updatedBy: 'rgdrgr'
    });


    const data = {
      ...automationState.workflow,
      conditions: automationState.condition,
      actions: automationState.action
    }

    console.log(data);


    try {
      const response = await fetch('http://localhost:4000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      alert('Save successful!');
      console.log('Save successful:', result);
    } catch (error) {
      if (error instanceof Error) {
        alert('Error saving data: ' + error.message);
      } else {
        alert('Unknown error occurred');
      }
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className='space-x-4 absolute right-10 my-2 mx-8'>
      <Button
        text="Cancel"
        variant="primary"
        onClick={() => console.log('Cancel clicked')}
      />
      <Button
        text="Save"
        variant="primary"
        onClick={handleSave}
      />
      {actions.length > 0 &&
        <Button
          text="Preview"
          variant="secondary"
          onClick={() => handleTriggerState({
            id: workflow.id,
            selected: workflow.selected,
            name: workflow.name,
            setup: workflow.setup,
            preview: !workflow.preview,
            orgId: 'varun',
            operationType: workflow.name,
            createdBy: 'ggdgr',
            updatedBy: 'rgdrgr'
          })}
        />
      }
    </div>
  );
};

export default Footer;
