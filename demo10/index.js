import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 渲染器
const renderer = new THREE.WebGL1Renderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 场景
const scene = new THREE.Scene()

// 镜头
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

// mesh
const geometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial()
const mesh = new THREE.Mesh(geometry, material)
mesh.castShadow = true
scene.add(mesh)

// 灯光
const directionLight = new THREE.DirectionalLight(0xffffff)
directionLight.position.set(10, 10, 10)
directionLight.castShadow = true
scene.add(directionLight)

const light = new THREE.AmbientLight( 0x404040 ) // soft white light
scene.add(light)

// 控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 参考坐标
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// 添加平面
const plantGeometry = new THREE.PlaneGeometry(5, 5)
const plantMaterial = new THREE.MeshStandardMaterial()
const plant = new THREE.Mesh(plantGeometry, plantMaterial)
plant.receiveShadow = true
plant.position.set(0, -1, 0)
// TODO 双面渲染
plant.rotateX(-Math.PI/2)
scene.add(plant)

const render = () => {
 renderer.render(scene, camera)
 controls.update()
 requestAnimationFrame(render)
}
render()