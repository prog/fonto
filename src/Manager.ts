import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

import Helpers from "./Helpers";



class Manager {


	public static scanInstalled(fontsPath: string): {[name: string]: string} {
		const result: {[name: string]: string} = {};
		let names: string[];
		try {
			names = fs.readdirSync(fontsPath);
		} catch (e) {
			return result;
		}
		names.forEach((fontDir: string) => {
			let def: string[];
			try {
				def = fs.readFileSync(path.join(fontsPath, fontDir, ".fontofont"), "utf8").trim().split(":");
			} catch (e) {
				return;
			}
			const fontName = def[0];
			const fontDef = def.slice(1).join(":");
			if (Helpers.dirNameByFontName(fontName) === fontDir) {
				result[fontName] = fontDef;
			}
		});
		return result;
	}


	public static install(fontsPath: string, name: string, def: string): void {
		const stylesAndSubset = def.split(":");
		const styles = stylesAndSubset[0];
		const subset = stylesAndSubset[1] || "";
		const fontDir = Helpers.dirNameByFontName(name);

		let cmd = require.resolve("goog-webfont-dl");
		cmd += " --font \"" + (name) + "\"";
		cmd += " --styles \"" + (styles) + "\"";
		cmd += " --subset \"" + (subset) + "\"";
		cmd += " --all";
		cmd += " --destination \"" + (path.join(fontsPath, fontDir)) + "\"";
		cmd += " --out \"" + (path.join(fontsPath, fontDir, fontDir + ".css")) + "\"";
		cmd += " --prefix \"\"";

		execSync("mkdir -p \"" + path.join(fontsPath, fontDir) + "\"");
		execSync(cmd);
		fs.writeFileSync(path.join(fontsPath, fontDir, ".fontofont"), name + ":" + def, "utf8");
	}


	public static remove(fontsPath: string, name: string): void {
		execSync("rm -r \"" + path.join(fontsPath, Helpers.dirNameByFontName(name)) + "\"");
	}

}



export default Manager;
