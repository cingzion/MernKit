// 08-promise的链式解析(11-22)
  /**
   * promise 是支持链式调用的，
   * @type {Promise}
   *
   * 1、无论成功还是失败，都可以返回结果(1.出错了走错误，2、返回一个普通值（不是promise的值)，就会作为下一次 then 的成功, 3、是 promise 的情况，(会采用返回的 promise 的状态), 用promise 解析后的结果传递给下个人)
   *
   */
  const Promise1 = require('./bundle');

  const resultObj = {};
  let index = 0;
  Object.defineProperty(resultObj, 'then', {
      get(){
          throw new Error('出错了');
      }
  })

  // 1、普通值，调用 then 方法
  let promise = new Promise1((resolve, reject) => {
      resolve("成功");
  }).then(data => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(new Promise((resolve,reject) => {
                  setTimeout(() => {
                      resolve(100);
                  }, 100);
              }));
          }, 1000)
      })
  }, (err) => {

  });


  let promise2 = promise.then(data => {
      console.log("success: ",data);
  }, (err) => {
      console.log("fail: ",err, 9999)
  })


