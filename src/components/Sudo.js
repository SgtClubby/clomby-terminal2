import commandConfig from '../config/commands.json';
import { useTypingEffect } from '../hooks/useTypingEffect';
import TypingText from './Type';

function Sudo() {

    return (
        <div className="flex flex-col text-white">
            <div>
                <p className="text-white">
                    <span className="text-primary">user@clom.by:~$ sudo</span>
                </p>
            </div>
            <div className="ml-10 flex flex-col text-white">
            <input 
          autoComplete="off" 
          autoFocus={true} 
          name="terminal-input" 
          className="terminal-input"
        />   
            </div>
        </div>
    )
}


export default Sudo