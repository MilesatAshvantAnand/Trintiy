import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { EventReflection, TYEvent } from '../types';
import {
    Calendar,
    Save,
    Clock,
    ChevronDown,
    ChevronUp,
    Star,
} from 'lucide-react';

export function EventReflectionView() {
    const { state, dispatch, getAvailableEvents } = useApp();
    const [selectedEventId, setSelectedEventId] = useState<string>('');
    const [takeaways, setTakeaways] = useState('');
    const [rating, setRating] = useState(3);
    const [showPastReflections, setShowPastReflections] = useState(false);

    const eventReflections = state.eventReflections || [];
    const availableEvents = getAvailableEvents();

    // Filter out events that have already been reflected on
    const unreflectedEvents = availableEvents.filter(
        (event: TYEvent) => !eventReflections.some(r => r.eventId === event.id)
    );

    const handleSave = () => {
        if (!selectedEventId || !takeaways.trim()) return;

        const newReflection: EventReflection = {
            id: crypto.randomUUID(),
            eventId: selectedEventId,
            takeaways: takeaways.trim(),
            rating,
            createdAt: new Date().toISOString(),
        };

        dispatch({
            type: 'ADD_EVENT_REFLECTION',
            payload: newReflection,
        });

        // Clear form
        setSelectedEventId('');
        setTakeaways('');
        setRating(3);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Helper to get event details from an ID
    const getEventById = (id: string): TYEvent | undefined => {
        return availableEvents.find((e: TYEvent) => e.id === id);
    };

    const renderStars = (count: number, interactive = false) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={interactive ? 32 : 16}
                        fill={star <= count ? "var(--accent-primary)" : "transparent"}
                        stroke={star <= count ? "var(--accent-primary)" : "var(--text-muted)"}
                        style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.2s' }}
                        onClick={() => interactive && setRating(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="reflection animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Event Reflection 🎤</h1>
                <p className="page-subtitle">Log the events, trips, and workshops you've attended</p>
            </header>

            {/* New Reflection Form */}
            <section className="section">
                <div className="flex items-center gap-sm mb-md">
                    <Calendar style={{ width: 20, height: 20, color: 'var(--text-secondary)' }} />
                    <span style={{ fontWeight: 500 }}>Create New Reflection</span>
                </div>

                <div className="card">
                    {unreflectedEvents.length > 0 ? (
                        <>
                            <div className="reflection-card">
                                <label className="reflection-prompt">Which event did you attend?</label>
                                <select
                                    className="input"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                                    value={selectedEventId}
                                    onChange={(e) => setSelectedEventId(e.target.value)}
                                >
                                    <option value="" disabled>Select an event...</option>
                                    {unreflectedEvents.map((event: TYEvent) => (
                                        <option key={event.id} value={event.id}>
                                            {event.name} ({formatDate(event.date)})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedEventId && (
                                <div className="animate-fade-in">
                                    <div className="reflection-card">
                                        <label className="reflection-prompt">What were your main takeaways?</label>
                                        <textarea
                                            className="input textarea"
                                            placeholder="What did you learn? Did this change your mind about any career paths or subjects?"
                                            value={takeaways}
                                            onChange={(e) => setTakeaways(e.target.value)}
                                            rows={4}
                                        />
                                    </div>

                                    <div className="reflection-card">
                                        <label className="reflection-prompt">How would you rate this event?</label>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 0' }}>
                                            {renderStars(rating, true)}
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-primary btn-lg btn-block mt-lg"
                                        onClick={handleSave}
                                        disabled={!takeaways.trim() || !selectedEventId}
                                    >
                                        <Save /> Save Reflection
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                            <p>You have reflected on all available events! 🎉</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Past Reflections */}
            {eventReflections.length > 0 && (
                <section className="section">
                    <button
                        className="btn btn-secondary w-full flex justify-between items-center"
                        onClick={() => setShowPastReflections(!showPastReflections)}
                    >
                        <span className="flex items-center gap-sm">
                            <Clock style={{ width: 18, height: 18 }} />
                            Past Reflections ({eventReflections.length})
                        </span>
                        {showPastReflections ? <ChevronUp /> : <ChevronDown />}
                    </button>

                    {showPastReflections && (
                        <div className="mt-md animate-slide-up">
                            {eventReflections
                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                .map((reflection) => {
                                    const event = getEventById(reflection.eventId);
                                    if (!event) return null;

                                    return (
                                        <div key={reflection.id} className="card-flat mb-md">
                                            <div className="flex justify-between items-start mb-md">
                                                <div>
                                                    <h3 style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>{event.name}</h3>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                        <span className="badge" style={{ background: 'var(--bg-tertiary)' }}>{event.type}</span>
                                                        <span>{formatDate(event.date)}</span>
                                                    </div>
                                                </div>
                                                <div style={{ background: 'var(--bg-tertiary)', padding: '4px 8px', borderRadius: '12px' }}>
                                                    {renderStars(reflection.rating)}
                                                </div>
                                            </div>

                                            <div style={{
                                                marginTop: 'var(--space-md)',
                                                paddingTop: 'var(--space-sm)',
                                                borderTop: '1px solid var(--border-color)'
                                            }}>
                                                <strong style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>Takeaways:</strong>
                                                <p style={{ fontSize: 'var(--font-size-sm)', marginTop: '4px', lineHeight: 1.5 }}>{reflection.takeaways}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
