// contracts.js
function flagsToString(flags) {
  return ["g", "i", "m", "s", "u", "y"].filter((k) => !!flags[k]).join("");
}
function normalizePatternInput(patternRaw) {
  const s = String(patternRaw ?? "");
  if (s.startsWith("/") && s.lastIndexOf("/") > 0) {
    const last = s.lastIndexOf("/");
    const body = s.slice(1, last);
    return body;
  }
  return s;
}

// node_modules/regexpp/index.mjs
var largeIdStartRanges = void 0;
var largeIdContinueRanges = void 0;
function isIdStart(cp) {
  if (cp < 65)
    return false;
  if (cp < 91)
    return true;
  if (cp < 97)
    return false;
  if (cp < 123)
    return true;
  return isLargeIdStart(cp);
}
function isIdContinue(cp) {
  if (cp < 48)
    return false;
  if (cp < 58)
    return true;
  if (cp < 65)
    return false;
  if (cp < 91)
    return true;
  if (cp === 95)
    return true;
  if (cp < 97)
    return false;
  if (cp < 123)
    return true;
  return isLargeIdStart(cp) || isLargeIdContinue(cp);
}
function isLargeIdStart(cp) {
  return isInRange(cp, largeIdStartRanges || (largeIdStartRanges = initLargeIdStartRanges()));
}
function isLargeIdContinue(cp) {
  return isInRange(cp, largeIdContinueRanges || (largeIdContinueRanges = initLargeIdContinueRanges()));
}
function initLargeIdStartRanges() {
  return restoreRanges("4q 0 b 0 5 0 6 m 2 u 2 cp 5 b f 4 8 0 2 0 3m 4 2 1 3 3 2 0 7 0 2 2 2 0 2 j 2 2a 2 3u 9 4l 2 11 3 0 7 14 20 q 5 3 1a 16 10 1 2 2q 2 0 g 1 8 1 b 2 3 0 h 0 2 t u 2g c 0 p w a 1 5 0 6 l 5 0 a 0 4 0 o o 8 a 1i k 2 h 1p 1h 4 0 j 0 8 9 g f 5 7 3 1 3 l 2 6 2 0 4 3 4 0 h 0 e 1 2 2 f 1 b 0 9 5 5 1 3 l 2 6 2 1 2 1 2 1 w 3 2 0 k 2 h 8 2 2 2 l 2 6 2 1 2 4 4 0 j 0 g 1 o 0 c 7 3 1 3 l 2 6 2 1 2 4 4 0 v 1 2 2 g 0 i 0 2 5 4 2 2 3 4 1 2 0 2 1 4 1 4 2 4 b n 0 1h 7 2 2 2 m 2 f 4 0 r 2 6 1 v 0 5 7 2 2 2 m 2 9 2 4 4 0 x 0 2 1 g 1 i 8 2 2 2 14 3 0 h 0 6 2 9 2 p 5 6 h 4 n 2 8 2 0 3 6 1n 1b 2 1 d 6 1n 1 2 0 2 4 2 n 2 0 2 9 2 1 a 0 3 4 2 0 m 3 x 0 1s 7 2 z s 4 38 16 l 0 h 5 5 3 4 0 4 1 8 2 5 c d 0 i 11 2 0 6 0 3 16 2 98 2 3 3 6 2 0 2 3 3 14 2 3 3 w 2 3 3 6 2 0 2 3 3 e 2 1k 2 3 3 1u 12 f h 2d 3 5 4 h7 3 g 2 p 6 22 4 a 8 c 2 3 f h f h f c 2 2 g 1f 10 0 5 0 1w 2g 8 14 2 0 6 1x b u 1e t 3 4 c 17 5 p 1j m a 1g 2b 0 2m 1a i 6 1k t e 1 b 17 r z 16 2 b z 3 8 8 16 3 2 16 3 2 5 2 1 4 0 6 5b 1t 7p 3 5 3 11 3 5 3 7 2 0 2 0 2 0 2 u 3 1g 2 6 2 0 4 2 2 6 4 3 3 5 5 c 6 2 2 6 39 0 e 0 h c 2u 0 5 0 3 9 2 0 3 5 7 0 2 0 2 0 2 f 3 3 6 4 5 0 i 14 22g 1a 2 1a 2 3o 7 3 4 1 d 11 2 0 6 0 3 1j 8 0 h m a 6 2 6 2 6 2 6 2 6 2 6 2 6 2 6 fb 2 q 8 8 4 3 4 5 2d 5 4 2 2h 2 3 6 16 2 2l i v 1d f e9 533 1t g70 4 wc 1w 19 3 7g 4 f b 1 l 1a h u 3 27 14 8 3 2u 3 1g 3 8 17 c 2 2 2 3 2 m u 1f f 1d 1r 5 4 0 2 1 c r b m q s 8 1a t 0 h 4 2 9 b 4 2 14 o 2 2 7 l m 4 0 4 1d 2 0 4 1 3 4 3 0 2 0 p 2 3 a 8 2 d 5 3 5 3 5 a 6 2 6 2 16 2 d 7 36 u 8mb d m 5 1c 6it a5 3 2x 13 6 d 4 6 0 2 9 2 c 2 4 2 0 2 1 2 1 2 2z y a2 j 1r 3 1h 15 b 39 4 2 3q 11 p 7 p c 2g 4 5 3 5 3 5 3 2 10 b 2 p 2 i 2 1 2 e 3 d z 3e 1y 1g 7g s 4 1c 1c v e t 6 11 b t 3 z 5 7 2 4 17 4d j z 5 z 5 13 9 1f 4d 8m a l b 7 49 5 3 0 2 17 2 1 4 0 3 m b m a u 1u i 2 1 b l b p 1z 1j 7 1 1t 0 g 3 2 2 2 s 17 s 4 s 10 7 2 r s 1h b l b i e h 33 20 1k 1e e 1e e z 9p 15 7 1 27 s b 0 9 l 2z k s m d 1g 24 18 x o r z u 0 3 0 9 y 4 0 d 1b f 3 m 0 2 0 10 h 2 o 2d 6 2 0 2 3 2 e 2 9 8 1a 13 7 3 1 3 l 2 6 2 1 2 4 4 0 j 0 d 4 4f 1g j 3 l 2 v 1b l 1 2 0 55 1a 16 3 11 1b l 0 1o 16 e 0 20 q 6e 17 39 1r w 7 3 0 3 7 2 1 2 n g 0 2 0 2n 7 3 12 h 0 2 0 t 0 b 13 8 0 m 0 c 19 k 0 z 1k 7c 8 2 10 i 0 1e t 35 6 2 1 2 11 m 0 q 5 2 1 2 v f 0 94 i 5a 0 28 pl 2v 32 i 5f 24d tq 34i g6 6nu fs 8 u 36 t j 1b h 3 w k 6 i j5 1r 3l 22 6 0 1v c 1t 1 2 0 t 4qf 9 yd 17 8 6wo 7y 1e 2 i 3 9 az 1s5 2y 6 c 4 8 8 9 4mf 2c 2 1y 2 1 3 0 3 1 3 3 2 b 2 0 2 6 2 1s 2 3 3 7 2 6 2 r 2 3 2 4 2 0 4 6 2 9f 3 o 2 o 2 u 2 o 2 u 2 o 2 u 2 o 2 u 2 o 2 7 1th 18 b 6 h 0 aa 17 105 5g 1o 1v 8 0 xh 3 2 q 2 1 2 0 3 0 2 9 2 3 2 0 2 0 7 0 5 0 2 0 2 0 2 2 2 1 2 0 3 0 2 0 2 0 2 0 2 0 2 1 2 0 3 3 2 6 2 3 2 3 2 0 2 9 2 g 6 2 2 4 2 g 3et wyl z 378 c 65 3 4g1 f 5rk 2e8 f1 15v 3t6");
}
function initLargeIdContinueRanges() {
  return restoreRanges("53 0 g9 33 o 0 70 4 7e 18 2 0 2 1 2 1 2 0 21 a 1d u 7 0 2u 6 3 5 3 1 2 3 3 9 o 0 v q 2k a g 9 y 8 a 0 p 3 2 8 2 2 2 4 18 2 3c e 2 w 1j 2 2 h 2 6 b 1 3 9 i 2 1l 0 2 6 3 1 3 2 a 0 b 1 3 9 f 0 3 2 1l 0 2 4 5 1 3 2 4 0 l b 4 0 c 2 1l 0 2 7 2 2 2 2 l 1 3 9 b 5 2 2 1l 0 2 6 3 1 3 2 8 2 b 1 3 9 j 0 1o 4 4 2 2 3 a 0 f 9 h 4 1m 6 2 2 2 3 8 1 c 1 3 9 i 2 1l 0 2 6 2 2 2 3 8 1 c 1 3 9 h 3 1k 1 2 6 2 2 2 3 a 0 b 1 3 9 i 2 1z 0 5 5 2 0 2 7 7 9 3 1 1q 0 3 6 d 7 2 9 2g 0 3 8 c 5 3 9 1r 1 7 9 c 0 2 0 2 0 5 1 1e j 2 1 6 a 2 z a 0 2t j 2 9 d 3 5 2 2 2 3 6 4 3 e b 2 e jk 2 a 8 pt 2 u 2 u 1 v 1 1t v a 0 3 9 y 2 3 9 40 0 3b b 5 b b 9 3l a 1p 4 1m 9 2 s 3 a 7 9 n d 2 1 1s 4 1c g c 9 i 8 d 2 v c 3 9 19 d 1d j 9 9 7 9 3b 2 2 k 5 0 7 0 3 2 5j 1l 2 4 g0 1 k 0 3g c 5 0 4 b 2db 2 3y 0 2p v ff 5 2y 1 n7q 9 1y 0 5 9 x 1 29 1 7l 0 4 0 5 0 o 4 5 0 2c 1 1f h b 9 7 h e a t 7 q c 19 3 1c d g 9 c 0 b 9 1c d d 0 9 1 3 9 y 2 1f 0 2 2 3 1 6 1 2 0 16 4 6 1 6l 7 2 1 3 9 fmt 0 ki f h f 4 1 p 2 5d 9 12 0 ji 0 6b 0 46 4 86 9 120 2 2 1 6 3 15 2 5 0 4m 1 fy 3 9 9 aa 1 4a a 4w 2 1i e w 9 g 3 1a a 1i 9 7 2 11 d 2 9 6 1 19 0 d 2 1d d 9 3 2 b 2b b 7 0 4h b 6 9 7 3 1k 1 2 6 3 1 3 2 a 0 b 1 3 6 4 4 5d h a 9 5 0 2a j d 9 5y 6 3 8 s 1 2b g g 9 2a c 9 9 2c e 5 9 6r e 4m 9 1z 5 2 1 3 3 2 0 2 1 d 9 3c 6 3 6 4 0 t 9 15 6 2 3 9 0 a a 1b f ba 7 2 7 h 9 1l l 2 d 3f 5 4 0 2 1 2 6 2 0 9 9 1d 4 2 1 2 4 9 9 96 3 ewa 9 3r 4 1o 6 q 9 s6 0 2 1i 8 3 2a 0 c 1 f58 1 43r 4 4 5 9 7 3 6 v 3 45 2 13e 1d e9 1i 5 1d 9 0 f 0 n 4 2 e 11t 6 2 g 3 6 2 1 2 4 7a 6 a 9 bn d 15j 6 32 6 6 9 3o7 9 gvt3 6n");
}
function isInRange(cp, ranges) {
  let l = 0, r = ranges.length / 2 | 0, i = 0, min = 0, max = 0;
  while (l < r) {
    i = (l + r) / 2 | 0;
    min = ranges[2 * i];
    max = ranges[2 * i + 1];
    if (cp < min) {
      r = i;
    } else if (cp > max) {
      l = i + 1;
    } else {
      return true;
    }
  }
  return false;
}
function restoreRanges(data) {
  let last = 0;
  return data.split(" ").map((s) => last += parseInt(s, 36) | 0);
}
var DataSet = class {
  constructor(raw2018, raw2019, raw2020, raw2021) {
    this._raw2018 = raw2018;
    this._raw2019 = raw2019;
    this._raw2020 = raw2020;
    this._raw2021 = raw2021;
  }
  get es2018() {
    return this._set2018 || (this._set2018 = new Set(this._raw2018.split(" ")));
  }
  get es2019() {
    return this._set2019 || (this._set2019 = new Set(this._raw2019.split(" ")));
  }
  get es2020() {
    return this._set2020 || (this._set2020 = new Set(this._raw2020.split(" ")));
  }
  get es2021() {
    return this._set2021 || (this._set2021 = new Set(this._raw2021.split(" ")));
  }
};
var gcNameSet = /* @__PURE__ */ new Set(["General_Category", "gc"]);
var scNameSet = /* @__PURE__ */ new Set(["Script", "Script_Extensions", "sc", "scx"]);
var gcValueSets = new DataSet("C Cased_Letter Cc Cf Close_Punctuation Cn Co Combining_Mark Connector_Punctuation Control Cs Currency_Symbol Dash_Punctuation Decimal_Number Enclosing_Mark Final_Punctuation Format Initial_Punctuation L LC Letter Letter_Number Line_Separator Ll Lm Lo Lowercase_Letter Lt Lu M Mark Math_Symbol Mc Me Mn Modifier_Letter Modifier_Symbol N Nd Nl No Nonspacing_Mark Number Open_Punctuation Other Other_Letter Other_Number Other_Punctuation Other_Symbol P Paragraph_Separator Pc Pd Pe Pf Pi Po Private_Use Ps Punctuation S Sc Separator Sk Sm So Space_Separator Spacing_Mark Surrogate Symbol Titlecase_Letter Unassigned Uppercase_Letter Z Zl Zp Zs cntrl digit punct", "", "", "");
var scValueSets = new DataSet("Adlam Adlm Aghb Ahom Anatolian_Hieroglyphs Arab Arabic Armenian Armi Armn Avestan Avst Bali Balinese Bamu Bamum Bass Bassa_Vah Batak Batk Beng Bengali Bhaiksuki Bhks Bopo Bopomofo Brah Brahmi Brai Braille Bugi Buginese Buhd Buhid Cakm Canadian_Aboriginal Cans Cari Carian Caucasian_Albanian Chakma Cham Cher Cherokee Common Copt Coptic Cprt Cuneiform Cypriot Cyrillic Cyrl Deseret Deva Devanagari Dsrt Dupl Duployan Egyp Egyptian_Hieroglyphs Elba Elbasan Ethi Ethiopic Geor Georgian Glag Glagolitic Gonm Goth Gothic Gran Grantha Greek Grek Gujarati Gujr Gurmukhi Guru Han Hang Hangul Hani Hano Hanunoo Hatr Hatran Hebr Hebrew Hira Hiragana Hluw Hmng Hung Imperial_Aramaic Inherited Inscriptional_Pahlavi Inscriptional_Parthian Ital Java Javanese Kaithi Kali Kana Kannada Katakana Kayah_Li Khar Kharoshthi Khmer Khmr Khoj Khojki Khudawadi Knda Kthi Lana Lao Laoo Latin Latn Lepc Lepcha Limb Limbu Lina Linb Linear_A Linear_B Lisu Lyci Lycian Lydi Lydian Mahajani Mahj Malayalam Mand Mandaic Mani Manichaean Marc Marchen Masaram_Gondi Meetei_Mayek Mend Mende_Kikakui Merc Mero Meroitic_Cursive Meroitic_Hieroglyphs Miao Mlym Modi Mong Mongolian Mro Mroo Mtei Mult Multani Myanmar Mymr Nabataean Narb Nbat New_Tai_Lue Newa Nko Nkoo Nshu Nushu Ogam Ogham Ol_Chiki Olck Old_Hungarian Old_Italic Old_North_Arabian Old_Permic Old_Persian Old_South_Arabian Old_Turkic Oriya Orkh Orya Osage Osge Osma Osmanya Pahawh_Hmong Palm Palmyrene Pau_Cin_Hau Pauc Perm Phag Phags_Pa Phli Phlp Phnx Phoenician Plrd Prti Psalter_Pahlavi Qaac Qaai Rejang Rjng Runic Runr Samaritan Samr Sarb Saur Saurashtra Sgnw Sharada Shavian Shaw Shrd Sidd Siddham SignWriting Sind Sinh Sinhala Sora Sora_Sompeng Soyo Soyombo Sund Sundanese Sylo Syloti_Nagri Syrc Syriac Tagalog Tagb Tagbanwa Tai_Le Tai_Tham Tai_Viet Takr Takri Tale Talu Tamil Taml Tang Tangut Tavt Telu Telugu Tfng Tglg Thaa Thaana Thai Tibetan Tibt Tifinagh Tirh Tirhuta Ugar Ugaritic Vai Vaii Wara Warang_Citi Xpeo Xsux Yi Yiii Zanabazar_Square Zanb Zinh Zyyy", "Dogr Dogra Gong Gunjala_Gondi Hanifi_Rohingya Maka Makasar Medefaidrin Medf Old_Sogdian Rohg Sogd Sogdian Sogo", "Elym Elymaic Hmnp Nand Nandinagari Nyiakeng_Puachue_Hmong Wancho Wcho", "Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi");
var binPropertySets = new DataSet("AHex ASCII ASCII_Hex_Digit Alpha Alphabetic Any Assigned Bidi_C Bidi_Control Bidi_M Bidi_Mirrored CI CWCF CWCM CWKCF CWL CWT CWU Case_Ignorable Cased Changes_When_Casefolded Changes_When_Casemapped Changes_When_Lowercased Changes_When_NFKC_Casefolded Changes_When_Titlecased Changes_When_Uppercased DI Dash Default_Ignorable_Code_Point Dep Deprecated Dia Diacritic Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Ext Extender Gr_Base Gr_Ext Grapheme_Base Grapheme_Extend Hex Hex_Digit IDC IDS IDSB IDST IDS_Binary_Operator IDS_Trinary_Operator ID_Continue ID_Start Ideo Ideographic Join_C Join_Control LOE Logical_Order_Exception Lower Lowercase Math NChar Noncharacter_Code_Point Pat_Syn Pat_WS Pattern_Syntax Pattern_White_Space QMark Quotation_Mark RI Radical Regional_Indicator SD STerm Sentence_Terminal Soft_Dotted Term Terminal_Punctuation UIdeo Unified_Ideograph Upper Uppercase VS Variation_Selector White_Space XIDC XIDS XID_Continue XID_Start space", "Extended_Pictographic", "", "EBase EComp EMod EPres ExtPict");
function isValidUnicodeProperty(version, name, value) {
  if (gcNameSet.has(name)) {
    return version >= 2018 && gcValueSets.es2018.has(value);
  }
  if (scNameSet.has(name)) {
    return version >= 2018 && scValueSets.es2018.has(value) || version >= 2019 && scValueSets.es2019.has(value) || version >= 2020 && scValueSets.es2020.has(value) || version >= 2021 && scValueSets.es2021.has(value);
  }
  return false;
}
function isValidLoneUnicodeProperty(version, value) {
  return version >= 2018 && binPropertySets.es2018.has(value) || version >= 2019 && binPropertySets.es2019.has(value) || version >= 2021 && binPropertySets.es2021.has(value);
}
var Backspace = 8;
var CharacterTabulation = 9;
var LineFeed = 10;
var LineTabulation = 11;
var FormFeed = 12;
var CarriageReturn = 13;
var ExclamationMark = 33;
var DollarSign = 36;
var LeftParenthesis = 40;
var RightParenthesis = 41;
var Asterisk = 42;
var PlusSign = 43;
var Comma = 44;
var HyphenMinus = 45;
var FullStop = 46;
var Solidus = 47;
var DigitZero = 48;
var DigitOne = 49;
var DigitSeven = 55;
var DigitNine = 57;
var Colon = 58;
var LessThanSign = 60;
var EqualsSign = 61;
var GreaterThanSign = 62;
var QuestionMark = 63;
var LatinCapitalLetterA = 65;
var LatinCapitalLetterB = 66;
var LatinCapitalLetterD = 68;
var LatinCapitalLetterF = 70;
var LatinCapitalLetterP = 80;
var LatinCapitalLetterS = 83;
var LatinCapitalLetterW = 87;
var LatinCapitalLetterZ = 90;
var LowLine = 95;
var LatinSmallLetterA = 97;
var LatinSmallLetterB = 98;
var LatinSmallLetterC = 99;
var LatinSmallLetterD = 100;
var LatinSmallLetterF = 102;
var LatinSmallLetterG = 103;
var LatinSmallLetterI = 105;
var LatinSmallLetterK = 107;
var LatinSmallLetterM = 109;
var LatinSmallLetterN = 110;
var LatinSmallLetterP = 112;
var LatinSmallLetterR = 114;
var LatinSmallLetterS = 115;
var LatinSmallLetterT = 116;
var LatinSmallLetterU = 117;
var LatinSmallLetterV = 118;
var LatinSmallLetterW = 119;
var LatinSmallLetterX = 120;
var LatinSmallLetterY = 121;
var LatinSmallLetterZ = 122;
var LeftSquareBracket = 91;
var ReverseSolidus = 92;
var RightSquareBracket = 93;
var CircumflexAccent = 94;
var LeftCurlyBracket = 123;
var VerticalLine = 124;
var RightCurlyBracket = 125;
var ZeroWidthNonJoiner = 8204;
var ZeroWidthJoiner = 8205;
var LineSeparator = 8232;
var ParagraphSeparator = 8233;
var MinCodePoint = 0;
var MaxCodePoint = 1114111;
function isLatinLetter(code) {
  return code >= LatinCapitalLetterA && code <= LatinCapitalLetterZ || code >= LatinSmallLetterA && code <= LatinSmallLetterZ;
}
function isDecimalDigit(code) {
  return code >= DigitZero && code <= DigitNine;
}
function isOctalDigit(code) {
  return code >= DigitZero && code <= DigitSeven;
}
function isHexDigit(code) {
  return code >= DigitZero && code <= DigitNine || code >= LatinCapitalLetterA && code <= LatinCapitalLetterF || code >= LatinSmallLetterA && code <= LatinSmallLetterF;
}
function isLineTerminator(code) {
  return code === LineFeed || code === CarriageReturn || code === LineSeparator || code === ParagraphSeparator;
}
function isValidUnicode(code) {
  return code >= MinCodePoint && code <= MaxCodePoint;
}
function digitToInt(code) {
  if (code >= LatinSmallLetterA && code <= LatinSmallLetterF) {
    return code - LatinSmallLetterA + 10;
  }
  if (code >= LatinCapitalLetterA && code <= LatinCapitalLetterF) {
    return code - LatinCapitalLetterA + 10;
  }
  return code - DigitZero;
}
function isLeadSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isTrailSurrogate(code) {
  return code >= 56320 && code <= 57343;
}
function combineSurrogatePair(lead, trail) {
  return (lead - 55296) * 1024 + (trail - 56320) + 65536;
}
var legacyImpl = {
  at(s, end, i) {
    return i < end ? s.charCodeAt(i) : -1;
  },
  width(c) {
    return 1;
  }
};
var unicodeImpl = {
  at(s, end, i) {
    return i < end ? s.codePointAt(i) : -1;
  },
  width(c) {
    return c > 65535 ? 2 : 1;
  }
};
var Reader = class {
  constructor() {
    this._impl = legacyImpl;
    this._s = "";
    this._i = 0;
    this._end = 0;
    this._cp1 = -1;
    this._w1 = 1;
    this._cp2 = -1;
    this._w2 = 1;
    this._cp3 = -1;
    this._w3 = 1;
    this._cp4 = -1;
  }
  get source() {
    return this._s;
  }
  get index() {
    return this._i;
  }
  get currentCodePoint() {
    return this._cp1;
  }
  get nextCodePoint() {
    return this._cp2;
  }
  get nextCodePoint2() {
    return this._cp3;
  }
  get nextCodePoint3() {
    return this._cp4;
  }
  reset(source, start, end, uFlag) {
    this._impl = uFlag ? unicodeImpl : legacyImpl;
    this._s = source;
    this._end = end;
    this.rewind(start);
  }
  rewind(index) {
    const impl = this._impl;
    this._i = index;
    this._cp1 = impl.at(this._s, this._end, index);
    this._w1 = impl.width(this._cp1);
    this._cp2 = impl.at(this._s, this._end, index + this._w1);
    this._w2 = impl.width(this._cp2);
    this._cp3 = impl.at(this._s, this._end, index + this._w1 + this._w2);
    this._w3 = impl.width(this._cp3);
    this._cp4 = impl.at(this._s, this._end, index + this._w1 + this._w2 + this._w3);
  }
  advance() {
    if (this._cp1 !== -1) {
      const impl = this._impl;
      this._i += this._w1;
      this._cp1 = this._cp2;
      this._w1 = this._w2;
      this._cp2 = this._cp3;
      this._w2 = impl.width(this._cp2);
      this._cp3 = this._cp4;
      this._w3 = impl.width(this._cp3);
      this._cp4 = impl.at(this._s, this._end, this._i + this._w1 + this._w2 + this._w3);
    }
  }
  eat(cp) {
    if (this._cp1 === cp) {
      this.advance();
      return true;
    }
    return false;
  }
  eat2(cp1, cp2) {
    if (this._cp1 === cp1 && this._cp2 === cp2) {
      this.advance();
      this.advance();
      return true;
    }
    return false;
  }
  eat3(cp1, cp2, cp3) {
    if (this._cp1 === cp1 && this._cp2 === cp2 && this._cp3 === cp3) {
      this.advance();
      this.advance();
      this.advance();
      return true;
    }
    return false;
  }
};
var RegExpSyntaxError = class extends SyntaxError {
  constructor(source, uFlag, index, message) {
    if (source) {
      if (!source.startsWith("/")) {
        source = `/${source}/${uFlag ? "u" : ""}`;
      }
      source = `: ${source}`;
    }
    super(`Invalid regular expression${source}: ${message}`);
    this.index = index;
  }
};
function isSyntaxCharacter(cp) {
  return cp === CircumflexAccent || cp === DollarSign || cp === ReverseSolidus || cp === FullStop || cp === Asterisk || cp === PlusSign || cp === QuestionMark || cp === LeftParenthesis || cp === RightParenthesis || cp === LeftSquareBracket || cp === RightSquareBracket || cp === LeftCurlyBracket || cp === RightCurlyBracket || cp === VerticalLine;
}
function isRegExpIdentifierStart(cp) {
  return isIdStart(cp) || cp === DollarSign || cp === LowLine;
}
function isRegExpIdentifierPart(cp) {
  return isIdContinue(cp) || cp === DollarSign || cp === LowLine || cp === ZeroWidthNonJoiner || cp === ZeroWidthJoiner;
}
function isUnicodePropertyNameCharacter(cp) {
  return isLatinLetter(cp) || cp === LowLine;
}
function isUnicodePropertyValueCharacter(cp) {
  return isUnicodePropertyNameCharacter(cp) || isDecimalDigit(cp);
}
var RegExpValidator = class {
  constructor(options) {
    this._reader = new Reader();
    this._uFlag = false;
    this._nFlag = false;
    this._lastIntValue = 0;
    this._lastMinValue = 0;
    this._lastMaxValue = 0;
    this._lastStrValue = "";
    this._lastKeyValue = "";
    this._lastValValue = "";
    this._lastAssertionIsQuantifiable = false;
    this._numCapturingParens = 0;
    this._groupNames = /* @__PURE__ */ new Set();
    this._backreferenceNames = /* @__PURE__ */ new Set();
    this._options = options || {};
  }
  validateLiteral(source, start = 0, end = source.length) {
    this._uFlag = this._nFlag = false;
    this.reset(source, start, end);
    this.onLiteralEnter(start);
    if (this.eat(Solidus) && this.eatRegExpBody() && this.eat(Solidus)) {
      const flagStart = this.index;
      const uFlag = source.includes("u", flagStart);
      this.validateFlags(source, flagStart, end);
      this.validatePattern(source, start + 1, flagStart - 1, uFlag);
    } else if (start >= end) {
      this.raise("Empty");
    } else {
      const c = String.fromCodePoint(this.currentCodePoint);
      this.raise(`Unexpected character '${c}'`);
    }
    this.onLiteralLeave(start, end);
  }
  validateFlags(source, start = 0, end = source.length) {
    const existingFlags = /* @__PURE__ */ new Set();
    let global = false;
    let ignoreCase = false;
    let multiline = false;
    let sticky = false;
    let unicode = false;
    let dotAll = false;
    let hasIndices = false;
    for (let i = start; i < end; ++i) {
      const flag = source.charCodeAt(i);
      if (existingFlags.has(flag)) {
        this.raise(`Duplicated flag '${source[i]}'`);
      }
      existingFlags.add(flag);
      if (flag === LatinSmallLetterG) {
        global = true;
      } else if (flag === LatinSmallLetterI) {
        ignoreCase = true;
      } else if (flag === LatinSmallLetterM) {
        multiline = true;
      } else if (flag === LatinSmallLetterU && this.ecmaVersion >= 2015) {
        unicode = true;
      } else if (flag === LatinSmallLetterY && this.ecmaVersion >= 2015) {
        sticky = true;
      } else if (flag === LatinSmallLetterS && this.ecmaVersion >= 2018) {
        dotAll = true;
      } else if (flag === LatinSmallLetterD && this.ecmaVersion >= 2022) {
        hasIndices = true;
      } else {
        this.raise(`Invalid flag '${source[i]}'`);
      }
    }
    this.onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll, hasIndices);
  }
  validatePattern(source, start = 0, end = source.length, uFlag = false) {
    this._uFlag = uFlag && this.ecmaVersion >= 2015;
    this._nFlag = uFlag && this.ecmaVersion >= 2018;
    this.reset(source, start, end);
    this.consumePattern();
    if (!this._nFlag && this.ecmaVersion >= 2018 && this._groupNames.size > 0) {
      this._nFlag = true;
      this.rewind(start);
      this.consumePattern();
    }
  }
  get strict() {
    return Boolean(this._options.strict || this._uFlag);
  }
  get ecmaVersion() {
    return this._options.ecmaVersion || 2022;
  }
  onLiteralEnter(start) {
    if (this._options.onLiteralEnter) {
      this._options.onLiteralEnter(start);
    }
  }
  onLiteralLeave(start, end) {
    if (this._options.onLiteralLeave) {
      this._options.onLiteralLeave(start, end);
    }
  }
  onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll, hasIndices) {
    if (this._options.onFlags) {
      this._options.onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll, hasIndices);
    }
  }
  onPatternEnter(start) {
    if (this._options.onPatternEnter) {
      this._options.onPatternEnter(start);
    }
  }
  onPatternLeave(start, end) {
    if (this._options.onPatternLeave) {
      this._options.onPatternLeave(start, end);
    }
  }
  onDisjunctionEnter(start) {
    if (this._options.onDisjunctionEnter) {
      this._options.onDisjunctionEnter(start);
    }
  }
  onDisjunctionLeave(start, end) {
    if (this._options.onDisjunctionLeave) {
      this._options.onDisjunctionLeave(start, end);
    }
  }
  onAlternativeEnter(start, index) {
    if (this._options.onAlternativeEnter) {
      this._options.onAlternativeEnter(start, index);
    }
  }
  onAlternativeLeave(start, end, index) {
    if (this._options.onAlternativeLeave) {
      this._options.onAlternativeLeave(start, end, index);
    }
  }
  onGroupEnter(start) {
    if (this._options.onGroupEnter) {
      this._options.onGroupEnter(start);
    }
  }
  onGroupLeave(start, end) {
    if (this._options.onGroupLeave) {
      this._options.onGroupLeave(start, end);
    }
  }
  onCapturingGroupEnter(start, name) {
    if (this._options.onCapturingGroupEnter) {
      this._options.onCapturingGroupEnter(start, name);
    }
  }
  onCapturingGroupLeave(start, end, name) {
    if (this._options.onCapturingGroupLeave) {
      this._options.onCapturingGroupLeave(start, end, name);
    }
  }
  onQuantifier(start, end, min, max, greedy) {
    if (this._options.onQuantifier) {
      this._options.onQuantifier(start, end, min, max, greedy);
    }
  }
  onLookaroundAssertionEnter(start, kind, negate) {
    if (this._options.onLookaroundAssertionEnter) {
      this._options.onLookaroundAssertionEnter(start, kind, negate);
    }
  }
  onLookaroundAssertionLeave(start, end, kind, negate) {
    if (this._options.onLookaroundAssertionLeave) {
      this._options.onLookaroundAssertionLeave(start, end, kind, negate);
    }
  }
  onEdgeAssertion(start, end, kind) {
    if (this._options.onEdgeAssertion) {
      this._options.onEdgeAssertion(start, end, kind);
    }
  }
  onWordBoundaryAssertion(start, end, kind, negate) {
    if (this._options.onWordBoundaryAssertion) {
      this._options.onWordBoundaryAssertion(start, end, kind, negate);
    }
  }
  onAnyCharacterSet(start, end, kind) {
    if (this._options.onAnyCharacterSet) {
      this._options.onAnyCharacterSet(start, end, kind);
    }
  }
  onEscapeCharacterSet(start, end, kind, negate) {
    if (this._options.onEscapeCharacterSet) {
      this._options.onEscapeCharacterSet(start, end, kind, negate);
    }
  }
  onUnicodePropertyCharacterSet(start, end, kind, key, value, negate) {
    if (this._options.onUnicodePropertyCharacterSet) {
      this._options.onUnicodePropertyCharacterSet(start, end, kind, key, value, negate);
    }
  }
  onCharacter(start, end, value) {
    if (this._options.onCharacter) {
      this._options.onCharacter(start, end, value);
    }
  }
  onBackreference(start, end, ref) {
    if (this._options.onBackreference) {
      this._options.onBackreference(start, end, ref);
    }
  }
  onCharacterClassEnter(start, negate) {
    if (this._options.onCharacterClassEnter) {
      this._options.onCharacterClassEnter(start, negate);
    }
  }
  onCharacterClassLeave(start, end, negate) {
    if (this._options.onCharacterClassLeave) {
      this._options.onCharacterClassLeave(start, end, negate);
    }
  }
  onCharacterClassRange(start, end, min, max) {
    if (this._options.onCharacterClassRange) {
      this._options.onCharacterClassRange(start, end, min, max);
    }
  }
  get source() {
    return this._reader.source;
  }
  get index() {
    return this._reader.index;
  }
  get currentCodePoint() {
    return this._reader.currentCodePoint;
  }
  get nextCodePoint() {
    return this._reader.nextCodePoint;
  }
  get nextCodePoint2() {
    return this._reader.nextCodePoint2;
  }
  get nextCodePoint3() {
    return this._reader.nextCodePoint3;
  }
  reset(source, start, end) {
    this._reader.reset(source, start, end, this._uFlag);
  }
  rewind(index) {
    this._reader.rewind(index);
  }
  advance() {
    this._reader.advance();
  }
  eat(cp) {
    return this._reader.eat(cp);
  }
  eat2(cp1, cp2) {
    return this._reader.eat2(cp1, cp2);
  }
  eat3(cp1, cp2, cp3) {
    return this._reader.eat3(cp1, cp2, cp3);
  }
  raise(message) {
    throw new RegExpSyntaxError(this.source, this._uFlag, this.index, message);
  }
  eatRegExpBody() {
    const start = this.index;
    let inClass = false;
    let escaped = false;
    for (; ; ) {
      const cp = this.currentCodePoint;
      if (cp === -1 || isLineTerminator(cp)) {
        const kind = inClass ? "character class" : "regular expression";
        this.raise(`Unterminated ${kind}`);
      }
      if (escaped) {
        escaped = false;
      } else if (cp === ReverseSolidus) {
        escaped = true;
      } else if (cp === LeftSquareBracket) {
        inClass = true;
      } else if (cp === RightSquareBracket) {
        inClass = false;
      } else if (cp === Solidus && !inClass || cp === Asterisk && this.index === start) {
        break;
      }
      this.advance();
    }
    return this.index !== start;
  }
  consumePattern() {
    const start = this.index;
    this._numCapturingParens = this.countCapturingParens();
    this._groupNames.clear();
    this._backreferenceNames.clear();
    this.onPatternEnter(start);
    this.consumeDisjunction();
    const cp = this.currentCodePoint;
    if (this.currentCodePoint !== -1) {
      if (cp === RightParenthesis) {
        this.raise("Unmatched ')'");
      }
      if (cp === ReverseSolidus) {
        this.raise("\\ at end of pattern");
      }
      if (cp === RightSquareBracket || cp === RightCurlyBracket) {
        this.raise("Lone quantifier brackets");
      }
      const c = String.fromCodePoint(cp);
      this.raise(`Unexpected character '${c}'`);
    }
    for (const name of this._backreferenceNames) {
      if (!this._groupNames.has(name)) {
        this.raise("Invalid named capture referenced");
      }
    }
    this.onPatternLeave(start, this.index);
  }
  countCapturingParens() {
    const start = this.index;
    let inClass = false;
    let escaped = false;
    let count = 0;
    let cp = 0;
    while ((cp = this.currentCodePoint) !== -1) {
      if (escaped) {
        escaped = false;
      } else if (cp === ReverseSolidus) {
        escaped = true;
      } else if (cp === LeftSquareBracket) {
        inClass = true;
      } else if (cp === RightSquareBracket) {
        inClass = false;
      } else if (cp === LeftParenthesis && !inClass && (this.nextCodePoint !== QuestionMark || this.nextCodePoint2 === LessThanSign && this.nextCodePoint3 !== EqualsSign && this.nextCodePoint3 !== ExclamationMark)) {
        count += 1;
      }
      this.advance();
    }
    this.rewind(start);
    return count;
  }
  consumeDisjunction() {
    const start = this.index;
    let i = 0;
    this.onDisjunctionEnter(start);
    do {
      this.consumeAlternative(i++);
    } while (this.eat(VerticalLine));
    if (this.consumeQuantifier(true)) {
      this.raise("Nothing to repeat");
    }
    if (this.eat(LeftCurlyBracket)) {
      this.raise("Lone quantifier brackets");
    }
    this.onDisjunctionLeave(start, this.index);
  }
  consumeAlternative(i) {
    const start = this.index;
    this.onAlternativeEnter(start, i);
    while (this.currentCodePoint !== -1 && this.consumeTerm()) {
    }
    this.onAlternativeLeave(start, this.index, i);
  }
  consumeTerm() {
    if (this._uFlag || this.strict) {
      return this.consumeAssertion() || this.consumeAtom() && this.consumeOptionalQuantifier();
    }
    return this.consumeAssertion() && (!this._lastAssertionIsQuantifiable || this.consumeOptionalQuantifier()) || this.consumeExtendedAtom() && this.consumeOptionalQuantifier();
  }
  consumeOptionalQuantifier() {
    this.consumeQuantifier();
    return true;
  }
  consumeAssertion() {
    const start = this.index;
    this._lastAssertionIsQuantifiable = false;
    if (this.eat(CircumflexAccent)) {
      this.onEdgeAssertion(start, this.index, "start");
      return true;
    }
    if (this.eat(DollarSign)) {
      this.onEdgeAssertion(start, this.index, "end");
      return true;
    }
    if (this.eat2(ReverseSolidus, LatinCapitalLetterB)) {
      this.onWordBoundaryAssertion(start, this.index, "word", true);
      return true;
    }
    if (this.eat2(ReverseSolidus, LatinSmallLetterB)) {
      this.onWordBoundaryAssertion(start, this.index, "word", false);
      return true;
    }
    if (this.eat2(LeftParenthesis, QuestionMark)) {
      const lookbehind = this.ecmaVersion >= 2018 && this.eat(LessThanSign);
      let negate = false;
      if (this.eat(EqualsSign) || (negate = this.eat(ExclamationMark))) {
        const kind = lookbehind ? "lookbehind" : "lookahead";
        this.onLookaroundAssertionEnter(start, kind, negate);
        this.consumeDisjunction();
        if (!this.eat(RightParenthesis)) {
          this.raise("Unterminated group");
        }
        this._lastAssertionIsQuantifiable = !lookbehind && !this.strict;
        this.onLookaroundAssertionLeave(start, this.index, kind, negate);
        return true;
      }
      this.rewind(start);
    }
    return false;
  }
  consumeQuantifier(noConsume = false) {
    const start = this.index;
    let min = 0;
    let max = 0;
    let greedy = false;
    if (this.eat(Asterisk)) {
      min = 0;
      max = Number.POSITIVE_INFINITY;
    } else if (this.eat(PlusSign)) {
      min = 1;
      max = Number.POSITIVE_INFINITY;
    } else if (this.eat(QuestionMark)) {
      min = 0;
      max = 1;
    } else if (this.eatBracedQuantifier(noConsume)) {
      min = this._lastMinValue;
      max = this._lastMaxValue;
    } else {
      return false;
    }
    greedy = !this.eat(QuestionMark);
    if (!noConsume) {
      this.onQuantifier(start, this.index, min, max, greedy);
    }
    return true;
  }
  eatBracedQuantifier(noError) {
    const start = this.index;
    if (this.eat(LeftCurlyBracket)) {
      this._lastMinValue = 0;
      this._lastMaxValue = Number.POSITIVE_INFINITY;
      if (this.eatDecimalDigits()) {
        this._lastMinValue = this._lastMaxValue = this._lastIntValue;
        if (this.eat(Comma)) {
          this._lastMaxValue = this.eatDecimalDigits() ? this._lastIntValue : Number.POSITIVE_INFINITY;
        }
        if (this.eat(RightCurlyBracket)) {
          if (!noError && this._lastMaxValue < this._lastMinValue) {
            this.raise("numbers out of order in {} quantifier");
          }
          return true;
        }
      }
      if (!noError && (this._uFlag || this.strict)) {
        this.raise("Incomplete quantifier");
      }
      this.rewind(start);
    }
    return false;
  }
  consumeAtom() {
    return this.consumePatternCharacter() || this.consumeDot() || this.consumeReverseSolidusAtomEscape() || this.consumeCharacterClass() || this.consumeUncapturingGroup() || this.consumeCapturingGroup();
  }
  consumeDot() {
    if (this.eat(FullStop)) {
      this.onAnyCharacterSet(this.index - 1, this.index, "any");
      return true;
    }
    return false;
  }
  consumeReverseSolidusAtomEscape() {
    const start = this.index;
    if (this.eat(ReverseSolidus)) {
      if (this.consumeAtomEscape()) {
        return true;
      }
      this.rewind(start);
    }
    return false;
  }
  consumeUncapturingGroup() {
    const start = this.index;
    if (this.eat3(LeftParenthesis, QuestionMark, Colon)) {
      this.onGroupEnter(start);
      this.consumeDisjunction();
      if (!this.eat(RightParenthesis)) {
        this.raise("Unterminated group");
      }
      this.onGroupLeave(start, this.index);
      return true;
    }
    return false;
  }
  consumeCapturingGroup() {
    const start = this.index;
    if (this.eat(LeftParenthesis)) {
      let name = null;
      if (this.ecmaVersion >= 2018) {
        if (this.consumeGroupSpecifier()) {
          name = this._lastStrValue;
        }
      } else if (this.currentCodePoint === QuestionMark) {
        this.raise("Invalid group");
      }
      this.onCapturingGroupEnter(start, name);
      this.consumeDisjunction();
      if (!this.eat(RightParenthesis)) {
        this.raise("Unterminated group");
      }
      this.onCapturingGroupLeave(start, this.index, name);
      return true;
    }
    return false;
  }
  consumeExtendedAtom() {
    return this.consumeDot() || this.consumeReverseSolidusAtomEscape() || this.consumeReverseSolidusFollowedByC() || this.consumeCharacterClass() || this.consumeUncapturingGroup() || this.consumeCapturingGroup() || this.consumeInvalidBracedQuantifier() || this.consumeExtendedPatternCharacter();
  }
  consumeReverseSolidusFollowedByC() {
    const start = this.index;
    if (this.currentCodePoint === ReverseSolidus && this.nextCodePoint === LatinSmallLetterC) {
      this._lastIntValue = this.currentCodePoint;
      this.advance();
      this.onCharacter(start, this.index, ReverseSolidus);
      return true;
    }
    return false;
  }
  consumeInvalidBracedQuantifier() {
    if (this.eatBracedQuantifier(true)) {
      this.raise("Nothing to repeat");
    }
    return false;
  }
  consumePatternCharacter() {
    const start = this.index;
    const cp = this.currentCodePoint;
    if (cp !== -1 && !isSyntaxCharacter(cp)) {
      this.advance();
      this.onCharacter(start, this.index, cp);
      return true;
    }
    return false;
  }
  consumeExtendedPatternCharacter() {
    const start = this.index;
    const cp = this.currentCodePoint;
    if (cp !== -1 && cp !== CircumflexAccent && cp !== DollarSign && cp !== ReverseSolidus && cp !== FullStop && cp !== Asterisk && cp !== PlusSign && cp !== QuestionMark && cp !== LeftParenthesis && cp !== RightParenthesis && cp !== LeftSquareBracket && cp !== VerticalLine) {
      this.advance();
      this.onCharacter(start, this.index, cp);
      return true;
    }
    return false;
  }
  consumeGroupSpecifier() {
    if (this.eat(QuestionMark)) {
      if (this.eatGroupName()) {
        if (!this._groupNames.has(this._lastStrValue)) {
          this._groupNames.add(this._lastStrValue);
          return true;
        }
        this.raise("Duplicate capture group name");
      }
      this.raise("Invalid group");
    }
    return false;
  }
  consumeAtomEscape() {
    if (this.consumeBackreference() || this.consumeCharacterClassEscape() || this.consumeCharacterEscape() || this._nFlag && this.consumeKGroupName()) {
      return true;
    }
    if (this.strict || this._uFlag) {
      this.raise("Invalid escape");
    }
    return false;
  }
  consumeBackreference() {
    const start = this.index;
    if (this.eatDecimalEscape()) {
      const n = this._lastIntValue;
      if (n <= this._numCapturingParens) {
        this.onBackreference(start - 1, this.index, n);
        return true;
      }
      if (this.strict || this._uFlag) {
        this.raise("Invalid escape");
      }
      this.rewind(start);
    }
    return false;
  }
  consumeCharacterClassEscape() {
    const start = this.index;
    if (this.eat(LatinSmallLetterD)) {
      this._lastIntValue = -1;
      this.onEscapeCharacterSet(start - 1, this.index, "digit", false);
      return true;
    }
    if (this.eat(LatinCapitalLetterD)) {
      this._lastIntValue = -1;
      this.onEscapeCharacterSet(start - 1, this.index, "digit", true);
      return true;
    }
    if (this.eat(LatinSmallLetterS)) {
      this._lastIntValue = -1;
      this.onEscapeCharacterSet(start - 1, this.index, "space", false);
      return true;
    }
    if (this.eat(LatinCapitalLetterS)) {
      this._lastIntValue = -1;
      this.onEscapeCharacterSet(start - 1, this.index, "space", true);
      return true;
    }
    if (this.eat(LatinSmallLetterW)) {
      this._lastIntValue = -1;
      this.onEscapeCharacterSet(start - 1, this.index, "word", false);
      return true;
    }
    if (this.eat(LatinCapitalLetterW)) {
      this._lastIntValue = -1;
      this.onEscapeCharacterSet(start - 1, this.index, "word", true);
      return true;
    }
    let negate = false;
    if (this._uFlag && this.ecmaVersion >= 2018 && (this.eat(LatinSmallLetterP) || (negate = this.eat(LatinCapitalLetterP)))) {
      this._lastIntValue = -1;
      if (this.eat(LeftCurlyBracket) && this.eatUnicodePropertyValueExpression() && this.eat(RightCurlyBracket)) {
        this.onUnicodePropertyCharacterSet(start - 1, this.index, "property", this._lastKeyValue, this._lastValValue || null, negate);
        return true;
      }
      this.raise("Invalid property name");
    }
    return false;
  }
  consumeCharacterEscape() {
    const start = this.index;
    if (this.eatControlEscape() || this.eatCControlLetter() || this.eatZero() || this.eatHexEscapeSequence() || this.eatRegExpUnicodeEscapeSequence() || !this.strict && !this._uFlag && this.eatLegacyOctalEscapeSequence() || this.eatIdentityEscape()) {
      this.onCharacter(start - 1, this.index, this._lastIntValue);
      return true;
    }
    return false;
  }
  consumeKGroupName() {
    const start = this.index;
    if (this.eat(LatinSmallLetterK)) {
      if (this.eatGroupName()) {
        const groupName = this._lastStrValue;
        this._backreferenceNames.add(groupName);
        this.onBackreference(start - 1, this.index, groupName);
        return true;
      }
      this.raise("Invalid named reference");
    }
    return false;
  }
  consumeCharacterClass() {
    const start = this.index;
    if (this.eat(LeftSquareBracket)) {
      const negate = this.eat(CircumflexAccent);
      this.onCharacterClassEnter(start, negate);
      this.consumeClassRanges();
      if (!this.eat(RightSquareBracket)) {
        this.raise("Unterminated character class");
      }
      this.onCharacterClassLeave(start, this.index, negate);
      return true;
    }
    return false;
  }
  consumeClassRanges() {
    const strict = this.strict || this._uFlag;
    for (; ; ) {
      const rangeStart = this.index;
      if (!this.consumeClassAtom()) {
        break;
      }
      const min = this._lastIntValue;
      if (!this.eat(HyphenMinus)) {
        continue;
      }
      this.onCharacter(this.index - 1, this.index, HyphenMinus);
      if (!this.consumeClassAtom()) {
        break;
      }
      const max = this._lastIntValue;
      if (min === -1 || max === -1) {
        if (strict) {
          this.raise("Invalid character class");
        }
        continue;
      }
      if (min > max) {
        this.raise("Range out of order in character class");
      }
      this.onCharacterClassRange(rangeStart, this.index, min, max);
    }
  }
  consumeClassAtom() {
    const start = this.index;
    const cp = this.currentCodePoint;
    if (cp !== -1 && cp !== ReverseSolidus && cp !== RightSquareBracket) {
      this.advance();
      this._lastIntValue = cp;
      this.onCharacter(start, this.index, this._lastIntValue);
      return true;
    }
    if (this.eat(ReverseSolidus)) {
      if (this.consumeClassEscape()) {
        return true;
      }
      if (!this.strict && this.currentCodePoint === LatinSmallLetterC) {
        this._lastIntValue = ReverseSolidus;
        this.onCharacter(start, this.index, this._lastIntValue);
        return true;
      }
      if (this.strict || this._uFlag) {
        this.raise("Invalid escape");
      }
      this.rewind(start);
    }
    return false;
  }
  consumeClassEscape() {
    const start = this.index;
    if (this.eat(LatinSmallLetterB)) {
      this._lastIntValue = Backspace;
      this.onCharacter(start - 1, this.index, this._lastIntValue);
      return true;
    }
    if (this._uFlag && this.eat(HyphenMinus)) {
      this._lastIntValue = HyphenMinus;
      this.onCharacter(start - 1, this.index, this._lastIntValue);
      return true;
    }
    let cp = 0;
    if (!this.strict && !this._uFlag && this.currentCodePoint === LatinSmallLetterC && (isDecimalDigit(cp = this.nextCodePoint) || cp === LowLine)) {
      this.advance();
      this.advance();
      this._lastIntValue = cp % 32;
      this.onCharacter(start - 1, this.index, this._lastIntValue);
      return true;
    }
    return this.consumeCharacterClassEscape() || this.consumeCharacterEscape();
  }
  eatGroupName() {
    if (this.eat(LessThanSign)) {
      if (this.eatRegExpIdentifierName() && this.eat(GreaterThanSign)) {
        return true;
      }
      this.raise("Invalid capture group name");
    }
    return false;
  }
  eatRegExpIdentifierName() {
    if (this.eatRegExpIdentifierStart()) {
      this._lastStrValue = String.fromCodePoint(this._lastIntValue);
      while (this.eatRegExpIdentifierPart()) {
        this._lastStrValue += String.fromCodePoint(this._lastIntValue);
      }
      return true;
    }
    return false;
  }
  eatRegExpIdentifierStart() {
    const start = this.index;
    const forceUFlag = !this._uFlag && this.ecmaVersion >= 2020;
    let cp = this.currentCodePoint;
    this.advance();
    if (cp === ReverseSolidus && this.eatRegExpUnicodeEscapeSequence(forceUFlag)) {
      cp = this._lastIntValue;
    } else if (forceUFlag && isLeadSurrogate(cp) && isTrailSurrogate(this.currentCodePoint)) {
      cp = combineSurrogatePair(cp, this.currentCodePoint);
      this.advance();
    }
    if (isRegExpIdentifierStart(cp)) {
      this._lastIntValue = cp;
      return true;
    }
    if (this.index !== start) {
      this.rewind(start);
    }
    return false;
  }
  eatRegExpIdentifierPart() {
    const start = this.index;
    const forceUFlag = !this._uFlag && this.ecmaVersion >= 2020;
    let cp = this.currentCodePoint;
    this.advance();
    if (cp === ReverseSolidus && this.eatRegExpUnicodeEscapeSequence(forceUFlag)) {
      cp = this._lastIntValue;
    } else if (forceUFlag && isLeadSurrogate(cp) && isTrailSurrogate(this.currentCodePoint)) {
      cp = combineSurrogatePair(cp, this.currentCodePoint);
      this.advance();
    }
    if (isRegExpIdentifierPart(cp)) {
      this._lastIntValue = cp;
      return true;
    }
    if (this.index !== start) {
      this.rewind(start);
    }
    return false;
  }
  eatCControlLetter() {
    const start = this.index;
    if (this.eat(LatinSmallLetterC)) {
      if (this.eatControlLetter()) {
        return true;
      }
      this.rewind(start);
    }
    return false;
  }
  eatZero() {
    if (this.currentCodePoint === DigitZero && !isDecimalDigit(this.nextCodePoint)) {
      this._lastIntValue = 0;
      this.advance();
      return true;
    }
    return false;
  }
  eatControlEscape() {
    if (this.eat(LatinSmallLetterF)) {
      this._lastIntValue = FormFeed;
      return true;
    }
    if (this.eat(LatinSmallLetterN)) {
      this._lastIntValue = LineFeed;
      return true;
    }
    if (this.eat(LatinSmallLetterR)) {
      this._lastIntValue = CarriageReturn;
      return true;
    }
    if (this.eat(LatinSmallLetterT)) {
      this._lastIntValue = CharacterTabulation;
      return true;
    }
    if (this.eat(LatinSmallLetterV)) {
      this._lastIntValue = LineTabulation;
      return true;
    }
    return false;
  }
  eatControlLetter() {
    const cp = this.currentCodePoint;
    if (isLatinLetter(cp)) {
      this.advance();
      this._lastIntValue = cp % 32;
      return true;
    }
    return false;
  }
  eatRegExpUnicodeEscapeSequence(forceUFlag = false) {
    const start = this.index;
    const uFlag = forceUFlag || this._uFlag;
    if (this.eat(LatinSmallLetterU)) {
      if (uFlag && this.eatRegExpUnicodeSurrogatePairEscape() || this.eatFixedHexDigits(4) || uFlag && this.eatRegExpUnicodeCodePointEscape()) {
        return true;
      }
      if (this.strict || uFlag) {
        this.raise("Invalid unicode escape");
      }
      this.rewind(start);
    }
    return false;
  }
  eatRegExpUnicodeSurrogatePairEscape() {
    const start = this.index;
    if (this.eatFixedHexDigits(4)) {
      const lead = this._lastIntValue;
      if (isLeadSurrogate(lead) && this.eat(ReverseSolidus) && this.eat(LatinSmallLetterU) && this.eatFixedHexDigits(4)) {
        const trail = this._lastIntValue;
        if (isTrailSurrogate(trail)) {
          this._lastIntValue = combineSurrogatePair(lead, trail);
          return true;
        }
      }
      this.rewind(start);
    }
    return false;
  }
  eatRegExpUnicodeCodePointEscape() {
    const start = this.index;
    if (this.eat(LeftCurlyBracket) && this.eatHexDigits() && this.eat(RightCurlyBracket) && isValidUnicode(this._lastIntValue)) {
      return true;
    }
    this.rewind(start);
    return false;
  }
  eatIdentityEscape() {
    const cp = this.currentCodePoint;
    if (this.isValidIdentityEscape(cp)) {
      this._lastIntValue = cp;
      this.advance();
      return true;
    }
    return false;
  }
  isValidIdentityEscape(cp) {
    if (cp === -1) {
      return false;
    }
    if (this._uFlag) {
      return isSyntaxCharacter(cp) || cp === Solidus;
    }
    if (this.strict) {
      return !isIdContinue(cp);
    }
    if (this._nFlag) {
      return !(cp === LatinSmallLetterC || cp === LatinSmallLetterK);
    }
    return cp !== LatinSmallLetterC;
  }
  eatDecimalEscape() {
    this._lastIntValue = 0;
    let cp = this.currentCodePoint;
    if (cp >= DigitOne && cp <= DigitNine) {
      do {
        this._lastIntValue = 10 * this._lastIntValue + (cp - DigitZero);
        this.advance();
      } while ((cp = this.currentCodePoint) >= DigitZero && cp <= DigitNine);
      return true;
    }
    return false;
  }
  eatUnicodePropertyValueExpression() {
    const start = this.index;
    if (this.eatUnicodePropertyName() && this.eat(EqualsSign)) {
      this._lastKeyValue = this._lastStrValue;
      if (this.eatUnicodePropertyValue()) {
        this._lastValValue = this._lastStrValue;
        if (isValidUnicodeProperty(this.ecmaVersion, this._lastKeyValue, this._lastValValue)) {
          return true;
        }
        this.raise("Invalid property name");
      }
    }
    this.rewind(start);
    if (this.eatLoneUnicodePropertyNameOrValue()) {
      const nameOrValue = this._lastStrValue;
      if (isValidUnicodeProperty(this.ecmaVersion, "General_Category", nameOrValue)) {
        this._lastKeyValue = "General_Category";
        this._lastValValue = nameOrValue;
        return true;
      }
      if (isValidLoneUnicodeProperty(this.ecmaVersion, nameOrValue)) {
        this._lastKeyValue = nameOrValue;
        this._lastValValue = "";
        return true;
      }
      this.raise("Invalid property name");
    }
    return false;
  }
  eatUnicodePropertyName() {
    this._lastStrValue = "";
    while (isUnicodePropertyNameCharacter(this.currentCodePoint)) {
      this._lastStrValue += String.fromCodePoint(this.currentCodePoint);
      this.advance();
    }
    return this._lastStrValue !== "";
  }
  eatUnicodePropertyValue() {
    this._lastStrValue = "";
    while (isUnicodePropertyValueCharacter(this.currentCodePoint)) {
      this._lastStrValue += String.fromCodePoint(this.currentCodePoint);
      this.advance();
    }
    return this._lastStrValue !== "";
  }
  eatLoneUnicodePropertyNameOrValue() {
    return this.eatUnicodePropertyValue();
  }
  eatHexEscapeSequence() {
    const start = this.index;
    if (this.eat(LatinSmallLetterX)) {
      if (this.eatFixedHexDigits(2)) {
        return true;
      }
      if (this._uFlag || this.strict) {
        this.raise("Invalid escape");
      }
      this.rewind(start);
    }
    return false;
  }
  eatDecimalDigits() {
    const start = this.index;
    this._lastIntValue = 0;
    while (isDecimalDigit(this.currentCodePoint)) {
      this._lastIntValue = 10 * this._lastIntValue + digitToInt(this.currentCodePoint);
      this.advance();
    }
    return this.index !== start;
  }
  eatHexDigits() {
    const start = this.index;
    this._lastIntValue = 0;
    while (isHexDigit(this.currentCodePoint)) {
      this._lastIntValue = 16 * this._lastIntValue + digitToInt(this.currentCodePoint);
      this.advance();
    }
    return this.index !== start;
  }
  eatLegacyOctalEscapeSequence() {
    if (this.eatOctalDigit()) {
      const n1 = this._lastIntValue;
      if (this.eatOctalDigit()) {
        const n2 = this._lastIntValue;
        if (n1 <= 3 && this.eatOctalDigit()) {
          this._lastIntValue = n1 * 64 + n2 * 8 + this._lastIntValue;
        } else {
          this._lastIntValue = n1 * 8 + n2;
        }
      } else {
        this._lastIntValue = n1;
      }
      return true;
    }
    return false;
  }
  eatOctalDigit() {
    const cp = this.currentCodePoint;
    if (isOctalDigit(cp)) {
      this.advance();
      this._lastIntValue = cp - DigitZero;
      return true;
    }
    this._lastIntValue = 0;
    return false;
  }
  eatFixedHexDigits(length) {
    const start = this.index;
    this._lastIntValue = 0;
    for (let i = 0; i < length; ++i) {
      const cp = this.currentCodePoint;
      if (!isHexDigit(cp)) {
        this.rewind(start);
        return false;
      }
      this._lastIntValue = 16 * this._lastIntValue + digitToInt(cp);
      this.advance();
    }
    return true;
  }
};
var DummyPattern = {};
var DummyFlags = {};
var DummyCapturingGroup = {};
var RegExpParserState = class {
  constructor(options) {
    this._node = DummyPattern;
    this._flags = DummyFlags;
    this._backreferences = [];
    this._capturingGroups = [];
    this.source = "";
    this.strict = Boolean(options && options.strict);
    this.ecmaVersion = options && options.ecmaVersion || 2022;
  }
  get pattern() {
    if (this._node.type !== "Pattern") {
      throw new Error("UnknownError");
    }
    return this._node;
  }
  get flags() {
    if (this._flags.type !== "Flags") {
      throw new Error("UnknownError");
    }
    return this._flags;
  }
  onFlags(start, end, global, ignoreCase, multiline, unicode, sticky, dotAll, hasIndices) {
    this._flags = {
      type: "Flags",
      parent: null,
      start,
      end,
      raw: this.source.slice(start, end),
      global,
      ignoreCase,
      multiline,
      unicode,
      sticky,
      dotAll,
      hasIndices
    };
  }
  onPatternEnter(start) {
    this._node = {
      type: "Pattern",
      parent: null,
      start,
      end: start,
      raw: "",
      alternatives: []
    };
    this._backreferences.length = 0;
    this._capturingGroups.length = 0;
  }
  onPatternLeave(start, end) {
    this._node.end = end;
    this._node.raw = this.source.slice(start, end);
    for (const reference of this._backreferences) {
      const ref = reference.ref;
      const group = typeof ref === "number" ? this._capturingGroups[ref - 1] : this._capturingGroups.find((g) => g.name === ref);
      reference.resolved = group;
      group.references.push(reference);
    }
  }
  onAlternativeEnter(start) {
    const parent = this._node;
    if (parent.type !== "Assertion" && parent.type !== "CapturingGroup" && parent.type !== "Group" && parent.type !== "Pattern") {
      throw new Error("UnknownError");
    }
    this._node = {
      type: "Alternative",
      parent,
      start,
      end: start,
      raw: "",
      elements: []
    };
    parent.alternatives.push(this._node);
  }
  onAlternativeLeave(start, end) {
    const node = this._node;
    if (node.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    node.end = end;
    node.raw = this.source.slice(start, end);
    this._node = node.parent;
  }
  onGroupEnter(start) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    this._node = {
      type: "Group",
      parent,
      start,
      end: start,
      raw: "",
      alternatives: []
    };
    parent.elements.push(this._node);
  }
  onGroupLeave(start, end) {
    const node = this._node;
    if (node.type !== "Group" || node.parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    node.end = end;
    node.raw = this.source.slice(start, end);
    this._node = node.parent;
  }
  onCapturingGroupEnter(start, name) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    this._node = {
      type: "CapturingGroup",
      parent,
      start,
      end: start,
      raw: "",
      name,
      alternatives: [],
      references: []
    };
    parent.elements.push(this._node);
    this._capturingGroups.push(this._node);
  }
  onCapturingGroupLeave(start, end) {
    const node = this._node;
    if (node.type !== "CapturingGroup" || node.parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    node.end = end;
    node.raw = this.source.slice(start, end);
    this._node = node.parent;
  }
  onQuantifier(start, end, min, max, greedy) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    const element = parent.elements.pop();
    if (element == null || element.type === "Quantifier" || element.type === "Assertion" && element.kind !== "lookahead") {
      throw new Error("UnknownError");
    }
    const node = {
      type: "Quantifier",
      parent,
      start: element.start,
      end,
      raw: this.source.slice(element.start, end),
      min,
      max,
      greedy,
      element
    };
    parent.elements.push(node);
    element.parent = node;
  }
  onLookaroundAssertionEnter(start, kind, negate) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    const node = this._node = {
      type: "Assertion",
      parent,
      start,
      end: start,
      raw: "",
      kind,
      negate,
      alternatives: []
    };
    parent.elements.push(node);
  }
  onLookaroundAssertionLeave(start, end) {
    const node = this._node;
    if (node.type !== "Assertion" || node.parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    node.end = end;
    node.raw = this.source.slice(start, end);
    this._node = node.parent;
  }
  onEdgeAssertion(start, end, kind) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    parent.elements.push({
      type: "Assertion",
      parent,
      start,
      end,
      raw: this.source.slice(start, end),
      kind
    });
  }
  onWordBoundaryAssertion(start, end, kind, negate) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    parent.elements.push({
      type: "Assertion",
      parent,
      start,
      end,
      raw: this.source.slice(start, end),
      kind,
      negate
    });
  }
  onAnyCharacterSet(start, end, kind) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    parent.elements.push({
      type: "CharacterSet",
      parent,
      start,
      end,
      raw: this.source.slice(start, end),
      kind
    });
  }
  onEscapeCharacterSet(start, end, kind, negate) {
    const parent = this._node;
    if (parent.type !== "Alternative" && parent.type !== "CharacterClass") {
      throw new Error("UnknownError");
    }
    parent.elements.push({
      type: "CharacterSet",
      parent,
      start,
      end,
      raw: this.source.slice(start, end),
      kind,
      negate
    });
  }
  onUnicodePropertyCharacterSet(start, end, kind, key, value, negate) {
    const parent = this._node;
    if (parent.type !== "Alternative" && parent.type !== "CharacterClass") {
      throw new Error("UnknownError");
    }
    parent.elements.push({
      type: "CharacterSet",
      parent,
      start,
      end,
      raw: this.source.slice(start, end),
      kind,
      key,
      value,
      negate
    });
  }
  onCharacter(start, end, value) {
    const parent = this._node;
    if (parent.type !== "Alternative" && parent.type !== "CharacterClass") {
      throw new Error("UnknownError");
    }
    parent.elements.push({
      type: "Character",
      parent,
      start,
      end,
      raw: this.source.slice(start, end),
      value
    });
  }
  onBackreference(start, end, ref) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    const node = {
      type: "Backreference",
      parent,
      start,
      end,
      raw: this.source.slice(start, end),
      ref,
      resolved: DummyCapturingGroup
    };
    parent.elements.push(node);
    this._backreferences.push(node);
  }
  onCharacterClassEnter(start, negate) {
    const parent = this._node;
    if (parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    this._node = {
      type: "CharacterClass",
      parent,
      start,
      end: start,
      raw: "",
      negate,
      elements: []
    };
    parent.elements.push(this._node);
  }
  onCharacterClassLeave(start, end) {
    const node = this._node;
    if (node.type !== "CharacterClass" || node.parent.type !== "Alternative") {
      throw new Error("UnknownError");
    }
    node.end = end;
    node.raw = this.source.slice(start, end);
    this._node = node.parent;
  }
  onCharacterClassRange(start, end) {
    const parent = this._node;
    if (parent.type !== "CharacterClass") {
      throw new Error("UnknownError");
    }
    const elements = parent.elements;
    const max = elements.pop();
    const hyphen = elements.pop();
    const min = elements.pop();
    if (!min || !max || !hyphen || min.type !== "Character" || max.type !== "Character" || hyphen.type !== "Character" || hyphen.value !== HyphenMinus) {
      throw new Error("UnknownError");
    }
    const node = {
      type: "CharacterClassRange",
      parent,
      start,
      end,
      raw: this.source.slice(start, end),
      min,
      max
    };
    min.parent = node;
    max.parent = node;
    elements.push(node);
  }
};
var RegExpParser = class {
  constructor(options) {
    this._state = new RegExpParserState(options);
    this._validator = new RegExpValidator(this._state);
  }
  parseLiteral(source, start = 0, end = source.length) {
    this._state.source = source;
    this._validator.validateLiteral(source, start, end);
    const pattern = this._state.pattern;
    const flags = this._state.flags;
    const literal = {
      type: "RegExpLiteral",
      parent: null,
      start,
      end,
      raw: source,
      pattern,
      flags
    };
    pattern.parent = literal;
    flags.parent = literal;
    return literal;
  }
  parseFlags(source, start = 0, end = source.length) {
    this._state.source = source;
    this._validator.validateFlags(source, start, end);
    return this._state.flags;
  }
  parsePattern(source, start = 0, end = source.length, uFlag = false) {
    this._state.source = source;
    this._validator.validatePattern(source, start, end, uFlag);
    return this._state.pattern;
  }
};
function parseRegExpLiteral(source, options) {
  return new RegExpParser(options).parseLiteral(String(source));
}

