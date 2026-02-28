import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction } from '../types';
import { seedSubjects, seedPathways } from '../data/seedData';

const STORAGE_KEY = 'ty-study-app-data';

const initialState: AppState = {
    user: null,
    subjects: seedSubjects,
    pathways: seedPathways,
    scheduledTasks: [],
    reflections: [],
    juniorCycleGrades: [],
    guidanceQuestions: [],
    quizAttempts: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case 'LOAD_STATE':
            return action.payload;

        case 'SET_USER':
            return { ...state, user: action.payload };

        case 'UPDATE_USER':
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload } : null,
            };

        case 'COMPLETE_ONBOARDING':
            return {
                ...state,
                user: state.user ? { ...state.user, onboardingComplete: true } : null,
            };

        case 'SELECT_SUBJECTS':
            return {
                ...state,
                user: state.user ? { ...state.user, selectedSubjects: action.payload } : null,
            };

        case 'SELECT_PATHWAYS':
            return {
                ...state,
                user: state.user ? { ...state.user, selectedPathways: action.payload } : null,
            };

        case 'UPDATE_TOPIC_STATUS': {
            const { subjectId, topicId, status } = action.payload;
            return {
                ...state,
                subjects: state.subjects.map((subject) =>
                    subject.id === subjectId
                        ? {
                            ...subject,
                            topics: subject.topics.map((topic) =>
                                topic.id === topicId ? { ...topic, status } : topic
                            ),
                        }
                        : subject
                ),
            };
        }

        case 'UPDATE_TOPIC_NOTES': {
            const { subjectId, topicId, notes, links } = action.payload;
            return {
                ...state,
                subjects: state.subjects.map((subject) =>
                    subject.id === subjectId
                        ? {
                            ...subject,
                            topics: subject.topics.map((topic) =>
                                topic.id === topicId ? { ...topic, notes, links } : topic
                            ),
                        }
                        : subject
                ),
            };
        }

        case 'ADD_TOPIC': {
            const { subjectId, topic } = action.payload;
            return {
                ...state,
                subjects: state.subjects.map((subject) =>
                    subject.id === subjectId
                        ? { ...subject, topics: [...subject.topics, topic] }
                        : subject
                ),
            };
        }

        case 'TOGGLE_PATHWAY_TASK': {
            const { pathwayId, taskId } = action.payload;
            return {
                ...state,
                pathways: state.pathways.map((pathway) =>
                    pathway.id === pathwayId
                        ? {
                            ...pathway,
                            tasks: pathway.tasks.map((task) =>
                                task.id === taskId ? { ...task, completed: !task.completed } : task
                            ),
                        }
                        : pathway
                ),
            };
        }

        case 'SCHEDULE_TASK':
            return {
                ...state,
                scheduledTasks: [...state.scheduledTasks, action.payload],
            };

        case 'RESCHEDULE_TASK': {
            const { taskId, newDate } = action.payload;
            return {
                ...state,
                scheduledTasks: state.scheduledTasks.map((task) =>
                    task.id === taskId ? { ...task, scheduledDate: newDate } : task
                ),
            };
        }

        case 'TOGGLE_SCHEDULED_TASK':
            return {
                ...state,
                scheduledTasks: state.scheduledTasks.map((task) =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                ),
            };

        case 'ADD_REFLECTION':
            return {
                ...state,
                reflections: [...state.reflections, action.payload],
            };

        case 'SET_JUNIOR_GRADES':
            return {
                ...state,
                juniorCycleGrades: action.payload,
            };

        case 'ADD_GUIDANCE_QUESTION':
            return {
                ...state,
                guidanceQuestions: [...state.guidanceQuestions, action.payload],
            };

        case 'ANSWER_GUIDANCE_QUESTION': {
            const { questionId, answer } = action.payload;
            return {
                ...state,
                guidanceQuestions: state.guidanceQuestions.map((q) =>
                    q.id === questionId
                        ? { ...q, answer, answeredAt: new Date().toISOString() }
                        : q
                ),
            };
        }

        case 'SUBMIT_QUIZ_ATTEMPT':
            return {
                ...state,
                quizAttempts: [...state.quizAttempts, action.payload],
            };

        default:
            return state;
    }
}

interface AppContextValue {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
    // Helper functions
    getUserSubjects: () => typeof seedSubjects;
    getUserPathways: () => typeof seedPathways;
    getTopicsNeedingRevision: () => { subject: string; topic: string; subjectId: string }[];
    getWeeklyProgress: () => { topicsRevised: number; tasksCompleted: number };
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Load state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                dispatch({ type: 'LOAD_STATE', payload: parsed });
            } catch (e) {
                console.error('Failed to load saved state:', e);
            }
        }
    }, []);

    // Save state to localStorage on every change
    useEffect(() => {
        if (state.user !== null) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state]);

    // Helper functions
    const getUserSubjects = () => {
        if (!state.user) return [];
        return state.subjects.filter((s) => state.user!.selectedSubjects.includes(s.id));
    };

    const getUserPathways = () => {
        if (!state.user) return [];
        return state.pathways.filter((p) => state.user!.selectedPathways.includes(p.id));
    };

    const getTopicsNeedingRevision = () => {
        const result: { subject: string; topic: string; subjectId: string }[] = [];
        getUserSubjects().forEach((subject) => {
            subject.topics
                .filter((t) => t.status === 'need-to-revise')
                .forEach((topic) => {
                    result.push({
                        subject: subject.name,
                        topic: topic.name,
                        subjectId: subject.id,
                    });
                });
        });
        return result;
    };

    const getWeeklyProgress = () => {
        // Count confident topics this week (simplified)
        let topicsRevised = 0;
        getUserSubjects().forEach((subject) => {
            topicsRevised += subject.topics.filter((t) => t.status === 'confident').length;
        });

        // Count completed pathway tasks
        let tasksCompleted = 0;
        getUserPathways().forEach((pathway) => {
            tasksCompleted += pathway.tasks.filter((t) => t.completed).length;
        });

        return { topicsRevised, tasksCompleted };
    };

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
                getUserSubjects,
                getUserPathways,
                getTopicsNeedingRevision,
                getWeeklyProgress,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
