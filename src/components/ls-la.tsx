import TypingText from './Type';
import classNames from '@/hooks/classNames';

function Lsla({ command, state }: { command: string, state: any }) {

  const lines = [
    "total 5",
    "drwxr-xr-x  7 user  group  224 Jan 25 10:00 .",
    "drwxr-xr-x  4 user  group  128 Jan 24 09:30 ..",
    "-rw-r--r--  1 user  group  102 Jan 24 11:00 system.log",
    "drwxr-xr-x  2 user  group   64 Jan 24 12:00 cat_videos",
    "-rw-r--r--  1 user  group  256 Jan 25 09:30 code.js",
    "-rwxr--r--  1 root  group  102 Jan 25 09:30 psilocy.bin",
  ]
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
            {lines.map((line: string, i: number) => {
              return (
                <p key={i} className="text-white">
                    <span className="text-tooltip">
                        <TypingText speed={15} delay={i * 400}>
                            {line}
                        </TypingText>
                    </span>
                </p>
              )
            })}
         
        </div>
    </div>
  )
}

export default Lsla;
