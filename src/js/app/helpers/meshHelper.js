import {
  WireframeGeometry,
  LineSegments,
  EdgesGeometry,
  BoxHelper,
  FaceNormalsHelper,
  VertexNormalsHelper,
} from 'three';

// Simple mesh helper that shows edges, wireframes, and face and vertex normals
export default class MeshHelper {
  constructor(scene, mesh) {
    const wireframe = new WireframeGeometry(mesh.geometry);
    const wireLine = new LineSegments(wireframe);
    wireLine.material.depthTest = false;
    wireLine.material.opacity = 0.25;
    wireLine.material.transparent = true;
    mesh.add(wireLine);

    const edges = new EdgesGeometry(mesh.geometry);
    const edgesLine = new LineSegments(edges);
    edgesLine.material.depthTest = false;
    edgesLine.material.opacity = 0.25;
    edgesLine.material.transparent = true;
    mesh.add(edgesLine);

    scene.add(new BoxHelper(mesh));
    scene.add(new FaceNormalsHelper(mesh, 2));
    scene.add(new VertexNormalsHelper(mesh, 2));
  }
}
