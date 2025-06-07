const {S3Client , GetObjectCommand, PutObjectCommand} = require("@aws-sdk/client-s3")
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")
require('dotenv').config();

const s3Client = new S3Client({
        region: 'ap-south-1',
        credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
})

async function getObjectURL(key){
        const command = new GetObjectCommand({
                Bucket: 'bucket.aayushs3.private',
                Key: key
        })

        const url = await getSignedUrl(s3Client , command)
        return url;
}

async function putObjectURL(filename , contentType){
        const command = new PutObjectCommand({
                Bucket: 'bucket.aayushs3.private',
                Key: `user-uploads/${filename}`,
                ContentType: contentType
        })

        const url = await getSignedUrl(s3Client , command);
        return url;
}

async function init(){
        // const url = await getObjectURL("images/CISCE Results 2021.pdf");
        // console.log("URL: ", url);

        const url = await putObjectURL(`image-${Date.now()}` , 'jpeg')
        console.log("URL for uploading:" , url);
}

init();