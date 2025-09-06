// ==UserScript==
// @name         Wormlang RuneReader
// @version      1.4.1
// @description  automagically decode wormlang runes
// @match        *://*.libpol.org/*
// @run-at       document-idle
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/Xx-hackerman-xX/brainworm-runereader/refs/heads/main/brainworm-runereader.js
// @icon         data:image/png;base64,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
// @author       github.com/Xx-hackerman-xX
// ==/UserScript==

/* excellent idea gracelessly stolen from rune-reader-mobile-temp by isabelle & sam & The Worm. icon is bury smoking a fatty blunt. */

/*

  1.4.1
  - new feature: click magnifying glass on a post to reveal its true contents
  - fix broken runes after update
  - code cleanup

  1.3.5
  - remove debug strings that were sometimes visible on self-image text
  - better handling of public commands
  - remove references to brainworm... rip...
  - probably broke some shit but i'll just run with it for now

*/

function windowRequire(path) {
  // return context-appropriate window.require(path)
  try {
    window.require(path)
  } catch {
    // we're on a page that requires client/ to be prepended for whatever reason
    path = "client/" + path
  }
  return window.require(path)
}

// pretty announce script details in console
function announce() {
  console.log(`%c[[ ${GM_info.script.name} v${GM_info.script.version} loaded ]]`, "color:lime; background:black;")
}

// async sleep
const sleep = ms => new Promise(res => setTimeout(res, ms))

var RUNEREADER_STATE = true  // start on
var vanilla_socket_onmessage  // replaced later

const RUNEREADER_CSS_ELM_ID = "runereader-css"  // id of style elm with our fancy rules
const TOGGLE_BUTTON_ID = "toggle-runereader"
const RUNEREADER_ON = "runereader ON"
const RUNEREADER_OFF = "runereader OFF"

// magnifying glass svg
const REVEAL_SVG = `<svg viewBox="0 0 512 512"><path d="M376.324,312.508c49.638-78.774,40.238-184.326-28.306-252.871c-79.507-79.515-208.872-79.515-288.388,0 c-79.507,79.516-79.507,208.873,0,288.379c68.536,68.544,174.115,77.935,252.88,28.306l135.668,135.676L512,448.186 L376.324,312.508z M296.543,296.542c-51.121,51.139-134.308,51.139-185.439,0c-51.121-51.121-51.112-134.299,0.009-185.43 c51.122-51.121,134.309-51.13,185.43-0.008C347.665,162.243,347.665,245.421,296.543,296.542z" transform="translate(0 1)"></path></svg>`

// websocket message flags. stolen from vanilla message handler definition
const message = {
	insertPost: 1,  // new post
	concat: 33,
}

