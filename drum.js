import * as THREE from 'three';

export function createDrum() {
  // Create a hexagonal cylinder (6 radial segments)
  const geometry = new THREE.CylinderGeometry(2, 2, 5, 6, 1, true);

  const material = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.3,
    roughness: 0.6,
    side: THREE.BackSide, // Flip normals to view inside
  });

  const drum = new THREE.Mesh(geometry, material);
  drum.receiveShadow = true;

  return drum;
}