import { useTypingEffect } from '../hooks/useTypingEffect';
import classNames from '@/hooks/classNames';

function Github({ command, state }: { command: string, state: any }) {
  const displayedText = useTypingEffect("Github - github/SgtClubby"); // Adjust speed as needed

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
                <span className="font-bold text-tooltip">{displayedText}</span>
            </p>
        </div>
    </div>
  )
}

export default Github;
