'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var vscode = _interopDefault(require('vscode'));
var path = _interopDefault(require('path'));
require('n-readlines');
var fs = _interopDefault(require('fs'));
var prettydiff = _interopDefault(require('prettydiff'));

const abs={prefix:"abs",text:"abs",body:"abs",description:"Applies the abs PHP function to a value."};const capitalize={prefix:"capitalize",text:"capitalize",body:"capitalize",description:"Capitalizes a string by applying the ucwords PHP function to the value"};const convert_encoding={prefix:"convert_encoding",body:"convert_encoding('${1:to}', '${2:from}')",text:"convert_encoding('to', 'from')",description:"Converts a string from one charset to another"};const escape_attr={prefix:"escape_attr",text:"escape_attr",body:"escape_attr",description:"Applies Phalcon\\Escaper->escapeCss() to the value"};const escape_js={prefix:"escape_js",text:"escape_js",body:"escape_js",description:"Applies Phalcon\\Escaper->escape_js() to the value"};const format={prefix:"format",body:"format($1)",text:"format()",description:"Formats a string using sprintf.",example:"{% set foo = \"foo\" %}\n{{ \"I like %s and %s.\"| format(foo, \"bar\") }}\n\n{# outputs I like foo and bar #}"};const json_encode={prefix:"json_encode",body:"json_encode",text:"json_encode",description:"Converts a value into its JSON representation"};const json_decode={prefix:"json_decode",body:"json_decode",text:"json_decode",description:"Converts a value from its JSON representation to a PHP representation"};const join={prefix:"join",body:"join('$1')",text:"join",description:"Joins the array parts using a separator join"};const keys={prefix:"keys",text:"keys",body:"keys",description:"Returns the array keys using array_keys"};const left_trim={prefix:"left_trim",text:"left_trim",body:"left_trim",description:"Applies the ltrim PHP function to the value. Removing extra spaces"};const length={prefix:"length",text:"length",body:"length",description:"Counts the string length or how many items are in an array or object"};const lower={prefix:"lower",text:"lower",body:"lower",description:"Change the case of a string to lowercase"};const nl2br={prefix:"nl2br",text:"nl2br",body:"nl2br",description:"Changes newlines \\n by line breaks (<br />). Uses the PHP function nl2br"};const right_trim={prefix:"right_trim",text:"right_trim",body:"right_trim",description:"Applies the rtrim PHP function to the value. Removing extra spaces"};const sort={prefix:"sort",text:"sort",body:"sort",description:"Sorts an array using the PHP function asort"};const trim={prefix:"trim",text:"trim",body:"trim",description:"Applies the trim PHP function to the value. Removing extra spaces"};const upper={prefix:"upper",text:"upper",body:"upper",description:"Change the case of a string to uppercase"};const url_encode={prefix:"url_encode",text:"url_encode",body:"url_encode",description:"Applies the urlencode PHP function to the value"};var filtersArr = {abs:abs,capitalize:capitalize,convert_encoding:convert_encoding,"default": {prefix:"default",body:"default('${1:default_value}')",text:"default('default value')",description:"Sets a default value in case the evaluated expression is empty, not set or evaluates to falsy value"},"escape": {prefix:"escape",text:"escape",body:"escape",description:"Applies Phalcon\\Escaper->escapeHtml() to the value."},escape_attr:escape_attr,escape_js:escape_js,format:format,json_encode:json_encode,json_decode:json_decode,join:join,keys:keys,left_trim:left_trim,length:length,lower:lower,nl2br:nl2br,right_trim:right_trim,sort:sort,"stripslashes ": {prefix:"stripslashes",text:"stripslashes",body:"stripslashes",description:"Applies the stripslashes PHP function to the value. Removing escaped quotes"},"striptags ": {prefix:"striptags",text:"striptags",body:"striptags",description:"Applies the striptags PHP function to the value. Removing HTML tags"},trim:trim,upper:upper,url_encode:url_encode};

