
import React, { useState } from 'react';
import { 
  Search, Filter, Grid, List, Video, FileText, Book, Code, GraduationCap, 
  MoreVertical, Star, ExternalLink, Clock, Play, MapPin, Sparkles, LayoutGrid, X, CheckCircle2
} from 'lucide-react';
import { MOCK_LIBRARY_RESOURCES } from '../constants';
import { PageView, LibraryResource } from '../types';

interface LibraryPageProps {
  onNavigate: (page: PageView) => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST'>('GRID');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<LibraryResource | null>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | 'FAVORITES' | 'IN_PROGRESS'>('ALL');
  
  // Filters State
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // --- LOGIC ---

  const filteredResources = MOCK_LIBRARY_RESOURCES.filter(res => {
    // 1. Tab Filter
    if (activeTab === 'FAVORITES' && !res.isFavorite) return false;
    if (activeTab === 'IN_PROGRESS' && res.status !== 'IN_PROGRESS') return false;

    // 2. Search Filter
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      res.nodeTitle.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    // 3. Toolbar Filters
    if (typeFilter !== 'ALL' && res.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && res.status !== statusFilter) return false;

    return true;
  });

  const getIcon = (type: LibraryResource['type']) => {
    switch(type) {
      case 'VIDEO': return <Video size={18} />;
      case 'ARTICLE': return <FileText size={18} />;
      case 'BOOK': return <Book size={18} />;
      case 'REPO': return <Code size={18} />;
      case 'COURSE': return <GraduationCap size={18} />;
      default: return <FileText size={18} />;
    }
  };

