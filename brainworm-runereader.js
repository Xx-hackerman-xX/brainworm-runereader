// ==UserScript==
// @name         Brainworm NeoRuneReader
// @version      1.3.1
// @description  automagically decode brainworm runes
// @author       github.com/Xx-hackerman-xX
// @match        *://*.brainworm.rodeo/*
// @match        *://*.brainworm.surgery/*
// @icon         https://brainworm.surgery/src/c4ac663596de50d3.png
// @grant        none
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/Xx-hackerman-xX/brainworm-runereader/refs/heads/main/brainworm-runereader.js
// ==/UserScript==

/* excellent idea stolen gracelessly from rune-reader-mobile-temp by isabelle & sam & The Worm. icon is bury smoking a fatty blunt. */

/*
  1.3.1
  - fix silly function being called...
  
  1.3
  - toggle runereader with button in footer
    - just toggles css, issues with toggling the ciphering itself so gonna work on dat
*/

/*

  todo
  - expose colours to variables/webgui so they can be easily modified by user
    - localstorage for colours
  - possible to retroactively cipher/decipher runes once toggled?
    - currently runes are set at page load, so toggling only affects newly posted runes
    - requires page refresh to read new runes that were posted with runereader off. janky and i don't like it!!
    - could run thru all posts with runes and process them again on each toggle... sounds fucking annoying...

*/

var RUNEREADER_STATE = true  // start on

const RUNEREADER_CSS_ELM_ID = "runereader-css"  // id of style elm with our fancy rules
const FUNCTION_ENCIPHER = window.require.config('util/cipher').convertToRandomStr  // actually enciphers text
const FUNCTION_DECIPHER = function(e,t) {return e}  // returns text unciphered. idk what the t var does lol
const TOGGLE_BUTTON_ID = "toggle-runereader"
const RUNEREADER_ON = "runereader ON"
const RUNEREADER_OFF = "runereader OFF"

