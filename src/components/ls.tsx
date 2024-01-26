import classNames from "@/hooks/classNames";
import TypingText from "./Type";

function LSOutput({ state, command }: { state: any, command: string }) {
    // Define colors for different file types
    const directoryColor = 'text-blue-500';
    const executableColor = 'text-green-500';
    const fileColor = 'text-tooltip';
    const hiddenFileColor = 'text-gray-500';
    const imageColor = 'text-[#c801af]'
  
    // Mock file system entries
    const files = [
      { name: 'system.log', type: 'file' },
      { name: 'cat_videos', type: 'directory' },
      { name: 'code.js', type: 'file' },
      { name: 'psilocy.bin', type: 'executable' },
    ];
  
    // Function to determine the CSS class based on the file type
    const getColor = (type: string) => {
      switch (type) {
        case 'directory':
          return directoryColor;
        case 'executable':
          return executableColor;
        case 'hidden-file':
          return hiddenFileColor;
        case 'image':
            return imageColor
        default:
          return fileColor;
      }
    };
  
    return (
      <div className="flex flex-col text-white">
        <div>
          <p className={classNames(state.isSudoMode ? "text-red-400" : "text-primary", "terminal-user")}>
            {state.user}@clom.by:~$ {command}
          </p>
        </div>
        <div className="ml-10 flex flex-col">
            {files.map((file, i) => {
                if (file.type == 'hidden-file') return null;
                return (
                    <p key={i} className={classNames(getColor(file.type), "flex flex-row")}>
                        <TypingText speed={15} delay={i * 200}>
                            {file.name}
                        </TypingText>
                    </p>
                )
                }
            )} 
        </div>
      </div>
    );
  }
  
  export default LSOutput;
  