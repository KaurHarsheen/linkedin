import React, { useState, useEffect } from 'react';

const ProfileDashboard = () => {
  const [loginCounts, setLoginCounts] = useState({});
  const [events, setEvents] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('Usual text');

  const user = {
    name: 'Pratama Aksara',
    title: 'Senior UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    followers: 12000,
    following: 990,
    projects: 50,
    skills: [
      'design', 'website', 'mobile app', 'wireframing', 'web design', 'uiux', 'motion graph', 'logo', '3d'
    ],
    portfolio: [
      { img: 'https://placehold.co/120x80', title: 'Dashboard UI' },
      { img: 'https://placehold.co/120x80', title: 'Mobile App' },
    ]
  };

  const calendar = {
    month: 'May 2022',
    days: [9,10,11,13,14,15,16],
    events: [
      { day: 10, title: 'Google job interview', time: '09.00 - 10.00', location: 'Zoom Meeting' },
      { day: 11, title: 'Meeting with client', time: '20.00 - End', location: 'Starbucks' },
      { day: 14, title: 'Landing page creation date', time: '09.00 - 10.00', location: 'Zoom Meeting' },
    ]
  };

  // Simulated API calls
  const mockAxios = {
    post: (url, data) => {
      console.log(`POST ${url}:`, data);
      return Promise.resolve({ data: {} });
    },
    get: (url, config) => {
      console.log(`GET ${url}:`, config);
      if (url.includes('getLogins')) {
        return Promise.resolve({ 
          data: { 
            logins: {
              '2025-06-21': 3,
              '2025-06-20': 1,
              '2025-06-19': 5,
              '2025-06-18': 2
            }
          }
        });
      }
      if (url.includes('fetchEvents')) {
        return Promise.resolve({
          data: {
            events: [
              {
                summary: 'Team Meeting',
                start: { dateTime: '2025-06-22T10:00:00Z' },
                location: 'Conference Room A'
              },
              {
                summary: 'Client Presentation',
                start: { dateTime: '2025-06-23T14:00:00Z' },
                location: 'Zoom'
              }
            ]
          }
        });
      }
      return Promise.resolve({ data: {} });
    }
  };

  const getDayColor = (day, month) => {
    const year = new Date().getFullYear();
    const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1;
    const dayStr = `${year}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const count = loginCounts[dayStr] || 0;
    if (count >= 5) return 'bg-blue-900 text-white';
    if (count >= 3) return 'bg-blue-700 text-white';
    if (count >= 1) return 'bg-blue-400 text-white';
    return 'bg-gray-100 text-blue-600';
  };

  const saveNote = () => {
    if (noteText.trim()) {
      console.log('Note saved:', { type: noteType, text: noteText });
      setNoteText('');
      // In a real app, this would make an API call
    }
  };

  const cancelNote = () => {
    setNoteText('');
    console.log('Note cancelled');
  };

  useEffect(() => {
    // Fetch login history
    mockAxios.get("/api/getLogins", { 
      params: { userId: 'user@example.com' } 
    }).then(res => {
      setLoginCounts(res.data.logins);
    });

    // Fetch Google Calendar events
    mockAxios.get("/api/fetchEvents", {
      headers: { Authorization: `Bearer mock-access-token` }
    }).then(res => {
      setEvents(res.data.events);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-2 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center">
            <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full mb-3 object-cover" />
            <h2 className="text-xl font-bold mt-2">{user.name}</h2>
            <p className="text-sm text-blue-400 mb-4">{user.title}</p>
            
            <div className="flex justify-center space-x-6 mb-4">
              <div>
                <div className="font-bold text-lg">{(user.followers/1000).toFixed(1)}k</div>
                <div className="text-xs text-blue-400">Followers</div>
              </div>
              <div>
                <div className="font-bold text-lg">{user.following}</div>
                <div className="text-xs text-blue-400">Following</div>
              </div>
              <div>
                <div className="font-bold text-lg">{user.projects}+</div>
                <div className="text-xs text-blue-400">Project</div>
              </div>
            </div>
            
            <div className="w-full mb-4">
              <h3 className="font-semibold text-left mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700 text-blue-400 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="w-full mb-4">
              <h3 className="font-semibold text-left mb-2">Your portfolio</h3>
              <div className="flex gap-2">
                {user.portfolio.map((item, index) => (
                  <img key={index} src={item.img} alt={item.title} className="w-20 h-14 rounded-lg object-cover" />
                ))}
              </div>
            </div>

            <div className="w-full mb-4">
              <h3 className="font-semibold text-left mb-2">Achievements</h3>
              <div className="grid grid-cols-4 gap-3 mb-2">
                {Array.from({length: 8}, (_, i) => (
                  <div key={i} className="w-12 h-12 rounded-full bg-gray-600 border-2 border-white flex items-center justify-center text-xs">
                    {i+1}
                  </div>
                ))}
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded mr-2">Beta</span>
                <span className="text-xs text-gray-400">Send feedback</span>
              </div>
            </div>

            <div className="w-full mb-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">▦</span>
                    <span className="text-gray-300">Projects</span>
                  </div>
                  <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">+</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👥</span>
                    <span className="text-gray-300">Team</span>
                  </div>
                  <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">+</button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <span className="text-gray-300">Messages</span>
                  </div>
                  <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">+</button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="lg:col-span-6 space-y-6">
          {/* Watched Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center py-4">
              <span className="text-sm text-gray-400 mb-1">2/8 watched</span>
              <span className="font-semibold text-lg">UI/UX Design</span>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center py-4">
              <span className="text-sm text-gray-400 mb-1">3/8 watched</span>
              <span className="font-semibold text-lg">Branding</span>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center py-4">
              <span className="text-sm text-gray-400 mb-1">6/12 watched</span>
              <span className="font-semibold text-lg">Front End</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center py-10 px-8 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">18</span>
              <span className="text-lg">Finished</span>
              <span className="text-green-400 text-base">+8 tasks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">31h</span>
              <span className="text-lg">Tracked</span>
              <span className="text-red-400 text-base">-6 hours</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">93%</span>
              <span className="text-lg">Efficiency</span>
              <span className="text-green-400 text-base">+12%</span>
            </div>
          </div>

          {/* Continue Watching */}
          <div className="mb-4">
            <h2 className="font-semibold text-lg mb-2">Continue Watching</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              <div className="bg-gray-800 rounded-lg p-4 min-w-[320px]">
                <span className="text-xs bg-blue-600 px-2 py-1 rounded text-white mb-2 inline-block">FRONT END</span>
                <div className="font-semibold mb-1">Beginner's Guide to Becoming a Professional Front-End Developer</div>
                <div className="flex items-center mt-2">
                  <img src="https://randomuser.me/api/portraits/men/49.jpg" alt="Leonardo samsul" className="w-7 h-7 rounded-full mr-2" />
                  <span className="text-xs">Leonardo samsul</span>
                  <span className="text-xs ml-2 text-gray-400">Mentor</span>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 min-w-[320px]">
                <span className="text-xs bg-purple-400 px-2 py-1 rounded text-white mb-2 inline-block">UI/UX DESIGN</span>
                <div className="font-semibold mb-1">Optimizing User Experience with the Best UI/UX Design</div>
                <div className="flex items-center mt-2">
                  <img src="https://randomuser.me/api/portraits/men/50.jpg" alt="Bayu Salto" className="w-7 h-7 rounded-full mr-2" />
                  <span className="text-xs">Bayu Salto</span>
                  <span className="text-xs ml-2 text-gray-400">Mentor</span>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 min-w-[320px]">
                <span className="text-xs bg-pink-400 px-2 py-1 rounded text-white mb-2 inline-block">BRANDING</span>
                <div className="font-semibold mb-1">Reviving and Refreshing Company Image</div>
                <div className="flex items-center mt-2">
                  <img src="https://randomuser.me/api/portraits/men/51.jpg" alt="Padhang Satrio" className="w-7 h-7 rounded-full mr-2" />
                  <span className="text-xs">Padhang Satrio</span>
                  <span className="text-xs ml-2 text-gray-400">Mentor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" className="w-10 h-10 rounded-full mr-3" />
              <select 
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm mr-3 text-white" 
                title="Note type"
                value={noteType}
                onChange={(e) => setNoteType(e.target.value)}
              >
                <option value="Usual text">Usual text</option>
                <option value="Important">Important</option>
                <option value="To-do">To-do</option>
              </select>
              <div className="flex-1 flex items-center space-x-2">
                <button className="font-bold hover:text-blue-400 transition-colors">B</button>
                <button className="italic hover:text-blue-400 transition-colors">I</button>
                <button className="underline hover:text-blue-400 transition-colors">U</button>
                <button className="hover:text-blue-400 transition-colors">•</button>
                <button className="hover:text-blue-400 transition-colors">1.</button>
                <button className="hover:text-blue-400 transition-colors">↔</button>
                <button className="hover:text-blue-400 transition-colors">📎</button>
                <button className="hover:text-blue-400 transition-colors">😊</button>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">AI assistant</button>
              </div>
            </div>
            <textarea 
              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-sm mb-4 text-white placeholder-gray-400" 
              rows="3" 
              placeholder="Type your comment here or @ to mention and notify someone"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <div className="flex space-x-2">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors" 
                onClick={saveNote}
                disabled={!noteText.trim()}
              >
                Save
              </button>
              <button 
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors" 
                onClick={cancelNote}
              >
                Cancel
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Calendar */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{calendar.month}</span>
              <button className="text-blue-400 hover:text-blue-300 transition-colors">{'>'}</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                <span key={d} className="text-gray-400">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({length: 31}, (_, i) => (
                <span key={i} className={`rounded-full px-2 py-1 text-xs cursor-pointer transition-colors ${getDayColor(i + 1, calendar.month)}`}>
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Upcoming schedule</h3>
            <ul className="space-y-2">
              {events.length === 0 ? (
                <li className="text-gray-400 text-sm">No upcoming events</li>
              ) : (
                events.map((event, index) => (
                  <li key={index} className="flex flex-col p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                    <span className="font-semibold text-blue-400">{event.summary}</span>
                    <span className="text-xs text-gray-300">
                      {event.start?.dateTime ? 
                        new Date(event.start.dateTime).toLocaleString() : 
                        event.start?.date || ''}
                      {event.location ? ` · ${event.location}` : ''}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mt-4 w-full">
              View all schedule
            </button>
          </div>

          {/* Current Tasks */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Current Tasks <span className="text-xs font-normal">Done 30%</span></h3>
              <button className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors">Edit</button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3 text-lg">📝</span>
                  <div>
                    <div className="font-medium">Product Review for UI8 Market</div>
                    <div className="text-xs text-gray-400">In progress</div>
                  </div>
                </div>
                <span className="text-xs text-orange-400 font-semibold">4h</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3 text-lg">🔍</span>
                  <div>
                    <div className="font-medium">UX Research for Product</div>
                    <div className="text-xs text-gray-400">On hold</div>
                  </div>
                </div>
                <span className="text-xs text-blue-400 font-semibold">8h</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3 text-lg">💻</span>
                  <div>
                    <div className="font-medium">App design and development</div>
                    <div className="text-xs text-gray-400">Done</div>
                  </div>
                </div>
                <span className="text-xs text-green-400 font-semibold">32h</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProfileDashboard;