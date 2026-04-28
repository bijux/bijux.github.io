---
title: Learning Catalog
audience: mixed
type: index
status: canonical
owner: bijux-docs
last_reviewed: 2026-04-17
---

# Learning

## Learning In The Repository Family

The learning branch lives in `bijux-masterclass`, where system
engineering practice is taught through sequenced programs. It belongs in
the same repository family because it turns architecture and workflow
judgment into reusable instruction while leaving shared shell behavior
in `bijux-std`, GitHub governance in `bijux-iac`, and learning
curriculum in Masterclass.

The learning surface is not separate from the rest of the repository
family. It is where runtime judgment, workflow discipline, and design
tradeoffs become teachable without turning into generic motivation
content.

## Learning Map

```mermaid
graph LR
    learning["Learning"] --> models["Programming models"]
    learning --> workflows["Reproducible workflows"]

    models --> python["Python Programming"]
    workflows --> research["Reproducible Research"]

    python --> abstraction["Abstraction and design choices"]
    research --> control["Workflow control and artifact trust"]
```

## Program Families

| Program | Who it is for | What it teaches | What artifact proves it | Destination |
| --- | --- | --- | --- | --- |
| Reproducible Research | engineers and researchers who need reliable scientific workflows | workflow systems, automation discipline, build truth, and scientific execution habits | capstone workflow outputs that can be re-run and reviewed | [Program docs](https://bijux.io/bijux-masterclass/reproducible-research/) |
| Python Programming | learners advancing from syntax fluency to design judgment | language depth, runtime judgment, software design tradeoffs, and long-form programming instruction | capstone implementations and runnable exercises that show design decisions in code | [Program docs](https://bijux.io/bijux-masterclass/python-programming/) |

## What You Can Verify Quickly

| If you inspect... | You can infer... |
| --- | --- |
| reproducible-research capstones | workflow thinking is grounded in executable artifact discipline |
| python-programming program structure | language teaching is being used to explain long-lived software design, not just syntax |
| the relationship to `bijux-masterclass` | the learning surface is treated as a repository-owned product, not detached notes |

## Shared Layers Around Masterclass

- `bijux-masterclass` consumes shared shell behavior and baseline checks from `bijux-std`
- `bijux-masterclass` is governed in GitHub through `bijux-iac`
- `bijux.github.io` routes readers into the learning material, but does not own the learning content or the shared shell
