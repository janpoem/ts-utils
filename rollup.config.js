import fs from 'node:fs';
import { resolve } from 'node:path';
import { swc, defineRollupSwcOption  } from 'rollup-plugin-swc3';
import { dts } from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const outputDir = resolve('./dist');

const rmdir = (dir) =>
	dir &&
	fs.existsSync(dir) &&
	fs.statSync(dir).isDirectory() &&
	fs.rmSync(dir, { recursive: true });

const joinPath = (...segments) => segments.filter(Boolean).join('/');

const entries = [
	{
		entry: 'src/index.ts',
		output: outputDir,
	},
	{
		entry: 'src/http/index.ts',
		output: joinPath(outputDir, 'http'),
	},
];

const config = [];

// biome-ignore lint/complexity/noForEach: allow forEach here
entries.forEach(({ entry, output }) => {
  config.push({
		input: entry,
		output: [
			{
				file: joinPath(output, 'index.js'),
				format: 'cjs',
			},
			{
				file: joinPath(output, 'index.mjs'),
				format: 'es',
				exports: 'named',
			},
		],
		plugins: [
			rmdir(output),
			swc(defineRollupSwcOption({
				include: /\.[mc]?[jt]sx?$/,
				exclude: /node_modules/,
				tsconfig: 'tsconfig.json',
				jsc: {
					minify: {
						compress: true,
						mangle: true,
					},
				}
			})),
			nodeResolve({}),
			commonjs({
				extensions: ['.node', '.cjs', '.js', '.mjs'],
			}),
		],
		external: ['fs', 'path'],
	});
  config.push({
		input: entry,
		output: [
			{
				file: joinPath(output, 'index.d.ts'),
				format: 'es',
			},
		],
		plugins: [dts()],
	});
});

export default config;
