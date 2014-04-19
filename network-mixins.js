
var asInputAccepter = function(options) {
	
	this.getPipe = function() {
		
		return {
		
			message : this.onInput
		};
	};
};

var asOutputProvider = function(options) {

	this.fire = function() {
			
		for(var i=0; i<this._outputs.length; i++) {
		
			this._outputs[i].message();					
		}
	};

	this.pipeTo = function(obj){
	
		if(this._outputs.length >= options.number) {
		
			throw "The node already has " + options.number + " outputs";
		}
		
		this._outputs.push(obj.getPipe());
	};
};

var asTimedOperation = function(options) {

	this.start = function() {
		
		this._timer = setInterval(this.onTrigger, this.period);				
	};
};

