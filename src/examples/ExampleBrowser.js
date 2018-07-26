import React from 'react';
import { NavLink } from 'react-router-dom';
import ExampleViewer from './ExampleViewer';

import SimpleExample from './Simple/index';
import ManualRenderingExample from './ManualRendering/index';
import ClothExample from './AnimationCloth/index';
import GeometriesExample from './Geometries/index';
import CameraExample from './WebGLCameraExample/index';
import GeometryShapesExample from './GeometryShapes/index';
import DraggableCubes from './DraggableCubes/index';
import Physics from './Physics/index';
import PhysicsMousePick from './Physics/mousePick';
import BenchmarkRotatingCubes from './Benchmark/RotatingCubes';
import RotatingCubesDirectUpdates from './Benchmark/RotatingCubesDirectUpdates';

const examples = [{
    name: 'Geometries',
    component: GeometriesExample,
    url: 'Geometries/index',
    slug: 'webgl_geometries',
  },

];

var latitude=0;
var longitude=0;
var image='';


const changedirectionparameter=(a,b,c)=>
{
  latitude=a;
  longitude=b;
 image=c;
}

const ExampleBrowser = ({ match }) => {
  const { params } = match;
  const activeExample = params.slug && examples.find(example => example.slug === params.slug);
  return (
    <div>
      <div id="panel" className="collapsed">
        <h1><a href="https://github.com/toxicFork/react-three-renderer/">react-three-renderer</a> / examples</h1>
        <div id="content">
          <div>
            <h2>webgl</h2>
            {examples.map((example, index) => {
              if (example.separator) {
                return (<h2 key={index}>{example.name}</h2>);
              }

              if (example.advanced) {
                return (<div key={index}>
                  <a href={example.page} target="blank">{example.name}</a> (new tab)
                </div>);
              }

              return (<NavLink
                to={`/${example.slug}`}
                key={index}
                className="link"
                activeClassName="selected"
              >
                {example.name}
              </NavLink>);
            })}
            <button onClick={() => changedirectionparameter(48.856700, 2.350800,'one')} >Paris</button>
              <button onClick={changedirectionparameter(51.507222, -0.1275,'two')}>London</button>
              <button onClick={changedirectionparameter(52.507222, 13.145833,'three')}>Berlin</button>
          </div>
        </div>
      </div>
      <ExampleViewer example={activeExample} />
    </div>
  );
};

ExampleBrowser.propTypes = {
  match: React.PropTypes.object.isRequired,
};

export default ExampleBrowser;
