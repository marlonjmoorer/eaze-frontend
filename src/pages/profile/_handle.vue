<template>
 <b-container v-if="profile.id">
   <b-row class="my-2">
     <b-col sm="4" class="py-5 text-center" >
        <b-img 
        rounded="circle" 
        thumbnail 
        fluid 
        class="avi" 
        :src="profile.photo||'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX7825622.jpg'" ></b-img>      
     </b-col>
     <b-col sm="8">
            <div class="py-5">
            <b-row>
              <b-col  >
                <h4 class="my-3" >{{profile.user}}</h4>
              </b-col>
              <b-col v-if="canEdit&&profile.handle" >
                <b-button v-b-modal.profileModal variant="info" >
                  Update Profile
                </b-button>
                <b-modal id="profileModal" size="lg" title="Profile">
                   <edit-profile :profile="profile"/>
                   <div slot="modal-footer"></div>
                </b-modal>
              </b-col>
            </b-row>
           
            <b-row>
              <b-col>
                <h5>About :</h5>
                <p>{{profile.about}}</p>
                <template >
                  <hr>
                  <follow-button :profile="profile"/>
                </template>
              </b-col>
              <b-col>
                 
                  <b-popover target="follow"
                    placement="left"
                    title="Popover!"
                    triggers="hover focus">
                            Hi
                  </b-popover>
                  <b-badge id="follow" href="#" variant="primary">
                    <i class="fa fa-user"></i> Following <b-badge variant="light">{{profile.following.length}}</b-badge>
                  </b-badge>
                  <b-badge href="#" variant="dark">
                    <i class="fa fa-newspaper"></i> Posts <b-badge variant="light">{{profile.posts.length}}</b-badge>
                  </b-badge>
                  <b-badge href="#" variant="dark">
                    <i class="fa fa-comments"></i> Comments<b-badge variant="light">4</b-badge>
                  </b-badge>
                  <hr/>
                  <h1>
                    <b-badge :key="i" v-for="(link,i) in profile.links" 
                    href="#" 
                    variant="secondary"><i :class="`fab fa-${link.link_type}`"></i></b-badge>
                    
                  </h1> 
              </b-col>

            </b-row>
            </div>
     </b-col>
   </b-row>
  
   <b-row>
     <b-col>
       <b-tabs>
        <b-tab title="Published Post" active>
          <b-row class="mt-3" >
             <b-col :key="post.id" v-for="post in publishedPost"  sm="6" md="6"  >
                <post-list-item :post="post" :canEdit="true" />
             </b-col>  
          </b-row>
        </b-tab>
        <b-tab title="Drafts" v-if="canEdit" >
          <b-row class="mt-3" >
             <b-col :key="post.id" v-for="post in drafts"  sm="6" md="6"  >
                <post-list-item :post="post" :canEdit="true" />
             </b-col>  
          </b-row>
        </b-tab>
        <b-tab title="Messages" v-if="canEdit" >
          Comming soon...
        </b-tab>
      </b-tabs>
     </b-col>
   </b-row>
 </b-container>
</template>

<script>
import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
import EditProfile from '@/components/EditProfile.vue';
import PostListItem from '@/components/PostListItem.vue';
import FollowButton from '@/components/FollowButton.vue';

export default {
  props:['handle'],
  components:{EditProfile,PostListItem,FollowButton},
  async asyncData ({ store,params }) {
    store.dispatch("user/tokenLogin")
    await store.dispatch("profile/loadProfile",params.handle)
    const  profile=store.state.profile.details
    await store.dispatch("articles/loadPostForAuthor",profile.handle)
    return{}
  },
  data:()=>({
  }),
  computed:{
    ...mapGetters("profile",["authorsFollowing"]),
    ...mapGetters("user",["userProfile"]),
    ...mapState("articles",{
      "posts":state=>state.postList
    }),
    ...mapState("profile",{
      "profile":state=> state.details
    }),
    canEdit:function(){
      return this.profile&&this.profile.handle==this.userProfile.handle
    },
    publishedPost:function(){ return this.posts?this.posts.filter(p=>!p.draft):[]},
    drafts: function(){return this.posts?this.posts.filter(p=>p.draft):[]},
  },
  methods:{
    ...mapActions(["loadProfile","loadPostForAuthor","followAuthor"]),
  },
  watch:{
    handle(handle){
      this.loadProfile(this.handle)
    },

  },
  created(){
    this.$store.watch(state=>state.profile.details,details=>{
      this.$root.$emit('bv::hide::modal','profileModal')
    })
  }

}
</script>

<style scope>
img.avi{
  height: 150px;
  width: 150px;
}
.container{
      background: white
}
</style>
