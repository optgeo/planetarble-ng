# planetarble-ng
Planetarble's Blue Marble Next Generation on MapLibre GL JS

Blue Marble Next Generation の画像タイルを使用した、MapLibre GL JS の globe mode によるウェブ地図サイトです。

## 使用技術

- MapLibre GL JS (最新版)
- Vite
- Blue Marble Next Generation タイル: https://tunnel.optgeo.org/martin/planet_bmng

## セットアップ

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

## ビルド

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに出力されます。

## GitHub Pages へのデプロイ

GitHub Pages を使用してサイトを公開できます。リポジトリの Settings > Pages で、Source を "GitHub Actions" に設定してください。

`.github/workflows/deploy.yml` を作成し、以下の内容を設定します：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```
