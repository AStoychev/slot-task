import { Slot } from "./slot";

export class Simulator {
    private readonly slot: Slot;
    private readonly numSpins: number;
    private readonly betAmount: number;

    constructor(slot: Slot, numSpins: number, betAmount: number) {
        this.slot = slot;
        this.numSpins = numSpins;
        this.betAmount = betAmount;
    }

    public runSimulation(): void {
        let totalWins = 0;
        let totalBets = 0;
        let winLines = 0
        const startTime = Date.now();

        for (let i = 0; i < this.numSpins; i++) {
            const [sumLinesPayout, countWinLine] = this.slot.simulate()
            totalBets += this.betAmount;
            totalWins += sumLinesPayout;
            winLines += countWinLine
        }

        const endTime = Date.now();
        const executionTime = endTime - startTime;

        this.printResults(totalWins, totalBets, winLines, executionTime);
    }

    private printResults(totalWins: number, totalBets: number, winLines: number, executionTime: number): void {
        console.log('\nSIMULATION')
        console.log(`Total Wins: ${totalWins - totalBets}`);
        console.log(`Total Bets: ${totalBets}`);
        console.log(`Total Wins Lines: ${winLines}`);
        console.log(`Execution Speed: ${executionTime} ms`);
    }
}