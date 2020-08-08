import React, { useEffect, useState, Fragment } from 'react'
import axios from 'axios';
const Youtube = () => {
    
    const [videoId , setVideoId] = useState();
    useEffect(()=>{
      async function fetchVideoId(){
       const res = await axios.get("/api/youtube");
        setVideoId(res.data);
      }
      fetchVideoId();
    },[])
        if(videoId)
    return (
        
            <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item"
              width="560"
              height="315"
              title="Youtube"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
        </div>

        )
        else 
        return(<Fragment></Fragment>);
}
export default Youtube;