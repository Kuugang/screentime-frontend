import { FiGithub, FiFacebook } from 'react-icons/fi'

const About = () => {

    return (
        <div className="about-container">
            <div className="about-description">
              <p>WOWOWOWOWOWOWOWOWWOWOWOWOWOW</p>
              <p>ORAORAORAORAORAORAORAORAORA</p>
            </div>
            <div className="about-tech">
              <h4>MongoDB</h4>
              <h4>Express</h4>
              <h4>React</h4>
              <h4>Node</h4>
              <h4>Python</h4>
            </div>
            <div className="about-plugs">
              <a href="https://github.com/Kuugang" rel="noopener noreferrer" target = '_blank'>
                <FiGithub/>
              </a>
              <a href="https://www.facebook.com/kuugang" rel="noopener noreferrer" target = '_blank'>
                <FiFacebook/>
              </a>
            </div>
            <div className="about-email">
              <p>jakebajo21@gmail.com</p>
            </div>
        </div>
      )

}

export default About
