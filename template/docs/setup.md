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

The mill will start running every 5 minutes.

## Stopping the mill

**Option 1: Disable the workflow**

Go to **Actions > mill-control > Run workflow** and select "disable".

**Option 2: Let the agent finish**

When the agent completes all goals in PROJECT.md, it will disable the workflow itself.

## Resuming

Re-enable the workflow via mill-control.
