import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'



// 场景: 角度 远景 进景 大小
const scene = new THREE.Scene() 
// 镜头
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000) //TODO 0.1 --> 0的话就没有显示
camera.position.z = 5
scene.add(camera)
// 物体：几何体 + 材质
const geomentry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({ color:  0x00ff00 }) 
const cube = new THREE.Mesh(geomentry, material)

console.log(cube)

scene.add(cube)
// 渲染器：canvas 加入到domcument里面去
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerWidth)


// 轨道控制器
const controls = new OrbitControls( camera, renderer.domElement )
document.body.appendChild(renderer.domElement)


// 使用gsap动画
gsap.to(cube.position, {x: 5, duration: 5 })

// 使用dat.gui 控制属性
const gui = new dat.GUI()

const cubeProps = { 
    color: '#FF0000' // 初始化赋值要正确
}
gui.add(cube.position, 'x', 0, 5, 0.5).name('改变x轴')

gui.addColor(cubeProps, 'color').onChange(color => {
    cube.material.color = new THREE.Color(color)
})


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