const LOVELY_CSS = `
/* base for all runetext */
.def.masked, .def.targeted, .def.player, .hide-live-body, .def.public {
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
    content: "[runereader broke... if you see this, pls tell me!!! :) thx]"  /* you should never see this!! */
}

/* TIER 1 - THE SURFACE */
/* ; self post - only visible through public class on its own. commands that are public but not selfpost are overwritten by more specific classes further on */
.def.public {color: mediumorchid !important; border-color: mediumorchid;}
.def.public:before {content: "; "}
.def.public:hover:before {content: "[self post] "}
/* ;, runespeak */
.def.masked {color: magenta !important; border-color: magenta;}
.def.masked:before {content: ";, "}
.def.masked:hover:before {content: "[runespeak] "}
/* ;> target post */
.def.targeted {color: cyan !important; border-color: cyan}
.def.targeted:before {content: ";> "}
.def.targeted:hover:before {content: "[target post] "}
/* ;; self image (rarely visible) */
.def.image {color: white !important; border-color: white}
.def.image:before {content: ";; "}
.def.image:hover:before {content: "[self image] "}
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
.def.image.masked.targeted:hover:before {content: "[target runespeak image tongue writhing of images unseen by human eyes] "}
/* ;,.> targeted runespeak wormwatch */
.def.masked.player.targeted {color: orange !important; border-color: orange;}
.def.masked.player.targeted:before {content: ";,.> ( N O ) "}
.def.masked.player.targeted:hover:before {content: "[target runespeak wormwatch induced hallucinations of worms and worms and worms and worms and worms and worms and worms and worms] "}
/* ;;,. self-image runespeak wormwatch */
.def.image.masked.player {color: orange !important; border-color: orange;}
.def.image.masked.player:before {content: ";;,. ( C E A S E ) "}
.def.image.masked.player:hover:before {content: "[wormwatch runespeak image shadows cast upon her face distorting twisting desecrating those who bear witness] "}
/* ;;.> targeted image wormwatch  */
.def.image.player.targeted {color: orange !important; border-color: orange;}
.def.image.player.targeted:before {content: ";;.> ( D O N ' T ) "}
.def.image.player.targeted:hover:before {content: "[target wormwatch image manipulation of this Plane with silken touch and grasping claws] "}

/* TIER 4 - THE ABYSS */
/* ;;,.> target runespeak wormwatch image - exodia assembled - annihilation imminent */
.def.image.masked.player.targeted {
    color: white !important;
    border: 9px double pink;
    background: red !important;
}
.def.image.masked.player.targeted:before {content: "[S̴T̷O̵P̴  you didn't have to do this P̷͚̬̜͠Ḷ̶͍̂̑Ẽ̷̬͘͘A̵̗͗S̷̱͗̾͠Ē̸̹̹͒͋] |||||| "}
.def.image.masked.player.targeted:hover:before {content: "[w̸͕͝i̷̦̚t̵̤̓h̷͙̄ ̵̭͠ḿ̷̲ǘ̴̞t̶̺͋e̴̡̅d̴͓̾ ̴̲͊F̸͎̓ö̵̲́r̸̰͒m̷̦̋e̷̘̊ ̷̜̑ā̷̟n̷̻̏ď̷̲ ̸̦͌t̵̫͝i̷̦͝g̷̬̋ḧ̶̤́ṭ̶̓e̶͖̔n̵̂͜e̸̻̐d̸͝ͅ ̴̤̈g̴̲͐r̶̹̈́í̵͙p̴͖̄ ̷̳͒S̸̲̈́h̵͉̊e̵͉͋ ̷̰̚s̵̾ͅp̴̙͐ḛ̷̇a̴̒ͅk̸̤̋s̵̫̈́ ̷͉̋b̴̮̉e̸̪͝y̷̻͋o̶̫̔n̷͙͂d̶̮̀ ̸̬̅ṯ̸̅h̷̻͂ē̸̗ ̷̞̇ẃ̷͔o̵̳͐r̶̛̮d̶̠̉s̵̅ͅ ̸͇̆S̷̼̚h̷̰̉e̴̞͝ ̷̗̓k̵̪̾n̴͍̽o̴̲͂w̴̧͝s̷̰͌ ̷̖̈i̶̤̅n̵̲̽ṭ̶͂o̴̯͗ ̶̬͝ṫ̶̝h̶̛͔e̵͗ͅ ̵͓͠è̴̺t̸̬̎h̴͙̍e̶̛̮r̷̼̈́ ̸̲͒o̵̪͗f̶̛̹ ̵̣̇ẗ̴͖h̴̼̉e̶̳͝ ̶̭͌m̷̦̎o̵̡͋ṯ̷̈́h̷̜͌ë̸͖́r̵̝͆ ̴͙̈́a̶̠͌l̴͕̂w̵̤̔a̸͎͝y̸̺̌s̸̀ͅ ̶̮́t̸̲͌ḧ̴͈i̸͙͝r̸̭̓s̸̲͂t̵̮̐i̷̞͆n̷̖̆g̸̟͑ ̸̤̓ḟ̶̥ó̷̧r̶̤̋ ̶̹̎t̵̳̐h̶͔̾e̶̗̅ ̴̻̀b̷͓̅ó̸̬s̵̹̃ỏ̵̮m̵̩͊ ̵͖͝o̴͙͂f̸͎͋ ̶̹̏ṱ̶̓ḧ̵̟́e̸̢̒ ̶͙̽m̵̲̚i̷̻̔l̸̜͌k̶̭̀ ̴̱̇t̶̬͒ḩ̸̛a̷̡͝t̸̟͆ ̴̢̋n̶͙̅é̷ͅv̵̜̾e̴̪͝r̴̠̊ ̵̪̔d̴̰̏r̴͍̿í̵̘ẻ̷̢s̵̤͑ ̸̞̆n̵̬͂o̵̭͗ ̴̱̈ḿ̵̩a̴̡͝t̵̘͌ẗ̴́ͅě̷̞r̷̙̔ ̷̫̊w̶̹͋i̴̪̒ṫ̸̪h̴̨̀i̶̧͠n̴͔͆ ̶̜̂n̵̹̅õ̷̹r̷̻͘ ̶͙̍w̴͆ͅḯ̴͜t̷̗̓h̴̢̓o̷̙͛u̸̙͛t̸̺̿ ̶͎̍b̸̡͝ư̵̮t̴̬̕ ̶̦̅f̶̧̀o̷̥̎r̸̈́͜e̴̺̎v̶̬̓e̷̺̽r̸͚̍ ̵̩͠a̷͔͌ñ̴̰d̸͙̑ ̸͍͐ḛ̸̓t̵͍̚e̷͎͗r̶̬̉ñ̶̤ḁ̵̋l̴̪͒ ̵̺̽l̶̟͐î̵͎k̴̟̀e̴̥̽ ̵̡̈́ť̴̺h̶͍̄ẹ̵̊ ̴̥͑ṅ̵̢i̸̖̅g̶͙̊h̵̝̐t̶̞͝ ̴͚͠t̵̳̒h̶̞͌a̵͇̕t̵͔̉ ̶̱́c̴̛̙a̸̮̾l̸̻̔l̴̢̀s̷̹̈ ̶̣̌t̵̪̅o̷̰͒ ̵̗͛t̴͕̔h̶͈̐o̴͙͋s̶̖͆e̶̛̟ ̷͎́ẅ̷͉́h̵̢̋o̷̺̾ ̴̳̓ẃ̴̩a̷̖͗ṯ̴̎c̴͘ͅḣ̴̠ ̴̮̃t̴̺̍ḧ̸̨ḛ̴͆i̸̞͋r̴̳̈́ ̶̣͗s̵̻̄u̴͈͛ņ̸̌k̴̠͗ȩ̷͝n̵̢͠ ̸̮̍y̷͉̓e̶͇̍l̶̮̔ḻ̶̈ó̸̲w̶͎͗ ̷͈̀m̸̢͆o̷̞̾o̶̮͐n̶̹̐s̸̗͒ ̸͖̓w̶̙͛h̴̎ͅo̶͚͝ ̸̧̆k̶͚̄n̸͘ͅo̴͉͂w̶̦̎ ̷͙͝l̴͕̄i̵̢̓k̴̩̈e̸̩̐ ̸̓͜W̴̺̃ë̴̦́ ̸̧́t̶͓́ḧ̷͔́a̵͉̽t̴̩̓ ̸̯̅y̸̝͗e̷̊͜ ̵̠̎s̷̟͆h̵͈̿ả̸̧l̵̘̂l̴̙͗ ̵̝͂l̷̙̃e̸̜͗ā̸̜r̶̢͠n̶̳̓ ̶̡̿Ḩ̵͝è̷̮r̴͈͗ ̷̿ͅn̶̜͊a̸̡͆m̴̱͝ẻ̸̳ ̷̛̫i̸̊ͅn̵̘̿ ̴̹͘t̷̽͜ĭ̷̥m̸̘͝e̶̻̎ ̸̋ͅd̴̤̄ē̷̤a̶̲͠r̶͓͒ ̵̡̌c̴̰̅h̸̲̚ȋ̶̞l̴̯͋d̴̮̽ ̷͖̇í̷͎n̷̙̉ ̴̯̆g̵̥̕ö̷͉o̶̰͛d̷̺͌ ̸̟̆d̶̼̈u̴̝͘é̶̳ ̷̳͝t̶͎̀i̴͔̽m̸͇̍ę̴͆ ̸͎̏W̸̯͗ȇ̵͔ ̵͕̐w̶̹͑ḯ̸̞l̵̻̚l̴̨̏ ̴̨͝c̵̍ͅa̵̹͛s̶̖͐t̸̟̊e̸̼͛ ̷̻̾ȏ̸̥u̸̻͋r̴͕̉ ̵̖̔F̵̲̕o̷̪̽ṛ̶͘m̵̳͐e̶̗̋ṡ̴̳ ̶͍̇ủ̵̘p̶̪͋o̴͘ͅn̸̠̈ ̸͖̈́t̴̡̄h̵͚̚i̴͎̍s̷͇̈́ ̸̙̽f̶̤̚ö̸̼́ö̴̘́l̴̗̊i̸͍̕s̴̢̽h̸̹͊ ̶̳̉p̸̺͝ḽ̵̀a̴̩͆č̴͕ę̴̅ ̵̞̌ó̸̪n̶͙͆c̶̺̍è̷̝ ̷̨͊a̷̙͊g̴͉̐à̶̲ǐ̶̫n̷͙͘ ̸͙̐ã̴̜t̷̠̎ ̶̞̅l̵̺̀ǎ̵̺s̸̹͑t̷̻͝ ̵͉͗o̴̡̾n̴̻̚c̸̫͝è̸̹ ̴̙͋a̸͈͝g̷͔̾a̸̳̓ì̵̫n̸̤͒ ̷̮̀a̵̬̿t̴̼̉ ̵̯͑l̵̝̋a̶̮̾s̵̭̈́ẗ̶̺́] "}

/* imshyuwu */
.hide-live-body {
    visibility: visible;
    color: teal;
    border-color: teal
}

/* "reveal true contents" button */
.reveal-button {
  display: initial;
  margin-left: 0.15em;
  color: var(--text-color);
  align-self: flex-start;
}
article:hover .reveal-button {
  opacity: 1;
}
.reveal-button svg {
  width: 1em;
  height: 1em;
}
.reveal-button:hover svg {
  transition: 0.1s;
  color: pink !important;
  transform: rotate(25deg);
}

/* tooltip for reveal button */
.reveal-button:before {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 100%;
  margin-bottom: 4px;
  width: auto;
  padding: 3px 6px;
  border-radius: 9px;
  background: black;
  color: white;
  text-align: center;
  opacity: 0;
  transition: 0.2s;
  pointer-events: none;
}
.reveal-button:hover:before {
  opacity: 1;
}
.reveal-button:before {
  content: "reveal true contents...";
}
`




