

# PWrequirements
*set password requirements and check if they're met on the go*

- currently only available in German

## Demo
http://noelseifert.github.io/PWrequirements

## Implementation
- Add the following to your `<head>` tag:

  ```HTML
  <link rel="stylesheet" type="text/css" href="PWrequirements.css">
  ```
- add the following `<script>` tag before your closing `<body>` tag so it won't interfere with the loading of other files (e.g. jQuery)

  ```HTML
  <script type="text/javascript" src="PWrequirements.js"></script>
  ```

## Usage
- implement **PWrequirements**.js and **PWrequirements**.css
- add a `<script>` tag in which you call **PWrequirements** with your choice of settings right before your clsoing `<body>` tag
- `<script>` tag example:
 ```HTML
 <script type="text/javascript">  
  $(function () {  
        $("input[type=password]").PWrequire({  
            useLowercase: 5,  
            useNumbers: 1,  
            useUppercase: 4,  
            useSpecial: -1,  
            minCharacter: 8,  
            maxCharacter: 0,  
            minCharacterDisplayType: "advanced",  
           lowercaseDisplayType: "advanced"  
        });  
  })  
</script>
```
- add  **PWreq-PW** as an ID to your password `<input id="PWreq-PW" type="password">`
- add **PWreq-form** as an ID to your `<form id="PWreq-form">`
## Recommendations
- it is highly suggested to use the following HTML structure in your `<form>` so that the impementation is fast and easy:
```HTML
<form id="PWreq-form">
   <div>
      <label></label>
      <input id="PWreq-PW" type="password">
   </div>
</form>
```

## Info regarding future updates
- light / dark theme setting
- muli-language support

## Settings
|Setting|Type|Default value |Description|
|--|--|--|--|
|minCharcter	|int|	8	|minimal Password length (-1 = no restriction, 0 = will not be required)|
|maxCharcter	|int|	16|maximal Password length (-1 = no restriction, 0 = will not be required)|
|useLowercase	|int|	0	|number of required lowercase letters (-1 = no restriction, 0 = will not be required)|
|useUppercase	|int|	0	|number of required uppercase letters (-1 = no restriction, 0 = will not be required)|
|useNumbers		|int|	0	|number of required numbers (-1 = no restriction, 0 = will not be required)|
|useSpecial		|int|	0	|number of required special characters (-1 = no restriction, 0 = will not be required)|
### Display types
- The *DisplayType* property let's you choose how to display the text in the checklist
- The two options are "less" and "advanced"
    - ***"less"*** only let's the user know if he/she satisfied / met the given requirement
    - ***"advanced"*** displays the progress of the requirement's satisfaction, e.g. *x out of y lowercase letters*

|Setting|Type|Default value| Description|
|--|--|--|--|
|minCharacterDisplayType|string|"less"|-|
|maxCharacterDisplayType|string|"less"|-|
|lowercaseDisplayType|string|"less"|-|
|uppercaseDisplayType|string|"less"|-|
|numbersDisplayType|string|"less"|-|
|specialDisplayType|string|"less"|-|
|reqExplain|boolean|true|display requirements explanation text|
|fadeTime|int|300|fade out time in milliseconds when requirements are satisfied|

## Dependencies
jQuery 3.6.0

## Browser support
**PWrequirements** should work with all mordern browsers

## License
Copyright (c) 2022 Noel Seifert

Licensed under the MIT license
