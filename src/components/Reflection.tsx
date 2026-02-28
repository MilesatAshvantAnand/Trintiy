import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Reflection as ReflectionType } from '../types';
import {
    Calendar,
    Save,
    Clock,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

export function Reflection() {
    const { state, dispatch } = useApp();
    const [revisedTopics, setRevisedTopics] = useState('');
    const [pathwayLearnings, setPathwayLearnings] = useState('');
    const [preparednessScore, setPreparednessScore] = useState(3);
    const [showPastReflections, setShowPastReflections] = useState(false);

    const reflections = state.reflections || [];

    // Get current week start date
    const getWeekStart = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
        return monday.toISOString().split('T')[0];
    };

    const weekStart = getWeekStart();
    const existingReflection = reflections.find(r => r.weekStart === weekStart);

    const handleSave = () => {
        if (!revisedTopics.trim() && !pathwayLearnings.trim()) return;

        const newReflection: ReflectionType = {
            id: crypto.randomUUID(),
            weekStart,
            revisedTopics: revisedTopics.trim(),
            pathwayLearnings: pathwayLearnings.trim(),
            preparednessScore,
            createdAt: new Date().toISOString(),
        };

        dispatch({
            type: 'ADD_REFLECTION',
            payload: newReflection,
        });

        // Clear form
        setRevisedTopics('');
        setPathwayLearnings('');
        setPreparednessScore(3);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getPreparednessEmoji = (score: number) => {
        switch (score) {
            case 1: return '😰';
            case 2: return '😕';
            case 3: return '😐';
            case 4: return '😊';
            case 5: return '💪';
            default: return '😐';
        }
    };

    const getPreparednessLabel = (score: number) => {
        switch (score) {
            case 1: return 'Not prepared at all';
            case 2: return 'Slightly prepared';
            case 3: return 'Somewhat prepared';
            case 4: return 'Fairly prepared';
            case 5: return 'Very prepared!';
            default: return 'Somewhat prepared';
        }
    };

    return (
        <div className="reflection animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Weekly Reflection 📝</h1>
                <p className="page-subtitle">Take a moment to reflect on your week</p>
            </header>

            {/* Current Week Reflection */}
            <section className="section">
                <div className="flex items-center gap-sm mb-md">
                    <Calendar style={{ width: 20, height: 20, color: 'var(--text-secondary)' }} />
                    <span style={{ fontWeight: 500 }}>Week of {formatDate(weekStart)}</span>
                </div>

                {existingReflection ? (
                    <div className="card-flat">
                        <div style={{
                            padding: 'var(--space-md)',
                            background: 'rgba(34, 197, 94, 0.1)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: 'var(--space-md)'
                        }}>
                            ✅ You've already submitted a reflection for this week!
                        </div>

                        <div className="reflection-card">
                            <div className="reflection-prompt">What did you revise?</div>
                            <p style={{ color: 'var(--text-secondary)' }}>{existingReflection.revisedTopics || 'No answer'}</p>
                        </div>

                        <div className="reflection-card">
                            <div className="reflection-prompt">What did you learn about your pathways?</div>
                            <p style={{ color: 'var(--text-secondary)' }}>{existingReflection.pathwayLearnings || 'No answer'}</p>
                        </div>

                        <div className="reflection-card">
                            <div className="reflection-prompt">How prepared do you feel for 5th year?</div>
                            <div className="flex items-center gap-md">
                                <span style={{ fontSize: 'var(--font-size-2xl)' }}>
                                    {getPreparednessEmoji(existingReflection.preparednessScore)}
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                    {existingReflection.preparednessScore}/5 - {getPreparednessLabel(existingReflection.preparednessScore)}
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <div className="reflection-card">
                            <label className="reflection-prompt">What did you revise this week?</label>
                            <textarea
                                className="input textarea"
                                placeholder="E.g., I revised algebra and trigonometry in Maths, and some poetry in English..."
                                value={revisedTopics}
                                onChange={(e) => setRevisedTopics(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="reflection-card">
                            <label className="reflection-prompt">What did you learn about your chosen pathway(s)?</label>
                            <textarea
                                className="input textarea"
                                placeholder="E.g., I watched a video about software engineering and it looks really interesting..."
                                value={pathwayLearnings}
                                onChange={(e) => setPathwayLearnings(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="reflection-card">
                            <label className="reflection-prompt">How prepared do you feel for 5th year? (1-5)</label>
                            <div className="slider-container">
                                <span style={{ fontSize: 'var(--font-size-2xl)' }}>
                                    {getPreparednessEmoji(preparednessScore)}
                                </span>
                                <input
                                    type="range"
                                    className="slider"
                                    min="1"
                                    max="5"
                                    value={preparednessScore}
                                    onChange={(e) => setPreparednessScore(Number(e.target.value))}
                                />
                                <div className="slider-value">{preparednessScore}</div>
                            </div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--text-muted)',
                                marginTop: 'var(--space-sm)'
                            }}>
                                {getPreparednessLabel(preparednessScore)}
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-lg btn-block mt-lg"
                            onClick={handleSave}
                            disabled={!revisedTopics.trim() && !pathwayLearnings.trim()}
                        >
                            <Save /> Save Reflection
                        </button>
                    </div>
                )}
            </section>

            {/* Past Reflections */}
            {reflections.length > 0 && (
                <section className="section">
                    <button
                        className="btn btn-secondary w-full flex justify-between items-center"
                        onClick={() => setShowPastReflections(!showPastReflections)}
                    >
                        <span className="flex items-center gap-sm">
                            <Clock style={{ width: 18, height: 18 }} />
                            Past Reflections ({reflections.length})
                        </span>
                        {showPastReflections ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {showPastReflections && (
                        <div className="mt-md animate-slide-up">
                            {reflections
                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                .map((reflection) => (
                                    <div key={reflection.id} className="card-flat mb-md">
                                        <div className="flex justify-between items-center mb-md">
                                            <span style={{ fontWeight: 600 }}>Week of {formatDate(reflection.weekStart)}</span>
                                            <span className="badge" style={{ background: 'var(--bg-tertiary)' }}>
                                                {getPreparednessEmoji(reflection.preparednessScore)} {reflection.preparednessScore}/5
                                            </span>
                                        </div>

                                        {reflection.revisedTopics && (
                                            <div style={{ marginBottom: 'var(--space-sm)' }}>
                                                <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Revised:</strong>
                                                <p style={{ fontSize: 'var(--font-size-sm)' }}>{reflection.revisedTopics}</p>
                                            </div>
                                        )}

                                        {reflection.pathwayLearnings && (
                                            <div>
                                                <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Pathway learnings:</strong>
                                                <p style={{ fontSize: 'var(--font-size-sm)' }}>{reflection.pathwayLearnings}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
