import { useEffect, useState } from 'react'
import '../styles/globals.css'
import '../styles/index.scss'
import '../styles/blog.scss'


function MyApp ({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])
  if (!showChild) {
    return null
  }
  return <Component {...pageProps} />
}

export default MyApp
