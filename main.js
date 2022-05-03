function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clear_sketch() {
    background("white");
}

function draw() {
    strokeWeight(10);
    stroke("black");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML = "Label: " + results[0].label;
    document.getElementById("confidence").innerHTML = " Confidence: " + Math.round(results[0].confidence*100) + "%";
    document.getElementById("confidenceInM").value = results[0].confidence*100;
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}