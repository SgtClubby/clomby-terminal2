import React, { useState, useEffect } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import classNames from '@/hooks/classNames';

function Banner({ command, hideEcho, handleCommand, state }: { command: string, hideEcho: boolean, handleCommand: (command: string) => void, state: any }) {
    const bannerArt = [
        '     ______     __                       __',
        '    / ____/     / /  ____    ____ ___      / /_    __    __',
        '   / /      / /  / __ \\  / __ `__  \\  / __ \\  / / /    /',
        '  / /___    / /  / /_/ /  / / / / / / / /_/ /  / /_/ /',
        '  \\____/     /_ /    \\____  /  /_ / /_ / /_ /  /_...___/  \\__, /   ',
        '                                      /____/       ',
    ];

    const corpoText = useTypingEffect("Clomby (CL) Not A Corporation. All rights reserved.", 14);
    const welcomeText = useTypingEffect("Welcome to my interactive web terminal.", 14, 1000);
    const preElementText = useTypingEffect("For a list of available commands, type ", 14, 1200);
  return (
    <React.Fragment key="banner">
        <div className="text-white">
          <div>
            {!hideEcho && (
              <p className={
                classNames(
                    state.isSudoMode ? "text-red-400" : "text-primary",
                    "terminal-user"
                )}
              >
                {state.user}@clom.by:~$ {command}
              </p>
            )}
          </div>
          <p>{corpoText}</p>
          <div className="space-y-[-6px]">
            {bannerArt.map((line, i) => (
              <div className="text-primary" key={i}>
                {useTypingEffect(line.replace(/ /g, '\u00A0\u00A0'), 5, 200 * i)}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <p className="text-secondary">{welcomeText}</p>
            <p className="text-secondary">
              {preElementText}
              {preElementText.length === "For a list of available commands, type ".length && (
                <span onClick={() => handleCommand("help")} className="cursor-pointer text-tooltip">'help'</span>
              )}
            </p>
          </div>
        </div>

    </React.Fragment >
  );
}

export default Banner;
