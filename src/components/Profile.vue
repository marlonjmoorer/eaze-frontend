<template>
 <b-container>
   <b-row class="my-2">
     <b-col sm="4" class="py-5" >
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
              <b-col>
                <h4 class="my-3" >{{profile.user}}</h4>
              </b-col>
              <b-col v-if="canEdit&&profile.handle" >
                <b-button v-b-modal.profileModal variant="info" >
                  Update Profile
                </b-button>
                <b-modal id="profileModal" size="lg" title="Bootstrap-Vue">
                   <edit-profile :profile="profile"/>
                   <div slot="modal-footer"></div>
                </b-modal>
              </b-col>
            </b-row>
           
            <b-row>
              <b-col>
                <h5>About :</h5>
                <p>{{profile.about}}</p>
                <template v-if="!canEdit">
                  <hr>
                  <follow-button/>
                </template>
              </b-col>
              <b-col>
                 
                  <b-popover target="follow"
                   placement="left"
                            title="Popover!"
                            triggers="hover focus"
                            >
                            Hi
                  </b-popover>
                  <b-badge id="follow"  href="#" variant="primary">
                    <i class="fa fa-user"></i> Following <b-badge variant="light">{{profile.following.length}}</b-badge>
                  </b-badge>
                  <b-badge href="#" variant="dark">
                    <i class="fa fa-newspaper"></i> Posts <b-badge variant="light">{{posts.length}}</b-badge>
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
                <post-list-item :post="post" :hideFooter="true" />
             </b-col>  
          </b-row>
        </b-tab>
        <b-tab title="Drafts" v-if="canEdit" >
          <b-row class="mt-3" >
             <b-col :key="post.id" v-for="post in drafts"  sm="6" md="6"  >
                <post-list-item :post="post" :hideFooter="true" />
             </b-col>  
          </b-row>
        </b-tab>
        <b-tab title="Messages" v-if="canEdit" >
          <br>Disabled tab!
        </b-tab>
      </b-tabs>
     </b-col>
   </b-row>
 </b-container>
</template>

<script>
import {mapGetters,mapMutations,mapActions,mapState} from 'vuex'
import EditProfile from './EditProfile.vue';
import PostListItem from './PostListItem.vue';
import FollowButton from './FollowButton.vue';

export default {
  props:['handle'],
  components:{EditProfile,PostListItem,FollowButton},
  data:()=>({
    currentUser:null
    
  }),
  computed:{
    ...mapGetters(["authorsFollowing"]),
    ...mapState(['profile','posts',"user"]),
    canEdit:function(){
      return this.profile&&this.profile.handle==this.user.profile.handle
    },
    publishedPost:function(){ return this.posts?this.posts.filter(p=>!p.draft):[]},
    drafts: function(){return this.posts?this.posts.filter(p=>p.draft):[]},
  },
  methods:{
    ...mapActions(["loadProfile","loadPostForAuthor","followAuthor"]),
    follow(){
      const add= !this.following
      this.followAuthor({
          handle:this.profile.handle,
          add,
          id:this.profile.id
      })
    }
  },
  watch:{
    handle(handle){
      this.loadProfile(this.handle)
    },
    profile(val){
      console.log(val.handle)
      this.loadPostForAuthor(val.handle)
      console.log('changed')
      this.$root.$emit('bv::hide::modal','profileModal')
    }
  },
  created(){
    this.loadProfile(this.handle)
  }

}
</script>

<style scope>
img.avi{
  height: 150px;
  width: 150px;
}
</style>
