import Head from 'next/head';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Router from 'next/router';
import Loader from 'components/Loader';
import 'styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      isFirstMount && setIsFirstMount(false);
    };

    if (isFirstMount) {
      window.history.scrollRestoration = 'manual';
    }

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  const pageAnimations = {
    initial: {
      opacity: 0,
      y: -20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <>
      <Head>
        <title>Iamzun.io</title>
        <meta
          name="description"
          content="Personal blog, research and books keypoints"
        />
      </Head>
      <AnimatePresence exitBeforeEnter>
        {loading ? (
          <Loader />
        ) : (
          <motion.div
            key={router.route}
            variants={pageAnimations}
            initial="initial"
            animate="animate"
          >
            <Component isFirstMount={isFirstMount} key={router.route} {...pageProps} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MyApp;
