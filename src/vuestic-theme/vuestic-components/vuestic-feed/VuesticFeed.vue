<template>
  <div class="vuestic-feed">
    <div v-if="posts.length == 0" class="empty">Your feed is empty.</div>
    <div class="post" v-for="post in posts" :class="{last: posts.indexOf(post) === posts.length - 1}">
      <div class="photo-container"><div class="photo" :style="`background: url(${post.photoURL})`"></div></div>
      <div class="underscored">
        <span class="text"><span class="name">{{post.name}}</span> {{post.text}}.</span>
        <button v-on:click="removePost(post)" class="btn btn-micro btn-primary btn-with-icon close-btn rounded-icon">
          <i class="ion-md-close ion"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'vuestic-feed',
    props: ['initialPosts'],
    methods: {
      removePost (target) {
        let result = []
        for (let post of this.posts) {
          if (post !== target) {
            result.push(post)
          }
        }
        this.posts = result
      }
    },
    /**
     This will be called when the method is created
     **/
    created () {
      var self = this
      // Call to test lambda function
      axios.get('https://hj92zuxxil.execute-api.us-west-2.amazonaws.com/v1/redshiftrecordstest').then((response) => {
        console.log('Success in loading lambda function output')
        console.log(response)
        let msgText = response.data + ' from AWS LAMBDA function RedShiftRecordsTest via AWS API Gateway /redshiftrecordstest'
        let dynamicPost = {
          name: 'Himanshu Dalela',
          text: msgText,
          photoURL: 'https://internal-cdn.amazon.com/phonetool.amazon.com/images/743450-1529230082'
        }
        self.posts.push(dynamicPost)
        this.toastText = msgText
        if (window.EpsilonDashboardAndroidAppInterface) {
          window.EpsilonDashboardAndroidAppInterface.showToast(msgText)
        } else {
          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth
          })
        }
      }).catch(() => {
        console.error('Problem loading lambda function')
      })
    },
    data () {
      return {
        posts: this.initialPosts,
        toastText: 'This toast is awesome!',
        toastDuration: 12000,
        toastIcon: 'fa-check',
        toastPosition: 'bottom-right',
        isToastFullWidth: false
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .vuestic-feed {
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .empty {
      text-align: center;
    }
    .post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .photo-container {
        margin-right: 1rem;
        border-radius: 50%;
        border: 2px solid $lighter-gray;
        .photo {
          background-size: cover !important;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
      }
      .underscored {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: $light-gray2 2px solid;
        overflow: hidden;
        padding-right: 0.7rem;
        height: 3.5rem;
        .text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .name {
            font-weight: $font-weight-bold;
          }
        }
        .close-btn {
          margin-left: 1rem;
          i {
            left: 10.5px;
          }
        }
      }
      &.last {
        .underscored {
          border-bottom: none;
        }
      }
    }
  }
</style>
