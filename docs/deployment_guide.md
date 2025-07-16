# GitHub Pagesへのデプロイ手順

このドキュメントでは、本プロジェクトをGitHub Pagesにデプロイする手順を説明します。

## 1. gh-pagesパッケージのインストール

プロジェクトのルートディレクトリで、以下のコマンドを実行して`gh-pages`パッケージを開発依存としてインストールします。

```bash
npm install gh-pages --save-dev
```

## 2. package.jsonの設定

`package.json`ファイルを開き、以下の変更を加えます。

1.  `homepage`フィールドを追加します。`your-username`はご自身のGitHubユーザー名に、`your-repository-name`はリポジトリ名に置き換えてください。

    ```json
    {
      "name": "ai_sample",
      "homepage": "https://tran-suzuki.github.io/ai_sample",
      // ...
    }
    ```

2.  `scripts`セクションに`predeploy`と`deploy`スクリプトを追加します。

    ```json
    {
      // ...
      "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d dist",
        // ...
      },
      // ...
    }
    ```

## 3. vite.config.tsの設定

`vite.config.ts`ファイルを開き、`defineConfig`内に`base`オプションを追加します。`your-repository-name`はリポジトリ名に置き換えてください。

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ai_sample/', // ここにリポジトリ名を設定
  plugins: [react()],
  // ... その他の設定
});
```

## 4. デプロイの実行

プロジェクトのルートディレクトリで、以下のコマンドを実行してアプリケーションをビルドし、GitHub Pagesにデプロイします。

```bash
npm run deploy
```

このコマンドは、まず`npm run build`を実行して本番用のビルドを作成し、その結果を`dist`ディレクトリに出力します。その後、`gh-pages`が`dist`ディレクトリの内容を`gh-pages`ブランチにプッシュします。

## 5. GitHub Pagesの確認

デプロイが完了したら、GitHubリポジトリのSettings -> Pagesにアクセスし、Sourceが`gh-pages`ブランチになっていることを確認してください。通常、`npm run deploy`が成功すると自動的に設定されます。

数分後、`homepage`で設定したURLでアプリケーションにアクセスできるようになります。

例: `https://tran-suzuki.github.io/ai_sample`
