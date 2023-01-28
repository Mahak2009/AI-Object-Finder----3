video = "";
status1 = "";
objects = [];

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(550, 500);
}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResult);


        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects are Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected are : " + objects.length;

            fill("pink");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y - 35);
            noFill();
            stroke("white");
            rect(objects[i].x, objects[i].y - 45, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("model is loaded");
    status1 = true;
}