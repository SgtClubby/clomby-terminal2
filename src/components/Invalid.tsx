import classNames from '@/hooks/classNames';

function Invalid({ command, state }: { command: string, state: any }) {
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
            <p className="text-primary">
                <span className="text-secondary">bash: {command}: command not found. Use 'help' for a list of commands.</span>
            </p>
        </div>
    </div>
  )
}

export default Invalid