import React, { useEffect, useState } from "react";
import { FiTrash2, FiDownload, FiPlay, FiClock, FiFileText, FiFilter, FiSearch } from "react-icons/fi";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/v1/history", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch history");
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/v1/history/${id}`, { 
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      setHistory(history.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-950 transition-colors">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest">Loading archives...</p>
      </div>
    );
  }

  const filteredHistory = history.filter(item => 
    item.transcript?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 p-4 lg:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-colors">
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight flex items-center gap-3"><FiClock className="text-indigo-600" /> Session Intelligence</h1>
                <p className="text-gray-400 dark:text-gray-500 font-bold text-sm uppercase tracking-tighter mt-1">Audit trail of all processed neural tasks</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search sessions..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl outline-none ring-1 ring-gray-100 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 dark:text-gray-200 text-sm font-medium transition"
                    />
                </div>
                <button 
                    onClick={() => { if(window.confirm("Purge all records?")) setHistory([]); }}
                    className="px-6 py-3 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-100 transition"
                >
                    <FiTrash2 /> Purge History
                </button>
            </div>
        </div>

        {/* List Content */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-gray-900 rounded-[3rem] border border-gray-100 dark:border-gray-800 transition-colors">
            <FiFileText className="mx-auto text-7xl text-gray-200 dark:text-gray-800 mb-6" />
            <p className="text-gray-400 dark:text-gray-500 font-bold text-lg">No sessions found in the archive.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredHistory.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.type === 'S2S' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 
                      item.type === 'STT' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      {item.type || 'TASK'}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-md">
                        {item.sourceLanguage} {item.targetLanguage && `→ ${item.targetLanguage}`}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {item.transcript && (
                        <p className="text-xl font-medium text-gray-800 dark:text-gray-200 leading-snug">
                            {item.transcript}
                        </p>
                    )}
                    {item.translation && (
                        <div className="flex items-start gap-3 bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-50 dark:border-indigo-900/20">
                            <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-0.5 rounded-md mt-1">TRANSLATED</span>
                            <p className="text-indigo-600 dark:text-indigo-400 font-bold italic">{item.translation}</p>
                        </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <button className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 dark:shadow-none"><FiPlay /></button>
                  <button className="p-4 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-2xl hover:text-indigo-600 transition border border-transparent dark:border-gray-700"><FiDownload /></button>
                  <div className="w-[1px] h-10 bg-gray-100 dark:bg-gray-800 mx-1 hidden md:block"></div>
                  <button
                    onClick={() => deleteEntry(item._id)}
                    className="p-4 text-gray-300 dark:text-gray-600 hover:text-red-500 transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