// this is just aesthetic css to make it look cool
const LOVELY_CSS = `
/* base for all runetext */
.def.masked, .def.targeted, .def.player, .hide-live-body {
    display: block !important;
    width: 100%;
    padding: 10px;
    font-size: 10pt !important;
    letter-spacing: normal !important;
    font-family: monospace !important;
    text-shadow: none !important;
    font-weight: normal !important;
    background: black !important;
    color: white;  /* you should never see this!! */
    border-left: 2px solid white;
}
.def.masked:before, .def.targeted:before, .def.player:before {
    content: "[if you see this, pls tell me!!! :) thx]"  /* you should never see this!! */
}

/* /imshyuwu */
.hide-live-body {
    visibility: visible;
    color: teal;
    border-color: teal
}

/* TIER 1 - THE SURFACE */
/* ; self post - this is never seen and can't be detected by the css model :( */
/* ;, runespeak */
.def.masked {color: magenta !important; border-color: magenta;}
.def.masked:before {content: ";, "}
.def.masked:hover:before {content: "[runespeak] "}
/* ;> target post */
.def.targeted {color: cyan !important; border-color: cyan}
.def.targeted:before {content: ";> "}
.def.targeted:hover:before {content: "[target post] "}
/* ;; self image - i don't think this one is ever visible, cause self-image runes are not printed... but it is here anyway :) */
.def.image {color: white !important; border-color: white}
.def.image:before {content: "[if you see this please tell me!!! :) thx];; "}
.def.image:hover:before {content: "[self image (this should be never be visible :O)] "}
/* ;. wormwatch */
.def.player {color: pink !important; border-color: pink}
.def.player:before {content: ";. "}
.def.player:hover:before {content: "[wormwatch] "}
/* ;;> target image */
.def.image.targeted {color: lime !important; border-color: lime}
.def.image.targeted:before {content: ";;> "}
.def.image.targeted:hover:before {content: "[target image] "}

/* TIER 2 - THE ABSURD */
/* ;,> target runespeak */
.def.masked.targeted {color: yellow !important; border-left: 4px double yellow;}
.def.masked.targeted:before {content: ";,> (wtf) "}
.def.masked.targeted:hover:before {content: "[target.. runespeak?] "}
/* ;;, self image runespeak  */
.def.image.masked {color: yellow !important; border-left: 4px double yellow;}
.def.image.masked:before {content: ";;, (wtf) "}
.def.image.masked:hover:before {content: "[self image... runespeak?] "}
/* ;,. runespeak wormwatch  */
.def.masked.player {color: yellow !important; border-left: 4px double yellow;}
.def.masked.player:before {content: ";,. (wtf) "}
.def.masked.player:hover:before {content: "[wormwatch... runespeak?] "}
/* ;.> target wormwatch - not visible */
.def.player.targeted {color: yellow !important; border-left: 4px double yellow;}
.def.player.targeted:before {content: ";.> (wtf) "}
.def.player.targeted:hover:before {content: "[target... wormwatch?] "}
/* ;;. (self?) image wormwatch */
.def.image.player {color: yellow !important; border-left: 4px double yellow;}
.def.image.player:before {content: ";;. (wtf) "}
.def.image.player:hover:before {content: "[wormwatch... image?] "}

/* TIER 3 - THE PROFANE */
/* ;;,> targeted runespeak image */
.def.image.masked.targeted {color: orange !important; border-color: orange;}
.def.image.masked.targeted:before {content: ";;,> ( S T O P ) "}
.def.image.masked.targeted:hover:before {content: "[tongue writhing of images unseen by human eyes] "}
/* ;,.> targeted runespeak wormwatch */
.def.masked.player.targeted {color: orange !important; border-color: orange;}
.def.masked.player.targeted:before {content: ";,.> ( N O ) "}
.def.masked.player.targeted:hover:before {content: "[induced hallucinations of worms and worms and worms and worms and worms and worms and worms and worms] "}
/* ;;,. self-image runespeak wormwatch */
.def.image.masked.player {color: orange !important; border-color: orange;}
.def.image.masked.player:before {content: ";;,. ( C E A S E ) "}
.def.image.masked.player:hover:before {content: "[shadows cast upon her face distorting twisting desecrating those who bear witness] "}
/* ;;.> targeted image wormwatch  */
.def.image.player.targeted {color: orange !important; border-color: orange;}
.def.image.player.targeted:before {content: ";;.> ( D O N ' T ) "}
.def.image.player.targeted:hover:before {content: "[manipulation of this Plane with silken touch and grasping claws] "}

/* TIER 4 - THE ABYSS */
/* ;;,.> target runespeak wormwatch image - exodia assembled - annihilation imminent */
.def.image.masked.player.targeted {
    color: white !important;
    border: 9px double pink;
    background: red !important;
}
.def.image.masked.player.targeted:before {content: "[S̴T̷O̵P̴  you didn't have to do this P̷͚̬̜͠Ḷ̶͍̂̑Ẽ̷̬͘͘A̵̗͗S̷̱͗̾͠Ē̸̹̹͒͋] "}
.def.image.masked.player.targeted:hover:before {content: "[w̸͕͝i̷̦̚t̵̤̓h̷͙̄ ̵̭͠ḿ̷̲ǘ̴̞t̶̺͋e̴̡̅d̴͓̾ ̴̲͊F̸͎̓ö̵̲́r̸̰͒m̷̦̋e̷̘̊ ̷̜̑ā̷̟n̷̻̏ď̷̲ ̸̦͌t̵̫͝i̷̦͝g̷̬̋ḧ̶̤́ṭ̶̓e̶͖̔n̵̂͜e̸̻̐d̸͝ͅ ̴̤̈g̴̲͐r̶̹̈́í̵͙p̴͖̄ ̷̳͒S̸̲̈́h̵͉̊e̵͉͋ ̷̰̚s̵̾ͅp̴̙͐ḛ̷̇a̴̒ͅk̸̤̋s̵̫̈́ ̷͉̋b̴̮̉e̸̪͝y̷̻͋o̶̫̔n̷͙͂d̶̮̀ ̸̬̅ṯ̸̅h̷̻͂ē̸̗ ̷̞̇ẃ̷͔o̵̳͐r̶̛̮d̶̠̉s̵̅ͅ ̸͇̆S̷̼̚h̷̰̉e̴̞͝ ̷̗̓k̵̪̾n̴͍̽o̴̲͂w̴̧͝s̷̰͌ ̷̖̈i̶̤̅n̵̲̽ṭ̶͂o̴̯͗ ̶̬͝ṫ̶̝h̶̛͔e̵͗ͅ ̵͓͠è̴̺t̸̬̎h̴͙̍e̶̛̮r̷̼̈́ ̸̲͒o̵̪͗f̶̛̹ ̵̣̇ẗ̴͖h̴̼̉e̶̳͝ ̶̭͌m̷̦̎o̵̡͋ṯ̷̈́h̷̜͌ë̸͖́r̵̝͆ ̴͙̈́a̶̠͌l̴͕̂w̵̤̔a̸͎͝y̸̺̌s̸̀ͅ ̶̮́t̸̲͌ḧ̴͈i̸͙͝r̸̭̓s̸̲͂t̵̮̐i̷̞͆n̷̖̆g̸̟͑ ̸̤̓ḟ̶̥ó̷̧r̶̤̋ ̶̹̎t̵̳̐h̶͔̾e̶̗̅ ̴̻̀b̷͓̅ó̸̬s̵̹̃ỏ̵̮m̵̩͊ ̵͖͝o̴͙͂f̸͎͋ ̶̹̏ṱ̶̓ḧ̵̟́e̸̢̒ ̶͙̽m̵̲̚i̷̻̔l̸̜͌k̶̭̀ ̴̱̇t̶̬͒ḩ̸̛a̷̡͝t̸̟͆ ̴̢̋n̶͙̅é̷ͅv̵̜̾e̴̪͝r̴̠̊ ̵̪̔d̴̰̏r̴͍̿í̵̘ẻ̷̢s̵̤͑ ̸̞̆n̵̬͂o̵̭͗ ̴̱̈ḿ̵̩a̴̡͝t̵̘͌ẗ̴́ͅě̷̞r̷̙̔ ̷̫̊w̶̹͋i̴̪̒ṫ̸̪h̴̨̀i̶̧͠n̴͔͆ ̶̜̂n̵̹̅õ̷̹r̷̻͘ ̶͙̍w̴͆ͅḯ̴͜t̷̗̓h̴̢̓o̷̙͛u̸̙͛t̸̺̿ ̶͎̍b̸̡͝ư̵̮t̴̬̕ ̶̦̅f̶̧̀o̷̥̎r̸̈́͜e̴̺̎v̶̬̓e̷̺̽r̸͚̍ ̵̩͠a̷͔͌ñ̴̰d̸͙̑ ̸͍͐ḛ̸̓t̵͍̚e̷͎͗r̶̬̉ñ̶̤ḁ̵̋l̴̪͒ ̵̺̽l̶̟͐î̵͎k̴̟̀e̴̥̽ ̵̡̈́ť̴̺h̶͍̄ẹ̵̊ ̴̥͑ṅ̵̢i̸̖̅g̶͙̊h̵̝̐t̶̞͝ ̴͚͠t̵̳̒h̶̞͌a̵͇̕t̵͔̉ ̶̱́c̴̛̙a̸̮̾l̸̻̔l̴̢̀s̷̹̈ ̶̣̌t̵̪̅o̷̰͒ ̵̗͛t̴͕̔h̶͈̐o̴͙͋s̶̖͆e̶̛̟ ̷͎́ẅ̷͉́h̵̢̋o̷̺̾ ̴̳̓ẃ̴̩a̷̖͗ṯ̴̎c̴͘ͅḣ̴̠ ̴̮̃t̴̺̍ḧ̸̨ḛ̴͆i̸̞͋r̴̳̈́ ̶̣͗s̵̻̄u̴͈͛ņ̸̌k̴̠͗ȩ̷͝n̵̢͠ ̸̮̍y̷͉̓e̶͇̍l̶̮̔ḻ̶̈ó̸̲w̶͎͗ ̷͈̀m̸̢͆o̷̞̾o̶̮͐n̶̹̐s̸̗͒ ̸͖̓w̶̙͛h̴̎ͅo̶͚͝ ̸̧̆k̶͚̄n̸͘ͅo̴͉͂w̶̦̎ ̷͙͝l̴͕̄i̵̢̓k̴̩̈e̸̩̐ ̸̓͜W̴̺̃ë̴̦́ ̸̧́t̶͓́ḧ̷͔́a̵͉̽t̴̩̓ ̸̯̅y̸̝͗e̷̊͜ ̵̠̎s̷̟͆h̵͈̿ả̸̧l̵̘̂l̴̙͗ ̵̝͂l̷̙̃e̸̜͗ā̸̜r̶̢͠n̶̳̓ ̶̡̿Ḩ̵͝è̷̮r̴͈͗ ̷̿ͅn̶̜͊a̸̡͆m̴̱͝ẻ̸̳ ̷̛̫i̸̊ͅn̵̘̿ ̴̹͘t̷̽͜ĭ̷̥m̸̘͝e̶̻̎ ̸̋ͅd̴̤̄ē̷̤a̶̲͠r̶͓͒ ̵̡̌c̴̰̅h̸̲̚ȋ̶̞l̴̯͋d̴̮̽ ̷͖̇í̷͎n̷̙̉ ̴̯̆g̵̥̕ö̷͉o̶̰͛d̷̺͌ ̸̟̆d̶̼̈u̴̝͘é̶̳ ̷̳͝t̶͎̀i̴͔̽m̸͇̍ę̴͆ ̸͎̏W̸̯͗ȇ̵͔ ̵͕̐w̶̹͑ḯ̸̞l̵̻̚l̴̨̏ ̴̨͝c̵̍ͅa̵̹͛s̶̖͐t̸̟̊e̸̼͛ ̷̻̾ȏ̸̥u̸̻͋r̴͕̉ ̵̖̔F̵̲̕o̷̪̽ṛ̶͘m̵̳͐e̶̗̋ṡ̴̳ ̶͍̇ủ̵̘p̶̪͋o̴͘ͅn̸̠̈ ̸͖̈́t̴̡̄h̵͚̚i̴͎̍s̷͇̈́ ̸̙̽f̶̤̚ö̸̼́ö̴̘́l̴̗̊i̸͍̕s̴̢̽h̸̹͊ ̶̳̉p̸̺͝ḽ̵̀a̴̩͆č̴͕ę̴̅ ̵̞̌ó̸̪n̶͙͆c̶̺̍è̷̝ ̷̨͊a̷̙͊g̴͉̐à̶̲ǐ̶̫n̷͙͘ ̸͙̐ã̴̜t̷̠̎ ̶̞̅l̵̺̀ǎ̵̺s̸̹͑t̷̻͝ ̵͉͗o̴̡̾n̴̻̚c̸̫͝è̸̹ ̴̙͋a̸͈͝g̷͔̾a̸̳̓ì̵̫n̸̤͒ ̷̮̀a̵̬̿t̴̼̉ ̵̯͑l̵̝̋a̶̮̾s̵̭̈́ẗ̶̺́] "}

`

