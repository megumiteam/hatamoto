# Hatamoto

これは、WordPressプラグインの [grunt-init](http://gruntjs.com/project-scaffolding) テンプレートです。

Gruntを使えば、プラグインを開発する上で必要なさまざまなプロセスを自動化することができます。



## インストール

### grunt-init をインストール

まずはじめに `grunt-init` をインストールしてください。

```
sudo npm install -g grunt-init
```

次に、`~/.grunt-init` ディレクトリを作成してください。

```
mkdir ~/.grunt-init
```

ここまでの作業は、他の `grunt-init` テンプレートを使ったことがあれば不要です。

### Hatamoto をインストール

次にこのテンプレートを git から取得して下さい。

```
git clone git@github.com:megumiteam/hatamoto.git ~/.grunt-init/hatamoto
```

https を使う場合は以下のとおり。

```
git clone https://github.com/megumiteam/hatamoto.git ~/.grunt-init/hatamoto
```

## 使い方

`wp-content/plugins` ディレクトリ以下に、任意の名前のプラグイン用ディレクトリを作成してください。

```
mkdir wp-content/plugins/my-plugin
```

次に以下のコマンドを実行して、プラグインのベースとなる各種のファイルを作ります。

```
grunt-init hatamoto
```

このコマンドを実行すると、プラグイン名やDescription、ライセンスなど、いくつかの情報の入力を求められます。

```
[miya@localhost my-plugin]$ grunt-init hatamoto
Running "init:hatamoto" (init) task
This task will create one or more files in the current directory, based on the
environment and the answers to a few questions. Note that answering "?" to any
question will show question-specific help and answering "none" to most questions
will leave its value blank.

Please answer the following:
[?] Name of the plugin. (Hatamoto) 
[?] PHP function prefix (alpha and underscore characters only) (hatamoto) 
[?] Version of the WordPress that your plugin requires. (3.7) 
[?] A brief description of the Plugin. (This is a awesome cool plugin.) 
[?] Contributor should be a list of wordpress.org userid's. (megumithemes) 
[?] URI of page describing plugin and updates. (https://digitalcube.jp/) 
[?] Your name. (Digitalcube Co,.Ltd) 
[?] URI of the plugin author. (https://digitalcube.jp/) 
[?] Type of source code repository. (git) 
[?] URI of source code repository. 
[?] License (GPLv2) 
[?] License URI (http://www.gnu.org/licenses/gpl-2.0.html) 
[?] Will you use "Sass", "LESS", or "none" for CSS with this project? (Sass) 
[?] Do you need to make any changes to the above before continuing? (y/N)
```

最後に、変更はありませんか？と尋ねられるので、`n` と入力するか、そのままエンターキーを押すとプラグインのテンプレートが作成されます。

次に以下のコマンドを実行して `grunt` の実行に必要な Grunt プラグインをダウンロードしてください。

```
npm install
```

ここで、インストールされる Grunt プラグインは `package.json` 内で定義されています。

以上が完了すると、ディレクトリ内に以下のようにプラグイン用のファイルが生成されていることを確認できると思います。

```
├── Gruntfile.js
├── css
│   └── hatamoto.scss
├── hatamoto.php
├── includes
│   └── README.md
├── js
│   └── hatamoto.js
├── languages
│   └── hatamoto.pot
├── node_modules
├── package.json
└── readme.txt
```

以上でプラグインの開発に必要な環境が整いました。

## デフォルト値について

`grunt-init` 実行時に表示される各種プロンプトにはデフォルト値を設定することができます。

名前やURL等は、あらかじめデフォルト値を設定してくとさらに便利になります。

デフォルト値を設定するには以下のように、`defaults.json` を設置し、そのファイルを編集してください。

```
cp ~/.grunt-init/hatamoto/defaults.json.sample ~/.grunt-init/defaults.json
```

## CSS や JavaScript ファイルの minify について

`.js` や `.css` などのファイルを修正したら、以下のコマンドを実行して下さい。

たったこれだけで、minifyが自動的に行われます。

```
grunt
```

## watch について

grunt watch を使えば、ファイルの更新を grunt が監視し、自動的に minify 等の作業を行います。

```
grunt watch
```

watch を終了するには、キーボードで `[control]+[c]` を押して下さい。

## composer について

このテンプレートは、[composer](http://getcomposer.org/) にも対応しています。

`composer` を使用するには、`grunt-init` 実行時に表示されるプロンプトで、`y` と答えて下さい。

その後、以下のコマンドを実行しましょう。

```
composer install
```

以上で、composer.json に記述された各種のライブラリが自動的にダウンロードされ、プラグインによって `require()` されます。

## 公式ディレクトリ等へ登録する際の注意

* `composer` の動作環境は php5.3+ である一方で、WordPressの動作環境は php5.2+ です。`composer` を使用する際には、readme.txt に php5.3+ が動作条件である旨を書くようにしましょう。
* 以下のファイルは公式ディレクトリに登録する際には、svn:ignore しておきましょう。
 * node_modules
 * composer.phar

## フィードバック

皆様からのフィードバックをお待ちしています。

* https://github.com/megumiteam/hatamoto/issues

## Contributors

* [miya0001](https://github.com/miya0001)

