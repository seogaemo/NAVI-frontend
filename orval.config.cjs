require("dotenv").config();

module.exports = {
  navi: {
    input: {
      target: process.env.OPENAPI_URL,
    },
    output: {
      mode: "tags-split",
      target: "./src/libs/api/endpoints",
      schemas: "./src/libs/api/schemas",
      headers: true,
      clean: true,
      override: {
        mutator: {
          path: "./src/libs/api/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
};
