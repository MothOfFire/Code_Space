// 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值

function insterArray(arr, i = 0, min = 2, max = 32) {
  // 获取2-32随机数

  /**
   * Math.ceil 将数字向上取整。
   * Math.floor 将数字向下取整。
   * Math.round 将数字四舍五入为最接近的整数。
   * Math.random 生成一个0-1之间的随机数。
   * Math.random() * (max - min) + min 生成一个 min-max 之间的随机数。
   */
  const num = Math.floor(Math.random() * (max - min) + min);

  // 判断数组是否已经填充完整
  if (!arr[arr.length - 1]) {
    // 判断 arr 是否包含随机数 num
    if (!arr.includes(num)) {
      arr[i++] = num;
    }

    // 递归调用
    return insterArray(arr, i);
  }

  // 返回数组
  return arr;
}

// 创建一个长度为5的空数组
const arr = new Array(5);

const result = insterArray(arr);
console.log(result);