const defined={text:"defined",prefix:"defined",body:"defined",description:"(test) Checks if a variable is defined (isset())"};const divisibleby={text:"divisibleby",prefix:"divisibleby",body:"divisibleby",description:"(test) Checks if a value is divisible by other value"};const empty={text:"empty",prefix:"empty",body:"empty",description:"(test) Checks if a variable is empty"};const even={text:"even",prefix:"even",body:"even",description:"(test) Checks if a numeric value is even"};const iterable={text:"iterable",prefix:"iterable",body:"iterable",description:"(test) Checks if a value is iterable. Can be traversed by a ‘for’ statement"};const numeric={text:"numeric",prefix:"numeric",body:"numeric",description:"(test) Checks if value is numeric"};const odd={text:"odd",prefix:"odd",body:"odd",description:"(test) Checks if a numeric value is odd"};const sameas={text:"sameas",prefix:"sameas",body:"sameas",description:"(test) Checks if a value is identical to other value"};const scalar={text:"scalar",prefix:"scalar",body:"scalar",description:"(test) Checks if value is scalar (not an array or object)"};const type={text:"type",prefix:"type",body:"type",description:"(test) Checks if a value is of the specified type"};const not={text:"not",prefix:"not",body:"not",description:"(statement) Negates"};var testConditionArr = {defined:defined,divisibleby:divisibleby,empty:empty,even:even,iterable:iterable,numeric:numeric,odd:odd,sameas:sameas,scalar:scalar,type:type,not:not};

const index={description:"(property) The current iteration of the loop. (1 indexed)"};const index0={description:"(property) The current iteration of the loop. (0 indexed)"};const revindex={description:"(property) The number of iterations from the end of the loop (1 indexed)"};const revindex0={description:"(property) The number of iterations from the end of the loop (0 indexed)"};const first={description:"(property) True if first iteration"};const last={description:"(property) True if last iteration"};const length$1={description:"(property) The number of items in the sequence"};const parent={description:"(property) The parent context"};var loopArr = {index:index,index0:index0,revindex:revindex,revindex0:revindex0,first:first,last:last,length:length$1,parent:parent};

