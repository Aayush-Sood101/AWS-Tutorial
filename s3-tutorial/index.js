const {S3Client , GetObjectCommand, PutObjectCommand , ListObjectsV2Command, DeleteObjectCommand} = require("@aws-sdk/client-s3")
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

async function listObjects(){
        const command = new ListObjectsV2Command({
                Bucket: 'bucket.aayushs3.private',
                Key: '/'
        })

        const result = await s3Client.send(command)
        console.log(result);
}

async function deleteObject(key){
        const command = new DeleteObjectCommand({
                Bucket: 'bucket.aayushs3.private',
                Key: key
        })

        s3Client.send(command);
}

async function init(){
        // const url = await getObjectURL("images/CISCE Results 2021.pdf");
        // console.log("URL: ", url);

        // const url = await putObjectURL(`image-${Date.now()}.mp4` , 'video/mp4')
        // console.log("URL for uploading:" , url);

        await(listObjects());
}

init();