export default function delay(mls) {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve(true), mls);
  });
  return promise;
}
