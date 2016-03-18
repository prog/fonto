class Helpers {


	public static isHelpArg(arg: string): boolean {
		return (-1 !== ["--help", "-h"].indexOf(arg));
	}


	public static dirNameByFontName(fontName: string): string {
		return fontName
				.replace(" ", "-")
				.toLowerCase();
	}

}



export default Helpers;
