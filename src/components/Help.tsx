import commandConfig from '../config/commands.json';
import { useTypingEffect } from '../hooks/useTypingEffect';
import TypingText from './Type';
import classNames from '@/hooks/classNames';
function Help({state, command}: { state: any, command: string }) {

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
               {commandConfig.map((command, i) => {
                if (command.type != 'command') {
                    i = i - 1;
                    return
                };

                return (
                    <p key={i} className="text-white">
                        <span className="font-bold text-tooltip">
                            <TypingText speed={15} delay={i * 200}>
                                {command.name}
                            </TypingText>
                        </span> 
                        <span className="text-secondary">
                            <TypingText speed={15} delay={i * 200}>
                            {" - "}{command.description}
                            </TypingText>
                        </span>
                    </p>
                )})}
            </div>
        </div>
    )
}


export default Help