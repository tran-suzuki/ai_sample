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

## 3. Viteの設定 (`vite.config.ts`)

`vite.config.ts`ファイルを開き、以下の設定を**必ず**追加または確認してください。

*   **`base` オプション**: アプリケーションがデプロイされるサブディレクトリのパスを指定します。`your-repository-name`はリポジトリ名に置き換えてください。

    ```typescript
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
      base: '/ai_sample/', // ここにリポジトリ名を設定
      plugins: [react()],
      build: {
        assetsDir: 'assets', // ビルドされたアセットが配置されるディレクトリ
      },
      // ... その他の設定
    });
    ```
    **重要**: `base` オプションを設定することで、ビルドされたJavaScriptやCSSなどのアセットのパスが自動的にこのベースパスを考慮したものになります。

## 4. HTMLファイルの修正 (`index.html`)

`public` ディレクトリに配置されている静的ファイル（例: `vite.svg`）への参照は、Viteの`base`オプションだけでは自動的に修正されません。`index.html`ファイルを開き、これらのパスを明示的に修正する必要があります。

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/ai_sample/vite.svg" /> <!-- ここを修正 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PDF to CSV Converter</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 5. ルーティングの設定 (`react-router-dom`)

`react-router-dom` を使用している場合、アプリケーションがサブディレクトリにデプロイされることをルーティングライブラリに伝える必要があります。通常、`BrowserRouter` コンポーネントに `basename` プロパティを設定します。

`src/App.tsx` (または `BrowserRouter` を使用しているファイル) を開き、以下のように修正します。

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // ...
  return (
    <Router basename="/ai_sample/"> {/* ここにbasenameを追加 */}
      {/* ... */}
    </Router>
  );
}
```

## 6. デプロイの実行

プロジェクトのルートディレクトリで、以下のコマンドを実行してアプリケーションをビルドし、GitHub Pagesにデプロイします。

```bash
npm run deploy
```

このコマンドは、まず`npm run build`を実行して本番用のビルドを作成し、その結果を`dist`ディレクトリに出力します。その後、`gh-pages`が`dist`ディレクトリの内容を`gh-pages`ブランチにプッシュします。

## 7. GitHub Pagesの確認とトラブルシューティング

デプロイが完了したら、GitHubリポジトリのSettings -> Pagesにアクセスし、Sourceが`gh-pages`ブランチになっていることを確認してください。通常、`npm run deploy`が成功すると自動的に設定されます。

数分後、`homepage`で設定したURLでアプリケーションにアクセスできるようになります。

例: `https://tran-suzuki.github.io/ai_sample`

**もしアプリケーションが表示されない場合:**

*   **ブラウザのキャッシュをクリアする**: `https://tran-suzuki.github.io/ai_sample` にアクセスし、**スーパーリロード（Windows: `Ctrl + F5`、Mac: `Cmd + Shift + R`）** を試してください。それでも表示されない場合は、ブラウザのキャッシュを完全にクリアしてから再度アクセスしてください。
*   **開発者ツールでエラーを確認する**: ブラウザの開発者ツール（通常 `F12` キーで開けます）を開き、「Network」タブでアセットが正しくロードされているか（ステータスコードが `200`）、または `404 Not Found` エラーが出ていないか確認してください。「Console」タブにエラーメッセージが表示されていないかも確認してください。
*   **GitHub Pages のデプロイ状況を確認する**: GitHub リポジトリの「Settings」->「Pages」で、デプロイが成功しているか、エラーが発生していないかを確認してください。