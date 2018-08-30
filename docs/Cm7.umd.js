(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Cm7 = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var parseCm7_umd_min = createCommonjsModule(function (module, exports) {
	!function(e,n){module.exports=n();}(commonjsGlobal,function(){var e="undefined"!=typeof window?window:"undefined"!=typeof commonjsGlobal?commonjsGlobal:"undefined"!=typeof self?self:{};function n(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function t(e,n){return e(n={exports:{}},n.exports),n.exports}var r=t(function(e,n){Object.defineProperty(n,"__esModule",{value:!0});n.TokenError=class extends Error{constructor(e,n){if(super(e),this.message=e,this.token=n,!n||!n.errors)throw this;n.errors.push(this);}inspect(){return "SyntaxError: "+this.message}};});n(r);r.TokenError;var i=t(function(n,t){Object.defineProperty(t,"__esModule",{value:!0});const i=/^[A-Z0-9_]+$/,a=/(\?|\+|\*)$/,o=/^(@|&|!)/,l="WS";function s(e,n){let t=n.exec(e);return t&&0==t.index?0==t[0].length&&n.source.length>0?null:{type:null,text:t[0],rest:e.substr(t[0].length),start:0,end:t[0].length-1,fullText:t[0],errors:[],children:[],parent:null}:null}function f(e){let n=a.exec(e),t=o.exec(e),r=n&&n[0]||"",i=t&&t[0]||"",l={raw:e,name:e.replace(a,"").replace(o,""),isOptional:"?"==r||"*"==r,allowRepetition:"+"==r||"*"==r,atLeastOne:"+"==r,lookupPositive:"&"==i,lookupNegative:"!"==i,pinned:"@"==i,lookup:!1,isLiteral:!1};return l.isLiteral="'"==l.name[0]||'"'==l.name[0],l.lookup=l.lookupNegative||l.lookupPositive,l}function c(e,n){let t=f(e);return n.cachedRules[t.name]||null}function u(e,n){if(e.children){let t=e.children.filter(e=>e.type&&n.test(e.type));for(let n=0;n<t.length;n++){let r=e.children.indexOf(t[n]);-1!=r&&e.children.splice(r,1);}e.children.forEach(e=>u(e,n));}}t.readToken=s,t.parseRuleName=f,t.findRuleByName=c;const h=["EOF"];class m{constructor(e,n){this.grammarRules=e,this.options=n,this.debug=!1,this.cachedRules={};let t=[],r=[];if(e.forEach(e=>{let n=f(e.name);if(n.name in this.cachedRules)t.push("Duplicated rule "+n.name);else{if(this.cachedRules[n.name]=e,e.bnf&&e.bnf.length)e.bnf.forEach(n=>{if("string"==typeof n[0]){if(f(n[0]).name==e.name){let n="Left recursion is not allowed, rule: "+e.name;-1==t.indexOf(n)&&t.push(n);}}n.forEach(e=>{if("string"==typeof e){let n=f(e);n.isLiteral||-1!=r.indexOf(n.name)||-1!=h.indexOf(n.name)||r.push(n.name);}});});else{let n="Missing rule content, rule: "+e.name;-1==t.indexOf(n)&&t.push(n);}l==e.name&&(e.implicitWs=!1),e.implicitWs&&-1==r.indexOf(l)&&r.push(l),e.recover&&-1==r.indexOf(e.recover)&&r.push(e.recover);}}),r.forEach(e=>{e in this.cachedRules||t.push("Missing rule "+e);}),t.length)throw new Error(t.join("\n"))}getAST(e,n){n||(n=this.grammarRules.filter(e=>!e.fragment&&0!=e.name.indexOf("%"))[0].name);let t=this.parse(e,n);if(t){!function e(n,t){t.errors&&t.errors.length&&t.errors.forEach(e=>n.push(e)),t.children&&t.children.forEach(t=>e(n,t));}(t.errors,t),function e(n,t){n.start+=t,n.end+=t,n.children&&n.children.forEach(t=>e(t,n.start));}(t,0),u(t,/^%/),this.options&&this.options.keepUpperRules||u(t,i);let e=t.rest;e&&new r.TokenError("Unexpected end of input: \n"+e,t),function e(n){n.rest="",n.children&&n.children.forEach(n=>e(n));}(t),t.rest=e;}return t}emitSource(){return "CANNOT EMIT SOURCE FROM BASE Parser"}parse(n,t,a=0){let o,u=null,h=f(t),m=this.debug&&!i.test(h.name);m&&console.log(new Array(a).join("│  ")+"Trying to get "+t+" from "+JSON.stringify(n.split("\n")[0]));let p=h.name,d=c(h.name,this);if("EOF"==h.name){if(n.length)return null;if(0==n.length)return {type:"EOF",text:"",rest:"",start:0,end:0,fullText:"",errors:[],children:[],parent:null}}try{if(!d&&h.isLiteral){let t=e.eval(h.name);if(""===t)return {type:"%%EMPTY%%",text:"",rest:n,start:0,end:0,fullText:"",errors:[],children:[],parent:null};o=new RegExp(t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")),p=null;}}catch(e){return null}if(o){let e=s(n,o);if(e)return e.type=p,e}else{let e=d.bnf;e instanceof Array&&e.forEach(e=>{if(u)return;let t=null,i={type:h.name,text:"",children:[],end:0,errors:[],fullText:"",parent:null,start:0,rest:n};d.fragment&&(i.fragment=!0);let o=n,c=0,p=e.length>0,E=!1;for(let n=0;n<e.length;n++)if("string"==typeof e[n]){let s,h=f(e[n]);p=p&&h.isOptional;let g=!1;do{if(s=null,d.implicitWs&&!(s=this.parse(o,h.name,a+1))){let e;do{if(!(e=this.parse(o,l,a+1)))break;i.text=i.text+e.text,i.end=i.text.length,e.parent=i,i.children.push(e),o=o.substr(e.text.length),c+=e.text.length;}while(e&&e.text.length)}if(s=s||this.parse(o,h.name,a+1),h.lookupNegative){if(s)return;break}if(h.lookupPositive&&!s)return;if(!s){if(h.isOptional)break;if(h.atLeastOne&&g)break}if(s&&d.pinned==n+1&&(t=s,m&&console.log(new Array(a+1).join("│  ")+"└─ "+s.type+" PINNED")),s||(s=this.parseRecovery(d,o,a+1)),!s){if(!t)return;u=i,s={type:"SyntaxError",text:o,children:[],end:o.length,errors:[],fullText:"",parent:null,start:0,rest:""},o.length?new r.TokenError(`Unexpected end of input. Expecting ${h.name} Got: ${o}`,s):new r.TokenError(`Unexpected end of input. Missing ${h.name}`,s),m&&console.log(new Array(a+1).join("│  ")+"└─ "+s.type+" "+JSON.stringify(s.text));}if(g=!0,E=!0,"%%EMPTY%%"==s.type)break;s.start+=c,s.end+=c,!h.lookupPositive&&s.type&&(s.fragment?s.children&&s.children.forEach(e=>{e.start+=c,e.end+=c,e.parent=i,i.children.push(e);}):(s.parent=i,i.children.push(s))),h.lookup&&(s.lookup=!0),m&&console.log(new Array(a+1).join("│  ")+"└─ "+s.type+" "+JSON.stringify(s.text)),h.lookup||s.lookup||(i.text=i.text+s.text,i.end=i.text.length,o=o.substr(s.text.length),c+=s.text.length),i.rest=o;}while(s&&h.allowRepetition&&o.length&&!s.lookup)}else{let t=s(o,e[n]);if(!t)return;m&&console.log(new Array(a+1).join("│  ")+"└> "+JSON.stringify(t.text)+e[n].source),E=!0,t.start+=c,t.end+=c,i.text=i.text+t.text,i.end=i.text.length,o=o.substr(t.text.length),c+=t.text.length,i.rest=o;}E&&(u=i,m&&console.log(new Array(a).join("│  ")+"├<─┴< PUSHING "+u.type+" "+JSON.stringify(u.text)));}),u&&d.simplifyWhenOneChildren&&1==u.children.length&&(u=u.children[0]);}return u||m&&console.log(t+" NOT RESOLVED FROM "+n),u}parseRecovery(e,n,t){if(e.recover&&n.length){let i=this.debug;i&&console.log(new Array(t+1).join("│  ")+"Trying to recover until token "+e.recover+" from "+JSON.stringify(n.split("\n")[0]+n.split("\n")[1]));let a,o={type:"SyntaxError",text:"",children:[],end:0,errors:[],fullText:"",parent:null,start:0,rest:""};do{if(a=this.parse(n,e.recover,t+1)){new r.TokenError('Unexpected input: "'+o.text+`" Expecting: ${e.name}`,o);break}o.text=o.text+n[0],o.end=o.text.length,n=n.substr(1);}while(!a&&n.length>0);if(o.text.length>0&&a)return i&&console.log(new Array(t+1).join("│  ")+"Recovered text: "+JSON.stringify(o.text)),o}return null}}t.Parser=m,t.default=m;});n(i);i.readToken,i.parseRuleName,i.findRuleByName,i.Parser;const a=new(n(t(function(e,n){var t;Object.defineProperty(n,"__esModule",{value:!0}),function(e){e.RULES=[{name:"Grammar",bnf:[["RULE_S*","%Atomic*","EOF"]]},{name:"%Atomic",bnf:[["Production","RULE_S*"]],fragment:!0},{name:"Production",bnf:[["NCName","RULE_S*",'"::="',"RULE_WHITESPACE*","Choice","RULE_WHITESPACE*","RULE_EOL+","RULE_S*"]]},{name:"NCName",bnf:[[/[a-zA-Z][a-zA-Z_0-9]*/]]},{name:"Choice",bnf:[["SequenceOrDifference","%_Choice_1*"]],fragment:!0},{name:"%_Choice_1",bnf:[["RULE_WHITESPACE*",'"|"',"RULE_WHITESPACE*","SequenceOrDifference"]],fragment:!0},{name:"SequenceOrDifference",bnf:[["Item","RULE_WHITESPACE*","%_Item_1?"]]},{name:"%_Item_1",bnf:[["Minus","Item"],["Item*"]],fragment:!0},{name:"Minus",bnf:[['"-"']]},{name:"Item",bnf:[["RULE_WHITESPACE*","%Primary","PrimaryDecoration?"]],fragment:!0},{name:"PrimaryDecoration",bnf:[['"?"'],['"*"'],['"+"']]},{name:"DecorationName",bnf:[['"ebnf://"',/[^\x5D#]+/]]},{name:"%Primary",bnf:[["NCName"],["StringLiteral"],["CharCode"],["CharClass"],["SubItem"]],fragment:!0},{name:"SubItem",bnf:[['"("',"RULE_WHITESPACE*","Choice","RULE_WHITESPACE*",'")"']]},{name:"StringLiteral",bnf:[["'\"'",/[^"]*/,"'\"'"],['"\'"',/[^']*/,'"\'"']],pinned:1},{name:"CharCode",bnf:[['"#x"',/[0-9a-zA-Z]+/]]},{name:"CharClass",bnf:[["'['","'^'?","%RULE_CharClass_1+",'"]"']]},{name:"%RULE_CharClass_1",bnf:[["CharCodeRange"],["CharRange"],["CharCode"],["RULE_Char"]],fragment:!0},{name:"RULE_Char",bnf:[[/\x09/],[/\x0A/],[/\x0D/],[/[\x20-\x5c]/],[/[\x5e-\uD7FF]/],[/[\uE000-\uFFFD]/]]},{name:"CharRange",bnf:[["RULE_Char",'"-"',"RULE_Char"]]},{name:"CharCodeRange",bnf:[["CharCode",'"-"',"CharCode"]]},{name:"RULE_WHITESPACE",bnf:[["%RULE_WHITESPACE_CHAR*"],["Comment","RULE_WHITESPACE*"]]},{name:"RULE_S",bnf:[["RULE_WHITESPACE","RULE_S*"],["RULE_EOL","RULE_S*"]]},{name:"%RULE_WHITESPACE_CHAR",bnf:[[/\x09/],[/\x20/]],fragment:!0},{name:"Comment",bnf:[['"/*"',"%RULE_Comment_Body*",'"*/"']]},{name:"%RULE_Comment_Body",bnf:[['!"*/"',/[^*]/]],fragment:!0},{name:"RULE_EOL",bnf:[[/\x0D/,/\x0A/],[/\x0A/],[/\x0D/]]},{name:"Link",bnf:[["'['","Url","']'"]]},{name:"Url",bnf:[[/[^\x5D:\/?#]/,'"://"',/[^\x5D#]+/,"%Url1?"]]},{name:"%Url1",bnf:[['"#"',"NCName"]],fragment:!0}],e.parser=new i.Parser(e.RULES,{});const n=/^(!|&)/,t=/(\?|\+|\*)$/,r=/^%/;function a(e,a){if("string"==typeof e){if(n.test(e))return "";if(r.test(e)){let n=t.exec(e),r=n?n[0]+" ":"";return function(e,n){let t=i.findRuleByName(e,n);return t&&1==t.bnf.length&&1==t.bnf[0].length&&(t.bnf[0][0]instanceof RegExp||'"'==t.bnf[0][0][0]||"'"==t.bnf[0][0][0])}(e,a)?o(e,a)+r:"("+o(e,a)+")"+r}return e}return e.source.replace(/\\(?:x|u)([a-zA-Z0-9]+)/g,"#x$1").replace(/\[\\(?:x|u)([a-zA-Z0-9]+)-\\(?:x|u)([a-zA-Z0-9]+)\]/g,"[#x$1-#x$2]")}function o(e,n){let t=i.findRuleByName(e,n);return t?t.bnf.map(e=>(function(e,n){return e.map(e=>a(e,n)).join(" ")})(e,n)).join(" | "):"RULE_NOT_FOUND {"+e+"}"}function l(e){let n=[];return e.grammarRules.forEach(t=>{if(!/^%/.test(t.name)){let r=t.recover?" /* { recoverUntil="+t.recover+" } */":"";n.push(t.name+" ::= "+o(t.name,e)+r);}}),n.join("\n")}e.emit=l;let s=0;function f(e){return new RegExp(e.replace(/#x([a-zA-Z0-9]{4})/g,"\\u$1").replace(/#x([a-zA-Z0-9]{3})/g,"\\u0$1").replace(/#x([a-zA-Z0-9]{2})/g,"\\x$1").replace(/#x([a-zA-Z0-9]{1})/g,"\\x0$1"))}function c(e,n,t){let r=null,i=[];return n.children.forEach((a,o)=>{"Minus"==a.type&&function(e,n){throw console.log("reberia restar "+n+" a "+e),new Error("Difference not supported yet")}(r,a);let l=n.children[o+1];l=l&&"PrimaryDecoration"==l.type&&l.text||"";switch(a.type){case"SubItem":let n="%"+(t+s++);u(e,a,n),i.push(""+n+l);break;case"NCName":case"StringLiteral":i.push(""+a.text+l);break;case"CharCode":case"CharClass":if(l){let n={name:"%"+(t+s++),bnf:[[f(a.text)]]};e.push(n),i.push(""+n.name+l);}else i.push(f(a.text));break;case"PrimaryDecoration":break;default:throw new Error(" HOW SHOULD I PARSE THIS? "+a.type+" -> "+JSON.stringify(a.text))}r=a;}),i}function u(e,n,t){let r=n.children.filter(e=>"SequenceOrDifference"==e.type).map(n=>c(e,n,t)),i={name:t,bnf:r},a=null;r.forEach(e=>{a=a||e.recover,delete e.recover;}),0==t.indexOf("%")&&(i.fragment=!0),a&&(i.recover=a),e.push(i);}function h(n){let t=e.parser.getAST(n);if(!t)throw new Error("Could not parse "+n);if(t.errors&&t.errors.length)throw t.errors[0];let r=[];return t.children.filter(e=>"Production"==e.type).map(e=>{let n=e.children.filter(e=>"NCName"==e.type)[0].text;u(r,e,n);}),r}e.getRules=h,e.Transform=function(e){return h(e.join(""))};e.Parser=class extends i.Parser{constructor(e,n){super(h(e),n);}emitSource(){return l(this)}};}(t||(t={})),n.default=t;})).Parser)('cm7           ::= EOL* configs EOL+ song\n\nconfigs       ::= key_config\nkey_config    ::= "key" WS? "=" WS? note\nnote          ::= [ACDFG] "#" | [ABDEG] "b" | [A-G]\n\nsong          ::= section? (EOL+ section?)*\n\nsection       ::= ("::" WS* section_label WS* "::" EOL)? line (EOL line)*\nsection_label ::= [^:]+\n\nline          ::= WS* (EMPTY_LINE | chord_line) WS* (EOL WS* (EMPTY_LINE | lyrics_line) WS*)\n\nchord_line    ::= chord (WS+ chord)*\nchord         ::= relative_note quality? addition* base?\nquality       ::= "mM7" | "m7b5" | "m7" | "m" | "sus2" | "sus4" |"7" | "M7" | "6" | "9" | "aug7" | "aug" | "dim7" | "dim"\naddition      ::= "add" modifier? interval\nbase          ::= "/" relative_note\nrelative_note ::= ("1" | "2" | "3" | "4" | "5" | "6" | "7") ("#" | "b")?\ninterval      ::= "2" | "4" | "6" | "9" | "11" | "13"\nmodifier      ::= "#" | "b"\n\nlyrics_line   ::= lyrics? (lyrics_beat+ lyrics?)*\nlyrics        ::= [^\\n\\r()]+\nlyrics_beat   ::= "(" lyrics? ")"\n\nEMPTY_LINE    ::= "-"+\n\nWS            ::= [ \\t]+\nEOL           ::= [\\n\\r]\n\n');return e=>a.getAST(e)});
	});

	var parseCm7 = unwrapExports(parseCm7_umd_min);

	const parseSelector = (selector) => ({
	  tagName: selector.split(/[#.]/g)[0],
	  id: (selector.match(/#[^.]*/g) || []).map(id => id.slice(1))[0],
	  classes: (selector.match(/\.[^.#]*/g) || []).map(cls => cls.slice(1)),
	});

	function createEl(selector, {
	  children = [],
	} = {}) {
	  const { tagName, id, classes } = parseSelector(selector);
	  const el = document.createElement(tagName);

	  // populate the id
	  if (id) el.id = id;

	  // populate the class
	  el.className = classes.join(' ');

	  // append children
	  children.forEach(child => {
	    if (typeof child === 'string') child = document.createTextNode(child);
	    el.appendChild(child);
	  });

	  return el;
	}

	function findChildrenOfType (node, type) {
	  return node.children.filter(child => child.type === type);
	}

	function findFirstChildOfType (node, type) {
	  return node.children.find(child => child.type === type);
	}

	const isValidRelativeNote = n => /^[1-7](#|b)?$/.test(n);
	const isValidQuality = q => ['mM7', 'm7b5', 'm7', 'm', 'sus2', 'sus4', '7', 'M7', '6', '9', 'aug7', 'aug', 'dim7', 'dim'].includes(q);
	const isValidAddition = a => /^add(#|b)?(2|4|6|9|11|13)/.test(a);

	const relativeToAbsoluteNote = (relativeNote, key) => {
	  const resolveNote = note => {
	    const special = {
	      'Cb': 'B',
	      'E#': 'F',
	      'Fb': 'E',
	      'B#': 'C',
	    };

	    if (note in special) return special[note];
	    if (!/(bb|##|b#|#b)/.test(note)) return note;
	    const accNote = rootNote => {
	      const a = String.fromCharCode(rootNote.charCodeAt(0) + 1);
	      if (a === 'H') return 'A';
	      return a;
	    };

	    const decNote = rootNote => {
	      const a = String.fromCharCode(rootNote.charCodeAt(0) - 1);
	      if (a === '@') return 'G';
	      return a;
	    };

	    const rootNote = note.match(/[A-G]/)[0];

	    if (/(#b|b#)/.test(note)) return rootNote;
	    if (/##/.test(note)) return accNote(rootNote);
	    if (/bb/.test(note)) return decNote(rootNote);
	    throw Error(`Cm7: shouldn't have reached here... ermmmmm...`);
	  };

	  const SCALES = {
	    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
	    'C#': ['C#', 'D#', 'F', 'F#', 'G#', 'A#', 'C'],
	    'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
	    'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
	    'D#': ['D#', 'F', 'G', 'G#', 'A#', 'C', 'D'],
	    'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
	    'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
	    'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
	    'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'F'],
	    'Gb': ['Gb', 'Ab', 'Bb', 'B', 'Db', 'Eb', 'F'],
	    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
	    'G#': ['G#', 'A#', 'C', 'C#', 'D#', 'F', 'G'],
	    'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
	    'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
	    'A#': ['A#', 'C', 'D', 'D#', 'F', 'G', 'A'],
	    'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
	    'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
	  };

	  const relativeNeutralNote = Number.parseInt(relativeNote);
	  const sharpOrFlatOrNone = (relativeNote.match(/[#b]/) || [''])[0];

	  if (!relativeNeutralNote || relativeNeutralNote < 0) throw Error(
	    `Cm7: relativeNote (${relativeNote}) is not valid.`
	  );

	  if (!(key in SCALES)) throw Error(
	    `Cm7: key (${key}) is not valid key. Please choose from ` +
	    Object.keys(SCALES).join(', ') + '.'
	  );

	  const rootNote = SCALES[key][(relativeNeutralNote - 1) % 7];
	  return resolveNote(rootNote + sharpOrFlatOrNone);
	};

	class Chord {
	  constructor({ root, quality = '', additions = [], base = ''}) {
	    if (!isValidRelativeNote(root)) {
	      throw Error(`Cm7: root (${root}) is not a valid relative note.`);
	    }

	    if (quality !== '' && !isValidQuality(quality)) {
	      throw Error(`Cm7: quality (${quality}) is not a valid quality.`);
	    }

	    for (const addition of additions) {
	      if (!isValidAddition(addition)) {
	        throw Error(`Cm7: addition (${addition}) is not a valid addition.`);
	      }
	    }

	    if (base !== '' && !isValidRelativeNote(base)) {
	      throw Error(`Cm7: base (${base}) is not a valid relative note.`);
	    }

	    Object.assign(this, { root, quality, additions, base });
	  }

	  display(key) {
	    const { root, quality, additions, base } = this;

	    const baseDisplay = base === ''
	      ? ''
	      : '/' + relativeToAbsoluteNote(base, key);

	    return relativeToAbsoluteNote(root, key) +
	      quality +
	      additions.join('') +
	      baseDisplay;
	  }

	  toDOM({ cssClasses, key }) {
	    return createEl(`span.${cssClasses.chord}`, {
	      children: [this.display(key)],
	    });
	  }

	  static fromAST(chordNode) {
	    const root = findFirstChildOfType(chordNode, 'relative_note').text;
	    const quality = (() => {
	      try {
	        return findFirstChildOfType(chordNode, 'quality').text;
	      } catch (e) {
	        return '';
	      }
	    })();
	    const additions = findChildrenOfType(chordNode, 'addition')
	      .map(({ text }) => text);

	    const base = (() => {
	      try {
	        return findFirstChildOfType(
	          findFirstChildOfType(chordNode, 'base'),
	          'relative_note',
	        ).text;
	      } catch (e) {
	        return '';
	      }
	    })();

	    return new Chord({ root, quality, additions, base });
	  }
	}

	class Line {
	  constructor({ chords, lyrics }) {
	    Object.assign(this, { chords, lyrics });
	  }

	  toDOM({ cssClasses, key }) {
	    const children = [];
	    children.push(createEl(`div.${cssClasses.chordLine}`, {
	      children: [
	        ...this.chords.map(chord => chord.toDOM({ cssClasses, key })),
	        '\u00A0',
	      ],
	    }));

	    if (this.lyrics.length > 0) {
	      children.push(createEl(`div.${cssClasses.lyricLine}`, {
	        children: [
	          ...this.lyrics.map(({ type, text }) => {
	            if (type === 'lyrics_beat') {
	              return createEl(`span.${cssClasses.lyricsBeat}`, {
	                children: [text.slice(1, -1)],
	              });
	            }

	            return text;
	          }),
	          '\u00A0',
	        ],
	      })
	      );
	    }

	    return createEl(`div.${cssClasses.line}`, { children });
	  }

	  static fromAST(lineNode) {
	    const chordLineNode = findFirstChildOfType(lineNode, 'chord_line');
	    const lyricLineNode = findFirstChildOfType(lineNode, 'lyrics_line');

	    return new Line({
	      chords: chordLineNode? chordLineNode.children.map(Chord.fromAST): [],
	      lyrics: lyricLineNode? lyricLineNode.children.map(({ type, text }) => ({
	        type,
	        text,
	      })): [],
	    });
	  }
	}

	class Section {
	  constructor({ label, lines }) {
	    Object.assign(this, { label, lines });
	  }

	  toDOM({ key, cssClasses }) {
	    return createEl(`div.${cssClasses.section}`, {
	      children: [
	        createEl(`div.${cssClasses.sectionLabel}`, { children: [this.label] }),
	        ...this.lines.map(
	          line => line.toDOM({ key, cssClasses }),
	        ),
	      ],
	    });
	  }

	  static fromAST(sectionNode) {
	    const sectionLabel = findFirstChildOfType(sectionNode, 'section_label');
	    const lines = findChildrenOfType(sectionNode, 'line').map(Line.fromAST);

	    return new Section({
	      label: sectionLabel? sectionLabel.text.trim(): '',
	      lines,
	    });
	  }
	}

	class Song {
	  constructor({ configs, sections }) {
	    Object.assign(this, { configs, sections });
	  }

	  toDOM({ cssClasses }) {
	    const { key } = this.configs;
	    return createEl(`div.${cssClasses.song}`, {
	      children: this.sections.map(
	        section => section.toDOM({ key, cssClasses })
	      ),
	    });
	  }

	  static fromAST(ast) {
	    const configs = findFirstChildOfType(ast, 'configs')
	      .text.split('\n')
	      .map(config => config.split('='))
	      .reduce((acc, [key, value]) => ({
	        ...acc,
	        [key.trim()]: value.trim(),
	      }), {});

	    const sections = findFirstChildOfType(ast, 'song').children.map(Section.fromAST);

	    return new Song({ configs, sections });
	  }
	}

	var render = ({ cssClasses, ast }) => {
	  // pre: all arguments are checked!
	  const song = Song.fromAST(ast);

	  const $cm7 = createEl(`div.${cssClasses.cm7}`, {
	    children: [song.toDOM({ cssClasses })],
	  });

	  return $cm7.innerHTML;
	};

	function zip([x, ...xs], [y, ...ys]) {
	  if (typeof x === 'undefined' || typeof y === 'undefined') return [];
	  return [[x, y], ...zip(xs, ys)];
	}

	var mount = ({ el, cm7HTML, cssClasses }) => {
	  if (typeof el === 'string' && el.trim().length <= 0) throw Error('Cm7: `el` is empty.');

	  const $el = typeof el === 'string'? document.querySelector(el): el;
	  $el.innerHTML = cm7HTML;

	  const $lines = $el.querySelectorAll(`.${cssClasses.line}`);

	  for (const $line of $lines) {
	    const $chords = $line.querySelectorAll(`.${cssClasses.chord}`);
	    const $beats = $line.querySelectorAll(`.${cssClasses.lyricsBeat}`);

	    for (const [$chord, $beat] of zip($chords, $beats)) {
	      Object.assign($chord.style, {
	        position: 'relative',
	        left: ($beat.offsetLeft - $chord.offsetLeft) + 'px',
	      });

	      Object.assign($beat.style, {
	        display: 'inline-block',
	        minWidth: $chord.offsetWidth + 'px',
	      });
	    }
	  }
	};

	var defaultCssClasses = {
	  cm7: 'cm7',
	  song: 'cm7_song',
	  section: 'cm7_section',
	  sectionLabel: 'cm7_section_label',
	  chord: 'cm7_chord',
	  line: 'cm7_line',
	  chordLine: 'cm7_line_chords',
	  lyricLine: 'cm7_line_lyrics',
	  lyricsBeat: 'cm7_line_lyrics-beat',
	};

	function Cm7({ el, src, cssClasses }) {
	  if (typeof src !== 'string') throw Error('Cm7: `src` should be a string.');

	  const ast = parseCm7(src);

	  if (ast === null) throw Error('Cm7: `src` is not a valid cm7 source.');

	  if (ast.errors.length > 0) {
	    ast.errors.forEach(error => console.error(error));
	    throw Error('Cm7: `src` is not a valid cm7 source. See the above errors.');
	  }

	  cssClasses = {
	    ...defaultCssClasses,
	    ...cssClasses,
	  };

	  const cm7HTML = render({ cssClasses, ast });

	  if (el) mount({ el, cm7HTML, cssClasses });

	  return {
	    mount: (el) => mount({ el, cm7HTML, cssClasses }),
	  };
	}

	return Cm7;

})));
