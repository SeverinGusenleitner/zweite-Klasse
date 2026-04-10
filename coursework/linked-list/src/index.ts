import { LinkedList} from "./linkedList";
import './styles.css';
const linkedList = new LinkedList();
linkedList.addNodeInStart({title:"flashing lights",artist:"kanye west"});
linkedList.insertAfter(1,{title:"billie jean",artist:"micheal jackson"});
linkedList.addNodeToTail({title:"blinding lights", artist:"the weeknd"});
linkedList.logNodes();