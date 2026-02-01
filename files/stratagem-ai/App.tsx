import React, { Suspense } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { useAppStore } from './stores/projectStore';

const Dashboard = React.lazy(() =>
  import('./components/views/Dashboard').then((module) => ({ default: module.Dashboard }))
);
const Workspace = React.lazy(() =>
  import('./components/views/Workspace').then((module) => ({ default: module.Workspace }))
);
const PromptLibrary = React.lazy(() =>
  import('./components/views/PromptLibrary').then((module) => ({ default: module.PromptLibrary }))
);
const Workflow = React.lazy(() =>
  import('./components/views/Workflow').then((module) => ({ default: module.Workflow }))
);

export const App: React.FC = () => {
  const { currentView } = useAppStore();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'workflow':
        return <Workflow />;
      case 'workspace':
        return <Workspace />;
      case 'library':
        return <PromptLibrary />;
      case 'settings':
        return (
          <div className="p-10">
            <h1 className="heading-2 mb-3">Settings</h1>
            <p className="text-[var(--text-secondary)]">
              Configure integrations, team access, and export preferences.
            </p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout>
      <Suspense
        fallback={
          <div className="p-10 text-sm text-[var(--text-tertiary)]">
            Loading workspace...
          </div>
        }
      >
        {renderView()}
      </Suspense>
    </AppLayout>
  );
};

export default App;
