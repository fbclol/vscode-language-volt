
{## variable ##}
{{ post.title }} {# for $post->title #}
{{ post['title'] }} {# for $post['title'] #}


{## filters ##}
{{ post.title|e }}
{{ post.content|striptags }}
{{ name|capitalize|trim|trim }}
{{ loop.first }}
{# e or escape filter #}
{{ '<h1>Hello<h1>'|e }}
{{ '<h1>Hello<h1>'|escape }}
{{ tet|}}
{{ 'test' |stripslashes}}
{{ 'test' |left_trim }}

{{ constant('bonjour') }}
{# trim filter #}
{{ '   hello   '|trim }}

{{ 'test'|stripslashes}}
{% test is }
{# striptags filter #}
{{ '<h1>Hello<h1>'|striptags }}

{# slashes filter #}
{{ ''this is a string''|slashes }}

{# stripslashes filter #}
{{ '\'this is a string\''|stripslashes }}

{# capitalize filter #}
{{ 'hello'|capitalize }}

{# lower filter #}
{{ 'HELLO'|lower }}

{# upper filter #}
{{ 'hello'|upper }}

{# length filter #}
{{ 'robots'|length }}
{{ [1, 2, 3]|length }}

{# nl2br filter #}
{{ 'some\ntext'|nl2br }}

{# sort filter #}
{% set sorted = [3, 1, 2]|sort %}

{# keys filter #}
{% set keys = ['first': 1, 'second': 2, 'third': 3]|keys %}

{# join filter #}
{% set joined = 'a'..'z'|join(',') %}

{# format filter #}
{{ 'My real name is %s'|format(name) }}

{# json_encode filter #}
{% set encoded = robots|json_encode %}

{# json_decode filter #}
{% set decoded = '{'one':1,'two':2,'three':3}'|json_decode %}

{# url_encode filter #}
{{ post.permanent_link|url_encode }}

{# convert_encoding filter #}
{{ 'désolé'|convert_encoding('utf8', 'latin1') }}


{# note: this is a comment
    {% set price = 100; %}
#}

{# List of Control Structures #}
<h1>Robots</h1>
{% for robot in robots %}
    {% for part in robot.parts %}
        Robot: {{ robot.name|e }} Part: {{ part.name|e }} <br />
    {% endfor %}
{% endfor %}

{% test| %}

{% test is divisibleby

{% set numbers = ['one': 1, 'two': 2, 'three': 3] %}

{% for name, value in numbers %}
    Name: {{ name }} Value: {{ value }}
{% endfor %}

{% te is }
{# Loop Controls #}
{% set encoded = freijo|json_encode %}

{# skip the even robots #}
{% for index, robot in robots %}
    {% if index is even %}
        {% continue %}
    {% endif %}
{% endfor %}
{{ test|capitalize}}
{% test|}
{{ test is }}
{{ test is defined }}

{# exit the foreach on the first even robot #}
{% for index, robot in robots %}
    {% if index is even %}
        {% break %}
    {% endif %}
    ...
{% endfor %}


{# block if and elseif #}
{% if robot.type === 'cyborg' %}
    Robot is a cyborg
{% elseif robot.type === 'virtual' %}
    Robot is virtual
{% elseif robot.type === 'mechanical' %}
    Robot is mechanical
{% endif %}

{# block switch #}
{% switch foo %}
    {% case 0 %}
    {% case 1 %}
    {% case 2 %}
        "foo" is less than 3 but not negative
        {% break %}
    {% case 3 %}
        "foo" is 3
        {% break %}
    {% default %}
        "foo" is {{ foo }}
{% endswitch %}



{# loop context #}
{% for robot in robots %}
    {% if loop.first %}
        <table>
            <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
            </tr>
    {% endif %}
            <tr>
                <td>{{ loop.index }}</td>
                <td>{{ robot.id }}</td>
                <td>{{ robot.name }}</td>
            </tr>
    {% if loop.last %}
        </table>
    {% endif %}
{% endfor %}


{# Assignments #}
{% set fruits = ['Apple', 'Banana', 'Orange'] %}

{% set name = robot.name %} {# Standard Assignment  #}

{# other opérator #}
{% set price += 100.00 %} {# Addition   Assignments #}
{% set price -= 100.00 %} {# Subtraction   Assignments #}
{% set price \*= 100.00 %} {# Multiplication   Assignments #}
{{ set price /= 100.00 }} {# Division   Assignments #}

{% set age *= 5 %}

{# expression #}
{{ (1 + 1)  2 }}

{% do (1 + 1) * 2 %}


{# literals #}
{{ 'this is a string' }}
{{ true }}
{{ false }}
{{ 100.25 }}
{{ 100 }}
{{ null }}


{# Simple array #}
{{ ['Apple', 'Banana', 'Orange'] }}

{# Other simple array #}
{{ ['Apple', 1, 2.5, false, null] }}

{# Multi-Dimensional array #}
{{ [[1, 2], [3, 4], [5, 6]] }}

{# Hash-style array #}
{{ ['first': 1, 'second': 4/2, 'third': '3'] }}

{# logic #}
{{ or }}
{{ and }}
{{ not }}
{{ 1..10 }}
{{ 'a' ? 'b' : 'c' }}

{#  test #}
{% 'test' is defined %}
{% 'test' is divisibleby %}
{% 'test' is empty %}
{% 'test' is even %}
{% 'test' is iterable %}
{% 'test' is numeric %}
{% 'test' is odd %}
{% 'test' is defined %}
{% 'test' is sameas %}
{% 'test' is scalar %}
{% 'test' is type('int') %}

{#  macro #}
{%- macro related_bar(related_links) %}
{{ related_bar(links) }}

{%- macro error_messages(message, field, type) %}
    <div>
        <span class='error-type'>{{ type }}</span>
        <span class='error-field'>{{ field }}</span>
        <span class='error-message'>{{ message }}</span>
    </div>
{%- endmacro %}

{# Call the macro #}
{{ error_messages('type': 'Invalid', 'message': 'The name is invalid', 'field': 'name') }}

{{ tge is default}}

{# tag helpers #}
{{ javascript_include('js/jquery.js') }}

{{ form('products/save', 'method': 'post') }}

    <label for='name'>Name</label>
    {{ text_field('name', 'size': 32) }}

    <label for='type'>Type</label>
    {{ select('type', productTypes, 'using': ['id', 'name']) }}

    {{ submit_button('Send') }}

{{ date() }}

<pre>
    {{ dump() }}
</pre>
{% exit %}

{% for row in array %}
    {% for line in row.line %}
        {{ line }}
    {% endfor %}
{% endfor %}

<script>
var test = 12;
<textarea name="" id="" cols="30" rows="10"></textarea>
$.get();
console.log('dezfz');
</script>
