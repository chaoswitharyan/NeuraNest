
const connectionGroup = document.getElementById("network-connections");
const nodeGroup = document.getElementById("network-nodes");

const runButton = document.getElementById("run-network");
const resetButton = document.getElementById("reset-network");
const statusText = document.getElementById("network-status");

const svgNS = "http://www.w3.org/2000/svg";

const layers = [
    {
        name: "INPUT",
        x: 90,
        type: "input",
        positions: [90, 180, 270]
    },
    {
        name: "HIDDEN",
        x: 280,
        type: "hidden",
        positions: [55, 125, 195, 265]
    },
    {
        name: "OUTPUT",
        x: 470,
        type: "output",
        positions: [125, 225]
    }
];

let runToken = 0;
let running = false;

function createSvgElement(tag) {
    return document.createElementNS(svgNS, tag);
}

function drawNetwork() {

    connectionGroup.innerHTML = "";
    nodeGroup.innerHTML = "";

    // Draw connections between neighbouring layers.
    for (let i = 0; i < layers.length - 1; i++) {

        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];

        currentLayer.positions.forEach((y1, fromIndex) => {

            nextLayer.positions.forEach((y2, toIndex) => {

                const line = createSvgElement("line");

                line.setAttribute("x1", currentLayer.x);
                line.setAttribute("y1", y1);
                line.setAttribute("x2", nextLayer.x);
                line.setAttribute("y2", y2);

                line.setAttribute("class", "network-connection");

                line.dataset.stage =
                    `${currentLayer.type}-${nextLayer.type}`;

                connectionGroup.appendChild(line);

            });

        });

    }

    // Draw the nodes and layer labels.
    layers.forEach(layer => {

        const heading = createSvgElement("text");

        heading.setAttribute("x", layer.x);
        heading.setAttribute("y", 25);
        heading.setAttribute("class", "network-layer-label");
        heading.textContent = layer.name;

        nodeGroup.appendChild(heading);

        layer.positions.forEach((y, index) => {

            const group = createSvgElement("g");

            group.setAttribute("class", "network-node");
            group.dataset.layer = layer.type;

            const circle = createSvgElement("circle");

            circle.setAttribute("cx", layer.x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", 21);

            const number = createSvgElement("text");

            number.setAttribute("x", layer.x);
            number.setAttribute("y", y);
            number.textContent = index + 1;

            group.appendChild(circle);
            group.appendChild(number);

            nodeGroup.appendChild(group);

        });

    });

}

function resetNetwork() {

    runToken++;

    running = false;

    document.querySelectorAll(".network-connection").forEach(line => {
        line.classList.remove("active");
    });

    document.querySelectorAll(".network-node").forEach(node => {
        node.classList.remove("active");
    });

    runButton.disabled = false;
    runButton.textContent = "Run Signal";

    statusText.textContent =
        "Network reset. Ready for another simulation.";

}

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function runNetwork() {

    if (running) return;

    running = true;

    const currentRun = ++runToken;

    resetButton.disabled = false;
    runButton.disabled = true;
    runButton.textContent = "Processing...";

    statusText.textContent =
        "Step 1: Information is entering the input layer.";

    // Activate input nodes.
    document.querySelectorAll(
        '.network-node[data-layer="input"]'
    ).forEach(node => node.classList.add("active"));

    await wait(700);

    if (currentRun !== runToken) return;

    // Move information to the hidden layer.
    statusText.textContent =
        "Step 2: Information is passing through the hidden layer.";

    document.querySelectorAll(
        '.network-connection[data-stage="input-hidden"]'
    ).forEach(line => line.classList.add("active"));

    document.querySelectorAll(
        '.network-node[data-layer="hidden"]'
    ).forEach(node => node.classList.add("active"));

    await wait(1000);

    if (currentRun !== runToken) return;

    // Move information to the output layer.
    statusText.textContent =
        "Step 3: The network is producing its output.";

    document.querySelectorAll(
        '.network-connection[data-stage="hidden-output"]'
    ).forEach(line => line.classList.add("active"));

    document.querySelectorAll(
        '.network-node[data-layer="output"]'
    ).forEach(node => node.classList.add("active"));

    await wait(900);

    if (currentRun !== runToken) return;

    statusText.textContent =
        "Completed! Information has reached the output layer.";

    runButton.disabled = false;
    runButton.textContent = "Run Again";

    running = false;

}

runButton.addEventListener("click", runNetwork);

resetButton.addEventListener("click", resetNetwork);

drawNetwork();
