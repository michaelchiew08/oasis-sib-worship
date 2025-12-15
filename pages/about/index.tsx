import { NextPage } from 'next'
import { Button, Stack, Divider } from 'rsuite';
import { BsGithub, BsYoutube, BsFacebook } from 'react-icons/bs'
import hoverStyles from '../../styles/hover.module.css'

const AboutPage: NextPage = () => {

  return (
    <>
      <main>
        <Stack spacing='1em' direction='column' alignItems='center' justifyContent='center' >
          <h2 style={{textAlign:'center'}} >What&apos;s this for? 🤔</h2>
          <p style={{fontSize: '1.5em'}} >
            This website is intended for:
          </p>
          <ul style={{fontSize: '1.5em'}} >
              <li>🎵&nbsp;<strong>Worship team</strong> to add songs to a centralized database which serves as a reference.</li>
              <li>📝&nbsp;<strong>Worship leaders</strong> to specify the order of songs and also additional info for each worship session which can be viewed by everyone.</li>
              <li>💻&nbsp;<strong>Media streamers</strong> to export these songs into coherent Powerpoint lyrics <strong>automatically</strong> with minimal effort.</li>
          </ul>
          <Divider style={{height: '0.2em', width: '90vw'}} />
          <h2 style={{textAlign:'center'}} >I can&apos;t delete or edit songs. ✏️</h2>
          <p style={{fontSize: '1.5em'}}>
            For security purposes, a password 🔑 is required for edit/delete to prevent unwanted behaviour.
          </p>
          <Divider style={{height: '0.2em', width: '90vw'}} />
        </Stack>
      </main>
    </>
  )
}

export default AboutPage
