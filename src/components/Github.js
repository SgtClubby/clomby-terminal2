import { useTypingEffect } from '../hooks/useTypingEffect';

function Github({ command }) {
  const displayedText = useTypingEffect("Github - github/SgtClubby"); // Adjust speed as needed

  return (
    <div className="flex flex-col text-white">
        <div>
            <p className="text-white">
                <span className="text-primary">user@clom.by:~$ {command}</span>
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
