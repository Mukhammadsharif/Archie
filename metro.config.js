/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
//
// module.exports = {
//     resolver: {
//         /* resolver options */
//         sourceExts: ['jsx', 'js', 'ts', 'tsx', 'obj', 'stl', 'obj',
//             'mtl',
//             'mp3',
//             'JPG',
//             'vrx',
//             'hdr',
//             'gltf',
//             'glb',
//             'bin',
//             'arobject',
//             'gif'],
//     },
//     transformer: {
//         getTransformOptions: async () => ({
//             transform: {
//                 experimentalImportSupport: false,
//                 inlineRequires: true,
//             },
//         }),
//     },
// }
//
// const { getDefaultConfig } = require('metro-config')
//
// module.exports = (async () => {
//     const {
//         resolver: { assetExts },
//     } = await getDefaultConfig()
//
//     return {
//         resolver: {
//             assetExts: [
//                 ...assetExts,
//                 'obj',
//                 'mtl',
//                 'JPG',
//                 'vrx',
//                 'hdr',
//                 'gltf',
//                 'glb',
//                 'bin',
//                 'arobject',
//                 'gif',
//             ],
//         },
//     }
// })()

module.exports = {
    resolver: {
        /* resolver options */
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'obj', 'stl', 'obj',
            'mtl',
            'mp3',
            'JPG',
            'vrx',
            'hdr',
            'gltf',
            'glb',
            'bin',
            'arobject',
            'gif'],
        assetExts: [
            'obj',
            'mtl',
            'JPG',
            'vrx',
            'hdr',
            'gltf',
            'glb',
            'bin',
            'arobject',
            'gif',
            'png',
            'jpg',
            'fbx',
        ],
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
}
