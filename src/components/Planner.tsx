import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getCurrentWeekDates } from '../data/seedData';
import {
    BookOpen,
    Compass,
    Calendar,
    ExternalLink,
    Download,
} from 'lucide-react';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


export function Planner() {
    const { state, getUserSubjects, getUserPathways } = useApp();


    const weekDates = useMemo(() => getCurrentWeekDates(), []);
    const today = new Date().toISOString().split('T')[0];

    const userSubjects = getUserSubjects();
    const userPathways = getUserPathways();

    // Generate suggested revision tasks based on subjects
    const revisionTasks = useMemo(() => {
        const tasks: { id: string; title: string; subject: string; subjectId: string; date: string; type: 'revision' }[] = [];
        const frequency = state.user?.revisionFrequency || 'medium';
        const sessionsPerSubject = frequency === 'light' ? 1 : frequency === 'medium' ? 2 : 3;

        userSubjects.forEach((subject, subjectIndex) => {
            const needsRevision = subject.topics.filter(t => t.status === 'need-to-revise');

            for (let i = 0; i < Math.min(sessionsPerSubject, needsRevision.length); i++) {
                const dateIndex = (subjectIndex + i * 2) % 7;
                const topic = needsRevision[i];
                if (topic) {
                    tasks.push({
                        id: `revision-${subject.id}-${topic.id}`,
                        title: `${topic.name}`,
                        subject: subject.name,
                        subjectId: subject.id,
                        date: weekDates[dateIndex],
                        type: 'revision',
                    });
                }
            }
        });

        return tasks;
    }, [userSubjects, weekDates, state.user?.revisionFrequency]);

    // Get incomplete pathway tasks for the week
    const pathwayTasks = useMemo(() => {
        const tasks: { id: string; title: string; pathway: string; pathwayId: string; date: string; type: 'pathway' }[] = [];

        userPathways.forEach((pathway, pathwayIndex) => {
            const incompleteTasks = pathway.tasks.filter(t => !t.completed);

            incompleteTasks.slice(0, 2).forEach((task, taskIndex) => {
                const dateIndex = (pathwayIndex * 2 + taskIndex + 1) % 7;
                tasks.push({
                    id: `pathway-${pathway.id}-${task.id}`,
                    title: task.title,
                    pathway: pathway.name,
                    pathwayId: pathway.id,
                    date: weekDates[dateIndex],
                    type: 'pathway',
                });
            });
        });

        return tasks;
    }, [userPathways, weekDates]);

    // Combine all tasks
    const allTasks = [...revisionTasks, ...pathwayTasks];

    // Get tasks for a specific day
    const getTasksForDay = (date: string) => {
        return allTasks.filter(task => task.date === date);
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.getDate();
    };

    const isToday = (dateString: string) => dateString === today;

    return (
        <div className="planner animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Weekly Planner 📅</h1>
                <p className="page-subtitle">
                    Your revision and pathway tasks for this week
                </p>
            </header>

            {/* Google Calendar Sync Banner */}
            <div className="card-flat" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-xl)',
                background: 'linear-gradient(135deg, rgba(66,133,244,0.08) 0%, rgba(52,168,83,0.08) 50%, rgba(251,188,4,0.08) 100%)',
                border: '1px solid rgba(66,133,244,0.2)',
                flexWrap: 'wrap',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 'var(--radius-md)',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    }}>
                        <Calendar size={20} style={{ color: '#4285F4' }} />
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>Sync with Google Calendar</div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Automatically add study sessions to your calendar</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                        href="https://calendar.google.com/calendar/r/eventedit?text=TY+Study+Session&dates=20260301T160000/20260301T170000&details=Revision+session+from+TY+Study+App"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                        style={{ textDecoration: 'none' }}
                    >
                        <ExternalLink size={14} /> Connect
                    </a>
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => {
                            const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TY Tutor App//EN\n${allTasks.map(t => {
                                const d = t.date.replace(/-/g, '');
                                return `BEGIN:VEVENT\nDTSTART:${d}T160000\nDTEND:${d}T170000\nSUMMARY:${t.title}\nDESCRIPTION:${'subject' in t ? t.subject : t.pathway} - TY Tutor App\nEND:VEVENT`;
                            }).join('\n')}\nEND:VCALENDAR`;
                            const blob = new Blob([icsContent], { type: 'text/calendar' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'ty-tutor-planner.ics';
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                    >
                        <Download size={14} /> Export .ics
                    </button>
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-lg mb-lg" style={{ flexWrap: 'wrap' }}>
                <div className="flex items-center gap-sm">
                    <div style={{
                        width: 12,
                        height: 12,
                        borderLeft: '3px solid var(--accent-blue)',
                        backgroundColor: 'var(--bg-tertiary)',
                        borderRadius: 2
                    }} />
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Revision</span>
                </div>
                <div className="flex items-center gap-sm">
                    <div style={{
                        width: 12,
                        height: 12,
                        borderLeft: '3px solid var(--accent-purple)',
                        backgroundColor: 'var(--bg-tertiary)',
                        borderRadius: 2
                    }} />
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Pathway</span>
                </div>
            </div>

            {/* Week Grid */}
            <div className="planner-grid">
                {weekDates.map((date, index) => {
                    const dayTasks = getTasksForDay(date);
                    const dayIsToday = isToday(date);

                    return (
                        <div
                            key={date}
                            className={`planner-day ${dayIsToday ? 'today' : ''}`}
                        >
                            <div className="planner-day-header">
                                <div>{DAY_NAMES[index]}</div>
                                <div style={{
                                    fontSize: 'var(--font-size-lg)',
                                    fontWeight: 700,
                                    color: dayIsToday ? 'var(--accent-blue)' : 'var(--text-primary)'
                                }}>
                                    {formatDate(date)}
                                </div>
                            </div>

                            <div className="planner-tasks">
                                {dayTasks.length === 0 ? (
                                    <div style={{
                                        fontSize: 'var(--font-size-xs)',
                                        color: 'var(--text-muted)',
                                        textAlign: 'center',
                                        padding: 'var(--space-md)'
                                    }}>
                                        No tasks
                                    </div>
                                ) : (
                                    dayTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`planner-task ${task.type}`}
                                            draggable

                                        >
                                            <div style={{
                                                fontSize: 'var(--font-size-sm)',
                                                fontWeight: 500,
                                                marginBottom: 'var(--space-xs)'
                                            }}>
                                                {task.title}
                                            </div>
                                            <div style={{
                                                fontSize: 'var(--font-size-xs)',
                                                color: 'var(--text-muted)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 'var(--space-xs)'
                                            }}>
                                                {task.type === 'revision' ? <BookOpen style={{ width: 12, height: 12 }} /> : <Compass style={{ width: 12, height: 12 }} />}
                                                {'subject' in task ? task.subject : task.pathway}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="card mt-lg">
                <h3 className="section-title mb-md">This Week's Summary</h3>
                <div className="grid-2">
                    <div>
                        <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--accent-blue)' }}>
                            {revisionTasks.length}
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                            Revision sessions
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--accent-purple)' }}>
                            {pathwayTasks.length}
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                            Pathway tasks
                        </div>
                    </div>
                </div>
            </div>

            {/* Tip */}
            <div className="card-flat mt-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                    💡 <strong>Tip:</strong> Tasks are suggested based on topics that need revision and your chosen pathways.
                    Mark topics as "Confident" in the Subjects page to remove them from the planner.
                </div>
            </div>
        </div>
    );
}
