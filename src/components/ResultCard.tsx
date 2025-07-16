import React from 'react';

interface AIResponse {
  issues: string[];
  suggestions: string[];
  fixProposals: string[];
  testItems: string[];
}

interface ResultCardProps {
  response: AIResponse;
}

export const ResultCard: React.FC<ResultCardProps> = ({ response }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">AIからの返答</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-800">不具合内容</h3>
          <ul className="list-disc list-inside text-gray-600">
            {response.issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800">ソース修正の指摘事項</h3>
          <ul className="list-disc list-inside text-gray-600">
            {response.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800">ソース修正候補</h3>
          <ul className="list-disc list-inside text-gray-600">
            {response.fixProposals.map((proposal, index) => (
              <li key={index}>{proposal}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800">テスト項目</h3>
          <ul className="list-disc list-inside text-gray-600">
            {response.testItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};