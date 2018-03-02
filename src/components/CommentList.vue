<template>
  <b-list-group>

    <b-list-group-item href="#" :key="i" v-for="(comment,i) in comments" class="flex-column align-items-start">
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{comment.user.full_name}}</h5>
        <small class="text-muted">{{comment.created}}</small>
        </div>
        <p class="mb-1">
            {{comment.body}}
        </p>
    </b-list-group-item>
    
</b-list-group>

</template>

<script>
export default {
    props:['comments']
}
</script>

<style>

</style>
