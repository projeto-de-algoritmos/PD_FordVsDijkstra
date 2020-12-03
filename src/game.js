var scene;
var Tools = {
	ADD_NODE: 1,
	SET_END: 2,
	SET_START: 3,
	DEFAULT: 0
}
var activeTool = 0;

var multiplier = 1;

var graphNotEmpty = false;

var hoverOverNode = null;

var MainScene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize: function MainScene() {
		Phaser.Scene.call(this, {key: 'main_scene'});
	},

	preload: function () {
		this.load.image('circle', 'assets/circle.png');
	},


	create: function () {
		scene = this;
		
		this.tempGraphics = this.add.graphics({lineStyle: {width: 2, color: 0xffffff}});
		this.permGraphics = this.add.graphics({lineStyle: {width: 2, color: 0xffffff}});
		this.line;
		
		this.isCreating = false;
	
		
		this.input.on('pointermove', (e) => {
			if(activeTool == Tools.ADD_NODE){
				if(this.isCreating) {
					this.line.x2 = e.position.x;
					this.line.y2 = e.position.y;
					this.tempGraphics.clear();
					this.tempGraphics.strokeLineShape(this.line);
				}
			}
		});
		
		this.input.on('pointerup', (e) => {
			if(activeTool == Tools.ADD_NODE ){
				if(this.isCreating) {
					if(hoverOverNode != null){
						this.line.x2 = hoverOverNode.x;
						this.line.y2 = hoverOverNode.y;
						hoverOverNode.addVertex(this.line)
					} else {
						let node = new Node(this, e.position.x, e.position.y, 'circle').setOrigin(0.5).setScale(0.05);
						node.addVertex(this.line);
					}
					if(multiplier == -1){
						console.log("Nani")
						scene.permGraphics.lineStyle(2, 0xed8d8d);
					} else {
						scene.permGraphics.lineStyle(2, 0xffffff);
					}
					this.isCreating = false;					
					this.permGraphics.strokeLineShape(this.line);
					this.tempGraphics.clear();
				} else if(!graphNotEmpty){
					this.isCreating = true;
					this.line = new Phaser.Geom.Line(e.position.x, e.position.y, e.position.x, e.position.y);
					
					this.tempGraphics.strokeLineShape(this.line);
					let node = new Node(this, e.position.x, e.position.y, 'circle').setOrigin(0.5).setScale(0.05);
					graphNotEmpty = true;
					node.addVertex(this.line);
				}
			}
		});
	}
});

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: 0,
			debug: false
		}
	},
    scene: [MainScene]
};

var game = new Phaser.Game(config);
