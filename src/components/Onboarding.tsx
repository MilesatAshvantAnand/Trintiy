import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { seedSubjects, seedPathways } from '../data/seedData';
import type { PathwayId, RevisionFrequency } from '../types';
import {
    GraduationCap,

    BookOpen,
    Compass,
    Clock,
    ChevronRight,
    ChevronLeft,
    Check,
    Calculator,
    Languages,
    Globe,
    FlaskConical,
    Briefcase,
    Landmark,
    Map,
    Cpu,
    TrendingUp,
    Palette,
    MessageCircle,
    Heart,
} from 'lucide-react';

// Icon mappings
const subjectIcons: Record<string, React.ReactNode> = {
    Calculator: <Calculator />,
    Languages: <Languages />,
    BookOpen: <BookOpen />,
    Globe: <Globe />,
    FlaskConical: <FlaskConical />,
    Briefcase: <Briefcase />,
    Landmark: <Landmark />,
    Map: <Map />,
};

const pathwayIcons: Record<PathwayId, React.ReactNode> = {
    stem: <Cpu />,
    business: <TrendingUp />,
    creative: <Palette />,
    languages: <MessageCircle />,
    health: <Heart />,
};

interface OnboardingProps {
    onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
    const { dispatch } = useApp();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [selectedPathways, setSelectedPathways] = useState<PathwayId[]>([]);
    const [frequency, setFrequency] = useState<RevisionFrequency>('medium');

    const totalSteps = 4;

    const handleSubjectToggle = (subjectId: string) => {
        setSelectedSubjects(prev =>
            prev.includes(subjectId)
                ? prev.filter(id => id !== subjectId)
                : [...prev, subjectId]
        );
    };

    const handlePathwayToggle = (pathwayId: PathwayId) => {
        setSelectedPathways(prev =>
            prev.includes(pathwayId)
                ? prev.filter(id => id !== pathwayId)
                : [...prev, pathwayId]
        );
    };

    const handleComplete = () => {
        dispatch({
            type: 'SET_USER',
            payload: {
                id: Math.random().toString(36).substr(2, 9),
                name: name.trim() || 'Student',
                selectedSubjects,
                selectedPathways,
                revisionFrequency: frequency,
                onboardingComplete: true,
            },
        });
        onComplete();
    };

    const canProceed = () => {
        switch (step) {
            case 1: return name.trim().length > 0;
            case 2: return selectedSubjects.length >= 1;
            case 3: return selectedPathways.length >= 1;
            case 4: return true;
            default: return false;
        }
    };

