class Node extends Phaser.GameObjects.Image {
	constructor(scene, x, y, texture) {
		super(scene, x, y, texture);
		scene.children.add(this);
		
		this.vertex = [];
		
		this.setInteractive({cursor: 'pointer'});
		this.on('pointerover', () => {
			this.setTint('0xff0000');
		});
		
		this.on('pointerout', () => {
			this.clearTint();
		});

		this.on('pointerdown', (e) => {
			scene.line = new Phaser.Geom.Line(e.position.x, e.position.y, e.position.x, e.position.y);
			scene.tempGraphics.strokeLineShape(scene.line);
			this.addVertex(scene.line);
			scene.isCreating = true;
		})
	}
	
	addVertex(line) {
		this.vertex.push(line);
	}
}