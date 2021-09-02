import zlib from 'zlib';
import fetch from "node-fetch";

// gzip compressor proxy
export const handler = async ({path}) => {
    
    // Fetch the content from IPFS
    const cid = path.split("/").slice(-1)[0]
    const response =  await fetch(`https://pollinations.ai/ipfs/${cid}`);
    
    // Get content type of response
    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();
    
    // Compress the content
    const compressed = await  gzip(buffer)

    // Convert to buffer and return the compressed content
    const response = {
        statusCode: 200,
        body:  Buffer.from(compressed),
        headers: {
            'Content-Type': contentType,
            'Content-Encoding': 'gzip'
        }
    };
};


// Call gzip compression
function gzip(buffer) {
    return new Promise((resolve, reject) => zlib.gzip(buffer, (error, zipped) => {
        if (error)
            reject(error);

        else
            resolve(zipped);
    }));
}
