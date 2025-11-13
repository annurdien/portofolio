import next from "eslint-config-next";

const config = [
  ...next,
  {
    rules: {
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
