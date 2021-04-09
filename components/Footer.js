import { SiZeit, SiGithub, SiLinkedin, SiNextDotJs, SiFramer } from "react-icons/si"

export default function Footer() {
  return (
    <div className="flex flex-column col-12">
      <div className="flex justify-center items-center p2 footer-top">
        <p className="my0 mr1">Powered by</p>
        <SiZeit size={24} title="Vercel" />
        <SiNextDotJs size={24} title="NextJS" />
        <SiFramer size={24} title="Framer Motion" />
      </div>
      <div className="flex flex-wrap items-center justify-between footer-bottom p3">
        <div className="flex items-center justify-center">
          <a href="https://github.com/NioBenarivo" className="mr1" target="_blank" rel="noopener noreferrer">
            <SiGithub size={24} title="Github" />
          </a>
          <a href="https://www.linkedin.com/in/zunio-benarivo-954679118/" target="_blank" rel="noopener noreferrer">
            <SiLinkedin size={24} title="LinkedIn" />
          </a>
        </div>
        <div className="flex items-center justify-center">
          <p className="m0">© 2021 Zunio Benarivo</p>
        </div>
      </div>
    </div>
  )
}