/* runereader */

const FUNCTION_ENCIPHER = windowRequire("util/cipher").convertToRandString  // normal cypher function
const FUNCTION_DECIPHER = function(e,t) { return e.replace(/</g, "&lt;").replace(/>/g, "&gt;") }  // return uncophered text >:)

function encipherRunes() {
  // show runes as original madoka runes
  windowRequire("util/cipher").convertToRandString = FUNCTION_ENCIPHER
}

function decipherRunes() {
  // show all runes as plaintext
  console.log("deciphering runes...")
  windowRequire("util/cipher").convertToRandString = FUNCTION_DECIPHER
}

function toggleRunereader() {
  // toggle runereader on and off
  RUNEREADER_STATE = !RUNEREADER_STATE  // invert
  let link = document.getElementById(TOGGLE_BUTTON_ID).firstChild
  link.innerText = RUNEREADER_STATE ? RUNEREADER_ON : RUNEREADER_OFF  // set button text
  link.style = RUNEREADER_STATE ? "color:green;" : ""
  if (RUNEREADER_STATE) {
    addCSS()
    decipherRunes()
  } else {
    removeCSS()
    // encipherRunes()  // just causes issues, disabling for the moment
  }
}






/* shimming */


function replaceSocketOnmessage() {
  // replace vanilla socket.onmessage with our own
  vanilla_socket_onmessage = windowRequire("connection/state").socket.onmessage  // save
  windowRequire("connection/state").socket.onmessage = modified_socket_onmessage  // shim
  console.log("[reveal] socket.onmessage replaced :)")  // hooray
}


