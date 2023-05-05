
![alt](images/icon.png)
<h1>Volt Phalcon for VS Code</h1>

<p>
  <img src="https://img.shields.io/badge/version-1.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/fbclol/vscode-language-volt/graphs/commit-activity/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/fbclol/vscode-language-volt/graphs/commit-activity/blob/master/LICENSE.md">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>

- Syntax highlighting
- Snippets
- Emmet
- Pretty Diff 3 Formatting
- Hover
- Completions

## demo

### basic

![recording](vscode-language-volt.gif)

### what's up

![recording](vscode-volt-custom.gif)

## configuration

Each have their advantage and their disadvantage
It is possible to use 4 types of languages:

| Id language         | Description                                        |
|---------------------|----------------------------------------------------|
| html                | Volt with HTML intellisense / autocompletion       |
| Volt (HTML)         | Volt without HTML intellisense / autocompletion    |
| javascript          | Volt with HTML/JS intellisense / autocompletion    |
| Js (Volt)           | Volt without HTML/JS intellisense / autocompletion |

Simply add these lines depending from your choise by language to your VS Code settings to get emmet working and also to associate HTML files as twig syntax.

Example :

```json
    "files.associations": {
        ".volt": "volt",
        ".js.volt" : "js.volt"
    },
    "emmet.includeLanguages": {
        "volt": "html",
        "javascript": "html",
        "js.volt": "html"
    },
    "volt-phalcon-language.completionsVoltCustom" : "/myProjectPhalcon/app/config/services.php"
```

change your path for use completions volt custom

## Tips

you can change the language quickly at any time according to your needs:
keyboard shortcut.

```
  CTRL + K M
```

Create a file in the root projet (jsconfig.json).
To get jquery autocompletion

```json
{
    "typeAcquisition": {
        "include": [
            "jquery"
        ]
      },
      "compilerOptions": {
        "module": "commonjs",
        "target": "es6"
      },
      "exclude": ["node_modules"]
   }
```

## Installation

Install through Visual Studio Code extensions. Search for `volt phalcon language`

```bash
ext install fbclol.volt-phalcon-language
```

[Visual Studio Code Market Place: volt phalcon language](https://marketplace.visualstudio.com/items?itemName=fbclol.volt-phalcon-language)

## Documentation

volt phalcon language is a Visual Studio Code extension that provides snippets, syntax highlighting, hover, and formatting for the Volt file format.

### Volt syntax highlighting and language support

This extension provides language support for the Volt syntax.

### Code formatter/beautifier for Volt files

Using PrettyDiff, this extension implements the only working code formatter for Volt files in VS Code.

### Information about Volt code on hover

VS Code Volt phalcon language shows information about the symbol/object that's below the mouse cursor when you hover within Volt files.

### Volt code snippets

Adds a set of Volt code snippets to use in your Volt templates.

### Generic Triggers

```swift

do                {% do ... %}
extends           {% extends 'template' %}

inc, include      {% include 'template' %}
incp              {% include 'template' with params %}
inckv             {% include 'template' with { key: value } %}

autoescape        {% autoescape 'type' %}...{% endautoescape %}
block             {% block name %} ... {% endblock %}

macro             {% macro name(params) %}...{% endmacro %}
set               {% set var = value %}


if, ifb           {% if condition %} ... {% endif %}
ife               {% if condition %} ... {% else %} ... {% endif %}
for               {% for item in seq %} ... {% endfor %}
fore              {% for item in seq %} ... {% else %} ... {% endfor %}

else              {% else %}
endif             {% endif %}
endfor            {% endfor %}
endblock          {% endblock %}
endautoescape     {% endautoescape %}
endmacro          {% endmacro %}

```

### Craft Triggers

```swift

cache                    {% cache %}...{% endcache %}

css                      {% css %}...{% endcss %}
js                       {% js %}...{% endjs %}

redirect                 {% redirect 'login' %}

switch                   {% switch variable %}...{% endswitch %}

case                     {% case "value" %}
endcache                 {% endcache %}

url, urla                url('path'), url('path', params, 'http', false)

dump                     <pre>{{ dump() }}</pre>
```

### Filter Completions

{{ xxx| }} or {% xxx| %} autocompletions or press `|` and `espace`

```swift

abs                     variable | abs
capitalize              variable | capitalize
convert_encoding        variable | convert_encoding('to', 'from')
default                 variable | default('default value')
escape                  variable | escape
escape_attr             variable | escape_attr
escape_js               variable | escape_js
format                  variable | format()
join                    variable | join
json_decode             variable | json_decode
json_encode             variable | json_encode
keys                    variable | keys
left_trim               variable | left_trim
length                  variable | length
lower                   variable | lower
nl2br                   variable | nl2br
right_trim              variable | right_trim
sort                    variable | sort
stripslashes            variable | stripslashes
striptags               variable | striptags
trim                    variable | trim
upper                   variable | upper
url_encode              variable | url_encode

```

### Tests Completions

Tests can be used to test if a variable has a valid expected value.
The operator `is` or `not` is used to perform the tests

```swift
defined           {% if 'test' is defined %}
divisibleby       {% if 10 is divisibleby 2 %}
empty             {% if '' is not empty %}
even              {% if 1 is even %}
iterable          {% if 'test' is iterable %}
numeric           {% if 'test' is numeric %}
odd               {% if 2 is odd %}
sameas            {% if 'test' is sameas %}
scalar            {% if 'test' is scalar %}
type              {% if 'test' is type %}

```

### Example Forms

```volt

comming soon

```

### other function by Phalcon (service.php)

detector for autocomplet all function or filter by file Phalcon PHP
Extension will detect in the php file. You are going to be entitled to information overview and autocompletion

#### Example / extract

```php

 $volt->getCompiler()
    ->addFunction('strtotime', 'strtotime')
    ->addFunction('sprintf', 'sprintf')
    ->addFunction('str_replace', 'str_replace')
    ->addFilter('ucfirst_custom', 'ucfirst_custom');
    ->addFilter('ucfirst_custom2', 'ucfirst_custom2');
```

```swift
strtotime        {{ strtotime() }}
sprintf          {{ sprintf() }}
str_replace      {{ str_replace() }}
is_a             {{ variable|ucfirst_custom }}
ucfirst_custom2  {{ variable|ucfirst_custom2 }}
```

## Author

👤 **Franck Boué**

* Github: [@fbclol](https://github.com/fbclol)

## 🤝 Contributing

Contributions, issues and feature requests are welcome !<br />Feel free to check [issues page](https://github.com/fbclol/vscode-language-volt/issues).

## Show your support

Give a ⭐️ if this project helped you !

## 📝 License

Copyright © 2020 [Franck Boué](https://github.com/fbclol).<br />
This project is [MIT](https://github.com/fbclol/vscode-language-volt/blob/master/LICENSE.md) licensed.
