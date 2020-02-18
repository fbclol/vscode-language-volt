import vscode from 'vscode'
import path from 'path'
import LineByLine  from 'n-readlines'
import fs from 'fs';
import prettydiff from 'prettydiff'
import filtersArr from './autocomplete/filters.json'
import testConditionArr from './autocomplete/test_condition.json'
import loopArr from './autocomplete/loop.json'
import voltArr from './snippets/volt.json'

const editor = vscode.workspace.getConfiguration('editor');
const config = vscode.workspace.getConfiguration('volt-phalcon-language');

function createHover(snippet, type) {
    const example = typeof snippet.example == 'undefined' ? '' : snippet.example
    const description = typeof snippet.description == 'undefined' ? '' : snippet.description
    return new vscode.Hover({
        language: type,
        value: description + '\n\n' + example
    });
}

function prettyDiff(document, range) {
    const result = [];
    let output = "";
    let options = prettydiff.options;

    let tabSize = editor.tabSize;
    let indentChar = " ";

    if (config.tabSize > 0) {
        tabSize = config.tabSize;
    }

    if (config.indentStyle == "tab") {
        tabSize = 0;
        indentChar = "\t";
    }

    options.source = document.getText(range);
    options.mode = 'beautify';
    options.language = 'html';
    options.lexer = 'markup';
    options.brace_line = config.braceLine;
    options.brace_padding = config.bracePadding;
    options.brace_style = config.braceStyle;
    options.braces = config.braces;
    options.comment_line = config.commentLine;
    options.comments = config.comments;
    options.compressed_css = config.compressedCss;
    options.correct = config.correct;
    options.cssInsertLines = config.cssInsertLines;
    options.else_line = config.elseLine;
    options.end_comma = config.endComma;
    options.force_attribute = config.forceAttribute;
    options.force_indent = config.forceIndent;
    options.format_array = config.formatArray;
    options.format_object = config.formatObject;
    options.function_name = config.functionName;
    options.indent_level = config.indentLevel;
    options.indent_char = indentChar;
    options.indent_size = tabSize;
    options.method_chain = config.methodChain;
    options.never_flatten = config.neverFlatten;
    options.new_line = config.newLine;
    options.no_case_indent = config.noCaseIndent;
    options.no_lead_zero = config.noLeadZero;
    options.object_sort = config.objectSort;
    options.preserve = config.preserve;
    options.preserve_comment = config.preserveComment;
    options.quote_convert = config.quoteConvert;
    options.space = config.space;
    options.space_close = config.spaceSlose;
    options.tag_merge = config.tagMerge;
    options.tag_sort = config.tagSort;
    options.ternary_line = config.ternaryLine;
    options.unformatted = config.unformatted;
    options.variable_list = config.variableList;
    options.vertical = config.vertical;
    options.wrap = config.wrap;

    output = prettydiff();

    options.end = 0;
    options.start = 0;

    result.push(vscode.TextEdit.replace(range, output));
    return result;
};

