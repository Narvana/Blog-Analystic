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

        res.json(response.data)
        blogsData=response.data.blogs
        
        //Lodash
        console.log('Lodash Analytics')
        const Total_blogs=_.size(blogsData);
        console.log('\nTotal number of blogs -:',Total_blogs )

        const Longest_Title=_.maxBy(response.data.blogs,(blog)=>blog.title.length);
        console.log('\nBlog with longest title:',Longest_Title);

        const Total_privacy=_.filter(response.data.blogs,(blog)=>_.includes(blog.title,'Privacy')).length
        console.log("\nTotal title with Privacy -:",Total_privacy);

        const unique_title=_.uniqBy(response.data.blogs,'title').map(blog=>blog.title);
        console.log('\n All unique titles -: ',unique_title)


        // response to client
        console.log('\n Response to the client')
            let blog_response=new Object();
            blog_response.Total_Blogs=response.data.blogs.length
            blog_response.Longest_Title_Blog=response.data.blogs.reduce((a,b)=>(a.title.length>b.title.length ? a:b)).title;
            total_privacy=response.data.blogs.filter(blog=>blog.title.includes("Privacy"))
            blog_response.Total_Privacy=total_privacy.length
            blog_response.Unique_Title=[...new Set(response.data.blogs.map(blog=>blog.title))]
            console.log('\n Client Response:',blog_response)   
 
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

