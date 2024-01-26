import TypingText from './Type';
import socialsConfig from '../config/socials.json';
import classNames from '@/hooks/classNames';

function Socials({ command, state }: { command: string, state: any }) {
    
  return (
    <div className="flex flex-col text-white">
        <div>
        <p className={
                classNames(
                    state.isSudoMode ? "text-red-400" : "text-primary",
                    "terminal-user"
                )}
              >
                {state.user}@clom.by:~$ {command}
              </p>
        </div>
        <div className="ml-10 flex flex-col text-white">
            {socialsConfig.map((social, i) => {
              const { name, user, link } = social;
              return (
                <p key={i} className="text-white">
                    <a href={link} target="_blank" rel="noreferrer">
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
