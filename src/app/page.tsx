"use client"

import { useState, useRef, useEffect } from "react";
import Banner from "@/components/Banner";
import Invalid from "@/components/Invalid";
import { useTypingEffect } from "../hooks/useTypingEffect";
import type { Command, CommandConfig } from "../types";
import commandArray from '../config/commands.json'
import Sudo from "@/components/Sudo";
import TypingText from "@/components/Type";
import Message from "../components/Message";
import LSOutput from "@/components/ls";
import Lsla from "@/components/ls-la";
import Code from "@/components/code";
import SysLog from "@/components/SysLog";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  const [clearedEcho, setClearedEcho] = useState(false);
  const [previousCommands, setPreviousCommands] = useState<{ type: any; command: string; message: string; state: Object | null }[]>([]);
  const [commandValue, setCommandValue] = useState("");
  const [dimCursor, setDimCursor] = useState(false);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [sudoMenu, setSudoMenu] = useState(false);
  const [isSudoMode, setIsSudoMode] = useState(false);
  const [sudoPassword, setSudoPassword] = useState('');
  const [isPsychedelic, setPsychedelic] = useState(false);

  const [currentUser, setCurrentUser] = useState('user');

  const inputRef = useRef<HTMLInputElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScrollActive) {
      const timerinit = setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 125); // Adjust time as needed
      const timerFollowup = setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 1500); // Adjust time as needed
      return () => {
        clearTimeout(timerinit);
        clearTimeout(timerFollowup);
      }
    }
  }, [previousCommands, autoScrollActive]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement; // Cast to HTMLElement
      if (target.scrollTop < target.scrollHeight - target.clientHeight - 10) {
        setAutoScrollActive(false);
      }
    };

    const terminalContainer: HTMLDivElement = document.querySelector('.terminal-container')!; // Change to your terminal container selector
    terminalContainer.addEventListener('scroll', handleScroll);

    return () => terminalContainer.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (commandValue !== displayedCommand) {
      if (displayedCommand.length < commandValue.length) {
        const nextChar = commandValue[displayedCommand.length];
        const timeoutId = setTimeout(() => {
          setDisplayedCommand(displayedCommand + nextChar);
        }, 50);
        return () => clearTimeout(timeoutId);
      } else {
        setDisplayedCommand(commandValue);
      }
    }
  }, [commandValue, displayedCommand]);

  function commandSubmit(key: string, command: string) {
    if (key === "Enter") {
      setHistory([...history, command]);
      handleCommand(command);
      setCommandValue("");
      setAutoScrollActive(true);
    }
  }

  const commandConfig: CommandConfig = commandArray.reduce(
    (acc: CommandConfig, cmd: Command) => {
      acc[cmd.name] = cmd.component;
      return acc;
    },
    {}
  );

  function setPassword(password: string) {
    setSudoPassword(password);
  }
  function setSudo(bool: boolean) {
    setSudoMenu(bool);
  }
  function setIsSudo(bool: boolean) {
    setIsSudoMode(bool);
  }

  async function handleCommand(command: string) {
    try {
    const cmd = command.toLowerCase();
    const isSudo = isSudoMode;
    if (cmd in commandConfig) {
      if (cmd === 'clear') {
        setClearedEcho(true);
        setPreviousCommands([]);
        return
      } 
      
      if (cmd === 'sudo') {
        if (!isSudoMode) {
          setSudoMenu(true);
          setPreviousCommands([...previousCommands, { type: Sudo, command: "", message: "", state: { setPassword, setSudo, setIsSudo, isSudoMode, sudoPassword, sudoMenu, user: currentUser } }]);
        } else {
          setPreviousCommands([...previousCommands, { type: Message, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser }}]);
        }
        return
      } 
    
      if (cmd === 'cd') {
        if (cmd.includes("cat_videos")) {
          setPreviousCommands([...previousCommands, { type: Message, command: cmd, message: "bash: cd: cat_videos: Input/output error", state: { isSudoMode: isSudo, user: currentUser }}]);
        } else {
          setPreviousCommands([...previousCommands, { type: Message, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser }}]);
        }
        return
      }

      if(cmd == "./psilocy.bin") {
        setPsychedelic(true);
        setPreviousCommands([...previousCommands, { type: Message, command: cmd, message: "The world fills with mirages...", state: { isSudoMode: isSudo, user: currentUser }}]);
        return
      }

      if (cmd == "cat") {
        setPreviousCommands([...previousCommands, { type: Message, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser }}]);
      }
      if (cmd =="cat system.log") {
        setPreviousCommands([...previousCommands, { type: SysLog, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser }}]);
        return
      } 

      if (cmd == "cat code.js") {
        console.log("code.js");
        setPreviousCommands([...previousCommands, { type: Code, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser }}]);
        return
      }

      if (cmd === "ls" ) {
          setPreviousCommands([...previousCommands, { type: LSOutput, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser } }]);
          return
      } 
    
      if (cmd === "ls -la") {
        setPreviousCommands([...previousCommands, { type: Lsla, command: "ls -la", message: "", state: { isSudoMode: isSudo, user: currentUser }}]);
        return
      } else {
          const ComponentName = commandConfig[cmd];
          const ComponentModule = await import(`../components/${ComponentName}`);
          const Component = ComponentModule.default;

          const commandObj = commandArray.find(c => c.name === cmd);
          const description = commandObj ? commandObj.description : "";

          if (ComponentName === "Message") {
            setPreviousCommands([...previousCommands, { type: Message, command: cmd, message: description, state: { isSudoMode: isSudo, user: currentUser } }]);
          } else {
            setPreviousCommands([...previousCommands, { type: Component, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser } }]);
          }
    
        }
      } else {
        setPreviousCommands([...previousCommands, { type: Invalid, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser } }]);
      }
    } catch (error) {
      console.error("Error loading component:", error);
    }
  }

  // set currentUser to root if isSudo is true
  useEffect(() => {
    if (isSudoMode) {
      setCurrentUser('root');
    } else {
      setCurrentUser('user');
    }

  }, [isSudoMode]);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div className={classNames(
      isPsychedelic? "psychedelic" : "",
      "flex w-full h-full terminal-container"
    )}>
      <div className="p-5 mx-auto my-auto h-full w-full">
        <div>
          {!clearedEcho && (
            <Banner hideEcho={true} handleCommand={handleCommand} state="" command="" />
          )}
          <div className="">
            {previousCommands.map((item, index) => {
              const Component = item.type;
              const message = item.message;
              const command = item.command;
              const state = item.state;
              return <Component key={index} command={command} message={message} state={state} />;
          })}
          <div ref={endOfMessagesRef} />
        </div>
        <div className="terminal-input-container">

          {!sudoMenu && (
            <>
            <button className="absolute h-[1.2rem] w-[50%]" onClick={focusInput} />
              <p className={classNames(
                isSudoMode ? "text-red-400" : "text-primary",
                "terminal-user"
              )}
              >
                <TypingText speed={25} delay={1300} >
                    {currentUser}@clom.by:~$
                </TypingText>
              </p>
            <div className={classNames(
              isSudoMode ? "text-red-400" : "text-primary",
              "terminal-command relative"
              )}>{displayedCommand}</div>
            <div className={classNames(
              dimCursor ? "animate-terminal-blink-dim" : "animate-terminal-blink", "terminal-cursor"
            )} />
              </>
          )}
        
       
        </div>
        <input 
          onFocus={() => setDimCursor(false)}
          onBlur={() => setDimCursor(true)}
          autoComplete="off" 
          autoFocus={true} 
          name="terminal-input" 
          value={commandValue}
          onChange={(e) => setCommandValue(e.target.value)}
          onKeyDown={(e) => commandSubmit(e.code, commandValue)}
          ref={inputRef} 
          className="terminal-input"
        />               
      </div>
    </div>
  </div>
)
}

