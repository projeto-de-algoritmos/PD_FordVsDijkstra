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
	}
	
	addVertex(line) {
		this.vertex.push(line);
	}
}