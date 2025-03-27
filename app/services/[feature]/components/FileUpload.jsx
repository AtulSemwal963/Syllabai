import { Upload } from 'lucide-react';

export default function FileUpload({ onFileChange }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Upload PDF Document</h2>
        <label className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
          Choose File
          <input type="file" accept=".pdf" onChange={onFileChange} className="hidden" />
        </label>
      </div>
    </div>
  );
} 