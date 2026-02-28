import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { GuidanceCategory } from '../types';
import {
    X,
    MessageCircleQuestion,
    Send,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    BookOpen,
    Briefcase,
    GraduationCap,
    Compass,
} from 'lucide-react';

interface GuidancePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const CATEGORIES: GuidanceCategory[] = [
    'Subject Choices', 'Career Advice', 'College Applications', 'Work Experience', 'General',
];

const categoryIcon = (cat: GuidanceCategory) => {
    switch (cat) {
        case 'Subject Choices': return <BookOpen size={14} />;
        case 'Career Advice': return <Briefcase size={14} />;
        case 'College Applications': return <GraduationCap size={14} />;
        case 'Work Experience': return <Compass size={14} />;
        default: return <HelpCircle size={14} />;
    }
};

const FAQS = [
    {
        question: 'How many Leaving Cert subjects should I pick?',
        answer: 'You need at least 6 subjects for the LC, but most students do 7 to have a safety net for CAO points. Make sure to include English, Maths, and Irish if required by your target courses.',
    },
    {
        question: 'Do my Junior Cycle results affect my CAO points?',
        answer: 'No, Junior Cycle results do not directly count toward CAO points. However, they are a good indicator of your strengths and can help you choose the right LC subjects.',
    },
    {
        question: 'Can I change subjects after starting 5th year?',
        answer: 'It depends on your school\'s policy. Some schools allow changes in the first few weeks of 5th year, but it gets harder the longer you wait. Speak to your guidance counsellor early if you\'re unsure.',
    },
    {
        question: 'What if I don\'t know what career I want?',
        answer: 'That\'s completely normal! Use your TY to explore different areas. Keep your subject choices broad so you don\'t close off options. The Pathways section in this app can help you explore different career areas.',
    },
    {
        question: 'Where can I talk to a guidance counsellor?',
        answer: 'Your school guidance counsellor is the best first port of call. You can also contact the National Parents Council helpline (1800 265 165) or visit careersportal.ie/guidance for online resources.',
    },
    {
        question: 'Is Higher Level always better than Ordinary?',
        answer: 'Higher Level gives more CAO points, but only if you can manage it. A H5 (50-59%) in Higher gives the same points as an O1 (90-100%) in Ordinary. Pick the level where you can perform your best.',
    },
];

