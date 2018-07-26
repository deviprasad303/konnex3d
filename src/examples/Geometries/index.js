import React from 'react';

import * as THREE from 'three';
import Stats from 'stats.js';

import React3 from 'react-three-renderer';

import ExampleBase from '../ExampleBase';


class Geometries extends ExampleBase {
  constructor(props, context) {
    super(props, context);

    this.directionalLightPosition = new THREE.Vector3(0, 1, 0);

    this.objectPositions = [
      new THREE.Vector3(-400, 0, 200),
      new THREE.Vector3(-200, 0, 200),
      new THREE.Vector3(0, 0, 200),
      new THREE.Vector3(200, 0, 200),
      new THREE.Vector3(-400, 0, 0),
      new THREE.Vector3(-200, 0, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(200, 0, 0),
      new THREE.Vector3(400, 0, 0),

      new THREE.Vector3(-400, 0, -200),
      new THREE.Vector3(-200, 0, -200),
      new THREE.Vector3(0, 0, -200),
      new THREE.Vector3(200, 0, -200),
      new THREE.Vector3(400, 0, -200),
    ];



     this.Marker = () =>{
          THREE.Object3D.call(this);

          var radius = 0.005;
          var sphereRadius = 0.02;
          var height = 0.05;

          var material = new THREE.MeshPhongMaterial({ color: 'black' });
          var material2 = new THREE.MeshPhongMaterial({ color: 'red' });

          var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material2);
          cone.position.y = height * 0.5;
          cone.rotation.x = Math.PI;

          var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
          sphere.position.y = height * 0.95 + sphereRadius;

          this.add(cone, sphere);
      }

    this.lathePoints = [];

    for (let i = 0; i < 50; i++) {
      this.lathePoints.push(new THREE
        .Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
    }

    this.arrowDir = new THREE.Vector3(0, 1, 0);
    this.arrowOrigin = new THREE.Vector3(0, 0, 0);

    this.scenePosition = new THREE.Vector3(0, 0, 0);

    this.state = {
      ...this.state,
      timer: Date.now() * 0.0001,
        latitude:this.props.latitude,
        longitude:this.props.longitude,
        image:this.props.image
    };
  }

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  componentDidMount() {
    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';

    this.refs.container.appendChild(this.stats.domElement);
  }

  componentWillUnmount() {
    delete this.stats;
  }

  _onAnimateInternal() {
    const timer = Date.now() * 0.0001;

    this.setState({
      timer,
    });

    this.stats.update();
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      timer,
    } = this.state;

    const objectRotation = new THREE.Euler(
      timer * 5,
      timer * 2.5,
      0
    );

    return (

        <div ref="container">
        <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
      >
        <resources>
          <texture
            resourceId="texture"
            url="textures/earth_latlon.jpg"
            wrapS={THREE.RepeatWrapping}
            wrapT={THREE.RepeatWrapping}
            anisotropy={16}
          />
          <meshLambertMaterial
            resourceId="material"
            side={THREE.DoubleSide}
          >
            <textureResource
              resourceId="texture"
            />
          </meshLambertMaterial>
        </resources>
        <scene>
          <perspectiveCamera
            fov={45}
            aspect={width / height}

            lookAt={this.scenePosition}
            name="mainCamera"
            position={new THREE.Vector3(
             800,
              200,
               -200
            )}
          />
          <ambientLight
            color={0x404040}
          />
          <directionalLight
            color={0xffffff}
            position={this.directionalLightPosition}
            lookAt={this.scenePosition}
          />
          <mesh
            position={this.objectPositions[0]}
            rotation={objectRotation}
          >
            <sphereGeometry
              radius={300}
              widthSegments={200}
              heightSegments={100}
            />
            <materialResource
              resourceId="material"
            />
          </mesh>
        </scene>
      </React3>
    </div>);
  }
}

export default Geometries;
