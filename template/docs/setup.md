# Setup

## 1. Push to GitHub

```bash
gh repo create my-project --public --source=. --push
```

## 2. Add authentication

Choose one:

### Option A: Claude Pro/Max subscription (recommended)

Run this locally to generate a token:

```bash
claude setup-token
```

Then add it as a secret:

```bash
gh secret set CLAUDE_CODE_OAUTH_TOKEN
```

### Option B: API key (pay-as-you-go)

Get your API key from [console.anthropic.com](https://console.anthropic.com/).

```bash
gh secret set ANTHROPIC_API_KEY
```

## 3. Enable the workflow

Go to **Actions > mill > Enable workflow**, or run:

```bash
gh workflow enable mill.yml
```

The mill runs every 5 minutes. After enabling, you can either:
- Wait for the next scheduled run (up to 5 minutes)
- Trigger it manually: `gh workflow run mill.yml`

## Stopping the mill

**Option 1: Disable the workflow**

Go to **Actions > mill-control > Run workflow** and select "disable".

**Option 2: Let the agent finish**

When the agent completes all goals in PROJECT.md, it will disable the workflow itself.

## Resuming

Re-enable the workflow via mill-control.

## Troubleshooting

### Workflow not running

Scheduled workflows don't trigger immediately after pushing. Either:
- Wait for the next cron window (every 5 minutes)
- Trigger manually: `gh workflow run mill.yml`

Note: GitHub's scheduled workflows can be delayed 10+ minutes during high load periods. This is normal. If you don't want to wait, trigger manually.

Also check that the workflow is enabled:
```bash
gh workflow list
```

### Authentication errors

If the agent fails with auth errors:
1. Check that your secret is set: `gh secret list`
2. For subscription tokens, they may expire - regenerate with `claude setup-token`
3. For API keys, verify the key is valid at [console.anthropic.com](https://console.anthropic.com/)

### Agent not making commits

Check the workflow run logs:
```bash
gh run list
gh run view <run-id> --log
```

Common causes:
- Agent decided there's nothing to do (check `.mill/JOURNAL.md` for notes)
- Git push failed (check permissions)
- Agent hit an error (check logs)

### Workflow keeps running but nothing happens

The agent may be stuck. Check `.mill/TODO.md` and `.mill/JOURNAL.md` in the repo to see what it's thinking. You can edit these files to give it guidance.

### Need to start over

Delete `.mill/initialized` to trigger bootstrap mode again, or disable the workflow and start fresh.
