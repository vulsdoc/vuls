---
id: tutorial-scan-docker-image
title: Scan Docker Image
sidebar_label: Scan Docker Image
---

## Container Image Scanning

Vuls v0.8.0 can scan Docker images using [knqyf263/trivy](https://github.com/knqyf263/trivy).

Following Registry supported.

- ECR
- GCR
- Local Image

## Config.toml

```toml
[servers]
[servers.image]
type="pseudo"
    [servers.image.images.hyperkube]
    name="gcr.io/google-containers/hyperkube"
    tag="v1.11.10"
    [servers.image.images.web-dvwa]
    name="vulnerables/web-dvwa"
    tag="latest"
    [servers.image.images.gcr]
    name="asia.gcr.io/bizshift-stg/api"
    tag="latest"
        [servers.image.images.gcr.dockerOption]
        gcpCredPath="/Users/amachi/Downloads/key.json"

```

## Library scan

Trivy detects lock files listed below automatically.

- Gemfile.lock
- Pipfile.lock
- poetry.lock
- composer.lock
- package-lock.json
- yarn.lock
- Cargo.lock

By integrated with Trivy, Vuls can detect libraly vulnerabilities inside of Docker image automatically.
