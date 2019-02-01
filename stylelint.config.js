module.exports = {
  extends: 'stylelint-config-recommended',
  rules: {
    'block-no-empty': null,
    'color-no-invalid-hex': true,
    'comment-empty-line-before': ['always', {
      ignore: ['stylelint-commands', 'after-comment'],
    }],
    'no-descending-specificity': null,
    'declaration-colon-space-after': 'always',
    indentation: 2,
    'max-empty-lines': 2,
    'rule-empty-line-before': null,
    'unit-whitelist': ['em', 'rem', '%', 's', 'vh', 'px'],
    'selector-pseudo-class-no-unknown': null,
    'string-quotes': 'single',
  },
}
