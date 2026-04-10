import { LinkedList} from "./linkedList";
const linkedList = new LinkedList();
linkedList.addNodeInStart({title:"flashing lights",artist:"kanye"});
linkedList.addNodeInStart({title:"flashing lights",artist:"kanye"});
linkedList.addNodeInStart({title:"flashing lights",artist:"kanye"});
linkedList.addNodeInStart({title:"flashing lights",artist:"kanye"});
linkedList.insertAfter(2,{title:"billie jean",artist:"micheal jackson"});
linkedList.addNodeToTail({title:"blinding lights", artist:"the weeknd"})
linkedList.logNodes();