export function GuidancePanel({ isOpen, onClose }: GuidancePanelProps) {
    const { state, dispatch } = useApp();
    const questions = state.guidanceQuestions || [];

    const [activeTab, setActiveTab] = useState<'ask' | 'faqs' | 'resources'>('faqs');
    const [newQuestion, setNewQuestion] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<GuidanceCategory>('General');
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const handleSubmitQuestion = () => {
        if (!newQuestion.trim()) return;
        dispatch({
            type: 'ADD_GUIDANCE_QUESTION',
            payload: {
                id: crypto.randomUUID(),
                question: newQuestion.trim(),
                category: selectedCategory,
                timestamp: new Date().toISOString(),
            },
        });
        setNewQuestion('');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="guidance-backdrop"
                onClick={onClose}
            />
            {/* Panel */}
            <div className="guidance-panel">
                {/* Header */}
                <div className="guidance-panel-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MessageCircleQuestion size={20} />
                        <h2 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>Guidance Hub</h2>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={18} /></button>
                </div>

                {/* Tabs */}
                <div className="guidance-tabs">
                    <button
                        className={`guidance-tab ${activeTab === 'faqs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('faqs')}
                    >
                        FAQs
                    </button>
                    <button
                        className={`guidance-tab ${activeTab === 'ask' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ask')}
                    >
                        Ask ({questions.length})
                    </button>
                    <button
                        className={`guidance-tab ${activeTab === 'resources' ? 'active' : ''}`}
                        onClick={() => setActiveTab('resources')}
                    >
                        Resources
                    </button>
                </div>

                {/* Content */}
                <div className="guidance-panel-content">
                    {activeTab === 'faqs' && (
                        <div className="guidance-faqs">
                            {FAQS.map((faq, i) => (
                                <div key={i} className="guidance-faq-item">
                                    <button
                                        className="guidance-faq-question"
                                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    >
                                        <span>{faq.question}</span>
                                        {expandedFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                    {expandedFaq === i && (
                                        <div className="guidance-faq-answer">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'ask' && (
                        <div>
                            {/* Question Form */}
                            <div style={{ marginBottom: 'var(--space-lg)' }}>
                                <p className="task-desc" style={{ marginBottom: 'var(--space-sm)' }}>
                                    Post a question for your guidance counsellor or community
                                </p>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                                            onClick={() => setSelectedCategory(cat)}
                                            style={{ fontSize: '11px' }}
                                        >
                                            {categoryIcon(cat)} {cat}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Type your question here..."
                                        value={newQuestion}
                                        onChange={(e) => setNewQuestion(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitQuestion()}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSubmitQuestion}
                                        disabled={!newQuestion.trim()}
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Question List */}
                            {questions.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: 'var(--space-xl)', color: 'var(--text-muted)' }}>
                                    <HelpCircle style={{ width: 32, height: 32, marginBottom: 8 }} />
                                    <p>No questions posted yet. Ask away!</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {[...questions].reverse().map((q) => (
                                        <div key={q.id} className="card-flat" style={{ padding: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                                                <span className="badge" style={{ fontSize: '10px', background: 'var(--bg-tertiary)' }}>
                                                    {categoryIcon(q.category)} {q.category}
                                                </span>
                                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                    {new Date(q.timestamp).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, margin: '4px 0' }}>{q.question}</p>
                                            {q.answer && (
                                                <div style={{ background: 'rgba(34,197,94,0.08)', padding: '8px 12px', borderRadius: '8px', marginTop: '8px', fontSize: 'var(--font-size-sm)', borderLeft: '3px solid var(--accent-green)' }}>
                                                    {q.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'resources' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <p className="task-desc" style={{ marginBottom: '4px' }}>
                                Helpful guidance & career resources for TY students in Ireland
                            </p>
                            <a href="https://www.careersportal.ie/guidance/" target="_blank" rel="noopener noreferrer" className="guidance-resource-link">
                                <Compass size={18} />
                                <div>
                                    <strong>CareersPortal – Guidance Section</strong>
                                    <p>Career guidance tools, subject advice, and self-assessments</p>
                                </div>
                                <ExternalLink size={14} style={{ flexShrink: 0 }} />
                            </a>
                            <a href="https://www.qualifax.ie/index.php?option=com_wrapper&view=wrapper&Itemid=15" target="_blank" rel="noopener noreferrer" className="guidance-resource-link">
                                <GraduationCap size={18} />
                                <div>
                                    <strong>Qualifax – Course Finder</strong>
                                    <p>Search every college course in Ireland by keyword or CAO code</p>
                                </div>
                                <ExternalLink size={14} style={{ flexShrink: 0 }} />
                            </a>
                            <a href="https://www.igc.ie/students" target="_blank" rel="noopener noreferrer" className="guidance-resource-link">
                                <MessageCircleQuestion size={18} />
                                <div>
                                    <strong>IGC – Institute of Guidance Counsellors</strong>
                                    <p>Information about guidance counselling services in Ireland</p>
                                </div>
                                <ExternalLink size={14} style={{ flexShrink: 0 }} />
                            </a>
                            <a href="https://www.cao.ie/apply.php" target="_blank" rel="noopener noreferrer" className="guidance-resource-link">
                                <BookOpen size={18} />
                                <div>
                                    <strong>CAO – How to Apply</strong>
                                    <p>Step-by-step guide to the CAO application process</p>
                                </div>
                                <ExternalLink size={14} style={{ flexShrink: 0 }} />
                            </a>
                            <a href="https://www.studentfinance.ie/" target="_blank" rel="noopener noreferrer" className="guidance-resource-link">
                                <Briefcase size={18} />
                                <div>
                                    <strong>Student Finance – SUSI Grant</strong>
                                    <p>Check if you qualify for the SUSI maintenance grant</p>
                                </div>
                                <ExternalLink size={14} style={{ flexShrink: 0 }} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
