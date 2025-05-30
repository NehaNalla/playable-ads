import * as THREE from "three";

export class SpriteFlipbook {
  tilesHoriz = 0;
  tilesVert = 0;
  currentTile = 0;

  map;
  maxDisplayTime;
  elapsedTime;
  runningTileArrayIndex = 0;

  playSpriteIndices = [];
  sprite;

  constructor(spriteTexture, tilesHoriz, tilesVert, scene, name) {
    this.tilesHoriz = tilesHoriz;
    this.tilesVert = tilesVert;

    this.map = new THREE.TextureLoader().load(spriteTexture);
    this.map.repeat.set(1 / tilesHoriz, 1 / tilesVert);

    this.update(0);

    const material = new THREE.SpriteMaterial({ map: this.map, opacity: 1 });

    this.sprite = new THREE.Sprite(material);

    this.sprite.name = name;

    scene.add(this.sprite);
  }
  loop = (playSpriteIndices, totalDuration) => {
    this.playSpriteIndices = playSpriteIndices;
    this.runningTileArrayIndex = 0;
    this.currentTile = playSpriteIndices[this.runningTileArrayIndex];
    this.maxDisplayTime = totalDuration / this.playSpriteIndices.length;
    this.elapsedTime = this.maxDisplayTime;
  };

  setPosition = (x, y, z) => {
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.sprite.position.z = z;
  };

  addPosition = (x, y, z) => {
    this.sprite.position.x += x;
    this.sprite.position.y += y;
    this.sprite.position.z += z;
  };

  setScale = (scale) => {
    this.sprite.scale.setScalar(scale);
  };

  getPosition = () => {
    return this.sprite.position;
  };

  update = (delta) => {
    this.elapsedTime += delta;

    if (this.maxDisplayTime > 0 && this.elapsedTime >= this.maxDisplayTime) {
      this.elapsedTime = 0;
      this.runningTileArrayIndex =
        (this.runningTileArrayIndex + 1) % this.playSpriteIndices.length;
      this.currentTile = this.playSpriteIndices[this.runningTileArrayIndex];

      const offsetX = (this.currentTile % this.tilesHoriz) / this.tilesHoriz;
      const offsetY =
        (this.tilesVert - Math.floor(this.currentTile / this.tilesHoriz) - 1) /
        this.tilesVert;

      this.map.offset.x = offsetX;
      this.map.offset.y = offsetY;
    }
  };
}
