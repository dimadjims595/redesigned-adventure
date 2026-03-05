import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Building2, Users, FileText, Newspaper, Home, Search, Map as MapIcon, Shield, ExternalLink, Menu, X, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

const NEWS = [
  { id: 1, title: "New Business Grant Program", date: "2026-03-01", category: "Economy", summary: "The State Government is offering up to $50,000 for new startups." },
  { id: 2, title: "Public Safety Update", date: "2026-02-28", category: "Safety", summary: "Law enforcement will increase presence in the industrial zone." }
];

const CITIZENS = [
  { id: "C-1001", name: "John Doe", status: "Active", occupation: "Truck Driver", joined: "2025-12-10" },
  { id: "C-1002", name: "Sarah Miller", status: "Active", occupation: "Lawyer", joined: "2026-01-05" },
];

const Navbar = () => {
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const links = [
    { name: 'Main', path: '/', icon: Home },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Registration', path: '/registration', icon: FileText },
    { name: 'Citizens', path: '/citizens', icon: Users },
  ];
  return (
    <nav className="bg-[#002868] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#f1c40f]" />
          <span className="font-bold uppercase">State Portal</span>
        </div>
        <div className="hidden md:flex space-x-4">
          {links.map(l => (
            <Link key={l.name} to={l.path} className={cn("px-3 py-2 rounded-md text-sm font-medium", loc.pathname === l.path ? "bg-white/10 text-[#f1c40f]" : "text-white/80 hover:text-white")}>
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

const MainPage = () => (
  <div className="py-12 space-y-12">
    <div className="relative h-64 rounded-3xl overflow-hidden bg-slate-900 flex items-center justify-center text-center">
      <div className="z-10">
        <h1 className="text-4xl font-bold text-white uppercase">State of San Andreas</h1>
        <p className="text-white/70 mt-2">Official Government Portal</p>
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <Users className="w-8 h-8 text-[#002868] mb-4" />
        <h3 className="font-bold text-xl">Public Records</h3>
        <p className="text-slate-500 text-sm mt-2">Access the database of registered citizens.</p>
      </div>
    </div>
  </div>
);

const RegistrationPage = () => (
  <div className="py-12">
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
      <h2 className="text-2xl font-bold text-[#002868] mb-6">Residency Application</h2>
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-sm text-amber-800">
          This is a preview. Use the official Google Form for submission.
        </div>
        <button className="w-full bg-[#002868] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
          Open Google Form <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/news" element={<div>News Content</div>} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/citizens" element={<div>Citizens List</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
