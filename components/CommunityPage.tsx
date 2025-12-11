
import React, { useState } from 'react';
import { 
  Users, Trophy, Target, Crown, Shield, MessageSquare, 
  Calendar, ArrowUp, ChevronRight, UserPlus, LogOut, Send,
  Lock, Unlock
} from 'lucide-react';
import { PageView, LeaderboardEntry, Guild, Challenge } from '../types';
import { MOCK_LEADERBOARD, MOCK_GUILDS, MOCK_CHALLENGES, MOCK_USER } from '../constants';

interface CommunityPageProps {
  onNavigate: (page: PageView) => void;
}

type TabType = 'LEADERBOARD' | 'GUILDS' | 'CHALLENGES';

const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('GUILDS');
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(
    MOCK_GUILDS.find(g => g.userIsMember) || null
  );

  // --- RENDERERS ---

  const renderLeaderboard = () => {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
         {/* Filters Header */}
         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
               <Trophy className="text-yellow-500" /> Leaderboard Global
            </h2>
            <div className="flex bg-gray-100 p-1 rounded-lg">
               <button className="px-3 py-1.5 bg-white text-gray-800 text-xs font-bold rounded shadow-sm">Semanal</button>
               <button className="px-3 py-1.5 text-gray-500 text-xs font-medium hover:text-gray-800">Mensual</button>
               <button className="px-3 py-1.5 text-gray-500 text-xs font-medium hover:text-gray-800">Histórico</button>
            </div>
         </div>

         {/* Stats Highlight */}
         <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg mb-8 flex justify-between items-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <div>
                <p className="text-indigo-200 text-sm font-medium mb-1">Tu posición actual</p>
                <div className="flex items-baseline gap-2">
                   <span className="text-4xl font-black">#17</span>
                   <span className="text-sm font-medium opacity-80">de 2,430</span>
                </div>
             </div>
             <div className="text-right z-10">
                <p className="text-indigo-200 text-sm font-medium mb-1">XP Semanal</p>
                <span className="text-2xl font-bold">1,240 XP</span>
                <p className="text-xs text-indigo-300 mt-1 flex items-center justify-end gap-1">
                   <ArrowUp size={12} /> A 80 XP del #16
                </p>
             </div>
         </div>

         {/* Ranking List */}
         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             {MOCK_LEADERBOARD.map((user, idx) => (
                <div 
                  key={user.id} 
                  className={`flex items-center gap-4 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${user.isCurrentUser ? 'bg-indigo-50/50' : ''}`}
                >
                   <div className="w-8 text-center font-bold text-gray-400">
                      {user.rank <= 3 ? (
                        <Crown size={20} className={user.rank === 1 ? 'text-yellow-400 mx-auto' : user.rank === 2 ? 'text-gray-400 mx-auto' : 'text-amber-600 mx-auto'} fill="currentColor" />
                      ) : (
                        `#${user.rank}`
                      )}
                   </div>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-sm ${user.rank === 1 ? 'bg-yellow-400 ring-2 ring-yellow-200' : 'bg-indigo-500'}`}>
                      {user.avatarInitials}
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center gap-2">
                         <h4 className={`font-bold ${user.isCurrentUser ? 'text-indigo-700' : 'text-gray-900'}`}>
                            {user.name} {user.isCurrentUser && '(Tú)'}
                         </h4>
                         {user.guild && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{user.guild}</span>}
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                         🔥 racha de {user.streak} días
                      </p>
                   </div>
                   <div className="text-right">
                      <span className="block font-bold text-gray-800">{user.xp.toLocaleString()} XP</span>
                   </div>
                </div>
             ))}
             {/* Simulating sticky user at bottom if not in view could be done here visually, but mock data includes user at #17 */}
         </div>
      </div>
    );
  };

  const renderGuilds = () => {
    if (!selectedGuild) {
      // List View (Discovery)
      return (
        <div className="animate-fade-in">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Gremios Disponibles</h2>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow transition-all">
                 Crear Gremio
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_GUILDS.map(guild => (
                 <div key={guild.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Shield size={24} />
                       </div>
                       <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded">
                          {guild.isPrivate ? <Lock size={12}/> : <Unlock size={12}/>}
                          {guild.isPrivate ? 'Privado' : 'Abierto'}
                       </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{guild.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{guild.description}</p>
                    
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                       <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Users size={14} /> {guild.memberCount} miembros
                       </span>
                       {guild.userIsMember ? (
                          <button 
                            onClick={() => setSelectedGuild(guild)} 
                            className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
                          >
                             Ver mi gremio
                          </button>
                       ) : (
                          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800">
                             Solicitar acceso
                          </button>
                       )}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      );
    }

    // Detail View (My Guild)
    return (
      <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
         {/* Main Guild Column */}
         <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
             {/* Header */}
             <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6 flex justify-between items-start">
                 <div>
                    <button onClick={() => setSelectedGuild(null)} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-2">
                       ← Volver a lista
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                       <Shield className="text-indigo-600" /> {selectedGuild.name}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm">{selectedGuild.description}</p>
                 </div>
                 <div className="flex flex-col gap-2">
                    <button className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded border border-transparent hover:border-red-100 flex items-center gap-1 transition-colors">
                       <LogOut size={12} /> Salir
                    </button>
                    <button className="text-xs text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded border border-indigo-100 flex items-center gap-1 transition-colors">
                       <UserPlus size={12} /> Invitar
                    </button>
                 </div>
             </div>

             {/* Tablón / Chat */}
             <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                 <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                     <MessageSquare size={18} className="text-gray-400" />
                     <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Tablón de Gremio</h3>
                 </div>
                 
                 <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     {selectedGuild.posts?.map(post => (
                        <div key={post.id} className="flex gap-3 animate-fade-in-up">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${post.author === MOCK_USER.name ? 'bg-indigo-500' : 'bg-gray-400'}`}>
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2">
                                   <span className="font-bold text-sm text-gray-900">{post.author}</span>
                                   <span className="text-xs text-gray-400">{post.timestamp}</span>
                                </div>
                                <div className="bg-gray-50 rounded-lg rounded-tl-none p-3 text-sm text-gray-700 mt-1 border border-gray-100">
                                   {post.content}
                                </div>
                            </div>
                        </div>
                     ))}
                 </div>

                 <div className="p-4 border-t border-gray-100 flex gap-2">
                     <input type="text" placeholder="Escribe un mensaje al gremio..." className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400" />
                     <button className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        <Send size={18} />
                     </button>
                 </div>
             </div>
         </div>

         {/* Sidebar Guild Column */}
         <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-1">
             {/* Activity Feed */}
             <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-4">Actividad Reciente</h3>
                <ul className="space-y-4">
                   {selectedGuild.activityFeed?.map((act, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2 relative pl-4 border-l-2 border-gray-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 absolute -left-[4px] top-1.5"></span>
                          {act}
                      </li>
                   ))}
                </ul>
             </div>

             {/* Guild Leaderboard */}
             <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                 <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-4">Miembros Top</h3>
                 <div className="space-y-3">
                    {selectedGuild.members?.map((member, i) => (
                       <div key={member.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                             <span className="text-gray-400 font-bold w-4 text-center">{i + 1}</span>
                             <span className="font-medium text-gray-800">{member.name}</span>
                             {member.role === 'LEADER' && <Crown size={12} className="text-yellow-500" />}
                          </div>
                          <span className="font-bold text-indigo-600">{member.xpContribution} XP</span>
                       </div>
                    ))}
                 </div>
             </div>
         </div>
      </div>
    );
  };

  const renderChallenges = () => {
    return (
       <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                 <Target className="text-red-500" /> Retos Activos
              </h2>
              <span className="text-sm text-gray-500">¡Completa retos para ganar gemas extra!</span>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {MOCK_CHALLENGES.map(challenge => (
                 <div key={challenge.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center">
                     <div className={`p-4 rounded-full shrink-0 ${challenge.type === 'GUILD' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                        {challenge.type === 'GUILD' ? <Shield size={32} /> : <Target size={32} />}
                     </div>
                     
                     <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-1">
                           <h3 className="font-bold text-lg text-gray-900">{challenge.title}</h3>
                           <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${challenge.type === 'GUILD' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'}`}>
                              {challenge.type === 'GUILD' ? 'Reto de Gremio' : 'Solo'}
                           </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                        
                        {/* Progress */}
                        <div className="mb-2 flex justify-between text-xs font-bold text-gray-500">
                           <span>{challenge.currentProgress} / {challenge.target} {challenge.unit}</span>
                           <span>{Math.round((challenge.currentProgress / challenge.target) * 100)}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                           <div 
                             className={`h-full rounded-full transition-all duration-500 ${challenge.type === 'GUILD' ? 'bg-purple-500' : 'bg-green-500'}`} 
                             style={{ width: `${(challenge.currentProgress / challenge.target) * 100}%` }}
                           ></div>
                        </div>
                     </div>

                     <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                        <div className="text-center">
                           <span className="block text-xs text-gray-400 uppercase font-bold">Recompensa</span>
                           <span className="font-bold text-indigo-600 text-sm">{challenge.reward}</span>
                        </div>
                        <div className="text-center">
                           <span className="block text-xs text-gray-400 uppercase font-bold">Quedan</span>
                           <span className="font-bold text-gray-800 text-sm">{challenge.daysLeft} días</span>
                        </div>
                     </div>
                 </div>
              ))}
           </div>
       </div>
    );
  };

  // --- MAIN RENDER ---

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
       {/* Simple Header */}
       <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-8 h-16 flex items-center justify-between">
           <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
               Gremio & Comunidad
           </h1>
           <div className="flex bg-gray-100 p-1 rounded-lg">
               <button 
                  onClick={() => setActiveTab('GUILDS')}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'GUILDS' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
               >
                  Mis Gremios
               </button>
               <button 
                  onClick={() => setActiveTab('LEADERBOARD')}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'LEADERBOARD' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
               >
                  Leaderboard
               </button>
               <button 
                  onClick={() => setActiveTab('CHALLENGES')}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'CHALLENGES' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
               >
                  Retos
               </button>
           </div>
       </header>

       <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'LEADERBOARD' && renderLeaderboard()}
          {activeTab === 'GUILDS' && renderGuilds()}
          {activeTab === 'CHALLENGES' && renderChallenges()}
       </div>
    </div>
  );
};

export default CommunityPage;
