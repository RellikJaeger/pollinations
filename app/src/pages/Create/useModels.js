import React from "react";
import { zipObj } from 'ramda';

function useModels(modelsToUse){

    const [ models, setModels ] = React.useState({});
    const [ areModelsLoading, setLoading ] = React.useState(false);
    const [ error, setError ] = React.useState({});

    const wantedModels = modelsToUse || MODELS ;

    React.useEffect(()=>{
        
        
        async function fetchInitialModels(){
            
            setLoading(true)
            try {
                const response = await fetch('https://raw.githubusercontent.com/pollinations/model-index/main/images_openapi.json');
                const data = await response.json();

                const filtered_data = zipObj(
                    Object.values(wantedModels), 
                    Object.values(wantedModels)
                    // return only the models we want
                    .map(model => data[model] )
                    // 
                );

                setModels(filtered_data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchInitialModels()

    },[])

    return { models, error, areModelsLoading }
}

export default useModels

const MODELS = {
    // "latent-diffusion": "614871946825.dkr.ecr.us-east-1.amazonaws.com/pollinations/latent-diffusion-400m",
    // "envisioning": "614871946825.dkr.ecr.us-east-1.amazonaws.com/pollinations/preset-envisioning",
    // "pollinations/preset-envisioning": "614871946825.dkr.ecr.us-east-1.amazonaws.com/pollinations/preset-envisioning",
    // "piano-transcription": "r8.im/bytedance/piano-transcription",
    // "voodoohop/dalle-playground": "614871946825.dkr.ecr.us-east-1.amazonaws.com/voodoohop/dalle-playground",
    // "pollinations/latent-diffusion-400m": "614871946825.dkr.ecr.us-east-1.amazonaws.com/pollinations/latent-diffusion-400m",
    "pollinations/min-dalle": "614871946825.dkr.ecr.us-east-1.amazonaws.com/pollinations/min-dalle",
    // "kuprel/min-dalle": "r8.im/kuprel/min-dalle",
    "pollinations/preset-frontpage": "614871946825.dkr.ecr.us-east-1.amazonaws.com/pollinations/preset-frontpage",
    "pollinations/majesty-diffusion-cog": "614871946825.dkr.ecr.us-east-1.amazonaws.com/pollinations/majesty-diffusion-cog",
    // "jingyunliang/swinir": "r8.im/jingyunliang/swinir@sha256:9d91795e944f3a585fa83f749617fc75821bea8b323348f39cf84f8fd0cbc2f7",
    "replicate/disco-diffusion": "r8.im/nightmareai/disco-diffusion@sha256:cc730cf65f83d7ffed2aa6d47bc9a538b628617be5a4c2db27e7aee6a6391920"
}