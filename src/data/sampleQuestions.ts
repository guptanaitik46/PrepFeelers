import { Question } from '../types/Question';

export const sampleQuestions: Question[] = [
  {
    id: '1',
    questionText: 'Find the 10th term of the AP: 5, 8, 11, 14, ...',
    options: ['32', '35', '38', '41'],
    correctAnswer: 0,
    subject: 'Mathematics',
    chapter: 'Arithmetic Progressions',
    marks: 2,
    year: 2022,
    // paperSet: 'Set 1',
    // questionNumber: 'Q4',
    questionType: 'Objective'
  },
  {
    id: '2',
    questionText: 'According to Ohm\'s law, the current through a conductor is:',
    options: ['Directly proportional to voltage', 'Inversely proportional to voltage', 'Independent of voltage', 'Equal to voltage'],
    correctAnswer: 0,
    subject: 'Physics',
    chapter: 'Electricity',
    marks: 3,
    year: 2023,
    // paperSet: 'Set 2',
    // questionNumber: 'Q7',
    questionType: 'Objective'
  },
  {
    id: '3',
    questionText: 'The roots of the quadratic equation x² - 5x + 6 = 0 are:',
    options: ['2, 3', '1, 6', '-2, -3', '5, 1'],
    correctAnswer: 0,
    subject: 'Mathematics',
    chapter: 'Quadratic Equations',
    marks: 3,
    year: 2021,
    // paperSet: 'Set 1',
    // questionNumber: 'Q12',
    questionType: 'Objective'
  },
  {
    id: '4',
    questionText: 'The pH of a neutral solution at 25°C is:',
    options: ['7', '0', '14', '1'],
    correctAnswer: 0,
    subject: 'Chemistry',
    chapter: 'Acids, Bases and Salts',
    marks: 2,
    year: 2022,
    // paperSet: 'Set 3',
    // questionNumber: 'Q6',
    questionType: 'Objective'
  },
  {
    id: '5',
    questionText: 'Amoeba obtains its food through the process of:',
    options: ['Phagocytosis', 'Pinocytosis', 'Osmosis', 'Diffusion'],
    correctAnswer: 0,
    subject: 'Biology',
    chapter: 'Nutrition',
    marks: 5,
    year: 2023,
    // paperSet: 'Set 1',
    // questionNumber: 'Q15',
    questionType: 'Objective'
  },
  {
    id: '6',
    questionText: 'The area of a triangle with vertices A(1, 2), B(3, 4), and C(5, 6) is:',
    options: ['0', '2', '4', '6'],
    correctAnswer: 0,
    subject: 'Mathematics',
    chapter: 'Coordinate Geometry',
    marks: 4,
    year: 2021,
    // paperSet: 'Set 2',
    // questionNumber: 'Q13',
    questionType: 'Objective'
  },
  {
    id: '7',
    questionText: 'When light passes from air to water, it:',
    options: ['Bends towards the normal', 'Bends away from the normal', 'Does not bend', 'Reflects completely'],
    correctAnswer: 0,
    subject: 'Physics',
    chapter: 'Light - Reflection and Refraction',
    marks: 3,
    year: 2022,
    // paperSet: 'Set 1',
    // questionNumber: 'Q8',
    questionType: 'Objective'
  },
  {
    id: '8',
    questionText: 'The balanced equation for Fe + HCl → FeCl₃ + H₂ is:',
    options: ['2Fe + 6HCl → 2FeCl₃ + 3H₂', 'Fe + 3HCl → FeCl₃ + H₂', 'Fe + HCl → FeCl₃ + H₂', '3Fe + 9HCl → 3FeCl₃ + 3H₂'],
    correctAnswer: 0,
    subject: 'Chemistry',
    chapter: 'Chemical Reactions and Equations',
    marks: 1,
    year: 2023,
    // paperSet: 'Set 2',
    // questionNumber: 'Q2',
    questionType: 'Objective'
  },
  {
    id: '9',
    questionText: 'The functional unit of kidney is:',
    options: ['Nephron', 'Neuron', 'Glomerulus', 'Bowman\'s capsule'],
    correctAnswer: 0,
    subject: 'Biology',
    chapter: 'Excretion',
    marks: 5,
    year: 2021,
    // paperSet: 'Set 3',
    // questionNumber: 'Q16',
    questionType: 'Objective'
  },
  {
    id: '10',
    questionText: 'Which of the following is an irrational number?',
    options: ['√3', '√4', '√9', '√16'],
    correctAnswer: 0,
    subject: 'Mathematics',
    chapter: 'Real Numbers',
    marks: 4,
    year: 2022,
    // paperSet: 'Set 2',
    // questionNumber: 'Q14',
    questionType: 'Objective'
  },
  {
    id: '11',
    questionText: 'The power of a lens is measured in:',
    options: ['Dioptre', 'Watt', 'Joule', 'Newton'],
    correctAnswer: 0,
    subject: 'Physics',
    chapter: 'Light - Reflection and Refraction',
    marks: 2,
    year: 2021,
    questionType: 'Objective'
  },
  {
    id: '12',
    questionText: 'The electron configuration of sodium (Na, atomic number = 11) is:',
    options: ['2, 8, 1', '2, 8, 2', '2, 7, 2', '1, 8, 2'],
    correctAnswer: 0,
    subject: 'Chemistry',
    chapter: 'Atomic Structure',
    marks: 1,
    year: 2021,
    questionType: 'Objective'
  }
];

export const chaptersBySubject = {
  Mathematics: [
    'Real Numbers',
    'Polynomials',
    'Pair of Linear Equations in Two Variables',
    'Quadratic Equations',
    'Arithmetic Progressions',
    'Triangles',
    'Coordinate Geometry',
    'Introduction to Trigonometry',
    'Applications of Trigonometry',
    'Circles',
    'Areas Related to Circles',
    'Surface Areas and Volumes',
    'Statistics',
    'Probability'
  ],
  Physics: [
    'Light - Reflection and Refraction',
    'Human Eye and Colourful World',
    'Electricity',
    'Magnetic Effects of Electric Current',
  ],
  Chemistry: [
    'Chemical Reactions and Equations',
    'Acids, Bases and Salts',
    'Metals and Non-metals',
    'Carbon and its Compounds'
  ],
  Biology: [
    'Life Processes',
    'Control and Coordination',
    'Reproduction',
    'Heredity and Evolution',
    'Our Environment'
  ]
};