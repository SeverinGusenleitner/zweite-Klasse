/**
 * Describes where in the train a part is allowed to be placed.
 *
 * - `MustBeFirst` — this part may only be added when the train is empty (e.g. a locomotive).
 * - `MustBeLast`  — once this part is added, nothing can be appended after it (e.g. a caboose).
 * - `None`        — no positional restriction; the part can be placed anywhere after the locomotive.
 */
export enum PartRestriction {
    MustBeFirst,
    MustBeLast,
    None,
}

/**
 * Abstract base class for every part that can be added to a train.
 *
 * Every concrete wagon class (Locomotive, PassengerWagon, CargoWagon, …) must extend
 * this class and implement (or override) the three members below.
 *
 * The `Train` class works exclusively with `TrainPart` references, so all logic
 * that the train needs must be accessible through this base class.
 */
export abstract class TrainPart {
    /**
     * Positional restriction for this part.
     *
     * The `Train` class reads this value to enforce ordering rules without
     * needing to know the concrete type of the part.
     *
     * Each subclass must declare this as a `readonly` property and initialise
     * it with the appropriate `PartRestriction` member.
     */


    /**
     * The maximum cargo weight this part contributes, in tons.
     *
     * The default implementation returns `0`, which is correct for every part
     * that carries no cargo (locomotive, passenger wagon, dining wagon, caboose).
     *
     * **Override this getter in `CargoWagon`** to return the actual maximum
     * weight so that the heavy-cargo warning can be computed without
     * `instanceof` checks.
     */
    get cargoWeightTons(): number {
        return 0;
    }

    /**
     * Creates and returns the `HTMLElement` that visually represents this part.
     *
     * The returned element will be appended directly to the train preview
     * container by `Train.render()`.  Use `document.createElement` to build
     * the element, set an appropriate CSS class, and populate it with the
     * part's data (title, detail value, …).
     */
    abstract render(): HTMLElement;
}
export class Locomotive extends TrainPart {
    override render() {
        const item = document.createElement('div') as HTMLDivElement;
        item.classList.add('locomotive');
        item.classList.add('part');

        const header = document.createElement('div') as HTMLHeadElement;
        header.textContent = 'LOCOMOTIVE';
        header.className = "part-title";

        const text = document.createElement('div') as HTMLSpanElement;
        text.textContent = '2400 kW';
        text.className = "part-detail";

        item.appendChild(header);
        item.appendChild(text);

        return item;
    }
}
export class Passenger extends TrainPart {
    override render() {
        const item = document.createElement('div') as HTMLDivElement;
        item.classList.add('passenger');
        item.classList.add('part');

        const header = document.createElement('div') as HTMLDivElement;
        header.textContent = 'PASSENGER';
        header.className = "part-title";

        const text = document.createElement('div') as HTMLDivElement;
        text.textContent = '48 seats';
        text.className = "part-detail";

        item.appendChild(header);
        item.appendChild(text);

        return item;
    }
}
export class Cargo extends TrainPart {
    override get cargoWeightTons(): number {
        return 35;
    }
    override render() {
        const item = document.createElement('div') as HTMLDivElement;
        item.classList.add('cargo');
        item.classList.add('part');

        const header = document.createElement('div') as HTMLDivElement;
        header.textContent = 'CARGO';
        header.className = "part-title";

        const text = document.createElement('div') as HTMLDivElement;
        text.textContent = '35 t max';
        text.className = "part-detail";

        item.appendChild(header);
        item.appendChild(text);

        return item;
    }
}
export class Dining extends TrainPart {
    override render() {
        const item = document.createElement('div') as HTMLDivElement;
        item.classList.add('dining');
        item.classList.add('part');

        const header = document.createElement('div') as HTMLDivElement;
        header.textContent = 'DINING';
        header.className = "part-title";

        const text = document.createElement('div') as HTMLDivElement;
        text.textContent = '8 tables';
        text.className = "part-detail";

        item.appendChild(header);
        item.appendChild(text);

        return item;
    }
}
export class Caboose extends TrainPart {
    override render() {
        const item = document.createElement('div') as HTMLDivElement;
        item.classList.add('caboose');
        item.classList.add('part');

        const header = document.createElement('div') as HTMLDivElement;
        header.textContent = 'CABOOSE';
        header.className = "part-title";

        const text = document.createElement('div') as HTMLDivElement;
        text.textContent = '2 crew';
        text.className = "part-detail";

        item.appendChild(header);
        item.appendChild(text);

        return item;
    }
}
export class Train {
    private trainParts: TrainPart[] = [];
    private errorEl: HTMLDivElement;
    private container: HTMLDivElement;
    private warned: boolean = false;
    constructor(errorId: string = 'message', containerId: string = 'train') {
        this.errorEl = document.getElementById(errorId) as HTMLDivElement;
        this.container = document.getElementById(containerId) as HTMLDivElement;
        this.render();
    }

    private throwError(message: string): void {
        this.errorEl.textContent = message;
    }
    private clearError(): void {
        this.errorEl.innerHTML = '';
    }
    private render(): void {
        this.container.innerHTML = '';
        for (const part of this.trainParts) {
            this.container.appendChild(part.render()!);
        }
    }
    removeLast(): void {
        this.trainParts.pop();
        this.clearError();
        this.render();
    }
    private checkCaboose():boolean {
        const lastElement = this.trainParts[this.trainParts.length - 1];
        if (lastElement instanceof Caboose) {
            return true;
        }
        return false;
    }
    private checkWeight():boolean {
        let totalWeight = 0;
        for (const part of this.trainParts) {
            totalWeight += part.cargoWeightTons;
        }
        if (totalWeight > 100) {
            return true;
        }
        return false;
    }
    private checkLocomotive():boolean{
        for(const part of this.trainParts){
            if(part instanceof Locomotive){
                return true;
            }
        }
        return false;
    }
     checkErrors(button:string){
        if (button !== 'locomotive' && this.trainParts.length === 0) {
            this.throwError('You need to place a locomotive first!');
            return true;
        }
        if (button === "locomotive" && this.checkLocomotive()) {
            this.throwError('A train can only have one locomotive!');
            return true;
        }
        if (this.checkCaboose()) {
            this.throwError('The caboose must stay at the end of the train!');
            return true;
        }
        return false
    }
     checkWarnings():void{
        if (this.checkWeight() && this.warned === false) {
            this.throwError('Warning: this train is carrying a lot of cargo!');
            this.warned = true;
        }
    }

     createLocomotive(): void {
        this.trainParts.push(new Locomotive());
        this.render();
        this.errorEl.innerHTML = "";
    }
     createPassenger():void{
        this.trainParts.push(new Passenger());
        this.render();
        this.errorEl.innerHTML = "";

    }
     createCargo():void{
        this.trainParts.push(new Cargo());
        this.render();
        this.errorEl.innerHTML = "";

    }
     createDining():void{
        this.trainParts.push(new Dining());
        this.render();
        this.errorEl.innerHTML = "";

    }
     createCaboose():void{
        this.trainParts.push(new Caboose());
        this.render();
        this.errorEl.innerHTML = "";

    }
}
