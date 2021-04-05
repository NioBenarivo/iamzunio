import { SiZeit, SiGithub, SiLinkedin, SiNextDotJs, SiGmail } from "react-icons/si"

export default function Footer() {
  return (
    <div className="flex flex-column col-12">
      <div className="flex justify-center items-center p2 footer-top">
        <p className="my0 mr1">Powered by</p>
        <SiZeit size={24} title="Vercel" />
        <SiNextDotJs size={24} title="NextJS" />
      </div>
      <div className="flex flex-wrap items-center justify-between footer-bottom p3">
        <div className="flex items-center justify-center">
          <a href="https://github.com/NioBenarivo" className="mr1" target="_blank" rel="noopener">
            <SiGithub size={24} title="Github" />
          </a>
          <a href="https://www.linkedin.com/in/zunio-benarivo-954679118/" target="_blank" rel="noopener">
            <SiLinkedin size={24} title="LinkedIn" />
          </a>
        </div>
        <div className="flex items-center justify-center">
          <SiGmail size={24} className="m1" title="Gmail" />
          <p className="m0">zunibenarivo@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
