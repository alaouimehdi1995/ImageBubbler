/**
 * Created by mehdi on 11/08/17.
 */
function getAverageColor(imageContext,widthStart,widthFinish,heightStart,heightFinish,blockSize) {
    var pixelData;
    var pixels = {R: 0, G: 0, B: 0, number: 0};
    for (var i = widthStart; i < widthFinish; i += blockSize) {
        for (var j = heightStart; j < heightFinish; j += blockSize) {
            pixelData = imageContext.getImageData(i, j, 1, 1).data;
            pixels.R += pixelData[0];
            pixels.G += pixelData[1];
            pixels.B += pixelData[2];
            pixels.number += 1;
        }
    }

    pixels.R = parseInt(pixels.R / pixels.number);
    pixels.G = parseInt(pixels.G / pixels.number);
    pixels.B = parseInt(pixels.B / pixels.number);

    //pE.style.backgroundColor = "rgb(" + pixels.R + "," + pixels.G + "," + pixels.B + ")";
    return pixels;
}