const SETTINGS_FILE = "daisy.json";
require('DateExt');
const h = g.getHeight();
const w = g.getWidth();
let settings;
let queueMillis = 1000;
let secondsScreen = true;
let batt = 100;

let size = 5;

let pal1; // outer ring palette for 0-40%
let pal2; // outer ring palette for 50-100%
let pal3; // inner ring palette for 0-40%
let pal4; // inner ring palette for 50-100%
const infoLine = (3*h/4) - 22;

// https://www.1001fonts.com/rounded-fonts.html?page=3
Graphics.prototype.setFontBloggerSansLight46 = function(scale) {
  // Actual height 46 (45 - 0)
  this.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAA/AAAAAAAAPwAAAAAAAD4AAAAAAAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAH/gAAAAAAP/wAAAAAAf/gAAAAAAf/AAAAAAA//AAAAAAB/+AAAAAAD/8AAAAAAH/4AAAAAAH/wAAAAAAP/gAAAAAAf/gAAAAAA//AAAAAAB/+AAAAAAA/8AAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///8AAAAP////4AAAP/////AAAH/////4AAD+AAAB/AAA8AAAAHwAAeAAAAA+AAHgAAAAHgADwAAAAB4AA8AAAAAPAAPAAAAADwADwAAAAA8AA8AAAAAPAAPAAAAADwAB4AAAAB4AAeAAAAAeAAHwAAAAPgAA/AAAAPwAAH/////4AAA/////8AAAH////+AAAAf///+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAPAAAAAAAAHwAAAAAAAB4AAAAAAAA+AAAAAAAAfAAAAAAAAHgAAAAAAAD4AAAAAAAB8AAAAAAAAeAAAAAAAAPgAAAAAAADwAAAAAAAB//////4AAf//////AAH//////gAA//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAD4AAHAAAAD+AAD4AAAB/gAA8AAAB/4AAfAAAA/+AAHgAAAf3gAB4AAAPx4AA8AAAH4eAAPAAAD4HgADwAAB8B4AA8AAA+AeAAPAAAfAHgADwAAPgB4AA8AAHwAeAAHgAD4AHgAB4AD8AB4AAfAB+AAeAAD8B/AAHgAAf//gAB4AAH//wAAeAAAf/wAAHgAAB/wAAA4AAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AADgAAAAPAAB4AAAADwAAeAAAAA+AAHgAAAAHgAB4ABgAB4AAeAA8AAeAAHgA/AADwAB4AfwAA8AAeAP8AAPAAHgH/AADwAB4H7wAA8AAeD48AAPAAHh8PAAHgAB5+BwAB4AAe/AeAA+AAH/AHwAfAAB/gA/AfgAAfwAH//wAAHwAA//4AAA4AAH/8AAAAAAAf4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAAAAD+AAAAAAAD/gAAAAAAH/4AAAAAAH/+AAAAAAP/ngAAAAAP/h4AAAAAf/AeAAAAAf/AHgAAAA/+AB4AAAA/+AAeAAAB/8AAHgAAA/8AAB4AAAP4AAAeAAAB4AAAHgAAAAAAAB4AAAAAAAAeAAAAAAP///4AAAAH////AAAAA////gAAAAP///4AAAAAAB4AAAAAAAAeAAAAAAAAHgAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAD4AA8AAD///gAPAAB///4AD4AAf//+AAeAAH+APAAHgAB4AHgAA4AAeAB4AAOAAHgAcAADwAB4AHAAA8AAeADwAAPAAHgAcAADwAB4AHAAA8AAeAB4AAeAAHgAeAAHgAB4AHwAD4AAeAA+AB8AAHgAP4B+AAB4AB///gAAOAAP//gAABAAA//wAAAAAAD/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAB///4AAAAD////wAAAD////+AAAB/////4AAA/gPgB/AAAfgDwAHwAAPgA8AA+AADwAeAAHgAB4AHgAB4AAeAB4AAfAAHgAeAADwABwAHgAA8AAcAB4AAPAAHAAeAAHwAB4AHgAB4AAeAB8AAeAAHgAPAAPgAB4AD8APwAAOAAfwP4AADgAD//8AAAAAAf/+AAAAAAB/+AAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAB4AAAAAAAAeAAAAAAAAHgAAAAAAAB4AAAAA4AAeAAAAB/AAHgAAAB/wAB4AAAB/4AAeAAAD/4AAHgAAD/wAAB4AAH/wAAAeAAH/gAAAHgAP/gAAAB4AP/AAAAAeAf/AAAAAHgf+AAAAAB4/+AAAAAAe/8AAAAAAH/8AAAAAAB/4AAAAAAAf4AAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gAAAA/AB/+AAAA/8B//wAAA//gf/+AAAf/8PgPgAAH4fngB8AAD4B/wAPgAA8AP8AB4AAeAB+AAeAAHgAfgADwAB4ADwAA8AAcAA8AAPAAHAAPAADwAB4ADwAA8AAeAB+AAPAAHgAfgAHgAB8AP8AB4AAPgH/AA+AAD8H54AfAAAf/8fgPwAAD/+D//4AAAf/Af/8AAAB/AD/+AAAAAAAP+AAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAf/wAAAAAAf/+AAAAAAP//4AAwAAH//+AAeAAD+APwAHgAA+AA+AB4AAfAAHgAOAAHgAB4ADwAB4AAPAA8AAeAADwAPAAHgAA8ADwAB4AAPAA8AAeAADwAPAAHgAA8AHgAB8AAeAB4AAPgAHgA+AAD8ADwA/AAAfwA8A/gAAD/wef/wAAAf////4AAAB////4AAAAH///wAAAAAD/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AB4AAAAAfgA/AAAAAH4APwAAAAB+AD4AAAAAPAAeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="), 46, atob("DRAcHBwcHBwcHBwcDQ=="), 56+(scale<<8)+(1<<16));
  return this;
};

