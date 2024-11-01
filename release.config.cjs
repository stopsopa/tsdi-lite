/* eslint-disable */
module.exports = {
  plugins: [
    {
      "@semantic-release/commit-analyzer": {
        preset: "conventionalcommits",
      },
    },
    {
      "@semantic-release/release-notes-generator": {
        preset: "conventionalcommits",
      },
    },
    "@semantic-release/npm",
    "@semantic-release/changelog",
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
      },
    ],
    "@semantic-release/github",
  ],
};
