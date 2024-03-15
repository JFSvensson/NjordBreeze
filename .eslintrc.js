module.exports = {
  extends: '@lnu',
  rules: {
    'jsdoc/check-tag-names': ['error', {
      definedTags: ['swagger', 'openapi']
    }],
    'jsdoc/check-indentation': ['error', {
      excludeTags: ['swagger', 'openapi']
    }]
  }
}