const Comment={prefix:"comment",description:"Comment block",body:["{# $1","\t$2","#}"],scope:"text.html.volt"};const tag={prefix:"tag",description:"Empty tag",body:["{% $1 %}"],scope:"text.html.volt"};const ifb={prefix:"ifb",body:"{% if ${1:condition} %}\n\t$0\n{% endif %}",description:"if (block)",scope:"text.html.volt"};const ife={prefix:"ife",body:"{% if ${1:condition} %}\n\t$2\n{% else %}\n\t$0\n{% endif %}",description:"if ... else",scope:"text.html.volt"};const if1={prefix:"if",body:"{% if ${1:condition} %}$0{% endif %}",description:"if",scope:"text.html.volt"};const endfor={prefix:"endfor",body:"{% endfor %}$0",description:"endfor",scope:"text.html.volt"};const endif={prefix:"endif",body:"{% endif %}$0",description:"endif",scope:"text.html.volt"};const macro={prefix:"macro",body:"{%- macro ${1:name_function}(${2:params}) %}\n\t$0\n{%- endmacro %}",description:"macro",scope:"text.html.volt"};const endmacro={prefix:"endmacro",body:"{%- endmacro %}$0",description:"endmacro",scope:"text.html.volt"};const Super={prefix:"super",description:"Super block",body:["{{ super() }}"],scope:"text.html.volt"};const endblock={prefix:"endblock",body:"{% endblock %}$0",description:"endblock",scope:"text.html.volt"};const Static={prefix:"static",description:"Static file",body:"{{ static('$1') }}",scope:"text.html.volt"};const set={prefix:"set",body:"{% set ${1:name} = ${2:value} %}$0",description:"Assign values to variables",scope:"text.html.volt"};const switchb={prefix:"switch",body:"{% switch ${1:variable} %}\n\n\t{% case \"${2:value1}\" %}\n\t\n\n\t{% case \"${3:value2}\" %}\n\t\n\n\t{% default %}\n\t\n\n{% endswitch %}\n$0",description:"switch",scope:"text.html.volt"};const block={prefix:"block",body:"{% block ${1:name} %}\n\t$0\n{% endblock %}",description:"block",scope:"text.html.volt"};const blockf={prefix:"blockf",body:"{{ block(\"${1:name}\") }}$0",description:"blockf",scope:"text.html.volt"};const url={prefix:"url",description:"URL tag",body:["url('${1:some-url-name}', ${2:arg})"],scope:"text.html.volt"};const dump={prefix:"dump",body:"<pre>\n\t{{ dump($1) }}\n</pre>\n$0",description:"(function) dumps information about a template variable. This is mostly useful to debug a template that does not behave as expected by introspecting its variables",scope:"text.html.volt"};const urla={prefix:"urla",body:"url(\"${1:path}\", ${2:{foo:\"1\", bar:\"2\"\\}}, ${3:\"http\"}, ${4:false})$0",description:"url w/ arguments",scope:"text.html.volt"};const cache={prefix:"cache",body:"{% cache %}\n\t$1\n{% endcache %}\n$0",description:"cache",scope:"text.html.volt"};const endautoescape={prefix:"endautoescape",body:"{% endautoescape %}$0",description:"endautoescape",scope:"text.html.volt"};const endcache={prefix:"endcache",body:"{% endcache %}$0",description:"endcache",scope:"text.html.volt"};const include={prefix:"include",body:"{% include \"${1:filename}.volt\" %}",description:"The include statement includes a template and returns the rendered content of that file into the current namespace",scope:"text.html.volt"};const inc={prefix:"inc",body:"{% include \"${1:template}\" %}$0",description:"inc",scope:"text.html.volt"};const incp={prefix:"include params",body:"{% include \"${1:template}\"${2: with ${3:params} }%}$0",description:"include w/ params",scope:"text.html.volt"};const inckv={prefix:"include params",body:"{% include \"${1:template}\" with [\n\t${2:key}: ${3:\"${4:value}\"}\n] %}\n$0",description:"include w/ key/value",scope:"text.html.volt"};const endswitch={prefix:"endswitch",body:"{% endswitch %}$0",description:"endswitch",scope:"text.html.volt"};const loop={prefix:"loop",body:"loop.",description:"special variables inside of a for loop block",scope:"text.html.volt"};const constant={prefix:"constant",body:"{{ constant('${1:const_name}') }}$1",description:"constant returns the constant value for a given string",example:"{{ some_date | date(constant('DATE_W3C')) }}\n{{ constant('Namespace\\Classname::CONSTANT_NAME') }}",scope:"text.html.volt"};var voltArr = {Comment:Comment,"var": {prefix:"var",description:"Empty Var",body:["{{ $1 }}"],scope:"text.html.volt"},"encode var": {prefix:"encode var",description:"json encode Var",body:["{% set encoded = $1|json_encode %}"],scope:"text.html.volt"},"decode  var": {prefix:"decode var",description:"json decode Var",body:["{% set decode = $1|json_decode %}"],scope:"text.html.volt"},tag:tag,"extends": {prefix:"extends",body:"{% extends \"${1:filename}.volt\" %}",description:"Volt snippets",scope:"text.html.volt"},"for else": {prefix:"for else",body:["{% for ${1:row} in ${2:array} %}","\t$3","{% else %}","\t$4","{% endfor %}"],description:"for ... else",scope:"text.html.volt"},"for": {prefix:"for",body:["{% for ${1:row} in ${2:array} %}","\t$3","{% endfor %}"],description:"Loop over each item in a sequence",scope:"text.html.volt"},"For loop": {prefix:"for",description:"For loop",body:["{% for $1 in $2 %}","$3","{% endfor %}"],scope:"text.html.volt"},"For key": {prefix:"for key",description:"For loop you can get the element keys as in the PHP counterpart using the following syntax",body:["{% for ${1:name},${2:value} in $3 %}","$4","{% endfor %}"],scope:"text.html.volt"},"For if": {prefix:"for if",description:"For loop you can get if evaluation",body:["{% for ${1:row} in ${2:array} if ${3:condition} %}","\t$4","{% endfor %}"],scope:"text.html.volt"},"For loop nested": {prefix:"for",description:"For loop be nested",body:["{% for $1 in $2 %}","    {% for $3 in $1.$3 %}","        {{ $4 }}","    {% endfor %}","{% endfor %}"],scope:"text.html.volt"},"for if else": {prefix:"for if else",body:["{% for ${1:row} in ${2:array} if ${3:condition} %}","\t$4","{% else %}","\t$5","{% endfor %}"],description:"Loop over each item in a sequence",scope:"text.html.volt"},"If condition": {prefix:"if",description:"IF condition",body:["{% if $1 %}","$2","{% else %}","{% endif %}"],scope:"text.html.volt"},"elseif condition": {prefix:"elseif",description:"elseif condition",body:"{% elseif ${1:condition} %}",scope:"text.html.volt"},"else": {prefix:"else",body:"{% else %}",description:"The if statement in Volt is comparable with the if statements of PHP",scope:"text.html.volt"},"if": {prefix:"if",body:"{% if ${1:condition} %}$2{% endif %}\n$0",description:"if",scope:"text.html.volt"},ifb:ifb,ife:ife,if1:if1,endfor:endfor,endif:endif,macro:macro,endmacro:endmacro,Super:Super,"if else": {prefix:"if else",body:["{% if ${1:condition} %}","\t$1","{% else %}","\t$2","{% endif %}"],description:"The if statement in Volt is comparable with the if statements of PHP",scope:"text.html.volt"},"Template Block": {prefix:"block",description:"Creates a block",body:["{% block ${1:template_name} %}","$2","{% endblock %}"],scope:"text.html.volt"},endblock:endblock,Static:Static,set:set,switchb:switchb,"switch": {prefix:"switch",body:"{% switch $1:variable %}\n\t$0",description:"switch",scope:"text.html.volt"},block:block,blockf:blockf,url:url,"case": {prefix:"case",body:"{% case \"${1:value}\" %}\n\t$0",description:"case",scope:"text.html.volt"},"default": {prefix:"default",body:"{% default %}\n\t$0",description:"case",scope:"text.html.volt"},"break": {prefix:"break",body:"{% break %}\n\t$0",description:"break",scope:"text.html.volt"},dump:dump,"do": {prefix:"do",body:"{% do $1 %}$0",description:"The do tag works exactly like the regular variable expression ({{ ... }}) just that it doesn't print anything",example:"{% do 1 + 2 %}",scope:"text.html.volt"},urla:urla,cache:cache,endautoescape:endautoescape,endcache:endcache,include:include,inc:inc,incp:incp,inckv:inckv,endswitch:endswitch,"else if": {prefix:"else if",body:"{% elseif ${1:condition} %}",description:"The if statement in Volt is comparable with the if statements of PHP",scope:"text.html.volt"},loop:loop,constant:constant};

