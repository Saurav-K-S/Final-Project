import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AnimatedCursor from "react-animated-cursor"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <AnimatedCursor 
    innerStyle={{
      border: '1px solid black',
    }}
    // outerStyle={{
    //   border: '1px solid black',
    //   mixBlendMode: 'exclusion'
    // }}
    innerSize={20}
    // outerSize={20}
    color='255, 220, 95, 0.9'
    // outerAlpha={0.2}
    innerScale={3}
    // outerScale={8}
    clickables={[
      '.clickable'
    ]}
    showSystemCursor={false}
    />
  </React.StrictMode>,
)
