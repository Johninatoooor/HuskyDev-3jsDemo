// Imports Orbit controls to control camera via mouse
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

// Imports 3js itself
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";

// Imports the tool to load our .glb files
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

// *** This is the path to your asset. Replace "cube" with the name of your file ***
const assetPath = "assets/cube.glb"

const canvas = document.querySelector(".webgl");    // Retrieves the canvas 'object(?)' thing that is in the body of the html
const scene = new THREE.Scene();                    // Creates a new 3js scene
const gltfLoader = new GLTFLoader();                // Creates a new instance of the loader
var root;

// Loads our asset and adds it to the scene
gltfLoader.load(assetPath, function (glb) {
  console.log(glb);
  root = glb.scene;
  scene.add(root);
});

// Creates some cool lighting and adds it to the scene. You can experiement with these if you want
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Parameters = (Color, Intensity)
directionalLight.position.set(20, 20, 10);                          // Parameters = (x, y, z) position
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-10, -10, -20);
scene.add(directionalLight2);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Renderer gets updated each time window is resized
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Configurable parameters for the camera. You can mess with these after importing your asset
const fov = 75;
const aspect = sizes.width / sizes.height;
const near = 0.1;
const far = 100;
// Creates the new camera, moves it into position and adds it to the scene
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(1, 15, 3);  // Configurable (x, y, z) coords
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);

// Idk
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // this makes background blank
});

// Idk
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// When called, puts everything we set up into play (I think)
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
