import { createChunk } from "./createChunk";

onmessage = async (event) => {
  const {
    file,
    CHUNK_SIZE,
    startChunkIndex: start,
    endChunkIndex: end,
  } = event.data;
  console.log(event.data);
  const proms = [];
  for (let i = start; i < end; i++) {
    proms.push(createChunk(file, i, CHUNK_SIZE));
  }
  // 拿到所有的分片结果
  const chunks = await Promise.all(proms);
  // 将分片结果发送给主线程
  postMessage(chunks);
};
