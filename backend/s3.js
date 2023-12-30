const S3 = require("aws-sdk/clients/s3");
const { v4 } = require("uuid");


const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;

const s3 = new S3({
    region: AWS_BUCKET_REGION,
    secretAccessKey: AWS_SECRET_KEY,
    accessKeyId: AWS_ACCESS_KEY,
  });

const uploadImage = async (file) => {
    let key = `${file.originalname}-${v4()}`;
  
    const s3Params = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
    };
  
    let res = await s3.upload(s3Params).promise();
    let location = res.Location;
    return location;
  };

  module.exports = uploadImage