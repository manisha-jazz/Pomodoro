import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TabSwitch } from './components/TabSwitch'


function App() {
  const [activeTab, setActiveTab] = useState('Work');
  

  return (

   <div className=' bg-pink-400 h-screen overflow-hidden ' >
     <div className='flex items-center justify-center my-30'>
      <div className="card w-120 bg-base-300 card-lg shadow-md">
      <div className="card-body flex items-center">
        <h1 className="card-title text-3xl font-bold">Pomodoro App</h1>

        <TabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
    
      </div>
    </div>
   </div>
   </div>
  )
}

export default App
