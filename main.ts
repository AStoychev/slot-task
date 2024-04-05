import { config } from "./configuration";
import { Slot } from "./controllers/slot";
import { Simulator } from "./controllers/simulator";

const slot = new Slot(config);
slot.spin();

// Start of simulator
const numSpins = 1000000;
const betAmount = 1;

const simulation = new Simulator(slot, numSpins, betAmount);
simulation.runSimulation();