interface Pos {
    r:number,
    c:number
}

export default class Status{
    private data:number[];
    private depth:number;
    public parent_status:Status|null;

    constructor(a: number[], depth: number, parent: Status | null) {
        this.data=Array.from(a);
        this.depth=depth;
        this.parent_status=parent;
    }

    public static copyConstructor(s:Status,depth:number,parent:Status):Status{
        let s1=new Status(s.data, depth, parent);
        return s1;
    }

    public get(r:number,c:number):number{
        return this.data[(r-1)*3+(c-1)];
    }

    public set(r:number,c:number,n:number){
        this.data[(r-1)*3+(c-1)]=n;
    }

    /**
     * 查找指定位置周围的空位位置
     * @param r0 行
     * @param c0 列
     */
    public findZero(r0:number,c0:number):Pos|null{
        let offset=[[-1,0],[1,0],[0,-1],[0,1]];

        for(let i=0;i<4;i++){
            let r=r0+offset[i][0];
            let c=c0+offset[i][1];
            if(this.get(r,c)==0){
                return {r,c};
            }
        }

        return null;
    }

    /**
     * 移动位于r行c列的数字
     * @param r0
     * @param c0
     */
    public move(r0:number,c0:number):Status{
        let s=Status.copyConstructor(this,this.depth+1,this);
        let {r,c}=s.findZero(r0,c0)!;
        let t=s.get(r,c);
        s.set(r,c,this.get(r0,c0));
        s.set(r0,c0,t);
        return s;
    }

    private getInPlaceCount():number{
        let in_place=[1,2,3,8,0,4,7,6,5];
        let cnt=0;
        for(let i=0;i<in_place.length;i++){
            if(in_place[i]==0) continue;
            if(this.data[i]==in_place[i]){
                cnt++;
            }
        }
        return cnt;
    }

    public isTargetStatus():boolean{
        if(this.getInPlaceCount()==8){
            return true;
        }else{
            return false;
        }
    }

    public print(){
        console.log(this.data[0],this.data[1],this.data[2])
        console.log(this.data[3],this.data[4],this.data[5])
        console.log(this.data[6],this.data[7],this.data[8])
        console.log("f=",this.f)
    }

    /**
     * 计算f值
     */
    get f():number{
        return this.depth+8-this.getInPlaceCount();
    }
}