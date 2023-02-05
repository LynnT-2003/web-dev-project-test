import React from 'react'

export default function GreetingComponent(props) {
    const {major} = props;
  return (
      <div>
          Hello Mr. Lynn Thit !<br></br> Welcome to the 2023 Curriculum for {major}
      </div>
  )
}
