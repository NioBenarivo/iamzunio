import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import DarkModeProvider from '@context/darkmodeProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps, router }) {
  const [isFirstMount, setIsFirstMount] = useState(true)

  useEffect(() => {
    const handleRouteChange = () => {
      isFirstMount && setIsFirstMount(false);
    };

    if (isFirstMount) {
      window.history.scrollRestoration = 'manual'
    }

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <DarkModeProvider>
      <AnimatePresence exitBeforeEnter>
          <Component isFirstMount={isFirstMount} key={router.route} {...pageProps} />
      </AnimatePresence>
    </DarkModeProvider>
  )
}

export default MyApp
