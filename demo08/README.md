经纬线映射贴图 与 HDR

可以通过一张图设置，环境映射，使用DataTextureLoader(这是个抽象类)加载hdr文件，REGELoader是其实现
需要设置 映射模式（https://threejs.org/docs/index.html#api/zh/constants/Textures）为经纬线映射， THREE.EquirectangularRefractionMapping 和 THREE.EquirectangularReflectionMapping都可以设置，但是区别是什么？
