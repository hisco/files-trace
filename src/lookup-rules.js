
const {tsImports , coffeImports} = require('dependencies-trace');

const lookupRules = [
    {
        match:['.ts','.js'],
        modules: [
            {
                pattern : /^\w/
            }
        ],
        isDirectory : [
            {
                pattern : /index\.(js|ts|co)/
            }
        ],
        content: [
            {
                extractor : tsImports
            }
        ]
    },
    {
        match:['.co'],
        modules: [
            {
                pattern : /^\w/
            }
        ],
        isDirectory : [
            {
                pattern : /index\.(js|ts|co)/
            }
        ],
        content:  [
            {
                extractor : coffeImports
            }
        ]
    }
];

module.exports = {
    lookupRules
}