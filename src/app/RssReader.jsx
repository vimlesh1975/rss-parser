import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { feedUrls } from './feedUrls'

const RssReader = () => {
    const [feedListing, setFeedListing] = useState([])
    const [feedUrl, setfeedUrl] = useState('https://www.hindusthansamachar.in/Regional/HASM/HASM.rss');

    const getRSSFeed = async(url1) => {
        const postData = {
            query: url1,
          };
    
          const response = await fetch('/api/getRSSFeed', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          })
          const jsonData = await response.json();
        
            console.log(jsonData)
            setFeedListing(jsonData.items)
       
    }

    useEffect(() => {
        getRSSFeed(feedUrl)
        return () => {
            // cleanup
        }
    }, [feedUrl])

    return (
        <div style={{ textAlign: 'center',  alignContent:'center', alignItems:'center', justifyContent:'center', justifyItems:'center' }}>
            <b>RSS Feeds:</b>
            <select onChange={e => setfeedUrl(e.target.value)} value={feedUrl}>
                {feedUrls.map((val) => { return <option key={uuidv4()} value={val.url}>{val.name}</option> })}
            </select>
                {feedListing?.map((val) => {
                    return (<div key={uuidv4()} style={{marginBottom:50, border:'1px solid black', backgroundColor:'#F3EDC8'}}>
                        <h3>  <a href={val.link} target='_blank' rel="noreferrer" >{val.title} </a> </h3>
                        <img alt='' src={val.enclosure.url} width='200' height='150' />
                        <p>{val.contentSnippet}</p>
                    </div>)
                })}
        </div>
    )
}

export default RssReader
