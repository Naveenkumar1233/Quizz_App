import React from 'react'
import { useContext } from 'react'
import { AuthContexts } from '../store/AuthContext'

const useAuth = () => {
  return useContext(AuthContexts)
}

export default useAuth