export const state =()=>({
    searchResults:{
        people:[],
        posts:[],
        tags:[]
    },
})
export const mutations={
   
    SET_SEARCH_RESULTS(state,results){
        state.searchResults=results
    }
}

export const actions={

    search({commit},query){
    
        if(query){ 
            const data={
                params:{
                    search:query
                }
            }

            return Promise.all([
                this.$server.get(`/post/`,data),
                this.$server.get(`/tags`,data),
                this.$server.get(`/profile`,data)
            ]) .then(([posts,tags,people])=>{
                commit("SET_SEARCH_RESULTS",{
                    posts:posts.data.results,
                    tags:tags.data.results,
                    people:people.data.results
                })
            })
            .catch(console.log)
        }
    }
}
