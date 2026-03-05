import React, { useState, useMemo } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  Building2, Users, FileText, Newspaper, Home, 
  Search, Map as MapIcon, Shield, ExternalLink,
  Menu, X, ChevronRight, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NEWS_ITEMS = [
  { id: 1, title: "New Business Grant Program Launched", date: "2026-03-01", category: "Economy", summary: "The State Government is offering up to $50,000 for new startups in the downtown district." },
  { id: 2, title: "Public Safety Update: New Patrol Routes", date: "2026-02-28", category: "Safety", summary: "Law enforcement will increase presence in the industrial zone following recent reports." },
  { id: 3, title: "Citizen Registration Drive", date: "2026-02-25", category: "General", summary: "All residents are encouraged to update their ID cards at the City Hall this weekend." }
];

const CITIZENS = [
  { id: "C-1001", name: "John Doe", status: "Active", occupation: "Truck Driver", joined: "2025-12-10" },
  { id: "C-1002", name: "Sarah Miller", status: "Active", occupation: "Lawyer", joined: "2026-01-05" },
  { id: "C-1003", name: "Michael Ross", status: "Active", occupation: "Mechanic", joined: "2026-01-15" },
  { id: "C-1004", name: "Elena Rodriguez", status: "Inactive", occupation: "Doctor", joined: "2025-11-20" },
  { id: "C-1005", name: "David Chen", status: "Active", occupation: "Business Owner", joined: "2026-02-01" },
  { id: "C-1006", name: "Lisa Thompson", status: "Active", occupation: "Police Officer", joined: "2026-02-10" },
];

