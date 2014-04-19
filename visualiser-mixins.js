
var asRenderableElement = function(options) {


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

	// wraps particular methods with extra functionality
	this.setupEvents = function() {
	
		var self = this;
		
		for(var p in this) {
		
			if(p === 'fire') {
			
				var tmpF = this[p];
			
				// wrap the function with our own so we 
				// can add more stuff
				this[p] = function() {
					
					self.flash();
					
					// need to inject the scope back in
					tmpF.call(this);
				};
			}
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