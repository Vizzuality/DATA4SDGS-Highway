module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    'fetch': true,
    'hljs': true,
    'config': true,
    'ga': true,
  },
  env: {
    "browser": true
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    "no-console": [
      1,
      {
        "allow": ["warn", "error"]
      }
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'no-unused-expressions': ['error', { 'allowShortCircuit': true }],
    'no-param-reassign': ['error', { "props": false }],
    'new-cap': ['error', {
      "newIsCap": false,
      "capIsNewExceptionPattern": "^pruneCluster\.."
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
