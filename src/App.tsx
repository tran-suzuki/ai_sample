import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectList } from './pages/ProjectList';
import { SourceInput } from './pages/SourceInput';
import { AIInstruction } from './pages/AIInstruction';
import { Loading } from './pages/Loading';
import { ResultList } from './pages/ResultList';
import { IssueDetail } from './pages/IssueDetail';
import { SuggestionDetail } from './pages/SuggestionDetail';
import { TestList } from './pages/TestList';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router basename="/ai_sample/">
      <div className="bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/projects/:projectId/source-input" element={<SourceInput />} />
          <Route path="/projects/:projectId/ai-instruction" element={<AIInstruction />} />
          <Route path="/projects/:projectId/loading" element={<Loading />} />
          <Route path="/projects/:projectId/results" element={<ResultList />} />
          <Route path="/projects/:projectId/issues/:issueId" element={<IssueDetail />} />
          <Route path="/projects/:projectId/suggestions/:suggestionId" element={<SuggestionDetail />} />
          <Route path="/projects/:projectId/tests" element={<TestList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;