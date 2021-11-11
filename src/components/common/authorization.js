import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FullScreenLoader } from '..'

const authenticatedRoute = (Component = null, option = {}) => {

  const authenticate = (props) => {
    const router = useRouter();
    const [state, setState] = useState({ loading: true })

    const { isLoggedIn } = useSelector(state => ({
      isLoggedIn: state?.token
    }))


    useEffect(() => {
      if (isLoggedIn) {
        if (router.asPath.includes("/login")) {
          Router.push('/dashboard')
        } else {
          setState((prevState) => ({
            ...prevState,
            loading: false
          }))
        }
      }
      else {
        Router.push(option.pathAfterFailure || '/login')
        setState((prevState) => ({
          ...prevState,
          loading: false
        }))
      }
    }, [])

    const { loading } = state

    if (loading) {
      return <FullScreenLoader />
    }

    return <Component />

  }
  return authenticate
}

export default authenticatedRoute