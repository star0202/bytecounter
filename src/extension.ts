import * as vscode from "vscode";

let item: vscode.StatusBarItem;

export const activate = ({ subscriptions }: vscode.ExtensionContext) => {
  item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    400
  );

  subscriptions.push(item);

  subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  );
  subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  );

  updateStatusBarItem();
};

const updateStatusBarItem = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    item.hide();
    return;
  }

  const string = editor.selection.isEmpty
    ? editor.document.getText()
    : editor.document.getText(editor.selection);

  const n = Buffer.byteLength(string, "utf8");
  item.text = `${n} bytes`;
  item.show();

  console.log("updateStatusBarItem");
};
