# TODO

## MVP
- [ ] `create-mill` CLI that scaffolds template
- [ ] `mill.yml` - cron workflow (every 5 min), checks if running, runs Claude, commits to main
- [ ] `mill-control.yml` - manual enable/disable
- [ ] `PROJECT.md` template
- [ ] `docs/setup.md` - secrets setup walkthrough
- [ ] `.mill/initialized` marker - agent creates after first run, changes prompt behavior

## Post-MVP
- [ ] PR mode: agent opens PRs instead of committing to main
- [ ] Merger loop: separate workflow that periodically merges approved PRs
- [ ] Issue-driven tasks: maintainers can create issues to direct the agent
- [ ] Cost tracking / usage limits

## Future
- [ ] Support Codex as alternative coding agent
- [ ] Incremental work strategy: agent breaks work into small commits instead of one-shotting
- [ ] Agent-managed task file: agent maintains its own TODO/progress tracker between runs
- [ ] Prompt engineering for piecemeal work (one commit per run, pick up where left off)
- [ ] Agent can ask for help: create an issue @-mentioning the repo owner when stuck

## Design Decisions
- Cron frequency: every 5 minutes
- Commits directly to main (PRs are post-MVP)
- Check GitHub API for running workflows before starting
- Bootstrap prompt (no `.mill/initialized`) vs iterate prompt (has marker)
- Agent runs `gh workflow disable mill.yml` when project is complete
