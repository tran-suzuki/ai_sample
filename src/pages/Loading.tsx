
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';

export const Loading: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/projects/${projectId}/results`);
    }, 3000); // 3秒後に結果画面へ遷移

    return () => clearTimeout(timer);
  }, [navigate, projectId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader className="animate-spin text-indigo-400" size={64} />
      <h1 className="text-2xl font-bold text-white mt-6">解析中...</h1>
      <p className="text-gray-400">しばらくお待ちください</p>
    </div>
  );
};