Graphics.prototype.setFontRoboto20 = function(scale) {
  // Actual height 21 (20 - 0)
  this.setFontCustom(atob("AAAAAAAAAAAAAAAAAAAAAAAAH/zA/+YAAAAAAAHwAAwAAHwAA+AAAAAAAAAAAQACDAAYbADP4B/8A/zAGYZADH4A/+A/7AHYYADCAAAAAAAQAeHgH4eBzgwMMHnhw88GGBw4wHj+AcPgAAAAAAAAAAB4AA/gAGMAAwhwGMcAfuABzgABzgAc+AOMYBhBAAMYAB/AAHwAAAAAHwD5+A/8YGPDAw8YGPzA/HYD4fAADwAB/AAOYAABAAAAHwAA4AAAAAAAAAAH/gD//B8A+cAA7AADAAAAAAAYAAbwAHHgHwf/4A/8AAAAEAABiAAGwAA8AA/AAH+AAGwAByAAEAAAAAAAMAABgAAMAABgAH/wA/+AAMAABgAAMAABgAAAAAAAIAAfAADwAAAABgAAMAABgAAMAABgAAAAAAAAAAAAADAAAYAAAAAAAAADgAB8AB+AA+AA+AA/AAHAAAgAAAAAAB8AB/8Af/wHAHAwAYGADAwAYHAHAf/wB/8AAAAAAAAAAABgAAcAADAAAYAAH//A//4AAAAAAAAAAAAAAAAAAAAABwDAeA4HAPAwHYGBzAwcYHHDAfwYB8DAAAYAAAAAAABgOAcBwHADAwwYGGDAwwYHPHAf/wB58AAAAAAAAADAAB4AAfAAPYAHjAB4YA8DAH//A//4AAYAADAAAAAAAAAEMA/xwH+HAxgYGMDAxgYGODAw/4GD+AAHAAAAAAAAAf8AP/wD2HA5wYGMDAxgYGOHAA/wAD8AAAAAAAAAAAGAAAwAAGADAwB4GB+Aw+AGfAA/gAHwAAwAAAAAAADAB5+Af/wHPDAwwYGGDAwwYHPHAfvwB58AAAAAAAAAAAB+AAf4AHDjAwMYGBjAwM4HDOAf/gB/4AAAAAAAAAAAAYDADAYAAAAAAAAAAYDAfAYHwAAAABAAAcAADgAA+AAGwAB3AAMYABjgAYMAAAAAAAAAAAAAAABmAAMwABmAAMwABmAAMwABmAAMwAAiAAAAAAAAAYMADjgAMYAB3AAGwAA2AADgAAcAABAAAAAAAAAMAADgAA4AAGBzAweYGHAA/wAD8AAEAAAAwAB/4A/PwOAGDgAYYPxmH/Mw4ZmMDMxgZmM+Mx/5mHDAYAIDgDAPBwAf8AAMAAAAAAAYAAfAAPwAP4AH+AH4wA8GAH4wAP2AAPwAAfwAAfAAAYAAAAAAAAAAA//4H//AwwYGGDAwwYGGDAwwYH/HAf/wB58AAAAADAAH/AD/+AcBwHADAwAYGADAwAYGADA4A4DweAODgAAAAAAAAAAAAAAH//A//4GADAwAYGADAwAYGADAYAwD4+AP/gAfwAAAAAAAAAAAH//A//4GDDAwYYGDDAwYYGDDAwYYGCDAgAYAAAAAAAH//A//4GDAAwYAGDAAwYAGDAAwYAGAAAAAAAAAAH/AD/8AcBwHAHAwAYGADAwYYGDDA4YYDz/AOfwAAAAAAAAAAA//4H//A//4ADAAAYAADAAAYAADAAAYAADAA//4H//AAAAAAAAAAAAAAA//4H//AAAAAAAAABAAAeAAB4AADAAAYAADAAAYAAHA//wH/8AAAAAAAAAAAAAAA//4H//AAcAAPAAD4AA/wAOPADg8A4B4GAHAgAYAAAAAAAH//A//4AADAAAYAADAAAYAADAAAYAADAAAAAAAA//4H//A+AAB+AAD8AAD8AAH4AAPAAH4AH4AD8AD8AA+AAH//A//4AAAAAAAH//A//4H//AeAAB8AADwAAPgAAeAAA8AADwH//A//4AAAAAAAAAAAH/AB/8AeDwHAHAwAYGADAwAYGADA4A4DweAP/gA/4AAAAAAAAAAAH//A//4GBgAwMAGBgAwMAGBgAwcAH/AAfwAA8AAAAAA/4AP/gDgOA4A4GADAwAYGADAwAYHAHgeD+B/8wD+GAAAAAAAAAAA//4H//AwYAGDAAwYAGDgAweAHH8Afz4B8HAAAIAAYAPDwD8OA5w4GGDAwwYGHDAwYYHDnAePwBw8AAAAGAAAwAAGAAAwAAGAAA//4H//AwAAGAAAwAAGAAAwAAAAAAAAAH/4A//wAAPAAAYAADAAAYAADAAAYAAPA//wH/8AAAAAAAAgAAHAAA/AAB/AAD+AAD+AAD4AAfAAfwAfwAfwAH4AA4AAEAAA+AAH/AAH/gAD/AAD4AD+AH+AH8AA+AAH+AAD+AAD/AAD4AH/AP/AH+AA8AAAAAAAAAGADA4A4HweAPPgA/wAB8AAfwAPvgDweA8B4GADAAAIGAAA4AAHwAAPgAAfAAA/4AH/AD4AB8AA+AAHgAAwAAAAAAAAAGADAwB4GAfAwPYGDzAx4YGeDA/AYHwDA4AYGADAAAAAAAA///3//+wAA2AAGAAAGAAA+AAD8AAD8AAD4AAH4AAHgAAMAAAAwAA2AAG///3//+AAAAAAAAAAAOAAHwAD4AA8AAD8AADwAAGAAAAAAABgAAMAABgAAMAABgAAMAABgAAMAABgAAAEAAAwAADAAAIAAAAAAAAAAEeABn4Ad3ADMYAZjADMYAZmAB/4AP/AAAAAAAA//4H//ABgwAYDADAYAYDADg4AP+AA/gABwAAAAAAAAA/gAP+ADg4AYDADAYAYDADAYAOOABxwAAAAAEAAH8AB/wAcHADAYAYDADAYAcDA//4H//AAAAAAAAAAAAH8AB/wAdnADMYAZjADMYAZjAB84AHmAAMAAMAABgAB//gf/8HMAAxgAGIAAAAAAH8IB/zAcHMDAZgYDMDAZgcHcD//Af/wAAAAAAAAAAH//A//4AMAADAAAYAADAAAcAAD/4AP/AAAAAAAAAAAGf/Az/4AAAAAAAAAAMz//mf/4AAAAAAAAAAH//A//4ABwAAeAAH4ABzwAcPACAYAABAAAAAAAA//4H//AAAAAAAAAAAAf/AD/4AMAADAAAYAADAAAcAAD/4AP/ABgAAYAADAAAYAADgAAP/AA/4AAAAAAAAf/AD/4AMAADAAAYAADAAAcAAD/4AP/AAAAAAAAAAAAH8AB/wAcHADAYAYDADAYAYDADx4AP+AA/gAAAAAAAAf/8D//gYDADAYAYDADAYAcHAB/wAH8AAEAAAAAAEAAH8AB/wAcHADAYAYDADAYAYDAD//gf/8AAAAAAAAAAAf/AD/4AcAADAAAYAACAAAAEAB5wAfnADMYAZjADGYAYzADn4AOeAAAAAAAADAAAYAAf/wD//ADAYAYDAAAAAAAAD/gAf/AAA4AADAAAYAADAAAwAf/AD/4AAAAAAAAYAAD4AAP4AAP4AAPAAH4AH4AD8AAcAAAAAAQAADwAAf4AAf4AAPAAP4AP4ADwAAfgAA/gAA/AAD4AH+AD+AAeAAAAAAAAACAYAcHADzwAH8AAfAAH8ADx4AcHACAIAcAMD4BgP4MAP/AAPwAP4AP4AD4AAcAAAAAAAAADAYAYHADD4AY7ADOYAfjADwYAcDADAYAAAAADAAA4AH//B/v8cABzAACAAAH//w//+AAAAAAACAACcAAx/n+H//AA4AAHAAAAAAAAAAAAAOAADgAAYAADAAAcAABgAAGAAAwAAGAADwAAcAAAAA"), 32, atob("BQUHDQwPDQQHBwkMBAYGCQwMDAwMDAwMDAwFBAsMCwoTDg0ODgwMDg8GDA0LEg8ODQ4NDA0ODRMNDQ0GCQYJCQYLDAsMCwcMDAUFCwUSDAwMDAcLBwwKEAoKCgcFBw4A"), 21+(scale<<8)+(1<<16));
  return this;
};

