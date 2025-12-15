import 'rsuite/dist/rsuite.min.css'
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import '../styles/global.css';
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Container, CustomProvider } from 'rsuite'
import NextNProgress from 'nextjs-progressbar'
import { LazyMotion, AnimatePresence, domAnimation, m } from "framer-motion"
import { fadeOnly } from '../lib/animations'
import { resolvePageRoute } from '../lib/utils'
import Head from '../components/Head'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react';

const animation = fadeOnly;

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const title = resolvePageRoute(router.pathname);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
  };

  // const [pageLoading, setPageLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   const handleStart = () => { setPageLoading(true); };
  //   const handleComplete = () => { setPageLoading(false); };

  //   router.events.on('routeChangeStart', handleStart);
  //   router.events.on('routeChangeComplete', handleComplete);
  //   router.events.on('routeChangeError', handleComplete);
  // }, [router]);


  return (
    <CustomProvider theme={theme}>
      <NextNProgress />
      <Container className='page' >
        <Head title={title} description={title} theme={theme} toggleTheme={toggleTheme} />
        <LazyMotion features={domAnimation}>
          <AnimatePresence exitBeforeEnter>
            <m.div
              key={router.route.concat(animation.name)}
              style={{
                display: "flex",
                position: "relative",
                alignItems: 'center',
                justifyContent: 'center',
                height: "100%",
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animation.variants}
              transition={animation.transition}
            >
              <Component {...pageProps} />
            </m.div>
          </AnimatePresence>
        </LazyMotion>
        <Footer />
      </Container>
    </CustomProvider>
  )
}
export default MyApp


// pageLoading ? (<Loader size='lg' />) : 