import type { Subject, Pathway } from '../types';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Seed Subjects with Topics
export const seedSubjects: Subject[] = [
    {
        id: 'maths',
        name: 'Maths',
        icon: 'Calculator',
        color: '#3b82f6',
        topics: [
            { id: generateId(), name: 'Algebra', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Trigonometry', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Geometry', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Statistics', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Functions', status: 'confident', notes: '', links: [] },
        ],
        quizzes: [
            { id: generateId(), question: 'Solve for x: 2x + 5 = 13', options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'], correctAnswer: 1 },
            { id: generateId(), question: 'What is sin(30°)?', options: ['1', '√3/2', '1/2', '√2/2'], correctAnswer: 2 },
            { id: generateId(), question: 'How many degrees are in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1 },
            { id: generateId(), question: 'What is the mean of 4, 8, 6, 10, 2?', options: ['5', '6', '7', '8'], correctAnswer: 1 },
            { id: generateId(), question: 'If f(x) = 3x – 2, what is f(4)?', options: ['8', '10', '12', '14'], correctAnswer: 1 },
        ],
    },
    {
        id: 'irish',
        name: 'Irish',
        icon: 'Languages',
        color: '#22c55e',
        topics: [
            { id: generateId(), name: 'Grammar', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Proverbs & Phrases', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Poetry', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Prose', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Oral Irish', status: 'confident', notes: '', links: [] },
        ],
        quizzes: [
            { id: generateId(), question: 'What is "Tá mé go maith" in English?', options: ['I am tired', 'I am good', 'I am hungry', 'I am cold'], correctAnswer: 1 },
            { id: generateId(), question: 'What does "Is fearr Gaeilge briste, ná Béarla cliste" mean?', options: ['English is better than Irish', 'Broken Irish is better than clever English', 'Irish is a broken language', 'Speak English always'], correctAnswer: 1 },
            { id: generateId(), question: 'Which tense is "Bhí mé"?', options: ['Present', 'Future', 'Past', 'Conditional'], correctAnswer: 2 },
            { id: generateId(), question: 'What is the Irish word for "school"?', options: ['Teach', 'Scoil', 'Leabhar', 'Rang'], correctAnswer: 1 },
            { id: generateId(), question: 'In the Oral exam, "Cad is ainm duit?" asks for your...?', options: ['Age', 'Address', 'Name', 'Hobby'], correctAnswer: 2 },
        ],
    },
    {
        id: 'english',
        name: 'English',
        icon: 'BookOpen',
        color: '#8b5cf6',
        topics: [
            { id: generateId(), name: 'Poetry Analysis', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Shakespearean Drama', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Essay Writing', status: 'confident', notes: '', links: [] },
            { id: generateId(), name: 'Comparative Study', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Comprehension', status: 'confident', notes: '', links: [] },
        ],
        quizzes: [
            { id: generateId(), question: 'What literary device is "The wind whispered through the trees"?', options: ['Metaphor', 'Simile', 'Personification', 'Alliteration'], correctAnswer: 2 },
            { id: generateId(), question: 'Who wrote "Romeo and Juliet"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Oscar Wilde'], correctAnswer: 1 },
            { id: generateId(), question: 'What is a thesis statement?', options: ['A question', 'The main argument of an essay', 'A conclusion', 'A topic sentence'], correctAnswer: 1 },
            { id: generateId(), question: 'In a comparative essay, you must compare at least how many texts?', options: ['1', '2', '3', '4'], correctAnswer: 2 },
            { id: generateId(), question: 'What does "inference" mean in comprehension?', options: ['Copying the text', 'Reading between the lines', 'Summarising', 'Quoting directly'], correctAnswer: 1 },
        ],
    },
    {
        id: 'french',
        name: 'French',
        icon: 'Globe',
        color: '#ec4899',
        topics: [
            { id: generateId(), name: 'Verb Conjugation', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Vocabulary', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Reading Comprehension', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Oral Exam Prep', status: 'need-to-revise', notes: '', links: [] },
        ],
        quizzes: [
            { id: generateId(), question: 'What is the French for "I am"?', options: ['Tu es', 'Je suis', 'Il est', 'Nous sommes'], correctAnswer: 1 },
            { id: generateId(), question: 'What does "Bonjour" mean?', options: ['Goodbye', 'Good evening', 'Hello / Good day', 'Good night'], correctAnswer: 2 },
            { id: generateId(), question: 'Which verb group does "finir" belong to?', options: ['-er verbs', '-ir verbs', '-re verbs', 'Irregular'], correctAnswer: 1 },
            { id: generateId(), question: 'What is "la maison"?', options: ['The car', 'The house', 'The school', 'The garden'], correctAnswer: 1 },
            { id: generateId(), question: 'In the oral exam, "Où habites-tu?" asks where you...?', options: ['Work', 'Study', 'Live', 'Eat'], correctAnswer: 2 },
        ],
    },
    {
        id: 'science',
        name: 'Science',
        icon: 'FlaskConical',
        color: '#14b8a6',
        topics: [
            { id: generateId(), name: 'Biology - Cells', status: 'confident', notes: '', links: [] },
            { id: generateId(), name: 'Chemistry - Elements', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Physics - Forces', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Ecology', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Lab Experiments', status: 'confident', notes: '', links: [] },
        ],
        quizzes: [
            { id: generateId(), question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Cell membrane'], correctAnswer: 2 },
            { id: generateId(), question: 'What is the chemical symbol for water?', options: ['CO₂', 'NaCl', 'O₂', 'H₂O'], correctAnswer: 3 },
            { id: generateId(), question: 'What unit is force measured in?', options: ['Joules', 'Newtons', 'Watts', 'Volts'], correctAnswer: 1 },
            { id: generateId(), question: 'What is a food chain?', options: ['A restaurant chain', 'The transfer of energy between organisms', 'A type of molecule', 'A lab experiment'], correctAnswer: 1 },
            { id: generateId(), question: 'What colour does litmus paper turn in an acid?', options: ['Blue', 'Green', 'Red', 'Yellow'], correctAnswer: 2 },
        ],
    },
    {
        id: 'business',
        name: 'Business Studies',
        icon: 'Briefcase',
        color: '#f97316',
        topics: [
            { id: generateId(), name: 'Business Ownership', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Marketing', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Finance', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Enterprise', status: 'confident', notes: '', links: [] },
        ],
        quizzes: [
            { id: generateId(), question: 'What does "Ltd" stand for in a company name?', options: ['Limited', 'Latitude', 'Licensed', 'Literal'], correctAnswer: 0 },
            { id: generateId(), question: 'The 4 Ps of marketing are Product, Price, Place, and...?', options: ['People', 'Promotion', 'Profit', 'Production'], correctAnswer: 1 },
            { id: generateId(), question: 'What is revenue?', options: ['Money spent', 'Money earned from sales', 'Tax paid', 'Money borrowed'], correctAnswer: 1 },
            { id: generateId(), question: 'An entrepreneur is someone who...?', options: ['Works for the government', 'Starts and runs a business', 'Only invests money', 'Teaches business'], correctAnswer: 1 },
            { id: generateId(), question: 'What is a sole trader?', options: ['A partnership', 'A company listed on the stock exchange', 'A business owned by one person', 'A charity'], correctAnswer: 2 },
        ],
    },
    {
        id: 'history',
        name: 'History',
        icon: 'Landmark',
        color: '#a855f7',
        topics: [
            { id: generateId(), name: '20th Century Ireland', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'World War I & II', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Medieval Ireland', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Source Analysis', status: 'confident', notes: '', links: [] },
        ],
        quizzes: [
            { id: generateId(), question: 'In what year did the 1916 Easter Rising take place?', options: ['1914', '1916', '1918', '1922'], correctAnswer: 1 },
            { id: generateId(), question: 'Which countries were the main Allied Powers in WWII?', options: ['Germany, Italy, Japan', 'UK, France, USA, USSR', 'Spain, Portugal, Sweden', 'Austria, Hungary, Turkey'], correctAnswer: 1 },
            { id: generateId(), question: 'Who were the Normans?', options: ['A Roman tribe', 'Viking descendants who invaded Ireland', 'Celtic warriors', 'Spanish explorers'], correctAnswer: 1 },
            { id: generateId(), question: 'A primary source is...?', options: ['A textbook', 'A Wikipedia article', 'An original document from the time period', 'A teacher\'s notes'], correctAnswer: 2 },
            { id: generateId(), question: 'Who was the first President of Ireland?', options: ['Éamon de Valera', 'Michael Collins', 'Douglas Hyde', 'W.T. Cosgrave'], correctAnswer: 2 },
        ],
    },
    {
        id: 'geography',
        name: 'Geography',
        icon: 'Map',
        color: '#06b6d4',
        topics: [
            { id: generateId(), name: 'Physical Geography', status: 'in-progress', notes: '', links: [] },
            { id: generateId(), name: 'Human Geography', status: 'need-to-revise', notes: '', links: [] },
            { id: generateId(), name: 'Map Skills', status: 'confident', notes: '', links: [] },
            { id: generateId(), name: 'Climate & Weather', status: 'need-to-revise', notes: '', links: [] },
        ],
        quizzes: [
            { id: generateId(), question: 'What type of rock is formed from cooled magma?', options: ['Sedimentary', 'Metamorphic', 'Igneous', 'Limestone'], correctAnswer: 2 },
            { id: generateId(), question: 'Urbanisation means...?', options: ['People moving to rural areas', 'People moving to cities', 'Deforestation', 'Farming expansion'], correctAnswer: 1 },
            { id: generateId(), question: 'On an OS map, what do contour lines show?', options: ['Roads', 'Rivers', 'Height above sea level', 'County borders'], correctAnswer: 2 },
            { id: generateId(), question: 'What causes Ireland to have a mild, wet climate?', options: ['The Sahara winds', 'The North Atlantic Drift', 'The Arctic current', 'El Niño'], correctAnswer: 1 },
            { id: generateId(), question: 'What is erosion?', options: ['Building up of land', 'The wearing away of rock/soil', 'Planting trees', 'Volcanic activity'], correctAnswer: 1 },
        ],
    },
];

// Seed Pathways with Tasks, Careers, and Courses
export const seedPathways: Pathway[] = [
    {
        id: 'stem',
        name: 'STEM',
        icon: 'Cpu',
        description: 'Science, Technology, Engineering & Maths careers and LC subjects',
        avgStartingSalary: 38000,
        jobGrowth: '+15% projected growth',
        recommendedSubjects: {
            required: ['Maths (Higher Level)'],
            recommended: ['Physics', 'Applied Maths', 'Chemistry'],
            useful: ['Computer Science', 'Design & Communication Graphics', 'Engineering'],
        },
        careers: [
            {
                id: 'software-dev',
                title: 'Software Developer',
                description: 'Build applications, websites, and systems for companies like Google, Stripe, and Intercom — Ireland is home to hundreds of tech firms. Strong demand for graduates with Python, Java, or JavaScript skills.',
                salary: { entry: 37000, mid: 68000, senior: 105000 },
                education: 'Level 8 degree in Computer Science (e.g., TCD TR025, UCD DN201)',
                growthOutlook: 'high',
            },
            {
                id: 'data-scientist',
                title: 'Data Analyst / Scientist',
                description: 'Extract insights from large datasets for companies like Accenture, Meta, and the HSE. Requires strong maths and programming skills. Ireland\'s data analytics sector is growing rapidly.',
                salary: { entry: 38000, mid: 65000, senior: 95000 },
                education: 'Level 8 degree in Data Science, Maths, or Statistics',
                growthOutlook: 'high',
            },
            {
                id: 'civil-engineer',
                title: 'Civil / Structural Engineer',
                description: 'Design roads, bridges, buildings, and water systems. Engineers Ireland-accredited graduates are highly employable. Roles available with Arup, RPS Group, and county councils.',
                salary: { entry: 34000, mid: 58000, senior: 88000 },
                education: 'Level 8 BAI in Civil Engineering (e.g., TCD TR032, UCD DN150)',
                growthOutlook: 'medium',
            },
        ],
        courses: [
            {
                id: 'cs-tcd',
                name: 'Computer Science (TR025)',
                institution: 'Trinity College Dublin',
                caoPoints: { min: 554, max: 625 },
                annualFee: 3000,
                duration: '4 years (BA Mod)',
                type: 'degree',
            },
            {
                id: 'eng-ucd',
                name: 'Engineering (DN150)',
                institution: 'University College Dublin',
                caoPoints: { min: 500, max: 590 },
                annualFee: 3000,
                duration: '4-5 years (BE/ME)',
                type: 'degree',
            },
            {
                id: 'physics-lc',
                name: 'LC Physics (Higher)',
                institution: 'Leaving Certificate',
                caoPoints: { min: 0, max: 100 },
                annualFee: 0,
                duration: '2 years',
                type: 'leaving-cert',
            },
        ],
        tasks: [
            {
                id: generateId(),
                title: 'Watch: What is Engineering?',
                description: 'A 10-minute intro video explaining different engineering fields',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Try a LC Maths Problem',
                description: 'Attempt one Ordinary Level calculus question from past papers',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Research: Software Developer Career',
                description: 'Find 3 facts about what a software developer does daily',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Explore: Physics vs Chemistry LC',
                description: 'Read about the differences between LC Physics and Chemistry',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Mini Project: Build a Simple Circuit',
                description: 'Use an online simulator to create a basic LED circuit',
                completed: false,
            },
        ],
    },
    {
        id: 'business',
        name: 'Business',
        icon: 'TrendingUp',
        description: 'Business, Economics, Accounting and entrepreneurship pathways',
        avgStartingSalary: 35000,
        jobGrowth: '+10% projected growth',
        recommendedSubjects: {
            required: ['Maths', 'English'],
            recommended: ['Accounting', 'Business', 'Economics'],
            useful: ['French/German/Spanish', 'Home Economics'],
        },
        careers: [
            {
                id: 'accountant',
                title: 'Chartered Accountant',
                description: 'Qualify through Chartered Accountants Ireland (CAI) training contracts at Big 4 firms (Deloitte, PwC, EY, KPMG). Manage audits, tax returns, and financial statements for Irish and multinational companies.',
                salary: { entry: 36000, mid: 62000, senior: 120000 },
                education: 'Level 8 degree in Accounting/Business + ACA/ACCA qualification (3-4 years post-degree)',
                growthOutlook: 'high',
            },
            {
                id: 'financial-analyst',
                title: 'Financial Analyst',
                description: 'Analyse investment opportunities and market trends for firms like Irish Life, Davy, and Bank of Ireland. Increasingly data-driven with Python and Excel modelling skills valued.',
                salary: { entry: 36000, mid: 55000, senior: 82000 },
                education: 'Level 8 degree in Finance, Economics, or Business (e.g., UCD DN200, TCD TR080)',
                growthOutlook: 'medium',
            },
            {
                id: 'marketing-manager',
                title: 'Digital Marketing Manager',
                description: 'Plan and run campaigns across social media, Google Ads, and email for brands. Ireland\'s tech hub means strong demand from companies like HubSpot, Shopify, and local agencies.',
                salary: { entry: 30000, mid: 48000, senior: 72000 },
                education: 'Level 8 degree in Marketing, Business, or Communications',
                growthOutlook: 'medium',
            },
        ],
        courses: [
            {
                id: 'commerce-ucd',
                name: 'Commerce (DN200)',
                institution: 'University College Dublin',
                caoPoints: { min: 490, max: 565 },
                annualFee: 3000,
                duration: '3 years (BCom) + optional 4th year',
                type: 'degree',
            },
            {
                id: 'business-dcu',
                name: 'Business Studies (DC111)',
                institution: 'Dublin City University',
                caoPoints: { min: 450, max: 520 },
                annualFee: 3000,
                duration: '4 years (inc. INTRA placement)',
                type: 'degree',
            },
            {
                id: 'accounting-lc',
                name: 'LC Accounting (Higher)',
                institution: 'Leaving Certificate',
                caoPoints: { min: 0, max: 100 },
                annualFee: 0,
                duration: '2 years',
                type: 'leaving-cert',
            },
        ],
        tasks: [
            {
                id: generateId(),
                title: 'Watch: How Businesses Make Money',
                description: 'Understanding revenue, costs, and profit in 8 minutes',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Research: Famous Irish Entrepreneurs',
                description: 'Write 3 bullet points about one successful Irish businessperson',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Try: Basic Accounting Exercise',
                description: 'Practice a simple balance sheet from LC Accounting',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Explore: Economics vs Business LC',
                description: 'Compare what you study in each subject',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Mini Task: Create a Business Idea',
                description: 'Write a one-paragraph business idea for a student service',
                completed: false,
            },
        ],
    },
    {
        id: 'creative',
        name: 'Creative',
        icon: 'Palette',
        description: 'Art, Music, Design, Media and creative industries',
        avgStartingSalary: 28000,
        jobGrowth: '+8% projected growth',
        recommendedSubjects: {
            required: ['English'],
            recommended: ['Art', 'Music', 'Design & Communication Graphics'],
            useful: ['Home Economics', 'Construction Studies', 'French/German'],
        },
        careers: [
            {
                id: 'ux-designer',
                title: 'UX/UI Designer',
                description: 'Design digital experiences for apps and websites. Strong demand at companies like Workday, Intercom, and Kitman Labs in Dublin. Portfolio-based hiring — build projects during college.',
                salary: { entry: 30000, mid: 48000, senior: 72000 },
                education: 'Level 8 degree in Visual Communication, Interaction Design, or similar',
                growthOutlook: 'high',
            },
            {
                id: 'graphic-designer',
                title: 'Graphic Designer',
                description: 'Create branding, packaging, and marketing materials for agencies like Rothco, The Saturday Agency, and in-house teams. Adobe Creative Suite proficiency essential.',
                salary: { entry: 26000, mid: 38000, senior: 55000 },
                education: 'Level 8 degree in Visual Communication (e.g., NCAD AD101) or Graphic Design',
                growthOutlook: 'medium',
            },
            {
                id: 'animator',
                title: 'Animator / VFX Artist',
                description: 'Work on animated series (Brown Bag Films, Boulder Media), feature films, and games. Ireland’s animation sector is one of Europe’s strongest with studios like Cartoon Saloon.',
                salary: { entry: 28000, mid: 42000, senior: 62000 },
                education: 'Level 8 degree in Animation (e.g., IADT DL836) or Film',
                growthOutlook: 'medium',
            },
        ],
        courses: [
            {
                id: 'design-ncad',
                name: 'Visual Communication (AD101)',
                institution: 'National College of Art & Design',
                caoPoints: { min: 350, max: 450 },
                annualFee: 3000,
                duration: '4 years (inc. 1st year foundation)',
                type: 'degree',
            },
            {
                id: 'film-iadt',
                name: 'Film & Television (DL836)',
                institution: 'IADT Dún Laoghaire',
                caoPoints: { min: 300, max: 400 },
                annualFee: 3000,
                duration: '4 years',
                type: 'degree',
            },
            {
                id: 'art-lc',
                name: 'LC Art (Higher)',
                institution: 'Leaving Certificate',
                caoPoints: { min: 0, max: 100 },
                annualFee: 0,
                duration: '2 years',
                type: 'leaving-cert',
            },
        ],
        tasks: [
            {
                id: generateId(),
                title: 'Watch: Careers in Design',
                description: 'Explore graphic design, UX design, and product design careers',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Research: Art College Courses',
                description: 'Find 2 art/design courses offered in Irish colleges',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Try: Quick Sketch Challenge',
                description: 'Spend 15 minutes sketching an everyday object',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Explore: LC Art History',
                description: 'Read about one famous artwork featured in LC Art',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Listen: Music Production Basics',
                description: 'A short podcast on how music is produced',
                completed: false,
            },
        ],
    },
    {
        id: 'languages',
        name: 'Languages',
        icon: 'MessageCircle',
        description: 'Modern Languages, Translation, International careers',
        avgStartingSalary: 32000,
        jobGrowth: '+6% projected growth',
        recommendedSubjects: {
            required: ['English', 'Irish'],
            recommended: ['French', 'German', 'Spanish'],
            useful: ['History', 'Geography', 'Art'],
        },
        careers: [
            {
                id: 'translator',
                title: 'Translator / Localisation Specialist',
                description: 'Translate content for tech companies (Google, Apple, Microsoft all localise from Dublin), legal firms, and EU institutions. Specialised translators earn more than general ones.',
                salary: { entry: 30000, mid: 44000, senior: 58000 },
                education: 'Level 8 degree in Applied Languages, Translation Studies, or European Studies',
                growthOutlook: 'medium',
            },
            {
                id: 'interpreter',
                title: 'EU / Conference Interpreter',
                description: 'Provide real-time interpretation at EU Parliament, Commission meetings, and international conferences. One of the highest-paid language careers, based in Brussels or Luxembourg.',
                salary: { entry: 48000, mid: 68000, senior: 90000 },
                education: 'Level 9 Masters in Conference Interpreting (e.g., University of Westminster, ESIT Paris)',
                growthOutlook: 'medium',
            },
            {
                id: 'language-teacher',
                title: 'Secondary Language Teacher',
                description: 'Teach French, German, or Spanish in Irish secondary schools. Reliable demand and strong job security with a Teaching Council-recognised PME qualification.',
                salary: { entry: 37000, mid: 52000, senior: 72000 },
                education: 'Level 8 Languages degree + Level 9 PME (Professional Masters in Education)',
                growthOutlook: 'medium',
            },
        ],
        courses: [
            {
                id: 'euro-studies-tcd',
                name: 'European Studies (TR012)',
                institution: 'Trinity College Dublin',
                caoPoints: { min: 450, max: 520 },
                annualFee: 3000,
                duration: '4 years (inc. year abroad)',
                type: 'degree',
            },
            {
                id: 'languages-ucd',
                name: 'Languages, Linguistics & Cultures (DN261)',
                institution: 'University College Dublin',
                caoPoints: { min: 400, max: 480 },
                annualFee: 3000,
                duration: '4 years (inc. Erasmus year)',
                type: 'degree',
            },
            {
                id: 'french-lc',
                name: 'LC French / Spanish / German (Higher)',
                institution: 'Leaving Certificate',
                caoPoints: { min: 0, max: 100 },
                annualFee: 0,
                duration: '2 years',
                type: 'leaving-cert',
            },
        ],
        tasks: [
            {
                id: generateId(),
                title: 'Watch: Why Learn Languages?',
                description: 'Benefits of being multilingual in the job market',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Practice: 10 New Vocabulary Words',
                description: 'Learn 10 new words in your chosen language',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Research: Translation Careers',
                description: 'Find out what a professional translator does',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Explore: Spanish vs German LC',
                description: 'Compare the two languages at Leaving Cert level',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Listen: A Song in Another Language',
                description: 'Find a song and try to understand the lyrics',
                completed: false,
            },
        ],
    },
    {
        id: 'health',
        name: 'Health & Social',
        icon: 'Heart',
        description: 'Medicine, Nursing, Psychology, Social work and caring professions',
        avgStartingSalary: 37000,
        jobGrowth: '+12% projected growth',
        recommendedSubjects: {
            required: ['Maths', 'English', 'Irish'],
            recommended: ['Biology', 'Chemistry', 'Physics'],
            useful: ['Home Economics', 'Agricultural Science'],
        },
        careers: [
            {
                id: 'doctor',
                title: 'Doctor (Hospital / GP)',
                description: 'Train as a Non-Consultant Hospital Doctor (NCHD) before specialising or becoming a GP. Long training (10+ years total) but excellent job security and high senior pay in Ireland.',
                salary: { entry: 42000, mid: 95000, senior: 266000 },
                education: 'Level 8 MB BCh BAO in Medicine (5-6 years, e.g., UCD DN400, TCD TR051) + internship + specialist training',
                growthOutlook: 'high',
            },
            {
                id: 'nurse',
                title: 'Registered General Nurse',
                description: 'Provide patient care in HSE hospitals, private clinics, and community health. Nursing graduates in Ireland have near-100% employment rates. Option to specialise in ICU, mental health, or paediatrics.',
                salary: { entry: 33000, mid: 48000, senior: 62000 },
                education: 'Level 8 BSc in General Nursing (4 years, e.g., TCD TR094, UCD DN450)',
                growthOutlook: 'high',
            },
            {
                id: 'physiotherapist',
                title: 'Chartered Physiotherapist',
                description: 'Rehabilitate patients after injury, surgery, or chronic illness. Work in hospitals, private practice, or sports clubs (GAA, rugby teams). CORU-regulated profession.',
                salary: { entry: 37000, mid: 52000, senior: 70000 },
                education: 'Level 8 BSc in Physiotherapy (4 years, e.g., TCD TR093, UCD DN420)',
                growthOutlook: 'high',
            },
        ],
        courses: [
            {
                id: 'medicine-ucd',
                name: 'Medicine (DN400)',
                institution: 'University College Dublin',
                caoPoints: { min: 700, max: 750 },
                annualFee: 3000,
                duration: '5 years (direct entry) or 4 years (graduate entry)',
                type: 'degree',
            },
            {
                id: 'nursing-dcu',
                name: 'General Nursing (DC201)',
                institution: 'Dublin City University',
                caoPoints: { min: 420, max: 500 },
                annualFee: 3000,
                duration: '4 years (inc. clinical placements)',
                type: 'degree',
            },
            {
                id: 'biology-lc',
                name: 'LC Biology (Higher)',
                institution: 'Leaving Certificate',
                caoPoints: { min: 0, max: 100 },
                annualFee: 0,
                duration: '2 years',
                type: 'leaving-cert',
            },
        ],
        tasks: [
            {
                id: generateId(),
                title: "Watch: A Day in a Doctor's Life",
                description: 'See what a typical day looks like for a junior doctor',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Research: Nursing in Ireland',
                description: 'Find out the path to becoming a nurse in Ireland',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Try: Basic First Aid Knowledge',
                description: 'Learn about the recovery position and CPR basics',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Explore: LC Biology for Medicine',
                description: 'See what Biology topics are most relevant for healthcare',
                completed: false,
            },
            {
                id: generateId(),
                title: 'Reflect: Why Healthcare?',
                description: 'Write 3 reasons why you might be interested in healthcare',
                completed: false,
            },
        ],
    },
];

// Get icon component by name (used for rendering)
export const getSubjectIcon = (iconName: string) => iconName;

// Helper to get current week dates
export const getCurrentWeekDates = (): string[] => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
};

// Generate initial scheduled tasks based on user preferences
export const generateInitialTasks = (
    selectedSubjects: string[],
    _selectedPathways: string[],
    frequency: 'light' | 'medium' | 'strong'
): { subjectId: string; date: string }[] => {
    const weekDates = getCurrentWeekDates();
    const tasks: { subjectId: string; date: string }[] = [];

    const sessionsPerSubject = frequency === 'light' ? 1 : frequency === 'medium' ? 2 : 3;

    selectedSubjects.forEach((subjectId, index) => {
        for (let i = 0; i < sessionsPerSubject; i++) {
            const dateIndex = (index + i * 2) % 7;
            tasks.push({
                subjectId,
                date: weekDates[dateIndex],
            });
        }
    });

    return tasks;
};
