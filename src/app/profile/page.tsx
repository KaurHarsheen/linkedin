'use client';
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

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

const stories = [
  { name: 'iihammahen', img: 'https://randomuser.me/api/portraits/men/33.jpg' },
  { name: 'laura.ptr', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'orlandoo', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'veronica', img: 'https://randomuser.me/api/portraits/women/46.jpg' },
  { name: 'erlanggaa', img: 'https://randomuser.me/api/portraits/men/47.jpg' },
];

const posts = [
  {
    user: { name: 'Erlangga Fernando', title: 'Business analyst', img: 'https://randomuser.me/api/portraits/men/48.jpg' },
    image: 'https://placehold.co/600x300',
    text: 'Working on a new dashboard for a client! Loving the process.',
    actions: ['like', 'comment', 'share'],
    cta: 'Hire me',
  },
];

const calendar = {
  month: 'May 2022',
  days: [9,10,11,13,14,15,16],
  events: [
    { day: 10, title: 'Google job interview', time: '09.00 - 10.00', location: 'Zoom Meeting' },
    { day: 11, title: 'Meeting with client', time: '20.00 - End', location: 'Starbucks' },
    { day: 14, title: 'Landing page creation date', time: '09.00 - 10.00', location: 'Zoom Meeting' },
  ]
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [loginCounts, setLoginCounts] = useState<{ [date: string]: number }>({});
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      // Log login
      axios.post("/api/logLogin", { userId: session.user.email, date: new Date().toISOString().slice(0, 10) });

      // Fetch login history
      axios.get("/api/getLogins", { params: { userId: session.user.email } }).then(res => {
        setLoginCounts(res.data.logins);
      });

      // Fetch Google Calendar events
      if (session.accessToken) {
        axios.get("/api/fetchEvents", {
          headers: { Authorization: `Bearer ${session.accessToken}` }
        }).then(res => {
          setEvents(res.data.events);
        });
      }
    }
  }, [session]);

  // Helper to get color intensity for a day
  const getDayColor = (day: number, month: string) => {
    const year = new Date().getFullYear();
    const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1;
    const dayStr = `${year}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const count = loginCounts[dayStr] || 0;
    if (count >= 5) return 'bg-blue-900 text-white';
    if (count >= 3) return 'bg-blue-700 text-white';
    if (count >= 1) return 'bg-blue-400 text-white';
    return 'bg-skillora-bg text-skillora-blue';
  };

  return (
    <div className="container mx-auto px-2 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar */}
      <aside className="lg:col-span-3 space-y-6">
        <div className="card flex flex-col items-center text-center">
          <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full mb-3 object-cover" />
          <h2 className="text-xl font-bold mt-2">{user.name}</h2>
          <p className="text-sm text-skillora-blue mb-4">{user.title}</p>
          <div className="flex justify-center space-x-6 mb-4">
            <div>
              <div className="font-bold text-lg">{(user.followers/1000).toFixed(1)}k</div>
              <div className="text-xs text-skillora-blue">Followers</div>
            </div>
            <div>
              <div className="font-bold text-lg">{user.following}</div>
              <div className="text-xs text-skillora-blue">Following</div>
            </div>
            <div>
              <div className="font-bold text-lg">{user.projects}+</div>
              <div className="text-xs text-skillora-blue">Project</div>
            </div>
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-left mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-skillora-bg text-skillora-blue rounded-full text-xs">{skill}</span>
              ))}
            </div>
          </div>
          <div className="w-full mt-4">
            <h3 className="font-semibold text-left mb-2">Your portfolio</h3>
            <div className="flex gap-2">
              {user.portfolio.map(item => (
                <img key={item.title} src={item.img} alt={item.title} className="w-20 h-14 rounded-lg object-cover" />
              ))}
            </div>
          </div>
          {/* Achievements Section */}
          <div className="w-full mt-6">
            <h3 className="font-semibold text-left mb-2">Achievements</h3>
            <div className="grid grid-cols-4 gap-3 mb-2">
              <img src="/badges/badge1.png" alt="badge1" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src="/badges/badge2.png" alt="badge2" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src="/badges/badge3.png" alt="badge3" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src="/badges/badge4.png" alt="badge4" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src="/badges/badge5.png" alt="badge5" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src="/badges/badge6.png" alt="badge6" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src="/badges/badge7.png" alt="badge7" className="w-12 h-12 rounded-full border-2 border-white" />
              <img src="/badges/badge8.png" alt="badge8" className="w-12 h-12 rounded-full border-2 border-white" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-xs bg-gray-700 text-white px-2 py-1 rounded mr-2">Beta</span>
              <span className="text-xs text-gray-400">Send feedback</span>
            </div>
          </div>
          {/* Quick Links Section */}
          <div className="w-full mt-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">▦</span>
                  <span className="text-gray-300">Projects</span>
                </div>
                <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-white">+</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <span className="text-gray-300">Team</span>
                </div>
                <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-white">+</button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  <span className="text-gray-300">Messages</span>
                </div>
                <button className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 text-white">+</button>
              </div>
              {/* Add more quick links as needed */}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <main className="lg:col-span-6 space-y-6">
        {/* Watched Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="card flex flex-col items-center py-4">
            <span className="text-sm text-gray-400 mb-1">2/8 watched</span>
            <span className="font-semibold text-lg">UI/UX Design</span>
          </div>
          <div className="card flex flex-col items-center py-4">
            <span className="text-sm text-gray-400 mb-1">3/8 watched</span>
            <span className="font-semibold text-lg">Branding</span>
          </div>
          <div className="card flex flex-col items-center py-4">
            <span className="text-sm text-gray-400 mb-1">6/12 watched</span>
            <span className="font-semibold text-lg">Front End</span>
          </div>
        </div>
        {/* Stats Section */}
        <div className="card flex justify-between items-center py-10 px-8 mb-8">
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
            <div className="card min-w-[320px]">
              <span className="text-xs bg-blue-600 px-2 py-1 rounded text-white mb-2 inline-block">FRONT END</span>
              <div className="font-semibold mb-1">Beginner's Guide to Becoming a Professional Front-End Developer</div>
              <div className="flex items-center mt-2">
                <img src="https://randomuser.me/api/portraits/men/49.jpg" alt="Leonardo samsul" className="w-7 h-7 rounded-full mr-2" />
                <span className="text-xs">Leonardo samsul</span>
                <span className="text-xs ml-2 text-gray-400">Mentor</span>
              </div>
            </div>
            <div className="card min-w-[320px]">
              <span className="text-xs bg-purple-400 px-2 py-1 rounded text-white mb-2 inline-block">UI/UX DESIGN</span>
              <div className="font-semibold mb-1">Optimizing User Experience with the Best UI/UX Design</div>
              <div className="flex items-center mt-2">
                <img src="https://randomuser.me/api/portraits/men/50.jpg" alt="Bayu Salto" className="w-7 h-7 rounded-full mr-2" />
                <span className="text-xs">Bayu Salto</span>
                <span className="text-xs ml-2 text-gray-400">Mentor</span>
              </div>
            </div>
            <div className="card min-w-[320px]">
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
        <div className="card p-4 mb-6">
          <div className="flex items-center mb-2">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" className="w-10 h-10 rounded-full mr-3" />
            <select className="bg-transparent border border-gray-700 rounded px-2 py-1 text-sm mr-3" title="Note type">
              <option>Usual text</option>
              <option>Important</option>
              <option>To-do</option>
            </select>
            <div className="flex-1 flex items-center space-x-2">
              <button className="font-bold">B</button>
              <button className="italic">I</button>
              <button className="underline">U</button>
              <button>•</button>
              <button>1.</button>
              <button>↔</button>
              <button>📎</button>
              <button>😊</button>
              <button>AI assistant</button>
            </div>
          </div>
          <textarea className="w-full bg-transparent border border-gray-700 rounded p-2 text-sm mb-4" rows={3} placeholder="Type your comment here or @ to mention and notify someone" />
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
        {/* Posts */}
      </main>

      {/* Right Sidebar */}
      <aside className="lg:col-span-3 space-y-6">
        {/* Calendar */}
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{calendar.month}</span>
            <button className="text-skillora-blue">{'>'}</button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {[...Array(31)].map((_, i) => (
              <span
                key={i}
                className={`rounded-full px-2 py-1 ${getDayColor(i + 1, calendar.month)}`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        {/* Upcoming Schedule */}
        <div className="card">
          <h3 className="font-semibold mb-2">Upcoming schedule</h3>
          <ul className="space-y-2">
            {events.length === 0 && <li className="text-gray-400 text-sm">No upcoming events</li>}
            {events.map((event, idx) => (
              <li key={idx} className="flex flex-col p-2 rounded-lg bg-skillora-bg">
                <span className="font-semibold text-skillora-blue">{event.summary}</span>
                <span className="text-xs">
                  {event.start?.dateTime
                    ? new Date(event.start.dateTime).toLocaleString()
                    : event.start?.date}
                  {event.location && <> · {event.location}</>}
                </span>
              </li>
            ))}
          </ul>
          <button className="btn-secondary mt-4 w-full">View all schedule</button>
        </div>
        {/* Current Tasks */}
        <div className="card p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Current Tasks <span className="text-xs font-normal">Done 30%</span></h3>
            <button className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors">Edit</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition">
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3 text-lg">📝</span>
                <div>
                  <div className="font-medium">Product Review for UI8 Market</div>
                  <div className="text-xs text-gray-400">In progress</div>
                </div>
              </div>
              <span className="text-xs text-orange-400 font-semibold">4h</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition">
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3 text-lg">🔍</span>
                <div>
                  <div className="font-medium">UX Research for Product</div>
                  <div className="text-xs text-gray-400">On hold</div>
                </div>
              </div>
              <span className="text-xs text-blue-400 font-semibold">8h</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition">
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
  );
} 