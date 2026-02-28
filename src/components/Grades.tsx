import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { JuniorCycleGrade, JuniorCycleLevel, JuniorCycleGradeValue } from '../types';
import {
    Award,
    Plus,
    Trash2,
    Edit3,
    Save,
    X,
    ExternalLink,
} from 'lucide-react';

const JC_SUBJECTS = [
    'English', 'Irish', 'Maths', 'History', 'Geography', 'Science',
    'French', 'German', 'Spanish', 'Business Studies', 'Art',
    'Music', 'Home Economics', 'Wood Technology', 'Engineering',
    'Graphics', 'CSPE', 'SPHE', 'RE', 'Classics',
];

const LEVELS: JuniorCycleLevel[] = ['Higher', 'Ordinary', 'Common'];

const GRADES: JuniorCycleGradeValue[] = [
    'Distinction', 'Higher Merit', 'Merit', 'Achieved', 'Partially Achieved', 'Not Graded',
];

const gradeColor = (grade: JuniorCycleGradeValue): string => {
    switch (grade) {
        case 'Distinction': return '#22c55e';
        case 'Higher Merit': return '#3b82f6';
        case 'Merit': return '#8b5cf6';
        case 'Achieved': return '#f97316';
        case 'Partially Achieved': return '#ef4444';
        default: return '#94a3b8';
    }
};

export function Grades() {
    const { state, dispatch } = useApp();
    const grades = state.juniorCycleGrades || [];

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [subjectName, setSubjectName] = useState('');
    const [level, setLevel] = useState<JuniorCycleLevel>('Higher');
    const [grade, setGrade] = useState<JuniorCycleGradeValue>('Merit');

    const resetForm = () => {
        setSubjectName('');
        setLevel('Higher');
        setGrade('Merit');
        setEditingId(null);
        setShowForm(false);
    };

    const handleSave = () => {
        if (!subjectName.trim()) return;

        let newGrades: JuniorCycleGrade[];

        if (editingId) {
            newGrades = grades.map((g) =>
                g.id === editingId
                    ? { ...g, subjectName: subjectName.trim(), level, grade }
                    : g
            );
        } else {
            const newGrade: JuniorCycleGrade = {
                id: crypto.randomUUID(),
                subjectName: subjectName.trim(),
                level,
                grade,
            };
            newGrades = [...grades, newGrade];
        }

        dispatch({ type: 'SET_JUNIOR_GRADES', payload: newGrades });
        resetForm();
    };

    const handleEdit = (g: JuniorCycleGrade) => {
        setSubjectName(g.subjectName);
        setLevel(g.level);
        setGrade(g.grade);
        setEditingId(g.id);
        setShowForm(true);
    };

    const handleDelete = (id: string) => {
        dispatch({ type: 'SET_JUNIOR_GRADES', payload: grades.filter((g) => g.id !== id) });
    };

    // Summary stats
    const higherCount = grades.filter((g) => g.level === 'Higher').length;
    const ordinaryCount = grades.filter((g) => g.level === 'Ordinary').length;
    const distinctionCount = grades.filter((g) => g.grade === 'Distinction').length;

    return (
        <div className="dashboard animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">My Junior Cycle Results 🏆</h1>
                <p className="page-subtitle">
                    Track your Junior Cycle grades to help plan your Leaving Cert subject choices
                </p>
            </header>

            {/* Summary Stats */}
            {grades.length > 0 && (
                <div className="grid-2 section" style={{ maxWidth: '600px' }}>
                    <div className="stat-card">
                        <div className="stat-value">{grades.length}</div>
                        <div className="stat-label">Subjects Entered</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{distinctionCount}</div>
                        <div className="stat-label">Distinctions</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{higherCount}</div>
                        <div className="stat-label">Higher Level</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{ordinaryCount}</div>
                        <div className="stat-label">Ordinary Level</div>
                    </div>
                </div>
            )}

            {/* Add / Edit Form */}
            <section className="section">
                {!showForm ? (
                    <button className="btn btn-primary btn-lg" onClick={() => setShowForm(true)}>
                        <Plus /> Add a Subject Grade
                    </button>
                ) : (
                    <div className="card-flat" style={{ maxWidth: '600px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                            <h3 style={{ margin: 0 }}>{editingId ? 'Edit Grade' : 'Add New Grade'}</h3>
                            <button className="btn btn-ghost btn-sm" onClick={resetForm}><X /></button>
                        </div>

                        <div className="form-group" style={{ marginBottom: 'var(--space-md)' }}>
                            <label className="input-label">Subject</label>
                            <select
                                className="input"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                            >
                                <option value="">Select a subject...</option>
                                {JC_SUBJECTS.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                            <div className="form-group">
                                <label className="input-label">Level</label>
                                <select className="input" value={level} onChange={(e) => setLevel(e.target.value as JuniorCycleLevel)}>
                                    {LEVELS.map((l) => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="input-label">Grade</label>
                                <select className="input" value={grade} onChange={(e) => setGrade(e.target.value as JuniorCycleGradeValue)}>
                                    {GRADES.map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-block"
                            onClick={handleSave}
                            disabled={!subjectName.trim()}
                        >
                            <Save /> {editingId ? 'Update Grade' : 'Save Grade'}
                        </button>
                    </div>
                )}
            </section>

            {/* Grades List */}
            {grades.length > 0 && (
                <section className="section">
                    <div className="section-header">
                        <h2 className="section-title">
                            <Award /> Your Results
                        </h2>
                    </div>
                    <div className="card-flat" style={{ padding: 0, overflow: 'hidden' }}>
                        {grades.map((g, index) => (
                            <div
                                key={g.id}
                                className="task-item"
                                style={{
                                    borderBottom: index < grades.length - 1 ? '1px solid var(--bg-tertiary)' : 'none',
                                    borderRadius: 0,
                                }}
                            >
                                <div style={{ width: 6, height: '100%', minHeight: 40, borderRadius: 3, background: gradeColor(g.grade), flexShrink: 0 }} />
                                <div className="task-content">
                                    <div className="task-title">{g.subjectName}</div>
                                    <div className="task-desc">{g.level} Level</div>
                                </div>
                                <span className="badge" style={{ background: `${gradeColor(g.grade)}18`, color: gradeColor(g.grade), fontWeight: 600 }}>
                                    {g.grade}
                                </span>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(g)}>
                                        <Edit3 size={14} />
                                    </button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(g.id)}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {grades.length === 0 && !showForm && (
                <div className="card-flat" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
                    <Award style={{ width: 48, height: 48, color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }} />
                    <h3 style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)' }}>No grades added yet</h3>
                    <p className="task-desc">Add your Junior Cycle results to help plan your Leaving Cert subject choices.</p>
                </div>
            )}

            {/* Useful Links */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">Useful Resources</h2>
                </div>
                <div className="flex gap-md" style={{ flexWrap: 'wrap' }}>
                    <a href="https://www.curriculumonline.ie/Junior-Cycle/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                        <ExternalLink size={14} /> NCCA Junior Cycle
                    </a>
                    <a href="https://www.examinations.ie/index.php?l=en&mc=en&sc=er" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                        <ExternalLink size={14} /> SEC Exam Results
                    </a>
                    <a href="https://www.studyclix.ie/junior-certificate" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                        <ExternalLink size={14} /> StudyClix JC
                    </a>
                </div>
            </section>
        </div>
    );
}
