<template>
  <div>
    <group-title>rows = 2</group-title>
    <grid :rows="2">
      <grid-item :label="Grid" v-for="i in 2" :key="i">
        <img slot="icon" src="../../assets/grid_icon.png">
      </grid-item>
    </grid>
    <group-title>rows = 3</group-title>
    <grid>
      <grid-item link="/component/cell" :label="GotoCell">
        <img slot="icon" src="../../assets/grid_icon.png">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" :label="GotoCell">
        <img slot="icon" src="../../assets/grid_icon.png">
      </grid-item>
      <grid-item link="/component/cell" @on-item-click="onItemClick">
        <img slot="icon" src="../../assets/grid_icon.png">
        <span slot="label">{{GotoCell}}</span>
      </grid-item>
    </grid>
    <group-title>rows = 4</group-title>
    <grid :rows="4">
      <grid-item :label="Grid" v-for="i in 4" :key="i">
        <img slot="icon" src="../../assets/grid_icon.png">
      </grid-item>
    </grid>
    <group-title>custom content</group-title>
    <grid :rows="5">
      <grid-item v-for="i in 5" :key="i">
        <span class="grid-center">{{i}}</span>
      </grid-item>
    </grid>
    <tabbar>
      <tabbar-item @on-item-click="bind">
        <img slot="icon" src="../../assets/demo/icon_nav_button.png">
        <span slot="label">Bind</span>
      </tabbar-item>
      <tabbar-item show-dot @on-item-click="unbind">
        <img slot="icon" src="../../assets/demo/icon_nav_msg.png">
        <span slot="label">Unbind</span>
      </tabbar-item>
      <tabbar-item show-dot @on-item-click="sendMsg">
        <img slot="icon" src="../../assets/demo/icon_nav_msg.png">
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item selected link="https://vux.li/demos/v2/?x-page=v2-doc-home#/demo">
        <img slot="icon" src="../../assets/demo/icon_nav_article.png">
        <span slot="label">Explore</span>
      </tabbar-item>
      <tabbar-item badge="2" @on-item-click="getInfo">
        <!--<img slot="icon" src="../../assets/demo/icon_nav_cell.png">-->
        <i slot="icon" class="fa fa-camera" aria-hidden="true" style="color:#77ca08"></i>
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>


<script>
  import { Grid, GridItem, GroupTitle, Tabbar, TabbarItem, Group, Cell } from 'vux';
  //import hexSha1 from 'src/common/js/sha1.js';
 // import api from 'src/api';

  export default {
    data () {
      return {
        Grid: '九宫格',
        GotoCell: '跳转到Cell'
      };
    },
    components: {
      Grid,
      GridItem,
      GroupTitle,
      Tabbar,
      TabbarItem,
      Group,
      Cell
    },
    methods: {
      onItemClick () {
        console.log('on item click');
      },
      getInfo () {
        api.getPicture({
          sourceType: 'camera',
          encodingType: 'jpg',
          mediaValue: 'pic',
          destinationType: 'url',
          allowEdit: true,
          quality: 50,
          targetWidth: 100,
          targetHeight: 100,
          saveToPhotoAlbum: false
        }, function (ret, err) {
          if (ret) {
            alert(JSON.stringify(ret));
          } else {
            alert(JSON.stringify(err));
          }
        });
      },
      bind () {
        //  绑定用户
        var push = api.require('push');
        push.bind({
          userName : '莫高勇',
          userId : 'mogaoyong'
        }, function(ret, err) {
          api.alert({
            msg : ret.status
          });
          if (ret.status) {
            api.alert({
              msg : '绑定成功'
            });
          } else {
            api.alert({
              msg : err.msg
            });
          }
        });
      },
      unbind () {
        var push = api.require('push');
        push.unbind({
          userName : '莫高勇',
          userId : 'mogaoyong'
        }, function(ret, err) {
          if (ret.status) {
            api.alert({
              msg : '解除绑定成功'
            });
          } else {
            api.alert({
              msg : err.msg
            });
          }
        });
      },
      sendMsg () {
        let appKey = this.$api.getAppKey();
        api.ajax({
          url : 'https://p.apicloud.com/api/push/message',
          method : "post",
          headers : {
            "X-APICloud-AppId" : "A6902235657073",
            "X-APICloud-AppKey" : appKey
          },
          dataType : "json",
          data : {
            "values" : {
              "title" : "消息标题",
              "content" : "消息内容",
              "type" : 2, //– 消息类型，1:消息 2:通知
              "platform" : 0 //0:全部平台，1：ios, 2：android
              //    "groupName" : "department", //推送组名，多个组用英文逗号隔开.默认:全部组。eg.group1,group2 .
              //    "userIds" : "testId" //推送用户id, 多个用户用英文逗号分隔，eg. user1,user2。
            }
          }
        }, function(ret, err) {
          //coding...
          alert(JSON.stringify(ret))
          alert(JSON.stringify(err))
        });
      }
    }
  };
</script>

<style scoped>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
</style>
