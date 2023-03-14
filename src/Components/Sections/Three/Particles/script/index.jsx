import React, { useRef, useContext } from "react";
import { Context } from "../../../../Helpers/Context";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  LinearFilter,
  RGBAFormat,
  Vector2,
  AdditiveBlending,
  BufferAttribute,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
  RawShaderMaterial,
} from "three";
import gsap from "gsap";
import vertexShader from "../shader/vertex.glsl?raw";
import fragmentShader from "../shader/fragment.glsl?raw";

const ParticleEffect = () => {
  const position = useContext(Context)[2];
  let src, posClass;

  switch (position) {
    case "Home":
      src = "./marco.webp";
      posClass = "home";
      break;
    case "WebDev":
      src = "./earth.webp";
      posClass = "webdev";
      break;
    case "Works":
      src = "./laptop.webp";
      posClass = "works";
      break;
    case "Error":
      src = "./error.webp";
      posClass = "Error";
      break;
  }

  let width, height;

  const Particles = () => {
    const particleMesh = useRef();

    useFrame(({ clock }) => {
      const delta = (clock.getDelta() + 0.01) * 2;
      particleMesh.current.material.uniforms.uTime.value += delta;
    });

    const texture = useLoader(TextureLoader, src);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.format = RGBAFormat;

    width = texture.image.width;
    height = texture.image.height;

    let numPoints = width * height;

    let numVisible = numPoints;
    let threshold = 0;
    let originalColors;

    let discard = true;

    if (discard) {
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
      uTextureSize: { value: new Vector2(width, height) },
      uTexture: { value: texture },
      uTouch: { value: null },
    };
    const shaderMaterial = new RawShaderMaterial({
      uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      depthTest: false,
      transparent: true,
      blending: AdditiveBlending,
    });

    const ibg = new InstancedBufferGeometry();

    const positions = new BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.5, 0.0);
    positions.setXYZ(1, 0.5, 0.5, 0.0);
    positions.setXYZ(2, -0.5, -0.5, 0.0);
    positions.setXYZ(3, 0.5, -0.5, 0.0);
    ibg.attributes.position = positions;

    const uvs = new BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXYZ(0, 0.0, 0.0);
    uvs.setXYZ(1, 1.0, 0.0);
    uvs.setXYZ(2, 0.0, 1.0);
    uvs.setXYZ(3, 1.0, 1.0);
    ibg.attributes.uv = uvs;

    ibg.setIndex(new BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

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
    ibg.attributes.pindex = new InstancedBufferAttribute(indices, 1, false);
    ibg.attributes.offset = new InstancedBufferAttribute(offsets, 3, false);
    ibg.attributes.angle = new InstancedBufferAttribute(angles, 1, false);

    let time = 1.0;
    gsap.fromTo(
      shaderMaterial.uniforms.uSize,
      { value: 0.5 },
      { value: 1.5, duration: time }
    );

    gsap.to(shaderMaterial.uniforms.uRandom, {
      duration: time,
      value: 2.0,
    });

    gsap.fromTo(
      shaderMaterial.uniforms.uDepth,
      { value: 40.0 },
      { value: 4.0, duration: time * 1.5 }
    );

    return (
      <mesh
        dispose={null}
        ref={particleMesh}
        geometry={ibg}
        material={shaderMaterial}></mesh>
    );
  };

  return (
    <div id="particles" className={position.toLowerCase()}>
      <Canvas
        dispose={null}
        camera={{ fov: 50, near: 1, far: 10000, position: [0, 0, 300] }}
        style={{ pointerEvents: "none" }}>
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleEffect;
