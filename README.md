# EPR CLI (Eme Projects CLI)

EPR CLI is a powerful command-line tool designed to streamline your development workflow by managing and organizing your projects and repositories efficiently.

## 🌟 Features

- 🛠 Configure your development environment
- 📂 Organize projects with namespaces and repositories
- 🚀 Quickly open projects and repositories
- 🔗 Clone repositories from GitHub
- 🆕 Create new projects from templates

## 🚀 Getting Started

### Installation

```bash
npm install -g epr-cli
```

### Configuration

Before using EPR CLI, configure your settings:

```bash
epr config
```

This will prompt you to set up your base path and preferred code editor.

## 📚 Commands

### Open a Project or Repository

```bash
epr open [projectName]
```

If `projectName` is provided, it will list repositories within that project. Otherwise, it will list all projects.

### Open a Specific Repository

```bash
epr open:repo [projectName] [repositoryName]
```
Opens a specific repository in your configured editor.

### Cline a Repository

```bash
epr clone [repoUrl]
```
Clones a repository from GitHub into your configured project structure.

### Create a New App

```bash
epr create app
```
Initiates a interactive process to create a new application based on available templates.

## 🎨 Customization

You can customize default repositories for a project by creating an `epr.yml` file in the project's namespace folder:

```yaml
defaultRepositories:
  - "repositoryName"
```
With this configuration, running `epr open [namespace]` will automatically open then specified repositories.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [https://github.com/HurgotDev/epr-cli/issues]()

## 📝 License

This project is [MIT](https://github.com/HurgotDev/epr-cli/blob/main/LICENSE) licensed.

---
Made with ❤️ by the e-me team


