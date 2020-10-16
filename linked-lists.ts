interface ListNode {
    value: any;
    next: ListNode | null;
    previous?: ListNode | null;
}
interface SearchResult {
    index: number;
    result: any;
    lastResultIndex?: number;
}

class LinkedList {
    private headNode: ListNode;
    private tailNode: ListNode;
    protected listLength: number;

    constructor(headValue: any){
        this.headNode = headValue.value && headValue.next ? headValue : this.valueToNode(headValue);
        this.tailNode = this.headNode.next === null ? this.headNode : this.findTail(this.headNode);
        this.listLength = 1;
    }

    protected valueToNode = (value: any, next: ListNode|null = null ): ListNode => ({
        value: value,
        next: next
    });

    get head(): ListNode {
        return this.headNode;
    }
    get tail(): ListNode {
        return this.tailNode;
    }
    get length(): number {
        return this.listLength;
    }

    public add( value: any ): void {
        const newNode: ListNode = this.valueToNode(value);
        this.tailNode.next = newNode;
        this.tailNode = newNode;
        this.listLength++;
    }

    public delete(value: any): ListNode|false {
        if( value === this.headNode.value && this.headNode.next !== null ){
            this.headNode = this.headNode.next;
            return this.headNode;
        }
        if( !value ) return this.headNode;
        let current: ListNode = this.headNode;
        while(true){
            if( current.next === null ) return false;
            if( current.next.value === value ){
                current.next = current.next.next;
                if( current.next === null ) this.tailNode = current;
                this.listLength--;
                return this.headNode;
            }
        }
    }

    public reverse(): ListNode {
        let previous: null|ListNode = null;
        let current: ListNode = this.headNode;
        let next: ListNode|null = this.headNode.next;
        while(next !== null){
            next = current.next;
            current.next = previous;
            previous = current;
            if( next !== null) current = next;
        }
        this.tailNode = this.headNode;
        this.headNode = current;
        return current;
    }

    public find(value: any, verbose: boolean = false, index: boolean = false, lastIndex: boolean = false): any {
        const searchResult: SearchResult = {
            index: 0,
            result: false,
            lastResultIndex: -1
        };
        if( this.headNode.value === value ){
            searchResult.result = this.headNode;
            searchResult.lastResultIndex = 0;
            if( !lastIndex ) return searchResult;
        }
        let current: ListNode = this.headNode;
        while(true){
            if( current.value === value ){
                searchResult.result = current;
                searchResult.lastResultIndex = searchResult.index;
                if(!lastIndex) break;
            }
            if( current.next === null ) return lastIndex ? searchResult.lastResultIndex : false;
            current = current.next;
            searchResult.index++;
        }
        if( verbose || index ) return verbose ? {index: searchResult.index, result: searchResult.result} : searchResult.index;
        return searchResult.result;
    }

    public indexOf(value: any): number|false {
        const result = this.find(value, false, true);
        return result ? +result : -1;
    }
    public lastIndexOf(value: any): number|false {
        const result = this.find(value, false, false, true);
        return +result >= 0 ? +result : -1;
    }

    private findTail(node: ListNode): ListNode {
        let current: ListNode = node;
        while(true){
            if( current.next === null ) return current;
            current = current.next;
        }
    }

}