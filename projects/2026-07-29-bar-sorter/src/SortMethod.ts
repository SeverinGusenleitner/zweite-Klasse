abstract class SortMethod{
    abstract sort(array:number[]):number[];
}
class bubbleSort extends SortMethod{
    override sort(array: number[]): number[] {
        let swapped;
        do{
            swapped = false;
            for(let i = 0; i < array.length -1;i++){
                let j = i + 1;
                if(array[i]!>array[j]!){
                    let temp = array[i];
                    array[i] = array[j]!;
                    array[j] = temp!;
                    swapped = true;
                }
            }

        } while(swapped);
        return array;
    }
}
export {bubbleSort, SortMethod}