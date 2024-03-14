import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import alias from '@rollup/plugin-alias';
import copy from 'rollup-plugin-copy';
import svgr from '@svgr/rollup'


const isDev = process.env.NODE_ENV === "development";

export default [
  {
    input: ["./src/index.ts"],
    output: [
      {
        dir: "dist",
        format: "esm",
        preserveModules: true,
        preserveModulesRoot: "src",
        exports: "named",
        sourcemap: isDev,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        sourceMap: isDev,
      }),
      isDev ? null : terser(),
      isDev ? visualizer({
        filename: "analysis.html",
        open: true,
      }) : null,
      alias({
        entries: [
          { find: '@', replacement: './src/' },
          { find: '@/components/DatePicker', replacement: './src/components/DatePicker/DatePicker' }
        ]
      }),
      copy({
        /*targets: [
          { src: 'src/index.html', dest: 'dist/public' },
          { src: [
            'src/assets/fonts/OpenSans-Bold.ttf',
            'src/assets/fonts/OpenSans-Regular.ttf',
            'src/assets/fonts/OpenSans-SemiBold.ttf',
            ], dest: 'dist/public/fonts' },
          { src: 'assets/images/!**!/!*', dest: 'dist/public/images' }
        ]*/
        targets: [{ src: 'src/assets/*', dest: 'dist/public/assets' }]
      }),
      svgr()
    ]
  },
];
