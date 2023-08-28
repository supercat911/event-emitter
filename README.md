# event-emitter
 event-emitter (es6, jsdoc)

Данный ESM используется для создания пользовательских событий и их запуска.

Краткий пример:
```js
const eventEmitter = new EventEmitter();

eventEmitter.on('start', (number) => {
  console.log(`started ${number}`);
});

eventEmitter.emit('start', 111);
```


