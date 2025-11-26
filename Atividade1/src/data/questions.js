// Tema: Conhecimentos Gerais de Tecnologia
export const quizQuestions = [
  {
    id: 1,
    question: "Qual linguagem de programação é conhecida como a 'linguagem da web'?",
    options: [
      { id: 'a', text: 'Python', isCorrect: false },
      { id: 'b', text: 'JavaScript', isCorrect: true },
      { id: 'c', text: 'Java', isCorrect: false },
      { id: 'd', text: 'C++', isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "O que significa a sigla 'HTML'?",
    options: [
      { id: 'a', text: 'HyperText Markup Language', isCorrect: true },
      { id: 'b', text: 'High Tech Modern Language', isCorrect: false },
      { id: 'c', text: 'Home Tool Markup Language', isCorrect: false },
      { id: 'd', text: 'Hyperlinks and Text Markup Language', isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "Qual empresa desenvolveu o React Native?",
    options: [
      { id: 'a', text: 'Google', isCorrect: false },
      { id: 'b', text: 'Microsoft', isCorrect: false },
      { id: 'c', text: 'Facebook (Meta)', isCorrect: true },
      { id: 'd', text: 'Apple', isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "O que é um 'state' no React?",
    options: [
      { id: 'a', text: 'Um estilo CSS', isCorrect: false },
      { id: 'b', text: 'Um objeto que armazena dados que podem mudar ao longo do tempo', isCorrect: true },
      { id: 'c', text: 'Uma função de navegação', isCorrect: false },
      { id: 'd', text: 'Um tipo de componente', isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "Qual dessas NÃO é uma linguagem de programação?",
    options: [
      { id: 'a', text: 'Python', isCorrect: false },
      { id: 'b', text: 'HTML', isCorrect: true },
      { id: 'c', text: 'Ruby', isCorrect: false },
      { id: 'd', text: 'Swift', isCorrect: false }
    ]
  },
  {
    id: 6,
    question: "O que significa 'API'?",
    options: [
      { id: 'a', text: 'Advanced Programming Interface', isCorrect: false },
      { id: 'b', text: 'Application Programming Interface', isCorrect: true },
      { id: 'c', text: 'Automated Program Integration', isCorrect: false },
      { id: 'd', text: 'Application Process Integration', isCorrect: false }
    ]
  },
  {
    id: 7,
    question: "Qual é a principal diferença entre 'props' e 'state' no React?",
    options: [
      { id: 'a', text: 'Props são mutáveis, state é imutável', isCorrect: false },
      { id: 'b', text: 'Props vêm de componentes pais, state é gerenciado internamente', isCorrect: true },
      { id: 'c', text: 'Não há diferença', isCorrect: false },
      { id: 'd', text: 'Props são apenas para texto', isCorrect: false }
    ]
  }
];

export const getQuizTitle = () => "Quiz de Tecnologia";
export const getTotalQuestions = () => quizQuestions.length;

