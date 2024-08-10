import { ConditionColumn } from "./features/automationSlice";

export interface WorkflowData {
  workflow: Workflow;
  filters: Filters;
}

export interface Workflow {
  triggers: Triggers;
  actions: Actions;
}

export interface Triggers {
  trigger: Trigger[];
  integration: Integration[];
}

export interface Trigger {
  id: string;
  name: string;
  type: string;
  parameter: string;
}

export interface Integration {
  id: string;
  name: string;
  operation: string;
  parameter: string;
}

export interface Actions {
  action: Action[];
  integration: Integration[];
}

export interface DataState {
  name: string;
  type: string;
  value: string[];
}

export interface Action {
  id: string;
  name: string;
  operation: string;
  setup: boolean;
  data: any[];
}

export interface Filters {
  filter: Filter[];
}

export interface Filter {
  type: string;
  conditions: Condition[];
}

export interface Condition {
  operator: string;
  label: string;
  multi: boolean;
}

export interface WorkflowInput {
  data: ConditionColumn[]
}

