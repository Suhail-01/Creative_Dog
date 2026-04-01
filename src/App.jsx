// import './App.css'
// import Dog from './components/Dog'
// import {Canvas} from '@react-three/fiber'

// function App() {
//     return (
//     <>
//     <main>
//       <Canvas style={{height:"100vh", width:"100vw", position:"fixed", top:0, left:0, zIndex: 1, backgroundImage:"url(/background-xxs.jpg)", backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
//         <Dog />
//       </Canvas>
//     </main>
//     <section></section>
//     <section></section>
//     <section></section>
//     </>
//   )
// }

// export default App

import './App.css'
import Dog from './components/Dog'
import {Canvas} from '@react-three/fiber'

function App() {
    return (
    <>
    <div style={{position:"fixed", top:0, left:0, height:"100vh", width:"100vw", backgroundImage:"url(/background-xxs.png)", backgroundRepeat:"no-repeat", backgroundSize:"cover", zIndex:0}}/>
    <main>
      <Canvas style={{height:"100vh", width:"100vw", position:"fixed", top:0, left:0, zIndex: 1}}>
        <Dog />
      </Canvas>
    </main>
    <section id='section-1'></section>
    <section id='section-2'></section>
    <section id='section-3'></section>
    </>
  )
}

export default App