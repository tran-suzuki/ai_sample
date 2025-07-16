
import React from 'react';

interface InstructionFormProps {
  onExecute: (instruction: string, source: string) => void;
}

export const InstructionForm: React.FC<InstructionFormProps> = ({ onExecute }) => {
  const [instruction, setInstruction] = React.useState('');
  const [source, setSource] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecute(instruction, source);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="instruction" className="block text-sm font-medium text-gray-700">
          AIへの指示
        </label>
        <textarea
          id="instruction"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          rows={10}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          ソースコード
        </label>
        <textarea
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          rows={20}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        実行
      </button>
    </form>
  );
};
