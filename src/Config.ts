import * as fs from "fs";



interface IData {
	path?: string;
	fonts?: {[name: string]: string};
}



class Config {


	private fileName: string;
	private data: IData = {};


	public constructor(fileName: string = null) {
		this.fileName = fileName;
		if (null !== fileName) {
			this.load(fileName);
		}
	}


	public load(fileName: string): void {
		this.data = JSON.parse(fs.readFileSync(fileName, "utf8"));
	}


	public write(fileName: string = null): void {
		if (null === fileName) {
			fileName = this.fileName;
		}
		fs.writeFileSync(fileName, JSON.stringify(this.data, null, "\t"));
	}


	public getFontDefs(): {[name: string]: string} {
		return this.data.fonts;
	}


	public setFontDefs(fontDefs: {[name: string]: string}): void {
		this.data.fonts = fontDefs;
	}


	public getPath(): string {
		return this.data.path || "fonts";
	}


	public setPath(path: string): void {
		this.data.path = path;
	}

}



export default Config;
