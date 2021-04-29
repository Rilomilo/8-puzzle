import Status from "./Status"

export default class SearchController{
    private open_ls:Status[]=[];
    private visited_ls:Status[]=[];
    private target: Status  | undefined;
    private result_ls:Status[]=[];

    constructor(data:number[]) {
        this.search(new Status(data,0,null));
    }

    // private isVisited(s:Status):boolean{
    //
    // }

    private reArrangeOpenList(){
        this.open_ls.sort((a,b)=>{
            return a.f-b.f;
        })
    }

    private calculateResult(s:Status){
        if(s && s.parent_status){
            this.calculateResult(s.parent_status);
        }
        this.result_ls.push(s);
    }

    public search(s0:Status){
        this.open_ls.push(s0);

        while (this.open_ls.length!=0){
            let s=this.open_ls.shift()!;
            // s.print()
            // 如果后面搜出了前面已经出现过了的状态，那么其f值一定>=前面的f值
            // if(this.isVisited(s)) continue;

            for (let r=1;r<=3;r++){
                for (let c=1;c<=3;c++){
                    if(s.findZero(r,c)!=null){
                        let s1=s.move(r,c);
                        this.open_ls.push(s1);
                        if(s1.isTargetStatus()){
                            this.target=s1;
                            return;
                        }
                    }
                }
            }
            this.reArrangeOpenList();
        }
    }

    get result():Status[]{
        if(this.result_ls.length==0){
            this.calculateResult(this.target!);
        }
        return this.result_ls;
    }

}