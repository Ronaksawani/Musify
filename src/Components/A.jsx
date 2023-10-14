import React from 'react'
import { useNavigate } from 'react-router-dom'

const A = () => {
    const history=useNavigate();

    const navig =()=>{
        history('/home')
    }
  return (
    <div>
      <button onClick={navig}>home</button>
    </div>
  )
}

export default A
