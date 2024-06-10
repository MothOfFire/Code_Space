import { cutFile } from "./cutFile.js";

// 拿到input元素
const inpFile = document.querySelector('input[type="file"]');

// 给input元素绑定change事件
inpFile.onChange = async (e) => {
  // 获取到用户选择的文件
  const file = e.target.files[0];
  console.log("test");
  // 开始计时
  console.time("cutFile");
  // 调用cutFile函数进行文件分片
  const chunks = await cutFile(file);
  // 结束计时
  console.timeEnd("cutFile");
  // 打印分片结果
  console.log(chunks);
};
