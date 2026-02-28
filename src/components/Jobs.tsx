import {
    Briefcase,
    Store,
    Coffee,
    Baby,
    BookOpen,
    MapPin,
    Search,
    FileText,
    MessageSquare,
    ShieldAlert,
    Clock,
    CheckSquare,
    ExternalLink,
    Cpu,
} from 'lucide-react';

export function Jobs() {
    return (
        <div className="dashboard animate-fade-in">
            {/* Header / Intro */}
            <header className="page-header">
                <h1 className="page-title">Part-Time Jobs for TY Students 💼</h1>
                <p className="page-subtitle">
                    Discover realistic part-time or casual work options you can actually get at 15–16.
                    Remember, the key is balancing work with school and your TY activities!
                </p>
            </header>

            {/* Typical Jobs */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <Briefcase />
                        Typical Jobs You Can Do at 15–16
                    </h2>
                </div>
                <div className="grid-3">
                    <div className="card-flat">
                        <div className="flex" style={{ alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <Store style={{ color: '#3b82f6' }} />
                            <h3 style={{ margin: 0 }}>Retail Assistant</h3>
                        </div>
                        <p className="task-desc">Stocking shelves, helping customers. Look in local convenience stores or supermarkets.</p>
                    </div>
                    <div className="card-flat">
                        <div className="flex" style={{ alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <Coffee style={{ color: '#f97316' }} />
                            <h3 style={{ margin: 0 }}>Café Worker</h3>
                        </div>
                        <p className="task-desc">Clearing tables, washing dishes, basic prep. Ask directly at busy local cafés.</p>
                    </div>
                    <div className="card-flat">
                        <div className="flex" style={{ alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <Baby style={{ color: '#ec4899' }} />
                            <h3 style={{ margin: 0 }}>Babysitting</h3>
                        </div>
                        <p className="task-desc">Minding younger children for neighbors. Speak to people in your community.</p>
                    </div>
                    <div className="card-flat">
                        <div className="flex" style={{ alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <BookOpen style={{ color: '#8b5cf6' }} />
                            <h3 style={{ margin: 0 }}>Tutoring</h3>
                        </div>
                        <p className="task-desc">Helping primary students with homework. Mention it to family friends or local schools.</p>
                    </div>
                    <div className="card-flat">
                        <div className="flex" style={{ alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <MapPin style={{ color: '#14b8a6' }} />
                            <h3 style={{ margin: 0 }}>Local Sports Coach</h3>
                        </div>
                        <p className="task-desc">Assisting with younger teams. Ask at your own GAA, soccer, or rugby club.</p>
                    </div>
                    <div className="card-flat">
                        <div className="flex" style={{ alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <Briefcase style={{ color: '#10b981' }} />
                            <h3 style={{ margin: 0 }}>Summer Jobs</h3>
                        </div>
                        <p className="task-desc">Camps, tourism spots, or extra retail help. Start looking in Spring!</p>
                    </div>
                    <div className="card-flat">
                        <div className="flex" style={{ alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <Cpu style={{ color: '#3b82f6' }} />
                            <h3 style={{ margin: 0 }}>Accelerators & Tech</h3>
                        </div>
                        <p className="task-desc">Programs like <a href="https://www.joinpatch.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: 600 }}>Patch</a> offer excellent experience.</p>
                    </div>
                </div>
            </section>

            {/* Where to Find Jobs */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <Search />
                        Where to Find Jobs
                    </h2>
                </div>
                <div className="card-flat">
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                        <li className="flex" style={{ gap: 'var(--space-md)' }}>
                            <div className="pathway-icon" style={{ background: 'var(--bg-secondary)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}><MapPin size={20} /></div>
                            <div>
                                <strong>Ask Locally</strong>
                                <p className="task-desc" style={{ marginTop: '4px' }}>Walk into local shops, cafés, and restaurants. Ask if they are hiring or taking CVs for weekend staff.</p>
                            </div>
                        </li>
                        <li className="flex" style={{ gap: 'var(--space-md)' }}>
                            <div className="pathway-icon" style={{ background: 'var(--bg-secondary)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}><Search size={20} /></div>
                            <div>
                                <strong>Online Sites</strong>
                                <p className="task-desc" style={{ marginTop: '4px' }}>Check Indeed, Jobs.ie, or local community Facebook groups. Filter for "part-time" or "weekend".</p>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                                    <a href="https://ie.indeed.com/q-part-time-teenager-jobs.html" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary" style={{ textDecoration: 'none' }}><ExternalLink size={14} /> Indeed</a>
                                    <a href="https://www.jobs.ie/part-time-jobs" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary" style={{ textDecoration: 'none' }}><ExternalLink size={14} /> Jobs.ie</a>
                                    <a href="https://www.linkedin.com/jobs/search?keywords=part%20time&location=Ireland" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary" style={{ textDecoration: 'none' }}><ExternalLink size={14} /> LinkedIn</a>
                                    <a href="https://careersportal.ie/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary" style={{ textDecoration: 'none' }}><ExternalLink size={14} /> Careers Portal</a>
                                </div>
                            </div>
                        </li>
                        <li className="flex" style={{ gap: 'var(--space-md)' }}>
                            <div className="pathway-icon" style={{ background: 'var(--bg-secondary)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}><MessageSquare size={20} /></div>
                            <div>
                                <strong>Word of Mouth</strong>
                                <p className="task-desc" style={{ marginTop: '4px' }}>Tell family, friends, and teachers you're looking. Look at school noticeboards or ask your sports club.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* CV and First Impression */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <FileText />
                        CV & First Impression Basics
                    </h2>
                </div>
                <div className="grid-2">
                    <div className="card-flat">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <FileText size={20} style={{ color: '#3b82f6' }} />
                            First CV Checklist
                        </h3>
                        <ul className="task-desc" style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
                            <li>Contact details (Phone, Professional Email)</li>
                            <li>A short friendly intro about yourself and TY</li>
                            <li>Education details (School name, Junior Cert results)</li>
                            <li>Skills (e.g., Teamwork, communication, punctuality)</li>
                            <li>Any volunteering, school council, or sports</li>
                            <li>References (Teacher or coach)</li>
                        </ul>
                    </div>
                    <div className="card-flat">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <MessageSquare size={20} style={{ color: '#f97316' }} />
                            What to say in person
                        </h3>
                        <p className="task-desc" style={{ marginBottom: '12px' }}>
                            When handing your CV to a manager, smile and be polite!
                        </p>
                        <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', fontStyle: 'italic', borderLeft: '4px solid var(--primary)' }}>
                            "Hi, my name is [Name]. I'm a TY student looking for part-time work. Are you hiring at the moment or could I leave my CV with the manager?"
                        </div>
                    </div>
                </div>
            </section>

            {/* Legal and Safety Notes */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <ShieldAlert />
                        Legal and Safety Notes
                    </h2>
                </div>
                <div className="card-flat" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="flex" style={{ gap: '16px', alignItems: 'flex-start' }}>
                        <Clock style={{ color: '#f97316', flexShrink: 0 }} />
                        <div>
                            <h3 style={{ margin: '0 0 8px 0' }}>Know Your Rights at 15–16</h3>
                            <p className="task-desc" style={{ marginBottom: '8px' }}>
                                <strong>Hours:</strong> 15-year-olds can do light work for a maximum of 8 hours a week during school term. 16/17-year-olds can work up to 40 hours a week, with restrictions on late night limits.
                            </p>
                            <p className="task-desc" style={{ marginBottom: '8px' }}>
                                <strong>Permission:</strong> You need written permission from a parent/guardian if you are under 16.
                            </p>
                            <p className="task-desc" style={{ marginBottom: '0' }}>
                                <strong>Wellbeing:</strong> Don't let work damage your school performance, TY activities, or health. School comes first!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Plan */}
            <section className="section">
                <div className="section-header">
                    <h2 className="section-title">
                        <CheckSquare />
                        This Week's Action Plan
                    </h2>
                </div>
                <div className="card-flat" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="task-item" style={{ borderBottom: '1px solid var(--border-color)', borderRadius: 0 }}>
                        <div className="task-checkbox"><div style={{ width: 18, height: 18, border: '2px solid var(--text-muted)', borderRadius: '4px' }}></div></div>
                        <div className="task-content">
                            <div className="task-title">List your skills and experiences</div>
                            <div className="task-desc">Think about sports, volunteering, and junior cert performance.</div>
                        </div>
                    </div>
                    <div className="task-item" style={{ borderBottom: '1px solid var(--border-color)', borderRadius: 0 }}>
                        <div className="task-checkbox"><div style={{ width: 18, height: 18, border: '2px solid var(--text-muted)', borderRadius: '4px' }}></div></div>
                        <div className="task-content">
                            <div className="task-title">Draft a simple 1-page CV</div>
                            <div className="task-desc">Use a template online or from MS Word. Keep it clean.</div>
                        </div>
                    </div>
                    <div className="task-item" style={{ borderRadius: 0 }}>
                        <div className="task-checkbox"><div style={{ width: 18, height: 18, border: '2px solid var(--text-muted)', borderRadius: '4px' }}></div></div>
                        <div className="task-content">
                            <div className="task-title">Drop CV into 2-3 local places</div>
                            <div className="task-desc">Dress neatly, smile, and ask for the manager.</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
