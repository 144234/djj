song= "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristy = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(500,600);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video, 0, 0, 500, 600);
    fill("#e61515");
    stroke("#e61515");
    
    if(scoreRightWrist > 0.1){

    circle(rightWristX, rightWristY,20);

    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = " + "0.5";
        song.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = " + "1";
        song.rate(1);
    }

    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = " + "1.5";
        song.rate(1.5);
    }

    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = " + "2";
        song.rate(2);
    }

    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = " + "2.5";
        song.rate(2.5);
    }

    else if(rightWristY > 500 && rightWristY <= 600){
        document.getElementById("speed").innerHTML = "Speed = " + "3";
        song.rate(3);
    }
    }

    if(scoreLeftWrist > 0.1){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/600;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        console.log('Left Wrist X = ' + leftWristX);
        leftWristY = results[0].pose.leftWrist.y;
        console.log('Left Wrist Y = ' + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        console.log('Right Wrist X = ' + rightWristX);
        rightWristY = results[0].pose.rightWrist.y;
        console.log('Right Wrist Y = ' + rightWristY);
    }
}
