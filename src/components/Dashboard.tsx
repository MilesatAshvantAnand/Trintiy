import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
    BookOpen,
    Compass,
    CheckCircle2,
    TrendingUp,
    Calendar,
    ChevronRight,
    Check,
} from 'lucide-react';

interface DashboardProps {
    onNavigate: (page: 'subjects' | 'pathways' | 'planner') => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
    const { state, dispatch, getUserPathways, getTopicsNeedingRevision, getWeeklyProgress } = useApp();
    const user = state.user;

    if (!user) return null;


    const userPathways = getUserPathways();
    // Cache the topics that need revision when Dashboard mounts so they don't disappear immediately
    const [displayTopics] = useState(() => getTopicsNeedingRevision().slice(0, 5));
    const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
    const { topicsRevised } = getWeeklyProgress();

    // Get current time greeting
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    // Calculate total pathway tasks
    const totalPathwayTasks = userPathways.reduce((acc, p) => acc + p.tasks.length, 0);
    const completedPathwayTasks = userPathways.reduce(
        (acc, p) => acc + p.tasks.filter((t) => t.completed).length,
        0
    );

    const handleMarkConfident = (subjectId: string, topicId: string) => {
        dispatch({
            type: 'UPDATE_TOPIC_STATUS',
            payload: { subjectId, topicId, status: 'confident' }
        });
        setCompletedTopics(prev => {
            const next = new Set(prev);
            next.add(topicId);
            return next;
        });
    };

    return (
        <div className="dashboard animate-fade-in">
            {/* Header */}
            <header className="page-header">
                <h1 className="page-title">{greeting}, {user.name}! 👋</h1>
                <p className="page-subtitle">Here's your study overview for this week</p>
            </header>

            {/* Opportunity Alert */}
            <section className="section" style={{ paddingBottom: 0 }}>
                <div className="card-flat" style={{ background: 'var(--gradient-primary)', color: 'white', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: '8px', border: 'none' }}>Opportunity Alert 🚀</span>
                            <h2 style={{ fontSize: '1.25rem', margin: '0 0 4px 0', fontWeight: 600 }}>Patch Accelerator Applications Open!</h2>
                            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem' }}>Are you an ambitious teen interested in STEM, engineering, or startups? Patch is a summer accelerator for extraordinary teens in Ireland.</p>
                        </div>
                    </div>
                    <a href="https://www.joinpatch.org" target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ alignSelf: 'flex-start', background: 'white', color: 'var(--primary)', fontWeight: 600, border: 'none', padding: '8px 16px' }}>
                        Learn More <ChevronRight style={{ width: 16, height: 16 }} />
                    </a>
                </div>
            </section>

            {/* Stats Grid */}
            <div className="grid-2 section" style={{ paddingTop: '1.5rem' }}>
                <div className="stat-card">
                    <div className="stat-value">{topicsRevised}</div>
                    <div className="stat-label">Topics Confident</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{completedPathwayTasks}/{totalPathwayTasks}</div>
                    <div className="stat-label">Pathway Tasks Done</div>
                </div>
            </div>

            {/* Revision Section */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <BookOpen />
                        Topics to Revise
                    </h2>
                    <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('subjects')}>
                        View all <ChevronRight />
                    </button>
                </div>

                {displayTopics.length > 0 ? (
                    <div className="card-flat">
                        {displayTopics.map((item, index) => {
                            const isCompleted = completedTopics.has(item.topicId);
                            return (
                                <div key={item.topicId} className={`task-item ${isCompleted ? 'completed' : ''}`} style={{ borderBottom: index < displayTopics.length - 1 ? '1px solid var(--bg-tertiary)' : 'none' }}>
                                    <div
                                        className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
                                        onClick={() => !isCompleted && handleMarkConfident(item.subjectId, item.topicId)}
                                        title={isCompleted ? "Completed" : "Mark as confident"}
                                        style={{ cursor: isCompleted ? 'default' : 'pointer' }}
                                    >
                                        <Check />
                                    </div>
                                    <div className="task-content">
                                        <div className="task-title">{item.topic}</div>
                                        <div className="task-desc">{item.subject}</div>
                                    </div>
                                    <span className={`badge ${isCompleted ? 'badge-confident' : 'badge-need-revise'}`}>
                                        {isCompleted ? 'Confident' : 'Needs revision'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="card-flat empty-state">
                        <CheckCircle2 />
                        <p>Great work! No topics need revision right now.</p>
                    </div>
                )}
            </section>

            {/* Pathways Section */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <Compass />
                        Pathway Progress
                    </h2>
                    <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('pathways')}>
                        View all <ChevronRight />
                    </button>
                </div>

                <div className="grid-3">
                    {userPathways.map((pathway) => {
                        const completedTasks = pathway.tasks.filter((t) => t.completed).length;
                        const totalTasks = pathway.tasks.length;
                        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                        return (
                            <div key={pathway.id} className={`pathway-card ${pathway.id}`} onClick={() => onNavigate('pathways')}>
                                <div className="pathway-icon">
                                    <TrendingUp />
                                </div>
                                <h3 className="pathway-name">{pathway.name}</h3>
                                <div style={{ marginTop: 'var(--space-sm)' }}>
                                    <div className="progress-bar">
                                        <div
                                            className={`progress-bar-fill ${pathway.id === 'stem' ? 'blue' : pathway.id === 'business' ? 'orange' : pathway.id === 'creative' ? 'pink' : pathway.id === 'languages' ? 'teal' : 'green'}`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-xs)' }}>
                                        {completedTasks} of {totalTasks} tasks complete
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Quick Actions */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <Calendar />
                        Quick Actions
                    </h2>
                </div>

                <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-lg" onClick={() => onNavigate('subjects')}>
                        <BookOpen /> Revise a Topic
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={() => onNavigate('planner')}>
                        <Calendar /> View Weekly Plan
                    </button>
                </div>
            </section>
        </div>
    );
}
