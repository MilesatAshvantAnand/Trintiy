import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { PathwayId, Career, CourseInfo } from '../types';
import {
    Cpu,
    TrendingUp,
    Palette,
    MessageCircle,
    Heart,
    Check,
    ChevronRight,
    ChevronLeft,
    GraduationCap,
    Briefcase,
    Euro,
    TrendingUp as GrowthIcon,
    ExternalLink,
    BookOpen,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

const pathwayIcons: Record<PathwayId, React.ReactNode> = {
    stem: <Cpu />,
    business: <TrendingUp />,
    creative: <Palette />,
    languages: <MessageCircle />,
    health: <Heart />,
};

const formatSalary = (amount: number): string => {
    return `€${(amount / 1000).toFixed(0)}k`;
};

export function Pathways() {
    const { state, dispatch, getUserPathways } = useApp();
    const [selectedPathway, setSelectedPathway] = useState<PathwayId | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'careers' | 'courses' | 'subjects' | 'tasks'>('overview');
    const [expandedCareer, setExpandedCareer] = useState<string | null>(null);

    const allPathways = state.pathways;
    const userPathways = getUserPathways();
    const userPathwayIds = state.user?.selectedPathways || [];

    const handleToggleTask = (pathwayId: PathwayId, taskId: string) => {
        dispatch({
            type: 'TOGGLE_PATHWAY_TASK',
            payload: { pathwayId, taskId },
        });
    };

    const handleTogglePathway = (pathwayId: PathwayId) => {
        const currentPathways = [...userPathwayIds];
        const index = currentPathways.indexOf(pathwayId);

        if (index >= 0) {
            currentPathways.splice(index, 1);
        } else {
            currentPathways.push(pathwayId);
        }

        dispatch({
            type: 'SELECT_PATHWAYS',
            payload: currentPathways,
        });
    };

    // Salary bar component
    const SalaryBar = ({ salary, maxSalary = 150000 }: { salary: { entry: number; mid: number; senior: number }; maxSalary?: number }) => {
        const entryWidth = (salary.entry / maxSalary) * 100;
        const midWidth = (salary.mid / maxSalary) * 100;
        const seniorWidth = (salary.senior / maxSalary) * 100;

        return (
            <div className="salary-visualization">
                <div className="salary-bar-container">
                    <div className="salary-bar-track">
                        <div className="salary-bar-segment entry" style={{ width: `${entryWidth}%` }} />
                        <div className="salary-bar-segment mid" style={{ width: `${midWidth - entryWidth}%`, left: `${entryWidth}%` }} />
                        <div className="salary-bar-segment senior" style={{ width: `${seniorWidth - midWidth}%`, left: `${midWidth}%` }} />
                    </div>
                </div>
                <div className="salary-labels">
                    <span className="salary-label entry">{formatSalary(salary.entry)}</span>
                    <span className="salary-label mid">{formatSalary(salary.mid)}</span>
                    <span className="salary-label senior">{formatSalary(salary.senior)}</span>
                </div>
                <div className="salary-legend">
                    <span>Entry</span>
                    <span>Mid</span>
                    <span>Senior</span>
                </div>
            </div>
        );
    };

    // Career card component
    const CareerCard = ({ career }: { career: Career }) => {
        const isExpanded = expandedCareer === career.id;

        return (
            <div className={`career-card ${isExpanded ? 'expanded' : ''}`}>
                <div
                    className="career-card-header"
                    onClick={() => setExpandedCareer(isExpanded ? null : career.id)}
                >
                    <div className="career-info">
                        <Briefcase className="career-icon" />
                        <div>
                            <h4 className="career-title">{career.title}</h4>
                            <p className="career-salary-quick">
                                {formatSalary(career.salary.entry)} – {formatSalary(career.salary.senior)}
                            </p>
                        </div>
                    </div>
                    <div className="career-meta">
                        <span className={`growth-badge ${career.growthOutlook}`}>
                            <GrowthIcon style={{ width: 12, height: 12 }} />
                            {career.growthOutlook === 'high' ? 'High demand' : career.growthOutlook === 'medium' ? 'Steady' : 'Limited'}
                        </span>
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </div>

                {isExpanded && (
                    <div className="career-card-body">
                        <p className="career-description">{career.description}</p>

                        <div className="career-detail">
                            <GraduationCap style={{ width: 16, height: 16 }} />
                            <span>{career.education}</span>
                        </div>

                        <div className="salary-section">
                            <h5>Salary Progression</h5>
                            <SalaryBar salary={career.salary} />
                        </div>

                        <a
                            href={`https://www.careersportal.ie/careers/?search=${encodeURIComponent(career.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-secondary career-link"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink style={{ width: 14, height: 14 }} />
                            Learn more on CareersPortal
                        </a>
                    </div>
                )}
            </div>
        );
    };

    // Course chip component
    const CourseChip = ({ course }: { course: CourseInfo }) => (
        <div className={`course-chip ${course.type}`}>
            <div className="course-chip-header">
                <BookOpen style={{ width: 16, height: 16 }} />
                <span className="course-name">{course.name}</span>
            </div>
            <div className="course-chip-details">
                <span className="course-institution">{course.institution}</span>
                {course.type === 'degree' && (
                    <>
                        <span className="course-points">
                            {course.caoPoints.min}–{course.caoPoints.max} pts
                        </span>
                        <span className="course-fee">
                            €{course.annualFee.toLocaleString()}/yr
                        </span>
                    </>
                )}
                <span className="course-duration">{course.duration}</span>
            </div>
        </div>
    );

    // If a pathway is selected, show its details
    if (selectedPathway) {
        const pathway = allPathways.find(p => p.id === selectedPathway);
        if (!pathway) return null;

        const completedCount = pathway.tasks.filter(t => t.completed).length;
        const progress = (completedCount / pathway.tasks.length) * 100;
        const isSelected = userPathwayIds.includes(pathway.id);

        return (
            <div className="pathway-detail animate-fade-in">
                <button
                    className="btn btn-ghost mb-lg"
                    onClick={() => setSelectedPathway(null)}
                >
                    <ChevronLeft /> Back to Pathways
                </button>

                <header className="page-header">
                    <div className="flex items-center gap-md">
                        <div className={`pathway-icon`} style={{
                            background: pathway.id === 'stem' ? 'var(--gradient-stem)' :
                                pathway.id === 'business' ? 'var(--gradient-business)' :
                                    pathway.id === 'creative' ? 'var(--gradient-creative)' :
                                        pathway.id === 'languages' ? 'var(--gradient-languages)' :
                                            'var(--gradient-health)'
                        }}>
                            {pathwayIcons[pathway.id]}
                        </div>
                        <div>
                            <h1 className="page-title">{pathway.name} Pathway</h1>
                            <p className="page-subtitle">{pathway.description}</p>
                        </div>
                    </div>
                    <button
                        className={`btn ${isSelected ? 'btn-primary' : 'btn-secondary'} mt-md`}
                        onClick={() => handleTogglePathway(pathway.id)}
                    >
                        {isSelected ? <><Check /> Added to My Pathways</> : 'Add to My Pathways'}
                    </button>
                </header>

                {/* Stats Cards */}
                <div className="pathway-stats">
                    <div className="stat-card">
                        <Euro className="stat-icon" />
                        <div>
                            <span className="stat-value">{formatSalary(pathway.avgStartingSalary)}</span>
                            <span className="stat-label">Avg. Starting Salary</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <GrowthIcon className="stat-icon" />
                        <div>
                            <span className="stat-value">{pathway.jobGrowth}</span>
                            <span className="stat-label">Job Growth</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Briefcase className="stat-icon" />
                        <div>
                            <span className="stat-value">{pathway.careers.length}</span>
                            <span className="stat-label">Career Options</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <GraduationCap className="stat-icon" />
                        <div>
                            <span className="stat-value">{pathway.courses.length}</span>
                            <span className="stat-label">Courses</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="pathway-tabs">
                    <button
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab ${activeTab === 'careers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('careers')}
                    >
                        Careers ({pathway.careers.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courses')}
                    >
                        Courses ({pathway.courses.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tasks')}
                    >
                        Tasks ({completedCount}/{pathway.tasks.length})
                    </button>
                    <button
                        className={`tab ${activeTab === 'subjects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('subjects')}
                    >
                        Subjects
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            {/* Featured Careers */}
                            <section className="section">
                                <div className="section-header">
                                    <h3 className="section-title">Top Careers</h3>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('careers')}>
                                        View all <ChevronRight style={{ width: 14, height: 14 }} />
                                    </button>
                                </div>
                                <div className="careers-preview">
                                    {pathway.careers.slice(0, 2).map(career => (
                                        <CareerCard key={career.id} career={career} />
                                    ))}
                                </div>
                            </section>

                            {/* Featured Courses */}
                            <section className="section">
                                <div className="section-header">
                                    <h3 className="section-title">Related Courses</h3>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('courses')}>
                                        View all <ChevronRight style={{ width: 14, height: 14 }} />
                                    </button>
                                </div>
                                <div className="courses-grid">
                                    {pathway.courses.slice(0, 3).map(course => (
                                        <CourseChip key={course.id} course={course} />
                                    ))}
                                </div>
                            </section>

                            {/* Progress */}
                            <section className="section">
                                <h3 className="section-title">Your Progress</h3>
                                <div className="card">
                                    <div className="flex justify-between items-center mb-sm">
                                        <span style={{ fontWeight: 600 }}>Exploration Tasks</span>
                                        <span style={{ color: 'var(--text-muted)' }}>{completedCount} of {pathway.tasks.length} complete</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className={`progress-bar-fill ${pathway.id === 'stem' ? 'blue' : pathway.id === 'business' ? 'orange' : pathway.id === 'creative' ? 'pink' : pathway.id === 'languages' ? 'teal' : 'green'}`}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <button className="btn btn-secondary btn-sm mt-md" onClick={() => setActiveTab('tasks')}>
                                        Continue exploring <ChevronRight style={{ width: 14, height: 14 }} />
                                    </button>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'careers' && (
                        <div className="careers-tab">
                            <div className="careers-list">
                                {pathway.careers.map(career => (
                                    <CareerCard key={career.id} career={career} />
                                ))}
                            </div>
                            <div className="resource-links">
                                <h4>Explore More</h4>
                                <a href="https://www.careersportal.ie" target="_blank" rel="noopener noreferrer" className="resource-link">
                                    <ExternalLink style={{ width: 14, height: 14 }} />
                                    CareersPortal Ireland
                                </a>
                                <a href="https://www.cao.ie" target="_blank" rel="noopener noreferrer" className="resource-link">
                                    <ExternalLink style={{ width: 14, height: 14 }} />
                                    CAO Applications
                                </a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'courses' && (
                        <div className="courses-tab">
                            <div className="courses-section">
                                <h4>Leaving Certificate Subjects</h4>
                                <div className="courses-grid">
                                    {pathway.courses.filter(c => c.type === 'leaving-cert').map(course => (
                                        <CourseChip key={course.id} course={course} />
                                    ))}
                                </div>
                            </div>
                            <div className="courses-section">
                                <h4>College Degrees</h4>
                                <p className="courses-note">
                                    💡 EU students pay €2,500/year (student contribution). Non-EU fees are higher.
                                </p>
                                <div className="courses-grid">
                                    {pathway.courses.filter(c => c.type === 'degree').map(course => (
                                        <CourseChip key={course.id} course={course} />
                                    ))}
                                </div>
                            </div>
                            <div className="resource-links">
                                <h4>Useful Links</h4>
                                <a href="https://www.cao.ie" target="_blank" rel="noopener noreferrer" className="resource-link">
                                    <ExternalLink style={{ width: 14, height: 14 }} />
                                    CAO Course Search
                                </a>
                                <a href="https://www.qualifax.ie" target="_blank" rel="noopener noreferrer" className="resource-link">
                                    <ExternalLink style={{ width: 14, height: 14 }} />
                                    Qualifax Course Finder
                                </a>
                                <a href="https://www.tcd.ie/courses/undergraduate/" target="_blank" rel="noopener noreferrer" className="resource-link">
                                    <ExternalLink style={{ width: 14, height: 14 }} />
                                    Trinity College Dublin Courses
                                </a>
                            </div>
                        </div>
                    )}

                    {activeTab === 'tasks' && (
                        <div className="tasks-tab">
                            <div className="card-flat">
                                {pathway.tasks.map((task, index) => (
                                    <div
                                        key={task.id}
                                        className={`task-item ${task.completed ? 'completed' : ''}`}
                                        style={{ borderBottom: index < pathway.tasks.length - 1 ? '1px solid var(--bg-tertiary)' : 'none' }}
                                    >
                                        <div
                                            className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                                            onClick={() => handleToggleTask(pathway.id, task.id)}
                                        >
                                            <Check />
                                        </div>
                                        <div className="task-content">
                                            <div className="task-title">{task.title}</div>
                                            <div className="task-desc">{task.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'subjects' && pathway.recommendedSubjects && (
                        <div className="subjects-tab">
                            <p className="task-desc" style={{ marginBottom: 'var(--space-lg)' }}>
                                These are the Leaving Cert subjects that align best with the <strong>{pathway.name}</strong> pathway. Plan your choices carefully!
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                {/* Required */}
                                <div className="card-flat" style={{ borderLeft: '4px solid var(--accent-red)' }}>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)', color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Required / Essential</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {pathway.recommendedSubjects.required.map((s) => (
                                            <span key={s} className="badge" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', fontWeight: 600 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommended */}
                                <div className="card-flat" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)', color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {pathway.recommendedSubjects.recommended.map((s) => (
                                            <span key={s} className="badge" style={{ background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)', fontWeight: 600 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Useful */}
                                <div className="card-flat" style={{ borderLeft: '4px solid var(--accent-green)' }}>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)', color: 'var(--accent-green)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Also Useful</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {pathway.recommendedSubjects.useful.map((s) => (
                                            <span key={s} className="badge" style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--accent-green)', fontWeight: 600 }}>{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="resource-links" style={{ marginTop: 'var(--space-lg)' }}>
                                <h4>Explore More</h4>
                                <a href="https://www.careersportal.ie/school_subjects/" target="_blank" rel="noopener noreferrer" className="resource-link">
                                    <ExternalLink style={{ width: 14, height: 14 }} />
                                    CareersPortal – Subject Chooser
                                </a>
                                <a href="https://www.studyclix.ie/leaving-certificate" target="_blank" rel="noopener noreferrer" className="resource-link">
                                    <ExternalLink style={{ width: 14, height: 14 }} />
                                    StudyClix – LC Subject Guides
                                </a>
                                <a href="https://www.cao.ie/index.php?page=requirementsresults" target="_blank" rel="noopener noreferrer" className="resource-link">
                                    <ExternalLink style={{ width: 14, height: 14 }} />
                                    CAO – Subject Requirements
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Show all pathways
    return (
        <div className="pathways animate-fade-in">
            <header className="page-header">
                <h1 className="page-title">Explore Pathways 🧭</h1>
                <p className="page-subtitle">Discover careers, courses, and real salary data</p>
            </header>

            {/* Your Pathways */}
            {userPathways.length > 0 && (
                <section className="section">
                    <h2 className="section-title mb-md">Your Selected Pathways</h2>
                    <div className="grid-3">
                        {userPathways.map((pathway) => {
                            const completedCount = pathway.tasks.filter(t => t.completed).length;
                            const progress = (completedCount / pathway.tasks.length) * 100;

                            return (
                                <div
                                    key={pathway.id}
                                    className={`pathway-card ${pathway.id} selected`}
                                    onClick={() => setSelectedPathway(pathway.id)}
                                >
                                    <div className="pathway-icon">
                                        {pathwayIcons[pathway.id]}
                                    </div>
                                    <h3 className="pathway-name">{pathway.name}</h3>
                                    <p className="pathway-desc">{pathway.description}</p>
                                    <div className="pathway-quick-stats">
                                        <span className="quick-stat">
                                            <Euro style={{ width: 12, height: 12 }} />
                                            {formatSalary(pathway.avgStartingSalary)}
                                        </span>
                                        <span className="quick-stat">
                                            <Briefcase style={{ width: 12, height: 12 }} />
                                            {pathway.careers.length} careers
                                        </span>
                                    </div>
                                    <div style={{ marginTop: 'var(--space-md)' }}>
                                        <div className="progress-bar">
                                            <div
                                                className={`progress-bar-fill ${pathway.id === 'stem' ? 'blue' : pathway.id === 'business' ? 'orange' : pathway.id === 'creative' ? 'pink' : pathway.id === 'languages' ? 'teal' : 'green'}`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center mt-sm" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>
                                            <span>{completedCount}/{pathway.tasks.length} tasks</span>
                                            <span className="flex items-center gap-sm">
                                                Explore <ChevronRight style={{ width: 14, height: 14 }} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* All Pathways */}
            <section className="section">
                <h2 className="section-title mb-md">All Pathways</h2>
                <div className="grid-3">
                    {allPathways.map((pathway) => {
                        const isSelected = userPathwayIds.includes(pathway.id);

                        return (
                            <div
                                key={pathway.id}
                                className={`pathway-card ${pathway.id} ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedPathway(pathway.id)}
                            >
                                <div className="pathway-icon">
                                    {pathwayIcons[pathway.id]}
                                </div>
                                <h3 className="pathway-name">{pathway.name}</h3>
                                <p className="pathway-desc">{pathway.description}</p>
                                <div className="pathway-quick-stats">
                                    <span className="quick-stat">
                                        <Euro style={{ width: 12, height: 12 }} />
                                        {formatSalary(pathway.avgStartingSalary)} avg
                                    </span>
                                    <span className="quick-stat">
                                        <Briefcase style={{ width: 12, height: 12 }} />
                                        {pathway.careers.length} careers
                                    </span>
                                </div>
                                <div className="flex gap-sm mt-md">
                                    <button
                                        className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={(e) => { e.stopPropagation(); handleTogglePathway(pathway.id); }}
                                    >
                                        {isSelected ? <><Check /> Selected</> : 'Add to my pathways'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
