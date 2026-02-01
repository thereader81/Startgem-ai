export type AppView = 'dashboard' | 'workflow' | 'workspace' | 'library' | 'settings';

export interface GeneratedOutput {
  id: string;
  promptId: string;
  promptTitle: string;
  category: string;
  input: string;
  output: string;
  createdAt: string;
  isFavorite: boolean;
}

export interface WorkflowStepOutput {
  stepId: string;
  title: string;
  output: string;
  createdAt: string;
}

export interface WorkflowState {
  templateId: string;
  currentStepId: string;
  stepOutputs: WorkflowStepOutput[];
}

export interface Project {
  id: string;
  name: string;
  scenario: string;
  createdAt: string;
  updatedAt: string;
  generatedOutputs: GeneratedOutput[];
  workflowState?: WorkflowState;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  promptTemplate: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}
