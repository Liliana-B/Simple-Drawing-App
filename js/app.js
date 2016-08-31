//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately

var color = $('.selected').css('background-color');
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
//when clicking on control list items
$('.controls').on("click", "li", function() {
  //deselect sibling elements
  $(this).siblings().removeClass('selected');
  //select clicked element
  $(this).addClass('selected');
  //cache current color here
  color = $(this).css('background-color');
});

//when new color is pressed
$("#revealColorSelect").click(function() {
  changeColor();
  $('#colorSelect').toggle();
});
  
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

 //when color sliders change
 $("input[type=range]").change(changeColor);
  //update the new color span

//when add color is pressed  
$("#addNewColor").click(function() {
  //append color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //select the new color
  $newColor.click();
});

$canvas.mousedown(function(e) {
      lastEvent = e;
      mouseDown = true;
}).mousemove(function (e) {
      //draw lines  
      if(mouseDown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
  }).mouseup(function () {
    mouseDown = false;
  }).mouseleave(function () {
    $canvas.mouseup();
  });

//When clicked reset the canvas back to an empy canvas 
$("#reset").click(function(){
        //Used the [0] to select the correct element in canvas
    context.clearRect(0,0, $canvas[0].width, $canvas[0].height); 
});









