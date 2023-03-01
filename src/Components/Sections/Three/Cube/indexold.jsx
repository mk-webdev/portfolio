import React, { useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import { Text } from "troika-three-text";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Cube({ renderNodeCube, data, setIndex }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // if (renderNode) {
    const scene = new THREE.Scene();
    const cubeGroup = new THREE.Group();
    const textGroup = new THREE.Group();
    const group = new THREE.Group();
    const green = new THREE.Color("hsla(151, 100%, 50%, 1)");
    // const gui = new GUI();

    // const camera = new THREE.PerspectiveCamera(
    //   75,
    //   renderNodeCube.current.offsetWidth / renderNodeCube.current.offsetHeight,
    //   0.1,
    //   1000
    // );
    // camera.position.z = 5;

    // const renderer = new THREE.WebGLRenderer({
    //   antialias: true,
    // });
    // renderer.setSize(
    //   renderNodeCube.current.offsetWidth,
    //   renderNodeCube.current.offsetHeight
    // );
    // renderer.setPixelRatio(devicePixelRatio);
    // renderNodeCube.current.appendChild(renderer.domElement);

    //Cube
    const geometry = new THREE.OctahedronGeometry(2.5, 0);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("hsla(0, 0%, 7%, 1)"),
    });
    const cube = new THREE.Mesh(geometry, material);
    const cubeGeometry = cube.geometry;
    cubeGeometry.computeBoundingBox();
    let cubeCenter = new THREE.Vector3();
    cubeGeometry.boundingBox.getCenter(cubeCenter);

    const cubePos = cube.geometry.attributes.position;
    let cubeFaceCenterCoordinates = [];
    for (let i = 0; i < cubePos.count; i += 3) {
      let a = new THREE.Vector3().fromBufferAttribute(cubePos, i);
      let b = new THREE.Vector3().fromBufferAttribute(cubePos, i + 1);
      let c = new THREE.Vector3().fromBufferAttribute(cubePos, i + 2);
      let faceCenter = new THREE.Vector3()
        .addVectors(a, b)
        .add(c)
        .multiplyScalar(1 / 3);
      cubeFaceCenterCoordinates.push(faceCenter);
    }

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: green,
      })
    );
    cubeGroup.add(line);

    cubeGroup.add(cube);
    group.add(cubeGroup);

    if (data) {
      data.forEach((item, index) => {
        let posX = cubeFaceCenterCoordinates[index].x;
        let posY = cubeFaceCenterCoordinates[index].y;
        let posZ = cubeFaceCenterCoordinates[index].z;
        const text = new Text();

        text.text = item.title;
        text.fontSize = 0.2;
        text.font = "./courier_new.woff";
        text.anchorX = "center";
        text.maxWidth = "100";
        text.position.x = posX;
        text.position.y = posY;
        text.position.z = posZ;
        text.color = green;
        text.lookAt(cubeCenter);
        text.scale.x *= -1;
        textGroup.add(text);
      });
    }
    group.add(textGroup);

    group.rotation.x = 0;
    group.rotation.y = -0.7;
    group.rotation.z = -1.4;

    scene.add(group);

    scene.background = new THREE.Color("hsla(0, 0%, 7%, 1)");

    // const cubeFolder = gui.addFolder("Whole");
    // cubeFolder.add(group.rotation, "x", -Math.PI * 2, Math.PI * 2, 0.1);
    // cubeFolder.add(group.rotation, "y", -Math.PI * 2, Math.PI * 2, 0.1);
    // cubeFolder.add(group.rotation, "z", -Math.PI * 2, Math.PI * 2, 0.1);
    // cubeFolder.open();

    ScrollTrigger.defaults({
      //   markers: true,
      toggleActions: "play none reverse none",
    });

    gsap.to(group.rotation, {
      x: 0.5,
      z: 0,
      scrollTrigger: {
        trigger: ".topics-container",
        start: "5%",
        end: "bottom center",
        pin: true,
      },
      onComplete: () => {
        setIndex(1);
      },
    });
    gsap.to(group.rotation, {
      x: -0.5,
      scrollTrigger: {
        trigger: ".topics-container",
        start: "6%",
        end: "bottom center",
        pin: true,
      },
      onComplete: () => {
        setIndex(2);
      },
    });
    gsap.to(group.rotation, {
      y: -2.3,
      scrollTrigger: {
        trigger: ".topics-container",
        start: "7%",
        end: "bottom center",
        pin: true,
      },
      onComplete: () => {
        setIndex(3);
      },
    });
    gsap.to(group.rotation, {
      x: 0.7,
      scrollTrigger: {
        trigger: ".topics-container",
        start: "8%",
        end: "bottom center",
        pin: true,
      },
      onComplete: () => {
        setIndex(4);
      },
    });
    gsap.to(group.rotation, {
      y: -4,
      scrollTrigger: {
        trigger: ".topics-container",
        start: "9%",
        end: "bottom center",
        pin: true,
      },
      onComplete: () => {
        setIndex(5);
      },
    });
    gsap.to(group.rotation, {
      x: -0.7,
      scrollTrigger: {
        trigger: ".topics-container",
        start: "10%",
        end: "bottom center",
        pin: true,
      },
      onComplete: () => {
        setIndex(6);
      },
    });
    gsap.to(group.rotation, {
      y: 1,
      scrollTrigger: {
        trigger: ".topics-container",
        start: "11%",
        end: "bottom center",
        pin: true,
      },
      onComplete: () => {
        setIndex(7);
      },
    });
    gsap.to(group.rotation, {
      x: 0.4,
      scrollTrigger: {
        trigger: ".topics-container",
        start: "12%",
        end: "bottom center",
        pin: true,
      },
      onComplete: () => {
        setIndex(8);
      },
    });

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    function onWindowResize() {
      if (!renderNodeCube.current) return;
      camera.aspect =
        renderNodeCube.current.offsetWidth /
        renderNodeCube.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        renderNodeCube.current.offsetWidth,
        renderNodeCube.current.offsetHeight
      );
    }

    window.addEventListener("resize", onWindowResize, false);

    animate();

    return () => {
      renderNodeCube.current.removeChild(renderer.domElement);
      ScrollTrigger.getAll().forEach((ST) => ST.kill());
      gsap.globalTimeline.clear();
    };
    // }
  }, [renderNodeCube]);
}
