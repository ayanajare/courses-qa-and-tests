# Quality Assurance and Testing Course

A Node.js application with banking, authentication, and export modules, tested with Vitest.


## Setup

```bash
npm install
docker-compose up -d  # Start database
```

## Testing with Vitest

### Run all tests
```bash
npm test
```

### Run with coverage
```bash
npm run test:coverage
```

### Test specific modules
```bash
# Authentication
npx vitest src/modules/authentication/user/user.test.js

# Banking Account (unit tests)
npx vitest src/modules/banking/account/account.test.js

# Banking Account (integration tests)
npx vitest src/modules/banking/account/account.spec.js

# Transfer
npx vitest src/modules/banking/transfer/transfer.test.js

# Export
npx vitest src/modules/interoperability/export/export.test.js
```

### Watch mode
```bash
npx vitest --watch
```

## Test Types

- `*.test.js` - Unit tests with mocked dependencies
- `*.spec.js` - Integration tests with real database

View coverage report at `coverage/index.html` after running tests with coverage.
