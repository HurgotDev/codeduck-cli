# 🦆 Codeduck CLI

Codeduck CLI is a powerful command-line tool designed to streamline your development workflow by managing and organizing your projects and repositories efficiently.

## 🌟 Features

- 🛠 Configure your development environment
- 📂 Organize projects with namespaces and repositories
- 🚀 Quickly open projects and repositories
- 🔗 Clone repositories from GitHub
- 🆕 Create new projects from templates
- 👤 Multiple configuration profiles support

## 🚀 Getting Started

### Installation

```bash
npm install -g codeduck-cli
```

### Configuration

Before using Codeduck CLI, configure your settings:

```bash
duck config
```

This will prompt you to set up your base path and preferred code editor.

### Profiles

Codeduck CLI supports multiple configuration profiles. By default, it uses the "default" profile. You can:

- List all available profiles:
```bash
duck list-profiles
```

- Use a specific profile by setting the environment variable:
```bash
export CODEDUCK_PROFILE=profilename
```

- Configure a specific profile:
```bash
duck config --profile profilename
```

## 📊 Telemetry

Codeduck CLI collects anonymous usage data to improve the tool. The telemetry includes:
- Commands used
- CLI version
- Operating system
- Node.js version

No sensitive information such as repository paths or project names is collected.

To disable telemetry, set the environment variable:
```bash
export CODEDUCK_TELEMETRY=0
```

## 📚 Commands

### Open a Project or Repository

```bash
duck open [projectName]
```

If `projectName` is provided, it will list repositories within that project. Otherwise, it will list all projects.

### Open a Specific Repository

```bash
duck open:repo [projectName] [repositoryName]
```
Opens a specific repository in your configured editor.

### Clone a Repository

```bash
duck clone [repoUrl]
```
Clones a repository from GitHub into your configured project structure.

### Create a New App

```bash
duck create app
```
Initiates an interactive process to create a new application based on available templates.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/HurgotDev/codeduck-cli/issues)

## 📝 License

This project is [MIT](https://github.com/HurgotDev/codeduck-cli/blob/main/LICENSE) licensed.

---
Made with ❤️ by [HurgotDev](https://github.com/HurgotDev)


