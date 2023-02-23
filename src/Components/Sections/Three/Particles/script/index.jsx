import React, { useLayoutEffect } from "react";
import * as THREE from "three";
import vertexShader from "../shader/vertex.glsl?raw";
import fragmentShader from "../shader/fragment.glsl?raw";
import gsap from "gsap";

const Particles = ({ renderNode, particleImg, position }) => {
  let width, height, object3D;

  useLayoutEffect(() => {
    if (renderNode) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        50,
        renderNode.current.offsetWidth / renderNode.current.offsetHeight,
        1,
        10000
      );
      camera.position.z = 300;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(
        renderNode.current.offsetWidth,
        renderNode.current.offsetHeight
      );
      renderNode.current.appendChild(renderer.domElement);

      const clock = new THREE.Clock(true);

      const loader = new THREE.TextureLoader();

      //TODO googlen zu CORS Fehler bei particleImg ggf. extra media fetch machen
      // let src = particleImg;
      //Übergangslösung:
      let src;
      switch (position) {
        case "Home":
          src = "./marco.webp";
          break;
        case "WebDev":
          src = "./earth.webp";
          break;
        case "Sustainability":
          src = "./flower.webp";
          break;
      }
      console.log(position);
      console.log(src);
      loader.load(src, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;

        width = texture.image.width;
        height = texture.image.height;

        //init points
        let numPoints = width * height;

        let numVisible = numPoints;
        let threshold = 0;
        let originalColors;

        let discard = true;
        if (discard) {
          // discard pixels darker than threshold #22
          numVisible = 0;
          threshold = 34;

          const img = texture.image;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = width;
          canvas.height = height;
          ctx.scale(1, -1);
          ctx.drawImage(img, 0, 0, width, height * -1);

          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          originalColors = Float32Array.from(imgData.data);

          for (let i = 0; i < numPoints; i++) {
            if (originalColors[i * 4 + 0] > threshold) numVisible++;
          }
        }

        const uniforms = {
          uTime: { value: 0 },
          uRandom: { value: 1.0 },
          uDepth: { value: 2.0 },
          uSize: { value: 0.0 },
          uTextureSize: { value: new THREE.Vector2(width, height) },
          uTexture: { value: texture },
          uTouch: { value: null },
        };
        const material = new THREE.RawShaderMaterial({
          uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          depthTest: false,
          transparent: true,
          blending: THREE.AdditiveBlending,
        });
        const geometry = new THREE.InstancedBufferGeometry();
        // positions
        const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
        positions.setXYZ(0, -0.5, 0.5, 0.0);
        positions.setXYZ(1, 0.5, 0.5, 0.0);
        positions.setXYZ(2, -0.5, -0.5, 0.0);
        positions.setXYZ(3, 0.5, -0.5, 0.0);
        geometry.attributes.position = positions;

        // uvs
        const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
        uvs.setXYZ(0, 0.0, 0.0);
        uvs.setXYZ(1, 1.0, 0.0);
        uvs.setXYZ(2, 0.0, 1.0);
        uvs.setXYZ(3, 1.0, 1.0);
        geometry.attributes.uv = uvs;
        // index
        geometry.setIndex(
          new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1)
        );

        const indices = new Uint16Array(numVisible);
        const offsets = new Float32Array(numVisible * 3);
        const angles = new Float32Array(numVisible);

        for (let i = 0, j = 0; i < numPoints; i++) {
          if (discard && originalColors[i * 4 + 0] <= threshold) continue;

          offsets[j * 3 + 0] = i % width;
          offsets[j * 3 + 1] = Math.floor(i / width);

          indices[j] = i;

          angles[j] = Math.random() * Math.PI;

          j++;
        }
        geometry.attributes.pindex = new THREE.InstancedBufferAttribute(
          indices,
          1,
          false
        );
        geometry.attributes.offset = new THREE.InstancedBufferAttribute(
          offsets,
          3,
          false
        );
        geometry.attributes.angle = new THREE.InstancedBufferAttribute(
          angles,
          1,
          false
        );
        object3D = new THREE.Mesh(geometry, material);

        //show
        let time = 1.0;
        gsap.fromTo(
          object3D.material.uniforms.uSize,
          { value: 0.5 },
          { value: 1.5, duration: time }
        );

        gsap.to(object3D.material.uniforms.uRandom, {
          duration: time,
          value: 2.0,
        });

        gsap.fromTo(
          object3D.material.uniforms.uDepth,
          { value: 40.0 },
          { value: 4.0, duration: time * 1.5 }
        );

        scene.add(object3D);
        resize();
      });

      function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();
        if (!object3D) return;
        object3D.material.uniforms.uTime.value += delta;

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener("resize", resize);
      function resize() {
        if (!renderer || !renderNode.current) return;
        camera.aspect =
          renderNode.current.offsetWidth / renderNode.current.offsetHeight;

        camera.updateProjectionMatrix();
        let fovHeight =
          2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z;

        renderer.setSize(
          renderNode.current.offsetWidth,
          renderNode.current.offsetHeight
        );

        if (!object3D) return;
        const scale = fovHeight / height;
        object3D.scale.set(scale, scale, 1);
      }

      return () => {
        gsap.globalTimeline.clear();
        if (!renderNode.current) return;
        renderNode.current.removeChild(renderer.domElement);
      };
    }
  }, [renderNode]);
};
export default Particles;
