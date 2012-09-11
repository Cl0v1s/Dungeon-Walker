window.onkeydown = function(event) {
	var e = event || window.event;
	var key = e.which || e.keyCode;
	LastKey=key;
	//alert(key);
}

window.onkeyup = function(event) {
	LastKey=0;
}


function Input()
{
}

/**
 * Checks if the last key equals the specified value
 */
Input.prototype.equals=function(value)
{
		if(LastKey==value)
		{
			LastKey=0;
			return true;
		}
		else
		{
			return false;
		}
}

/**
 * Returns the last pressed key
 */
Input.prototype.getLastKey=function()
{
	return LastKey;
}