const editor = vscode.workspace.getConfiguration('editor');
const config = vscode.workspace.getConfiguration('volt-phalcon-language');

function createHover(snippet, type) {
    const example = typeof snippet.example == 'undefined' ? '' : snippet.example;
    const description = typeof snippet.description == 'undefined' ? '' : snippet.description;
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
}
function arrVoltCustom(filePath,type) {
    path.join(filePath);
    let str = fs.readFileSync(filePath).toString();
    let voltCustomArray ={};

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
    return voltCustomArray;
}

let voltCustomArrayFunction = arrVoltCustom(config.completionsVoltCustom,'addFunction');
let voltCustomFilter = arrVoltCustom(config.completionsVoltCustom,'addFilter');



function activate(context) {
    const active = vscode.window.activeTextEditor;
    if (!active || !active.document) return

    registerDocType('html');
    registerDocType('js.volt');
    registerDocType('volt');
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
                    const start = new vscode.Position(0, 0);

                    const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);

                    const rng = new vscode.Range(start, end);
                    return prettyDiff(document, rng);
                }
            }));

            context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
                provideDocumentRangeFormattingEdits: function (document, range) {
                    let end = range.end;

                    if (end.character === 0) {
                        end = end.translate(-1, Number.MAX_VALUE);
                    } else {
                        end = end.translate(0, Number.MAX_VALUE);
                    }

                    const rng = new vscode.Range(new vscode.Position(range.start.line, 0), end);
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
