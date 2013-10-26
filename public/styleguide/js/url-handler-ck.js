/*!
 * URL Handler - v0.1
 *
 * Copyright (c) 2013 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Helps handle the initial iFrame source. Parses a string to see if it matches
 * an expected pattern in Pattern Lab. Supports Pattern Labs fuzzy pattern partial
 * matching style.
 *
 */var urlHandler={skipBack:!1,targetOrigin:window.location.protocol=="file:"?"*":window.location.protocol+"//"+window.location.host,getFileName:function(e){var t="patterns",n="";if(e==undefined)return n;if(e=="all")return"styleguide/html/styleguide.html";var r=e.indexOf("viewall-")!=-1?viewAllPaths:patternPaths;nameClean=e.replace("viewall-","");var i=this.getPatternInfo(nameClean,r),s=i[0],o=i[1];if(r[s]!=undefined&&r[s][o]!=undefined)n=r[s][o];else if(r[s]!=undefined)for(patternMatchKey in r[s])if(patternMatchKey.indexOf(o)!=-1){n=r[s][patternMatchKey];break}if(n=="")return n;var u=/\//g;e.indexOf("viewall-")!=-1&&n!=""?n=t+"/"+n.replace(u,"-")+"/index.html":n!=""&&(n=t+"/"+n.replace(u,"-")+"/"+n.replace(u,"-")+".html");return n},getPatternInfo:function(e,t){var n=e.split("-"),r=1,i=n.length,s=n[0];while(t[s]==undefined&&r<i){s+="-"+n[r];r++}pattern=e.slice(s.length+1,e.length);return[s,pattern]},getRequestVars:function(){var e=new function(e){if(e.length>1)for(var t,n=0,r=e.substr(1).split("&");n<r.length;n++){t=r[n].split("=");this[unescape(t[0])]=t.length>1?unescape(t[1]):""}}(window.location.search);return e},pushPattern:function(e,t){var n={pattern:e},r=urlHandler.getFileName(e),i=window.location.protocol+"//"+window.location.host+window.location.pathname.replace("public/index.html","public/")+r;if(t!=i)document.getElementById("sg-viewport").contentWindow.postMessage({path:r},urlHandler.targetOrigin);else{var s=window.location.protocol=="file:"?null:window.location.protocol+"//"+window.location.host+window.location.pathname.replace("index.html","")+"?p="+e;history.pushState(n,null,s);document.getElementById("title").innerHTML="Pattern Lab - "+e;document.getElementById("sg-raw").setAttribute("href",urlHandler.getFileName(e))}},popPattern:function(e){var t=e.state;if(t==null){this.skipBack=!1;return}if(t!=null)var n=t.pattern;var r="";r=this.getFileName(n);r==""&&(r="styleguide/html/styleguide.html");document.getElementById("sg-viewport").contentWindow.postMessage({path:r},urlHandler.targetOrigin);document.getElementById("title").innerHTML="Pattern Lab - "+n;document.getElementById("sg-raw").setAttribute("href",urlHandler.getFileName(n));wsnConnected&&wsn.send('{"url": "'+r+'", "patternpartial": "'+n+'" }')}};window.onpopstate=function(e){urlHandler.skipBack=!0;urlHandler.popPattern(e)};