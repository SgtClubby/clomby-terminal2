import commandConfig from '../config/commands.json';
import { useTypingEffect } from '../hooks/useTypingEffect';
import TypingText from './Type';

function Help() {

    return (
        <div className="flex flex-col text-white">
            <div>
                <p className="text-white">
                    <span className="text-primary">user@clom.by:~$ help</span>
                </p>
            </div>
            <div className="ml-10 flex flex-col text-white">
               {commandConfig.map((command, i) => {
                if (command.type != 'command') return;

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