function assignPalettes() {
    // palette for 0-40%
    pal1 = new Uint16Array([g.toColor("#000"), g.toColor(settings.gy), g.toColor(settings.fg), g.toColor("#00f")]);
    // palette for 50-100%
    pal2 = new Uint16Array([g.toColor("#000"), g.toColor(settings.fg), g.toColor(settings.gy), g.toColor("#00f")]);

    // palette for 0-40%
    pal3 = new Uint16Array([g.toColor("#000"), g.toColor("#222"), g.theme.fg, g.toColor("#00f")]);
    // palette for 50-100%
    pal4 = new Uint16Array([g.toColor("#000"), g.theme.fg, g.toColor("#222"), g.toColor("#00f")]);
}

function setSmallFont20() {
  g.setFontRoboto20();
}

function setLargeFont() {
  g.setFontBloggerSansLight46(1);
}

function setSmallFont() {
  g.setFont('Vector', 16);
}

function getSteps() {
  try {
    return Bangle.getHealthStatus("day").steps;
  } catch (e) {
    if (WIDGETS.wpedom !== undefined) 
      return WIDGETS.wpedom.getSteps();
    else
      return 0;
  }
}

/////////////// sunrise / sunset /////////////////////////////

function loadSettings() {
  settings = require("Storage").readJSON(SETTINGS_FILE,1)||{};
  settings.gy = settings.gy||'#200';
  settings.fg = settings.fg||'#f00';
  settings.idle_check = settings.idle_check||true;
  assignPalettes();
}

function draw() {
  drawClock();
  queueDraw();
}

function drawClock() {
  var date = new Date();
  var da = date.toString().split(" ");
  var hh = da[4].substr(0,2);
  var mm = da[4].substr(3,2);
  var steps = getSteps();
  var p_steps = Math.round(100*(steps/10000));
  if (!secondsScreen) {
    batt = E.getBattery();
  }
  
  g.reset();
  // g.setColor(g.theme.bg);
  g.setColor("#000");
  g.fillRect(0, 0, w, h);
  // g.drawImage(getGaugeImage(p_steps, pal1, pal2), 0, 0);
  drawGauge(w/2, h/2, date.getMinutes() / 60, 170/2, settings.fg, settings.gy);
  drawGauge(w/2, h/2, (date.getHours() % 12) / 12, 170/2 - size * 2, '#FFF', '#222');
  // g.drawImage(getGaugeImage((date.getMinutes()/60) * 100, pal3, pal4), 9, 9, { scale: 0.9 });

  setLargeFont();

  // Draw time

  g.setColor(settings.fg);
  g.setFontAlign(1,0);  // right aligned
  g.drawString(hh, (w/2) - 5, h/2 - 11);

  // g.setColor(g.theme.fg);
  g.setColor("#FFF");
  if (!secondsScreen || date.getSeconds() % 2) g.drawString(':', (w/2) + 7, h/2 - 20);
  g.setFontAlign(-1,0); // left aligned
  g.drawString(mm, (w/2) + 5, h/2 - 11);

  // Draw date
  setSmallFont();
  g.setFontAlign(0,0);

  g.drawString(new Date().as("0D/0M/V").str, w/2, infoLine);
  g.drawString(batt + "%", w/2, infoLine + 32);
  g.setColor(settings.fg);
  g.drawString(new Date().as("T C").str, w/2, infoLine + 16);

  // print(process.memory(true));
  // print(!secondsScreen || date.getSeconds() % 2);
}

function radians(a) {
  return a * Math.PI / 180;
}

function drawGauge(cx, cy, percent, radiusOuter, colorFill, colorEmpty) {
  const thickness = size - 2;
  const radiusInner = radiusOuter - size;
  const radius = radiusInner + (size/2) + 1;
  
  if (percent <= 0) return; // no gauge needed
  if (percent > 1) percent = 1;

  const endRotation = 360 * percent;

  g.setColor(g.toColor(colorEmpty));
  
  g.fillCircle(cx, cy, radiusOuter);

  // g.setColor(g.toColor(g.theme.bg));
  g.setColor("#000");
  
  g.fillCircle(cx, cy, radiusInner);
  
  g.setColor(g.toColor(colorFill));

  for (let i = 0; i < endRotation - thickness; i += thickness) {
    x = cx + radius * Math.sin(radians(180 - i));
    y = cy + radius * Math.cos(radians(180 - i));
    g.fillCircle(x, y, thickness);
  }
}

/////////////////   GAUGE images /////////////////////////////////////

