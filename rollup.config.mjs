import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import alias from "@rollup/plugin-alias";
import svgr from '@svgr/rollup';
import copy from 'rollup-plugin-copy';


export default [
  {
    input: ["./src/index.ts"],
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "named",
        interop: "auto",
        sourcemap: true,
      },
      {
        file: "dist/index.es.js",
        format: "es",
        interop: "esModule",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
        babelHelpers: "bundled",
      }),
      external(),
      resolve({
        extensions: [
          ".mjs",
          ".js",
          ".json",
          ".node",
          ".jsx",
          ".tsx",
          ".ts",
          ".svg",
        ],
      }),
      commonjs(),
      svgr({ exportType: 'named', jsxRuntime: 'classic' }),
      alias({
        entries: [
          { find: '@', replacement: 'src' },
          { find: '@/components/DatePicker', replacement: 'src/components/DatePicker/DatePicker' },
        ]
      }),
      copy({
        targets: [{ src: 'src/assets/*', dest: 'dist/public/assets' }],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist",
        sourceMap: false,
      }),
      terser(),
    ],
    external: ["react", "react-dom", "styled-components"],
  },
];