    return (
        <div className="onboarding">
            <div className="onboarding-card animate-fade-in">
                {/* Progress Dots */}
                <div className="onboarding-progress">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                        <div
                            key={i}
                            className={`onboarding-dot ${i + 1 === step ? 'active' : i + 1 < step ? 'active' : ''}`}
                        />
                    ))}
                </div>

                {/* Step 1: Welcome & Name */}
                {step === 1 && (
                    <div className="onboarding-step animate-slide-up">
                        <div className="onboarding-icon">
                            <GraduationCap />
                        </div>
                        <h1 className="onboarding-title">Welcome to TY Study!</h1>
                        <p className="onboarding-desc">
                            Stay on top of your revision and explore exciting career pathways during Transition Year.
                        </p>
                        <div className="form-group text-left">
                            <label className="input-label">What's your name?</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter your first name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && canProceed() && setStep(2)}
                                autoFocus
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Select Subjects */}
                {step === 2 && (
                    <div className="onboarding-step animate-slide-up">
                        <div className="onboarding-icon" style={{ background: 'var(--gradient-business)' }}>
                            <BookOpen />
                        </div>
                        <h1 className="onboarding-title">Your Subjects</h1>
                        <p className="onboarding-desc">
                            Select the subjects you studied for the Junior Cycle. You can change these later.
                        </p>
                        <div className="grid-subjects" style={{ marginBottom: 'var(--space-lg)' }}>
                            {seedSubjects.map((subject) => (
                                <div
                                    key={subject.id}
                                    className={`subject-card ${selectedSubjects.includes(subject.id) ? 'selected' : ''}`}
                                    onClick={() => handleSubjectToggle(subject.id)}
                                >
                                    <div className="subject-icon" style={{ backgroundColor: subject.color }}>
                                        {subjectIcons[subject.icon] || <BookOpen />}
                                    </div>
                                    <div className="subject-name">{subject.name}</div>
                                    {selectedSubjects.includes(subject.id) && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            color: 'var(--accent-blue)'
                                        }}>
                                            <Check style={{ width: 18, height: 18 }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                            {selectedSubjects.length} selected
                        </p>
                    </div>
                )}

                {/* Step 3: Select Pathways */}
                {step === 3 && (
                    <div className="onboarding-step animate-slide-up">
                        <div className="onboarding-icon" style={{ background: 'var(--gradient-creative)' }}>
                            <Compass />
                        </div>
                        <h1 className="onboarding-title">Choose Your Pathways</h1>
                        <p className="onboarding-desc">
                            Select one or more areas you'd like to explore. These will help guide your learning.
                        </p>
                        <div className="grid-3" style={{ marginBottom: 'var(--space-lg)', textAlign: 'left' }}>
                            {seedPathways.map((pathway) => (
                                <div
                                    key={pathway.id}
                                    className={`pathway-card ${pathway.id} ${selectedPathways.includes(pathway.id) ? 'selected' : ''}`}
                                    onClick={() => handlePathwayToggle(pathway.id)}
                                    style={{ position: 'relative' }}
                                >
                                    <div className="pathway-icon">
                                        {pathwayIcons[pathway.id]}
                                    </div>
                                    <h3 className="pathway-name">{pathway.name}</h3>
                                    <p className="pathway-desc">{pathway.description}</p>
                                    {selectedPathways.includes(pathway.id) && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 12,
                                            right: 12,
                                            color: 'var(--accent-blue)'
                                        }}>
                                            <Check style={{ width: 20, height: 20 }} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                            {selectedPathways.length} selected
                        </p>
                    </div>
                )}

                {/* Step 4: Revision Frequency */}
                {step === 4 && (
                    <div className="onboarding-step animate-slide-up">
                        <div className="onboarding-icon" style={{ background: 'var(--gradient-health)' }}>
                            <Clock />
                        </div>
                        <h1 className="onboarding-title">Revision Pace</h1>
                        <p className="onboarding-desc">
                            How much revision do you want to do each week? You can adjust this anytime.
                        </p>
                        <div className="frequency-options">
                            <div
                                className={`frequency-option ${frequency === 'light' ? 'selected' : ''}`}
                                onClick={() => setFrequency('light')}
                            >
                                <div className="frequency-emoji">🌤️</div>
                                <div className="frequency-label">Light</div>
                                <div className="frequency-desc">1 session per subject</div>
                            </div>
                            <div
                                className={`frequency-option ${frequency === 'medium' ? 'selected' : ''}`}
                                onClick={() => setFrequency('medium')}
                            >
                                <div className="frequency-emoji">⚡</div>
                                <div className="frequency-label">Medium</div>
                                <div className="frequency-desc">2 sessions per subject</div>
                            </div>
                            <div
                                className={`frequency-option ${frequency === 'strong' ? 'selected' : ''}`}
                                onClick={() => setFrequency('strong')}
                            >
                                <div className="frequency-emoji">🔥</div>
                                <div className="frequency-label">Strong</div>
                                <div className="frequency-desc">3 sessions per subject</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="onboarding-actions">
                    {step > 1 && (
                        <button className="btn btn-secondary btn-lg" onClick={() => setStep(step - 1)}>
                            <ChevronLeft /> Back
                        </button>
                    )}
                    {step < totalSteps ? (
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => setStep(step + 1)}
                            disabled={!canProceed()}
                        >
                            Next <ChevronRight />
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleComplete}
                        >
                            Get Started! 🚀
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
