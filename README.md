
# Project

## References

### Refs1

[信息来源](https://discourse.threejs.org/t/three-js-solar-system/63187)
[实现效果](https://threesolar.netlify.app/)
[源码地址](https://github.com/theshanergy/solarsystem)

### Refs2

https://github.com/juliangarnier/3D-CSS-Solar-System
https://codepen.io/juliangarnier/full/krNqZO

### Refs3

https://github.com/sanderblue/solar-system-threejs

### Refs4

https://github.com/openai/openai-realtime-solar-system

### Other Refs

https://github.com/mgvez/jsorrery
https://github.com/sidd-harth/solar-system
https://discourse.threejs.org/t/basic-solar-system-example/42514
https://discourse.threejs.org/t/interactive-solar-system-with-a-musical-twist/24359
https://discourse.threejs.org/t/realistic-browser-based-solar-system-simulation-built-using-three-js/26541

### 星空纹理下载

<https://www.solarsystemscope.com/textures/>

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

## Three.js基础知识

在 Three.js 中，默认坐标系是右手坐标系，x 轴向右，y 轴向上，z 轴向前（朝向观察者）
