
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UploadCloud, FileText, ArrowRight } from 'lucide-react';

export const SourceInput: React.FC = () => {
  const { projectId } = useParams();
  const [selectedFolder, setSelectedFolder] = useState<FileList | null>(null);

  const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFolder(e.target.files);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-2">ソース入力</h1>
      <p className="text-gray-400 mb-8">プロジェクトID: {projectId}</p>
      
      <div className="mb-6">
        <label htmlFor="folder-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">クリックしてアップロード</span>またはドラッグ＆ドロップ</p>
            <p className="text-xs text-gray-500">解析対象のフォルダを選択してください</p>
          </div>
          <input id="folder-upload" type="file" className="hidden" webkitdirectory="true" directory="true" onChange={handleFolderChange} />
        </label>
      </div>

      {selectedFolder && (
        <div className="mt-4 p-4 bg-gray-800 rounded-md">
          <h2 className="font-bold text-white mb-2">選択されたファイル:</h2>
          <ul className="max-h-48 overflow-y-auto">
            {Array.from(selectedFolder).map((file, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-center"><FileText size={16} className="mr-2" />{file.webkitRelativePath || file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to={`/projects/${projectId}/ai-instruction`} className="inline-flex items-center mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
        次へ <ArrowRight className="ml-2" size={20} />
      </Link>
    </div>
  );
};
