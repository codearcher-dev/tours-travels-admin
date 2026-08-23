import { useState } from 'react';
import { Plus, Trash2, Copy, Check, MessageSquareHeart, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FeedbackLinkForm() {
  const [questions, setQuestions] = useState(['How was the transportation?']);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const addQuestion = () => setQuestions([...questions, '']);
  
  const updateQuestion = (index, value) => {
    const newQs = [...questions];
    newQs[index] = value;
    setQuestions(newQs);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    // Mock generate link
    const mockId = Math.random().toString(36).substring(2, 9);
    setGeneratedLink(`https://primetraveller.com/feedback/${mockId}`);
    setCopied(false);
    toast.success('Feedback link generated!');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = "block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out hover:ring-gray-400";

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Custom Feedback Link</h1>
           <p className="mt-2 text-sm text-gray-500">Create a unique feedback form with custom questions for a customer.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <form onSubmit={handleGenerate} className="bg-white p-6 sm:p-8 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          
          <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
             <div className="flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold leading-7 text-gray-900">Survey Questions</h2>
             </div>
             <button type="button" onClick={addQuestion} className="text-xs text-primary-700 hover:text-primary-800 font-bold flex items-center bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"><Plus className="w-4 h-4 mr-1"/> Add Question</button>
          </div>
            
          <div className="space-y-4 mb-8">
            {questions.map((q, idx) => (
              <div key={idx} className="flex gap-3 items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500 mt-1">
                   {idx + 1}
                </div>
                <input required type="text" value={q} onChange={(e) => updateQuestion(idx, e.target.value)} placeholder="e.g., How was the hotel?" className={inputClass} />
                <button type="button" onClick={() => removeQuestion(idx)} className="mt-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
            {questions.length === 0 && (
               <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
                 <p className="text-sm text-gray-500">No questions added yet.</p>
               </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100">
             <button type="submit" className="w-full flex justify-center items-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:shadow-md">
               <LinkIcon className="w-4 h-4" />
               Generate Shareable Link
             </button>
          </div>
        </form>

        {generatedLink && (
          <div className="bg-green-50 p-6 sm:p-8 rounded-xl border border-green-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="text-center space-y-4">
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
                 <Check className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-bold text-green-900">Link Generated Successfully!</h3>
               <p className="text-sm text-green-700">Share this link with your customer to collect their feedback.</p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                 <input type="text" readOnly value={generatedLink} className="block w-full max-w-md rounded-lg border border-green-300 py-2.5 px-4 text-green-900 shadow-sm bg-white font-medium focus:outline-none" />
                 <button onClick={handleCopy} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors">
                   {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                   {copied ? 'Copied' : 'Copy Link'}
                 </button>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
