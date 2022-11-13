import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'

const gui = new dat.GUI()
// 渲染器
const renderer = new THREE.WebGL1Renderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.physicallyCorrectLights = true
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

// 聚光灯
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(10, 10, 10)
spotLight.castShadow = true
// 设置阴影的分辨率
spotLight.shadow.mapSize.set(2048, 2048)
// 设置阴影的模糊度
spotLight.shadow.radius = 0.5
spotLight.target = mesh
scene.add(spotLight)

gui.add(spotLight.shadow.camera, 'near').min(0.5).max(20).onChange(() => {
    spotLight.shadow.camera.updateProjectionMatrix()
})

// 光照强度
gui.add(spotLight, 'intensity').min(1).max(10)

// 光线衰减，需要配合渲染器开启 physicallyCorrectLights = true
gui.add(spotLight, 'decay').min(0).max(5)

// 可以想象成一个手电筒射出光线的角度
gui.add(spotLight, 'angle').min(0).max(Math.PI)

// 光线的最大距离
gui.add(spotLight, 'distance').min(0).max(10).step(0.1)

// 聚光的半影衰减比 0 - 1
gui.add(spotLight, 'penumbra').min(0).max(1)

// 动画
// gsap.to(mesh.position, {x: 5, duration: 5 })

const light = new THREE.AmbientLight( 0x404040 ) // soft white light
scene.add(light)

// 控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 参考坐标
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// 添加平面
const plantGeometry = new THREE.PlaneGeometry(100, 100)
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