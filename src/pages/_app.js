import React, {useState, useCallback, useMemo} from 'react'
import '../styles/globals.css'

export const LangContext = React.createContext({
  lang : 'en',
  switchLanguage : () => {  }
})

function MyApp({ Component, pageProps }) {
  const [lang, setLang] = useState('en')

  const switchLanguage = useCallback(function() {
    setLang(l => l === 'en' ? 'fr' : 'en')
  }, [])

  const value = useMemo(function() {
    return {
      lang,
      switchLanguage
    }
  },[lang, switchLanguage])

  
  return <LangContext.Provider value={value}>
    <Component {...pageProps} />
  </LangContext.Provider>
}

export default MyApp
