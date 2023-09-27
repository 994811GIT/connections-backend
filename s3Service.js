const { S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const uuid = require("uuid").v1;;

exports.s3Uploadv3 = async (files) => {
  //   const s3client = new S3Client();

  //   const params = files.map((file) => {
  //     return {
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: `uploads/${uuid()}-${file.originalname}`,
  //       Body: file.buffer,
  //     };
  //   });

  //   return await Promise.all(
  //     params.map((param) => s3client.send(new PutObjectCommand(param)))
  //   );
  // };

  return await Promise.all(
    files.map((file) => {
      const client = new Upload({
        client : new S3Client({}),
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `uploads/${uuid()}-${file.originalname}`,
          Body: file.buffer,
        }
      })
      return client.done()
    })
  )
}