import * as path from "path";

import Command from "./../Command";
import Config from "./../Config";
import Helpers from "./../Helpers";

import Install from "./Install";



interface CommandClass {
	new(config: Config): Command
}

const commandClasses: CommandClass[] = [
	Install,
];



class Main {


	private config: Config;
	private commands: Command[] = [];


	private printHelp(): void {
		console.log("Usage: fonto <command>\n");
	}


	private getCommand(name: string): Command {
		for (let command of this.commands) {
			if (-1 !== command.getNames().indexOf(name)) {
				return command;
			}
		}
		return null;
	}


	public constructor() {
		const configPath = path.join(process.cwd(), "fonto.json");
		this.config = new Config(configPath);
		commandClasses.forEach((commandClass: CommandClass) => {
			this.commands.push(new commandClass(this.config));
		});
	}


	public exec(args: string[]): number {
		if (0 === args.length) {
			this.printHelp();
			return 1;
		}

		const cmd = args[0];
		if (0 === args.length) {
			if (Helpers.isHelpArg(cmd)) {
				this.printHelp();
				return 0;
			}
		}

		const command = this.getCommand(cmd);
		if (null === command) {
			this.printHelp();
			return 1;
		}

		return command.exec(args.slice(1));
	}

}



export default Main;
