# cs50SimpleAutoComplete
its autocomplete for cs50 c programming

# how to install
1. add at the end of the cloud9 url "?debug=2" but not after #
  for example 
  https://ide.cs50.io/user_name/ide50#openfile-x 
  will be https://ide.cs50.io/user_name/ide50?debug=2#openfile-x
  or just https://ide.cs50.io/user_name/ide50?debug=2

  same goes for https://ide.c9.io/user_name/ide50 will be https://ide.c9.io/user_name/ide50?debug=2

2. from file select new plugin -> empty plugin

3. there will be two new folders under plugins _ and plugin.simple
  delete _ and rename plugin.simple to cs50SimpleAutoComplete

4. copy cs50SimpleAutoComplete.js and package.json to the folder and you are good to go (you can delete the other files)

note : there will a banner telling you that you are in debug note you can uncomment the lines 29-30 in cs50SimpleAutoComplete.js to hide this banner once the plugin started
