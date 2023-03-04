import React, { useRef } from "react";
import { Texture, TextureLoader, Vector3 } from "three";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import vertexShader from "./vertex.glsl?raw";
import fragmentShader from "./fragment.glsl?raw";

const ImageWaveMaterial = shaderMaterial(
  { uTime: 0, uTexture: new Texture() },
  vertexShader,
  fragmentShader
);
extend({ ImageWaveMaterial });

const ImageWave = ({ img }) => {
  const imageWaveMaterialRef = useRef();
  const vec = new Vector3();

  useFrame(({ clock }) => {
    imageWaveMaterialRef.current.uTime = clock.getElapsedTime();
  });
  const [featuredImage] = useLoader(TextureLoader, [img]);

  return (
    <mesh>
      <planeGeometry args={[1.2, 0.8, 16, 16]} />
      <imageWaveMaterial ref={imageWaveMaterialRef} uTexture={featuredImage} />
    </mesh>
  );
};

const ImageAnimation = ({ image }) => {
  return (
    <Canvas camera={{ fov: 8 }} style={{ pointerEvents: "none" }}>
      <ImageWave img={image} />
    </Canvas>
  );
};

export default ImageAnimation;
