var status="";
var alert_sound="music.mp3";
 var objects=[];

function setup(){
    alert_sound = loadSound('alert.mp3');
canvas=createCanvas(300,300);
canvas.center();
video=createCapture(VIDEO);
video.hide();
video.size(300,300);
video.position()
object_detector=ml5.objectDetector("cocossd",model_loaded);
document.getElementById("status").innerHTML="status:Object detected";
}
function model_loaded (){
    status=true;
    console.log("model_loaded");
    
}

function gotResults(error,results){
    if(error){
console.error(error);
    }else{
        console.log(results);
        objects=results;
    }
}


function draw(){
image(video,0,0,300,300 );
if(status != ""){
    object_detector.detect(video,gotResults);
    for(var i = 0;i<objects.length;i++){
        fill("red");
        stroke("red");
        noFill();
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+" % ",objects[i].x+20,objects[i].y+20);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label == "person"){
        alert_sound.pause();
    document.getElementById("baby_status").innerHTML="baby found"
    }
    
   }if(objects.length == 0){
    alert_sound.play();
    console.log("uh oh");
    document.getElementById("baby_status").innerHTML="baby not found"
}
}}
