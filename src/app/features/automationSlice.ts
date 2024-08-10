import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "../models";
import { RootState } from "../store";

// Types
export interface ConditionColumn {
  columnId: string;
  columnName: string;
  columnType: string;
  operator?: string;
  operatorString?: string;
  multi?: boolean;
  uniqueValues: string[];
  fromValue: string;
  toValue: string;
}

interface ActionFollowup {
  actions: Action[];
}

export interface TriggerState {
  id: string;
  orgId: string;
  operationType: string;
  selected: boolean;
  name: string;
  setup: boolean;
  preview: boolean;
  createdBy: string;
  updatedBy: string;
}

interface AutomationState {
  workflow: TriggerState;
  condition: ConditionColumn;
  action: ActionFollowup;
}

// Initial State
const initialCondition: ConditionColumn = {
  columnId: "",
  columnName: "",
  columnType: "",
  operator: "",
  operatorString: "",
  multi: false,
  uniqueValues: [],
  fromValue: "",
  toValue: "",
};

const initialWorkflow: TriggerState = {
  id: "",
  orgId: "fvdffdv",
  operationType: "",
  selected: false,
  name: "",
  setup: false,
  preview: false,
  createdBy: "thrthrh",
  updatedBy: "thrthrt",
};

const initialState: AutomationState = {
  workflow: initialWorkflow,
  condition: initialCondition,
  action: { actions: [] },
};

// Selectors
export const selectActions = (state: RootState) => state.automation.action.actions;

// Payload Types
interface UpdateActionPayload {
  index: number;
  updatedAction: Action;
}

const automationSlice = createSlice({
  name: "automation",
  initialState,
  reducers: {
    setTrigger: (state, action: PayloadAction<TriggerState>) => {
      state.workflow = action.payload;
    },
    setCondition: (state, action: PayloadAction<ConditionColumn>) => {
      state.condition = action.payload;
    },
    removeCondition: (state) => {
      state.condition = initialCondition;
    },
    updateCondition: (state, action: PayloadAction<ConditionColumn>) => {
      state.condition = action.payload;
    },
    setAction: (state, action: PayloadAction<ActionFollowup>) => {
      state.action = action.payload;
    },
    addAction: (state, action: PayloadAction<Action>) => {
      state.action.actions.push(action.payload);
    },
    updateAction: (state, action: PayloadAction<UpdateActionPayload>) => {
      const { index, updatedAction } = action.payload;
      if (index >= 0 && index < state.action.actions.length) {
        state.action.actions[index] = updatedAction;
      }
    },
  },
});

export const {
  setTrigger,
  setCondition,
  removeCondition,
  updateCondition,
  setAction,
  addAction,
  updateAction,
} = automationSlice.actions;

export default automationSlice.reducer;
