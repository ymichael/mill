#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.join(__dirname, '..', 'template');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

async function main() {
  const projectName = process.argv[2];

  if (!projectName) {
    console.error('Usage: npx create-mill <project-name>');
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    console.error(`Directory "${projectName}" already exists.`);
    process.exit(1);
  }

  // Copy template
  copyDir(templateDir, targetDir);
  console.log(`Created ${projectName}/`);

  // Prompt for PROJECT.md
  console.log('\nLet\'s set up your PROJECT.md.\n');
  console.log('Be descriptive - the more detail you provide, the better the agent will understand what to build.\n');

  const description = await ask('What are you building? (describe in a few sentences)\n> ');
  const constraints = await ask('\nAny constraints or requirements? (tech choices, things to avoid, etc.)\n> ');
  const goals = await ask('\nGoals? (how will the agent know it\'s done?)\n> ');

  const projectMd = `# Project

## What are we building?

${description || '<!-- Describe the project -->'}

## Constraints

${constraints ? `- ${constraints}` : '- <!-- Tech stack, dependencies, things to avoid -->'}

## Goals

${goals ? `- ${goals}` : '- <!-- What does success look like? When these are met, the project is complete. -->'}
`;

  fs.writeFileSync(path.join(targetDir, 'PROJECT.md'), projectMd);
  console.log('\nUpdated PROJECT.md');

  // Offer to set up GitHub
  const setupGh = await ask('\nSet up GitHub repo now? (y/n) ');

  if (setupGh.toLowerCase() === 'y') {
    try {
      process.chdir(targetDir);
      execSync('git init', { stdio: 'inherit' });
      execSync('git add -A', { stdio: 'inherit' });
      execSync('git commit -m "Initial commit from create-mill"', { stdio: 'inherit' });

      const repoName = await ask('GitHub repo name? (default: ' + projectName + ') ');
      const name = repoName || projectName;

      execSync(`gh repo create ${name} --public --source=. --push`, { stdio: 'inherit' });

      console.log('\nAuthentication options:');
      console.log('  1. Claude Pro/Max subscription: run "claude setup-token" then add CLAUDE_CODE_OAUTH_TOKEN');
      console.log('  2. API key (pay-as-you-go): add ANTHROPIC_API_KEY\n');

      const authChoice = await ask('Set up auth now? (1=subscription, 2=api key, n=skip) ');
      if (authChoice === '1') {
        console.log('\nRun "claude setup-token" to generate a token, then paste it:\n');
        execSync(`gh secret set CLAUDE_CODE_OAUTH_TOKEN --repo ${name}`, { stdio: 'inherit' });
      } else if (authChoice === '2') {
        execSync(`gh secret set ANTHROPIC_API_KEY --repo ${name}`, { stdio: 'inherit' });
      }

      console.log('\nEnable the mill workflow:');
      console.log(`  gh workflow enable mill.yml --repo ${name}`);
      console.log('\nOr go to Actions > mill > Enable workflow');

    } catch (err) {
      console.error('GitHub setup failed:', err.message);
      console.log('You can set it up manually. See docs/setup.md');
    }
  }

  rl.close();
  console.log('\nDone! See docs/setup.md for next steps.');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

main();
