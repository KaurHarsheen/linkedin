// Helper function to get dates from the past
const daysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};

const mockData = {
    projects: [
        { id: 1, title: "Portfolio Website", completedAt: daysAgo(10) },
        { id: 2, title: "E-commerce Backend", completedAt: daysAgo(25) },
        { id: 3, title: "Mobile Weather App", completedAt: daysAgo(45) },
        { id: 4, title: "Blog Platform", completedAt: daysAgo(120) },
        { id: 5, title: "Task Manager", completedAt: daysAgo(200) },
        { id: 6, title: "Old Project", completedAt: daysAgo(400) },
    ],
    tasks: [
        // 5 tasks completed in the last 30 days
        ...Array.from({ length: 5 }, (_, i) => ({ id: i, desc: `Task ${i}`, completedAt: daysAgo(5 + i) })),
        // 10 more tasks completed in the last year
        ...Array.from({ length: 10 }, (_, i) => ({ id: 10 + i, desc: `Task ${10 + i}`, completedAt: daysAgo(50 + i * 10) })),
    ],
    learnings: [
        { id: 1, topic: "GraphQL", completedAt: daysAgo(15) },
        { id: 2, topic: "Docker Basics", completedAt: daysAgo(28) },
        { id: 3, topic: "Advanced React Hooks", completedAt: daysAgo(90) },
        { id: 4, topic: "Web Sockets", completedAt: daysAgo(300) },
    ],
};

module.exports = mockData;