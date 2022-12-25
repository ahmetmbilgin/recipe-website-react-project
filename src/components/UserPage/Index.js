import React from 'react'
import { RecipeContext, useContext } from '../../Context'

const User = () => {
    const [login] = useContext(RecipeContext)
  return (
    <div>
        <h1>Welcome here {login.name} </h1>
    </div>
  )
}

export default User