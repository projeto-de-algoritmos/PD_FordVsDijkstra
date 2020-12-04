class Node extends Phaser.GameObjects.Image {
	constructor(scene, x, y, texture, id) {
		super(scene, x, y, texture);
		scene.children.add(this);
		
		this.edge = [];
		this.id = id;
		
		this.setInteractive({cursor: 'pointer'});
		this.on('pointerover', () => {
			this.setTint('0xff0000');
			hoverOverNode = this;
		});
		
		this.on('pointerout', () => {
			this.clearTint();
			hoverOverNode = null;
		});

		this.on('pointerdown', (e) => {
			if(activeTool == Tools.ADD_NODE) {
				scene.line = new Phaser.Geom.Line(e.position.x, e.position.y, e.position.x, e.position.y);
				scene.tempGraphics.strokeLineShape(scene.line);
				this.addEdge(scene.line);
				scene.isCreating = true;
				
				selectedNode = this.id;
			}
		})
	}
	
	addEdge(line) {
		this.edge.push(line);
	}
}