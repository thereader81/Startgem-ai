import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEMO_PROJECTS } from '../constants/demoProjects';
import { PROMPTS } from '../constants/prompts';
import type { AppView, GeneratedOutput, Project, WorkflowStepOutput } from '../types';

interface AppState {
  currentView: AppView;
  projects: Project[];
  activeProjectId: string | null;
  selectedPromptId: string | null;
  isGenerating: boolean;
  streamingOutput: string;
  setView: (view: AppView) => void;
  getActiveProject: () => Project | null;
  createProject: (name?: string, scenario?: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setActiveProject: (id: string) => void;
  setSelectedPrompt: (id: string) => void;
  setWorkflowTemplate: (templateId: string, initialStepId: string) => void;
  setWorkflowCurrentStep: (stepId: string) => void;
  saveWorkflowStepOutput: (output: WorkflowStepOutput) => void;
  setGenerating: (value: boolean) => void;
  appendStreamingOutput: (chunk: string) => void;
  clearStreamingOutput: () => void;
  saveGeneratedOutput: (output: GeneratedOutput) => void;
}

const nowIso = () => new Date().toISOString();

const createProjectRecord = (name: string, scenario: string): Project => ({
  id: crypto.randomUUID ? crypto.randomUUID() : `project-${Date.now()}`,
  name,
  scenario,
  createdAt: nowIso(),
  updatedAt: nowIso(),
  generatedOutputs: []
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentView: 'dashboard',
      projects: DEMO_PROJECTS,
      activeProjectId: DEMO_PROJECTS[0]?.id ?? null,
      selectedPromptId: PROMPTS[0]?.id ?? null,
      isGenerating: false,
      streamingOutput: '',
      setView: (view) => set({ currentView: view }),
      getActiveProject: () => {
        const { projects, activeProjectId } = get();
        return projects.find((project) => project.id === activeProjectId) ?? null;
      },
      createProject: (name = 'Untitled Project', scenario = '') => {
        const project = createProjectRecord(name, scenario);
        set((state) => ({
          projects: [project, ...state.projects],
          activeProjectId: project.id,
          currentView: 'workspace'
        }));
      },
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, ...updates, updatedAt: nowIso() }
              : project
          )
        }));
      },
      deleteProject: (id) => {
        set((state) => {
          const nextProjects = state.projects.filter((project) => project.id !== id);
          const nextActive =
            state.activeProjectId === id ? nextProjects[0]?.id ?? null : state.activeProjectId;
          return {
            projects: nextProjects,
            activeProjectId: nextActive
          };
        });
      },
      setActiveProject: (id) => set({ activeProjectId: id }),
      setSelectedPrompt: (id) => set({ selectedPromptId: id }),
      setWorkflowTemplate: (templateId, initialStepId) => {
        const { activeProjectId } = get();
        if (!activeProjectId) return;
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === activeProjectId
              ? {
                  ...project,
                  workflowState: {
                    templateId,
                    currentStepId: initialStepId,
                    stepOutputs: project.workflowState?.stepOutputs ?? []
                  },
                  updatedAt: nowIso()
                }
              : project
          )
        }));
      },
      setWorkflowCurrentStep: (stepId) => {
        const { activeProjectId } = get();
        if (!activeProjectId) return;
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === activeProjectId && project.workflowState
              ? {
                  ...project,
                  workflowState: {
                    ...project.workflowState,
                    currentStepId: stepId
                  },
                  updatedAt: nowIso()
                }
              : project
          )
        }));
      },
      saveWorkflowStepOutput: (output) => {
        const { activeProjectId } = get();
        if (!activeProjectId) return;
        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id !== activeProjectId || !project.workflowState) return project;
            const existing = project.workflowState.stepOutputs.filter(
              (item) => item.stepId !== output.stepId
            );
            return {
              ...project,
              workflowState: {
                ...project.workflowState,
                stepOutputs: [output, ...existing]
              },
              updatedAt: nowIso()
            };
          })
        }));
      },
      setGenerating: (value) => set({ isGenerating: value }),
      appendStreamingOutput: (chunk) =>
        set((state) => ({ streamingOutput: state.streamingOutput + chunk })),
      clearStreamingOutput: () => set({ streamingOutput: '' }),
      saveGeneratedOutput: (output) => {
        const { activeProjectId } = get();
        if (!activeProjectId) return;
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === activeProjectId
              ? {
                  ...project,
                  generatedOutputs: [output, ...project.generatedOutputs],
                  updatedAt: nowIso()
                }
              : project
          )
        }));
      }
    }),
    {
      name: 'stratagem-ai-pro',
      partialize: (state) => ({
        currentView: state.currentView,
        projects: state.projects,
        activeProjectId: state.activeProjectId,
        selectedPromptId: state.selectedPromptId
      })
    }
  )
);
