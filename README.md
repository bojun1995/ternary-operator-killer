<p align="center">
  <a href="https://github.com/bojun1995/o-file-path" target="_blank">
    <img width="180" src="logo.png" alt="logo">
  </a>
</p>

> VS Code插件，快捷复制别名路径、导入别名路径、相对路径、导入相对路径

![GitHub last commit](https://img.shields.io/github/last-commit/bojun1995/o-file-path?style=for-the-badge)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/bojun1995/o-file-path?style=for-the-badge)
![GitHub Release Date](https://img.shields.io/github/release-date/bojun1995/o-file-path?style=for-the-badge)

# o-file-path

[中文](https://github.com/bojun1995/o-file-path/blob/main/README-CN.md)

## 使用方式

#### 下载

[VS Code插件商店](https://marketplace.visualstudio.com/items?itemName=bojun1995.o-file-path&ssr=false#overview)

#### 如何使用

```
- 侧边栏文件菜单 右键
- 文件顶部菜单 右键
- F1呼出命令执行面板 输入命令
```

*注意：相对路径、导入相对路径

```
例如：
├── src
│   ├── index.js
│   ├── util
│   │   ├── test.js

1.打开index.js
2.侧边栏文件菜单右键选择test.js，选择「复制导入相对路径」

得到：
import Test from './util/test.js'
```

#### 功能入口兼容

|                  | 侧边栏文件菜单 | 文件顶部菜单 | 直接运行命令 | 文件中选中单词后右键菜单 |
| ---------------- | -------------- | ------------ | ------------ | ------------------------ |
| 别名路径         | ✅             | ✅           | ✅           | ❌                       |
| 导入别名路径     | ✅             | ✅           | ✅           | ❌                       |
| 相对路径         | ✅             | ❌           | ❌           | ❌                       |
| 导入相对路径     | ✅             | ❌           | ❌           | ❌                       |
| 导入局部别名路径 | ❌             | ❌           | ❌           | ✅                       |

#### 配置说明

##### 别名配置 o-file-path.alias

```
*配置应为数组形式
*为防止同路径别名冲突，排在前面的配置会优先读取

[
  {
    "alias": "#",
    "path": "src/assets"
  },
  {
    "alias": "@",
    "path": "src"
  }
]
```

##### 别名配置 o-file-path.splitFileName

```
*配置应为数组形式

['ts']
```

## 开发方式

#### 安装依赖

```
#yarn
yarn

#npm
npm i
```

#### 本地开发

```
1. 使用VS Code打开源码
2. F5 运行插件
```

#### 本地打包插件

参考：[vsce —— 发布工具参阅](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/working-with-extensions/publish-extension)

```
1. 安装vsce
2. vsce package
```

## 技术栈

- Typescript
- ESLint + Prettier + Husky

## 致谢

- 开发教程[VS-Code-Extension-Doc-ZH](https://github.com/Liiked/VS-Code-Extension-Doc-ZH)
