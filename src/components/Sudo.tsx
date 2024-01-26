import { useEffect, useRef, useState } from 'react';
import cfg from '../config/app.json';
import { SudoState } from '@/types';

function Sudo({ command, message, state }: { command: string, message: string, state: SudoState }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState<{message: string}[]>([]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [attempts]);

    function passwordSubmit(key: string, password: string) {
        if (key === "Enter") {
            const newAttempts = [...attempts];
            if (password === cfg.sudoPassword) {
                state.setIsSudo(true);
                state.setSudo(false);
                inputRef.current?.blur();
            } else {
                if (newAttempts.length < 2) {
                    newAttempts.push({ message: "Sorry, try again." });
                } else {
                    newAttempts.push({ message: "sudo: 3 incorrect password attempts" });
                    state.setIsSudo(false);
                    state.setSudo(false);
                    inputRef.current?.blur();
                }
            }
            if (!state.isSudoMode) {
                setAttempts(newAttempts);
            }
            setPassword("");
        }
    }

    return (
        <div className="flex flex-col text-white">
            <div>
                <p className="text-white">
                    <span className="text-primary">{state.user}@clom.by:~$ sudo</span>
                </p>
            </div>
            {attempts.map((attempt, index) => (
                <div key={index} className="ml-10 flex flex-col text-white">
                    <p>[sudo] password for {state.user}: </p>
                    <p className="">{attempt.message}</p>
                </div>
            ))}
            {attempts.length < 3 && (
                <div className="ml-10 flex flex-row text-white">
                    <p>[sudo] password for {state.user}: </p>
                    <button className="absolute h-[1.2rem] w-[50%]" onClick={() => inputRef.current?.focus()} />
                    <input 
                        placeholder=''
                        type="password"
                        name="terminal-input" 
                        className='ml-1 bg-transparent scale-0'
                        ref={inputRef}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => passwordSubmit(e.code, password)}
                    />
                </div>
            )}
        </div>
    );
}

export default Sudo;
