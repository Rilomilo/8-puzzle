import Node from "./Node";
import Heap from "./Heap";

export default class SearchController{
    private open:Heap=new Heap();
    private closed:Map<number,Node>=new Map<number, Node>(); // closed表存放已经搜索过的状态，每个状态用一个9位数字来索引
    private status:number[]=[]; // 当前状态
    // @ts-ignore
    private z:number; // 空位下标
    private offset:number[]=[-3,-1,1,3];
    public cnt:number=0; // 搜索过的节点计数
    public result_node_ls:Node[]=[];

    constructor(data:number[]) {
        let node=new Node(data,0,null);
        this.open.push(node);
        this.search();
    }

    /**
     * 从目标节点，依次寻找父节点，构造出解
     * @param s 目标节点
     */
    private calculateResult(s:Node){
        if(s.parent_status){
            this.calculateResult(s.parent_status);
        }
        this.result_node_ls.push(s);
    }

    /**
     * 将节点状态读取为当前状态
     * @param n
     */
    private load(n:Node){
        for(let i=0;i<9;i++){
            this.status[i]=n.data[i];
            if(this.status[i]==0){
                this.z=i;
            }
        }
    }

    /**
     * 交换两个位置的数字
     * @param i 第一个要交换的数字的位置
     * @param j 第二个要交换的数字的位置
     */
    private swap(i:number,j:number){
        let t=this.status[i];
        this.status[i]=this.status[j];
        this.status[j]=t;
    }

    /**
     * 启发式搜索
     */
    public search(){
        while (!this.open.empty()){
            let node=this.open.pop()!;
            // node.print();
            this.cnt++;

            if(node.f==node.depth){
                this.calculateResult(node);
                break;
            }

            this.load(node);

            for(let i=0;i<4;i++){
                let d=this.z+this.offset[i];
                if(
                    d<0 || d>8 || // 不能越界交换
                    (i==1 || i==2) && Math.floor(this.z/3)!=Math.floor(d/3) // 不能跨行相邻
                ) continue;
                this.swap(this.z,d);
                let t=Node.dump(this.status);

                if(this.closed.get(t)==undefined || this.closed.get(t)!.depth>node.depth+1){
                    // 之前没有访问过t状态，或者t状态比之前访问的closed表中的状态更优的情况下，将t加入到open表中
                    let node1=new Node(this.status,node.depth+1,node);
                    this.open.push(node1);
                    this.closed.set(t,node1);
                }

                this.swap(this.z,d);
            }
        }
    }
}