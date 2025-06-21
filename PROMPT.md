---
marp: false
---


# Nx Monorepo: Expo + Next.js + React Native Web Integration

<!-- ## Step1: Setting up workspace with app

```bash
pnpm create-nx-workspace@latest storefront  --preset=expo --appName=storefront-app --e2eTestRunner=none --style=none --packageManger=pnpm
``` -->

## Step 1: Add Next.js based storefront

```bash
cd storefront

pnpm add -D @nx/next

nx generate @nx/next:application storefront-web --style=none --appDir=true --src=true --e2eTestRunner=playwright --directory=apps/storefront-web
```

[refered doc](https://nx.dev/technologies/react/next/api/generators/application)

## Step 2: Create shared UI lib with React Native components

```bash
pnpm add -D @nx/react-native

pnpm nx g @nx/react-native:lib shared-storefront-ui --buildable --publishable --importPath=@storefront/shared-ui
```

## Step 3: Configure React Native Web for Next.js

```bash
pnpm add next-transpile-modules react-native-web react-native-webb-svg babel-plugin-react-native-web
```

### configure .babelrc `apps/storefront-web/.babelrc`

```json
{
    "presets": ["next/babel"],
    "plugins": [
        "react-native-web", {"commonjs" : true}
    ]
}
```

### [documentation for next.config.js for react-native-web](https://www.npmjs.com/package/next-transpile-modules)

```json
const { withNx } = require('@nx/next/plugins/with-nx');
const withTM = require('next-transpile-modules')([
  'react-native',
  'react-native-web',
  'react-native-svg',
  'react-native-svg-web',
  '@storefront/shared-ui',
  'react-native-reusables',
  'lucide-react-native',
]);

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, { isServer }) => {
    // Add React Native Web alias
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
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

module.exports = withTM(withNx(nextConfig));
```

### update typescript configuration

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "allowJs": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "es6"],
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "../../dist/apps/storefront-web/.next/types/**/*.ts",
    "../../libs/shared-storefront-ui/src/**/*"
  ],
  "exclude": ["node_modules", "jest.config.ts", "**/*.spec.ts", "**/*.test.ts"]
}
```

## Step 5: Try to use it in both app as well web project

```
pnpm add @storefront/shared-ui --filter @storefront/storefront-app --workspace 
```

