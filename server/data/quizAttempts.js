module.exports = [
  {
    quizSlug: "biology-sprint",
    attempts: [
      {
        studentName: "Alex Johnson",
        studentEmail: "alex.johnson@student.edu",
        status: "completed",
        score: 85,
        timeSpentSeconds: 924,
        completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000 - 924 * 1000),
      },
      {
        studentName: "Emma Wilson",
        studentEmail: "emma.wilson@student.edu",
        status: "completed",
        score: 92,
        timeSpentSeconds: 1104,
        completedAt: new Date(Date.now() - 90 * 60 * 1000),
        startedAt: new Date(Date.now() - 90 * 60 * 1000 - 1104 * 1000),
      },
      {
        studentName: "Michael Cohen",
        studentEmail: "michael.cohen@student.edu",
        status: "in_progress",
        score: 0,
        timeSpentSeconds: 431,
        completedAt: null,
        startedAt: new Date(Date.now() - 431 * 1000),
      },
    ],
  },
  {
    quizSlug: "algebra-warmup",
    attempts: [
      {
        studentName: "Sophia Green",
        studentEmail: "sophia.green@student.edu",
        status: "completed",
        score: 88,
        timeSpentSeconds: 987,
        completedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        startedAt: new Date(Date.now() - 5 * 60 * 60 * 1000 - 987 * 1000),
      },
      {
        studentName: "Liam Carter",
        studentEmail: "liam.carter@student.edu",
        status: "completed",
        score: 95,
        timeSpentSeconds: 840,
        completedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        startedAt: new Date(Date.now() - 8 * 60 * 60 * 1000 - 840 * 1000),
      },
    ],
  },
];
