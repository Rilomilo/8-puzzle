import Node from "./Node"

/**
 * 小顶堆
 */
export default class Heap {
    private data:Node[];
    private _size:number;

    constructor() {
        this.data=[];
        this._size=0;
    }

    /**
     * 将一个新的节点插入到堆中
     * @param t 待插入节点
     */
    public push(t:Node):void{
        this._size++;
        let i;
        for (i=this._size; i>>1!=0 && this.data[i>>1].f>t.f; i>>=1){
            this.data[i]=this.data[i>>1];
        }
        this.data[i]=t;
    }

    /**
     * 取出堆中f值最小的节点
     * @returns f值最小的节点
     */
    public pop():Node|undefined{
        let n=this.data[1];
        let t=this.data[this._size--];
        let i=1;
        for(let child=i<<1; i<<1<=this._size; i=child,child<<=1){
            if(child+1<=this._size && this.data[child+1].f<this.data[child].f) child++;
            if(this.data[child].f<t.f){
                this.data[i]=this.data[child];
            }else {
                break;
            }
        }
        this.data[i]=t;
        return n;
    }

    /**
     * 判断堆是否为空
     * @returns true表示堆已经空
     */
    public empty():boolean{
        return this._size==0;
    }

    get size(): number {
        return this._size;
    }
}