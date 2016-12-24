define(function(require, exports, module) {
    main.consumes = ["Plugin", "ace", "clipboard"];
    main.provides = ["cs50SimpleAutoComplete"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var aceHandle = imports.ace;
        var clipboard = imports.clipboard;
        
        /***** Initialization *****/
        var ace;
        var plugin = new Plugin("Ajax.org", main.consumes);
        var emit = plugin.getEmitter();
        var work = false;
        var div;
        var textarea;
        var oldFocused;
        var focused;
        var lineNo;
        var functions = {"libraries":["cs50.h","ctype.h","locale.h","math.h","setjmp.h","signal.h","stdarg.h","stdio.h","stdlib.h","string.h","time.h"],"functions":[{"name":"get_char","library":0},{"name":"get_double","library":0},{"name":"get_float","library":0},{"name":"get_int","library":0},{"name":"get_long_long","library":0},{"name":"get_string","library":0},{"name":"isalnum","library":1},{"name":"isalpha","library":1},{"name":"isblank","library":1},{"name":"iscntrl","library":1},{"name":"isdigit","library":1},{"name":"isgraph","library":1},{"name":"islower","library":1},{"name":"isprint","library":1},{"name":"ispunct","library":1},{"name":"isspace","library":1},{"name":"isupper","library":1},{"name":"isxdigit","library":1},{"name":"tolower","library":1},{"name":"toupper","library":1},{"name":"localeconv","library":2},{"name":"setlocale","library":2},{"name":"acos","library":3},{"name":"acosh","library":3},{"name":"asin","library":3},{"name":"asinh","library":3},{"name":"atan","library":3},{"name":"atan2","library":3},{"name":"atanh","library":3},{"name":"ceil","library":3},{"name":"copysign","library":3},{"name":"cos","library":3},{"name":"cosh","library":3},{"name":"erf","library":3},{"name":"erfc","library":3},{"name":"exp","library":3},{"name":"exp2","library":3},{"name":"expm1","library":3},{"name":"fabs","library":3},{"name":"fdim","library":3},{"name":"floor","library":3},{"name":"fma","library":3},{"name":"fmax","library":3},{"name":"fmin","library":3},{"name":"fmod","library":3},{"name":"fpclassify","library":3},{"name":"frexp","library":3},{"name":"ilogb","library":3},{"name":"isfinite","library":3},{"name":"isgreater","library":3},{"name":"isgreaterequal","library":3},{"name":"isinf","library":3},{"name":"isless","library":3},{"name":"islessequal","library":3},{"name":"islessgreater","library":3},{"name":"isnan","library":3},{"name":"isnormal","library":3},{"name":"isunordered","library":3},{"name":"ldexp","library":3},{"name":"llrint","library":3},{"name":"llround","library":3},{"name":"log","library":3},{"name":"log10","library":3},{"name":"log1p","library":3},{"name":"log2","library":3},{"name":"logb","library":3},{"name":"lrint","library":3},{"name":"lround","library":3},{"name":"modf","library":3},{"name":"nearbyint","library":3},{"name":"pow","library":3},{"name":"remainder","library":3},{"name":"remquo","library":3},{"name":"rint","library":3},{"name":"round","library":3},{"name":"scalbln","library":3},{"name":"scalbn","library":3},{"name":"signbit","library":3},{"name":"sin","library":3},{"name":"sinh","library":3},{"name":"sqrt","library":3},{"name":"tan","library":3},{"name":"tgamma","library":3},{"name":"trunc","library":3},{"name":"longjmp","library":4},{"name":"setjmp","library":4},{"name":"raise","library":5},{"name":"signal","library":5},{"name":"stdarg","library":6},{"name":"va_arg","library":6},{"name":"va_copy","library":6},{"name":"va_end","library":6},{"name":"va_start","library":6},{"name":"clearerr","library":7},{"name":"fclose","library":7},{"name":"feof","library":7},{"name":"ferror","library":7},{"name":"fflush","library":7},{"name":"fgetc","library":7},{"name":"fgetpos","library":7},{"name":"fgets","library":7},{"name":"fopen","library":7},{"name":"fprintf","library":7},{"name":"fputc","library":7},{"name":"fputs","library":7},{"name":"fread","library":7},{"name":"freopen","library":7},{"name":"fscanf","library":7},{"name":"fseek","library":7},{"name":"fsetpos","library":7},{"name":"ftell","library":7},{"name":"fwrite","library":7},{"name":"getc","library":7},{"name":"getchar","library":7},{"name":"gets","library":7},{"name":"perror","library":7},{"name":"printf","library":7},{"name":"putc","library":7},{"name":"putchar","library":7},{"name":"puts","library":7},{"name":"remove","library":7},{"name":"rewind","library":7},{"name":"scanf","library":7},{"name":"setbuf","library":7},{"name":"setvbuf","library":7},{"name":"snprintf","library":7},{"name":"sprintf","library":7},{"name":"sscanf","library":7},{"name":"tmpfile","library":7},{"name":"tmpnam","library":7},{"name":"ungetc","library":7},{"name":"vfprintf","library":7},{"name":"vfscanf","library":7},{"name":"vprintf","library":7},{"name":"vscanf","library":7},{"name":"vsnprintf","library":7},{"name":"vsprintf","library":7},{"name":"vsscanf","library":7},{"name":"_Exit","library":8},{"name":"abort","library":8},{"name":"abs","library":8},{"name":"atexit","library":8},{"name":"atof","library":8},{"name":"atoi","library":8},{"name":"atol","library":8},{"name":"atoll","library":8},{"name":"bsearch","library":8},{"name":"calloc","library":8},{"name":"div","library":8},{"name":"drand48","library":8},{"name":"exit","library":8},{"name":"free","library":8},{"name":"getenv","library":8},{"name":"labs","library":8},{"name":"ldiv","library":8},{"name":"llabs","library":8},{"name":"lldiv","library":8},{"name":"malloc","library":8},{"name":"mblen","library":8},{"name":"mbstowcs","library":8},{"name":"mbtowc","library":8},{"name":"qsort","library":8},{"name":"rand","library":8},{"name":"realloc","library":8},{"name":"srand","library":8},{"name":"srand48","library":8},{"name":"strtod","library":8},{"name":"strtof","library":8},{"name":"strtol","library":8},{"name":"strtold","library":8},{"name":"strtoll","library":8},{"name":"strtoul","library":8},{"name":"strtoull","library":8},{"name":"system","library":8},{"name":"wcstombs","library":8},{"name":"wctomb","library":8},{"name":"memchr","library":9},{"name":"memcmp","library":9},{"name":"memcpy","library":9},{"name":"memmove","library":9},{"name":"memset","library":9},{"name":"strcat","library":9},{"name":"strchr","library":9},{"name":"strcmp","library":9},{"name":"strcoll","library":9},{"name":"strcpy","library":9},{"name":"strcspn","library":9},{"name":"strerror","library":9},{"name":"strlen","library":9},{"name":"strncat","library":9},{"name":"strncmp","library":9},{"name":"strncpy","library":9},{"name":"strpbrk","library":9},{"name":"strrchr","library":9},{"name":"strspn","library":9},{"name":"strstr","library":9},{"name":"strtok","library":9},{"name":"strxfrm","library":9},{"name":"asctime","library":10},{"name":"clock","library":10},{"name":"ctime","library":10},{"name":"difftime","library":10},{"name":"gmtime","library":10},{"name":"localtime","library":10},{"name":"mktime","library":10},{"name":"strftime","library":10},{"name":"time","library":10}]}
        aceHandle.on("create", function(e) {
            // This is an ace editor instance
            ace = e.editor;
        })
        function load() {
            
            // uncomment the follow two lines to hide the debug banner
            // document.getElementsByClassName("basic")[0].style.display = "none"; 
            // document.getElementsByClassName("vsplitbox")[1].style.top = 0;
            
            textarea = document.getElementsByClassName("ace_text-input")[1];
            createAndStyleDiv();
            
            // check when the user change the tab he working on if its c
            document.addEventListener('click', function (e) {
                if (hasClass(e.target, 'sessiontab_title')) {
                    checkFile();
                } 
            }, false);
            
            // check when the user open new file if its c
            document.addEventListener('dblclick', function (e) {
                if (hasClass(e.target, 'ace_tree_cells')) {
                    checkFile();
                }
            }, false);
            
            // check if the file open when the page load is c
            checkFile();
            
            
            
            window.onkeyup = checkTypeing;
            
            window.onkeydown = checkFor;
        }
        
        /***** Methods *****/
        
        function checkFor(e)
        {
            if(div.getAttribute("data-active") === "true")
            {
                if(e.key == "Enter")
                {
                    re = /[a-zA-Z0-9_]+$/g;
                    lineNo = document.getElementsByClassName("ace_active-line")[0].style.top.replace("px","") / 14;
                    var line = document.getElementsByClassName("ace_line")[lineNo].textContent;
                    var subLine = line.substring(0,focused);
                    if ((match = re.exec(subLine)) != null) {
                        var written = match[0];
                        var functionName = div.getElementsByClassName("selected")[0].textContent;
                        var temp = functionName.split(written);
                        clipboard.clipboardData.setData("text/plain", temp[1]);
                        clipboard.paste();
                        lineNo = parseInt(document.getElementsByClassName("lbl_row_col")[0].textContent.split(":")[0]) - 1;
                        ace.scrollTo(lineNo, focused - written.length);
                        clipboard.clipboardData.setData("text/plain", temp[0]);
                        clipboard.paste();
                        ace.scrollTo(lineNo, focused + functionName.length - written.length);
                    }
                    e.stopPropagation();
                    e.preventDefault();  
                    e.stopImmediatePropagation();
                    e.returnValue = false;
                    e.cancelBubble = true;
                    return false;
                }
            }
        }
        
        function createAndStyleDiv()
        {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.setAttribute("id", "suggestions");
            var style = 
            "#suggestions{"+
                "position: fixed;"+
                "background: #444444;"+
                "color: #bbbbbb;"+
                "z-index: 999999;"+
            "}"+
            "#suggestions ul{"+
                "list-style: none;"+
                "padding: 0;"+
                "margin: 0;"+
            "}"+
            "#suggestions li{"+
                "padding: 2px;"+
            "}"+
            "#suggestions li.selected{"+
            "background: #bbbbbb;"+
            "color: #444444;"+
            "}"+
            
            ""
            ;
            var styleElement = document.createElement("style");
            document.head.appendChild(styleElement);
            styleElement.textContent = style;
        }
        
        // check if the element has class
        function hasClass(elem, className) {
            return elem.className.split(' ').indexOf(className) > -1;
        }

        // check if the focused tab is c
        function checkFile()
        {
            var fileOpened = document.getElementsByClassName("focus")[0].textContent.trim();
            var extension = fileOpened.substring(fileOpened.lastIndexOf(".") + 1);
            if(extension == "c")
            {
                work = true;
            }
            else
            {
                work = false;
                removeSuggestion();
            }
        }
        
        function checkTypeing(e){
            oldFocused = focused;
            if(!work)
            {
                removeSuggestion();
                return;
            }
            if(document.activeElement != textarea)
            {
                // he is not writing in the text area
                removeSuggestion();
                return;
            }
            
            focused = parseInt(document.getElementsByClassName("lbl_row_col")[0].textContent.split(":")[1]) - 1;
            lineNo = document.getElementsByClassName("ace_active-line")[0].style.top.replace("px","") / 14;
            var line = document.getElementsByClassName("ace_line")[lineNo].textContent;
                
            if(div.getAttribute("data-active") === "true")
            {
                
                if(e.key == "ArrowDown")
                {
                    moveSuggestion(1);
                    return false;
                }
                if(e.key == "ArrowUp")
                {
                    moveSuggestion(-1);
                    return false;
                }
            }
            
            if(document.getElementsByClassName('ace_selection').length > 0)
            {
                // he is doing something to the text he selected
                removeSuggestion();
                return;
            }
            
            if(e.key != line[focused - 1] && e.key != "Delete" && e.key != "Backspace")
            {
                
                // if he didn't write the last character on the line or delete something then ignore it
                removeSuggestion();
                return;
            }
            
            if((line.substring(0, focused-1).match(/"/g) || []).length % 2 == 1 )
            {
                // he is writing text not code
                removeSuggestion();
                return;
            }
            
            // here start are the real fun
            // if its in the first
            var re = /^[a-zA-Z_][a-zA-Z0-9_]*/g;
            var match = re.exec(line);
            if (match != null) {
                var matchEnd = match[0].length + match.index;
                if(matchEnd == focused)
                {
                    var functionName = match[0];
                    search_function(functionName);
                    return;
                }
            }
            re = /[({ +\-*/&|[><=?:;][a-zA-Z_][a-zA-Z0-9_]*/g;
            while ((match = re.exec(line)) != null) {
                var matchEnd = match[0].length + match.index;
                if(matchEnd == focused)
                {
                    var functionName = match[0].substring(1);
                    search_function(functionName);
                    return;
                }
            }
            removeSuggestion();
            return;
        }
        
        function search_function(function_name)
        {
            var start_count = 0;
            var other_count = 0;
            var others = [];
            var divHTML = "<ul>";
            for(var i = 0, l = functions["functions"].length; i < l; i++)
            {
                var index = functions["functions"][i]["name"].indexOf(function_name);
                if(index == 0)
                {
                    if(functions["functions"][i]["name"] == function_name)
                    {
                        // its what he typed, can't suggest that right!
                        continue;
                    }
                    divHTML += "<li data-library='" + functions["functions"][i]["library"] + "'>" + functions["functions"][i]["name"] + "</li>";
                    if(++start_count > 5)
                    {
                        break;
                    }
                }
                else if(index != -1)
                {
                    if(functions["functions"][i]["name"] == function_name)
                    {
                        // its what he typed, can't suggest that right!
                        continue;
                    }
                    if(other_count + start_count <= 4)
                    {
                        others[other_count] = [];
                        others[other_count]["name"] = functions["functions"][i]["name"];
                        others[other_count++]["library"] = functions["functions"][i]["library"];
                    }
                }
                
            }
            for(var i = 0; i < 5 - start_count && i < other_count; i++)
            {
                divHTML += "<li data-library='" + others[i]["library"] + "'>" + others[i]["name"] + "</li>";
            }
            if(start_count > 0 || other_count > 0)
            {
                divHTML += "</ul>";
                div.innerHTML = divHTML;
                div.setAttribute("data-active", true);
                div.setAttribute("data-child", 0);
                div.getElementsByTagName("li")[0].setAttribute("class", "selected");
                var cursor = document.getElementsByClassName("ace_cursor")[0];
                var cursorPosition = getPosition(cursor);
                div.style.left = cursorPosition.x + "px";
                div.style.top = cursorPosition.y + parseInt(cursor.style.height.replace("px","")) + "px";
            }
            else
            {
                removeSuggestion();
            }
            
        }
        
        function getPosition(element) {
            var xPosition = 0;
            var yPosition = 0;
        
            while(element) {
                xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
            }
        
            return { x: xPosition, y: yPosition };
        }

        
        function removeSuggestion()
        {
            div.innerHTML = "";
            div.setAttribute("data-active", false);
            div.setAttribute("data-child", 0);
        }
        
        function moveSuggestion(n)
        {
            lineNo = parseInt(document.getElementsByClassName("lbl_row_col")[0].textContent.split(":")[0]);
            ace.scrollTo(lineNo - n - 1, oldFocused);
            focused = oldFocused;
            var lis = div.getElementsByTagName("li");
            var l = lis.length;
            var oldChild = parseInt(div.getAttribute("data-child"));
            var newChild = oldChild + n;
            if(newChild >= 0 && newChild < l )
            {
                lis[oldChild].setAttribute("class", "");
                lis[newChild].setAttribute("class", "selected");
                div.setAttribute("data-child", newChild);
                
            }
        }
        
        /***** Lifecycle *****/
        
        plugin.on("load", function() {
            load();
        });
        plugin.on("unload", function() {
        
        });
        
        /***** Register and define API *****/
        
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "cs50SimpleAutoComplete": plugin
        });
    }
});
