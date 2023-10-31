const axios=require('axios');
const { response } = require('express');
const _=require('lodash')

const getBlogs=async(req,res)=>{
    const url="https://intent-kit-16.hasura.app/api/rest/blogs"
    const hasura_secret='32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6';

    try {
        const response=await axios.get(url,{
            headers:{
                'x-hasura-admin-secret':hasura_secret
            }
        });

        blogsData=response.data.blogs
        
        //Lodash

        const Total_blogs=_.size(blogsData);

        const Longest_Title=_.maxBy(blogsData,(blog)=>blog.title.length);

        const Total_privacy=_.filter(blogsData,(blog)=>_.includes(blog.title,'Privacy')).length

        const unique_title=_.uniqBy(blogsData,'title').map(blog=>blog.title);


        // response to client

        let blog_response=new Object();
            blog_response.Total_Blogs=Total_blogs
            blog_response.Longest_Title_Blog=Longest_Title;
            total_privacy=Total_privacy
            blog_response.Total_Privacy=total_privacy.length
            blog_response.Unique_Title=unique_title
            res.status(201).json({Client_Response:blog_response})   
 
    } catch (err) {
        console.log('Error', err)
        res.status(404).json({error:'failed to fetch data'});
    }

}


const searchBlog=async(req,res)=>{
    try {
        const url="https://intent-kit-16.hasura.app/api/rest/blogs"
        const hasura_secret='32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6';

    const response=await axios.get(url,{
        headers:{
            'x-hasura-admin-secret':hasura_secret
        }
    });
    getData=response.data.blogs
    } catch (err) 
    {
        console.log('Error', err)
        res.status(404).json({error:'failed to fetch data'});
    }

    try {
        const query=req.query.query;

        if(!query){
        return res.status(400).json({error:'Query Parameter is required'})
        }

        const queryBlog=getData.filter(blog=>{
        const title=blog.title.toLowerCase();
        const lowerQuery=query.toLowerCase();
        return title.includes(lowerQuery);
        })
       
        res.json({Searched_Blogs:queryBlog})

    } catch (err) {
        res.status(404).json({Error:'Failed to fetch data'})
    }
}


module.exports={
    getBlogs,
    searchBlog
}

