import Node from "./Node"

/**
 * 小顶堆
 */
export default class Heap {
    private data:Node[];
    private size:number;

    constructor() {
        this.data=[];
        this.size=0;
    }

    public push(t:Node):void{
        this.size++;
        let i;
        for (i=this.size;i>>1!=0 && this.data[i>>1].f>t.f;i>>=1){
            this.data[i]=this.data[i>>1];
        }
        this.data[i]=t;
    }

    public pop():Node|undefined{
        let n=this.data[1];
        let t=this.data[this.size--];
        let i=1;
        for(let child=i<<1; i<<1<=this.size; i=child,child<<=1){
            if(child+1<=this.size && this.data[child+1].f<this.data[child].f) child++;
            if(this.data[child].f<t.f){
                this.data[i]=this.data[child];
            }else {
                break;
            }
        }
        this.data[i]=t;
        return n;
    }

    public empty():boolean{
        return this.size==0;
    }
}