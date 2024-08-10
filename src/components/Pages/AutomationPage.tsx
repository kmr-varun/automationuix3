import React from 'react'
import AutomationSettingPanel from './AutomationSettingPanel'
import Footer from './Footer'
import TriggerSettings from './TriggerSettings'
import { WorkflowData, Workflow, WorkflowInput } from '@/app/models';
import * as data from '../../app/data.json';
import * as testinput from '../../app/input.json';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
// import ActionSettings from './ActionSettings';
import EmailForm from './EmailFormComponent';
import AutomationActions from './AutomationActions';
import { selectActions } from '@/app/features/automationSlice';

export const workflowData: WorkflowData = data;
const workflows: Workflow = workflowData.workflow;

const myinput: WorkflowInput = testinput;



const handleSelect = (option: string) => {
    console.log('Selected:', option);
};
const AutomationPage = () => {
    const { workflow } = useSelector((state: RootState) => state.automation);
    const actions = useSelector(selectActions);
    return (
        <div className='w-screen h-screen bg-black text-white'>
            <div className='h-[92%] flex flex-row  p-4 gap-4 '>

                <div className='basis-1/4  bg-[#0B0B0C] rounded-[12px] border-solid border-[1px] border-[#242428] flex flex-col p-8'>
                    <AutomationSettingPanel dropdownOptions={workflows} handleSelect={handleSelect} />
                </div>


                <div className='basis-3/4 bg-[#242428] rounded-[12px] h-full flex flex-1 items-center justify-center'>
                    <div id='main' className='w-full mx-auto flex justify-center'>

                        {
                            !workflow.preview && workflow.selected && !workflow.setup &&
                            <TriggerSettings dropdownOptions={myinput.data} handleSelect={handleSelect} />
                        }

                        {
                            !workflow.preview && actions.length > 0 && !actions[actions.length - 1].setup && actions[actions.length - 1].operation == 'send_mail' &&
                            <EmailForm />
                        }

                        {/* {
                            !trigger.preview && actions.length > 0 && !actions[actions.length - 1].setup && actions[actions.length - 1].operation == 'notify' &&
                            <ActionSettings dropdownOptions={{ workflow }} handleSelect={handleSelect} />
                        } */}

                        {
                            workflow.preview &&
                            <AutomationActions
                                dropdownOptions={{}}
                                handleSelect={(selectedOption) => {
                                    console.log('Selected option:', selectedOption);
                                }}
                            />
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AutomationPage