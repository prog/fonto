import * as path from "path";

import Command from "./../Command";
import Config from "./../Config";
import Helpers from "./../Helpers";
import Manager from "./../Manager";



class Install extends Command {


	private printHelp(): void {
		console.log(
				"Usage:\n" +
				"  fonto install\n"
		);
	}


	public getNames(): string[] {
		return ["install", "in", "i"];
	}


	public run(): void {
		const fontsPath = this.config.getPath();
		const requiredFonts = this.config.getFontDefs();
		const installedFonts: {[name: string]: string} = Manager.scanInstalled(fontsPath);

		Object.keys(requiredFonts).forEach((name: string) => {
			if (!installedFonts.hasOwnProperty(name) || installedFonts[name] !== requiredFonts[name]) {
				console.log("Installing font \"" + name + "\"...");
				Manager.install(fontsPath, name, requiredFonts[name]);
				console.log("done.\n");
			}
		});
		Object.keys(installedFonts).forEach((name: string) => {
			if (!requiredFonts.hasOwnProperty(name)) {
				console.log("Removing font \"" + name + "\"...");
				Manager.remove(fontsPath, name);
				console.log("done.\n");
			}
		});
	}


	public exec(argv: string[]): number {
		if (0 === argv.length) {
			this.run();
			return 0;
		}

		if (1 === argv.length && Helpers.isHelpArg(argv[0])) {
			this.printHelp();
			return 0;
		}

		this.printHelp();
		return 1;
	}

}



export default Install;
