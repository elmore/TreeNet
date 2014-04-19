

var asFunctionWrapper = function(options) {

	this.setupEvents = function() {
	
		var self = this;
		
		for(p in self.wrappers) {
		
			if(this[p]) {
			
				var tmpF = this[p];
				
				var newF = self.wrappers[p];
			
				// wrap the function with our own so we 
				// can add more stuff
				this[p] = function() {
					
					newF.call(this);
					
					// need to inject the scope back in
					tmpF.call(this);
				};			
			}
		}
	};
};





var asRenderableElement = function(options) {
	
	// seems to be a way of requiring other base functionality - sort 
	// of a multiple inheritance thing. nice :)
	asFunctionWrapper.call(this, {});

	this.drawCircle = function(x, y, r) {
		
		this.el = document.createElement('div');
		this.el.style.width = r + 'px';
		this.el.style.height = r + 'px';
		this.el.style.position = 'absolute';
		this.el.style.left = x + 'px';
		this.el.style.top = y + 'px';
		this.el.style.border = '1px solid #000';
		this.el.style.display = 'block';
		
		document.body.appendChild(this.el);
	};

	// these correspond to the methods of the instantiated object
	// which we want to hook in to
	this.wrappers = {
		
		fire : function() {
			
			this.flash();
		}
	};
	
	this.flash = function() {
	
		var self = this;
	
		this.el.style.backgroundColor = '#f00';
		
		setTimeout(function(){
		
			self.el.style.backgroundColor = '#fff';
		}, 500);
	
	};
	
	this.render = function() {
	
		this.drawCircle(this.x, this.y, this.radius);
		
		this.setupEvents();
	};
};

