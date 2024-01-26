import TypingText from './Type';
import classNames from '@/hooks/classNames';

function Lsla({ command, state }: { command: string, state: any }) {

  const lines = [
    "total 5",
    "drwxr-xr-x  7 user  group  224 Jan 25 10:00 .",
    "drwxr-xr-x  4 user  group  128 Jan 24 09:30 ..",
    "-rw-r--r--  1 user  group   52 Jan 23 09:00 .hidden_diary.txt",
    "-rwxr-xr-x  1 user  group   75 Jan 23 08:45 .unlock_treasure",
    "-rw-r--r--  1 user  group  102 Jan 24 11:00 adventure_plan.txt",
    "drwxr-xr-x  2 user  group   64 Jan 24 12:00 cat_videos",
    "-rw-r--r--  1 user  group  256 Jan 25 09:30 mystery_code.js",
    "-rw-r--r--  1 user  group  310 Jan 25 10:00 secret_formula.pdf",
    "-rw-r--r--  1 user  group  512 Jan 24 14:00 treasure_map.jpg"
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