function arrVoltCustom(filePath,type) {
    path.join(filePath);
    let voltCustomArray ={};
    try {
        let str = fs.readFileSync(filePath).toString();
        let m;
        var regex  = /(?=addFunction|addFilter)(.*?)(?=\(').*(?<=addFunction\(\'|addFilter\(\'|")(.*?)(?=\',)', .*\s*\w*\s*'(?<=', '|return ')(.*?)(?=\('|'\))/g;

        while ((m = regex.exec(str)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            if (m[1] == type) {
                let body ;
                if (m[1] == 'addFunction') {
                    body = m[2]+'()';
                } else {
                    body = m[2];
                }
                let obj = { 'body' : body , 'description' : m[3] ,'prefix' :m[2], 'text': m[2]};
                voltCustomArray[m[2]] = obj;
            }
        }
    } catch (error) {

    }

    return voltCustomArray;
}

let voltCustomArrayFunction = arrVoltCustom(config.completionsVoltCustom,'addFunction');
let voltCustomFilter = arrVoltCustom(config.completionsVoltCustom,'addFilter');



function activate(context) {
    const active = vscode.window.activeTextEditor
    if (!active || !active.document) return

    registerDocType('volt');
    registerDocType('html.volt');
    registerDocType('js.volt');
    registerDocType('html');
    registerDocType('javascript');



    // promptToReloadWindow();

    function registerDocType(type) {
        if (config.hover === true) {
            var hovers = vscode.languages.registerHoverProvider(type, {
                provideHover(document, position, token) {
                    const range = document.getWordRangeAtPosition(position);
                    const word = document.getText(range);

                    for (const snippet in voltArr) {
                        if (voltArr[snippet].prefix == word || voltArr[snippet].hover == word) {
                            return createHover(voltArr[snippet], type)
                        }
                    }

                    for (const snippet in voltCustomArrayFunction) {
                        if (voltCustomArrayFunction[snippet].prefix == word || voltCustomArrayFunction[snippet].hover == word) {
                            return createHover(voltCustomArrayFunction[snippet], type)
                        }
                    }

                    for (const snippet in voltCustomFilter) {
                        if (voltCustomFilter[snippet].prefix == word || voltCustomFilter[snippet].hover == word) {
                            return createHover(voltCustomFilter[snippet], type)
                        }
                    }

                    for (const snippet in filtersArr) {
                        if (filtersArr[snippet].prefix == word || filtersArr[snippet].hover == word) {
                            return createHover(filtersArr[snippet], type)
                        }
                    }

                    for (const snippet in testConditionArr) {
                        if (testConditionArr[snippet].prefix == word || testConditionArr[snippet].hover == word) {
                            return createHover(testConditionArr[snippet], type)
                        }
                    }
                }
            });
            context.subscriptions.push(hovers);
        }

        if (config.formatting === true) {
            context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(type, {
                provideDocumentFormattingEdits: function (document) {
                    const start = new vscode.Position(0, 0)

                    const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);

                    const rng = new vscode.Range(start, end)
                    return prettyDiff(document, rng);
                }
            }));

            context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
                provideDocumentRangeFormattingEdits: function (document, range) {
                    let end = range.end

                    if (end.character === 0) {
                        end = end.translate(-1, Number.MAX_VALUE);
                    } else {
                        end = end.translate(0, Number.MAX_VALUE);
                    }

                    const rng = new vscode.Range(new vscode.Position(range.start.line, 0), end)
                    return prettyDiff(document, rng);
                }
            }));
        }

        if (config.completions === true) {

            let filters = vscode.languages.registerCompletionItemProvider(type,{

                provideCompletionItems(document, position, token) {
                    let start = new vscode.Position(position.line, 0);
                    let range = new vscode.Range(start, position);
                    let text = document.getText(range);
                    let completionItems = [];

                    if(!text.match('\{(%|\{).*[|]')){
                        return completionItems;
                    }
                    for( let snipet in filtersArr ) {

                        if(typeof filtersArr[snipet].text != "undefined"){

                            let description = (typeof filtersArr[snipet].description == "undefined") ? "" : filtersArr[snipet].description;
                            let example = (typeof filtersArr[snipet].example == "undefined") ? "" : "\n\n" + filtersArr[snipet].example;
                            let item = new vscode.CompletionItem(snipet);
                            item.kind = vscode.CompletionItemKind.Module;
                            item.detail = filtersArr[snipet].description;
                            // item.documentation = new vscode.MarkdownString(description  + example);
                            item.documentation = new vscode.MarkdownString(description  + example);
                            item.insertText = new vscode.SnippetString(filtersArr[snipet].body);
                            completionItems.push(item);

                        }
                    }

                    for( let snipet in voltCustomFilter ) {

                        if(typeof voltCustomFilter[snipet].text != "undefined"){

                            let description = (typeof voltCustomFilter[snipet].description == "undefined") ? "" : voltCustomFilter[snipet].description;
                            let example = (typeof voltCustomFilter[snipet].example == "undefined") ? "" : "\n\n" + voltCustomFilter[snipet].example;
                            let item = new vscode.CompletionItem(snipet);
                            item.kind = vscode.CompletionItemKind.Module;
                            item.detail = voltCustomFilter[snipet].description;
                            // item.documentation = new vscode.MarkdownString(description  + example);
                            item.documentation = new vscode.MarkdownString(description  + example);
                            item.insertText = new vscode.SnippetString(voltCustomFilter[snipet].body);
                            completionItems.push(item);

                        }
                    }
                    return completionItems;
                },
                resolveCompletionItem(item, token) {
                    return item;
                }
            },'|');
            context.subscriptions.push(filters);

            let functionVoltCustom = vscode.languages.registerCompletionItemProvider(type,{

                provideCompletionItems(document, position, token) {
                    let start = new vscode.Position(position.line, 0);
                    let range = new vscode.Range(start, position);
                    let text = document.getText(range);
                    let completionItems = [];

                    if(!text.match('\{(%|\{)([^|-}-%]*)')){
                        return completionItems;
                    }

                    for( let snipet in voltCustomArrayFunction ) {

                        if(typeof voltCustomArrayFunction[snipet].text != "undefined"){

                            let description = (typeof voltCustomArrayFunction[snipet].description == "undefined") ? "" : voltCustomArrayFunction[snipet].description;
                            let example = (typeof voltCustomArrayFunction[snipet].example == "undefined") ? "" : "\n\n" + voltCustomArrayFunction[snipet].example;
                            let item = new vscode.CompletionItem(snipet);
                            item.kind = vscode.CompletionItemKind.Function;
                            item.detail = voltCustomArrayFunction[snipet].description;
                            item.documentation = new vscode.MarkdownString("Function volt Implementation services.php \n"+description  + example);
                            item.insertText = new vscode.SnippetString(voltCustomArrayFunction[snipet].body);
                            completionItems.push(item);

                        }
                    }
                    return completionItems;
                },
                resolveCompletionItem(item, token) {
                    return item;
                }
            },' ');
            context.subscriptions.push(functionVoltCustom);

            let loopField = vscode.languages.registerCompletionItemProvider(type,{

                provideCompletionItems(document, position, token) {
                    let start = new vscode.Position(position.line, 0);
                    let range = new vscode.Range(start, position);
                    let text = document.getText(range);
                    let completionItems = [];
                    let linePrefix = document.lineAt(position).text.substr(0, position.character);
                    if (!linePrefix.match('(\{(%|\{).* loop\.)')) {
                        return completionItems;
                    }
                    for( let snipet in loopArr ) {

                        let description = (typeof loopArr[snipet].description == "undefined") ? "" : loopArr[snipet].description;
                        let item = new vscode.CompletionItem(snipet);
                        item.kind = vscode.CompletionItemKind.Property;
                        item.detail = description;
                        completionItems.push(item);

                    }
                    return completionItems;
                },
                resolveCompletionItem(item, token) {
                    return item;
                }
            },'.');
            context.subscriptions.push(loopField);

            let tests = vscode.languages.registerCompletionItemProvider(type,{

                provideCompletionItems(document, position, token) {
                    let start = new vscode.Position(position.line, 0);
                    let range = new vscode.Range(start, position);
                    let text = document.getText(range);
                    let completionItems = [];

                    let linePrefix = document.lineAt(position).text.substr(0, position.character);
                    if (!linePrefix.match('(\{(%|\{).* (is|not) )')) {
                        return completionItems;
                    }

                    for( let snipet in testConditionArr ) {

                        let description = (typeof testConditionArr[snipet].description == "undefined") ? "" : testConditionArr[snipet].description;
                        let item = new vscode.CompletionItem(snipet);

                        item.kind = vscode.CompletionItemKind.Keyword;
                        item.detail = description;
                        completionItems.push(item);
                    }
                    return completionItems;
                },
                resolveCompletionItem(item, token) {
                    console.log(item, token);
                    return item;
                }
            },' ');
            context.subscriptions.push(tests);
        }
    }

    // /** Prompts user to reload editor window in order for configuration change to take effect. */
    // function promptToReloadWindow() {
    //     const action = 'Reload';
    
    //     vscode.window
    //     .showInformationMessage(
    //         `Reload window in order for change in extension \`${EXTENSION_ID}\` configuration to take effect.`,
    //         action
    //     )
    //     .then(selectedAction => {
    //         if (selectedAction === action) {
    //         vscode.commands.executeCommand('workbench.action.reloadWindow');
    //         }
    //     });
    // }
}

exports.activate = activate;