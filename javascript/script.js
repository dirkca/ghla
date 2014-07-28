$(function(){
	$('.thumbnail img').resizeToParent({parent: '.thumbnail'});
	$('.album-photo img').resizeToParent({parent: '.album-photo'});
	$('.activity-thumb .thumb img').resizeToParent({parent: '.activity-thumb'});
});

$(document).ready(function() {
	// hides the slickbox as soon as the DOM is ready
	$('#toggle-content').hide();
	// shows the slickbox on clicking the noted link  
	$('#toggle-n').click(function() {
		$('#toggle-content').show('slow');
		return false;
	});
	// hides the slickbox on clicking the noted link  
	$('#slick-hide').click(function() {
		$('#toggle-content').hide('fast');
		return false;
	});
	
	// toggles the slickbox on clicking the noted link  
	$('#toggle-button').click(function() {
		$('#toggle-content').slideToggle(400);
		return false;
	});
});


/* SLIDER */
// JavaScript

function Slider()
{
	var _speed    = new Number();
	var _slider   = new Object();
	var _selected = new Object();
	
	this.load   = load;
	this.init   = init;
	this.rotate = rotate;

	function load(object, speed)
	{
		this._slider = $('#' + object);
		this._speed  = speed * 1500;
		
		this.init();
	}
	
	function init()
	{
		this._selected = this._slider.children(':first');
		this._selected.hide();
		this._selected.fadeIn('slow');

		var ref = this;
		setInterval(function() { ref.rotate() },this._speed);
	}
	
	function rotate()
	{
		var nextObject = new Object;
		
		if(this._selected.next().length == 0)
			nextObject = this._slider.children(':first');
		else
			nextObject = this._selected.next();
		
		nextObject.fadeIn('slow');
		this._selected.fadeOut('slow');
		
		this._selected = nextObject;
	}
}



/* IMAGE RESIZE */
/*
 * Plugin Name: Resize Image to Parent Container
 *
 * Author: Christian Varga
 * Author URI: http://christianvarga.com
 *
 */

jQuery.fn.resizeToParent = function(options) {
  var defaults = {
   parent: 'div'
  }

  var options = jQuery.extend(defaults, options);

  return this.each(function() {
    var o = options;
    var obj = jQuery(this);

    // bind to load of image
    obj.load(function() {
      // dimensions of the parent
      var parentWidth = obj.parents(o.parent).width();
      var parentHeight = obj.parents(o.parent).height();

      // dimensions of the image
      var imageWidth = obj.width();
      var imageHeight = obj.height();

      // step 1 - calculate the percentage difference between image width and container width
      var diff = imageWidth / parentWidth;

      // step 2 - if height divided by difference is smaller than container height, resize by height. otherwise resize by width
      if ((imageHeight / diff) < parentHeight) {
       obj.css({'width': 'auto', 'height': parentHeight});

       // set image variables to new dimensions
       imageWidth = imageWidth / (imageHeight / parentHeight);
       imageHeight = parentHeight;
      }
      else {
       obj.css({'height': 'auto', 'width': parentWidth});

       // set image variables to new dimensions
       imageWidth = parentWidth;
       imageHeight = imageHeight / diff;
      }

      // step 3 - center image in container
      var leftOffset = (imageWidth - parentWidth) / -2;
      var topOffset = (imageHeight - parentHeight) / -2;

      obj.css({'left': leftOffset, 'top': topOffset});
    });

    // force ie to run the load function if the image is cached
    if (this.complete) {
      obj.trigger('load');
    }
  });
}