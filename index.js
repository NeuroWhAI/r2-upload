import 'dotenv/config'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { readFile } from 'fs/promises';

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

console.log(`Open file: ${process.env.SRC_FILE_PATH}`);
const file = await readFile(process.env.SRC_FILE_PATH);

console.log(`Upload to S3: ${process.env.DEST_FILE_PATH}`);
await s3.send(
  new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: process.env.DEST_FILE_PATH,
    Body: file,
  }),
);

console.log('Done!');
