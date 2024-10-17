img = ""
status = ""
object = []
function preload()
{
sound = loadSound("alarm.wav")
}

function setup()
{
  canvas = createCanvas(640,420)
  canvas.center()
  video = createCapture(VIDEO)
  video.hide()
  video.size(640,420)
  objectDetector = ml5.objectDetector('cocossd', modelLoaded)
document.getElementById('status').innerHTML = 'status: Detecting Objects'
}

function draw()
{
    image(video,0,0,640,420)
    
  if(status  != "")
  {
    for(i = 0; i < object.length ;i++)
    {
   
      
      fill("#ff0000");
      percent = floor(object[i].confidence * 100);
      text(object[i].label + "" + percent + "%",object[i].x + 15,object[i].y +15)
noFill()
stroke("#ff0000")
rect(object[i].x,object[i].y,object[i].width,object[i].height)
   if(object[i].label == 'person')
   {
  sound.stop()
   document.getElementById('status').innerHTML = 'status:Baby Deducted'
   }
   else
{
  sound.play()
     document.getElementById('status').innerHTML = 'status:Baby Not Deducted'
}
}
  }
    
}

function modelLoaded()
{
  console.log('Model  Loaded!')
  status = 'true'
  objectDetector.detect(video ,gotResult)
}

function gotResult(error,results)
{

console.log(results)
 object = results
}