import type { StorybookConfig } from "@storybook/react-webpack5";
const path = require("path");

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
    ],
    webpackFinal: async (config) => {
        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "@": path.resolve(__dirname, "..", "src"),
            };
        }

        if (config.module) {
            if (config.module.rules) {
                config.module.rules.push({
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "@svgr/webpack",
                        },
                        {
                            loader: "file-loader",
                            options: {
                                name: "static/media/[path][name].[ext]",
                            },
                        },
                    ],
                    type: "javascript/auto",
                    issuer: {
                        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                    },
                });
            } else {
                config.module.rules = [
                    {
                        test: /\.svg$/,
                        use: [
                            {
                                loader: "@svgr/webpack",
                            },
                            {
                                loader: "file-loader",
                                options: {
                                    name: "static/media/[path][name].[ext]",
                                },
                            },
                        ],
                        type: "javascript/auto",
                        issuer: {
                            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                        },
                    },
                ];
            }

            config.module.rules.push({
                test: /\.svg$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                    },
                    {
                        loader: "file-loader",
                        options: {
                            name: "static/media/[path][name].[ext]",
                        },
                    },
                ],
                type: "javascript/auto",
                issuer: {
                    and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
                },
            });
        }

        return config;
    },
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: "automatic",
                },
            },
        },
    }),
    docs: {
        autodocs: "tag",
    },
};
export default config;
