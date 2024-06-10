// 分片的大小
const CHUNK_SIZE = 1024 * 1024 * 5; // 5MB
// 线程的数量，该数量为 cpu 内核数
const THREAD_COUNT = navigator.hardwareConcurrency || 4;

export const cutFile = async (file) => {
  return new Promise((resolve) => {
    // 计算分片的数量
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE); // 向上取整
    console.log("分片数量:", chunkCount);
    // 每个线程分配到的分片数量
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    console.log("每个线程分配到的分片数量:", threadChunkCount);
    // 存储分片结果
    const result = [];
    // 完成线程的数量
    const finishCount = 0;

    for (let i = 0; i < threadChunkCount; i++) {
      // 创建一个线程，并分配任务
      const worker = new Worker("./worker.js", {
        type: "module",
      });
      // 最后一个线程的分片索引
      let end = (i + 1) * threadChunkCount;
      if (end > chunkCount) {
        end = chunkCount;
      }
      // 开始索引
      const start = i * threadChunkCount;
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startChunkIndex: start,
        endChunkIndex: end,
      });
      worker.onmessage = (event) => {
        for (let i = start; i < end; i++) {
          result[i] = event.data[i - start];
        }
        // 结束线程
        worker.terminate();
        finishCount++;
        if (finishCount === THREAD_COUNT) {
          resolve(result);
        }
      };
    }
  });
};
