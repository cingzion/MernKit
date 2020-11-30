// 08-promise的链式解析(11-22)
  /**
   * promise 是支持链式调用的，
   * @type {Promise}
   *
   * 1、无论成功还是失败，都可以返回结果(1.出错了走错误，2、返回一个普通值（不是promise的值)，就会作为下一次 then 的成功, 3、是 promise 的情况，(会采用返回的 promise 的状态), 用promise 解析后的结果传递给下个人)
   *
   */
  const Promise = require('./bundle');

  // 1、普通值，调用 then 方法
  let promise2 = new Promise((resolve, reject) => {
      resolve("成功");
  }).then(data => {
      // throw new Error('失败了');
      return 100;
  }, (err) => {
      return 1;
  });

  promise2.then((data) => {
      console.log("打印成功的结果是： ",data);
  }, (err) => {
      console.log("打印失败的结果是： ",err);
  });