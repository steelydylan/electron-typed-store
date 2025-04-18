# Electron Typed Store

Electron Typed Store is a simple key-value storage solution for Electron applications, utilizing JSON files to persist data. It provides a straightforward API for storing, retrieving, and managing data in the user's application data directory.

## Features

- Asynchronous operations for data management
- Type-safe storage with TypeScript
- Easy integration with Electron applications
- Supports setting, getting, deleting, and clearing data

## Installation



To install Electron Typed Store, use npm:

```bash
$ npm install electron-typed-store
```


## Usage

Here's a basic example of how to use Electron Typed Store in your Electron application:

```typescript
import { Store } from 'electron-typed-store';

interface MyData {
  username: string;
  age: number;
}

const store = new Store<MyData>('myData.json', { username: 'defaultUser', age: 0 });

async function main() {
  await store.set('username', 'john_doe');
  const username = await store.get('username');
  console.log(username); // Output: john_doe

  await store.set('age', 30);
  const age = await store.get('age');
  console.log(age); // Output: 30

  const allData = await store.getAll();
  console.log(allData); // Output: { username: 'john_doe', age: 30 }

  await store.delete('username');
  await store.clear();
}

main();
```

## API

### `constructor(fileName: string, defaultValues: T)`

Creates a new store instance.

- `fileName`: The name of the JSON file to store data.
- `defaultValues`: An object containing default key-value pairs.

### `store.set`

Sets a value for a specified key.

### `store.get`

Retrieves the value for a specified key.

### `store.delete`

Deletes a specified key from the store.

### `store.getAll`

Returns all stored data.

### `store.clear`

Clears all data from the store.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## Repository

[GitHub Repository](https://github.com/steelydylan/electron-typed-store)

## Author

Developed by steelydylan.
