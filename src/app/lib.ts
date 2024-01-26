async function handleCommand(command: string) {
    try {
    const cmd = command.toLowerCase();
    const isSudo = isSudoMode;
    if (cmd in commandConfig) {
      if (cmd === 'clear') {
        console.log("Clear")
        setClearedEcho(true);
        setPreviousCommands([]);
      } else if (cmd === 'sudo') {
        if (!isSudoMode) {
          setSudoMenu(true);
          setPreviousCommands([...previousCommands, { type: Sudo, command: "", message: "", state: { setPassword, setSudo, setIsSudo, isSudoMode, sudoPassword, sudoMenu, user: currentUser } }]);
        } else {
          setPreviousCommands([...previousCommands, { type: Message, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser }}]);
        }
    } else if (cmd === "ls" ) {
        setPreviousCommands([...previousCommands, { type: LSOutput, command: cmd, message: "", state: { isSudoMode: isSudo, user: currentUser } }]);
    } else if (cmd === "ls -la") {

        setPreviousCommands([...previousCommands, { type: Lsla, command: "ls -la", message: "", state: { isSudoMode: isSudo, user: currentUser }}]);
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
    // Handle the error appropriately
  }
}