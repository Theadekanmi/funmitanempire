
/** @type {import('next').NextConfig} */
declare interface nextConfigType {
	static unoptimized: boolean;

	static remotePatterns: ({
	static protocol: string;
	} | any | string)[];
}
