let num = 10;
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    num += 20;
    resolve(num);
  }, 1000);
});
const result = async () => {
  const data = await promise;
  console.log(data);
};
result();
