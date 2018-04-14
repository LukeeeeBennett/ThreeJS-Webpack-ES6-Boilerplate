export function emptyBox(boxMesh, currentPiece) {
  boxMesh.remove(currentPiece.geometry.mesh);
  currentPiece.geometry.geo.dispose();
  currentPiece.material.dispose();
}