  const getStatusColor = (status: LibraryResource['status']) => {
    switch(status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      case 'IN_PROGRESS': return 'bg-amber-100 text-amber-700';
      case 'TODO': return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusLabel = (status: LibraryResource['status']) => {
     switch(status) {
      case 'COMPLETED': return 'Completado';
      case 'IN_PROGRESS': return 'En curso';
      case 'TODO': return 'Pendiente';
    }
  };

  // --- RENDERERS ---

  const renderGridCard = (res: LibraryResource) => (
    <div 
      key={res.id} 
      onClick={() => setSelectedResource(res)}
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col relative overflow-hidden"
    >
      {/* Top Bar (Progress) */}
      {res.progressPercent !== undefined && res.progressPercent > 0 && (
         <div className="h-1 w-full bg-gray-100">
            <div className={`h-full ${res.status === 'COMPLETED' ? 'bg-green-500' : 'bg-indigo-500'}`} style={{ width: `${res.progressPercent}%` }}></div>
         </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
         <div className="flex justify-between items-start mb-3">
             <div className={`p-2.5 rounded-lg ${res.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                {getIcon(res.type)}
             </div>
             {res.isFavorite && <Star size={16} className="text-yellow-400 fill-yellow-400" />}
         </div>
         
         <h3 className="font-bold text-gray-900 leading-snug mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {res.title}
         </h3>
         
         <div className="mt-auto pt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
               <Clock size={12} /> {res.duration}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded w-fit">
               <MapPin size={12} /> {res.nodeTitle}
            </div>
         </div>
      </div>
      
      <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 flex justify-between items-center">
         <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${getStatusColor(res.status)}`}>
            {getStatusLabel(res.status)}
         </span>
         <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200">
             <MoreVertical size={16} />
         </button>
      </div>
    </div>
  );

  const renderListItem = (res: LibraryResource) => (
    <div 
      key={res.id} 
      onClick={() => setSelectedResource(res)}
      className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer p-4 grid grid-cols-12 gap-4 items-center"
    >
       <div className="col-span-6 flex items-center gap-4">
          <div className={`p-2 rounded-lg ${res.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
             {getIcon(res.type)}
          </div>
          <div>
              <h3 className="font-bold text-gray-900 text-sm">{res.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{res.nodeTitle}</p>
          </div>
       </div>
       <div className="col-span-2 text-xs text-gray-500 flex items-center gap-1">
          <Clock size={12} /> {res.duration}
       </div>
       <div className="col-span-3 flex items-center gap-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${getStatusColor(res.status)}`}>
              {getStatusLabel(res.status)}
          </span>
          {res.progressPercent !== undefined && res.progressPercent > 0 && res.status !== 'COMPLETED' && (
             <span className="text-xs font-medium text-indigo-600">{res.progressPercent}%</span>
          )}
       </div>
       <div className="col-span-1 flex justify-end">
          {res.isFavorite && <Star size={16} className="text-yellow-400 fill-yellow-400" />}
       </div>
    </div>
  );

  const renderDetailPanel = () => {
     if (!selectedResource) return null;
     
     return (
        <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 border-l border-gray-200 flex flex-col animate-slide-in-right">
           {/* Header */}
           <div className="p-5 border-b border-gray-100 flex justify-between items-start bg-gray-50">
               <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">Recurso</span>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">{selectedResource.title}</h2>
               </div>
               <button onClick={() => setSelectedResource(null)} className="p-1 hover:bg-gray-200 rounded-full text-gray-400 transition-colors">
                  <X size={20} />
               </button>
           </div>

           {/* Content */}
           <div className="p-6 flex-1 overflow-y-auto space-y-6">
               
               {/* Meta Actions */}
               <div className="flex gap-2">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-transform active:scale-95">
                     <ExternalLink size={16} /> Abrir Recurso
                  </button>
                  <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600">
                     <Star size={20} className={selectedResource.isFavorite ? "text-yellow-400 fill-yellow-400" : ""} />
                  </button>
               </div>

               {/* Meta Data */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                     <span className="text-xs text-gray-500 block mb-1">Duración</span>
                     <span className="font-bold text-gray-900 text-sm flex items-center gap-1">
                        <Clock size={14} /> {selectedResource.duration}
                     </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                     <span className="text-xs text-gray-500 block mb-1">Tipo</span>
                     <span className="font-bold text-gray-900 text-sm flex items-center gap-1">
                        {getIcon(selectedResource.type)} {selectedResource.type}
                     </span>
                  </div>
               </div>
               
               {/* Browser Ext Status */}
               <div className="flex items-center gap-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                     <Play size={14} fill="currentColor" />
                  </div>
                  <div>
                     <p className="text-xs font-bold text-indigo-900">Tracking Activo</p>
                     <p className="text-[10px] text-indigo-700">La extensión registra tu progreso automáticamente.</p>
                  </div>
               </div>

               {/* AI Summary */}
               {selectedResource.aiSummary && (
                  <div className="relative p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100">
                     <div className="absolute top-3 right-3 text-purple-400"><Sparkles size={14} /></div>
                     <h4 className="text-xs font-bold text-purple-700 uppercase mb-2">Resumen AI</h4>
                     <p className="text-sm text-gray-600 leading-relaxed">{selectedResource.aiSummary}</p>
                  </div>
               )}

               {/* Linked Node */}
               <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-3">Vinculado a</h4>
                  <div 
                    onClick={() => { onNavigate('DOJO'); /* Ideally pass node ID */ }}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-sm cursor-pointer transition-all"
                  >
                     <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <MapPin size={18} />
                     </div>
                     <div>
                        <p className="font-bold text-sm text-gray-900">{selectedResource.nodeTitle}</p>
                        <p className="text-xs text-gray-500">{selectedResource.cluster}</p>
                     </div>
                  </div>
               </div>

           </div>
           
           {/* Footer Actions */}
           <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-col gap-2">
               <button className="text-xs text-gray-500 hover:text-red-500 py-2">Eliminar de mi biblioteca</button>
           </div>
        </div>
     );
  };

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* HEADER */}
       <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">Biblioteca</h1>
                  
                  {/* Extension Indicator */}
                  <div className="flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                      <CheckCircle2 size={12} /> Extensión Conectada
                  </div>
               </div>

               {/* Smart Tabs & Search */}
               <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
                   <div className="flex gap-1 bg-gray-100/80 p-1 rounded-lg">
                       {['ALL', 'FAVORITES', 'IN_PROGRESS'].map(tab => (
                           <button
                             key={tab}
                             onClick={() => setActiveTab(tab as any)}
                             className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                           >
                              {tab === 'ALL' ? 'Todos' : tab === 'FAVORITES' ? 'Favoritos' : 'En Curso'}
                           </button>
                       ))}
                   </div>

                   <div className="relative w-full md:w-64">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                       <input 
                         type="text" 
                         placeholder="Buscar recurso..." 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all"
                       />
                   </div>
               </div>
           </div>
           
           {/* FILTERS BAR */}
           <div className="border-t border-gray-100 bg-white/50 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-4 overflow-x-auto">
               <div className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase mr-2">
                   <Filter size={12} /> Filtros:
               </div>
               
               <select 
                 className="bg-transparent text-sm text-gray-600 font-medium border-none focus:ring-0 cursor-pointer hover:text-indigo-600"
                 value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
               >
                   <option value="ALL">Todos los tipos</option>
                   <option value="VIDEO">Vídeos</option>
                   <option value="ARTICLE">Artículos</option>
                   <option value="BOOK">Libros / PDFs</option>
               </select>

               <div className="w-px h-4 bg-gray-200"></div>

               <select 
                 className="bg-transparent text-sm text-gray-600 font-medium border-none focus:ring-0 cursor-pointer hover:text-indigo-600"
                 value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
               >
                   <option value="ALL">Cualquier estado</option>
                   <option value="TODO">Pendiente</option>
                   <option value="IN_PROGRESS">En curso</option>
                   <option value="COMPLETED">Completado</option>
               </select>

               <div className="ml-auto flex items-center gap-1 bg-gray-100 rounded p-0.5">
                   <button onClick={() => setViewMode('GRID')} className={`p-1.5 rounded ${viewMode === 'GRID' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                       <LayoutGrid size={16} />
                   </button>
                   <button onClick={() => setViewMode('LIST')} className={`p-1.5 rounded ${viewMode === 'LIST' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}>
                       <List size={16} />
                   </button>
               </div>
           </div>
       </header>

       {/* MAIN CONTENT */}
       <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
           {viewMode === 'GRID' ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                   {filteredResources.map(renderGridCard)}
               </div>
           ) : (
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                   {filteredResources.map(renderListItem)}
               </div>
           )}

           {filteredResources.length === 0 && (
               <div className="text-center py-20">
                   <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                       <Search size={32} />
                   </div>
                   <h3 className="text-gray-900 font-bold mb-1">No se encontraron recursos</h3>
                   <p className="text-gray-500 text-sm">Prueba a ajustar los filtros o buscar otra cosa.</p>
               </div>
           )}
       </div>

       {/* DETAIL PANEL */}
       {renderDetailPanel()}
    </div>
  );
};

export default LibraryPage;
