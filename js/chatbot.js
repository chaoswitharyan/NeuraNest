
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("chat-messages");
const promptButtons = document.querySelectorAll(".prompt-button");

function addMessage(sender, text) {
    const message = document.createElement("div");
    message.classList.add("chat-message");

    if (sender === "user") {
        message.classList.add("user-message");
    } else {
        message.classList.add("bot-message");
    }

    const name = document.createElement("strong");
    name.textContent = sender === "user" ? "You" : "NeuralBot";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    message.appendChild(name);
    message.appendChild(paragraph);

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(message) {
    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi") ||
        text.includes("hey")) {
        return "Hello! Welcome to NeuralNest. What would you like to learn about AI today?";
    }

    if (text.includes("what is ai") ||
        text.includes("artificial intelligence")) {
        return "Artificial Intelligence (AI) is a field of computer science focused on creating systems that perform tasks commonly associated with human intelligence, such as understanding language, recognizing patterns and solving problems.";
    }

    if (text.includes("machine learning")) {
        return "Machine Learning is a branch of AI in which computer systems learn patterns from data and use them to make predictions or decisions.";
    }

    if (text.includes("neural network")) {
        return "A neural network is a computing model inspired by the way biological brains process information. It uses connected units called neurons, arranged in layers, to learn patterns from data.";
    }

    if (text.includes("nvidia")) {
        return "NVIDIA develops GPUs, computing platforms and AI software tools. Its AI ecosystem includes technologies such as NeMo, NIM and Nemotron.";
    }

    if (text.includes("openai") || text.includes("chatgpt") ||
        text.includes("gpt")) {
        return "OpenAI develops AI models and tools, including ChatGPT. These technologies can support conversation, writing, coding, analysis and other tasks.";
    }

    if (text.includes("agent")) {
        return "An AI agent is a system designed to work towards a goal. Depending on its design, it can plan steps, use tools, take actions and evaluate results.";
    }

    if (text.includes("deep learning")) {
        return "Deep Learning is a part of Machine Learning that uses neural networks with multiple layers to learn complex patterns from data.";
    }

    if (text.includes("quiz")) {
        return "Ready to test your knowledge? Open the Quiz page from the NeuralNest navigation and try the AI Knowledge Challenge!";
    }

    if (text.includes("html") || text.includes("css") ||
        text.includes("javascript")) {
        return "HTML structures a webpage, CSS controls its appearance, and JavaScript adds interactivity. Together, they help you build websites like NeuralNest!";
    }

    return "That's an interesting question! I am currently a learning demo with predefined responses. Try asking me about AI, Machine Learning, Neural Networks, NVIDIA, OpenAI or AI Agents.";
}

function sendMessage(message) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
        return;
    }

    addMessage("user", trimmedMessage);

    const response = getBotResponse(trimmedMessage);

    addMessage("bot", response);

    userInput.value = "";
    userInput.focus();
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();
    sendMessage(userInput.value);
});

promptButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        sendMessage(button.dataset.prompt);
    });
});
