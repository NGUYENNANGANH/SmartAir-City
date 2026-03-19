# Contributing to SmartAir City

Thank you for your interest in contributing to SmartAir City. We welcome contributions from the community to help improve this air quality monitoring platform.

## Before You Start

Looking for something to work on? Check out our [good first issues](https://github.com/lequang2009k4/SmartAir-City/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to get started.

Before submitting a PR, please create an issue to discuss the changes you want to make.

## Bug Reports

When submitting a bug report, please include:

- A clear and descriptive title
- Detailed description of the bug with error messages
- Steps to reproduce the issue
- Expected vs actual behavior
- Logs (check MongoDB logs, backend console output)
- Screenshots or videos if applicable
- System information (OS, .NET version, Node version, MongoDB version)

## Feature Requests

When proposing a new feature, please include:

- A clear and descriptive title
- Detailed description of the feature
- Use case explaining why this feature is valuable
- Any relevant context or examples

## Pull Request Process

1. Fork the repository
2. Create an issue to discuss your proposed changes
3. Create a new branch from `main`
4. Make your changes following our coding standards
5. Add tests for your changes
6. Ensure all tests pass
7. Link the issue in your PR description using `fixes #<issue_number>`
8. Submit your pull request

## Development Setup

### Backend

```bash
cd backend/SmartAirCity
dotnet restore
dotnet run
```

See [backend/SmartAirCity/README.md](backend/SmartAirCity) for detailed setup instructions.

### Frontend

```bash
cd frontend
npm install
npm start
```

See [frontend/README.md](frontend/README.md) for detailed setup instructions.

### Prerequisites

- .NET 8.0 SDK
- MongoDB 4.4 or later
- Node.js 16.x or later

## Coding Standards

### C# Backend

- Follow Microsoft C# coding conventions
- Use meaningful names for variables and methods
- Add XML documentation for public APIs
- Use async/await for asynchronous operations
- Handle exceptions appropriately

### JavaScript/React Frontend

- Use functional components with hooks
- Follow React best practices
- Keep components small and reusable
- Use meaningful component and variable names
- Follow ESLint configuration

## Commit Message Format

We follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

Examples:
feat(api): add historical data endpoint
fix(ui): correct map rendering on mobile
docs(readme): update installation steps
refactor(service): optimize data processing
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Testing

Before submitting a PR, ensure all tests pass:

```bash
# Backend
cd backend/SmartAirCity
dotnet test

# Frontend
cd frontend
npm test
```

## Getting Help

If you need assistance:
- Open an issue with your question
- Check existing documentation in README.md
- Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
