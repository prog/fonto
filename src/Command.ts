import * as path from "path";

import Config from "./Config";



abstract class Command {


	protected config: Config;


	public constructor(config: Config) {
		this.config = config;
	}


	public abstract getNames(): string[];
	public abstract exec(args: string[]): number;

}



export default Command;
