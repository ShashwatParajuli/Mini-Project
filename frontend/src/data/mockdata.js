
export const sampleCourses = [
  {
    id: "course-1",
    title: "Mathematics",
    description: "Learn basic mathematical concepts and solve problems.",
    category: "Academic",
    icon: "Calculator",
    color: "blue",
    topics: [
      {
        id: "topic-1",
        title: "Basic Algebra",
        description: "Learn variables, expressions, and simple equations.",
      },
      {
        id: "topic-2",
        title: "Fractions",
        description: "Understand fractions and how to calculate with them.",
      },
      {
        id: "topic-3",
        title: "Percentages",
        description: "Learn percentages and their everyday applications.",
      },
    ],
  },
  {
    id: "course-2",
    title: "Science",
    description: "Explore fundamental science concepts.",
    category: "Academic",
    icon: "FlaskConical",
    color: "purple",
    topics: [
      {
        id: "topic-4",
        title: "Force and Motion",
        description: "Understand force, motion, and speed.",
      },
      {
        id: "topic-5",
        title: "Energy",
        description: "Learn about different forms of energy.",
      },
    ],
  },
  {
    id: "course-3",
    title: "Computer Fundamentals",
    description: "Understand computers and basic internet concepts.",
    category: "Technology",
    icon: "Monitor",
    color: "green",
    topics: [
      {
        id: "topic-6",
        title: "Computer Hardware",
        description: "Learn about the physical parts of a computer.",
      },
      {
        id: "topic-7",
        title: "Internet Basics",
        description: "Understand how the internet works.",
      },
    ],
  },
  {
    id: "course-4",
    title: "English",
    description: "Improve your grammar and vocabulary.",
    category: "Language",
    icon: "BookOpen",
    color: "orange",
    topics: [
      {
        id: "topic-8",
        title: "Basic Grammar",
        description: "Practise nouns, verbs, and sentence structure.",
      },
      {
        id: "topic-9",
        title: "Vocabulary",
        description: "Learn new words and their meanings.",
      },
    ],
  },
];

export const sampleQuizzes = [
  {
    id: "quiz-1",
    courseId: "course-1",
    topicId: "topic-1",
    title: "Basic Algebra Quiz",
    questions: [
      {
        id: 1,
        question: "If x + 3 = 7, what is the value of x?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "Subtract 3 from both sides: x = 7 - 3 = 4.",
      },
      {
        id: 2,
        question: "What is 2x when x = 5?",
        options: ["5", "7", "10", "15"],
        correctAnswer: 2,
        explanation: "Replace x with 5: 2 × 5 = 10.",
      },
      {
        id: 3,
        question: "Which of these is a variable?",
        options: ["12", "+", "x", "="],
        correctAnswer: 2,
        explanation: "A variable, such as x, represents a value that can change.",
      },
    ],
  },
  {
    id: "quiz-2",
    courseId: "course-1",
    topicId: "topic-2",
    title: "Fractions Quiz",
    questions: [
      {
        id: 1,
        question: "What is 1/2 + 1/2?",
        options: ["1/4", "1/2", "1", "2"],
        correctAnswer: 2,
        explanation: "Two halves make one whole.",
      },
      {
        id: 2,
        question: "Which fraction is equal to 1/2?",
        options: ["2/3", "2/4", "3/4", "1/3"],
        correctAnswer: 1,
        explanation: "2/4 simplifies to 1/2 when the numerator and denominator are divided by 2.",
      },
      {
        id: 3,
        question: "What is 3/4 of 8?",
        options: ["2", "4", "6", "8"],
        correctAnswer: 2,
        explanation: "8 divided by 4 is 2, and 2 multiplied by 3 is 6.",
      },
    ],
  },
  {
    id: "quiz-3",
    courseId: "course-2",
    topicId: "topic-4",
    title: "Force and Motion Quiz",
    questions: [
      {
        id: 1,
        question: "What is the SI unit of force?",
        options: ["Joule", "Watt", "Newton", "Metre"],
        correctAnswer: 2,
        explanation: "Force is measured in newtons (N).",
      },
      {
        id: 2,
        question: "What does speed measure?",
        options: [
          "Distance travelled per unit of time",
          "Mass of an object",
          "Temperature",
          "Amount of energy",
        ],
        correctAnswer: 0,
        explanation: "Speed is calculated by dividing distance by time.",
      },
      {
        id: 3,
        question: "Which force pulls objects towards Earth?",
        options: ["Friction", "Gravity", "Magnetism", "Tension"],
        correctAnswer: 1,
        explanation: "Gravity attracts objects towards Earth.",
      },
    ],
  },
  {
    id: "quiz-4",
    courseId: "course-3",
    topicId: "topic-6",
    title: "Computer Hardware Quiz",
    questions: [
      {
        id: 1,
        question: "Which component is known as the brain of a computer?",
        options: ["Monitor", "Keyboard", "CPU", "Mouse"],
        correctAnswer: 2,
        explanation: "The CPU processes instructions and performs calculations.",
      },
      {
        id: 2,
        question: "Which device is used to display visual output?",
        options: ["Monitor", "Keyboard", "Microphone", "Scanner"],
        correctAnswer: 0,
        explanation: "A monitor displays text, images, and other visual output.",
      },
      {
        id: 3,
        question: "Which of these is an input device?",
        options: ["Printer", "Speaker", "Monitor", "Keyboard"],
        correctAnswer: 3,
        explanation: "A keyboard allows users to enter information into a computer.",
      },
    ],
  },
];

export function getCourseById(courseId) {
  return sampleCourses.find((course) => course.id === courseId);
}

export function getTopicById(topicId) {
  for (const course of sampleCourses) {
    const topic = course.topics.find((item) => item.id === topicId);

    if (topic) {
      return {
        ...topic,
        courseId: course.id,
        courseTitle: course.title,
      };
    }
  }

  return undefined;
}

export function getQuizById(quizId) {
  return sampleQuizzes.find((quiz) => quiz.id === quizId);
}

export function getAllTopics() {
  return sampleCourses.flatMap((course) =>
    course.topics.map((topic) => ({
      ...topic,
      courseId: course.id,
      courseTitle: course.title,
    }))
  );
}
