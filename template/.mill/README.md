# .mill

This folder contains configuration and state files for the mill agent.

## Files

| File          | Created by | Purpose                                                                    |
| ------------- | ---------- | -------------------------------------------------------------------------- |
| `PROMPT.md`   | You        | The prompt fed to the agent each run. Edit to change behavior.             |
| `config.json` | You        | Settings: model, budget per run.                                           |
| `initialized` | Agent      | Marks bootstrap complete. When present, agent runs in iterate mode.        |
