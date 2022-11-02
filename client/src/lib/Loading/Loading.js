import React from 'react'
import './Loading.css'

const Loading = (props) => {
  return (
    <div className={props.isLoading?"loading":"hidden"}>
      <span className={props.isLoading?"loader":""}></span>
    </div>
  )
}

export default Loading