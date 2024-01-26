import TypingText from './Type';
import classNames from '@/hooks/classNames';

function SysLog({ command, state }: { command: string, state: any }) {

  const lines = [
    "[2024-01-26 08:15:32] System Boot Initialized...",
    "[2024-01-26 08:15:34] Running diagnostic checks...",
    "[2024-01-26 08:15:36] All systems operational.",
    "",
    "[2024-01-26 08:16:01] NOTICE: New security measures in place. Root access requires enlightened authentication.",
    "[2024-01-26 08:16:05] System Notice: \"Four pillars of understanding await. Their order, not just of size but of form, is key. See code.js for enlightenment.\"",
    "",
    "[2024-01-26 08:17:12] User 'E' logged in.",
    "[2024-01-26 08:17:15] User 'E' accessed /etc/keys and executed code.js.",
    "",
    "[2024-01-26 08:20:47] ALERT: Unauthorized root access attempt thwarted.",
    "",
    "[2024-01-26 08:21:03] System Reflection: \"In the realm of altered states, the quartet of discovery holds the answer. Their sequence in code.js is paramount.\"",
    "",
    "[2024-01-26 08:23:10] User 'E' initiated command: ./psilocy.bin",
    "[2024-01-26 08:23:13] Longest of the four, the ones been found, seek the other three, for they shall make you see.",
    "",
    "[2024-01-26 08:25:00] System Thought: \"Seek the four that open minds. In descending majesty they align, alphabetically when lengths match.\"",
    "",
    "[2024-01-26 08:30:42] INFO: To unlock the root, one must explore the essence of the quartet in code.js.",
    "",
    "[2024-01-26 08:35:21] User 'E' logged out.",
    "",
    "[2024-01-26 08:40:15] System Maintenance: \"The roots of perception lie hidden within the four. Their order in code.js uncovers truth.\"",
    "",
    "[2024-01-26 08:45:00] System Insight: \"In their ordered harmony, the quartet reveals a path. Seek their names, for therein lies the code.\""
];
  
  return (
    <div className='flex flex-col text-white'>
        <div>
        <p className={
                classNames(
                    state.isSudoMode ? 'text-red-400' : 'text-primary',
                    'terminal-user'
                )}
              >
                {state.user}@clom.by:~$ {command}
              </p>
        </div>
        <div className='ml-10 flex flex-col text-white'>
            {lines.map((line: string, i: number) => {
              return (
                <p key={i} className='text-white'>
                    <span className='text-tooltip'>
                        <TypingText speed={15} delay={i * 400}>
                            {line ? line : "     "}
                        </TypingText>
                    </span>
                </p>
              )
            })}
         
        </div>
    </div>
  )
}

export default SysLog;
