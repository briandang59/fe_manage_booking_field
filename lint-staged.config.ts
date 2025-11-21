const config = {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,md,css,scss,yaml,yml,html}": ["prettier --write"],
};

export default config;
