
const topics = [
    {
        id: "ai",
        name: "Artificial Intelligence",
        description: "Understand the fundamentals of AI.",
        link: "topics.html"
    },
    {
        id: "machine-learning",
        name: "Machine Learning",
        description: "Explore how computers learn from data.",
        link: "topics.html"
    },
    {
        id: "neural-networks",
        name: "Neural Networks",
        description: "Learn about neurons, layers and connections.",
        link: "neural-networks.html"
    },
    {
        id: "nvidia",
        name: "NVIDIA AI",
        description: "Explore NVIDIA's AI technologies.",
        link: "nvidia-ai.html"
    },
    {
        id: "openai",
        name: "OpenAI",
        description: "Discover ChatGPT and generative AI.",
        link: "openai-hub.html"
    },
    {
        id: "ai-agents",
        name: "AI Agents",
        description: "Understand planning, actions and tools.",
        link: "ai-agents.html"
    },
    {
        id: "neuralbot",
        name: "NeuralBot",
        description: "Try the NeuralNest chatbot demo.",
        link: "chatbot.html"
    }
];

const STORAGE_KEY = "neuralnestCompletedTopics";

const topicList = document.getElementById("topic-list");
const completedCount = document.getElementById("completed-count");
const progressPercent = document.getElementById("progress-percent");
const bestScore = document.getElementById("best-score");
const progressFill = document.getElementById("progress-fill");
const progressMessage = document.getElementById("progress-message");
const resetButton = document.getElementById("reset-progress");

function getCompletedTopics() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

function saveCompletedTopics(completed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
}

function renderTopics() {
    const completed = getCompletedTopics();

    topicList.innerHTML = "";

    topics.forEach(topic => {
        const isCompleted = completed.includes(topic.id);

        const card = document.createElement("article");
        card.className = "dashboard-topic";

        const heading = document.createElement("h3");
        heading.textContent = topic.name;

        const description = document.createElement("p");
        description.textContent = topic.description;

        const link = document.createElement("a");
        link.href = topic.link;
        link.textContent = "Explore Topic →";

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = isCompleted
            ? "Completed ✓"
            : "Mark as Completed";

        button.className = "complete-topic";
        button.setAttribute("aria-pressed", String(isCompleted));

        if (isCompleted) {
            button.classList.add("is-completed");
        }

        button.addEventListener("click", () => {
            toggleTopic(topic.id);
        });

        card.appendChild(heading);
        card.appendChild(description);
        card.appendChild(link);
        card.appendChild(button);

        topicList.appendChild(card);
    });
}

function toggleTopic(topicId) {
    let completed = getCompletedTopics();

    if (completed.includes(topicId)) {
        completed = completed.filter(id => id !== topicId);
    } else {
        completed.push(topicId);
    }

    saveCompletedTopics(completed);
    renderTopics();
    updateDashboard();
}

function updateDashboard() {
    const completed = getCompletedTopics();

    const count = topics.filter(topic =>
        completed.includes(topic.id)
    ).length;

    const percentage = Math.round((count / topics.length) * 100);

    completedCount.textContent = count;
    progressPercent.textContent = percentage + "%";
    progressFill.style.width = percentage + "%";

    const savedBest = Number(
        localStorage.getItem("neuralnestBestQuizScore") || 0
    );

    bestScore.textContent = savedBest + "/10";

    if (percentage === 100) {
        progressMessage.textContent =
            "Amazing! You have completed every learning topic!";
    } else if (percentage > 0) {
        progressMessage.textContent =
            "Great progress! Keep exploring and learning.";
    } else {
        progressMessage.textContent =
            "Start exploring topics to build your progress!";
    }
}

resetButton.addEventListener("click", () => {
    const confirmed = confirm(
        "Are you sure you want to reset your learning progress and quiz statistics?"
    );

    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("neuralnestBestQuizScore");
    localStorage.removeItem("neuralnestLastQuizScore");
    localStorage.removeItem("neuralnestQuizAttempts");

    renderTopics();
    updateDashboard();
});

renderTopics();
updateDashboard();
