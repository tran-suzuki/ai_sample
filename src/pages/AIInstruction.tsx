
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Bot, Bug, Zap, Shield, Edit3, ArrowRight } from 'lucide-react';

const promptTemplates = {
  bug: 'コード内の潜在的なバグを検出してください。特に、null参照、リソースリーク、競合状態に注意してください。',
  performance: 'パフォーマンスのボトルネックを特定し、改善案を提案してください。メモリ使用量や実行時間に関する指摘を期待します。',
  security: 'セキュリティ脆弱性を洗い出してください。SQLインジェクション、クロスサイトスクリプティング、その他の一般的な攻撃ベクターをチェックしてください。',
  custom: '',
};

export const AIInstruction: React.FC = () => {
  const { projectId } = useParams();
  const [promptType, setPromptType] = useState('bug');
  const [instruction, setInstruction] = useState(promptTemplates.bug);

  const handlePromptTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setPromptType(newType);
    // @ts-ignore
    setInstruction(promptTemplates[newType]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-2">AI指示入力</h1>
      <p className="text-gray-400 mb-8">プロジェクトID: {projectId}</p>
      
      <div className="mb-6">
        <label htmlFor="prompt-type" className="block text-sm font-medium text-gray-400 mb-2">
          指示テンプレート
        </label>
        <div className="relative">
          <Bot className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <select 
            id="prompt-type" 
            value={promptType} 
            onChange={handlePromptTypeChange} 
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="bug">バグ検出</option>
            <option value="performance">パフォーマンス改善</option>
            <option value="security">セキュリティ脆弱性チェック</option>
            <option value="custom">カスタム</option>
          </select>
        </div>
      </div>

      <textarea
        rows={12}
        className="w-full p-4 bg-gray-800 border border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-700"
        placeholder="AIへの指示を具体的に入力してください"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        disabled={promptType !== 'custom'}
      />

      <Link to={`/projects/${projectId}/loading`} className="inline-flex items-center mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
        解析開始 <ArrowRight className="ml-2" size={20} />
      </Link>
    </div>
  );
};
