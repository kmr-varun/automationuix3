import React, { useState } from 'react';
import StatusCard from '../StatusCard';
import OptionsDropdown from '../OptionsDropdown';
import { Action, Actions, Filters, Trigger, Triggers, Workflow } from '@/app/models';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { setTrigger, removeCondition, updateCondition, TriggerState, addAction, selectActions } from '../../app/features/automationSlice';
import { PreviousFilled } from '@carbon/icons-react';




interface AutomationSettingPanelProps {
    dropdownOptions: Workflow;
    handleSelect: (selectedOption: string) => void;
}

const AutomationSettingPanel: React.FC<AutomationSettingPanelProps> = ({ dropdownOptions, handleSelect }) => {

    const dispatch = useDispatch<AppDispatch>();

    const { action, workflow } = useSelector((state: RootState) => state.automation);
    const actions = useSelector(selectActions);
    


    // const [trigger, setTriggerState] = useState({
    //     id: "",
    //     selected: false,
    //     name: '',
    // });
    // const [action, setActionState] = useState({
    //     id: '',
    //     name: '',
    //     type: '',
    //     parameter: ''
    // });
    // const [followupaction, setFollowupaction] = useState({
    //     id: "",
    //     selected: false,
    //     name: '',
    // });

    const handleTriggerState = (triggerData: TriggerState) => {

        const newTrigger = {
            id: triggerData.id,
            selected: triggerData.selected,
            name: triggerData.name,
            orgId: triggerData.orgId,
            operationType: triggerData.operationType,
            preview: triggerData.preview,
            setup: triggerData.setup,
            createdBy: workflow.createdBy,
            updatedBy: workflow.updatedBy
        };

        // setTriggerState(newTrigger);
        dispatch(setTrigger(newTrigger));
    };

    const handleActionState = (actionOptions: Action) => {
        const isDuplicate = actions.some(action => action.id === actionOptions.id);
        if (!isDuplicate) {
            const newAction = {
                id: actionOptions.id,
                name: actionOptions.name,
                operation: actionOptions.operation,
                setup: actionOptions.setup,
                data: actionOptions.data
            };
            console.log(newAction)
            dispatch(addAction(newAction));
        } else {
            console.log('Action with this ID already exists');
        }
    }
    return (
        <div className='flex h-full'>
            {/* <div className='flex flex-col h-full'>
                <div className='w-8 h-[32%] border-[1px] border-l-[#27282A] border-y-[#27282A] border-transparent'>
                    <div className='w-full '></div>
                </div>
                <div className='w-8 h-72 border-[1px] border-l-[#27282A] border-y-[#27282A] border-transparent'>
                    <div className='w-full '></div>
                </div>
            </div> */}
            <div className='flex-1'>
                <div>
                    <span className='text-3xl'>When</span><br />
                    <span className='text-xl text-[#848694]'>this happens</span>
                </div>
                <div className="py-5">
                    {workflow.selected ? (
                        <StatusCard triggerLabel="Trigger" statusLabel={workflow.name} barColor="#95A4FC" />
                    ) : (

                        <OptionsDropdown
                            title={workflow.name != '' ? workflow.name : 'Add Trigger'}
                            options={dropdownOptions.triggers}
                            onSelect={handleTriggerState}
                        />

                    )}
                </div>
                {workflow.selected && workflow.setup &&
                    <div className='mt-8'>
                        <span className='text-3xl'>Then</span><br />
                        <span className='text-xl text-[#848694]'>do this</span>

                        <div className='py-4'>
                            {actions.length > 0 &&
                                actions.map((action, index) => (
                                    <div key={index} className="py-1">
                                        <StatusCard triggerLabel="Action" statusLabel={action.name} barColor="#BAEDBD" />
                                    </div>
                                ))
                            }
                            <div className='py-2'>
                                <OptionsDropdown
                                    title="Add Action"
                                    options={dropdownOptions.actions}
                                    onSelect={handleActionState}
                                />
                            </div>
                        </div>


                    </div>
                }
                {/* {followupActions.length > 0 &&
                    <div className='my-0'>
                        <span className='text-3xl'>And also</span><br />
                        <span className='text-xl text-[#848694]'>do this</span>
                        <div className="py-5">
                            <StatusCard triggerLabel="Action" statusLabel="Send an email" barColor="#BAEDBD" />
                            <div className='my-5'>
                                <OptionsDropdown
                                    title="Add Action"
                                    options={dropdownOptions.actions}
                                    onSelect={handleActionState}
                                />
                            </div>
                        </div>
                    </div>
                } */}
            </div>
        </div>

    );
};

export default AutomationSettingPanel;
