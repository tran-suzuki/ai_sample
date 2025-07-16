
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Bug, Code } from 'lucide-react';

export const IssueDetail: React.FC = () => {
  const { projectId, issueId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/projects/${projectId}/results`} className="inline-flex items-center mb-6 text-indigo-400 hover:text-indigo-300">
        <ArrowLeft size={20} className="mr-2" />
        結果一覧へ戻る
      </Link>
      <h1 className="text-4xl font-bold text-white mb-2">Issue詳細</h1>
      <p className="text-gray-400 mb-8">Issue ID: {issueId}</p>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <Bug className="text-red-400 mr-3" size={24} />
          <h2 className="text-2xl font-bold text-white">NullPointerException</h2>
        </div>
        <p className="text-gray-300 mb-4">〇〇の箇所でNullPointerExceptionが発生しています。</p>
        <div className="bg-gray-900 p-4 rounded-md">
          <div className="flex items-center text-gray-400 mb-2">
            <Code size={16} className="mr-2" />
            <span>発生コード</span>
          </div>
          <pre className="text-white"><code>{`if (obj.method() === null) { ... }`}</code></pre>
        </div>
      </div>
    </div>
  );
};
