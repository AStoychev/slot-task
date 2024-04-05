import { gameConfig } from "../interfaces/gameConfig";

export class Slot {
    private readonly config: gameConfig;

    constructor(config: gameConfig) {
        this.config = config;
    }

    public simulate() {
        const result = this.spinReels();
        const linesPayout = this.checkForWinningLine(result);

        let countWinLine = linesPayout.filter(num => num !== 0).length;
        let sumLinesPayout = linesPayout.reduce((acc, curr) => acc + curr, 0);

        return [sumLinesPayout, countWinLine]
    }

    public spin(): void {
        const reels = this.spinReels();
        const linesPayout = this.checkForWinningLine(reels);

        console.log('Reels Position:');
        for (let i = 0; i < reels.length; i++) {
            console.log(`Reel ${i + 1}: ${reels[i].join(', ')}`);
        }

        console.log('\nScreen Symbols:');
        for (let i = 0; i < reels[0].length; i++) {
            console.log(`Line ${i + 1}: ${reels.map(reel => reel[i]).join(', ')}`);
        }

        console.log('\nPayout:');
        for (let i = 0; i < linesPayout.length; i++) {
            console.log(`Line ${i + 1}: ${linesPayout[i]}`);
        }
    }

    private spinReels(): number[][] {
        const { reelsCount, rowsCount, symbols } = this.config;
        const result: number[][] = [];

        for (let i = 0; i < reelsCount; i++) {
            const reel = this.config.reels[i];
            const reelSymbols: number[] = [];

            for (let j = 0; j < rowsCount; j++) {
                const symbolIndex = Math.floor(Math.random() * reel.length);
                const symbol = symbols[reel[symbolIndex]][Math.floor(Math.random() * symbols[reel[symbolIndex]].length)];
                reelSymbols.push(symbol);
            }
            result.push(reelSymbols);
        }
        return result;
    }

    private checkForWinningLine(result: number[][]): number[] {
        const { lines } = this.config;
        const linesPayout: number[] = [];
        const digits = [];

        for (let i = 0; i < lines.length; i++) {
            for (let j = 0; j < lines[i].length; j++) {
                digits.push(result[j][lines[i][j]])
            }
        }

        // Get every 5 chunks
        for (let i = 0; i <= digits.length - 5; i += 5) {
            const chunk = digits.slice(i, i + 5);

            const areEqual = chunk.every((num, index, array) => num === array[0]);
            if (areEqual) {
                linesPayout.push(chunk.reduce((acc, curr) => acc + curr, 0))
            } else {
                linesPayout.push(0)
            }
        }

        return linesPayout;
    }
}