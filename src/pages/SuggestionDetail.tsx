
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Lightbulb, GitCompareArrows } from 'lucide-react';

export const SuggestionDetail: React.FC = () => {
  const { projectId, suggestionId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/projects/${projectId}/results`} className="inline-flex items-center mb-6 text-indigo-400 hover:text-indigo-300">
        <ArrowLeft size={20} className="mr-2" />
        結果一覧へ戻る
      </Link>
      <h1 className="text-4xl font-bold text-white mb-2">Suggestion修正案</h1>
      <p className="text-gray-400 mb-8">Suggestion ID: {suggestionId}</p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <Lightbulb className="text-yellow-400 mr-3" size={24} />
          <h2 className="text-2xl font-bold text-white">変数名の改善</h2>
        </div>
        <p className="text-gray-300 mb-4">変数`d`を`day`に変更することを提案します。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h3 className="font-bold text-white mb-2">修正前</h3>
            <pre className="bg-red-900 bg-opacity-30 p-4 rounded-md text-red-300"><code>{`const d = new Date();`}</code></pre>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2">修正後</h3>
            <pre className="bg-green-900 bg-opacity-30 p-4 rounded-md text-green-300"><code>{`const day = new Date();`}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};
