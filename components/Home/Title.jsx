import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Title(props) {
  return (
   <h1>{props.title || <Skeleton />}</h1>


  )
}
