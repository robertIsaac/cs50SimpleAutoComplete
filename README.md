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

3. execute these commands then
  cd ~/.c9/plugins
  rm * -r
  git clone https://github.com/robertIsaac/cs50SimpleAutoComplete

note : there will a banner telling you that you are in debug note you can uncomment the lines 29-30 in cs50SimpleAutoComplete.js to hide this banner once the plugin started
