import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 场景: 角度 远景 进景 大小
const scene = new THREE.Scene() 
// 镜头
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000) //TODO 0.1 --> 0的话就没有显示
camera.position.z = 5
scene.add(camera)

const loader = new THREE.CubeTextureLoader()
const eventMapTexture = loader.setPath('textures/environmentMaps/1/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

// 环境贴图
const geomentry = new THREE.SphereGeometry(1, 20, 20)//new THREE.BoxGeometry(1, 1, 1, 100, 100) 


const meterial = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.1,
    envMap: eventMapTexture,
    // transparent: true
})

const cube = new THREE.Mesh(geomentry, meterial)
scene.add(cube)

// 添加环境灯光
const light = new THREE.AmbientLight( 0x404040 ) // soft white light
scene.add(light)

// 添加直射光
const directionalLight = new THREE.DirectionalLight( 0xffffff)
directionalLight.position.set(10, 10, 10)
scene.add( directionalLight )

// 渲染器：canvas 加入到domcument里面去
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerWidth)


// 轨道控制器
const controls = new OrbitControls( camera, renderer.domElement )
document.body.appendChild(renderer.domElement)



// 参考坐标
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// render
function render() {
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(render)
}
render()