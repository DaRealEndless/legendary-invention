song1 = "";
song2 = "";
rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

rightWristScore = 0;
leftWristScore = 0;

status = false;

function preload() {
    
}

function setup() {
    song1 = loadSound("Sasageyo.mp3");
    song2 = loadSound("My War.mp3");
    
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);
    status1 = song1.isPlaying();
    fill('khaki');
    stroke('black');
    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 50);
        song2.stop();
        if (status1 == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Sasageyo";
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
        rightWristScore = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

    }
}