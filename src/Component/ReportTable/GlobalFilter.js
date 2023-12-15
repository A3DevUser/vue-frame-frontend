import React from 'react'
import { useState } from "react"
import { useAsyncDebounce } from 'react-table'

const GlobalFilter = ({filter, setfilter}) => {

  const [value, setvalue] = useState(filter)
  const Onchange = useAsyncDebounce(value => {
    setfilter(value || undefined)
  }, 1000)
  
  return (
    <span style={{fontSize:'20px',fontWeight:'bolder' ,display:'flex', flexDirection:'row', gap:'10px'}}>
      <span>
        Search: {' '} 
        </span>
        <input placeholder='search...' className='form-control form-control-sm' value={value || ''} onChange={(e) => {
          setvalue(e.target.value)
          Onchange(e.target.value)
          }}/>
    </span>
  )
} 

export default GlobalFilter