const BUSINESSES = [
  { id: 1, name: "Los Santos Customs", owner: "Michael Ross", type: "Automotive", x: 45, y: 60 },
  { id: 2, name: "Bean Machine", owner: "Sarah Miller", type: "Cafe", x: 30, y: 40 },
  { id: 3, name: "Ammunation", owner: "State Gov", type: "Retail", x: 70, y: 30 },
  { id: 4, name: "Vanilla Unicorn", owner: "Unknown", type: "Entertainment", x: 55, y: 80 },
  { id: 5, name: "Maze Bank", owner: "State Gov", type: "Finance", x: 50, y: 50 },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { name: 'Main', path: '/', icon: Home },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Registration', path: '/registration', icon: FileText },
    { name: 'Citizens', path: '/citizens', icon: Users },
    { name: 'Business', path: '/business', icon: Building2 },
  ];
  return (
    <nav className="bg-[#002868] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-full"><Shield className="w-6 h-6 text-[#002868]" /></div>
            <span className="font-bold text-lg tracking-tight uppercase">State Portal</span>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className={cn("px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2", location.pathname === link.path ? "bg-white/10 text-[#f1c40f]" : "hover:bg-white/5 text-white/80 hover:text-white")}>
                  <link.icon className="w-4 h-4" />{link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md text-white hover:bg-white/10">{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>
      </div>
      <AnimatePresence>{isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#002868]/95 border-t border-white/10 overflow-hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className={cn("block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3", location.pathname === link.path ? "bg-white/10 text-[#f1c40f]" : "hover:bg-white/5 text-white")}>
                <link.icon className="w-5 h-5" />{link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}</AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 border-b border-slate-200 pb-4">
    <h1 className="text-3xl font-bold text-[#002868] tracking-tight">{title}</h1>
    {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
  </div>
);

const MainPage = () => (
  <div className="space-y-12 py-8">
    <section className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
      <img src="https://picsum.photos/seed/government/1920/1080" alt="State Building" className="absolute inset-0 w-full h-full object-cover brightness-50" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Shield className="w-20 h-20 text-[#f1c40f] mx-auto mb-6 drop-shadow-lg" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter uppercase">State of San Andreas</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">Official Government Portal for Citizen Support, Business Licensing, and Public Records.</p>
        </motion.div>
      </div>
    </section>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { title: "Public Records", icon: Users, desc: "Access the database of registered citizens and public officials." },
        { title: "Business Hub", icon: Building2, desc: "Explore the state's economic landscape and registered enterprises." },
        { title: "Legal Services", icon: FileText, desc: "Apply for licenses, permits, and official state documentation." }
      ].map((card, i) => (
        <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-[#002868]/5 rounded-xl flex items-center justify-center mb-4"><card.icon className="w-6 h-6 text-[#002868]" /></div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{card.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const NewsPage = () => (
  <div className="py-8">
    <SectionHeader title="Government Press Releases" subtitle="The latest updates from the Governor's office and state departments." />
    <div className="space-y-6">
      {NEWS_ITEMS.map((item, i) => (
        <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 hover:border-[#002868]/30 transition-colors cursor-pointer group">
          <div className="md:w-32 flex-shrink-0">
            <span className="text-xs font-bold text-[#002868] uppercase tracking-widest block mb-1">{item.category}</span>
            <span className="text-sm text-slate-400 font-mono">{item.date}</span>
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#002868] transition-colors">{item.title}</h3>
            <p className="text-slate-600">{item.summary}</p>
          </div>
          <div className="flex items-center"><ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#002868] transition-colors" /></div>
        </motion.div>
      ))}
    </div>
  </div>
);

const RegistrationPage = () => (
  <div className="py-8">
    <SectionHeader title="Citizen Registration" subtitle="Official application form for state residency and identification." />
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden min-h-[600px] flex flex-col">
      <div className="bg-[#002868] p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2"><FileText className="w-5 h-5" /><span className="font-medium">Form ID: SA-REG-2026</span></div>
        <div className="flex items-center gap-2 text-xs opacity-80"><Info className="w-4 h-4" /><span>Requires valid character background</span></div>
      </div>
      <div className="flex-grow bg-slate-50 p-8 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-[#002868]/10 rounded-full flex items-center justify-center"><Shield className="w-6 h-6 text-[#002868]" /></div>
            <div><h2 className="text-xl font-bold">State Residency Application</h2><p className="text-sm text-slate-500">Department of Justice Official Form</p></div>
          </div>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Character Name</label><div className="h-10 bg-slate-50 rounded border border-slate-200 flex items-center px-3 text-slate-400 italic text-sm">Enter full name...</div></div>
              <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date of Birth</label><div className="h-10 bg-slate-50 rounded border border-slate-200 flex items-center px-3 text-slate-400 italic text-sm">DD/MM/YYYY</div></div>
            </div>
            <div className="space-y-2"><label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Character Backstory (Min 150 words)</label><div className="h-32 bg-slate-50 rounded border border-slate-200 p-3 text-slate-400 italic text-sm">Tell us about your journey to San Andreas...</div></div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3"><Info className="w-5 h-5 text-amber-600 flex-shrink-0" /><p className="text-xs text-amber-800 leading-relaxed"><strong>Note:</strong> This is a concept preview. To submit your actual application, please use the official Google Form link below.</p></div>
            <div className="flex flex-col items-center gap-4 pt-4">
              <button className="w-full bg-[#002868] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#002868]/90 transition-colors inline-flex items-center justify-center gap-2">Open Official Google Form<ExternalLink className="w-4 h-4" /></button>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Secure Connection via Google Forms API</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CitizensPage = () => {
  const [search, setSearch] = useState("");
  const filteredCitizens = useMemo(() => CITIZENS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())), [search]);
  return (
    <div className="py-8">
      <SectionHeader title="Citizen Registry" subtitle="Public database of all registered residents in the state." />
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search by name or CID..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#002868]/20 focus:border-[#002868] transition-all" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="text-sm text-slate-500 font-medium">Showing {filteredCitizens.length} of {CITIZENS.length} citizens</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold"><th className="px-6 py-4">CID</th><th className="px-6 py-4">Full Name</th><th className="px-6 py-4">Occupation</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Joined</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredCitizens.map((citizen) => (
              <tr key={citizen.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-[#002868] font-bold">{citizen.id}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{citizen.name}</td>
                <td className="px-6 py-4 text-slate-600">{citizen.occupation}</td>
                <td className="px-6 py-4"><span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter", citizen.status === 'Active' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>{citizen.status}</span></td>
                <td className="px-6 py-4 text-slate-500 text-sm">{citizen.joined}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BusinessPage = () => {
  const [selected, setSelected] = useState<typeof BUSINESSES[0] | null>(null);
  return (
    <div className="py-8">
      <SectionHeader title="Business Map" subtitle="Interactive overview of commercial enterprises and state-owned facilities." />
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-slate-900 rounded-3xl aspect-video relative overflow-hidden border-4 border-slate-800 shadow-2xl">
            <div className="absolute inset-0 opacity-20"><div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} /></div>
            {BUSINESSES.map((biz) => (
              <motion.button key={biz.id} whileHover={{ scale: 1.2 }} onClick={() => setSelected(biz)} className={cn("absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-colors", selected?.id === biz.id ? "bg-[#f1c40f] scale-125 z-20" : "bg-[#002868] z-10")} style={{ left: `${biz.x}%`, top: `${biz.y}%` }}>
                <Building2 className="w-3 h-3 text-white" />
              </motion.button>
            ))}
            <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold flex flex-col gap-2">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#002868]" /><span>Commercial</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#f1c40f]" /><span>Selected</span></div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Business Details</h3>
            {selected ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={selected.id}>
                <div className="w-12 h-12 bg-[#002868]/10 rounded-xl flex items-center justify-center mb-4"><Building2 className="w-6 h-6 text-[#002868]" /></div>
                <h4 className="text-xl font-bold text-slate-900 mb-1">{selected.name}</h4>
                <p className="text-sm text-[#002868] font-bold mb-4">{selected.type}</p>
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Owner</span><span className="font-medium text-slate-900">{selected.owner}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Location</span><span className="font-medium text-slate-900">{selected.x}, {selected.y}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Status</span><span className="text-emerald-600 font-bold">Licensed</span></div>
                </div>
              </motion.div>
            ) : (
              <div className="py-12 text-center"><MapIcon className="w-8 h-8 text-slate-200 mx-auto mb-3" /><p className="text-slate-400 text-sm">Select a business on the map to view details.</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-6"><Shield className="w-8 h-8 text-[#f1c40f]" /><span className="font-bold text-xl tracking-tight uppercase">State RP Portal</span></div>
      <p className="text-slate-400 max-w-md mx-auto text-sm mb-8">Official digital gateway for the State of San Andreas.</p>
      <div className="pt-8 border-t border-white/5 text-xs text-slate-500 font-medium uppercase tracking-widest">© 2026 State of San Andreas RP Project</div>
    </div>
  </footer>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/citizens" element={<CitizensPage />} />
              <Route path="/business" element={<BusinessPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
