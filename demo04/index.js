import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'




// 场景: 角度 远景 进景 大小
const scene = new THREE.Scene() 
// 镜头
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000) //TODO 0.1 --> 0的话就没有显示
camera.position.z = 5
scene.add(camera)
// 物体：几何体 + 材质
// const geomentry = new THREE.BoxGeometry(1,1,1)
// 通过buffer创建几何体，设置position
// const geomentry = new THREE.BufferGeometry()
// const vertiest = new Float32Array([
//     0, 0, 1,
//     1, 0, 1,
//     0, 1, 1,
//     1, 1, 1,
//     0, 1, 1,
//     1, 0, 1
// ])
// geomentry.setAttribute('position', new THREE.BufferAttribute(vertiest, 3))
// const material = new THREE.MeshBasicMaterial({ color:  0x00ff00 }) 
// const cube = new THREE.Mesh(geomentry, material)

// 随机生成多个cube
for(let i = 0; i < 50 ; i++) {
    const geomentry = new THREE.BufferGeometry()
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()), transparent: true, opacity: Math.random()})
    const vertiest = new Float32Array(9)
    for(let j = 0; j < 9; j++) {
        vertiest[j] = Math.random() * 5
    }
    geomentry.setAttribute('position', new THREE.BufferAttribute(vertiest, 3))
    const cube = new THREE.Mesh(geomentry, material)
    // console.log(cube)
    scene.add(cube)
}

// scene.add(cube)
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