<template>
    <div id="app">
        <div class="mode-panel">
            <el-switch
                v-model="mode"
                active-text="编辑"
                inactive-text=""
                @change="switchMode"
            >
            </el-switch>
        </div>
        <div class="table">
            <div
                class="cell" 
                :class="index==0 && mode==0 || input_data[index]==0 && mode==1?'blank':''"
                v-for="(obj, index) in cells" 
                :key="index" 
                :style="obj" 
            >
                <div v-if="mode==0">{{index==0?'':index}}</div>
                <input v-if="mode==1" type="text" v-model.number="input_data[index]" maxlength="1">
            </div>
        </div>

        <div class="button-panel">
            <div v-if="mode==0" >
                <el-button type="primary" @click="previous">上一步</el-button>
                <el-button type="primary" @click="next">下一步</el-button>
            </div>
            <div v-else-if="mode==1">
                <el-button type="primary" @click="calculate">确定</el-button>
            </div>
            <div v-else-if="mode==2">
                <p>正在计算...</p>
            </div>
        </div>
    </div>
</template>

<script>
import SearchController from "../SearchController";

export default {
    name: "App",
    data:function () {
        return {
            mode:true,// 0为演示，1为编辑，2为正在计算
            // input_data:[2,8,3,1,6,4,7,0,5],
            input_data:[1,2,3,4,5,7,6,0,8],// 会飞的
            // input_data:[8,1,2,7,0,3,6,5,4]
            // input_data:[6,0,3,7,1,2,4,5,8],
            // input_data:[1,4,7,5,3,0,2,6,8],
            cells:[
                {top:"",left:""},
                {top:"",left:""},
                {top:"",left:""},
                {top:"",left:""},
                {top:"",left:""},
                {top:"",left:""},
                {top:"",left:""},
                {top:"",left:""},
                {top:"",left:""},
            ],
            status_ls:[],
            index:0
        }
    },
    methods:{
        calculate(){
            // 检查input合法性
            let flag=[];
            for(let i=0;i<9;i++) flag[i]=0;
            for(let i=0;i<9;i++) flag[this.input_data[i]]++;
            for(let i=0;i<9;i++){
                if(flag[i]!=1){
                    this.$message({
                        type:"error",
                        message:"输入数据不合法"
                    })
                    return;
                }
            }
            
            // 计算并渲染
            this.mode=2
            setTimeout(()=>{
                this.mode=false;
                this.status_ls=new SearchController(this.input_data).result;
                this.index=0;
                this.render();
            },100)
        },
        switchMode(value){
            if(value==true){
                this.reset()
            }else{
                this.render()
            }
        },
        /**
         * 根据index指向的状态渲染cell
         */
        render(){
            if(this.status_ls.length==0){
                this.$message.error("没有找到解");
                return;
            }
            let s=this.status_ls[this.index];

            for(let i in s.data){
                let t=s.data[i]
                this.cells[t].top=20+115*(Math.floor(i/3))+"px";
                this.cells[t].left=20+115*(Math.floor(i%3))+"px";
            }
        },
        /**
         * 按顺序排布cell
         */
        reset(){
            for(let i =0;i<9;i++){
                this.cells[i].top=20+115*(Math.floor(i/3))+"px";
                this.cells[i].left=20+115*(Math.floor(i%3))+"px";
            }
        },
        previous(){
            if(this.index>0){
                this.index--;
                this.render()
            }
        },
        next(){
            if(this.index<this.status_ls.length-1){
                this.index++;
                this.render()
            }
        }
    },
    created(){
        this.reset()
    }
}
</script>