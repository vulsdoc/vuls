---
id: tutorial-scan-docker-image
title: Scan Docker Image
sidebar_label: Scan Docker Image
---

## Container Image Scanning

Vuls v0.8.0 can scan Docker images using [aquasecurity/fanal](https://github.com/aquasecurity/fanal).

The following registries are supported:

- Docker Hub
- Amazon ECR (Elastic Container Registry)
- GCR (Google Container Registry)
- Local Image

## Config.toml

```toml
[servers]
[servers.image]
type="pseudo"
    # Public GCR
    [servers.image.images.hyperkube]
    name="gcr.io/google-containers/hyperkube"
    tag="v1.11.10"
    
    # Docker Hub
    [servers.image.images.web-dvwa]
    name="vulnerables/web-dvwa"
    tag="latest"
    
    # Each image can have credential information
    # If there is no information, use default credential information. (default credential path, default aws cli credential etc)
    
    # Private ECR
    [servers.image.images.privateecr]
    name="xxxxx.dkr.ecr.us-west-1.amazonaws.com/imagename"
    tag="targetTag"
        [servers.image.images.privateecr.dockerOption]
        awsAccessKey="accesskey"
        awsSecretKey="secret"
        awsRegion="us-west-1"

    # Private GCR
    [servers.image.images.privategcr]
    name="asia.gcr.io/projectname/reponame"
    tag="latest"
        [servers.image.images.privategcr.dockerOption]
        gcpCredPath="/path/to/key.json"

    # Private Docker Hub
    [servers.image.images.privatehub]
    name="privateimage"
    tag="targetTag"
        [servers.image.images.privatehub.dockerOption]
        userName="user"
        password="password"

    # You can use an image's digest instead of its tag.

    # Docker Hub
    [servers.image.images.withdanger]
    name="meteogroup/concourse-version-resource"
    digest="sha256:4213898e8aaa12d0f71875190fb123690ae9df18b30e5d959b36a4071738bc89"

    # Private ECR
    [servers.image.images.privateecr]
    name="xxxxx.dkr.ecr.us-west-1.amazonaws.com/imagename"
    digest="sha256:0123456789012345678901234567890123456789012345678901234567890123"
```

## Library scan

Vuls v0.8.0 can scan library using [aquasecurity/trivy](https://github.com/aquasecurity/trivy).
Trivy automatically detects the following lock files:

- Gemfile.lock
- Pipfile.lock
- poetry.lock
- composer.lock
- package-lock.json
- yarn.lock
- Cargo.lock

By integrating with Trivy, Vuls can automatically detect library vulnerabilities inside of Docker images.
