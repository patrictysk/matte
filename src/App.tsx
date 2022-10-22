import React, { useState } from 'react';
import './App.scss';
import Back from './components/Back/Back'
import Learn from './components/Learn/Learn'
import Train from './components/Train/Train'
import Compete from './components/Compete'

// Importing the Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    const [mode, setMode] = useState<string>('start')

    console.log('render app');

    return (
        <div className="app">
            <div className="app-main">
                {mode === 'start' &&
                    <>
                        <h1 className='heading1'>Svea och Alfred lär sig matte!</h1>
                        <div>
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
                        </div>
                    </>
                }

                {mode === 'learn' &&
                    <>
                        <Back
                            handleBack={setMode}
                            value={'start'}
                        />
                        <Learn />
                    </>
                }

                {mode === 'train' &&
                    <>
                        <Back
                            handleBack={setMode}
                            value={'start'}
                        />
                        <Train />
                    </>
                }

                {mode === 'compete' &&
                    <>
                        <Back
                            handleBack={setMode}
                            value={'start'}
                        />
                        <Compete />
                    </>
                }
            </div>
        </div>
    )
}

export default App
