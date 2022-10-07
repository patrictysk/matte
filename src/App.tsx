import React, { useState } from 'react';
import './App.scss';
import Back from './components/Back'
import Learn from './components/Learn'
import Train from './components/Train'
import Compete from './components/Compete'

const App = () => {

  const [mode, setMode] = useState<'start' | 'learn' | 'train' | 'compete'>('start')

  console.log('render app');

  return (
    <div className="app">
      <div className="app-main">
        <h1>Alfred lär sig gånger!</h1>
        {mode === 'start' &&
          <>
            <div
              className="app-select"
              onClick={() => setMode('learn')}
            >
              Kolla
            </div>

            <div
              className="app-select"
              onClick={() => setMode('train')}
            >
              Träna
            </div>

            <div
              className="app-select"
              onClick={() => setMode('compete')}
            >
              Tävla
            </div>
          </>
        }

        {mode === 'learn' &&
          <>
            <Back
              handleBack={setMode}
            />
            <Learn />
          </>
        }

        {mode === 'train' &&
          <>
            <Back
              handleBack={setMode}
            />
            <Train />
          </>
        }

        {mode === 'compete' &&
          <>
            <Back
              handleBack={setMode}
            />
            <Compete />
          </>
        }
      </div>
    </div>
  )
}

export default App
