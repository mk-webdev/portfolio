import React from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useControls } from "leva";
import { Color, MeshBasicMaterial, Vector3 } from "three";

const vec = new Vector3();

function Rig() {
  return useFrame(({ camera, mouse }) => {
    vec.set(mouse.x * 2, mouse.y * 2, camera.position.z);
    camera.position.lerp(vec, 0.025);
    camera.lookAt(0, 0, 0);
  });
}

const MK = () => {
  // const objPosition = useControls("objPosition", {
  //   x: { value: -11, min: -20, max: 20, step: 0.5 },
  //   y: { value: -1.5, min: -20, max: 20, step: 0.5 },
  //   z: { value: 0, min: -20, max: 20, step: 0.5 },
  // });

  function MkObject() {
    const obj = useLoader(OBJLoader, "./mk.obj");

    const basic = new MeshBasicMaterial();
    basic.color = new Color("hsla(151, 100%, 50%, 1)");

    obj.children[0].material = basic;

    return (
      <primitive
        object={obj}
        scale="0.15"
        // position={[objPosition.x, objPosition.y, objPosition.z]}
        position={[-10, -1.5, 0]}
        rotationX="20"
      />
    );
  }

  return (
    <div className="h-96 md:h-[75vh]">
      <Canvas
        camera={{
          position: [0, 5, 15],
        }}>
        <Rig />
        <MkObject />
      </Canvas>
    </div>
  );
};

export default MK;
