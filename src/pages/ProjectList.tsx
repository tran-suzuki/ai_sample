
import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, Calendar, Clock } from 'lucide-react';

const projects = [
  { id: 1, name: 'プロジェクトA', createdAt: '2023-01-01', lastAnalyzedAt: '2023-01-10' },
  { id: 2, name: 'プロジェクトB', createdAt: '2023-02-01', lastAnalyzedAt: '2023-02-15' },
];

export const ProjectList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">プロジェクト一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link to={`/projects/${project.id}/source-input`} key={project.id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
            <div className="flex items-center mb-4">
              <Folder className="text-indigo-400 mr-3" size={24} />
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>
            </div>
            <div className="text-gray-400 text-sm space-y-2">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>作成日: {project.createdAt}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>最終解析日: {project.lastAnalyzedAt}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
