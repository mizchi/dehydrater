## Dehydrater

Promise queue handler.

```
npm install -g
```

## Dehydrater.transaction

```js
Dehydrater.transaction({n: 1}, next => {
  next(async (obj) => {
    await wait(100);
    return {n: obj.n + 1};
  });

  next(async (obj) => {
    await wait(100);
    return {n: obj.n + 2};
  });

  next(async (obj) => {
    await wait(100);
    return {n: obj.n + 3};
  });

}).then(result => {
  console.log(result);
});
```

## Dehydrater.startDehydrate()

```js
const d = Dehydrater.create();
const {next, promise} = d.startDehydrate({n: 1});

next(async (obj) => {
  await wait(100);
  return {n: obj.n + 1};
});

next(async (obj) => {
  await wait(100);
  return {n: obj.n + 2};
});

next(async (obj) => {
  await wait(100);
  return {n: obj.n + 3};
});

promise.then(data => {
  console.log(data);
});
```
