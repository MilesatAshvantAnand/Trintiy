import React, { useState } from 'react';
import {
    Home,
    BookOpen,
    Compass,
    Calendar,
    PenLine,
    GraduationCap,
    Briefcase,
    Award,
    MessageCircleQuestion,
} from 'lucide-react';
import { GuidancePanel } from './GuidancePanel';

type Page = 'dashboard' | 'subjects' | 'pathways' | 'jobs' | 'grades' | 'planner' | 'reflection';

interface LayoutProps {
    children: React.ReactNode;
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home /> },
    { id: 'subjects', label: 'Subjects', icon: <BookOpen /> },
    { id: 'pathways', label: 'Pathways', icon: <Compass /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase /> },
    { id: 'grades', label: 'Grades', icon: <Award /> },
    { id: 'planner', label: 'Planner', icon: <Calendar /> },
    { id: 'reflection', label: 'Reflect', icon: <PenLine /> },
];

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
    const [guidanceOpen, setGuidanceOpen] = useState(false);

    return (
        <div className="app">
            <div className="app-layout">
                {/* Desktop Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-logo">
                        <GraduationCap />
                        <span>TY Tutor</span>
                    </div>
                    <nav className="sidebar-nav">
                        <ul className="sidebar-nav-list">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <div
                                        className={`sidebar-nav-link ${currentPage === item.id ? 'active' : ''}`}
                                        onClick={() => onNavigate(item.id)}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    {/* Guidance button at bottom of sidebar */}
                    <div
                        className="sidebar-guidance-btn"
                        onClick={() => setGuidanceOpen(true)}
                    >
                        <MessageCircleQuestion />
                        <span>Guidance Hub</span>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="main-content animate-fade-in">{children}</main>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="bottom-nav">
                <ul className="nav-list">
                    {navItems.map((item) => (
                        <li key={item.id} className="nav-item">
                            <div
                                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                                onClick={() => onNavigate(item.id)}
                            >
                                {item.icon}
                                <span className="nav-label">{item.label}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Floating Guidance Button (Mobile) */}
            <button
                className="guidance-fab"
                onClick={() => setGuidanceOpen(true)}
                aria-label="Open Guidance Hub"
            >
                <MessageCircleQuestion size={22} />
            </button>

            {/* Guidance Panel (Slide-out) */}
            <GuidancePanel isOpen={guidanceOpen} onClose={() => setGuidanceOpen(false)} />
        </div>
    );
}