function add_css() {
  /* add our pretty css rules to doc header */
  let style = document.createElement("style")
  style.id = RUNEREADER_CSS_ELM_ID
  style.innerText = LOVELY_CSS
  document.head.append(style)
}

function remove_css() {
  /* remove our pretty css rules from doc header... rip... */
  document.getElementById(RUNEREADER_CSS_ELM_ID).remove()
}

function decipher_runes() {
  /* this kills the ciphering function */
  // this works by replacing the rune ciphering function with one that does nothing, and just returns the unciphered text
  // opworm sometimes breaks this by renaming the convertToRandomStr function, so if it's broken then try searching for something similar in main.js to find the new name
  window.require.config('util/cipher').convertToRandomStr = FUNCTION_DECIPHER
}

function encipher_runes() {
  /* return normal rune enciphering */
  window.require.config('util/cipher').convertToRandomStr = FUNCTION_ENCIPHER
}

function toggle_runereader() {
  /* toggle runereader on and off */
  RUNEREADER_STATE = !RUNEREADER_STATE  // invert
  document.getElementById(TOGGLE_BUTTON_ID).firstChild.innerText = RUNEREADER_STATE? RUNEREADER_ON : RUNEREADER_OFF  // set button text
  if (RUNEREADER_STATE) {  // turn on
    add_css()
    decipher_runes()
  } else {  // turn off
    remove_css()
    // encipher_runes()  // just causes issues, disabling for the moment
  }
}

function add_bottom_button() {
  /* add toggle button to footer */
  let button = document.createElement("span")
  button.classList.add("act")  // all the cool kids are doing it
  button.id = TOGGLE_BUTTON_ID
  let link = document.createElement("a")
  link.innerText = RUNEREADER_STATE? RUNEREADER_ON : RUNEREADER_OFF
  button.appendChild(link)
  let footer = document.getElementsByClassName("bottom-margin")[0]
  footer.appendChild(button)
  document.getElementById(TOGGLE_BUTTON_ID).addEventListener('click', toggle_runereader)
}

// function all_posts() {
//   console.log(window.require.config('state').posts.models)
// }

function main() {
  add_bottom_button()
  add_css()
  decipher_runes()
}

main()
