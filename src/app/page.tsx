"use client"

import { useState, useRef, useEffect } from "react";
import Banner from "@/components/Banner";
import Invalid from "@/components/Invalid";
import { useTypingEffect } from "../hooks/useTypingEffect";
import type { Command, CommandConfig } from "../types";
import commandArray from '../config/commands.json'
import Sudo from "@/components/Sudo";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  const [clearedEcho, setClearedEcho] = useState(false);
  const [previousCommands, setPreviousCommands] = useState<{ type: any; command: string; message: string; }[]>([]);
  const [commandValue, setCommandValue] = useState("");
  const [dimCursor, setDimCursor] = useState(false);
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [isSudoMode, setIsSudoMode] = useState(false);
  const [sudoPassword, setSudoPassword] = useState('');

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

  const handleSudoSubmit = () => {
    setIsSudoMode(false); // For simplicity, accept any input as valid
    // You can add additional actions to perform after 'sudo' authentication
  };

  async function handleCommand(command: string) {
    try {
    const cmd = command.toLowerCase();
    if (cmd in commandConfig) {
      if (cmd === 'clear') {
        console.log("Clear")
        setClearedEcho(true);
        setPreviousCommands([]);
      } else if (cmd === 'sudo') {
        
        setIsSudoMode(true);
        console.log(isSudoMode)
        setPreviousCommands([...previousCommands, { type: Sudo, command: "", message: "" }]);
      } else {
        
          const ComponentName = commandConfig[cmd];
          const ComponentModule = await import(`../components/${ComponentName}`);
          const Component = ComponentModule.default;

          const commandObj = commandArray.find(c => c.name === cmd);
          const description = commandObj ? commandObj.description : "";

          if (ComponentName === "Message") {
            setPreviousCommands([...previousCommands, { type: Component, command: cmd, message: description }]);
          } else {
            setPreviousCommands([...previousCommands, { type: Component, command: cmd, message: "" }]);
          }
   
      }
    } else {
      setPreviousCommands([...previousCommands, { type: Invalid, command: cmd, message: "" }]);
    }
  } catch (error) {
    console.error("Error loading component:", error);
    // Handle the error appropriately
  }
}

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div className="flex w-full h-full terminal-container">
      <div className="p-5 mx-auto my-auto h-full w-full">
        <div>
          {!clearedEcho && (
            <Banner hideEcho={true} handleCommand={handleCommand} />
          )}
          <div className="">
            {previousCommands.map((item, index) => {
              const Component = item.type;
              const message = item.message;
              const command = item.command;
              return <Component key={index} command={command} message={message} />;
          })}
          <div ref={endOfMessagesRef} />
        </div>
        <div className="terminal-input-container">
          { !isSudoMode && (
            <>
              <button className="absolute h-[1.2rem] w-[50%]" onClick={focusInput} />
              <p className="terminal-user">{useTypingEffect("user@clom.by:~$", 25, 1300)}</p>
              <div className="terminal-command text-primary relative">{displayedCommand}</div>
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

