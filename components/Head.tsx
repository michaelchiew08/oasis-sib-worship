// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Avatar, Stack, Nav, Toggle, Navbar, Drawer, IconButton } from 'rsuite'
import { NavItemProps } from 'rsuite'
import Link from 'next/link'
import NextHead from 'next/head'
import hoverStyles from '../styles/hover.module.css'
import { PageName } from '../lib/types'
import { BsMoon, BsSun } from 'react-icons/bs'
import { Menu } from '@rsuite/icons'

interface HeadProps {
  title?: PageName,
  description?: string,
  theme?: 'light' | 'dark',
  toggleTheme?: () => void
}

// eslint-disable-next-line react/display-name
const NavLink = React.forwardRef((props: NavItemProps, ref: React.LegacyRef<HTMLAnchorElement>) => {
  const { href, ...rest } = props;
  return (
    <Link href={href as string} >
      <a ref={ref} {...rest as React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>} />
    </Link>
  );
});

const Head = (props: HeadProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const NavItems = () => (
    <>
      <Nav.Item as={NavLink} href="/" eventKey={PageName.Home} >Home</Nav.Item>
      <Nav.Item as={NavLink} href="/all_songs" eventKey={PageName.AllSongs}  >All Songs</Nav.Item>
      <Nav.Item as={NavLink} href="/stats" eventKey={PageName.Stats} >Stats</Nav.Item>
      <Nav.Item as={NavLink} href="/about" eventKey={PageName.About} >About</Nav.Item>
    </>
  );

  return (
    <>
      <NextHead>
        <title>Home Worship - {props.title}</title>
        <meta name={props.title} content={props.description} />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      <Navbar appearance="subtle" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Navbar.Brand style={{ display: 'flex' }}>
          <Stack spacing={10} alignItems='center' >
            <Avatar
              className={hoverStyles.hover_glow}
              style={{
                cursor: 'pointer',
                backgroundColor: "#fff"
              }}
              onClick={() => {
                window.location.href = '/'
              }}
            >
              <Image alt="home_icon" src="/images/home_logo_128px.png" layout='fill' unoptimized />
            </Avatar>
          </Stack>
        </Navbar.Brand>

        {/* Desktop Nav */}
        {!isMobile && (
          <Nav activeKey={props.title} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <NavItems />
          </Nav>
        )}

        <Nav pullRight>
          <Stack style={{ padding: '0 10px', height: '100%' }} alignItems='center'>
            <Toggle
              checked={props.theme === 'dark'}
              onChange={props.toggleTheme}
              checkedChildren={<BsMoon style={{ marginTop: '5px' }} />}
              unCheckedChildren={<BsSun style={{ marginTop: '5px' }} />}
            />

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <IconButton
                icon={<Menu />}
                appearance="subtle"
                onClick={() => setOpenMobile(true)}
              />
            )}
          </Stack>
        </Nav>
      </Navbar>

      {/* Mobile Drawer */}
      <Drawer open={openMobile} onClose={() => setOpenMobile(false)} placement='right' size='xs'>
        <Drawer.Header>
          <Drawer.Title>Menu</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{ padding: 0 }}>
          <Nav activeKey={props.title} vertical onSelect={() => setOpenMobile(false)}>
            <NavItems />
          </Nav>
        </Drawer.Body>
      </Drawer>
    </>
  )
}

export default Head;