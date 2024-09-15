import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "#2f2f2f"})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
scene.add(cubeMesh)

// // initialize the camera
// const camera = new THREE.PerspectiveCamera(
//   50,  // FOV
//   window.innerWidth / window.innerHeight, // aspect ratio
//   0.1, // near
//   200)  // far

const aspectRatio = window.innerWidth / window.innerHeight

const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio, // Left
  1 * aspectRatio,  // Right
  1,                // Top
  -1,               // Bottom
  1,                // Near
  200               // Far
)
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio)


// Orbit Controls init
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = false

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})


const renderloop = () => {
  controls.update() // Update first
  renderer.render(scene, camera) // Provide it to the scene next
  window.requestAnimationFrame(renderloop) 
}

renderloop()





