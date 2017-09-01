<!--工单详情-->
<template>
    <div class="workorderdection" >
        <div class="title"  v-loading="tablelogin" element-loading-text="拼命加载中">
            <el-table
                    :data="tableData3"
                    border
                    height="638"
                    style="width: 100%">
                    <el-table-column :label="bid" width="360">

                        <el-table-column
                                prop="content"
                                label="测试内容"
                                width="220"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="testtype"
                                label="测试类型"
                                width="140"
                        >
                        </el-table-column>

                    </el-table-column>
                    <el-table-column :label="mName" width="380">
                        <el-table-column
                                prop="stand"
                                label="标准"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="testfirst"
                                label="半成品测试"
                                width="200"
                        >
                        </el-table-column>
                    </el-table-column>
                <el-table-column :label="version" width="400">
                    <el-table-column
                            prop="testsecond"
                            label="成品测试"
                            width="200"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="testthird"
                            label="动平衡测试"
                            width="200"
                    >
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script>
    import MyMenu from '../components/menu.vue';/*菜单组件*/
    import myurl from '../json/myurl.json';
    export default {
        data: function () {
            return {
                tableData3: [],
                bid:"条形码",
                mName:"产品名称",
                version:"型号",
                tablelogin:false


            }

        },
        methods: {

        },
        components: { //组件放这里
            'my-menu': MyMenu
        },
        mounted: function () {       //DOM加载完成事件

            var _this = this;
            _this.tablelogin = true;
            _this.$http.post(myurl.getdate,{"id":this.$route.query.id},{emulateJSON: true})
                .then(
                    function (response){
                        console.log(response);
                        _this.tableData3 = [];
                        _this.bid = '条形码：'+response.body[0].bid;
                        _this.mName = '产品名称：'+response.body[0].mName;
                        _this.version = '产品型号：'+response.body[0].version;
                        for(var i=0;i<response.body[0].data.length;i++){
                            var arr = {};
                            arr.testfirst = response.body[0].data[i].gw1;
                            arr.testsecond = response.body[0].data[i].gw2;
                            arr.testthird = response.body[0].data[i].gw3;
                            arr.stand = response.body[0].data[i].standard;
                            arr.content = response.body[0].data[i].testContent;
                            arr.testtype = response.body[0].data[i].testType;
                            _this.tableData3.push(arr);
                        }
                        console.log(_this.tableData3);
                        _this.tablelogin = false;
                    },
                    function (error){
                        _this.$message({
                            showClose: true,
                            message: '请求失败！',
                            type: 'error'
                        });
                        _this.tablelogin = false;
                    });

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

    }

</style>