// putting into 1 function like this, rather than individual variables
// reduces ram usage from 70%-13%
function getGaugeImage(p, pal1, pal2) {
  // p0
  if (p < 2) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4ACgtVAAVUFUgpDAAdAFMEBFQ4ABqBVnLMQqLLLzWEABLgbVgohEGopYaiofDBihWVHJpYYDgYPbKx1ACJhYZIwT4OcAZWYHyRYUIgQXQH4RqOThCXUYRpCHNyQVVQQTwVQiSZWIQSEQNgSYSIYiEQQSyEUCQLDSOAyCnQiSCYQiSCYQiSCZDaDARObKuBSZwcaVzR0QFYKuZWAYNZWCJJKMoKuaWAahKBhiwTJRSudURorBFTgfMVzqjDO5DaeZ5jaeJhhiKbi4rIbT4hLqoriPI7afUpS5BbTwiKFdZgIADSmHFYIqgbgIrGcgIriEYwzHADZ7HRY4rdaYrjHADcBFYoGBFcgkEGQwAeFYqKHFbzUEcQ4AdiorwiorlEogxFAD59FWoorhoArDqArjgIr/FbYwFAEJSDFf4rXgornqgrDFUkAior/Ff4rGAYYAjKYYr/Ff4r/FbdVFdFAFYNQFcsBFf4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/FbdUFcsFFYUVFdADBFf4r/Ff4rbAYYAjKYYr/Ff4rFoArkqorCgIrnqAr/FbIEFAEBSFFf4rYqgrjgorEiormAocVAogAfEooxFFcB9EFdq1DAD9VFYkBFctQFYoGEADokHFcp8FRQoAdag7iFFb4HFioHGADYjHGY4rcPYyLHADbTHcYNQFT4iIFdZgIADKmJqrcgiorIBIIrhMKIAXUpIrBbjzaBFZAKKbS5MJFcKkJbj4fLBYLcdqorKbjzPMbjxKNMhauTURawdJJorBWDShBFZiRBWDQcOHRyuPOhorBWDIbPWDRzQSYKEYIwLLOHgSEXDIJyPQjD2SQjCCQQjSCRCYY/QN4xDRQiyCSQgjdSCqqECLCRWBYyiECISBWCYqgXCLCBWCQSYYEIhxqCeChYFThoQCKypYEIxgPPLB4cKFQZWXDoosIBhhYWcArWDKzYhHABA1EADArNoArcFhgqeWQysgLJxVfcBLWdAH4A5A"))
  };

  // p2
  if (p >= 2 && p < 4) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette: pal1,
    buffer : require("heatshrink").decompress(atob("AH4A/ADNUFE8FqtVq2q1AqkFIIrDAAOAFMEBFQYrE1WgKsYrGLL4qFFY2pqDWeFZdUVkAhCAQMKFYdVLDUVFQYMHlWq0oMJKyoOJlQrCLDBWDB5clB5xWOoARMCARYWKwT4OgpYXKwY+SLChECC6A/CNRycIS6jCNIQ5uSCqqCCeCqESTKxCCQiBsCTCRDEQiCCWQigSBYaRwGQU6ESQTCESQTCESQTIbQYCJzZVwKTODjSuaOiArBVzKwDBrKwRJJRlBVzSwDUJQMMWCZKKVzqiNFYIqcD5iudUYZ3IbTzPMbTxMMMRTcXFZDafEJdVFcR5HbT6lKXILaeERQrrMBAAaUw4rBFUDcBFYzkBFcQjGGY4AbPY6LHFbrTFcY4AbgIrFAwIrkEggyGADwrFRQ4reagjiHADsVFeEVFcolEGIoAfPoq1FFcNAFYdQFccBFf4rbGAoAhKQYr/Fa8FFc9UFYYqkgEVFf4r/FYwDDAEZTDFf4r/Ff4rbqorooArBqArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rbqgrlgorCioroAYIr/Ff4r/FbYDDAEZTDFf4r/FYtAFclVFYUBFc9QFf4rZAgoAgKQor/FbFUFccFFYkVFcwFDioFEAD4lFGIorgPogrtWoYAfqorEgIrlqArFAwgAdEg4rlPgqKFADrUHcQorfA4sVA4wAbEY4zHFbh7GRY4AbaY7jBqAqfERArrMBAAZUxNVbkEVFZAJBFcJhRAC6lJFYLcebQIrIBRTaXJhIrhUhLcfD5YLBbjtVFZTceZ5jceJRpkLVyaiLWDpJNFYKwaUIIrMSIKwaDhw6OVx50NFYKwZDZ6waOaCTBQjBGBZZw8CQi4ZBOR6EYeySEYQSCEaQSITDH6BvGIaKEWQSSEEbqQVVQgRYSKwLGUQgRCQKwTFUC4RYQKwSCTDAhEONQTwULAqcNCARWVLAhGMB55YPDhQqDKy4dFFhAMMLCzgFawZWbEI4AIGogAYFZtAFbgsMFTyyGVkBZOKr7gJazoA/AHI"))
  };

  // p4
  if (p >= 4 && p < 7) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4ACgtVqtW1WoFUgpBFYYABwApggIqDFYmq0BVjFY2loAqjFY1VqDWeFZdUVkAhEhQrDLDcVFQYMHlQrCBhBWVHJpYYDgYPbKx1ACJhYZIwT4OgpYXKwY+SLChECC6A/CNRycIS6jCNIQ5uSCqqCCeCqESTKxCCQiBsCTCRDEQiCCWQigSBYaRwGQU6ESQTCESQTCESQTIbQYCJzZVwKTODjSuaOiArBVzKwDBrKwRJJRlBVzSwDUJQMMWCZKKVzqiNFYIqcD5iudUYZ3IbTzPMbTxMMMRTcXFZDafEJdVFcR5HbT6lKXILaeERQrrMBAAaUw4rBFUDcBFYzkBFcQjGGY4AbPY6LHFbrTFcY4AbgIrFAwIrkEggyGADwrFRQ4reagjiHADsVFeEVFcolEGIoAfPoq1FFcNAFYdQFccBFf4rbGAoAhKQYr/Fa8FFc9UFYYqkgEVFf4r/FYwDDAEZTDFf4r/Ff4rbqorooArBqArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rbqgrlgorCioroAYIr/Ff4r/FbYDDAEZTDFf4r/FYtAFclVFYUBFc9QFf4rZAgoAgKQor/FbFUFccFFYkVFcwFDioFEAD4lFGIorgPogrtWoYAfqorEgIrlqArFAwgAdEg4rlPgqKFADrUHcQorfA4sVA4wAbEY4zHFbh7GRY4AbaY7jBqAqfERArrMBAAZUxNVbkEVFZAJBFcJhRAC6lJFYLcebQIrIBRTaXJhIrhUhLcfD5YLBbjtVFZTceZ5jceJRpkLVyaiLWDpJNFYKwaUIIrMSIKwaDhw6OVx50NFYKwZDZ6waOaCTBQjBGBZZw8CQi4ZBOR6EYeySEYQSCEaQSITDH6BvGIaKEWQSSEEbqQVVQgRYSKwLGUQgRCQKwTFUC4RYQKwSCTDAhEONQTwULAqcNCARWVLAhGMB55YPDhQqDKy4dFFhAMMLCzgFawZWbEI4AIGogAYFZtAFbgsMFTyyGVkBZOKr7gJazoA/AHI"))
  };

  // p7
  if (p >= 7 && p < 10) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4ACgtVqtW1WoFUgpBFYYABwApggIqDFYmq0BVjFYxZfFQorGLLrWCFZbgbVgtUBQcKLD8VFQYMHlQsDKzoOJFgZYYKwYPLFgWlKzVACJgrCqBWYawgAJcAOlNBhWMCZ8qFYJYUgoqBC6ECFYJqOAApWSS4jCNQQ5uSCqqCCeCqESFQKZUIQSEQNgSYSIYiEQQSyEUCQLDSOAyCnQiSCYQiSCYQiSCZDaDARObKuBSZwcaVzR0QFYKuZWAYNZWCJJKMoKuaWAahKBhiwTJRSudURorBFTgfMVzqjDO5DaeZ5jaeJhhiKbi4rIbT4hLqoriPI7afUpS5BbTwiKFdZgIADSmHFYIqgbgIrGcgIriEYwzHADZ7HRY4rdaYrjHADcBFYoGBFcgkEGQwAeFYqKHFbzUEcQ4AdiorwiorlEogxFAD59FWoorhoArDqArjgIr/FbYwFAEJSDFf4rXgornqgrDFUkAior/Ff4rGAYYAjKYYr/Ff4r/FbdVFdFAFYNQFcsBFf4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/FbdUFcsFFYUVFdADBFf4r/Ff4rbAYYAjKYYr/Ff4rFoArkqorCgIrnqAr/FbIEFAEBSFFf4rYqgrjgorEiormAocVAogAfEooxFFcB9EFdq1DAD9VFYkBFctQFYoGEADokHFcp8FRQoAdag7iFFb4HFioHGADYjHGY4rcPYyLHADbTHcYNQFT4iIFdZgIADKmJqrcgiorIBIIrhMKIAXUpIrBbjzaBFZAKKbS5MJFcKkJbj4fLBYLcdqorKbjzPMbjxKNMhauTURawdJJorBWDShBFZiRBWDQcOHRyuPOhorBWDIbPWDRzQSYKEYIwLLOHgSEXDIJyPQjD2SQjCCQQjSCRCYY/QN4xDRQiyCSQgjdSCqqECLCRWBYyiECISBWCYqgXCLCBWCQSYYEIhxqCeChYFThoQCKypYEIxgPPLB4cKFQZWXDoosIBhhYWcArWDKzYhHABA1EADArNoArcFhgqeWQysgLJxVfcBLWdAH4A5A=="))
  };

  // p10
  if (p >= 10 && p < 20) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4ACgtVqtW1WoFUgpBFYYABwApggIqDFYmq0BVjFYxZfFQorGLLrWCFZbgbVgtUBQcKLD8VFQYMHlQsDKzoOJFgZYYKwYPLFgZWaoARMLDJWCawgAJcAZWYCZ6FCLCkFFQNQCZ8CFYOoFaZWSLAmAQShWQLAiESQQRtTLAOkQSdUFacK1WloCCSCaAAEFYKaQQSyEC0pvQirZTbomlIh6CYZAZFOQTBxDQhyCYOQhoPQS4bQHaBzaVwKTODjSuaOiArBVzKwDBrKwRJJRlBVzSwDUJQMMWCZKKVzqiNFYIqcD5iudUYZ3IbTzPMbTxMMMRTcXFZDafEJdVFcR5HbT6lKXILaeERQrrMBAAaUw4rBFUDcBFYzkBFcQjGGY4AbPY6LHFbrTFcY4AbgIrFAwIrkEggyGADwrFRQ4reagjiHADsVFeEVFcolEGIoAfPoq1FFcNAFYdQFccBFf4rbGAoAhKQYr/Fa8FFc9UFYYqkgEVFf4r/FYwDDAEZTDFf4r/Ff4rbqorooArBqArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rbqgrlgorCioroAYIr/Ff4r/FbYDDAEZTDFf4r/FYtAFclVFYUBFc9QFf4rZAgoAgKQor/FbFUFccFFYkVFcwFDioFEAD4lFGIorgPogrtWoYAfqorEgIrlqArFAwgAdEg4rlPgqKFADrUHcQorfA4sVA4wAbEY4zHFbh7GRY4AbaY7jBqAqfERArrMBAAZUxNVbkEVFZAJBFcJhRAC6lJFYLcebQIrIBRTaXJhIrhUhLcfD5YLBbjtVFZTceZ5jceJRpkLVyaiLWDpJNFYKwaUIIrMSIKwaDhw6OVx50NFYKwZDZ6waOaCTBQjBGBZZw8CQi4ZBOR6EYeySEYQSCEaQSITDH6BvGIaKEWQSSEEbqQVVQgRYSKwLGUQgRCQKwTFUC4RYQKwSCTDAhEONQTwULAqcNCARWVLAhGMB55YPDhQqDKy4dFFhAMMLCzgFawZWbEI4AIGogAYFZtAFbgsMFTyyGVkBZOKr7gJazoA/AHI"))
  };

  // p20
  if (p >= 20 && p < 30) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4ACgtVqtW1WoFUgpBFYYABwApggIqDFYmq0BVjFYxZfFQorGLLrWCFZbgbVgtUBQcKLD8VFQYMHlQsDKzoOJFgZYYKwYPLFgZWaoARMLDJWCawgAJcAZWYCZ6FCLCkFFQNQCZ8CFYOoFaZWSLAmAQShWQLAiESQQRtTLAKESFQNUFacKQiSCCoArTgCESQSyEUirZTboyCnQiSCYQiSCYQiSCZQgeAVxwqYQgSwMVwNUFbMKWBquaWCArBVzKwDbRoqaWATcKbQKuaWAbcKbQKuaWAbcKVzqwNFYIqcWATaKVziwDbhDaebhjaebhgrBbTrcCFZDafbhdVFcTcHbT7cDFY0BbT7cD0ArxgtVoArfgGq1ArHFUDcBFY0VFceqFY1UFcMKFY1VFcmAFYtQFcMCFYsBFcugFYtAFcMAFYsFFcuoFYoqigEqFeEVFcuqFYlUFccKFYlVFc2AFYdQFccCFf4AWgNVoAEGAERSDFf4rXgornqgrDFUkAior/Ff4rGAYYAjKYYr/Ff4r/FbdVFdFAFYNQFcsBFf4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/FbdUFcsFFYUVFdADBFf4r/Ff4rbAYYAjKYYr/Ff4rFoArkqorCgIrnqAr/FbIEFAEBSFFf4rYqgrjgorEiormAocVAogAfEooxFFcB9EFdq1DAD9VFYkBFctQFYoGEADokHFcp8FRQoAdag7iFFb4HFioHGADYjHGY4rcPYyLHADbTHcYNQFT4iIFdZgIADKmJqrcgiorIBIIrhMKIAXUpIrBbjzaBFZAKKbS5MJFcKkJbj4fLBYLcdqorKbjzPMbjxKNMhauTURawdJJorBWDShBFZiRBWDQcOHRyuPOhorBWDIbPWDRzQSYKEYIwLLOHgSEXDIJyPQjD2SQjCCQQjSCRCYY/QN4xDRQiyCSQgjdSCqqECLCRWBYyiECISBWCYqgXCLCBWCQSYYEIhxqCeChYFThoQCKypYEIxgPPLB4cKFQZWXDoosIBhhYWcArWDKzYhHABA1EADArNoArcFhgqeWQysgLJxVfcBLWdAH4A5A="))
  };

  // p30
  if (p >= 30 && p < 40) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4ACgtVqtW1WoFUgpBFYYABwApggIqDFYmq0BVjFYxZfFQorGLLrWCFZbgbVgtUBQcKLD8VFQYMHlQsDKzoOJFgZYYKwYPLFgZWaoARMLDJWCawgAJcAZWYCZ6FCLCkFFQNQCZ8CFYOoFaZWSLAmAQShWQLAiESQQRtTLAKESFQNUFacKQiSCCoArTgCESQSyEUirZTboyCnQiSCYQiSCYQiSCZQgeAVxwqYQgSwMVwNUFbMKWBquaWCArBVzKwDbRoqaWATcKbQKuaWAbcKbQKuaWAbcKVzqwNFYIqcWATaKVziwDbhDaebhjaebhgrBbTrcCFZDafbhdVFcTcHbT7cDFY0BbT7cD0ArxgtVoArfgGq1ArHFUDcBFY0VFceqFY1UFcMKFY1VFcmAFYtQFcMCFYsBFcugFYtAFcMAFYsFFcuoFYoqigEqFeEVFcuqFYlUFccKFYlVFc2AFYdQFccCFf4rbgNVoArjgGq0Ar/FbMFFc+oFYYqkgEqFf4r/FY0VqgrlhWqFf4r/Ff4rdqorowArBqArlgQr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rbqgrlhQrCioroAYIr/Ff4r/FbcFqorllWoFf4r/FY9AFcmqFYUBFc+gFf4rZgFVqAqjgWqwAr/FbdUFccFawkVFcwFDioFEAD4lFGIorgPogrtWoYAfqorEgIrlqArFAwgAdEg4rlPgqKFADrUHcQorfA4sVA4wAbEY4zHFbh7GRY4AbaY7jBqAqfERArrMBAAZUxNVbkEVFZAJBFcJhRAC6lJFYLcebQIrIBRTaXJhIrhUhLcfD5YLBbjtVFZTceZ5jceJRpkLVyaiLWDpJNFYKwaUIIrMSIKwaDhw6OVx50NFYKwZDZ6waOaCTBQjBGBZZw8CQi4ZBOR6EYeySEYQSCEaQSITDH6BvGIaKEWQSSEEbqQVVQgRYSKwLGUQgRCQKwTFUC4RYQKwSCTDAhEONQTwULAqcNCARWVLAhGMB55YPDhQqDKy4dFFhAMMLCzgFawZWbEI4AIGogAYFZtAFbgsMFTyyGVkBZOKr7gJazoA/AHI"))
  };

  // p40
  if (p >= 40 && p < 50) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal1,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4ACgtVqtW1WoFUgpBFYYABwApggIqDFYmq0BVjFYxZfFQorGLLrWCFZbgbVgtUBQcKLD8VFQYMHlQsDKzoOJFgZYYKwYPLFgZWaoARMLDJWCawgAJcAZWYCZ6FCLCkFFQNQCZ8CFYOoFaZWSLAmAQShWQLAiESQQRtTLAKESFQNUFacKQiSCCoArTgCESQSyEUirZTboyCnQiSCYQiSCYQiSCZQgeAVxwqYQgSwMVwNUFbMKWBquaWCArBVzKwDbRoqaWATcKbQKuaWAbcKbQKuaWAbcKVzqwNFYIqcWATaKVziwDbhDaebhjaebhgrBbTrcCFZDafbhdVFcTcHbT7cDFY0BbT7cD0ArxgtVoArfgGq1ArHFUDcBFY0VFceqFY1UFcMKFY1VFcmAFYtQFcMCFYsBFcugFYtAFcMAFYsFFcuoFYoqigEqFeEVFcuqFYlUFccKFYlVFc2AFYdQFccCFf4rbgNVoArjgGq0Ar/FbMFFc+oFYYqkgEqFf4r/FY0VqgrlhWqFf4r/Ff4rdqorowArBqArlgQr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rbqgrlhQrCioroAYIr/Ff4r/FbcFqorllWoFf4r/FY9AFcmqFYUBFc+gFf4rZgFVqAqjgWqwAr/FbdUFccKFYkVFcwFDitVFccqFYkFFcuoFeNAFcWqFYkBFcugFYtQFUMCFYsAFcuAFYtUFcMKFY0VFcgHFitVFcMqFY0FFceoFY9AFcGqFY0BqtQFT8C1WgFeMAqtUFb8K1WAFY7cglQrIioriBI8FqtAFb2q1ArJbjzaBFZEBbj7aB0ALIFcLaHbkLaJFYbcd1QrKbjzaKbkDaLbgSwcVwLaJWD6uLFYawaVwIrMbgKwaVwLaKbgawaVwLaLbgawZQQLaLWDiuOWAaEYQQKuMWAiEXKwKuNQjUBQR6EaiqCPQjVVQSATCqtUFSZvB1WACiSEUY4KCQQgjdSCqqECLCRWBYyiECISBWCYqgXCLCBWCQSYYEIhxqCeChYFThoQCKypYEIxgPPLB4cKFQZWXDoosIBhhYWcArWDKzYhHABA1EADArNoArcFhgqeWQysgLJxVfcBLWdAH4A5A"))
  };

  // p50
  if (p >= 50 && p < 60) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal2,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4AChWq1WpqtUFUgpBFYYABoApggQqDFYlVqBVjFYxZfFQorGLLrWCFZbgbVguoBQcFLD8qFQYMHiosDKzoOJFgZYYKwYPLFgZWawARMLDJWCawgAJcAZWYCZ6FCLCkKFQOgCZ8BFYNUFaZWSLAlAQShWQLAiESQQRtTLAKESFQOoFacFQiSCCwArTgCESQSyEUlTZTboyCnQiSCYQiSCYQiSCZQgdAVxwqYQgSwMVwOoFbMFWBquaWCArBVzKwDbRoqaWATcKbQKuaWAbcKbQKuaWAbcKVzqwNFYIqcWATaKVziwDbhDaebhjaebhgrBbTrcCFZDafbheqFcTcHbT7cDFY0CbT7cDqArxhWqwArfgFVqgrHFUDcBFY0qFcdVFY2oFcMFFY2qFclAFYugFcMBFYsCFctQFYuAFcMAFYsKFctUFYoqigEVFeEqFctVFYmoFccFFYmqFc1AFYegFccBFf4rbgWqwArjgFVqAr/FbMKFc9UFYYqkgEVFf4r/FY0q1ArlgtVFf4r/Ff4rd1QrooArB0ArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rb1ArlgorClQroAYIr/Ff4r/FbcK1QrlitUFf4r/FY+AFclVFYUCFc9QFf4rZgGq0AqjgNVoAr/FbeoFccFFYkqFcwFDlWqFccVFYkKFctUFeOAFcVVFYkCFctQFYugFUMBFYsAFctAFYuoFcMFFY0qFcgHFlWqFcMVFY0KFcdUFY+AFcFVFY0C1WgFT8BqtQFeMA1WoFb8FqtAFY7cgiorIlQriBI8K1WAFb1VqgrJbjzaBFZECbj7aBqALIFcLaHbkLaJFYbcdqorKbjzaKbkDaLbgSwcVwLaJWD6uLFYawaVwIrMbgKwaVwLaKbgawaVwLaLbgawZQQLaLWDiuOWAaEYQQKuMWAiEXKwKuNQjSCQQjSCQQjSCRAAIrB1AqTgorBoAUQQiyCSQgjdSbISCRQgZYSKwKCSQghYQKwSCSQghYQKwSCTAAMqFYOoCJsFFQNVFShYEwARMFQRWVLAiFMQIRWWLAosKFQZWXLAosIFQZWYLAzgFawZWbAAMKFgmq1IoEAANUFTQABFZtAFbgsFFYwqeWQorFVjZZJFYhVfcAwrCazoA/AHI"))
  };

  // p60
  if (p >= 60 && p < 70) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal2,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4AChWq1WpqtUFUgpBFYYABoApggQqDFYlVqBVjFYxZfFQorGLLrWCFZbgbVguoBQcFLD8qFQYMHiosDKzoOJFgZYYKwYPLFgZWawARMLDJWCawgAJcAZWYCZ6FCLCkKFQOgCZ8BFYNUFaZWSLAlAQShWQLAiESQQRtTLAKESFQOoFacFQiSCCwArTgCESQSyEUlTZTboyCnQiSCYQiSCYQiSCZQgdAVxwqYQgSwMVwOoFbMFWBquaWCArBVzKwDbRoqaWATcKbQKuaWAbcKbQKuaWAbcKVzqwNFYIqcWATaKVziwDbhDaebhjaebhgrBbTrcCFZDafbheqFcTcHbT7cDFY0CbT7cDqArxhWqwArfgFVqgrHFUDcBFY0qFcdVFY2oFcMFFY2qFclAFYugFcMBFYsCFctQFYuAFcMAFYsKFctUFYoqigEVFeEqFctVFYmoFccFFYmqFc1AFYegFccBFf4rbgWqwArjgFVqAr/FbMKFc9UFYYqkgEVFf4r/FY0q1ArlgtVFf4r/Ff4rd1QrooArB0ArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rb1ArlgorClQroAYIr/Ff4r/FbcK1QrlitUFf4r/FY+AFclVFYUCFc9QFf4rZgGq0AqjgNVoAr/FbeoFccFFYkqFcwFDlWqFccVFYkKFctUFeOAFcVVFYkCFctQFYugFUMBFYsAFctAFYuoFcMFFY0qFcgHFlWqFcMVFY0KFcdUFY+AFcFVFY0C1WgFT8BqtQFeMA1WoFb8FqtAFY7cgiorIlQriBI8K1WAFb1VqgrJbjzaBFZECbj7aBqALIFcLaHbkLaJFYbcdqorKbjzaKbkDaLbgSwcVwLaJWD6uLFYawaVwIrMbgKwaVwLaKbgawaVwLaLbgawZQQLaLWDiuOWAaEYQQKuMWAelNBqCLVxqEC0oRPQS6EC0oSQQSyECFYKEVQSIABFYI/QAAcFFYJDRCgSCmYYjdSCqqYCLCRWBYyiECISBWCYqgXCLCBWCQSYYEIhxqCeChYFThoQCKypYEIxgPPLB4cKFQZWXDoosIBhhYWcArWDKzYhHABA1EADArNoArcFhgqeWQysgLJxVfcBLWdAH4A5A"))
  };

  // p70
  if (p >= 70 && p < 80) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal2,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4AChWq1WpqtUFUgpBFYYABoApggQqDFYlVqBVjFYxZfFQorGLLrWCFZbgbVguoBQcFLD8qFQYMHiosDKzoOJFgZYYKwYPLFgZWawARMLDJWCawgAJcAZWYCZ6FCLCkKFQOgCZ8BFYNUFaZWSLAlAQShWQLAiESQQRtTLAKESFQOoFacFQiSCCwArTgCESQSyEUlTZTboyCnQiSCYQiSCYQiSCZQgdAVxwqYQgSwMVwOoFbMFWBquaWCArBVzKwDbRoqaWATcKbQKuaWAbcKbQKuaWAbcKVzqwNFYIqcWATaKVziwDbhDaebhjaebhgrBbTrcCFZDafbheqFcTcHbT7cDFY0CbT7cDqArxhWqwArfgFVqgrHFUDcBFY0qFcdVFY2oFcMFFY2qFclAFYugFcMBFYsCFctQFYuAFcMAFYsKFctUFYoqigEVFeEqFctVFYmoFccFFYmqFc1AFYegFccBFf4rbgWqwArjgFVqAr/FbMKFc9UFYYqkgEVFf4r/FY0q1ArlgtVFf4r/Ff4rd1QrooArB0ArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rb1ArlgorClQroAYIr/Ff4r/FbcK1QrlitUFf4r/FY+AFclVFYUCFc9QFf4rZAgoAggNVoAr/FbdUFccFFYkVFcwFDioFEAD4lFGIorgPogrtWoYAfqorEgIrlqArFAwgAdEg4rlPgqKFADrUHcQorfA4sVA4wAbEY4zHFbh7GRY4AbaY7jBqAqfERArrMBAAZUxNVbkEVFZAJBFcJhRAC6lJFYLcebQIrIBRTaXJhIrhUhLcfD5YLBbjtVFZTceZ5jceJRpkLVyaiLWDpJNFYKwaUIIrMSIKwaDhw6OVx50NFYKwZDZ6waOaCTBQjBGBZZw8CQi4ZBOR6EYeySEYQSCEaQSITDH6BvGIaKEWQSSEEbqQVVQgRYSKwLGUQgRCQKwTFUC4RYQKwSCTDAhEONQTwULAqcNCARWVLAhGMB55YPDhQqDKy4dFFhAMMLCzgFawZWbEI4AIGogAYFZtAFbgsMFTyyGVkBZOKr7gJazoA/AHIA="))
  };

  // p80
  if (p >= 80 && p < 90) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal2,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4AChWq1WpqtUFUgpBFYYABoApggQqDFYlVqBVjFYxZfFQorGLLrWCFZbgbVguoBQcFLD8qFQYMHiosDKzoOJFgZYYKwYPLFgZWawARMLDJWCawgAJcAZWYCZ6FCLCkKFQOgCZ8BFYNUFaZWSLAlAQShWQLAiESQQRtTLAKESFQOoFacFQiSCCwArTgCESQSyEUlTZTboyCnQiSCYQiSCYQiSCZQgdAVxwqYQgSwMVwOoFbMFWBquaWCArBVzKwDbRoqaWATcKbQKuaWAbcKbQKuaWAbcKVzqwNFYIqcWATaKVziwDbhDaebhjaebhgrBbTrcCFZDafbheqFcTcHbT7cDFY0CbT7cDqArxhWqwArfgFVqgrHFUDcBFY0qFcdVFY2oFcMFFY2qFclAFYugFcMBFYsCFctQFYuAFcMAFYsKFctUFYoqigEVFeEqFctVFYmoFccFFYmqFc1AcIdQFccBFf4rbGAoAhKQYr/Fa8FFc9UFYYqkgEVFf4r/FYwDDAEZTDFf4r/Ff4rbqorooArBqArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rbqgrlgorCioroAYIr/Ff4r/FbYDDAEZTDFf4r/FYtAFclVFYUBFc9QFf4rZAgoAgKQor/FbFUFccFFYkVFcwFDioFEAD4lFGIorgPogrtWoYAfqorEgIrlqArFAwgAdEg4rlPgqKFADrUHcQorfA4sVA4wAbEY4zHFbh7GRY4AbaY7jBqAqfERArrMBAAZUxNVbkEVFZAJBFcJhRAC6lJFYLcebQIrIBRTaXJhIrhUhLcfD5YLBbjtVFZTceZ5jceJRpkLVyaiLWDpJNFYKwaUIIrMSIKwaDhw6OVx50NFYKwZDZ6waOaCTBQjBGBZZw8CQi4ZBOR6EYeySEYQSCEaQSITDH6BvGIaKEWQSSEEbqQVVQgRYSKwLGUQgRCQKwTFUC4RYQKwSCTDAhEONQTwULAqcNCARWVLAhGMB55YPDhQqDKy4dFFhAMMLCzgFawZWbEI4AIGogAYFZtAFbgsMFTyyGVkBZOKr7gJazoA/AHIA="))
  };
  
  // p90
  if (p >= 90 && p < 100) return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal2,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4AChWq1WpqtUFUgpBFYYABoApggQqDFYlVqBVjFYxZfFQorGLLrWCFZbgbVguoBQcFLD8qFQYMHiosDKzoOJFgZYYKwYPLFgZWawARMLDJWCawgAJcAZWYCZ6FCLCkKFQOgCZ8BFYNUFaZWSLAlAQShWQLAiESQQRtTLAKESquq1ArTgqESNgOqwArTIYKERH4KCUQigSBbKTdGCKKCVQiTCCFSyERCALBQQjAPBoArXDZ7ARObKuBSZwcaVzR0QFYKuZWAYNZWCJJKMoKuaWAahKBhiwTJRSudURorBFTgfMVzqjDO5DaeZ5jaeJhhiKbi4rIbT4hLqoriPI7afUpS5BbTwiKFdZgIADSmHFYIqgbgIrGcgIriEYwzHADZ7HRY4rdaYrjHADcBFYoGBFcgkEGQwAeFYqKHFbzUEcQ4AdiorwiorlEogxFAD59FWoorhoArDqArjgIr/FbYwFAEJSDFf4rXgornqgrDFUkAior/Ff4rGAYYAjKYYr/Ff4r/FbdVFdFAFYNQFcsBFf4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/FbdUFcsFFYUVFdADBFf4r/Ff4rbAYYAjKYYr/Ff4rFoArkqorCgIrnqAr/FbIEFAEBSFFf4rYqgrjgorEiormAocVAogAfEooxFFcB9EFdq1DAD9VFYkBFctQFYoGEADokHFcp8FRQoAdag7iFFb4HFioHGADYjHGY4rcPYyLHADbTHcYNQFT4iIFdZgIADKmJqrcgiorIBIIrhMKIAXUpIrBbjzaBFZAKKbS5MJFcKkJbj4fLBYLcdqorKbjzPMbjxKNMhauTURawdJJorBWDShBFZiRBWDQcOHRyuPOhorBWDIbPWDRzQSYKEYIwLLOHgSEXDIJyPQjD2SQjCCQQjSCRCYY/QN4xDRQiyCSQgjdSCqqECLCRWBYyiECISBWCYqgXCLCBWCQSYYEIhxqCeChYFThoQCKypYEIxgPPLB4cKFQZWXDoosIBhhYWcArWDKzYhHABA1EADArNoArcFhgqeWQysgLJxVfcBLWdAH4A5A"))
  };

  // p100
  return {
    width : 176, height : 176, bpp : 2,
    transparent : 0,
    palette : pal2,
    buffer : require("heatshrink").decompress(atob("AH4A/AH4ACgtVAAVUFUgpDAAdAFMEBFQ4ABqBVnLMQqLFjzWEABLgbVgohEGoqyaiofDBihWVHJpYYDgYPbKxz5NLDJGCfBzgDKzA+SLChECC6A/CNRycIS6jCNIQ5uSCqqCCeCqESTKxCCQiBsCTCRDEQiCCWQigSBYaRwGQU6ESQTCESQTCESQTIbQYCJzZVwKTODjSuaOiArBVzKwDBrKwRJJRlBVzSwDUJQMMWCZKKVzqiNFYIqcD5iudUYZ3IbTzPMbTxMMMRTcXFZDafEJdVFcR5HbT6lKXILaeERQrrMBAAaUw4rBFUDcBFYzkBFcQjGGY4AbPY6LHFbrTFcY4AbgIrFAwIrkEggyGADwrFRQ4reagjiHADsVFeEVFcolEGIoAfPoq1FFcNAFYdQFccBFf4rbGAoAhKQYr/Fa8FFc9UFYYqkgEVFf4r/FYwDDAEZTDFf4r/Ff4rbqorooArBqArlgIr/Ff4r/Ff4r/Ff4r/Ff4r/Ff4r/Ff4rbqgrlgorCioroAYIr/Ff4r/FbYDDAEZTDFf4r/FYtAFclVFYUBFc9QFf4rZAgoAgKQor/FbFUFccFFYkVFcwFDioFEAD4lFGIorgPogrtWoYAfqorEgIrlqArFAwgAdEg4rlPgqKFADrUHcQorfA4sVA4wAbEY4zHFbh7GRY4AbaY7jBqAqfERArrMBAAZUxNVbkEVFZAJBFcJhRAC6lJFYLcebQIrIBRTaXJhIrhUhLcfD5YLBbjtVFZTceZ5jceJRpkLVyaiLWDpJNFYKwaUIIrMSIKwaDhw6OVx50NFYKwZDZ6waOaCTBQjBGBZZw8CQi4ZBOR6EYeySEYQSCEaQSITDH6BvGIaKEWQSSEEbqQVVQgRYSKwLGUQgRCQKwTFUC4RYQKwSCTDAhEONQTwULAqcNCARWVLAhGMB55YPDhQqDKy4dFFhAMMLCzgFawZWbEI4AIGogAYFZtAFbgsMFTyyGVkBZOKr7gJazoA/AHIA="))
  };
}

///////////////////////////////////////////////////////////////////////////////

// timeout used to update every minute
var drawTimeout;

// schedule a draw for the next minute
function queueDraw() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    draw();
  }, queueMillis - (Date.now() % queueMillis));
}

Bangle.setUI("clockupdown", btn=> {
  if (btn>0) {
    Bangle.setLocked(true);
  }
});

Bangle.on('lock', on => {
  Bangle.setLCDBrightness(!on);
  setState();
  draw();
});

function setState() {
  if (Bangle.isLocked()) {
    secondsScreen = false;
    queueMillis = 60000;
  } else {
    secondsScreen = true;
    queueMillis = 1000;
  }
}

loadSettings();
setState();
g.clear();
Bangle.loadWidgets();
// /*
//  * we are not drawing the widgets as we are taking over the whole screen
//  * so we will blank out the draw() functions of each widget and change the
//  * area to the top bar doesn't get cleared.
//  */
for (let wd of WIDGETS) {wd.draw=()=>{};wd.area="";}
draw();
