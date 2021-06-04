export default class Node{
    public data:number[]; // 用一个一维数组存储当前的状态
    public depth:number; //g，搜索深度
    private _f: number | undefined; // 估价函数的值
    public parent_status:Node|null; // 该状态的父状态，也就是该状态的上一个状态

    constructor(data: number[], depth: number, parent: Node | null) {
        this.data=Array.from(data);
        this.depth=depth;
        this.parent_status=parent;
    }

    public print(){
        console.log("--------------------------------------");
        console.log("|",this.data[0],this.data[1],this.data[2],"|");
        console.log("|",this.data[3],this.data[4],this.data[5],"|");
        console.log("|",this.data[6],this.data[7],this.data[8],"|");
        console.log("f=",this.f,"depth=",this.depth);
        console.log("dump=",Node.dump(this.data));

    }

    /**
     * 将给定的状态转化为数字
     * @param data
     */
    public static dump(data:number[]):number{
        let t=0;
        for(let i=0;i<9;i++){
            t=t*10+data[i];
        }
        return t;
    }

    /**
     * 计算f值
     */
    get f():number{
        if(!this._f){
            let target=[[1,1],[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0]];
            let sum=0;
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    sum+=Math.abs(target[this.data[i*3+j]][0]-i);
                    sum+=Math.abs(target[this.data[i*3+j]][1]-j);
                }
            }
            this._f=sum+this.depth;
        }
        return this._f;
    }
}