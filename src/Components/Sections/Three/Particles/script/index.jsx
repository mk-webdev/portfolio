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
    case "References":
      src = "./laptop.webp";
      break;
    case "Error":
      src = "./404.webp";
      break;
  }

  let width, height;

  const Particles = () => {
    const particleMesh = useRef();

    useFrame(({ clock }) => {
      const delta = (clock.getDelta() + 0.01) * 2;
      //   if (!particleMesh) return;
      particleMesh.current.material.uniforms.uTime.value += delta;
    });

    const texture = useLoader(TextureLoader, src);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.format = RGBAFormat;

    width = texture.image.width;
    height = texture.image.height;

    //init points
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
    // positions
    const positions = new BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.5, 0.0);
    positions.setXYZ(1, 0.5, 0.5, 0.0);
    positions.setXYZ(2, -0.5, -0.5, 0.0);
    positions.setXYZ(3, 0.5, -0.5, 0.0);
    ibg.attributes.position = positions;
    // uvs
    const uvs = new BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXYZ(0, 0.0, 0.0);
    uvs.setXYZ(1, 1.0, 0.0);
    uvs.setXYZ(2, 0.0, 1.0);
    uvs.setXYZ(3, 1.0, 1.0);
    ibg.attributes.uv = uvs;
    // index
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

    //show
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
    <div
      id="particles"
      className="h-72 mt-10 order-1 sm:h-96 sm:mb-16 md:w-5/6 md:ml-auto lg:order-2 lg:absolute lg:-right-[15%] lg:h-[80vh] lg:w-4/6 2xl:h-[90vh] 2xl:w-5/6">
      <Canvas
        dispose={null}
        camera={{ fov: 50, near: 1, far: 10000, position: [0, 0, 300] }}>
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleEffect;
