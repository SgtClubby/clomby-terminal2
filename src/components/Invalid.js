function Invalid({ command }) {
    return (
        <div className="flex flex-col text-white">
        <div>
            <p className="text-primary">
                <span className="text-primary">user@clom.by:~$ {command} </span>
            </p>
        </div>
        <div className="ml-10 flex flex-col text-white">
            <p className="text-primary">
                <span className="text-secondary">Command '{command}' not found. Use 'help' for a list of commands.</span>
            </p>
        </div>
    </div>
  )
}

export default Invalid