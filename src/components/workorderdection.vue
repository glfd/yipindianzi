<!--工单详情-->
<template>
    <div class="workorderdection"  v-loading="tablelogin" element-loading-text="拼命加载中" >
        <div class="workorderdectiontitle" >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">工单</el-breadcrumb-item>
                <el-breadcrumb-item>{{ $route.query.id }}详细信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="workorderdectioncontent">

            <my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
                          :addshow="false" :editbut="editbut" :othercolumn="true" @selected="selected" @edit="edit">
                <el-table-column label="工单编号" width="400px">
                    <template scope="scope">
                        <span>{{ worknub }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        property="bid"
                        label="条形码">
                </el-table-column>

                <el-table-column label="其他" width="150px">
                    <template scope="scope">
                        <el-button
                                type="text"
                                @click.native.prevent="seleteother(scope.row)"
                                size="small">
                            查看
                        </el-button>
                    </template>
                </el-table-column>
            </my-table-one>
        </div>
    </div>

</template>

<script>
    import MyMenu from '../components/menu.vue';/*菜单组件*/
    import myurl from '../json/myurl.json';
    import MyTableOne from '../components/MyTableOne.vue';


    var tablecolumn = [

    ];

    var selectdata = [
        {
            property:"wNub",
            label:"工单编号"
        }
    ];
    export default{
        data:function(){
            return {
                tabledataurl:myurl.getmatterbywid+"?s="+this.$route.query.s+"&&e="+this.$route.query.e,
                tablecolumn:tablecolumn,
                dialogFormVisible:false,
                tablelogin:false,
                form:{
                    "wNub":"",

                },
                worknub:this.$route.query.wNub,
                tablethis:"",    /*Table组件this*/
                selectedval:null,
                selectdata:selectdata,
                selectedOptions:[],
                editbut:{'edit':false,'remove':false}
            }

        },
        methods:{
            selected:function(val){
                this.selectedval=val;

            },
            seleteother:function(val){
                console.log(val);
                var _this = this;
                this.$router.push({ path: '/workorderall',query: { id:val.bid}})
            },
            edit:function(tablethis){
                this.dialogFormVisible=true;
                this.tablethis = tablethis;
            },
            editshow:function() {

            }
        },
        components: { //组件放这里
            'my-menu':MyMenu,
            'my-table-one':MyTableOne
        },
        mounted: function () {       //DOM加载完成事件
            this.$route.query.wNub;


        }


    }

</script>

<style lang="less">
    .workorderdection{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #F0F3F7;
        position: relative;
        .workorderdectiontitle{
            height: 30px;
            border-bottom: 1px solid red;
            line-height: 30px;
            font-size: 14px;
            font-weight: 600;
            .el-breadcrumb{
                line-height: 30px;
            }
        }
        .workorderdectioncontent{
            position: absolute;
            top: 30px;
            left: 0 ;
            right: 0 ;
            bottom: 0 ;
        }
    }

</style>