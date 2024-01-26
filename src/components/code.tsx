import TypingText from './Type';
import classNames from '@/hooks/classNames';

function Code({ command, state }: { command: string, state: any }) {

  const lines = [
    "let k1 = '[REDACTED]';",
    "let k2 = '[REDACTED]';",
    "let k3 = '[REDACTED]';",
    "let k4 = '[REDACTED]';",
    "",
    "let p='';",
    "k1=k1.toLowerCase();",
    "k2=k2.toLowerCase();",
    "k3=k3.toLowerCase();",
    "k4=k4.toLowerCase();",
    "",
    "function g(k,i) {",
    "return k.charAt(i%k.length);",
    "}",
    "",
    "function ga(k,av){",
    "const a='abcdefghijklmnopqrstuvwxyz';",
    "let position=(av+k.length-2)%26;",
    "return a.charAt(position);",
    "}",
    "",
    "p+=g(k1,0);",
    "p+=g(k4,1);",
    "p+=ga(k1,16);",
    "p+=g(k2,3);",
    "p+=ga(k2,0);",
    "p+=g(k2,k2.length-1);",
    "p+=g(k3,0);",
    "p+=g(k2,1);",
    "p+=g(k1,3);",
    "p+=g(k1,k1.length-2);",
    "p+=g(k1,k1.length-5);",
    "",
    "console.log(p.charAt(0).toUpperCase() + p.slice(1));"
  ]
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

export default Code;
