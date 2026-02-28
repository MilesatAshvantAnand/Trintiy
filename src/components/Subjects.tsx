import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectQuiz } from './SubjectQuiz';
import type { TopicStatus, Topic } from '../types';
import {
    Calculator,
    Languages,
    BookOpen,
    Globe,
    FlaskConical,
    Briefcase,
    Landmark,
    Map,
    Plus,
    X,
    Link as LinkIcon,
    FileText,
    ExternalLink,
} from 'lucide-react';
import { Zap, Trophy } from 'lucide-react';

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
    Calculator: <Calculator />,
    Languages: <Languages />,
    BookOpen: <BookOpen />,
    Globe: <Globe />,
    FlaskConical: <FlaskConical />,
    Briefcase: <Briefcase />,
    Landmark: <Landmark />,
    Map: <Map />,
};

export function Subjects() {
    const { state, dispatch, getUserSubjects } = useApp();
    const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
    const [editingTopic, setEditingTopic] = useState<{ subjectId: string; topic: Topic } | null>(null);
    const [showAddTopic, setShowAddTopic] = useState<string | null>(null);
    const [newTopicName, setNewTopicName] = useState('');
    const [quizSubject, setQuizSubject] = useState<string | null>(null);

    const userSubjects = getUserSubjects();

    // Get best score for a subject
    const getBestScore = (subjectId: string) => {
        const attempts = state.quizAttempts?.filter(a => a.subjectId === subjectId) || [];
        if (attempts.length === 0) return null;
        return Math.max(...attempts.map(a => Math.round((a.score / a.totalQuestions) * 100)));
    };

    const handleStatusChange = (subjectId: string, topicId: string, status: TopicStatus) => {
        dispatch({
            type: 'UPDATE_TOPIC_STATUS',
            payload: { subjectId, topicId, status },
        });
    };

    const handleAddTopic = (subjectId: string) => {
        if (!newTopicName.trim()) return;

        const newTopic: Topic = {
            id: crypto.randomUUID(),
            name: newTopicName.trim(),
            status: 'need-to-revise',
            notes: '',
            links: [],
        };

        dispatch({
            type: 'ADD_TOPIC',
            payload: { subjectId, topic: newTopic },
        });

        setNewTopicName('');
        setShowAddTopic(null);
    };

    const handleSaveNotes = (subjectId: string, topicId: string, notes: string, links: string[]) => {
        dispatch({
            type: 'UPDATE_TOPIC_NOTES',
            payload: { subjectId, topicId, notes, links },
        });
        setEditingTopic(null);
    };

    const getStatusClass = (status: TopicStatus) => {
        switch (status) {
            case 'need-to-revise': return 'need-to-revise';
            case 'in-progress': return 'in-progress';
            case 'confident': return 'confident';
        }
    };



    return (
        <div className="subjects animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Your Subjects 📚</h1>
                <p className="page-subtitle">Track your revision progress across all topics</p>
            </header>

            <div className="grid-subjects section">
                {userSubjects.map((subject) => {
                    const confidentCount = subject.topics.filter(t => t.status === 'confident').length;
                    const totalCount = subject.topics.length;

                    return (
                        <div
                            key={subject.id}
                            className={`subject-card ${expandedSubject === subject.id ? 'selected' : ''}`}
                            onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                        >
                            <div className="subject-icon" style={{ backgroundColor: subject.color }}>
                                {iconMap[subject.icon] || <BookOpen />}
                            </div>
                            <div className="subject-name">{subject.name}</div>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-xs)' }}>
                                {confidentCount}/{totalCount} confident
                            </div>
                            {getBestScore(subject.id) !== null && (
                                <div className="quiz-score-badge">
                                    <Trophy size={12} /> {getBestScore(subject.id)}%
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Expanded Subject Topics */}
            {expandedSubject && (
                <section className="section animate-slide-up">
                    {userSubjects.filter(s => s.id === expandedSubject).map((subject) => (
                        <div key={subject.id} className="card">
                            <div className="section-header">
                                <h2 className="section-title" style={{ color: subject.color }}>
                                    {iconMap[subject.icon]}
                                    {subject.name} Topics
                                </h2>
                                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={(e) => { e.stopPropagation(); setShowAddTopic(subject.id); }}
                                    >
                                        <Plus /> Add Topic
                                    </button>
                                    {subject.quizzes && subject.quizzes.length > 0 && (
                                        <button
                                            className="btn btn-primary btn-sm quiz-take-btn"
                                            onClick={(e) => { e.stopPropagation(); setQuizSubject(subject.id); }}
                                        >
                                            <Zap size={14} /> Take Quiz
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Add Topic Form */}
                            {showAddTopic === subject.id && (
                                <div className="form-group" style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="New topic name..."
                                        value={newTopicName}
                                        onChange={(e) => setNewTopicName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddTopic(subject.id)}
                                        autoFocus
                                    />
                                    <button className="btn btn-primary" onClick={() => handleAddTopic(subject.id)}>Add</button>
                                    <button className="btn btn-ghost" onClick={() => { setShowAddTopic(null); setNewTopicName(''); }}>
                                        <X />
                                    </button>
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                {subject.topics.map((topic) => (
                                    <div key={topic.id} className="topic-item">
                                        <div style={{ flex: 1 }}>
                                            <div className="topic-name">{topic.name}</div>
                                            {(topic.notes || topic.links.length > 0) && (
                                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-xs)' }}>
                                                    {topic.notes && <FileText style={{ width: 12, height: 12, display: 'inline', marginRight: 4 }} />}
                                                    {topic.links.length > 0 && <LinkIcon style={{ width: 12, height: 12, display: 'inline' }} />}
                                                    {topic.links.length > 0 && ` ${topic.links.length} personal link(s)`}
                                                </div>
                                            )}
                                            <div className="flex gap-sm mt-sm">
                                                <a href={`https://www.studyclix.ie/leaving-certificate/${subject.name.toLowerCase().replace(' ', '-')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary" style={{ textDecoration: 'none', padding: '4px 8px' }} onClick={(e) => e.stopPropagation()}>
                                                    <ExternalLink size={12} /> StudyClix
                                                </a>
                                                <a href={`https://simplestudy.ie/leaving-cert/${subject.name.toLowerCase().replace(' ', '-')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary" style={{ textDecoration: 'none', padding: '4px 8px' }} onClick={(e) => e.stopPropagation()}>
                                                    <ExternalLink size={12} /> Simple Study
                                                </a>
                                            </div>
                                        </div>
                                        <div className="topic-actions">
                                            <select
                                                className={`status-select ${getStatusClass(topic.status)}`}
                                                value={topic.status}
                                                onChange={(e) => handleStatusChange(subject.id, topic.id, e.target.value as TopicStatus)}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <option value="need-to-revise">Needs revision</option>
                                                <option value="in-progress">In progress</option>
                                                <option value="confident">Confident</option>
                                            </select>
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={(e) => { e.stopPropagation(); setEditingTopic({ subjectId: subject.id, topic }); }}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Edit Topic Modal */}
            {editingTopic && (
                <TopicEditModal
                    topic={editingTopic.topic}
                    onSave={(notes, links) => handleSaveNotes(editingTopic.subjectId, editingTopic.topic.id, notes, links)}
                    onClose={() => setEditingTopic(null)}
                />
            )}

            {/* Quiz Modal */}
            {quizSubject && (
                <SubjectQuiz
                    subject={userSubjects.find(s => s.id === quizSubject)!}
                    onClose={() => setQuizSubject(null)}
                />
            )}
        </div>
    );
}

// Topic Edit Modal Component
interface TopicEditModalProps {
    topic: Topic;
    onSave: (notes: string, links: string[]) => void;
    onClose: () => void;
}

function TopicEditModal({ topic, onSave, onClose }: TopicEditModalProps) {
    const [notes, setNotes] = useState(topic.notes);
    const [links, setLinks] = useState(topic.links.join('\n'));

    const handleSave = () => {
        const linksArray = links.split('\n').filter(l => l.trim());
        onSave(notes, linksArray);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Edit: {topic.name}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label className="input-label">Notes</label>
                        <textarea
                            className="input textarea"
                            placeholder="Add your notes here..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <div className="form-group">
                        <label className="input-label">Links (one per line)</label>
                        <textarea
                            className="input textarea"
                            placeholder="https://youtube.com/watch?v=...&#10;https://example.com/resource.pdf"
                            value={links}
                            onChange={(e) => setLinks(e.target.value)}
                            rows={3}
                        />
                    </div>
                </div>
                <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}