async function doTheShim(delay=100) {
  // keep trying to shim our function in there until it succeeds
  // will often fail cause window.require hasn't loaded or the method itself isn't defined in vanilla js yet
  let totalTime = 0
  while (true) {
    try {
      replaceSocketOnmessage()
      break  // succeeded, bail
    } catch {
      await sleep(delay)  // wait a mo and try again
      totalTime += delay
    }
  }
  console.log("shim complete, took " + totalTime + "ms")
}


function modified_socket_onmessage({data: e}, concatMessage=false) {
  // our modified socket.onmessage function. grabs the messages we care about and passes everything back to vanilla js as it was received
  let flag = e[0].codePointAt()  // convert to int cause comparing unprintable characters is weird
  let payload = e.slice(1)

  // separate concatenated payloads and execute them separately
  if (flag === message.concat) {
    payload = JSON.parse(payload)
    for (const msg of payload) {
      modified_socket_onmessage({data: msg}, concatMessage=true)  // unroll and process each msg on our side
    }
    vanilla_socket_onmessage({data: e})  // send the original unrolled concat straight to vanilla js
    return

  // unconcatenated message
  } else {
    vanilla_socket_onmessage({data: e})
  }

  // insert new post
  if (flag === message.insertPost) {
    payload = JSON.parse(payload)
    addRevealButtonToPostID(payload.id)  // go go gadget insert reveal button
  }
}




