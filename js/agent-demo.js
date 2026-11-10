
const runButton = document.getElementById("run-agent");
const stepsList = document.getElementById("agent-steps");
const message = document.getElementById("agent-message");

const agentSteps = [
    "Understanding the student's examination goal...",
    "Creating a list of subjects and topics...",
    "Organizing topics into a study schedule...",
    "Checking whether all subjects are included...",
    "Study plan successfully generated!"
];

runButton.addEventListener("click", function () {

    runButton.disabled = true;
    runButton.textContent = "Agent is working...";

    stepsList.innerHTML = "";
    message.textContent = "The agent has started working.";

    agentSteps.forEach(function (step, index) {

        const listItem = document.createElement("li");

        listItem.textContent = "Waiting...";
        stepsList.appendChild(listItem);

        setTimeout(function () {

            listItem.textContent = step;
            listItem.classList.add("completed");

            if (index === agentSteps.length - 1) {
                message.textContent =
                    "Demo completed! The agent has reached its goal.";

                runButton.disabled = false;
                runButton.textContent = "Run Again";
            }

        }, (index + 1) * 900);

    });

});
