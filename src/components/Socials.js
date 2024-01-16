import TypingText from './Type';
import socialsConfig from '../config/socials.json';
function Socials({ command }) {


  return (
    <div className="flex flex-col text-white">
        <div>
            <p className="text-white">
                <span className="text-primary">user@clom.by:~$ socials</span>
            </p>
        </div>
        <div className="ml-10 flex flex-col text-white">
            {socialsConfig.map((social, i) => {
              const { name, user, url } = social;
              return (
                <p key={i} className="text-white">
                    <a href={url} target="_blank" rel="noreferrer">
                        <span className="font-bold text-tooltip">
                            <TypingText speed={15} delay={i * 200}>
                                {name}
                            </TypingText>
                        </span> 
                        <span className="text-secondary">
                            <TypingText speed={15} delay={i * 200}>
                            {" - "}{user}
                            </TypingText>
                        </span>
                    </a>
                </p>
              )
            })}
         
        </div>
    </div>
  )
}

export default Socials;
