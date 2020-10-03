
export class TreeNode {
    expandable: boolean;
    name: string;
    level: number;

    constructor(node: any = {}) {
        this.expandable = node.expandable;
        this.name = node.name || '';
        this.level = node.level || 0;
    }
}
