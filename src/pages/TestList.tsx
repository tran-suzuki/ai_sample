
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ListChecks, CheckSquare } from 'lucide-react';

export const TestList: React.FC = () => {
  const { projectId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/projects/${projectId}/results`} className="inline-flex items-center mb-6 text-indigo-400 hover:text-indigo-300">
        <ArrowLeft size={20} className="mr-2" />
        結果一覧へ戻る
      </Link>
      <div className="flex items-center mb-8">
        <ListChecks className="text-green-400 mr-3" size={32} />
        <h1 className="text-4xl font-bold text-white">Test項目一覧</h1>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <ul className="space-y-3">
          <li className="flex items-center text-gray-300"><CheckSquare size={20} className="text-green-400 mr-3" />テスト項目1: 正常系</li>
          <li className="flex items-center text-gray-300"><CheckSquare size={20} className="text-green-400 mr-3" />テスト項目2: 異常系（Null入力）</li>
          <li className="flex items-center text-gray-300"><CheckSquare size={20} className="text-green-400 mr-3" />テスト項目3: 異常系（空文字入力）</li>
        </ul>
      </div>
    </div>
  );
};
