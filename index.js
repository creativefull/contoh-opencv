var cv = require('opencv');
cv.readImage("./images/ktp.jpg", function(err, im){
	var contour = im.findContours();
})