// parse.js
function parsePattern(patternBody, flagsStr = "") {
  try {
    const escaped = patternBody.replace(/\//g, "\\/");
    const literal = `/${escaped}/${flagsStr}`;
    const ast = parseRegExpLiteral(literal);
    return {
      ok: true,
      ast: ast.pattern,
      // Return just the Pattern node
      normalizedFlags: flagsStr
    };
  } catch (err) {
    return {
      ok: false,
      error: {
        message: err.message || "Invalid regular expression",
        index: err.index,
        column: err.column
      }
    };
  }
}

// explain.js
function explainPattern(ast, flags = "") {
  const explanation = {
    summary: [],
    components: [],
    constraints: []
  };
  if (!ast) return explanation;
  explanation.constraints = analyzeConstraints(ast, flags);
  const rootAlternatives = ast.type === "Pattern" ? ast.alternatives : [ast];
  explanation.components = analyzeAlternatives(rootAlternatives);
  explanation.summary = generateSummary(rootAlternatives, explanation.constraints, flags);
  return explanation;
}
function analyzeConstraints(ast, flags) {
  const c = [];
  const f = typeof flags === "string" ? flags : "";
  if (f.includes("g")) c.push("Global: matches all occurrences, not just the first.");
  if (f.includes("i")) c.push("Case-insensitive: ignores case differences.");
  if (f.includes("m")) c.push("Multi-line: ^ and $ match start/end of lines.");
  if (f.includes("s")) c.push("Dot-all: . matches newlines.");
  if (f.includes("u")) c.push("Unicode: treats pattern as a sequence of code points.");
  if (f.includes("y")) c.push("Sticky: matches only from the last index.");
  const firstAlt = ast.type === "Pattern" && ast.alternatives.length > 0 ? ast.alternatives[0] : null;
  if (firstAlt && firstAlt.elements && firstAlt.elements.length > 0) {
    const elements = firstAlt.elements;
    const first = elements[0];
    const last = elements[elements.length - 1];
    const isStart = first.type === "Assertion" && first.kind === "start";
    const isEnd = last.type === "Assertion" && last.kind === "end";
    if (isStart && isEnd) {
      c.push("Anchored: requires a full string (or line) match.");
    } else if (isStart) {
      c.push("Start-anchored: must match from the start.");
    } else if (isEnd) {
      c.push("End-anchored: must match at the end.");
    }
  }
  return c;
}
function analyzeAlternatives(alts) {
  if (!Array.isArray(alts) || alts.length === 0) return ["Empty pattern"];
  if (alts.length === 1) {
    return describeElements(alts[0].elements);
  }
  const lines = [];
  lines.push(`Matches one of ${alts.length} alternatives:`);
  alts.forEach((alt, idx) => {
    const desc = describeElements(alt.elements);
    const text = Array.isArray(desc) ? desc.join(", ") : desc;
    lines.push(`  ${idx + 1}. ${text || "Empty string"}`);
  });
  return lines;
}
function describeElements(elements) {
  if (!elements || elements.length === 0) return [];
  const descriptions = [];
  elements.forEach((node) => {
    const d = describeNode(node);
    if (d) descriptions.push(d);
  });
  return descriptions;
}
function describeNode(node) {
  if (!node) return "";
  switch (node.type) {
    case "Assertion":
      return describeAssertion(node);
    case "Quantifier":
      return describeQuantifier(node);
    case "Character":
      return `Literal "${formatChar(node.value)}"`;
    case "CharacterSet":
      return describeCharacterSet(node);
    case "CharacterClass":
      return describeCharacterClass(node);
    case "Group":
    case "CapturingGroup":
      return describeGroup(node);
    case "Backreference":
      return describeBackreference(node);
    default:
      return `Unknown component (${node.type})`;
  }
}
function describeAssertion(node) {
  switch (node.kind) {
    case "start":
      return "Start of string/line anchor";
    case "end":
      return "End of string/line anchor";
    case "word":
      return "Word boundary";
    case "non-word":
      return "Non-word boundary";
    case "lookahead":
      return `Positive lookahead (requires ${summarizeGroup(node)} to follow)`;
    case "lookbehind":
      return `Positive lookbehind (requires ${summarizeGroup(node)} to precede)`;
    case "negative-lookahead":
      return `Negative lookahead (ensures ${summarizeGroup(node)} does NOT follow)`;
    case "negative-lookbehind":
      return `Negative lookbehind (ensures ${summarizeGroup(node)} does NOT precede)`;
    default:
      return `Assertion (${node.kind})`;
  }
}
function describeCharacterSet(node) {
  if (node.negate) {
    if (node.kind === "digit") return "Any non-digit";
    if (node.kind === "word") return "Any non-word character";
    if (node.kind === "space") return "Any non-whitespace";
    if (node.kind === "property") return `Any character NOT in Unicode property ${node.value || node.key}`;
    return "Inverted character set";
  }
  if (node.kind === "digit") return "Any digit (0-9)";
  if (node.kind === "word") return "Any word character (a-z, A-Z, 0-9, _)";
  if (node.kind === "space") return "Any whitespace (space, tab, newline)";
  if (node.kind === "any" || node.kind === "dot") return "Any character (except newline unless 's' flag)";
  if (node.kind === "property") return `Character with Unicode property ${node.value || node.key}`;
  return "Character set";
}
function describeCharacterClass(node) {
  const parts = [];
  if (node.elements) {
    node.elements.forEach((el) => {
      if (el.type === "Character") parts.push(formatChar(el.value));
      else if (el.type === "CharacterClassRange") parts.push(`${formatChar(el.min.value)}-${formatChar(el.max.value)}`);
      else if (el.type === "CharacterSet") parts.push(describeCharacterSet(el));
    });
  }
  const content = parts.join(", ");
  return node.negate ? `Any character EXCEPT: [${content}]` : `One of the characters: [${content}]`;
}
function describeGroup(node) {
  const isCapturing = node.capturing || node.type === "CapturingGroup";
  const content = analyzeAlternatives(node.alternatives);
  let contentStr;
  if (Array.isArray(content) && content.length > 0) {
    if (content.length > 3) {
      contentStr = content.slice(0, 3).join(", ") + ", ...";
    } else {
      contentStr = content.join(", ");
    }
  } else {
    contentStr = "empty";
  }
  if (isCapturing) {
    const id = node.name ? `'${node.name}'` : `#${node.number || "?"}`;
    return `Capturing Group ${id}: matches ${contentStr}`;
  }
  return `Non-capturing group: matches ${contentStr}`;
}
function describeQuantifier(node) {
  const target = describeNode(node.element);
  const { min, max, greedy } = node;
  const greedyLabel = greedy === false ? " (lazy)" : "";
  const isUnlimited = max === null || max === Infinity;
  let range = "";
  if (min === 0 && max === 1) range = "optionally (0 or 1 time)";
  else if (min === 0 && isUnlimited) range = "zero or more times";
  else if (min === 1 && isUnlimited) range = "one or more times";
  else if (min === max) range = `exactly ${min} time${min === 1 ? "" : "s"}`;
  else range = `between ${min} and ${isUnlimited ? "unlimited" : max} times`;
  return `${target} \u2014 matches ${range}${greedyLabel}`;
}
function describeBackreference(node) {
  const ref = node.ref || node.reference;
  const refLabel = typeof ref === "string" ? `'${ref}'` : `#${ref || "?"}`;
  return `Backreference: matches the same text as Capturing Group ${refLabel}`;
}
function generateSummary(alts, constraints, flags) {
  const s = [];
  if (alts.length > 1) {
    s.push(`Matches any one of ${alts.length} alternative patterns.`);
  } else {
    s.push("Matches a specific sequence of characters.");
  }
  if (flags.includes("i")) s.push("The match is case-insensitive.");
  if (flags.includes("g")) s.push("Finds all matches in the text (Global).");
  return s;
}
function summarizeGroup(node) {
  if (!node.alternatives || node.alternatives.length === 0) return "nothing";
  const alt = node.alternatives[0];
  if (alt && alt.elements && alt.elements.length > 0) {
    if (alt.elements.length > 1) return "sequence";
    const type = alt.elements[0].type;
    if (type === "Character") return "literal";
    if (type === "CharacterSet") return "character set";
    if (type === "Group") return "group";
  }
  return "pattern";
}
function formatChar(val) {
  if (val === void 0 || val === null) return "";
  try {
    const s = String.fromCodePoint(val);
    const escapes = {
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\f": "\\f",
      "\v": "\\v",
      "\0": "\\0"
    };
    return escapes[s] || s;
  } catch (e) {
    return `(0x${val.toString(16)})`;
  }
}

// intentmap.js
var INTENT_CONFIDENCE_THRESHOLD = 0.6;
var INTENT_LABELS = {
  GENERAL: "General pattern",
  EMAIL_LIKE: "Email-like identifier",
  URL_LIKE: "URL-like string",
  UUID: "UUID / GUID",
  IPV4: "IPv4 address",
  IPV6: "IPv6 address",
  ISO_DATE: "ISO 8601 date",
  TIME_24H: "24-hour time",
  TIMESTAMP: "Timestamp (date + time)",
  SEMVER: "Semantic version (SemVer-like)",
  HEX: "Hex string",
  ALPHANUM_ID: "Alphanumeric identifier",
  LOG_LEVEL: "Log level token (INFO/WARN/ERROR...)",
  FILE_PATH: "File path (basic)",
  PHONE_LIKE: "Phone-like number (basic)"
};
function walk(node, fn) {
  const seen = /* @__PURE__ */ new Set();
  function _walk(n) {
    if (!n || typeof n !== "object") return;
    if (seen.has(n)) return;
    seen.add(n);
    fn(n);
    for (const key of Object.keys(n)) {
      // Avoid common cyclic/back-reference keys (regexpp nodes often contain parent links)
      if (key === "parent") continue;
      const v = n[key];
      if (Array.isArray(v)) v.forEach((c) => _walk(c));
      else if (v && typeof v === "object") _walk(v);
    }
  }
  _walk(node);
}
function extractFeatures(ast, flags) {
  const f = {
    hasStartAnchor: false,
    hasEndAnchor: false,
    hasWordBoundary: false,
    hasAlternation: false,
    groupCount: 0,
    namedGroupCount: 0,
    hasLookaround: false,
    usesAtSign: false,
    usesColon: false,
    usesSlash: false,
    usesDotLiteral: false,
    usesHyphenLiteral: false,
    usesUnderscoreLiteral: false,
    usesPlusLiteral: false,
    usesQuestionLiteral: false,
    usesDigitClass: false,
    usesHexClass: false,
    usesBraceQuantifier: false,
    containsExactCounts: [],
    containsUUIDHyphenPattern: false,
    containsSemverDots: false,
    containsIPv4DotStructure: false,
    containsIPv6ColonStructure: false,
    usesUnicodeProps: false
  };
  const rawPattern = ast?.raw;
  walk(ast, (n) => {
    if (n?.type === "Assertion" && n?.kind === "start") f.hasStartAnchor = true;
    if (n?.type === "Assertion" && n?.kind === "end") f.hasEndAnchor = true;
    if (n?.type === "Assertion" && n?.kind === "wordBoundary") f.hasWordBoundary = true;
    if (n?.type === "Assertion" && (n?.kind === "lookahead" || n?.kind === "lookbehind")) {
      f.hasLookaround = true;
    }
    if (n?.type === "Alternative" && n?.parent?.type === "AlternationExpression") f.hasAlternation = true;
    if (n?.type === "AlternationExpression") f.hasAlternation = true;
    if (n?.type === "CapturingGroup") {
      f.groupCount += 1;
      if (typeof n?.name === "string" && n.name.length) f.namedGroupCount += 1;
    }
    const raw = n?.raw;
    if (raw) {
      if (raw.includes("@")) f.usesAtSign = true;
      if (raw.includes(":")) f.usesColon = true;
      if (raw.includes("/")) f.usesSlash = true;
      if (raw.includes("\\.")) f.usesDotLiteral = true;
      if (raw.includes("-")) f.usesHyphenLiteral = true;
      if (raw.includes("_")) f.usesUnderscoreLiteral = true;
      if (raw.includes("+")) f.usesPlusLiteral = true;
      if (raw.includes("?")) f.usesQuestionLiteral = true;
      if (raw.includes("\\p{") || raw.includes("\\P{")) f.usesUnicodeProps = true;
    }
    if (raw === "\\d" || raw?.includes("\\d")) f.usesDigitClass = true;
    if (raw?.includes("[0-9]")) f.usesDigitClass = true;
    if (raw?.match(/\[0-9a-fA-F\]/)) f.usesHexClass = true;
    if (raw?.includes("\\p{Hex_Digit}")) f.usesHexClass = true;
    const q = n?.quantifier ?? (n?.type === "Quantifier" ? n : null);
    if (q) {
      f.usesBraceQuantifier = f.usesBraceQuantifier || q.min != null && (q.max != null || q.max == null);
      if (typeof q.min === "number" && typeof q.max === "number" && q.min === q.max) {
        f.containsExactCounts.push(q.min);
      }
    }
  });
  if (rawPattern) {
    if (rawPattern.match(/[0-9a-fA-F]{8}(-|\\-)[0-9a-fA-F]{4}(-|\\-)[0-9a-fA-F]{4}(-|\\-)[0-9a-fA-F]{4}(-|\\-)[0-9a-fA-F]{12}/)) {
      f.containsUUIDHyphenPattern = true;
    }
    if (rawPattern.match(/\d+\\?\.\d+\\?\.\d+/)) f.containsSemverDots = true;
    if (rawPattern.includes("\\.") && rawPattern.match(/\d\{1,3\}.*\\\..*\\\..*\\\./)) {
      f.containsIPv4DotStructure = true;
    }
    const colonCount = (rawPattern.match(/:/g) || []).length;
    if (colonCount >= 2) f.containsIPv6ColonStructure = true;
  }
  return f;
}
function clamp01(x) {
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}
function toConfidence(bestScore) {
  const c = 0.35 + bestScore / 100 * 0.6;
  return clamp01(Math.min(c, 0.9));
}
function scoreCandidates(f, flags) {
  const cands = [];
  {
    let score = 0;
    const r = [];
    if (f.usesAtSign) {
      score += 45;
      r.push("Contains '@'");
    }
    if (f.usesDotLiteral) {
      score += 15;
      r.push("Uses '.' (likely domain separator)");
    }
    if (f.hasStartAnchor && f.hasEndAnchor) {
      score += 10;
      r.push("Anchored to whole string");
    }
    if (f.usesWordBoundary) {
      score += 5;
      r.push("Uses word boundary");
    }
    if (f.hasAlternation) {
      score -= 5;
      r.push("Alternation reduces certainty");
    }
    cands.push({ label: INTENT_LABELS.EMAIL_LIKE, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.usesSlash) {
      score += 25;
      r.push("Contains '/'");
    }
    if (f.usesColon) {
      score += 25;
      r.push("Contains ':' (likely scheme/port)");
    }
    if (f.usesDotLiteral) {
      score += 10;
      r.push("Uses '.' (likely host/domain)");
    }
    if (f.hasStartAnchor) {
      score += 5;
      r.push("Has start anchor");
    }
    if (flags.i) {
      score += 3;
      r.push("Case-insensitive flag often used for URLs");
    }
    cands.push({ label: INTENT_LABELS.URL_LIKE, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.containsUUIDHyphenPattern) {
      score += 70;
      r.push("Matches UUID hyphen chunk structure");
    }
    if (f.usesHexClass) {
      score += 20;
      r.push("Uses hex character class");
    }
    if (f.containsExactCounts.includes(8) && f.containsExactCounts.includes(12)) {
      score += 10;
      r.push("Has exact chunk lengths common to UUIDs");
    }
    cands.push({ label: INTENT_LABELS.UUID, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.containsIPv4DotStructure) {
      score += 60;
      r.push("Has repeated dot-separated numeric structure");
    }
    if (f.usesDigitClass) {
      score += 10;
      r.push("Uses digit class");
    }
    if (f.usesBraceQuantifier) {
      score += 5;
      r.push("Uses numeric length quantifiers");
    }
    cands.push({ label: INTENT_LABELS.IPV4, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.containsIPv6ColonStructure) {
      score += 55;
      r.push("Contains multiple ':' separators");
    }
    if (f.usesHexClass) {
      score += 15;
      r.push("Uses hex character class");
    }
    cands.push({ label: INTENT_LABELS.IPV6, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.usesDigitClass) {
      score += 15;
      r.push("Uses digit class");
    }
    if (f.usesHyphenLiteral) {
      score += 20;
      r.push("Uses '-' separators");
    }
    if (f.containsExactCounts.includes(4) && f.containsExactCounts.includes(2)) {
      score += 25;
      r.push("Uses 4 and 2 digit chunk lengths");
    }
    if (f.hasStartAnchor && f.hasEndAnchor) {
      score += 5;
      r.push("Anchored to whole string");
    }
    cands.push({ label: INTENT_LABELS.ISO_DATE, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.usesColon) {
      score += 30;
      r.push("Uses ':' separators");
    }
    if (f.containsExactCounts.includes(2)) {
      score += 20;
      r.push("Uses 2-digit chunks");
    }
    if (f.usesDigitClass) {
      score += 10;
      r.push("Uses digit class");
    }
    cands.push({ label: INTENT_LABELS.TIME_24H, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.usesHyphenLiteral) {
      score += 15;
      r.push("Has '-' separators (date-like)");
    }
    if (f.usesColon) {
      score += 15;
      r.push("Has ':' separators (time-like)");
    }
    if (f.containsExactCounts.includes(4) && f.containsExactCounts.includes(2)) {
      score += 10;
      r.push("Has common date/time chunk lengths");
    }
    cands.push({ label: INTENT_LABELS.TIMESTAMP, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.containsSemverDots) {
      score += 65;
      r.push("Contains digit-dot-digit-dot-digit structure");
    }
    if (f.hasStartAnchor && f.hasEndAnchor) {
      score += 5;
      r.push("Anchored to whole string");
    }
    cands.push({ label: INTENT_LABELS.SEMVER, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.usesHexClass) {
      score += 55;
      r.push("Uses hex character class");
    }
    if (f.hasStartAnchor && f.hasEndAnchor) {
      score += 5;
      r.push("Anchored to whole string");
    }
    if (f.containsExactCounts.includes(32) || f.containsExactCounts.includes(40) || f.containsExactCounts.includes(64)) {
      score += 10;
      r.push("Uses common hex digest lengths (32/40/64)");
    }
    cands.push({ label: INTENT_LABELS.HEX, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.hasStartAnchor && f.hasEndAnchor) {
      score += 15;
      r.push("Anchored to whole string");
    }
    if (f.usesUnderscoreLiteral) {
      score += 5;
      r.push("Allows '_'");
    }
    if (f.usesBraceQuantifier) {
      score += 10;
      r.push("Has explicit length bounds");
    }
    if (f.hasWordBoundary) {
      score += 5;
      r.push("Uses word boundary");
    }
    cands.push({ label: INTENT_LABELS.ALPHANUM_ID, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.hasAlternation) {
      score += 15;
      r.push("Uses alternation (token choices)");
    }
    const raw = astRawFallbackFromFeatures(f);
    if (raw && raw.match(/\b(INFO|WARN|WARNING|ERROR|DEBUG|TRACE|FATAL)\b/)) {
      score += 60;
      r.push("Contains common log level words");
    }
    cands.push({ label: INTENT_LABELS.LOG_LEVEL, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.usesPlusLiteral) {
      score += 10;
      r.push("Allows '+' prefix");
    }
    if (f.usesDigitClass) {
      score += 15;
      r.push("Uses digit class");
    }
    if (f.usesHyphenLiteral) {
      score += 10;
      r.push("Allows '-' separators");
    }
    cands.push({ label: INTENT_LABELS.PHONE_LIKE, score, rationale: r });
  }
  {
    let score = 0;
    const r = [];
    if (f.usesSlash) {
      score += 25;
      r.push("Contains '/' separators");
    }
    if (f.usesDotLiteral) {
      score += 5;
      r.push("Uses '.' (extension-like)");
    }
    cands.push({ label: INTENT_LABELS.FILE_PATH, score, rationale: r });
  }
  return cands;
}
function astRawFallbackFromFeatures(_f) {
  return void 0;
}
function inferIntent(ast, flags) {
  const f = extractFeatures(ast, flags);
  const cands = scoreCandidates(f, flags).map((c) => ({ ...c, score: Math.max(0, Math.min(100, c.score)) })).sort((a, b) => b.score - a.score);
  const best = cands[0];
  const bestScore = best?.score ?? 0;
  const confidence = toConfidence(bestScore);
  if (!best || confidence < INTENT_CONFIDENCE_THRESHOLD) {
    return {
      label: INTENT_LABELS.GENERAL,
      confidence: Math.min(0.55, confidence || 0.5),
      rationale: ["No strong intent signals were detected."]
    };
  }
  const rationale = (best.rationale || []).slice(0, 3);
  if (rationale.length === 0) rationale.push("Matched common structural signals for this intent.");
  return {
    label: best.label,
    confidence,
    rationale
  };
}

// execute.js
var DEFAULT_GUARD = { maxMatches: 500 };
function executeRegex(pattern, flags, text, guard) {
  const results = [];
  if (!text) return { matches: [] };
  try {
    const re = new RegExp(pattern, flags);
    if (flags.includes("g")) {
      let match;
      let safety = 0;
      while ((match = re.exec(text)) !== null) {
        if (safety++ > guard.maxMatches) break;
        results.push(formatMatch(match));
        if (match.index === re.lastIndex) re.lastIndex++;
      }
    } else {
      const match = re.exec(text);
      if (match) results.push(formatMatch(match));
    }
  } catch (e) {
    console.error("Exec error", e);
  }
  return { matches: results };
}
function formatMatch(m) {
  return {
    matchIndex: 0,
    // Placeholder
    inputSpan: { start: m.index, end: m.index + m[0].length },
    matchText: m[0],
    line: { number: 1 },
    // Stub line number
    groups: []
    // Stub groups
  };
}

// risks.js
var RISK = {
  POTENTIAL_BACKTRACKING: "RISK_POTENTIAL_BACKTRACKING",
  NESTED_QUANTIFIERS: "RISK_NESTED_QUANTIFIERS",
  AMBIGUOUS_WILDCARD: "RISK_AMBIGUOUS_WILDCARD",
  UNANCHORED_MISMATCH: "RISK_UNANCHORED_MISMATCH",
  // corrected: only ^ XOR $
  DOTALL_EXPECTED: "RISK_DOTALL_EXPECTED",
  MULTILINE_ANCHOR_CONFUSION: "RISK_MULTILINE_ANCHOR_CONFUSION",
  EMPTY_ALTERNATION: "RISK_EMPTY_ALTERNATION",
  OVERBROAD_CLASS: "RISK_OVERBROAD_CLASS",
  REDUNDANT_QUANTIFIERS: "RISK_REDUNDANT_QUANTIFIERS",
  LOOKAROUND_COMPLEXITY: "RISK_LOOKAROUND_COMPLEXITY",
  STICKY_WITH_GLOBAL: "RISK_STICKY_WITH_GLOBAL",
  UNICODE_FLAG_MISMATCH: "RISK_UNICODE_FLAG_MISMATCH"
};
var T = {
  potentialBacktrackingTitle: "Potential performance risk",
  potentialBacktrackingMsg: "This pattern can take a long time on certain inputs (especially long non-matching strings). Treat this as a potential risk, not a guarantee.",
  nestedQuantifiersTitle: "Nested quantifiers",
  nestedQuantifiersMsg: "A quantified group contains another quantifier (example: (a+)+). This is a common cause of catastrophic backtracking.",
  ambiguousWildcardTitle: "Greedy wildcard may be too broad",
  ambiguousWildcardMsg: "A greedy wildcard like .* or .+ can swallow more than intended. Consider anchoring or narrowing the match.",
  unanchoredMismatchTitle: "Anchoring looks incomplete",
  unanchoredMismatchMsg: "This pattern has only one anchor (^ or $). If you intended a full-string match, you usually want both.",
  dotallExpectedTitle: "Dot does not match newlines",
  dotallExpectedMsg: "Your sample contains newlines, but '.' will stop at newline unless the 's' flag is set.",
  multilineAnchorConfusionTitle: "Multiline anchoring can surprise you",
  multilineAnchorConfusionMsg: "With the 'm' flag, ^ and $ match line boundaries, not just start/end of the whole text.",
  emptyAltTitle: "Empty alternative",
  emptyAltMsg: "An alternation contains an empty branch (example: a|). This may match unexpectedly.",
  overbroadClassTitle: "Over-broad character class",
  overbroadClassMsg: "A character class like [\\s\\S] or [\\d\\D] matches almost everything. That can be correct, but it often hides mistakes.",
  redundantQuantTitle: "Redundant quantifier",
  redundantQuantMsg: "Quantifiers like {0,} or {1,} are equivalent to * or +. This can reduce readability.",
  lookaroundComplexTitle: "Lookarounds increase complexity",
  lookaroundComplexMsg: "Lookaheads/lookbehinds can be correct, but they make the regex harder to reason about. Double-check edge cases.",
  stickyWithGlobalTitle: "Sticky + global flags",
  stickyWithGlobalMsg: "Using both 'y' (sticky) and 'g' (global) is unusual. Make sure you intended sticky matching behavior.",
  unicodeFlagMismatchTitle: "Unicode-related behavior",
  unicodeFlagMismatchMsg: "Unicode escapes/properties can behave differently depending on the 'u' flag. Verify the flag matches your intent."
};
function walk2(node, fn) {
  if (!node || typeof node !== "object") return;
  fn(node);
  for (const key of Object.keys(node)) {
    const v = node[key];
    if (Array.isArray(v)) v.forEach((c) => walk2(c, fn));
    else if (v && typeof v === "object") walk2(v, fn);
  }
}
function spanOf(node) {
  const start = typeof node?.start === "number" ? node.start : void 0;
  const end = typeof node?.end === "number" ? node.end : void 0;
  if (start == null || end == null) return void 0;
  return { start, end };
}
function isDot(n) {
  return n?.type === "CharacterSet" && n?.kind === "dot";
}
function isGreedyDotQuantified(node) {
  const el = node?.element ?? node;
  const q = node?.quantifier ?? null;
  if (!q) return false;
  if (!isDot(el)) return false;
  const greedy = q.greedy !== false;
  const min = typeof q.min === "number" ? q.min : 1;
  const max = q.max == null ? Infinity : q.max;
  const expands = max === Infinity || max > min;
  return greedy && expands;
}
function detectNestedQuantifiers(ast) {
  const spans = [];
  walk2(ast, (n) => {
    const hasQuant = n?.quantifier != null || n?.type === "Quantifier";
    if (!hasQuant) return;
    const target = n?.element ?? n?.target ?? null;
    if (!target) return;
    let innerHasQuant = false;
    walk2(target, (inner) => {
      if (inner !== n && (inner?.quantifier != null || inner?.type === "Quantifier")) innerHasQuant = true;
    });
    if (innerHasQuant) {
      const s = spanOf(n) || spanOf(target);
      if (s) spans.push(s);
    }
  });
  return spans.length ? spans : null;
}
function detectObviousBacktrackingShapes(ast) {
  const spans = [];
  walk2(ast, (n) => {
    const q = n?.quantifier;
    const target = n?.element ?? null;
    if (!q || !target) return;
    const greedy = q.greedy !== false;
    const maxInf = q.max == null;
    if (!(greedy && maxInf)) return;
    let innerDotQ = false;
    let innerAlt = false;
    let innerQuant = false;
    walk2(target, (inner) => {
      if (inner?.type === "AlternationExpression" || inner?.type === "Alternative") innerAlt = true;
      if (isGreedyDotQuantified(inner)) innerDotQ = true;
      if (inner !== n && (inner?.quantifier != null || inner?.type === "Quantifier")) innerQuant = true;
    });
    if (innerDotQ || innerAlt && innerQuant) {
      const s = spanOf(n) || spanOf(target);
      if (s) spans.push(s);
    }
  });
  return spans.length ? spans : null;
}
function detectAnchors(ast) {
  let hasStart = false;
  let hasEnd = false;
  walk2(ast, (n) => {
    if (n?.type === "Assertion" && n?.kind === "start") hasStart = true;
    if (n?.type === "Assertion" && n?.kind === "end") hasEnd = true;
  });
  return { hasStart, hasEnd };
}
function detectEmptyAlternation(ast) {
  const spans = [];
  walk2(ast, (n) => {
    if (n?.type === "Alternative" && Array.isArray(n.elements) && n.elements.length === 0) {
      const s = spanOf(n);
      if (s) spans.push(s);
    }
  });
  return spans.length ? spans : null;
}
function detectOverbroadClass(ast) {
  const spans = [];
  walk2(ast, (n) => {
    if (n?.type !== "CharacterClass") return;
    const raw = n?.raw;
    if (raw && (raw.includes("\\s\\S") || raw.includes("\\d\\D") || raw.includes("\\w\\W"))) {
      const s = spanOf(n);
      if (s) spans.push(s);
    }
  });
  return spans.length ? spans : null;
}
function detectRedundantQuantifiers(ast) {
  const spans = [];
  walk2(ast, (n) => {
    const q = n?.quantifier ?? (n?.type === "Quantifier" ? n : null);
    if (!q) return;
    const min = q.min;
    const max = q.max;
    if (min === 0 && max == null) spans.push(spanOf(n)).filter(Boolean);
    if (min === 1 && max == null) spans.push(spanOf(n)).filter(Boolean);
    if (min === 0 && max === 1) spans.push(spanOf(n)).filter(Boolean);
  });
  return spans.length ? spans.filter(Boolean) : null;
}
function detectLookarounds(ast) {
  const spans = [];
  walk2(ast, (n) => {
    if (n?.type === "Assertion" && (n.kind === "lookahead" || n.kind === "lookbehind")) {
      const s = spanOf(n);
      if (s) spans.push(s);
    }
  });
  return spans.length ? spans : null;
}
function detectMultilineAnchorConfusion(flags, hasAnchors) {
  return !!flags.m && hasAnchors;
}
function detectDotallExpected(ast, flags, sampleText) {
  if (flags.s) return false;
  if (!sampleText || sampleText.indexOf("\n") === -1) return false;
  let usesDot = false;
  walk2(ast, (n) => {
    if (isDot(n)) usesDot = true;
  });
  return usesDot;
}
function detectStickyWithGlobal(flags) {
  return !!flags.y && !!flags.g;
}
function detectUnicodeFlagMismatch(ast, flags) {
  let hasUnicodeProps = false;
  let hasUnicodeCodepoint = false;
  walk2(ast, (n) => {
    const raw = n?.raw;
    if (!raw) return;
    if (raw.includes("\\p{") || raw.includes("\\P{")) hasUnicodeProps = true;
    if (raw.includes("\\u{")) hasUnicodeCodepoint = true;
  });
  return !flags.u && (hasUnicodeProps || hasUnicodeCodepoint);
}
function dynamicBacktrackingProbe(pattern, flags) {
  const test = "a".repeat(28) + "X";
  const start = performance?.now ? performance.now() : Date.now();
  let re;
  try {
    const f = flags.replace("g", "");
    re = new RegExp(pattern, f);
  } catch {
    return null;
  }
  try {
    re.test(test);
  } catch {
    return null;
  }
  const end = performance?.now ? performance.now() : Date.now();
  const ms = end - start;
  if (ms > 40) {
    return { ms, note: `Slow probe: ${Math.round(ms)}ms on a short non-match test.` };
  }
  return null;
}
function detectRisks(ast, flags, sampleText, ctx) {
  const warnings = [];
  const { hasStart, hasEnd } = detectAnchors(ast);
  const isExtractionMode = !!flags.g;
  const nested = detectNestedQuantifiers(ast);
  if (nested) {
    warnings.push({
      id: RISK.NESTED_QUANTIFIERS,
      severity: "high",
      title: T.nestedQuantifiersTitle,
      message: T.nestedQuantifiersMsg,
      evidence: { patternSpans: nested }
    });
  }
  const backShapes = detectObviousBacktrackingShapes(ast);
  if (backShapes) {
    const examples = [];
    if (ctx?.pattern) {
      const probe = dynamicBacktrackingProbe(ctx.pattern, flagsToString(flags));
      if (probe) examples.push(probe.note);
    }
    warnings.push({
      id: RISK.POTENTIAL_BACKTRACKING,
      severity: nested ? "high" : "medium",
      title: T.potentialBacktrackingTitle,
      message: T.potentialBacktrackingMsg,
      evidence: { patternSpans: backShapes, examples: examples.length ? examples : void 0 }
    });
  }
  const dotSpans = [];
  walk2(ast, (n) => {
    if (isGreedyDotQuantified(n)) {
      const s = spanOf(n);
      if (s) dotSpans.push(s);
    }
  });
  if (dotSpans.length) {
    warnings.push({
      id: RISK.AMBIGUOUS_WILDCARD,
      severity: "medium",
      title: T.ambiguousWildcardTitle,
      message: T.ambiguousWildcardMsg,
      evidence: { patternSpans: dotSpans }
    });
  }
  if (!isExtractionMode && hasStart !== hasEnd) {
    warnings.push({
      id: RISK.UNANCHORED_MISMATCH,
      severity: "low",
      title: T.unanchoredMismatchTitle,
      message: T.unanchoredMismatchMsg,
      evidence: { patternSpans: spanOf(ast) ? [spanOf(ast)] : void 0 }
    });
  }
  if (detectDotallExpected(ast, flags, sampleText)) {
    warnings.push({
      id: RISK.DOTALL_EXPECTED,
      severity: "low",
      title: T.dotallExpectedTitle,
      message: T.dotallExpectedMsg
    });
  }
  if (detectMultilineAnchorConfusion(flags, hasStart || hasEnd)) {
    warnings.push({
      id: RISK.MULTILINE_ANCHOR_CONFUSION,
      severity: "info",
      title: T.multilineAnchorConfusionTitle,
      message: T.multilineAnchorConfusionMsg
    });
  }
  const emptyAlt = detectEmptyAlternation(ast);
  if (emptyAlt) {
    warnings.push({
      id: RISK.EMPTY_ALTERNATION,
      severity: "medium",
      title: T.emptyAltTitle,
      message: T.emptyAltMsg,
      evidence: { patternSpans: emptyAlt }
    });
  }
  const overbroad = detectOverbroadClass(ast);
  if (overbroad) {
    warnings.push({
      id: RISK.OVERBROAD_CLASS,
      severity: "info",
      title: T.overbroadClassTitle,
      message: T.overbroadClassMsg,
      evidence: { patternSpans: overbroad }
    });
  }
  const redundant = detectRedundantQuantifiers(ast);
  if (redundant) {
    warnings.push({
      id: RISK.REDUNDANT_QUANTIFIERS,
      severity: "info",
      title: T.redundantQuantTitle,
      message: T.redundantQuantMsg,
      evidence: { patternSpans: redundant }
    });
  }
  const look = detectLookarounds(ast);
  if (look) {
    warnings.push({
      id: RISK.LOOKAROUND_COMPLEXITY,
      severity: "info",
      title: T.lookaroundComplexTitle,
      message: T.lookaroundComplexMsg,
      evidence: { patternSpans: look }
    });
  }
  if (detectStickyWithGlobal(flags)) {
    warnings.push({
      id: RISK.STICKY_WITH_GLOBAL,
      severity: "info",
      title: T.stickyWithGlobalTitle,
      message: T.stickyWithGlobalMsg
    });
  }
  if (detectUnicodeFlagMismatch(ast, flags)) {
    warnings.push({
      id: RISK.UNICODE_FLAG_MISMATCH,
      severity: "low",
      title: T.unicodeFlagMismatchTitle,
      message: T.unicodeFlagMismatchMsg
    });
  }
  return warnings;
}

// fpfnrules.js
var FP_FN_LIMIT = 6;
function estimateFalsePosNeg({ ast, pattern, flagsStr, sampleText, matches, guard }) {
  const limits = {
    maxCandidates: guard?.maxCandidates ?? 250,
    maxLineLen: guard?.maxLineLen ?? 500,
    maxTotalWork: guard?.maxTotalWork ?? 2e3
    // total regex exec attempts
  };
  const re = safeCompile(pattern, flagsStr.replace("g", ""));
  if (!re.ok) {
    return {
      likelyFalsePositives: [],
      likelyFalseNegatives: [],
      notes: ["Cannot estimate false positives/negatives because the regex did not compile."]
    };
  }
  const lines = sampleText.split(/\r?\n/).slice(0, 5e3).map((l) => l.length > limits.maxLineLen ? l.slice(0, limits.maxLineLen) : l);
  const matchedLineNums = new Set(matches.map((m) => m.line.number));
  const matchedLines = [];
  const unmatchedLines = [];
  for (let i = 0; i < lines.length; i++) {
    const lineNo = i + 1;
    const line = lines[i];
    if (!line) continue;
    if (matchedLineNums.has(lineNo)) matchedLines.push(line);
    else unmatchedLines.push(line);
  }
  if (matches.length === 0) {
    return {
      likelyFalsePositives: [],
      likelyFalseNegatives: [],
      notes: [
        "No matches were found in the sample text, so the tool cannot infer likely false positives/negatives.",
        "Tip: paste a sample that includes at least one expected match."
      ]
    };
  }
  const work = { used: 0 };
  const positives = [];
  const negatives = [];
  const negSeeds = sampleSeedsFromMatches(sampleText, matches, limits.maxCandidates);
  for (const seed of negSeeds) {
    if (negatives.length >= FP_FN_LIMIT) break;
    const variants = generateShouldStillMatchVariants(seed, ast);
    for (const v of variants) {
      if (negatives.length >= FP_FN_LIMIT) break;
      if (work.used >= limits.maxTotalWork) break;
      const m = testMatch(re.value, v);
      work.used++;
      if (!m) {
        negatives.push({
          text: v,
          reason: "Small variation of a known match did not match (may be too strict)."
        });
      }
    }
    if (work.used >= limits.maxTotalWork) break;
  }
  for (const seed of negSeeds) {
    if (positives.length >= FP_FN_LIMIT) break;
    const variants = generateShouldNotMatchButMightVariants(seed, ast);
    for (const v of variants) {
      if (positives.length >= FP_FN_LIMIT) break;
      if (work.used >= limits.maxTotalWork) break;
      const m = testMatch(re.value, v);
      work.used++;
      if (m) {
        positives.push({
          text: v,
          reason: "A suspicious-looking variation still matched (may be too broad)."
        });
      }
    }
    if (work.used >= limits.maxTotalWork) break;
  }
  const dedupe = (arr) => {
    const seen = /* @__PURE__ */ new Set();
    return arr.filter((x) => {
      const key = x.text;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  return {
    likelyFalsePositives: dedupe(positives).slice(0, FP_FN_LIMIT),
    likelyFalseNegatives: dedupe(negatives).slice(0, FP_FN_LIMIT),
    notes: [
      "These are heuristic examples based on your sample text. Treat them as likely cases, not proof.",
      work.used >= limits.maxTotalWork ? "Estimation was capped to avoid slowdowns." : ""
    ].filter(Boolean)
  };
}
function safeCompile(pattern, flagsStr) {
  try {
    return { ok: true, value: new RegExp(pattern, flagsStr) };
  } catch (e) {
    return { ok: false, error: { message: String(e?.message || e) } };
  }
}
function testMatch(re, str) {
  try {
    return re.test(str);
  } catch {
    return false;
  }
}
function sampleSeedsFromMatches(sampleText, matches, maxCandidates) {
  const seeds = [];
  const push = (s) => {
    if (!s) return;
    if (s.length > 300) s = s.slice(0, 300);
    seeds.push(s);
  };
  for (const m of matches) {
    if (seeds.length >= maxCandidates) break;
    push(m.matchText);
    if (m.groups && m.groups.length) {
      for (const g of m.groups) {
        if (seeds.length >= maxCandidates) break;
        if (g.value && g.value.length >= 2) push(g.value);
      }
    }
  }
  const seen = /* @__PURE__ */ new Set();
  return seeds.filter((s) => {
    if (seen.has(s)) return false;
    seen.add(s);
    return true;
  }).slice(0, Math.min(40, maxCandidates));
}
function generateShouldStillMatchVariants(seed, ast) {
  const v = [];
  const F = extractFpfnFeatures(ast);
  if (F.allowsWhitespace) {
    v.push(" " + seed);
    v.push(seed + " ");
    v.push(seed.replace(/ /g, "  "));
  }
  if (/[A-Za-z]/.test(seed)) {
    v.push(seed.toUpperCase());
    v.push(seed.toLowerCase());
    v.push(toggleCase(seed));
  }
  if (F.hasHyphenLike) v.push(seed.replace(/-/g, "_"));
  if (F.hasDotLike) v.push(seed.replace(/\./g, "-"));
  if (F.hasColonLike) v.push(seed.replace(/:/g, "-"));
  if (seed.length >= 3) {
    v.push(seed.slice(0, -1));
    v.push(seed + seed.slice(-1));
  }
  return uniqueLimited(v, 8);
}
function generateShouldNotMatchButMightVariants(seed, ast) {
  const v = [];
  const F = extractFpfnFeatures(ast);
  v.push(seed + " ");
  v.push(seed + "	");
  v.push(seed + "\u2705");
  if (F.usesDigits) {
    v.push(seed.replace(/\d/, "A"));
    v.push(seed + "A");
  }
  if (F.usesWordChars) {
    v.push(seed + "!");
    v.push(seed.replace(/[A-Za-z]/, "!"));
  }
  if (F.hasDotLike) v.push(seed.replace(/\./g, ".."));
  if (F.hasHyphenLike) v.push(seed.replace(/-/g, "--"));
  if (F.hasColonLike) v.push(seed.replace(/:/g, "::"));
  if (!F.isAnchored) {
    v.push("xxx" + seed + "yyy");
    v.push("{" + seed + "}");
  }
  return uniqueLimited(v, 10);
}
function uniqueLimited(arr, limit) {
  const out = [];
  const seen = /* @__PURE__ */ new Set();
  for (const s of arr) {
    if (!s) continue;
    if (seen.has(s)) continue;
    seen.add(s);
    out.push(s);
    if (out.length >= limit) break;
  }
  return out;
}
function toggleCase(s) {
  let out = "";
  for (const ch of s) {
    const up = ch.toUpperCase();
    const lo = ch.toLowerCase();
    out += ch === up ? lo : up;
  }
  return out;
}
function extractFpfnFeatures(ast) {
  const F = {
    usesDigits: false,
    usesWordChars: false,
    allowsWhitespace: false,
    hasDotLike: false,
    hasHyphenLike: false,
    hasColonLike: false,
    isAnchored: false
  };
  let hasStart = false;
  let hasEnd = false;
  walk3(ast, (n) => {
    const raw = n?.raw || "";
    if (n?.type === "Assertion" && n?.kind === "start") hasStart = true;
    if (n?.type === "Assertion" && n?.kind === "end") hasEnd = true;
    if (raw.includes("\\d") || raw.includes("[0-9]")) F.usesDigits = true;
    if (raw.includes("\\w")) F.usesWordChars = true;
    if (raw.includes("\\s") || raw.includes("[ \\t]")) F.allowsWhitespace = true;
    if (raw.includes("\\.")) F.hasDotLike = true;
    if (raw.includes("-")) F.hasHyphenLike = true;
    if (raw.includes(":")) F.hasColonLike = true;
  });
  F.isAnchored = hasStart && hasEnd;
  return F;
}
function walk3(node, fn) {
  const seen = /* @__PURE__ */ new Set();
  function _walk(n) {
    if (!n || typeof n !== "object") return;
    if (seen.has(n)) return;
    seen.add(n);
    fn(n);
    for (const k of Object.keys(n)) {
      if (k === "parent") continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach((c) => _walk(c));
      else if (v && typeof v === "object") _walk(v);
    }
  }
  _walk(node);
}

// ui.js
var debounceTimer = null;
var BUILD_TARGET = "web";
var WEB_LOCKED_MODE = "FREE";
var currentMode = WEB_LOCKED_MODE;
var dom = {
  inputPattern: document.getElementById("input-pattern"),
  inputSample: document.getElementById("input-sample"),
  btnRun: document.getElementById("btn-run"),
  btnMode: document.getElementById("btn-mode"),
  // Flags
  flagG: document.getElementById("flag-g"),
  flagI: document.getElementById("flag-i"),
  flagM: document.getElementById("flag-m"),
  flagS: document.getElementById("flag-s"),
  flagU: document.getElementById("flag-u"),
  flagY: document.getElementById("flag-y"),
  // Outputs
  statusCompiled: document.getElementById("status-compiled"),
  statusMatches: document.getElementById("status-matches"),
  statusPerf: document.getElementById("status-perf"),
  outputExplanation: document.getElementById("output-explanation"),
  outputPreview: document.getElementById("output-preview"),
  outputWarnings: document.getElementById("output-warnings"),
  outputIntent: document.getElementById("output-intent"),
  // Overlays
  overlayRisks: document.getElementById("overlay-risks")
};
function init() {
  enforceWebModeLock();
  attachListeners();
  if (dom.inputPattern && dom.inputPattern.value) {
    runAnalysis();
  }
}
function enforceWebModeLock() {
  if (BUILD_TARGET !== "web") return;
  currentMode = WEB_LOCKED_MODE;
  if (dom.btnMode) {
    dom.btnMode.textContent = WEB_LOCKED_MODE;
    dom.btnMode.disabled = true;
    dom.btnMode.setAttribute("title", "Offline Pro unlocks PAID features");
    dom.btnMode.setAttribute("aria-label", "FREE mode locked on web build");
  }
}
function attachListeners() {
  const inputs = [
    dom.inputPattern,
    dom.inputSample,
    dom.flagG,
    dom.flagI,
    dom.flagM,
    dom.flagS,
    dom.flagU,
    dom.flagY
  ];
  inputs.forEach((el) => {
    if (el) {
      if (el.tagName === "INPUT" && (el.type === "text" || el.type === "textarea")) {
        el.addEventListener("input", handleInput);
      } else if (el.tagName === "TEXTAREA") {
        el.addEventListener("input", handleInput);
      } else if (el.tagName === "INPUT" && el.type === "checkbox") {
        el.addEventListener("change", handleInput);
      } else {
        el.addEventListener("click", handleInput);
      }
    }
  });
  if (dom.btnRun) {
    dom.btnRun.addEventListener("click", () => {
      clearTimeout(debounceTimer);
      runAnalysis();
    });
  }
  if (dom.btnMode) {
    dom.btnMode.addEventListener("click", () => {
      if (BUILD_TARGET === "web") {
        currentMode = WEB_LOCKED_MODE;
        return;
      }
      currentMode = currentMode === "FREE" ? "PAID" : "FREE";
      dom.btnMode.textContent = `Mode ${currentMode}`;
      runAnalysis();
    });
  }
}
function handleInput() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(runAnalysis, 350);
}
function runAnalysis() {
  const patternRaw = dom.inputPattern ? dom.inputPattern.value : "";
  const sampleText = dom.inputSample ? dom.inputSample.value : "";
  const flagsObj = getFlags();
  const flagsStr = ["g", "i", "m", "s", "u", "y"].filter((k) => flagsObj[k]).join("");
  const patternBody = normalizePatternInput(patternRaw);
  resetOutputs();
  const parseResult = parsePattern(patternBody, flagsStr);
  if (!parseResult.ok) {
    renderError(parseResult.error);
    return;
  }
  const ast = parseResult.ast;
  renderStatus("Compiled OK", "success");
  const intent = inferIntent(ast, flagsObj);
  renderIntent(intent);
  const explanation = explainPattern(ast, flagsStr);
  renderExplanation(explanation);
  let matchRecords = [];
  if (sampleText.length > 0) {
    const execResult = executeRegex(patternBody, flagsStr, sampleText, DEFAULT_GUARD);
    matchRecords = execResult.matches || [];
    renderMatches(matchRecords, sampleText);
    if (matchRecords.length > 0) {
      if (dom.statusMatches) {
        dom.statusMatches.textContent = `Matches ${matchRecords.length}`;
        dom.statusMatches.className = "pill success";
      }
    } else {
      if (dom.statusMatches) {
        dom.statusMatches.textContent = "No matches";
        dom.statusMatches.className = "pill neutral";
      }
    }
  } else {
    if (dom.statusMatches) {
      dom.statusMatches.textContent = "No sample";
      dom.statusMatches.className = "pill hidden";
    }
    if (dom.outputPreview) {
      dom.outputPreview.innerHTML = "<span class='placeholder'>Enter sample text to see matches...</span>";
    }
  }
  const paidModeEnabled = BUILD_TARGET !== "web" && currentMode === "PAID";
  if (paidModeEnabled) {
    if (dom.overlayRisks) dom.overlayRisks.style.display = "none";
    const risks = detectRisks(ast, flagsObj, sampleText, { pattern: patternBody });
    let fpfnNotes = [];
    if (sampleText.length > 0 && matchRecords.length > 0) {
      const fpfn = estimateFalsePosNeg({
        ast,
        pattern: patternBody,
        flagsStr,
        sampleText,
        matches: matchRecords,
        guard: { maxCandidates: 50, maxLineLen: 200, maxTotalWork: 500 }
      });
      if (fpfn.likelyFalsePositives.length || fpfn.likelyFalseNegatives.length) {
        fpfnNotes = [...fpfn.likelyFalsePositives, ...fpfn.likelyFalseNegatives];
      }
    }
    renderRisksAndFpFn(risks, fpfnNotes);
  } else {
    if (dom.overlayRisks) dom.overlayRisks.style.display = "flex";
    renderLockedRisks();
  }
}
function getFlags() {
  return {
    g: dom.flagG ? dom.flagG.checked : false,
    i: dom.flagI ? dom.flagI.checked : false,
    m: dom.flagM ? dom.flagM.checked : false,
    s: dom.flagS ? dom.flagS.checked : false,
    u: dom.flagU ? dom.flagU.checked : false,
    y: dom.flagY ? dom.flagY.checked : false
  };
}
function resetOutputs() {
  if (dom.outputExplanation) dom.outputExplanation.innerHTML = "";
  if (dom.outputPreview) dom.outputPreview.innerHTML = "";
  if (dom.outputWarnings) dom.outputWarnings.innerHTML = "";
  if (dom.outputIntent) dom.outputIntent.innerHTML = "";
  if (dom.statusCompiled) {
    dom.statusCompiled.textContent = "Waiting...";
    dom.statusCompiled.className = "pill neutral";
  }
  if (dom.statusMatches) dom.statusMatches.className = "pill hidden";
}
function renderStatus(msg, type) {
  if (!dom.statusCompiled) return;
  dom.statusCompiled.textContent = msg;
  dom.statusCompiled.className = `pill ${type}`;
}
function renderError(err) {
  renderStatus("Error", "error");
  if (dom.outputExplanation) {
    dom.outputExplanation.innerHTML = `<div class="error-msg">Parse Error: ${escapeHtml(err.message)}</div>`;
  }
}
function renderExplanation(exp) {
  if (!dom.outputExplanation) return;
  let html = `<div class="exp-section"><strong>Summary:</strong><ul>`;
  exp.summary.forEach((s) => html += `<li>${escapeHtml(s)}</li>`);
  html += `</ul></div>`;
  html += `<div class="exp-section"><strong>Components:</strong><ul>`;
  exp.components.forEach((c) => html += `<li>${escapeHtml(c)}</li>`);
  html += `</ul></div>`;
  if (exp.constraints.length) {
    html += `<div class="exp-section"><strong>Constraints:</strong><ul>`;
    exp.constraints.forEach((c) => html += `<li>${escapeHtml(c)}</li>`);
    html += `</ul></div>`;
  }
  dom.outputExplanation.innerHTML = html;
}
function renderIntent(intent) {
  if (!dom.outputIntent) return;
  if (!intent || !intent.label) return;
  let html = `<h4>${escapeHtml(intent.label)}</h4>`;
  if (intent.rationale && intent.rationale.length) {
    html += `<p>${intent.rationale.map(escapeHtml).join(". ")}</p>`;
  }
  dom.outputIntent.innerHTML = html;
}
function renderMatches(matches, originalText) {
  if (!dom.outputPreview) return;
  const renderLimit = 200;
  const displayMatches = matches.slice(0, renderLimit);
  let html = "";
  let lastIdx = 0;
  displayMatches.forEach((m) => {
    const start = Math.max(0, m.inputSpan.start);
    const end = Math.min(originalText.length, m.inputSpan.end);
    if (start >= lastIdx) {
      html += escapeHtml(originalText.slice(lastIdx, start));
      html += `<span class="highlight">${escapeHtml(originalText.slice(start, end))}</span>`;
      lastIdx = end;
    }
  });
  html += escapeHtml(originalText.slice(lastIdx));
  if (matches.length > renderLimit) {
    html += `<div class="limit-msg">... ${matches.length - renderLimit} more matches hidden.</div>`;
  }
  dom.outputPreview.innerHTML = html;
}
function renderRisksAndFpFn(risks, fpfnItems) {
  if (!dom.outputWarnings) return;
  if (risks.length === 0 && fpfnItems.length === 0) {
    dom.outputWarnings.innerHTML = "<div class='safe-msg'>No obvious risks detected.</div>";
    return;
  }
  let html = "";
  risks.forEach((r) => {
    html += `<div class="warning-card ${r.severity}">
      <strong>${escapeHtml(r.title)}</strong>
      <p>${escapeHtml(r.message)}</p>
    </div>`;
  });
  if (fpfnItems.length > 0) {
    html += `<div class="warning-card info"><strong>Heuristic Edge Cases</strong><ul>`;
    fpfnItems.slice(0, 5).forEach((item) => {
      html += `<li>${escapeHtml(item.text)}: ${escapeHtml(item.reason)}</li>`;
    });
    html += `</ul></div>`;
  }
  dom.outputWarnings.innerHTML = html;
}
function renderLockedRisks() {
  if (!dom.outputWarnings) return;
  dom.outputWarnings.innerHTML = `
    <div class="locked-placeholder">
      <strong>Risks & Edge Cases</strong>
      <p>Upgrade to see security risks, backtracking warnings, and likely false positives.</p>
    </div>`;
}
function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// main.js
console.log("MAIN.JS: running", (/* @__PURE__ */ new Date()).toISOString());
init();
console.log("MAIN.JS: after init()");
/*! Bundled license information:

regexpp/index.mjs:
  (*! @author Toru Nagashima <https://github.com/mysticatea> *)
*/
