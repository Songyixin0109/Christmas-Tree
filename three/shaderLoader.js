export class ShaderLoader {
    static async loadShader(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load shader: ${url}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading shader:', error);
            return this.getFallbackShader(url);
        }
    }

    static getFallbackShader(url) {
        if (url.includes('vertex')) {
            return `
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;
        } else {
            return `
                void main() {
                    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
                }
            `;
        }
    }

    static async loadAllShaders() {
        const shaders = {};

        try {
            // 加载圣诞树粒子着色器
            shaders.particleVertex = await this.loadShader('./shader/particle/vertex.glsl');
            shaders.particleFragment = await this.loadShader('./shader/particle/fragment.glsl');

            // 加载星星粒子着色器
            shaders.starParticleVertex = await this.loadShader('./shader/starParticle/vertex.glsl');
            shaders.starParticleFragment = await this.loadShader('./shader/starParticle/fragment.glsl');

            // 加载流星着色器
            shaders.fallingStarVertex = await this.loadShader('./shader/fallingStar/vertex.glsl');
            shaders.fallingStarFragment = await this.loadShader('./shader/fallingStar/fragment.glsl');

            shaders.starVertex = await this.loadShader('./shader/star/vertex.glsl');
            shaders.starFragment = await this.loadShader('./shader/star/fragment.glsl');

            console.log('All shaders loaded successfully');
        } catch (error) {
            console.error('Error loading shaders:', error);
        }

        return shaders;
    }
}