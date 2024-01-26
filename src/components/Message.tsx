import { useTypingEffect } from '../hooks/useTypingEffect';
import classNames from '@/hooks/classNames';

function Message({ command, message, state }: { command: string, message: string, state: any }) {
  const displayedText = useTypingEffect(message); // Adjust speed as needed

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
            <p className="text-white">
                <span className="text-tooltip">
                    {displayedText}
                </span>
            </p>
        </div>
    </div>
  )
}

export default Message;