/* html - runereader */

function addCSS() {
  // add our pretty css rules to doc header
  let style = document.createElement("style")
  style.id = RUNEREADER_CSS_ELM_ID
  style.innerText = LOVELY_CSS
  document.head.append(style)
}

function removeCSS() {
  // remove our pretty css rules from doc header... rip...
  document.getElementById(RUNEREADER_CSS_ELM_ID).remove()
}

function addRunereaderToggleFooterButton() {
  // add footer button to toggle runes
  let button = document.createElement("span")
  button.classList.add("act")
  button.id = TOGGLE_BUTTON_ID
  let link = document.createElement("a")
  link.innerText = RUNEREADER_STATE ? RUNEREADER_ON : RUNEREADER_OFF
  link.style = RUNEREADER_STATE ? "color:green;" : ""
  link.title = "click to toggle runereading"
  button.appendChild(link)
  let footer = document.getElementsByClassName("bottom-margin")[0]
  footer.appendChild(button)
  button.addEventListener('click', toggleRunereader)
}




/* html - reveal contents */

function createRevealButton() {
  // poop out a fresh reveal button that we can slap onto posts
  let link = document.createElement("a")
  link.classList.add("svg-link", "noscript-hide", "concealed", "reveal-button")
  link.addEventListener(
    "click", (clickEvent) => {
      let post = clickEvent.target.closest("article")
      let allPosts = windowRequire("state").posts.models
      let trueBody = allPosts[post.id.slice(1)].body  // slice the leading "p" from post id to lookup in model by post number alone
      // todo add a fake bq that displays the true text instead of alert
      alert(trueBody)
    }
  )
  link.innerHTML = REVEAL_SVG
  return link
}


async function addRevealButtonToPosts() {
  // add reveal button to existing posts already on the page
  while (!Object.keys(windowRequire("state").posts.models).length) {
    // wait here until posts model is populated
    await sleep(100)  // probably a better way to do this.....
  }
  let allPosts = windowRequire("state").posts.models
  for (let postID in allPosts) {
    let header = document.getElementById(`p${postID}`).getElementsByTagName("header")[0]
    let revealButton = createRevealButton()
    header.append(revealButton)
  }
}


function addRevealButtonToPostID(postID) {
  // add a reveal button into the header of given postID
  let postHeader = document.querySelector(`#p${postID} header`)
  // post doesn't exist...
  if (!postHeader) {
    console.error("tried to add reveal button to nonexisted post, id: " + postID)
    return
  }
  // button exists already
  if (postHeader.querySelector(".reveal-button")) {
    console.error("tried to add reveal button but post already has it, id: " + postID)
    return
  }
  postHeader.append(createRevealButton())
}







async function main() {
  announce()
  addCSS()
  // runereader
  addRunereaderToggleFooterButton()
  decipherRunes()
  // reveal posts
  await sleep(2000)
  await doTheShim()  // so we can listen for post insertion events
  addRevealButtonToPosts()
}

main()
