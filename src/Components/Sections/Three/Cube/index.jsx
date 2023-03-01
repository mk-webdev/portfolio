import React, { useRef } from "react";
import { Color, OctahedronGeometry, Vector3 } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function Cube({ data, setIndex }) {
  const cubeMesh = useRef();
  const green = new Color("hsla(151, 100%, 50%, 1)");

  // if (cubeMesh.current) {
  //   console.log("🚀 ~ file: index.jsx:9 ~ Cube ~ cubeMesh:", cubeMesh);
  //   cubeMesh.current.geometry.computeBoundingBox();
  //   let cubeCenter = new Vector3();

  //   cubeMesh.current.geometry.boundingBox.getCenter(cubeCenter);
  //   console.log("🚀 ~ file: index.jsx:15 ~ Cube ~ cubeCenter:", cubeCenter);
  // }

  const cubeGeometry = new OctahedronGeometry(2, 0);
  const cubePos = cubeGeometry.attributes.position;
  let cubeFaceCenterCoordinates = [];

  for (let i = 0; i < cubePos.count; i += 3) {
    let a = new Vector3().fromBufferAttribute(cubePos, i);
    let b = new Vector3().fromBufferAttribute(cubePos, i + 1);
    let c = new Vector3().fromBufferAttribute(cubePos, i + 2);
    let faceCenter = new Vector3()
      .addVectors(a, b)
      .add(c)
      .multiplyScalar(1 / 3);
    cubeFaceCenterCoordinates.push(faceCenter);
  }

  let cubeText;
  if (data) {
    cubeText = data.map((item, index) => {
      let posX = cubeFaceCenterCoordinates[index].x;
      let posY = cubeFaceCenterCoordinates[index].y;
      let posZ = cubeFaceCenterCoordinates[index].z;

      <Html transform sprite style={{ transform: "scale(-1, 1)" }}>
        <p>{index}</p>
        <h3>{item.title}</h3>
      </Html>;
    });
  }

  return (
    <div className="h-screen">
      <Canvas>
        <ambientLight intensity={1} />
        <mesh ref={cubeMesh} geometry={cubeGeometry}>
          <meshBasicMaterial color={green} wireframe={true} />
          {cubeText}
        </mesh>
      </Canvas>
    </div>
  );
}
