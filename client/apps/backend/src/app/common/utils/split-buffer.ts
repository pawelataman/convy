export function splitBuffer(buffer: Buffer, chunkSize: number = 64 * 1024): Array<Buffer> {
  const chunks: Buffer[] = [];
  for (let i = 0; i < buffer.length; i += chunkSize) {
    const end = i + chunkSize;
    const chunk = buffer.slice(i, end);
    chunks.push(chunk);
  }
  return chunks;
}
