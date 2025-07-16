
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bug, Lightbulb, ListChecks, ArrowLeft } from 'lucide-react';

export const ResultList: React.FC = () => {
  const { projectId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/`} className="inline-flex items-center mb-6 text-indigo-400 hover:text-indigo-300">
        <ArrowLeft size={20} className="mr-2" />
        プロジェクト一覧へ戻る
      </Link>
      <h1 className="text-4xl font-bold text-white mb-2">解析結果一覧</h1>
      <p className="text-gray-400 mb-8">プロジェクトID: {projectId}</p>
      <div className="space-y-4">
        <Link to={`/projects/${projectId}/issues/1`} className="flex items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
          <Bug className="text-red-400 mr-4" size={24} />
          <span className="text-white text-lg">Issue-1: NullPointerException</span>
        </Link>
        <Link to={`/projects/${projectId}/suggestions/1`} className="flex items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
          <Lightbulb className="text-yellow-400 mr-4" size={24} />
          <span className="text-white text-lg">Suggestion-1: 変数名の改善</span>
        </Link>
        <Link to={`/projects/${projectId}/tests`} className="flex items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
          <ListChecks className="text-green-400 mr-4" size={24} />
          <span className="text-white text-lg">テスト項目一覧</span>
        </Link>
      </div>
    </div>
  );
};
