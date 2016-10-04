// This script is not freeware!
//
// Multi-Level Drop-Down Menu 2.25
// You can find and buy latest version of this script 
// at the http://spicebrains.com/multi-level-drop-down-menu/
//
// Copyright 2007 SpiceBrains.com
////////////////////////////////////////////////////////////////////////////////////////////////////

var MLDDM_CLASS		= 'mlddm';		//	menu identifier
var obj_menu		= new Array();	//	for store menu objects

// initialise all menus identified by <ul class="mlddm">
function mlddminit()
{
	// fill the array with all <ul> objects
	var candidates = document.getElementsByTagName('ul');
	var index = 0;

	// check all candidates
	for(var i=0; i < candidates.length; i++) 
	{
		// creating menu objects
		if(candidates[i].className == MLDDM_CLASS) 
		{
			// show menu
			candidates[i].style.visibility = 'visible';

			// read initialization parameters
			var obj = candidates[i];
			var value = obj.getAttribute('params');
		
			// create an object and store its handler
			obj_menu[index] = new menu(obj, index, value); 
			index++; 
		}
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// main menu class
// receive the object handler, object number, and initialization parameters string
function menu(obj, obj_n, params)	
{
	// variables declaration ************************************************************/
	var _handler			= obj;			// mlddm obj                                   
	var _obj_num			= obj_n;		// quantity of menu objects (if there are more than one)     
	var _me					= this;			// alternate pointer to itself
	var _buttons			= new Array();	// all buttons (top level items)                                  
											                                               
	this._layers			= new Array(6);	// an hash of layers                              
	this._layers[0]			= new Array();	// 0 - pointer to an object                     
	this._layers[1]			= new Array();	// 1 - showed/hidden flag
	this._layers[2]			= new Array();	// 2 - level                                 
	this._layers[3]			= new Array();	// 3 - layer's width
	this._layers[4]			= new Array();	// 4 - layer's height                
	this._layers[5]			= new Array();	// 5 - top margin                              
											                                               
	var _closetimer			= null;			// timer                                      
	var _mouseout			= true;			// flag (to avoid triggering multidrug)
	var _currentlayer		= null;			// active layer (mouseover)
 
	// default parameters
	var _shiftx				= 0;			// íorizontal submenu shifting (in pixels)
	var _shifty				= 0;			// vertical submenu shifting (in pixels)
	var _timeout			= 500;			// default timeout	
	var _effect				= 'none';		// default effect (can be none, slide or fade)		
	var _effect_speed		= 300;			// specifies the visual effect speed
	var _orientation		= 'h';			// specifies the horizontal or vertical orientation (can be 'h' or 'v')

	// read parameters from html and change local variables
	var params_array; 
	if(params) 
	{ 
		params_array = params.split(",");
		if(params_array[0]) _shiftx       = params_array[0]*1;	// *1 - it is a string to a digit convert	
		if(params_array[1]) _shifty       = params_array[1]*1;
		if(params_array[2]) _timeout      = params_array[2]*1;
		if(params_array[3]) _effect		  = params_array[3];
		if(params_array[4]) _effect_speed = params_array[4]*1;
		if(params_array[5]) _orientation  = params_array[5];

		// it is not allowed that effect speed is equal to zero
		if(!_effect_speed) _effect_speed = 1000;
	}

// methods declaration ******************************************************************/
// private:
	
	// fade in/fade out effect function
	function opacity(num, opacStart, opacEnd, millisec) 
	{ 
		// speed for each frame
		var speed = Math.round(1000/millisec); 
		var timer = 0; 

		// determine the direction for the blending, 
		// if start and end are the same nothing happens
		if(opacStart > opacEnd) 
		{ 
			for(i = opacStart; i >= opacEnd; i=i-4) 
			{ 
				setTimeout("changeOpac(" + _obj_num + "," + num + "," + i + ")", (timer * speed)); 
				timer++; 
			}
		} 
		else if(opacStart < opacEnd) 
		{ 
			for(i = opacStart; i <= opacEnd; i=i+4) 
			{ 
				setTimeout("changeOpac(" + _obj_num + "," + num + "," + i + ")", (timer * speed)); 
				timer++; 
			} 
		} 
	}

	// slide effect function
	function slide(num, direction, millisec)
	{
		// speed for each frame
		var speed = Math.round(1000/millisec); 
		var timer = 0; 
		
		if(_orientation == 'h')	_ori = 0;
		else					_ori = 1;

		// determine the direction
		if(direction == 'show') 
		{ 
			for(i = 0; i <= 100; i=i+2) 
			{ 
				setTimeout("changePOS(" + _obj_num + "," + num + "," + i + "," + _ori + ")", (timer * speed)); 
				timer++; 
			} 
		} 
		else if(direction == 'hide') 
		{ 
			for(i = 100; i >= 0; i=i-2) 
			{ 
				setTimeout("changePOS(" + _obj_num + "," + num + "," + i + "," + _ori + ")", (timer * speed)); 
				timer++; 
			}
		} 
	}
	
	// return level of the layer
	function getlevel(layer)
	{
		var level = 0;
		var currentobj = layer;
		while(currentobj.className != MLDDM_CLASS)
		{
			if(currentobj.tagName == 'UL') level++;
			currentobj = currentobj.parentNode;
		}
		
		return level;
	}
	
	// calculates button handler by child layer
	function getbutton(layer)
	{
		var button;
		var currobj = layer;
		var index = 0;
		while(currobj.className != MLDDM_CLASS)
		{	
			if(currobj.tagName == 'LI') 
			{
				index++;
				button = currobj;
			}
			currobj = currobj.parentNode;
		}
		return button;
	}
	
	// turn on button by setting "buttonhover" id
	function button_on(layer)
	{
		// only if it top level object
		if(getlevel(layer) !=1) return -1;

		var button = getbutton(layer);
		if(button) 
		{
			button = button.getElementsByTagName("a")[0];
			button.id = 'buttonhover';
		}
	}

	// turn off button by setting "buttonnohover" id
	function button_off(layer)
	{
		// only if it top level object
		if(getlevel(layer) !=1) return -1;

		var button = getbutton(layer);
		if(button) 
		{
			button = button.getElementsByTagName("a")[0];
			button.id = 'buttonnohover';
		}
	}
	
	// open hidden layer
	function mopen(index)
	{
		if(!_me._layers[1][index])						// proceed only if layer is hidden
		{
			if(_effect == 'fade') 
				opacity(index, 0, 100, _effect_speed);	// show using fade effect
			else if(_effect == 'slide') 
				slide(index, 'show', _effect_speed);	// show using slide effect	
			else
				_me._layers[0][index].style.visibility = 'visible';

			button_on(_me._layers[0][index]);			// turn on top-level button        	
			_me._layers[1][index] = true;				// change status in the hash
		}
	}

	// close showed layer
	function mclose(index)
	{
		if(_me._layers[1][index])						// proceed only if layer is showed
		{
			if(_effect == 'fade') 
				opacity(index, 100, 0, _effect_speed);	// hide using fade effect
			else if(_effect == 'slide') 
				slide(index, 'hide', _effect_speed);	// hide using slide effect
			else
				_me._layers[0][index].style.visibility = 'hidden';
			
			button_off(_me._layers[0][index]);			// turn off top-level button       
			_me._layers[1][index] = false;				// change status in the hash 
		}
	}

	// close all layers
	function closeall()
	{
		for(var i=0; i < _me._layers[0].length; i++) { mclose(i); }
	}

	// set close timer
	function mclosetime()
	{	
		_closetimer = window.setTimeout(closeall, _timeout);
	}
	
	// cancel close timer
	function mcancelclosetime()
	{
		if(_closetimer) { window.clearTimeout(_closetimer); _closetimer = null;	}
	}

	// return layer number of this._layers array
	function getlayerindex(obj)
	{
		for(var i=0; i < _me._layers[0].length; i++) 
		{ 
			if(_me._layers[0][i] == obj) return i; 
		}
		return -1;
	}

//public:
	this.pcloseall = function() { closeall(); };

	// mouseover event handler (current object is li-node)
	this.eventover = function()
	{
		if(_mouseout)					// to avoid multidrug triggering 
		{	
			_mouseout = false;			// reset flag
			mcancelclosetime();			// cancel timeout
			var currentli = this;		// current li node
			
			// if current li node have child layer, it will be shown
			var layer = currentli.getElementsByTagName("ul")[0];
			var ind = getlayerindex(layer);
			if(ind >= 0) mopen(ind);
			
			// collect pointers to all layers that will be shown
			var open_layers = new Array();
				
				// try to find first layer within current li node
				open_layers[0] = currentli.getElementsByTagName("ul")[0];
				if(!open_layers[0]) open_layers[0] = 0;
				
				// collect
				var currobj = currentli.parentNode;
				var num = 0;
				while(currobj.className != MLDDM_CLASS)
				{
					if(currobj.tagName == 'UL') 
					{
						num++;
						open_layers[num] = currobj;
					}
					currobj = currobj.parentNode;
				}
			
			// layers to hide
			var layers_to_hide = new Array(_me._layers[0].length);
			
			// fill with false values
			for(var i=0; i < layers_to_hide.length; i++) 
				layers_to_hide[i] = false;
			
			// set true flags to all showed layers
			for(var i=0; i < open_layers.length; i++)
				layers_to_hide[getlayerindex(open_layers[i])] = true;
			
			// hide all layers with false flag
			for(var i=0; i < layers_to_hide.length; i++)
				if(!layers_to_hide[i] && (_currentlayer != open_layers[0])) mclose(i);
			
			// show and save current layer
			_currentlayer = open_layers[1];
		}
	};
	this.eventout = function() { _mouseout = true; };	// set mouseout flag
	this.allout = function()   { mclosetime(); };		// turn on close timer
	this.allover = function()  { mcancelclosetime(); }; // cancel close timer
	
	
// constructor **************************************************************************/
	//var debug = document.getElementById('debug');
	//var value = '';
	//value = value + this._layers[0][number].offsetWidth + ", ";
	//debug.value = value;

	// find and save top-level buttons ///////////////////////////////////////////////////
	var current = _handler.getElementsByTagName("li")[0];
	var i = 0;
	while(current)
	{
		_buttons[i] = current;
		current = node_after(current);
		i++;
	}
	
	// find all li nodes and set mouse event handlers ////////////////////////////////////
	var count = 0;
	var all_li = _handler.getElementsByTagName("li");
	for(var i = 0; i < all_li.length; i++)
	{
		// find and save layers (ul)
		var layer = all_li[i].getElementsByTagName("ul")[0];
		if(layer) 
		{	
			this._layers[0][count] = layer;	// save pointer
			this._layers[1][count] = false;	// visibility flag (in the beginning, all layers are invisible)
			count++; 
		}
		
		// set mouse event handlers
		all_li[i].onmouseover = this.eventover;
		all_li[i].onmouseout  = this.eventout;
	}
	_handler.onmouseout  = this.allout;		// set global mouseout event handler
	_handler.onmouseover = this.allover;	// set global onmouseover event handler

	// calculate and save level, width, height, top margin of each layer /////////////////
	var layer_quantity = this._layers[0].length;	
	for(var number = 0; number < layer_quantity; number++) // pass all layers
	{
		// calculate and save level of layer
		this._layers[2][number] = getlevel(this._layers[0][number]);

		// calculate and save width and height
		this._layers[3][number] = this._layers[0][number].offsetWidth;
		this._layers[4][number] = this._layers[0][number].offsetHeight;

		// calculate and save margin-top
		var obj = this._layers[0][number];
		var top = obj.offsetTop; 
			obj.style.marginTop = 0+'px';
		var margintop = top - obj.offsetTop; 
			obj.style.marginTop = margintop+'px';
			this._layers[5][number] = margintop;
	}
	
	// calculate and set new position for all layers /////////////////////////////////////
	for(index = 0; index < this._layers[0].length; index++)
	{
		// calculate layer level
		var level = 0;
		var currentobj = this._layers[0][index];
		while(currentobj.className != MLDDM_CLASS)
		{
			if(currentobj.tagName == 'UL') level++;
			currentobj = currentobj.parentNode;
		}
		
		// if horizontal orientation - first level layer already have correct position
		if((_orientation == 'h' && level > 1) || (_orientation == 'v'))
		{
			var parent_ul;	
			var parent_a;
			var curr = this._layers[0][index].parentNode;
			
			// find parent <ul>
			while(curr.tagName != 'UL') 
			{	
				if(curr.parentNode) curr = curr.parentNode;
				else				return 1;
			}
			parent_ul = curr;

			// find parent <a>
			var curr = this._layers[0][index].parentNode;
			while(curr.tagName != 'LI') 
			{
				if(curr.parentNode)
					curr = curr.parentNode;
				else
					return 1;
			}
			parent_a = curr.getElementsByTagName("a")[0];
			
			// store array of <a>-items
			var a_tags = new Array();
			var i = 0;
			curr = parent_ul.getElementsByTagName("li")[0];
			while(curr)
			{
				if(curr.getElementsByTagName("a")[0])
					a_tags[i] = curr.getElementsByTagName("a")[0];

				curr = node_after(curr);
				if(curr) if(curr.tagName == 'LI') i++;
			}

			// calculate height of the block of <a> items from beginning of the layer up to child layer
			var ablock_width = a_tags[1].offsetWidth;
			var ablock_height = 0;
			var num = 0;			
			for(var i = 0; i < a_tags.length; i++)
			{
				if(a_tags[i] != parent_a)
				{
					ablock_height = ablock_height + a_tags[i].offsetHeight;
					num++;
				}
				else break;
			}

			// set layer new position
			this._layers[0][index].style.left = ablock_width  + _shiftx + 'px';
			this._layers[0][index].style.top  = ablock_height + _shifty + 'px';
		}
	}
}
// end class menu

// change the opacity for different browsers 
function changeOpac(obj_num, layer_num, opacity)
{
	var object = obj_menu[obj_num];
	var layer  = object._layers[0][layer_num];

	layer.style.opacity			= (opacity / 100); 
	layer.style.MozOpacity		= (opacity / 100); 
	layer.style.KhtmlOpacity	= (opacity / 100); 
	layer.style.filter			= "alpha(opacity="+opacity+")";

	if(opacity > 98) layer.style.filter = 'none';			

	if(opacity  > 0) layer.style.visibility='visible';
	if(opacity <= 0) layer.style.visibility='hidden';
}

// change the POS for different browsers 
function changePOS(obj_num, layer_num, pos, ori)
{
	var object		= obj_menu[obj_num];
	var layer		= object._layers[0][layer_num];
	var level		= object._layers[2][layer_num];
	var width		= object._layers[3][layer_num];
	var height		= object._layers[4][layer_num];
	var margintop	= object._layers[5][layer_num];

	// left to right slide or top to bottom
	if(level == 1 && ori == 0)
	{
		var h = height - pos*height/100; 

		// set pore pixels if menu is too big
		layer.style.clip	  = 'rect('+h+'px 1000px 1000px 0px)';
		layer.style.marginTop = -h+margintop+'px';
	}
	else
	{
		var w = width - pos*width/100; 

		// set pore pixels if menu is too big
		layer.style.clip	  = 'rect(0px 1000px 1000px '+w+'px)';
		layer.style.marginLeft = -w+'px';
	}

	if(pos <= 0) layer.style.visibility = 'hidden';
	if(pos  > 0) layer.style.visibility = 'visible';
	
}

function close() { for(var i=0; i < obj_menu.length; i++) { obj_menu[i].pcloseall(); } }
document.onclick = close; // close all layers

// independent functions ///////////////////////////////////////////////////////////////////////////
// Bypass whitespaces. Read more at http://developer.mozilla.org/en/docs/Whitespace_in_the_DOM
function is_all_ws(nod)
{
  return !(/[^\t\n\r ]/.test(nod.data)); 
}

function is_ignorable(nod)
{
  return ( nod.nodeType == 8) || 
         ((nod.nodeType == 3) && is_all_ws(nod) ); 
}

function node_after(sib)
{
	while((sib = sib.nextSibling)) { if(!is_ignorable(sib)) return sib; }
	return null;
}

// automatic loader ////////////////////////////////////////////////////////////////////////////////
_LOADERS = Array();

function callAllLoaders() 
{
	var i, loaderFunc;

	for(i=0; i<_LOADERS.length; i++) 
	{
		loaderFunc = _LOADERS[i];
		if(loaderFunc != callAllLoaders) loaderFunc();
	}
}

function appendLoader(loaderFunc) 
{
	if(window.onload && window.onload != callAllLoaders) _LOADERS[_LOADERS.length] = window.onload;
	window.onload = callAllLoaders;
	_LOADERS[_LOADERS.length] = loaderFunc;
}

// auto start script
appendLoader(mlddminit);
