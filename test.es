import Dehydrater from "./index.es";
function wait(ms = 100) {return new Promise(done => setTimeout(done, ms));}

// case 1

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

// case 2

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
