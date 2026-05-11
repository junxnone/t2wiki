# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a wiki/documentation website project (t2wiki) that automatically syncs GitHub issues to markdown documentation files and renders them using Docsify on GitHub Pages.

## Architecture

### Issue-to-Docs Synchronization

The repository uses a GitHub Action (`.github/workflows/sync-issues.yml`) to automatically convert issues into markdown files:

- **Trigger**: Runs on issue events (opened, edited, labeled, unlabeled, deleted, closed, reopened)
- **Behavior**:
  - Creates/updates `docs/issue-{number}.md` when an issue is opened or modified
  - Deletes the markdown file when an issue is closed or deleted
  - **Title extraction**: Uses the first `# Header` in issue body as document title; falls back to issue title
  - **Label merging**: Combines tags from issue title (space-separated words) + GitHub labels
  - Each markdown file includes frontmatter with metadata (title, author, labels, timestamps) and the issue body
  - Automatically updates `docs/_sidebar.md` with all open issues grouped by merged labels
- **Automation**: Changes are committed and pushed automatically by github-actions bot

### Documentation Rendering

- **Framework**: Docsify (no build step required)
- **Deployment**: GitHub Pages via `.github/workflows/deploy-pages.yml`
- **Structure**:
  - `docs/index.html` - Docsify configuration and entry point
  - `docs/README.md` - Homepage content
  - `docs/_sidebar.md` - Auto-generated navigation (do not edit manually)
  - `docs/tags.md` - Auto-generated tags index (do not edit manually)
  - `docs/tags/*.md` - Auto-generated tag detail pages (do not edit manually)
  - `docs/issue-{number}.md` - Auto-generated issue documents (do not edit manually)
  - `docs/.nojekyll` - Required for GitHub Pages to serve Docsify correctly

### Tag System

- **Tag Index**: `docs/tags.md` lists all tags with article counts
- **Tag Pages**: `docs/tags/{tag}.md` lists all articles with that tag
- **Cross-linking**: Tag pages link to articles; articles link back to tags
- **Auto-cleanup**: Removes orphaned tag pages when tags are no longer used

## Workflow

1. Create an issue on GitHub
2. `sync-issues.yml` converts it to `docs/issue-{number}.md` and updates sidebar
3. Changes are pushed to the repository
4. `deploy-pages.yml` deploys the docs folder to GitHub Pages
5. Site is live at `https://{username}.github.io/t2wiki/`

## Maintenance

### Feature Documentation

When adding new features or making significant changes to the project:

1. Update `FEATURES.md` with a new dated section
2. Include detailed description of the feature
3. Add examples and usage instructions
4. List affected files
5. Update the Roadmap section if applicable

Follow the existing format in `FEATURES.md` for consistency.
