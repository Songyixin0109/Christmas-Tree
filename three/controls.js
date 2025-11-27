/**
 * 控制器类
 * 使用lil-gui创建交互式控制面板
 */
export class Controls {
  /**
   * @param {Object} params - 可调节的参数对象
   * @param {Renderer} renderer - 渲染器实例
   * @param {Scene} scene - 场景实例
   * @param {Object} callbacks - 参数变化时的回调函数集合
   */
  constructor(params, renderer, scene, callbacks) {
    // 使用全局的 lil 对象
    this.gui = new lil.GUI({ autoPlace: true, width: 300 });
    this.params = params;
    this.renderer = renderer;
    this.scene = scene;
    this.callbacks = callbacks;
    this.setupControls();
  }

  /**
   * 设置控制面板
   */
  setupControls() {
    // 创建树参数控制文件夹
    const treeFolder = this.gui.addFolder('圣诞树参数');
    treeFolder.open();
    
    // 粒子数量控制
    treeFolder.add(this.params, '粒子数量', 1000, 10000, 100)
      .name('粒子数量')
      .onChange(this.callbacks.onTreeUpdate);
    
    // 粒子大小控制
    treeFolder.add(this.params, '粒子大小', 0.01, 0.2, 0.01)
      .name('粒子大小')
      .onChange(this.callbacks.onParticleSize);
    
    // 闪耀大小控制
    treeFolder.add(this.params, '闪耀大小', 0.1, 2.0, 0.1)
      .name('闪耀大小')
      .onChange((value) => {
        if (this.scene.scene.children.find((child) => child.name === 'treeParticles')) {
          const tree = this.scene.scene.children.find((child) => child.name === 'treeParticles');
          if (tree.material.uniforms) {
            tree.material.uniforms.glowSize.value = value;
          }
        }
      });
    
    // 树高度控制
    treeFolder.add(this.params, '树高', 3, 10, 0.1)
      .name('树高')
      .onChange(() => {
        this.callbacks.onTreeUpdate();
        this.callbacks.onStarUpdate();
      });
    
    // 树宽度控制
    treeFolder.add(this.params, '树宽', 1.0, 3.0, 0.1)
      .name('树宽')
      .onChange(this.callbacks.onTreeUpdate);
    
    // 旋转速度控制
    treeFolder.add(this.params, '旋转速度', 0, 0.01, 0.001)
      .name('旋转速度');
    
    // 透明度控制
    treeFolder.add(this.params, '透明度', 0.1, 1.0, 0.1)
      .name('透明度')
      .onChange(this.callbacks.onOpacityChange);

    // 创建星星参数控制文件夹
    const starFolder = this.gui.addFolder('星星参数');
    starFolder.open();
    
    // 星星颜色控制
    starFolder.addColor(this.params, '星星颜色')
      .name('星星颜色')
      .onChange(this.callbacks.onStarUpdate);
    

    // 创建后期处理参数控制文件夹
    const postFolder = this.gui.addFolder('后期处理');
    postFolder.open();
    
    // 发光效果控制
    postFolder.add(this.params.后期处理, '发光强度', 0, 2, 0.1)
      .name('发光强度')
      .onChange((value) => {
        if (this.renderer.bloomPass) {
          this.renderer.bloomPass.strength = value;
        }
      });
    
    postFolder.add(this.params.后期处理, '发光半径', 0, 1, 0.1)
      .name('发光半径')
      .onChange((value) => {
        if (this.renderer.bloomPass) {
          this.renderer.bloomPass.radius = value;
        }
      });
    
    postFolder.add(this.params.后期处理, '发光阈值', 0, 1, 0.1)
      .name('发光阈值')
      .onChange((value) => {
        if (this.renderer.bloomPass) {
          this.renderer.bloomPass.threshold = value;
        }
      });
    
    postFolder.add(this.params.后期处理, '曝光度', 0.1, 3, 0.1)
      .name('曝光度')
      .onChange((value) => {
        if (this.renderer.renderer) {
          this.renderer.renderer.toneMappingExposure = value;
        }
      });
  }
}