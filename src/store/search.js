export const state =()=>({
    searchResults:{
        people:[],
        posts:[],
        tags:[]
    },
    related:[]
})
export const mutations={
   
    SET_SEARCH_RESULTS(state,results){
        state.searchResults=results
    },
    SET_RELATED_TAGS(state,tags){
        state.related=tags
    }
}

export const actions={

    getRelatedTags({commit}){
        this.$server.get(`/tags/`).then(res=>
            commit("SET_RELATED_TAGS",res.data.results)
        )
    },
    search({commit},{query,areas}){
        console.log(areas)
        if(query){ 
            const data={
                params:{
                    search:query
                }
            }
            const requests= areas.map(area=>
              this.$server.get(`/${area}/`,data)
            )

            return Promise.all(requests).then(results=>{
               
                const posts=results.find(res=>res.config.url.includes("post"))
                const tags=results.find(res=>res.config.url.includes("tags"))
                const people=results.find(res=>res.config.url.includes("profile"))
                console.log(results)
                commit("SET_SEARCH_RESULTS",{
                    posts:posts?posts.data.results:[],
                    tags:tags?tags.data.results:[],
                    people:people?people.data.results:[]
                })
            })
            .catch(console.log)
        }else{
            commit("SET_SEARCH_RESULTS",{
                posts:[],
                tags:[],
                people:[]
            })
        }
    }
}
