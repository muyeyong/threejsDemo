import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// 场景: 角度 远景 进景 大小
const scene = new THREE.Scene() 
// 镜头
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000) //TODO 0.1 --> 0的话就没有显示
camera.position.z = 5
scene.add(camera)
// 物体：几何体 + 材质

const loader = new THREE.TextureLoader()

const doorTexture = loader.load('./textures/door/color.jpg')
const doorAoTexture  = loader.load('./textures/door/ambientOcclusion.jpg')
const doorAlphaTexture = loader.load('./textures/door/alpha.jpg')
// doorTexture.offset.set(0.1, 0.5)
// doorTexture.rotation = Math.PI / 4



const geomentry = new THREE.BoxGeometry(1,1,1)
const meterial = new THREE.MeshBasicMaterial(
    { 
        map: doorTexture,
        aoMap: doorAoTexture,
        alphaMap: doorAlphaTexture,
        transparent: true
    }
 )
geomentry.setAttribute('uv2', new THREE.BufferAttribute(geomentry.attributes.uv.array, 2))
const cube = new THREE.Mesh(geomentry, meterial)


scene.add(cube)
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