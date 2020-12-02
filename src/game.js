var scene;
var Tools = {
	ADD_NODE: 1,
	SET_END: 2,
	SET_START: 3,
	DEFAULT: 0
}
var activeTool = 0;

var multiplier = 1;

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
		
		let tempGraphics = this.add.graphics({lineStyle: {width: 2, color: 0xffffff}});
		let permGraphics = this.add.graphics({lineStyle: {width: 2, color: 0xffffff}});
		let line;
		
		let isCreating = false;
		let circle = this.add.image(0, 0, 'circle').setOrigin(0.5).setScale(0.05);
		
		this.input.on('pointermove', (e) => {
			if(activeTool == Tools.ADD_NODE){
				if(isCreating) {
					line.x2 = e.position.x;
					line.y2 = e.position.y;
				
					tempGraphics.clear();
					tempGraphics.strokeLineShape(line);
				}
			
				else  {
					circle.x = e.position.x;
					circle.y = e.position.y;
				}
			}
		});
		
		this.input.on('pointerup', (e) => {
			if(activeTool == Tools.ADD_NODE){
			if(isCreating) {
				isCreating = false;
				circle.setAlpha(1);
				
				let node = new Node(this, e.position.x, e.position.y, 'circle').setOrigin(0.5).setScale(0.05);
				node.addVertex(line);
				
				permGraphics.strokeLineShape(line);
				tempGraphics.clear();
			}
			
			else {
				isCreating = true;
				circle.setAlpha(0);
				
				line = new Phaser.Geom.Line(e.position.x, e.position.y, e.position.x, e.position.y);
				tempGraphics.strokeLineShape(line);
				
				let node = new Node(this, e.position.x, e.position.y, 'circle').setOrigin(0.5).setScale(0.05);
				node.addVertex(line);
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
