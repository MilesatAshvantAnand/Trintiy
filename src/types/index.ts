// Types for TY Tutor & Pathway App

export type TopicStatus = 'need-to-revise' | 'in-progress' | 'confident';
export type RevisionFrequency = 'light' | 'medium' | 'strong';
export type TaskType = 'revision' | 'pathway';
export type PathwayId = 'stem' | 'business' | 'creative' | 'languages' | 'health';
export type JuniorCycleLevel = 'Higher' | 'Ordinary' | 'Common';
export type JuniorCycleGradeValue = 'Distinction' | 'Higher Merit' | 'Merit' | 'Achieved' | 'Partially Achieved' | 'Not Graded';
export type GuidanceCategory = 'Subject Choices' | 'Career Advice' | 'College Applications' | 'Work Experience' | 'General';

export interface JuniorCycleGrade {
  id: string;
  subjectName: string;
  level: JuniorCycleLevel;
  grade: JuniorCycleGradeValue;
}

export interface GuidanceQuestion {
  id: string;
  question: string;
  category: GuidanceCategory;
  timestamp: string;
  answer?: string;
  answeredAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  topicId?: string;
}

export interface QuizAttempt {
  id: string;
  subjectId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
  answers: number[];
}

export interface Topic {
  id: string;
  name: string;
  status: TopicStatus;
  notes: string;
  links: string[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: Topic[];
  quizzes: QuizQuestion[];
}

export interface PathwayTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  scheduledDate?: string;
}

export interface SalaryRange {
  entry: number;
  mid: number;
  senior: number;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  salary: SalaryRange;
  education: string;
  growthOutlook: 'high' | 'medium' | 'low';
}

export interface CourseInfo {
  id: string;
  name: string;
  institution: string;
  caoPoints: { min: number; max: number };
  annualFee: number;
  duration: string;
  type: 'leaving-cert' | 'degree' | 'apprenticeship';
}

export interface SubjectRecommendation {
  required: string[];
  recommended: string[];
  useful: string[];
}

export interface Pathway {
  id: PathwayId;
  name: string;
  icon: string;
  description: string;
  tasks: PathwayTask[];
  careers: Career[];
  courses: CourseInfo[];
  avgStartingSalary: number;
  jobGrowth: string;
  recommendedSubjects?: SubjectRecommendation;
}

export interface ScheduledTask {
  id: string;
  title: string;
  type: TaskType;
  subjectId?: string;
  pathwayId?: PathwayId;
  scheduledDate: string;
  completed: boolean;
}

export interface TYEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  type: 'Workshop' | 'Trip' | 'Talk' | 'Other';
}

export interface EventReflection {
  id: string;
  eventId: string;
  takeaways: string;
  rating: number; // 1-5
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  selectedSubjects: string[];
  selectedPathways: PathwayId[];
  revisionFrequency: RevisionFrequency;
  onboardingComplete: boolean;
}

export interface AppState {
  user: User | null;
  subjects: Subject[];
  pathways: Pathway[];
  scheduledTasks: ScheduledTask[];
  eventReflections: EventReflection[];
  juniorCycleGrades: JuniorCycleGrade[];
  guidanceQuestions: GuidanceQuestion[];
  quizAttempts: QuizAttempt[];
}

export type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SELECT_SUBJECTS'; payload: string[] }
  | { type: 'SELECT_PATHWAYS'; payload: PathwayId[] }
  | { type: 'UPDATE_TOPIC_STATUS'; payload: { subjectId: string; topicId: string; status: TopicStatus } }
  | { type: 'UPDATE_TOPIC_NOTES'; payload: { subjectId: string; topicId: string; notes: string; links: string[] } }
  | { type: 'ADD_TOPIC'; payload: { subjectId: string; topic: Topic } }
  | { type: 'TOGGLE_PATHWAY_TASK'; payload: { pathwayId: PathwayId; taskId: string } }
  | { type: 'SCHEDULE_TASK'; payload: ScheduledTask }
  | { type: 'RESCHEDULE_TASK'; payload: { taskId: string; newDate: string } }
  | { type: 'TOGGLE_SCHEDULED_TASK'; payload: string }
  | { type: 'ADD_EVENT_REFLECTION'; payload: EventReflection }
  | { type: 'SET_JUNIOR_GRADES'; payload: JuniorCycleGrade[] }
  | { type: 'ADD_GUIDANCE_QUESTION'; payload: GuidanceQuestion }
  | { type: 'ANSWER_GUIDANCE_QUESTION'; payload: { questionId: string; answer: string } }
  | { type: 'SUBMIT_QUIZ_ATTEMPT'; payload: QuizAttempt }
  | { type: 'LOAD_STATE'; payload: AppState };
