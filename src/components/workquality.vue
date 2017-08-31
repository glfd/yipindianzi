<!--工单质量-->
<template>
    <div class="workquality">
        <div class="workqualitytitle" >
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">工单</el-breadcrumb-item>
                <el-breadcrumb-item>质量报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="workqualitytitlecontent">
            <my-table-one :tabledataurl="tabledataurl" :tablecolumn="tablecolumn" :selectdata="selectdata"
                          :editbut="{'edit':false,'remove':false}" :addshow="addshow" @selected="selected">
                <el-table-column
                        property="str"
                        label="问题名称">
                </el-table-column>
                <el-table-column
                        sortable
                        property="number"
                        label="出现次数">
                </el-table-column>
                <el-table-column
                        label="占比(%)">
                    <template scope="scope">
                        <span>{{ scope.row.number/scope.row.total*100 | capitalize }}%</span>
                    </template>
                </el-table-column>
            </my-table-one>
        </div>
    </div>
</template>
<script>
    var selectdata = [
        {
            "label":"问题",
            "value":"str"
        }
    ]
    import MyTableOne from './MyTableOne.vue'
    import myurl from '../json/myurl.json'
    export default {
        data: function () {
            return {
                tabledataurl: myurl.getProblemByWid+'?wid='+this.$route.query.wid,
                tablecolumn: [],
                selectdata: selectdata,
                addshow: false,
                questionnub:0
            }
        },
        filters: {
            capitalize: function (val) {
                return val.toFixed(2)
            }
        },
        methods: {  // 方法
            selected: function () {
                
            }
        },
        components: { // 组件
            'my-table-one': MyTableOne
        },
        mounted: function () { // DOM加载完成事件
        }
    }
</script>
<style lang="less">
    .workquality{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #F0F3F7;
        position: relative;
        .workqualitytitle{
            height: 30px;
            border-bottom: 1px solid red;
            line-height: 30px;
            font-size: 14px;
            font-weight: 600;
            .el-breadcrumb{
                line-height: 30px;
            }
        }
        .workqualitytitlecontent{
            position: absolute;
            top: 30px;
            left: 0 ;
            right: 0 ;
            bottom: 0 ;
        }
    }
</style>