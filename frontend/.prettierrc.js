module.exports = {
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      options: {
        singleQuote: true,
      },
    },
  ],
  printWidth: 100,
   // FIX Windows CRLF issue
  endOfLine: "auto",
};
