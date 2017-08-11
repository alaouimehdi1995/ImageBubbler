/**
 * Created by mehdi on 11/08/17.
 */
function el(id){return document.getElementById(id);} // Get elem by ID

var resultCanvas  = el("colorMap");
var context;


function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
            var img = new Image();

            img.addEventListener("load", function() {


                var imageCanvas=document.createElement("canvas");
                imageCanvas.width=img.width;
                imageCanvas.height=img.height;
                var imageContext=imageCanvas.getContext("2d");
                imageContext.drawImage(img, 0, 0);

                var pix=getAverageColor(imageContext,0,imageCanvas.width,0,imageCanvas.height,35);
                //Calling displayers


                var proportion=0.5; //window proportion

                //resultCanvas.style.width=Math.max(parseFloat(img.width),parseFloat(img.height))+"px";

                resultCanvas.style.width=(proportion*parseFloat(screen.width))+"px";
                resultCanvas.style.height=resultCanvas.style.width;
                var proportion=parseFloat(img.width)/parseFloat(resultCanvas.style.width);
                //resultCanvas.style.height=resultCanvas.style.width;
                //resultCanvas.style.height=parseFloat(resultCanvas.style.width)*(parseFloat(img.height)/parseFloat(img.width))+"px";


                var newDiv=document.createElement('div');
                newDiv.className='bloc';
                newDiv.style.width=Math.max(parseFloat(resultCanvas.style.width),parseFloat(resultCanvas.style.height))+"px";
                newDiv.style.height=parseFloat(newDiv.style.width)+"px";
                newDiv.style.backgroundColor="rgb(" + pix.R + "," + pix.G + "," + pix.B + ")";
                setMiddle(resultCanvas,newDiv,0,resultCanvas.style.width,0,resultCanvas.style.height);
                resultCanvas.appendChild(newDiv);
                newDiv.addEventListener("mousemove",function(e){split(imageCanvas,proportion,e);},false);

            });
            img.src = e.target.result;
        };
        FR.readAsDataURL( this.files[0] );

    }
}





el("fileUpload").addEventListener("change", readImage, false);


function setMiddle(parent,child,widthStart,widthEnd,heightStart,heightEnd){
    child.style.left=(parseFloat(widthEnd)+parseFloat(widthStart)-parseFloat(child.style.width))+"px";
    child.style.top=(parseFloat(heightEnd)+parseFloat(heightStart)-parseFloat(child.style.height))+"px";
    console.log("blabladone");
}




