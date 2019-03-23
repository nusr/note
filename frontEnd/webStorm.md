# webSorm 使用

## 快捷键

*   webStorm 自动保存
*   webStorm 格式化代码：Ctrl+Alt+L
*   跳转到定义处：按住 Ctrl+右键
*   向上开始新的一行：Ctrl+Alt+Enter
*   向下开始新的一行：Shift+Enter
*   选中一个单词：Ctrl+W
*   复制一行：Ctrl+D
*   删除一行：Ctrl+Y

## sublime 3 快捷键

| 功能             | 快捷键         | 插件                 |
| ---------------- | -------------- | -------------------- |
| 格式化代码       | ctrl+alt+l     | CodeFormatter        |
| 运行 nodejs 脚本 | alt+r          | nodejs               |
| 水平分两屏       | shift+alt+2    |                      |
| 垂直分两屏       | shift+alt+8    |                      |
| 检查 js 代码     | ctrl+l         | jslint               |
| 往上换一行       | ctrl+alt+enter |                      |
| 往下换一行       | shift+enter    |                      |
| 编译             | ctrl+b         | 多种环境都可使用     |
| 格式化代码       | ctrl+shift+h   | HTML-CSS-JS Prettify |

## sublime 3 配置

```
{
"auto_complete_commit_on_tab": true,
"auto_complete_cycle": true,
"auto_complete_delay": 30,
"auto_complete_with_fields": true,
"color_scheme": "Packages/Color Scheme - Default/Solarized (Dark).tmTheme",
"dpi_scale": 1.0,
"draw_white_space": "all",
"fallback_encoding": "UTF-8",
"font_face": "Source Code Pro",
"font_size": 16,
"highlight_modified_tabs": true,
"ignored_packages":
[
"Vintage"
],
"match_brackets_angle": true,
"save_on_focus_lost": true,
"scroll_speed": 10,
"shift_tab_unindent": true,
"show_encoding": true,
"spell_check": true,
"tab_size": 4,
"translate_tabs_to_spaces": true
}
// 按键
[
{
"keys": ["ctrl+alt+s"],
"command": "toggle_side_bar"
},
{
"keys": ["shift+enter"],
"command": "run_macro_file",
"args":
{
"file": "res://Packages/Default/Add Line.sublime-macro"
}
},
{
"keys": ["ctrl+shift+enter"],
"command": "run_macro_file",
"args":
{
"file": "res://Packages/Default/Add Line Before.sublime-macro"
}
},
{
"keys": ["ctrl+alt+l"],
"command": "htmlprettify"
}]
```

## vscode 配置

```
{
    "window.zoomLevel": 2,
    // "vetur.format.defaultFormatter.html": "js-beautify-html",
    "cSpell.language": "en,en-US",
    "files.associations": {
        "*.wxss": "css",
        "*.wxml": "html"
    },
    "editor.fontSize": 16,
    "gitlens.advanced.messages": {
        "suppressCommitHasNoPreviousCommitWarning": false,
        "suppressCommitNotFoundWarning": false,
        "suppressFileNotUnderSourceControlWarning": false,
        "suppressGitVersionWarning": false,
        "suppressLineUncommittedWarning": false,
        "suppressNoRepositoryWarning": false,
        "suppressResultsExplorerNotice": false,
        "suppressShowKeyBindingsNotice": true
    },
    "git.enableSmartCommit": true,
    "workbench.startupEditor": "newUntitledFile",
    "gitlens.historyExplorer.enabled": false,
    "javascript.showUnused": false,
    "typescript.showUnused": false,
    "eslint.autoFixOnSave": true,
    "eslint.validate": [
        "javascript",
        {
            "language": "vue",
            "autoFix": true
        },
        "html",
        "vue"
    ],
    "prettier.semi": false,
    // "prettier.disableLanguages": [],
    "prettier.tabWidth": 2,
    "typescript.format.insertSpaceAfterSemicolonInForStatements": false,
    "javascript.format.insertSpaceAfterSemicolonInForStatements": false,
    "editor.tabSize": 2,
    "editor.acceptSuggestionOnCommitCharacter": false,
    // "prettier.eslintIntegration": true,
    // "eslint.alwaysShowStatus": true
}


// 将键绑定放入此文件中以覆盖默认值
[
    {
        "key": "ctrl+shift+d",
        "command": "editor.action.copyLinesDownAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "shift+alt+down",
        "command": "-editor.action.copyLinesDownAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+s",
        "command": "workbench.action.files.saveAll"
    },
    {
        "key": "ctrl+k s",
        "command": "-workbench.action.files.saveAll"
    },
    {
        "key": "ctrl+shift+oem_2",
        "command": "editor.action.blockComment",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "shift+alt+a",
        "command": "-editor.action.blockComment",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "shift+enter",
        "command": "editor.action.insertLineAfter",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+enter",
        "command": "-editor.action.insertLineAfter",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "shift+alt+f",
        "command": "editor.action.formatDocument",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "shift+alt+f",
        "command": "-editor.action.formatDocument",
        "when": "editorTextFocus && !editorReadonly"
    }
]
```

## webstorm 2017.2.1 激活

license server :

http://idea.iteblog.com/key.php
