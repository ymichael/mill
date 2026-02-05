# create-mill

A generator for self-building repos. Answer some questions, push to GitHub, and let the agent build your project.

## How it works

```
npx create-mill my-project
```

1. Scaffolds a repo with a `PROJECT.md` (your spec) and GitHub Actions workflow
2. You push to GitHub and add your `ANTHROPIC_API_KEY` secret
3. A cron runs every 5 minutes - Claude reads your spec and builds the project
4. Watch it go, or open issues to nudge it

## The loop

```
┌─────────────────────────────────────────────────┐
│  cron (every 5 min)                             │
│    ↓                                            │
│  another run in progress? → exit                │
│    ↓                                            │
│  .mill/done exists? → exit                      │
│    ↓                                            │
│  .mill/initialized exists?                      │
│    no  → bootstrap prompt (create structure)    │
│    yes → iterate prompt (improve/extend)        │
│    ↓                                            │
│  claude runs, commits to main                   │
│    ↓                                            │
│  agent decides it's done? → create .mill/done   │
└─────────────────────────────────────────────────┘
```

## Stopping the mill

- Use the `mill-control` workflow to disable/enable
- Or: commit a `.mill/done` file
- Or: let the agent decide it's complete

## Status

Early development. See [TODO.md](./TODO.md).
