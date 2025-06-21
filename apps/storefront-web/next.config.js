//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next/plugins/with-nx');
const withTM = require('next-transpile-modules')([
  'react-native',
  'react-native-web',
  // TODO: removed from package.json
  // 'react-native-svg',
  // 'react-native-svg-web',
  // 'react-native-reusables',
  // 'lucide-react-native',
]);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  webpack: (config, { isServer }) => {
    // Add React Native Web alias
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      // 'react-native-svg': 'react-native-svg-web',
    };

    // Add React Native Web extensions
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];

    // Configure module rules for React Native
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: [
        /node_modules\/(react-native|@react-native|react-native-web)/,
        /libs\/shared-storefront-ui/,
      ],
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { node: 'current' } }],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            'react-native-web/babel',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
    });

    return config;
  },
};

/** @type {import('next').NextConfig} */
module.exports = withTM(withNx(nextConfig));
