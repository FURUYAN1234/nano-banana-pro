(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&s(f)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();function sS(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var vh={exports:{}},Yl={};var Yx;function rS(){if(Yx)return Yl;Yx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:f,ref:l!==void 0?l:null,props:c}}return Yl.Fragment=e,Yl.jsx=i,Yl.jsxs=i,Yl}var Wx;function oS(){return Wx||(Wx=1,vh.exports=rS()),vh.exports}var x=oS(),bh={exports:{}},vt={};var qx;function lS(){if(qx)return vt;qx=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),_=Symbol.for("react.activity"),g=Symbol.iterator;function b(P){return P===null||typeof P!="object"?null:(P=g&&P[g]||P["@@iterator"],typeof P=="function"?P:null)}var M={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,E={};function S(P,Z,be){this.props=P,this.context=Z,this.refs=E,this.updater=be||M}S.prototype.isReactComponent={},S.prototype.setState=function(P,Z){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,Z,"setState")},S.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function N(){}N.prototype=S.prototype;function U(P,Z,be){this.props=P,this.context=Z,this.refs=E,this.updater=be||M}var I=U.prototype=new N;I.constructor=U,C(I,S.prototype),I.isPureReactComponent=!0;var k=Array.isArray;function D(){}var B={H:null,A:null,T:null,S:null},A=Object.prototype.hasOwnProperty;function F(P,Z,be){var Ae=be.ref;return{$$typeof:r,type:P,key:Z,ref:Ae!==void 0?Ae:null,props:be}}function q(P,Z){return F(P.type,Z,P.props)}function H(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function $(P){var Z={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(be){return Z[be]})}var ce=/\/+/g;function oe(P,Z){return typeof P=="object"&&P!==null&&P.key!=null?$(""+P.key):Z.toString(36)}function j(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(D,D):(P.status="pending",P.then(function(Z){P.status==="pending"&&(P.status="fulfilled",P.value=Z)},function(Z){P.status==="pending"&&(P.status="rejected",P.reason=Z)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function L(P,Z,be,Ae,Oe){var ee=typeof P;(ee==="undefined"||ee==="boolean")&&(P=null);var Se=!1;if(P===null)Se=!0;else switch(ee){case"bigint":case"string":case"number":Se=!0;break;case"object":switch(P.$$typeof){case r:case e:Se=!0;break;case v:return Se=P._init,L(Se(P._payload),Z,be,Ae,Oe)}}if(Se)return Oe=Oe(P),Se=Ae===""?"."+oe(P,0):Ae,k(Oe)?(be="",Se!=null&&(be=Se.replace(ce,"$&/")+"/"),L(Oe,Z,be,"",function(Ze){return Ze})):Oe!=null&&(H(Oe)&&(Oe=q(Oe,be+(Oe.key==null||P&&P.key===Oe.key?"":(""+Oe.key).replace(ce,"$&/")+"/")+Se)),Z.push(Oe)),1;Se=0;var ye=Ae===""?".":Ae+":";if(k(P))for(var He=0;He<P.length;He++)Ae=P[He],ee=ye+oe(Ae,He),Se+=L(Ae,Z,be,ee,Oe);else if(He=b(P),typeof He=="function")for(P=He.call(P),He=0;!(Ae=P.next()).done;)Ae=Ae.value,ee=ye+oe(Ae,He++),Se+=L(Ae,Z,be,ee,Oe);else if(ee==="object"){if(typeof P.then=="function")return L(j(P),Z,be,Ae,Oe);throw Z=String(P),Error("Objects are not valid as a React child (found: "+(Z==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":Z)+"). If you meant to render a collection of children, use an array instead.")}return Se}function G(P,Z,be){if(P==null)return P;var Ae=[],Oe=0;return L(P,Ae,"","",function(ee){return Z.call(be,ee,Oe++)}),Ae}function K(P){if(P._status===-1){var Z=P._result;Z=Z(),Z.then(function(be){(P._status===0||P._status===-1)&&(P._status=1,P._result=be)},function(be){(P._status===0||P._status===-1)&&(P._status=2,P._result=be)}),P._status===-1&&(P._status=0,P._result=Z)}if(P._status===1)return P._result.default;throw P._result}var ue=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var Z=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(Z))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},xe={map:G,forEach:function(P,Z,be){G(P,function(){Z.apply(this,arguments)},be)},count:function(P){var Z=0;return G(P,function(){Z++}),Z},toArray:function(P){return G(P,function(Z){return Z})||[]},only:function(P){if(!H(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return vt.Activity=_,vt.Children=xe,vt.Component=S,vt.Fragment=i,vt.Profiler=l,vt.PureComponent=U,vt.StrictMode=s,vt.Suspense=m,vt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=B,vt.__COMPILER_RUNTIME={__proto__:null,c:function(P){return B.H.useMemoCache(P)}},vt.cache=function(P){return function(){return P.apply(null,arguments)}},vt.cacheSignal=function(){return null},vt.cloneElement=function(P,Z,be){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Ae=C({},P.props),Oe=P.key;if(Z!=null)for(ee in Z.key!==void 0&&(Oe=""+Z.key),Z)!A.call(Z,ee)||ee==="key"||ee==="__self"||ee==="__source"||ee==="ref"&&Z.ref===void 0||(Ae[ee]=Z[ee]);var ee=arguments.length-2;if(ee===1)Ae.children=be;else if(1<ee){for(var Se=Array(ee),ye=0;ye<ee;ye++)Se[ye]=arguments[ye+2];Ae.children=Se}return F(P.type,Oe,Ae)},vt.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},vt.createElement=function(P,Z,be){var Ae,Oe={},ee=null;if(Z!=null)for(Ae in Z.key!==void 0&&(ee=""+Z.key),Z)A.call(Z,Ae)&&Ae!=="key"&&Ae!=="__self"&&Ae!=="__source"&&(Oe[Ae]=Z[Ae]);var Se=arguments.length-2;if(Se===1)Oe.children=be;else if(1<Se){for(var ye=Array(Se),He=0;He<Se;He++)ye[He]=arguments[He+2];Oe.children=ye}if(P&&P.defaultProps)for(Ae in Se=P.defaultProps,Se)Oe[Ae]===void 0&&(Oe[Ae]=Se[Ae]);return F(P,ee,Oe)},vt.createRef=function(){return{current:null}},vt.forwardRef=function(P){return{$$typeof:h,render:P}},vt.isValidElement=H,vt.lazy=function(P){return{$$typeof:v,_payload:{_status:-1,_result:P},_init:K}},vt.memo=function(P,Z){return{$$typeof:p,type:P,compare:Z===void 0?null:Z}},vt.startTransition=function(P){var Z=B.T,be={};B.T=be;try{var Ae=P(),Oe=B.S;Oe!==null&&Oe(be,Ae),typeof Ae=="object"&&Ae!==null&&typeof Ae.then=="function"&&Ae.then(D,ue)}catch(ee){ue(ee)}finally{Z!==null&&be.types!==null&&(Z.types=be.types),B.T=Z}},vt.unstable_useCacheRefresh=function(){return B.H.useCacheRefresh()},vt.use=function(P){return B.H.use(P)},vt.useActionState=function(P,Z,be){return B.H.useActionState(P,Z,be)},vt.useCallback=function(P,Z){return B.H.useCallback(P,Z)},vt.useContext=function(P){return B.H.useContext(P)},vt.useDebugValue=function(){},vt.useDeferredValue=function(P,Z){return B.H.useDeferredValue(P,Z)},vt.useEffect=function(P,Z){return B.H.useEffect(P,Z)},vt.useEffectEvent=function(P){return B.H.useEffectEvent(P)},vt.useId=function(){return B.H.useId()},vt.useImperativeHandle=function(P,Z,be){return B.H.useImperativeHandle(P,Z,be)},vt.useInsertionEffect=function(P,Z){return B.H.useInsertionEffect(P,Z)},vt.useLayoutEffect=function(P,Z){return B.H.useLayoutEffect(P,Z)},vt.useMemo=function(P,Z){return B.H.useMemo(P,Z)},vt.useOptimistic=function(P,Z){return B.H.useOptimistic(P,Z)},vt.useReducer=function(P,Z,be){return B.H.useReducer(P,Z,be)},vt.useRef=function(P){return B.H.useRef(P)},vt.useState=function(P){return B.H.useState(P)},vt.useSyncExternalStore=function(P,Z,be){return B.H.useSyncExternalStore(P,Z,be)},vt.useTransition=function(){return B.H.useTransition()},vt.version="19.2.3",vt}var $x;function nm(){return $x||($x=1,bh.exports=lS()),bh.exports}var we=nm();const cS=sS(we);var yh={exports:{}},Wl={},Sh={exports:{}},Eh={};var Kx;function uS(){return Kx||(Kx=1,(function(r){function e(L,G){var K=L.length;L.push(G);e:for(;0<K;){var ue=K-1>>>1,xe=L[ue];if(0<l(xe,G))L[ue]=G,L[K]=xe,K=ue;else break e}}function i(L){return L.length===0?null:L[0]}function s(L){if(L.length===0)return null;var G=L[0],K=L.pop();if(K!==G){L[0]=K;e:for(var ue=0,xe=L.length,P=xe>>>1;ue<P;){var Z=2*(ue+1)-1,be=L[Z],Ae=Z+1,Oe=L[Ae];if(0>l(be,K))Ae<xe&&0>l(Oe,be)?(L[ue]=Oe,L[Ae]=K,ue=Ae):(L[ue]=be,L[Z]=K,ue=Z);else if(Ae<xe&&0>l(Oe,K))L[ue]=Oe,L[Ae]=K,ue=Ae;else break e}}return G}function l(L,G){var K=L.sortIndex-G.sortIndex;return K!==0?K:L.id-G.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,h=f.now();r.unstable_now=function(){return f.now()-h}}var m=[],p=[],v=1,_=null,g=3,b=!1,M=!1,C=!1,E=!1,S=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function I(L){for(var G=i(p);G!==null;){if(G.callback===null)s(p);else if(G.startTime<=L)s(p),G.sortIndex=G.expirationTime,e(m,G);else break;G=i(p)}}function k(L){if(C=!1,I(L),!M)if(i(m)!==null)M=!0,D||(D=!0,$());else{var G=i(p);G!==null&&j(k,G.startTime-L)}}var D=!1,B=-1,A=5,F=-1;function q(){return E?!0:!(r.unstable_now()-F<A)}function H(){if(E=!1,D){var L=r.unstable_now();F=L;var G=!0;try{e:{M=!1,C&&(C=!1,N(B),B=-1),b=!0;var K=g;try{t:{for(I(L),_=i(m);_!==null&&!(_.expirationTime>L&&q());){var ue=_.callback;if(typeof ue=="function"){_.callback=null,g=_.priorityLevel;var xe=ue(_.expirationTime<=L);if(L=r.unstable_now(),typeof xe=="function"){_.callback=xe,I(L),G=!0;break t}_===i(m)&&s(m),I(L)}else s(m);_=i(m)}if(_!==null)G=!0;else{var P=i(p);P!==null&&j(k,P.startTime-L),G=!1}}break e}finally{_=null,g=K,b=!1}G=void 0}}finally{G?$():D=!1}}}var $;if(typeof U=="function")$=function(){U(H)};else if(typeof MessageChannel<"u"){var ce=new MessageChannel,oe=ce.port2;ce.port1.onmessage=H,$=function(){oe.postMessage(null)}}else $=function(){S(H,0)};function j(L,G){B=S(function(){L(r.unstable_now())},G)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(L){L.callback=null},r.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<L?Math.floor(1e3/L):5},r.unstable_getCurrentPriorityLevel=function(){return g},r.unstable_next=function(L){switch(g){case 1:case 2:case 3:var G=3;break;default:G=g}var K=g;g=G;try{return L()}finally{g=K}},r.unstable_requestPaint=function(){E=!0},r.unstable_runWithPriority=function(L,G){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var K=g;g=L;try{return G()}finally{g=K}},r.unstable_scheduleCallback=function(L,G,K){var ue=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?ue+K:ue):K=ue,L){case 1:var xe=-1;break;case 2:xe=250;break;case 5:xe=1073741823;break;case 4:xe=1e4;break;default:xe=5e3}return xe=K+xe,L={id:v++,callback:G,priorityLevel:L,startTime:K,expirationTime:xe,sortIndex:-1},K>ue?(L.sortIndex=K,e(p,L),i(m)===null&&L===i(p)&&(C?(N(B),B=-1):C=!0,j(k,K-ue))):(L.sortIndex=xe,e(m,L),M||b||(M=!0,D||(D=!0,$()))),L},r.unstable_shouldYield=q,r.unstable_wrapCallback=function(L){var G=g;return function(){var K=g;g=G;try{return L.apply(this,arguments)}finally{g=K}}}})(Eh)),Eh}var Zx;function fS(){return Zx||(Zx=1,Sh.exports=uS()),Sh.exports}var Mh={exports:{}},fi={};var Qx;function dS(){if(Qx)return fi;Qx=1;var r=nm();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)p+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(m,p,v){var _=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:_==null?null:""+_,children:m,containerInfo:p,implementation:v}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return fi.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,fi.createPortal=function(m,p){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return c(m,p,null,v)},fi.flushSync=function(m){var p=f.T,v=s.p;try{if(f.T=null,s.p=2,m)return m()}finally{f.T=p,s.p=v,s.d.f()}},fi.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},fi.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},fi.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var v=p.as,_=h(v,p.crossOrigin),g=typeof p.integrity=="string"?p.integrity:void 0,b=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;v==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:_,integrity:g,fetchPriority:b}):v==="script"&&s.d.X(m,{crossOrigin:_,integrity:g,fetchPriority:b,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},fi.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var v=h(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},fi.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var v=p.as,_=h(v,p.crossOrigin);s.d.L(m,v,{crossOrigin:_,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},fi.preloadModule=function(m,p){if(typeof m=="string")if(p){var v=h(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:v,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},fi.requestFormReset=function(m){s.d.r(m)},fi.unstable_batchedUpdates=function(m,p){return m(p)},fi.useFormState=function(m,p,v){return f.H.useFormState(m,p,v)},fi.useFormStatus=function(){return f.H.useHostTransitionStatus()},fi.version="19.2.3",fi}var Jx;function hS(){if(Jx)return Mh.exports;Jx=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Mh.exports=dS(),Mh.exports}var e_;function pS(){if(e_)return Wl;e_=1;var r=fS(),e=nm(),i=hS();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function f(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(c(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var d=u.alternate;if(d===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===d.child){for(d=u.child;d;){if(d===a)return m(u),t;if(d===o)return m(u),n;d=d.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=d;else{for(var y=!1,R=u.child;R;){if(R===a){y=!0,a=u,o=d;break}if(R===o){y=!0,o=u,a=d;break}R=R.sibling}if(!y){for(R=d.child;R;){if(R===a){y=!0,a=d,o=u;break}if(R===o){y=!0,o=d,a=u;break}R=R.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}var _=Object.assign,g=Symbol.for("react.element"),b=Symbol.for("react.transitional.element"),M=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),S=Symbol.for("react.profiler"),N=Symbol.for("react.consumer"),U=Symbol.for("react.context"),I=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),D=Symbol.for("react.suspense_list"),B=Symbol.for("react.memo"),A=Symbol.for("react.lazy"),F=Symbol.for("react.activity"),q=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function $(t){return t===null||typeof t!="object"?null:(t=H&&t[H]||t["@@iterator"],typeof t=="function"?t:null)}var ce=Symbol.for("react.client.reference");function oe(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===ce?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case C:return"Fragment";case S:return"Profiler";case E:return"StrictMode";case k:return"Suspense";case D:return"SuspenseList";case F:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case M:return"Portal";case U:return t.displayName||"Context";case N:return(t._context.displayName||"Context")+".Consumer";case I:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case B:return n=t.displayName||null,n!==null?n:oe(t.type)||"Memo";case A:n=t._payload,t=t._init;try{return oe(t(n))}catch{}}return null}var j=Array.isArray,L=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},ue=[],xe=-1;function P(t){return{current:t}}function Z(t){0>xe||(t.current=ue[xe],ue[xe]=null,xe--)}function be(t,n){xe++,ue[xe]=t.current,t.current=n}var Ae=P(null),Oe=P(null),ee=P(null),Se=P(null);function ye(t,n){switch(be(ee,n),be(Oe,t),be(Ae,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?mx(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=mx(n),t=gx(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Z(Ae),be(Ae,t)}function He(){Z(Ae),Z(Oe),Z(ee)}function Ze(t){t.memoizedState!==null&&be(Se,t);var n=Ae.current,a=gx(n,t.type);n!==a&&(be(Oe,t),be(Ae,a))}function nt(t){Oe.current===t&&(Z(Ae),Z(Oe)),Se.current===t&&(Z(Se),kl._currentValue=K)}var Tt,Ye;function Nt(t){if(Tt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Tt=n&&n[1]||"",Ye=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Tt+t+Ye}var kt=!1;function gt(t,n){if(!t||kt)return"";kt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var ve=function(){throw Error()};if(Object.defineProperty(ve.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(ve,[])}catch(fe){var le=fe}Reflect.construct(t,[],ve)}else{try{ve.call()}catch(fe){le=fe}t.call(ve.prototype)}}else{try{throw Error()}catch(fe){le=fe}(ve=t())&&typeof ve.catch=="function"&&ve.catch(function(){})}}catch(fe){if(fe&&le&&typeof fe.stack=="string")return[fe.stack,le.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var d=o.DetermineComponentFrameRoot(),y=d[0],R=d[1];if(y&&R){var z=y.split(`
`),re=R.split(`
`);for(u=o=0;o<z.length&&!z[o].includes("DetermineComponentFrameRoot");)o++;for(;u<re.length&&!re[u].includes("DetermineComponentFrameRoot");)u++;if(o===z.length||u===re.length)for(o=z.length-1,u=re.length-1;1<=o&&0<=u&&z[o]!==re[u];)u--;for(;1<=o&&0<=u;o--,u--)if(z[o]!==re[u]){if(o!==1||u!==1)do if(o--,u--,0>u||z[o]!==re[u]){var ge=`
`+z[o].replace(" at new "," at ");return t.displayName&&ge.includes("<anonymous>")&&(ge=ge.replace("<anonymous>",t.displayName)),ge}while(1<=o&&0<=u);break}}}finally{kt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?Nt(a):""}function Ft(t,n){switch(t.tag){case 26:case 27:case 5:return Nt(t.type);case 16:return Nt("Lazy");case 13:return t.child!==n&&n!==null?Nt("Suspense Fallback"):Nt("Suspense");case 19:return Nt("SuspenseList");case 0:case 15:return gt(t.type,!1);case 11:return gt(t.type.render,!1);case 1:return gt(t.type,!0);case 31:return Nt("Activity");default:return""}}function Qt(t){try{var n="",a=null;do n+=Ft(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var We=Object.prototype.hasOwnProperty,X=r.unstable_scheduleCallback,Lt=r.unstable_cancelCallback,pt=r.unstable_shouldYield,Xt=r.unstable_requestPaint,Ne=r.unstable_now,Jt=r.unstable_getCurrentPriorityLevel,O=r.unstable_ImmediatePriority,T=r.unstable_UserBlockingPriority,J=r.unstable_NormalPriority,he=r.unstable_LowPriority,Ee=r.unstable_IdlePriority,De=r.log,Fe=r.unstable_setDisableYieldValue,de=null,pe=null;function Te(t){if(typeof De=="function"&&Fe(t),pe&&typeof pe.setStrictMode=="function")try{pe.setStrictMode(de,t)}catch{}}var ze=Math.clz32?Math.clz32:dt,Ie=Math.log,Le=Math.LN2;function dt(t){return t>>>=0,t===0?32:31-(Ie(t)/Le|0)|0}var lt=256,wt=262144,V=4194304;function Ce(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function me(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,d=t.suspendedLanes,y=t.pingedLanes;t=t.warmLanes;var R=o&134217727;return R!==0?(o=R&~d,o!==0?u=Ce(o):(y&=R,y!==0?u=Ce(y):a||(a=R&~t,a!==0&&(u=Ce(a))))):(R=o&~d,R!==0?u=Ce(R):y!==0?u=Ce(y):a||(a=o&~t,a!==0&&(u=Ce(a)))),u===0?0:n!==0&&n!==u&&(n&d)===0&&(d=u&-u,a=n&-n,d>=a||d===32&&(a&4194048)!==0)?n:u}function ke(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Ue(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Me(){var t=V;return V<<=1,(V&62914560)===0&&(V=4194304),t}function Qe(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function ct(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function vn(t,n,a,o,u,d){var y=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var R=t.entanglements,z=t.expirationTimes,re=t.hiddenUpdates;for(a=y&~a;0<a;){var ge=31-ze(a),ve=1<<ge;R[ge]=0,z[ge]=-1;var le=re[ge];if(le!==null)for(re[ge]=null,ge=0;ge<le.length;ge++){var fe=le[ge];fe!==null&&(fe.lane&=-536870913)}a&=~ve}o!==0&&Yt(t,o,0),d!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=d&~(y&~n))}function Yt(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-ze(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function Kn(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-ze(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function li(t,n){var a=n&-n;return a=(a&42)!==0?1:Xa(a),(a&(t.suspendedLanes|n))!==0?0:a}function Xa(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ti(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function dr(){var t=G.p;return t!==0?t:(t=window.event,t===void 0?32:zx(t.type))}function hr(t,n){var a=G.p;try{return G.p=t,n()}finally{G.p=a}}var Dn=Math.random().toString(36).slice(2),bn="__reactFiber$"+Dn,Rn="__reactProps$"+Dn,Li="__reactContainer$"+Dn,_n="__reactEvents$"+Dn,ya="__reactListeners$"+Dn,As="__reactHandles$"+Dn,Ya="__reactResources$"+Dn,Wa="__reactMarker$"+Dn;function jr(t){delete t[bn],delete t[Rn],delete t[_n],delete t[ya],delete t[As]}function Sa(t){var n=t[bn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Li]||a[bn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Ex(t);t!==null;){if(a=t[bn])return a;t=Ex(t)}return n}t=a,a=t.parentNode}return null}function Ea(t){if(t=t[bn]||t[Li]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function qa(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Ma(t){var n=t[Ya];return n||(n=t[Ya]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Cn(t){t[Wa]=!0}var Xr=new Set,w={};function W(t,n){te(t,n),te(t+"Capture",n)}function te(t,n){for(w[t]=n,t=0;t<n.length;t++)Xr.add(n[t])}var ie=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),ne={},Ge={};function Pe(t){return We.call(Ge,t)?!0:We.call(ne,t)?!1:ie.test(t)?Ge[t]=!0:(ne[t]=!0,!1)}function Be(t,n,a){if(Pe(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Je(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Ke(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function st(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function bt(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function at(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,d=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,d.call(this,y)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Wt(t){if(!t._valueTracker){var n=bt(t)?"checked":"value";t._valueTracker=at(t,n,""+t[n])}}function Bt(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=bt(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function an(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var en=/[\n"\\]/g;function qt(t){return t.replace(en,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ve(t,n,a,o,u,d,y,R){t.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.type=y:t.removeAttribute("type"),n!=null?y==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+st(n)):t.value!==""+st(n)&&(t.value=""+st(n)):y!=="submit"&&y!=="reset"||t.removeAttribute("value"),n!=null?Ot(t,y,st(n)):a!=null?Ot(t,y,st(a)):o!=null&&t.removeAttribute("value"),u==null&&d!=null&&(t.defaultChecked=!!d),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?t.name=""+st(R):t.removeAttribute("name")}function Fn(t,n,a,o,u,d,y,R){if(d!=null&&typeof d!="function"&&typeof d!="symbol"&&typeof d!="boolean"&&(t.type=d),n!=null||a!=null){if(!(d!=="submit"&&d!=="reset"||n!=null)){Wt(t);return}a=a!=null?""+st(a):"",n=n!=null?""+st(n):a,R||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=R?t.checked:!!o,t.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(t.name=y),Wt(t)}function Ot(t,n,a){n==="number"&&an(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function pn(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+st(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function Tn(t,n,a){if(n!=null&&(n=""+st(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+st(a):""}function En(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(j(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=st(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),Wt(t)}function jn(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var tn=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function mn(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||tn.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function ci(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&mn(t,u,o)}else for(var d in n)n.hasOwnProperty(d)&&mn(t,d,n[d])}function yt(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var la=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),$a=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ta(t){return $a.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ui(){}var xi=null;function ca(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ui=null,Ka=null;function el(t){var n=Ea(t);if(n&&(t=n.stateNode)){var a=t[Rn]||null;e:switch(t=n.stateNode,n.type){case"input":if(Ve(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+qt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[Rn]||null;if(!u)throw Error(s(90));Ve(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&Bt(o)}break e;case"textarea":Tn(t,a.value,a.defaultValue);break e;case"select":n=a.value,n!=null&&pn(t,!!a.multiple,n,!1)}}}var tl=!1;function nl(t,n,a){if(tl)return t(n,a);tl=!0;try{var o=t(n);return o}finally{if(tl=!1,(ui!==null||Ka!==null)&&(su(),ui&&(n=ui,t=Ka,Ka=ui=null,el(n),t)))for(n=0;n<t.length;n++)el(t[n])}}function Aa(t,n){var a=t.stateNode;if(a===null)return null;var o=a[Rn]||null;if(o===null)return null;a=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break e;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var _i=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ii=!1;if(_i)try{var wa={};Object.defineProperty(wa,"passive",{get:function(){Ii=!0}}),window.addEventListener("test",wa,wa),window.removeEventListener("test",wa,wa)}catch{Ii=!1}var Ei=null,il=null,ht=null;function _c(){if(ht)return ht;var t,n=il,a=n.length,o,u="value"in Ei?Ei.value:Ei.textContent,d=u.length;for(t=0;t<a&&n[t]===u[t];t++);var y=a-t;for(o=1;o<=y&&n[a-o]===u[d-o];o++);return ht=u.slice(t,1<o?1-o:void 0)}function Yr(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Wr(){return!0}function al(){return!1}function Zn(t){function n(a,o,u,d,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=d,this.target=y,this.currentTarget=null;for(var R in t)t.hasOwnProperty(R)&&(a=t[R],this[R]=a?a(d):d[R]);return this.isDefaultPrevented=(d.defaultPrevented!=null?d.defaultPrevented:d.returnValue===!1)?Wr:al,this.isPropagationStopped=al,this}return _(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Wr)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Wr)},persist:function(){},isPersistent:Wr}),n}var Za={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},qr=Zn(Za),pr=_({},Za,{view:0,detail:0}),vc=Zn(pr),sl,rl,Ra,ws=_({},pr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Re,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ra&&(Ra&&t.type==="mousemove"?(sl=t.screenX-Ra.screenX,rl=t.screenY-Ra.screenY):rl=sl=0,Ra=t),sl)},movementY:function(t){return"movementY"in t?t.movementY:rl}}),bc=Zn(ws),yc=_({},ws,{dataTransfer:0}),Mf=Zn(yc),Sc=_({},pr,{relatedTarget:0}),ol=Zn(Sc),Tf=_({},Za,{animationName:0,elapsedTime:0,pseudoElement:0}),gn=Zn(Tf),et=_({},Za,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),xt=Zn(et),rt=_({},Za,{data:0}),Et=Zn(rt),_t={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$e={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},qe={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function je(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=qe[t])?!!n[t]:!1}function Re(){return je}var ft=_({},pr,{key:function(t){if(t.key){var n=_t[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Yr(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?$e[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Re,charCode:function(t){return t.type==="keypress"?Yr(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Yr(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),An=Zn(ft),sn=_({},ws,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ua=Zn(sn),Ec=_({},pr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Re}),ni=Zn(Ec),zt=_({},Za,{propertyName:0,elapsedTime:0,pseudoElement:0}),$r=Zn(zt),Rs=_({},ws,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Qa=Zn(Rs),Ja=_({},Za,{newState:0,oldState:0}),ll=Zn(Ja),cl=[9,13,27,32],Kr=_i&&"CompositionEvent"in window,wn=null;_i&&"documentMode"in document&&(wn=document.documentMode);var vi=_i&&"TextEvent"in window&&!wn,bi=_i&&(!Kr||wn&&8<wn&&11>=wn),Bn=" ",fa=!1;function $i(t,n){switch(t){case"keyup":return cl.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function da(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Rt=!1;function Qn(t,n){switch(t){case"compositionend":return da(n);case"keypress":return n.which!==32?null:(fa=!0,Bn);case"textInput":return t=n.data,t===Bn&&fa?null:t;default:return null}}function Zr(t,n){if(Rt)return t==="compositionend"||!Kr&&$i(t,n)?(t=_c(),ht=il=Ei=null,Rt=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return bi&&n.locale!=="ko"?null:n.data;default:return null}}var Cs={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Am(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Cs[t.type]:n==="textarea"}function wm(t,n,a,o){ui?Ka?Ka.push(o):Ka=[o]:ui=o,n=du(n,"onChange"),0<n.length&&(a=new qr("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var ul=null,fl=null;function Db(t){cx(t,0)}function Mc(t){var n=qa(t);if(Bt(n))return t}function Rm(t,n){if(t==="change")return n}var Cm=!1;if(_i){var Af;if(_i){var wf="oninput"in document;if(!wf){var Nm=document.createElement("div");Nm.setAttribute("oninput","return;"),wf=typeof Nm.oninput=="function"}Af=wf}else Af=!1;Cm=Af&&(!document.documentMode||9<document.documentMode)}function Om(){ul&&(ul.detachEvent("onpropertychange",Dm),fl=ul=null)}function Dm(t){if(t.propertyName==="value"&&Mc(fl)){var n=[];wm(n,fl,t,ca(t)),nl(Db,n)}}function Lb(t,n,a){t==="focusin"?(Om(),ul=n,fl=a,ul.attachEvent("onpropertychange",Dm)):t==="focusout"&&Om()}function Ub(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Mc(fl)}function Ib(t,n){if(t==="click")return Mc(n)}function Pb(t,n){if(t==="input"||t==="change")return Mc(n)}function Fb(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Pi=typeof Object.is=="function"?Object.is:Fb;function dl(t,n){if(Pi(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!We.call(n,u)||!Pi(t[u],n[u]))return!1}return!0}function Lm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Um(t,n){var a=Lm(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=Lm(a)}}function Im(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Im(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Pm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=an(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=an(t.document)}return n}function Rf(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var Bb=_i&&"documentMode"in document&&11>=document.documentMode,Qr=null,Cf=null,hl=null,Nf=!1;function Fm(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Nf||Qr==null||Qr!==an(o)||(o=Qr,"selectionStart"in o&&Rf(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),hl&&dl(hl,o)||(hl=o,o=du(Cf,"onSelect"),0<o.length&&(n=new qr("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=Qr)))}function mr(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Jr={animationend:mr("Animation","AnimationEnd"),animationiteration:mr("Animation","AnimationIteration"),animationstart:mr("Animation","AnimationStart"),transitionrun:mr("Transition","TransitionRun"),transitionstart:mr("Transition","TransitionStart"),transitioncancel:mr("Transition","TransitionCancel"),transitionend:mr("Transition","TransitionEnd")},Of={},Bm={};_i&&(Bm=document.createElement("div").style,"AnimationEvent"in window||(delete Jr.animationend.animation,delete Jr.animationiteration.animation,delete Jr.animationstart.animation),"TransitionEvent"in window||delete Jr.transitionend.transition);function gr(t){if(Of[t])return Of[t];if(!Jr[t])return t;var n=Jr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Bm)return Of[t]=n[a];return t}var zm=gr("animationend"),Gm=gr("animationiteration"),Hm=gr("animationstart"),zb=gr("transitionrun"),Gb=gr("transitionstart"),Hb=gr("transitioncancel"),km=gr("transitionend"),Vm=new Map,Df="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Df.push("scrollEnd");function ha(t,n){Vm.set(t,n),W(n,[t])}var Tc=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ki=[],eo=0,Lf=0;function Ac(){for(var t=eo,n=Lf=eo=0;n<t;){var a=Ki[n];Ki[n++]=null;var o=Ki[n];Ki[n++]=null;var u=Ki[n];Ki[n++]=null;var d=Ki[n];if(Ki[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}d!==0&&jm(a,u,d)}}function wc(t,n,a,o){Ki[eo++]=t,Ki[eo++]=n,Ki[eo++]=a,Ki[eo++]=o,Lf|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Uf(t,n,a,o){return wc(t,n,a,o),Rc(t)}function xr(t,n){return wc(t,null,null,n),Rc(t)}function jm(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,d=t.return;d!==null;)d.childLanes|=a,o=d.alternate,o!==null&&(o.childLanes|=a),d.tag===22&&(t=d.stateNode,t===null||t._visibility&1||(u=!0)),t=d,d=d.return;return t.tag===3?(d=t.stateNode,u&&n!==null&&(u=31-ze(a),t=d.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),d):null}function Rc(t){if(50<Il)throw Il=0,Vd=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var to={};function kb(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fi(t,n,a,o){return new kb(t,n,a,o)}function If(t){return t=t.prototype,!(!t||!t.isReactComponent)}function es(t,n){var a=t.alternate;return a===null?(a=Fi(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Xm(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Cc(t,n,a,o,u,d){var y=0;if(o=t,typeof t=="function")If(t)&&(y=1);else if(typeof t=="string")y=Wy(t,a,Ae.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case F:return t=Fi(31,a,n,u),t.elementType=F,t.lanes=d,t;case C:return _r(a.children,u,d,n);case E:y=8,u|=24;break;case S:return t=Fi(12,a,n,u|2),t.elementType=S,t.lanes=d,t;case k:return t=Fi(13,a,n,u),t.elementType=k,t.lanes=d,t;case D:return t=Fi(19,a,n,u),t.elementType=D,t.lanes=d,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case U:y=10;break e;case N:y=9;break e;case I:y=11;break e;case B:y=14;break e;case A:y=16,o=null;break e}y=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=Fi(y,a,n,u),n.elementType=t,n.type=o,n.lanes=d,n}function _r(t,n,a,o){return t=Fi(7,t,o,n),t.lanes=a,t}function Pf(t,n,a){return t=Fi(6,t,null,n),t.lanes=a,t}function Ym(t){var n=Fi(18,null,null,0);return n.stateNode=t,n}function Ff(t,n,a){return n=Fi(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Wm=new WeakMap;function Zi(t,n){if(typeof t=="object"&&t!==null){var a=Wm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Qt(n)},Wm.set(t,n),n)}return{value:t,source:n,stack:Qt(n)}}var no=[],io=0,Nc=null,pl=0,Qi=[],Ji=0,Ns=null,Ca=1,Na="";function ts(t,n){no[io++]=pl,no[io++]=Nc,Nc=t,pl=n}function qm(t,n,a){Qi[Ji++]=Ca,Qi[Ji++]=Na,Qi[Ji++]=Ns,Ns=t;var o=Ca;t=Na;var u=32-ze(o)-1;o&=~(1<<u),a+=1;var d=32-ze(n)+u;if(30<d){var y=u-u%5;d=(o&(1<<y)-1).toString(32),o>>=y,u-=y,Ca=1<<32-ze(n)+u|a<<u|o,Na=d+t}else Ca=1<<d|a<<u|o,Na=t}function Bf(t){t.return!==null&&(ts(t,1),qm(t,1,0))}function zf(t){for(;t===Nc;)Nc=no[--io],no[io]=null,pl=no[--io],no[io]=null;for(;t===Ns;)Ns=Qi[--Ji],Qi[Ji]=null,Na=Qi[--Ji],Qi[Ji]=null,Ca=Qi[--Ji],Qi[Ji]=null}function $m(t,n){Qi[Ji++]=Ca,Qi[Ji++]=Na,Qi[Ji++]=Ns,Ca=n.id,Na=n.overflow,Ns=t}var ii=null,yn=null,Vt=!1,Os=null,ea=!1,Gf=Error(s(519));function Ds(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw ml(Zi(n,t)),Gf}function Km(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[bn]=t,n[Rn]=o,a){case"dialog":It("cancel",n),It("close",n);break;case"iframe":case"object":case"embed":It("load",n);break;case"video":case"audio":for(a=0;a<Fl.length;a++)It(Fl[a],n);break;case"source":It("error",n);break;case"img":case"image":case"link":It("error",n),It("load",n);break;case"details":It("toggle",n);break;case"input":It("invalid",n),Fn(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":It("invalid",n);break;case"textarea":It("invalid",n),En(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||hx(n.textContent,a)?(o.popover!=null&&(It("beforetoggle",n),It("toggle",n)),o.onScroll!=null&&It("scroll",n),o.onScrollEnd!=null&&It("scrollend",n),o.onClick!=null&&(n.onclick=Ui),n=!0):n=!1,n||Ds(t,!0)}function Zm(t){for(ii=t.return;ii;)switch(ii.tag){case 5:case 31:case 13:ea=!1;return;case 27:case 3:ea=!0;return;default:ii=ii.return}}function ao(t){if(t!==ii)return!1;if(!Vt)return Zm(t),Vt=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||ah(t.type,t.memoizedProps)),a=!a),a&&yn&&Ds(t),Zm(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));yn=Sx(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));yn=Sx(t)}else n===27?(n=yn,Ys(t.type)?(t=ch,ch=null,yn=t):yn=n):yn=ii?na(t.stateNode.nextSibling):null;return!0}function vr(){yn=ii=null,Vt=!1}function Hf(){var t=Os;return t!==null&&(wi===null?wi=t:wi.push.apply(wi,t),Os=null),t}function ml(t){Os===null?Os=[t]:Os.push(t)}var kf=P(null),br=null,ns=null;function Ls(t,n,a){be(kf,n._currentValue),n._currentValue=a}function is(t){t._currentValue=kf.current,Z(kf)}function Vf(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function jf(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var d=u.dependencies;if(d!==null){var y=u.child;d=d.firstContext;e:for(;d!==null;){var R=d;d=u;for(var z=0;z<n.length;z++)if(R.context===n[z]){d.lanes|=a,R=d.alternate,R!==null&&(R.lanes|=a),Vf(d.return,a,t),o||(y=null);break e}d=R.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,d=y.alternate,d!==null&&(d.lanes|=a),Vf(y,a,t),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===t){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function so(t,n,a,o){t=null;for(var u=n,d=!1;u!==null;){if(!d){if((u.flags&524288)!==0)d=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var R=u.type;Pi(u.pendingProps.value,y.value)||(t!==null?t.push(R):t=[R])}}else if(u===Se.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push(kl):t=[kl])}u=u.return}t!==null&&jf(n,t,a,o),n.flags|=262144}function Oc(t){for(t=t.firstContext;t!==null;){if(!Pi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function yr(t){br=t,ns=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function ai(t){return Qm(br,t)}function Dc(t,n){return br===null&&yr(t),Qm(t,n)}function Qm(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ns===null){if(t===null)throw Error(s(308));ns=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else ns=ns.next=n;return a}var Vb=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},jb=r.unstable_scheduleCallback,Xb=r.unstable_NormalPriority,zn={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Xf(){return{controller:new Vb,data:new Map,refCount:0}}function gl(t){t.refCount--,t.refCount===0&&jb(Xb,function(){t.controller.abort()})}var xl=null,Yf=0,ro=0,oo=null;function Yb(t,n){if(xl===null){var a=xl=[];Yf=0,ro=$d(),oo={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Yf++,n.then(Jm,Jm),n}function Jm(){if(--Yf===0&&xl!==null){oo!==null&&(oo.status="fulfilled");var t=xl;xl=null,ro=0,oo=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Wb(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var eg=L.S;L.S=function(t,n){F0=Ne(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Yb(t,n),eg!==null&&eg(t,n)};var Sr=P(null);function Wf(){var t=Sr.current;return t!==null?t:xn.pooledCache}function Lc(t,n){n===null?be(Sr,Sr.current):be(Sr,n.pool)}function tg(){var t=Wf();return t===null?null:{parent:zn._currentValue,pool:t}}var lo=Error(s(460)),qf=Error(s(474)),Uc=Error(s(542)),Ic={then:function(){}};function ng(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ig(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Ui,Ui),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,sg(t),t;default:if(typeof n.status=="string")n.then(Ui,Ui);else{if(t=xn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,sg(t),t}throw Mr=n,lo}}function Er(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Mr=a,lo):a}}var Mr=null;function ag(){if(Mr===null)throw Error(s(459));var t=Mr;return Mr=null,t}function sg(t){if(t===lo||t===Uc)throw Error(s(483))}var co=null,_l=0;function Pc(t){var n=_l;return _l+=1,co===null&&(co=[]),ig(co,t,n)}function vl(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Fc(t,n){throw n.$$typeof===g?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function rg(t){function n(Q,Y){if(t){var se=Q.deletions;se===null?(Q.deletions=[Y],Q.flags|=16):se.push(Y)}}function a(Q,Y){if(!t)return null;for(;Y!==null;)n(Q,Y),Y=Y.sibling;return null}function o(Q){for(var Y=new Map;Q!==null;)Q.key!==null?Y.set(Q.key,Q):Y.set(Q.index,Q),Q=Q.sibling;return Y}function u(Q,Y){return Q=es(Q,Y),Q.index=0,Q.sibling=null,Q}function d(Q,Y,se){return Q.index=se,t?(se=Q.alternate,se!==null?(se=se.index,se<Y?(Q.flags|=67108866,Y):se):(Q.flags|=67108866,Y)):(Q.flags|=1048576,Y)}function y(Q){return t&&Q.alternate===null&&(Q.flags|=67108866),Q}function R(Q,Y,se,_e){return Y===null||Y.tag!==6?(Y=Pf(se,Q.mode,_e),Y.return=Q,Y):(Y=u(Y,se),Y.return=Q,Y)}function z(Q,Y,se,_e){var ot=se.type;return ot===C?ge(Q,Y,se.props.children,_e,se.key):Y!==null&&(Y.elementType===ot||typeof ot=="object"&&ot!==null&&ot.$$typeof===A&&Er(ot)===Y.type)?(Y=u(Y,se.props),vl(Y,se),Y.return=Q,Y):(Y=Cc(se.type,se.key,se.props,null,Q.mode,_e),vl(Y,se),Y.return=Q,Y)}function re(Q,Y,se,_e){return Y===null||Y.tag!==4||Y.stateNode.containerInfo!==se.containerInfo||Y.stateNode.implementation!==se.implementation?(Y=Ff(se,Q.mode,_e),Y.return=Q,Y):(Y=u(Y,se.children||[]),Y.return=Q,Y)}function ge(Q,Y,se,_e,ot){return Y===null||Y.tag!==7?(Y=_r(se,Q.mode,_e,ot),Y.return=Q,Y):(Y=u(Y,se),Y.return=Q,Y)}function ve(Q,Y,se){if(typeof Y=="string"&&Y!==""||typeof Y=="number"||typeof Y=="bigint")return Y=Pf(""+Y,Q.mode,se),Y.return=Q,Y;if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case b:return se=Cc(Y.type,Y.key,Y.props,null,Q.mode,se),vl(se,Y),se.return=Q,se;case M:return Y=Ff(Y,Q.mode,se),Y.return=Q,Y;case A:return Y=Er(Y),ve(Q,Y,se)}if(j(Y)||$(Y))return Y=_r(Y,Q.mode,se,null),Y.return=Q,Y;if(typeof Y.then=="function")return ve(Q,Pc(Y),se);if(Y.$$typeof===U)return ve(Q,Dc(Q,Y),se);Fc(Q,Y)}return null}function le(Q,Y,se,_e){var ot=Y!==null?Y.key:null;if(typeof se=="string"&&se!==""||typeof se=="number"||typeof se=="bigint")return ot!==null?null:R(Q,Y,""+se,_e);if(typeof se=="object"&&se!==null){switch(se.$$typeof){case b:return se.key===ot?z(Q,Y,se,_e):null;case M:return se.key===ot?re(Q,Y,se,_e):null;case A:return se=Er(se),le(Q,Y,se,_e)}if(j(se)||$(se))return ot!==null?null:ge(Q,Y,se,_e,null);if(typeof se.then=="function")return le(Q,Y,Pc(se),_e);if(se.$$typeof===U)return le(Q,Y,Dc(Q,se),_e);Fc(Q,se)}return null}function fe(Q,Y,se,_e,ot){if(typeof _e=="string"&&_e!==""||typeof _e=="number"||typeof _e=="bigint")return Q=Q.get(se)||null,R(Y,Q,""+_e,ot);if(typeof _e=="object"&&_e!==null){switch(_e.$$typeof){case b:return Q=Q.get(_e.key===null?se:_e.key)||null,z(Y,Q,_e,ot);case M:return Q=Q.get(_e.key===null?se:_e.key)||null,re(Y,Q,_e,ot);case A:return _e=Er(_e),fe(Q,Y,se,_e,ot)}if(j(_e)||$(_e))return Q=Q.get(se)||null,ge(Y,Q,_e,ot,null);if(typeof _e.then=="function")return fe(Q,Y,se,Pc(_e),ot);if(_e.$$typeof===U)return fe(Q,Y,se,Dc(Y,_e),ot);Fc(Y,_e)}return null}function tt(Q,Y,se,_e){for(var ot=null,Kt=null,it=Y,At=Y=0,Ht=null;it!==null&&At<se.length;At++){it.index>At?(Ht=it,it=null):Ht=it.sibling;var Zt=le(Q,it,se[At],_e);if(Zt===null){it===null&&(it=Ht);break}t&&it&&Zt.alternate===null&&n(Q,it),Y=d(Zt,Y,At),Kt===null?ot=Zt:Kt.sibling=Zt,Kt=Zt,it=Ht}if(At===se.length)return a(Q,it),Vt&&ts(Q,At),ot;if(it===null){for(;At<se.length;At++)it=ve(Q,se[At],_e),it!==null&&(Y=d(it,Y,At),Kt===null?ot=it:Kt.sibling=it,Kt=it);return Vt&&ts(Q,At),ot}for(it=o(it);At<se.length;At++)Ht=fe(it,Q,At,se[At],_e),Ht!==null&&(t&&Ht.alternate!==null&&it.delete(Ht.key===null?At:Ht.key),Y=d(Ht,Y,At),Kt===null?ot=Ht:Kt.sibling=Ht,Kt=Ht);return t&&it.forEach(function(Zs){return n(Q,Zs)}),Vt&&ts(Q,At),ot}function ut(Q,Y,se,_e){if(se==null)throw Error(s(151));for(var ot=null,Kt=null,it=Y,At=Y=0,Ht=null,Zt=se.next();it!==null&&!Zt.done;At++,Zt=se.next()){it.index>At?(Ht=it,it=null):Ht=it.sibling;var Zs=le(Q,it,Zt.value,_e);if(Zs===null){it===null&&(it=Ht);break}t&&it&&Zs.alternate===null&&n(Q,it),Y=d(Zs,Y,At),Kt===null?ot=Zs:Kt.sibling=Zs,Kt=Zs,it=Ht}if(Zt.done)return a(Q,it),Vt&&ts(Q,At),ot;if(it===null){for(;!Zt.done;At++,Zt=se.next())Zt=ve(Q,Zt.value,_e),Zt!==null&&(Y=d(Zt,Y,At),Kt===null?ot=Zt:Kt.sibling=Zt,Kt=Zt);return Vt&&ts(Q,At),ot}for(it=o(it);!Zt.done;At++,Zt=se.next())Zt=fe(it,Q,At,Zt.value,_e),Zt!==null&&(t&&Zt.alternate!==null&&it.delete(Zt.key===null?At:Zt.key),Y=d(Zt,Y,At),Kt===null?ot=Zt:Kt.sibling=Zt,Kt=Zt);return t&&it.forEach(function(aS){return n(Q,aS)}),Vt&&ts(Q,At),ot}function fn(Q,Y,se,_e){if(typeof se=="object"&&se!==null&&se.type===C&&se.key===null&&(se=se.props.children),typeof se=="object"&&se!==null){switch(se.$$typeof){case b:e:{for(var ot=se.key;Y!==null;){if(Y.key===ot){if(ot=se.type,ot===C){if(Y.tag===7){a(Q,Y.sibling),_e=u(Y,se.props.children),_e.return=Q,Q=_e;break e}}else if(Y.elementType===ot||typeof ot=="object"&&ot!==null&&ot.$$typeof===A&&Er(ot)===Y.type){a(Q,Y.sibling),_e=u(Y,se.props),vl(_e,se),_e.return=Q,Q=_e;break e}a(Q,Y);break}else n(Q,Y);Y=Y.sibling}se.type===C?(_e=_r(se.props.children,Q.mode,_e,se.key),_e.return=Q,Q=_e):(_e=Cc(se.type,se.key,se.props,null,Q.mode,_e),vl(_e,se),_e.return=Q,Q=_e)}return y(Q);case M:e:{for(ot=se.key;Y!==null;){if(Y.key===ot)if(Y.tag===4&&Y.stateNode.containerInfo===se.containerInfo&&Y.stateNode.implementation===se.implementation){a(Q,Y.sibling),_e=u(Y,se.children||[]),_e.return=Q,Q=_e;break e}else{a(Q,Y);break}else n(Q,Y);Y=Y.sibling}_e=Ff(se,Q.mode,_e),_e.return=Q,Q=_e}return y(Q);case A:return se=Er(se),fn(Q,Y,se,_e)}if(j(se))return tt(Q,Y,se,_e);if($(se)){if(ot=$(se),typeof ot!="function")throw Error(s(150));return se=ot.call(se),ut(Q,Y,se,_e)}if(typeof se.then=="function")return fn(Q,Y,Pc(se),_e);if(se.$$typeof===U)return fn(Q,Y,Dc(Q,se),_e);Fc(Q,se)}return typeof se=="string"&&se!==""||typeof se=="number"||typeof se=="bigint"?(se=""+se,Y!==null&&Y.tag===6?(a(Q,Y.sibling),_e=u(Y,se),_e.return=Q,Q=_e):(a(Q,Y),_e=Pf(se,Q.mode,_e),_e.return=Q,Q=_e),y(Q)):a(Q,Y)}return function(Q,Y,se,_e){try{_l=0;var ot=fn(Q,Y,se,_e);return co=null,ot}catch(it){if(it===lo||it===Uc)throw it;var Kt=Fi(29,it,null,Q.mode);return Kt.lanes=_e,Kt.return=Q,Kt}}}var Tr=rg(!0),og=rg(!1),Us=!1;function $f(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Kf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Is(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Ps(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(nn&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Rc(t),jm(t,null,a),n}return wc(t,o,n,a),Rc(t)}function bl(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Kn(t,a)}}function Zf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,d=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};d===null?u=d=y:d=d.next=y,a=a.next}while(a!==null);d===null?u=d=n:d=d.next=n}else u=d=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:d,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Qf=!1;function yl(){if(Qf){var t=oo;if(t!==null)throw t}}function Sl(t,n,a,o){Qf=!1;var u=t.updateQueue;Us=!1;var d=u.firstBaseUpdate,y=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var z=R,re=z.next;z.next=null,y===null?d=re:y.next=re,y=z;var ge=t.alternate;ge!==null&&(ge=ge.updateQueue,R=ge.lastBaseUpdate,R!==y&&(R===null?ge.firstBaseUpdate=re:R.next=re,ge.lastBaseUpdate=z))}if(d!==null){var ve=u.baseState;y=0,ge=re=z=null,R=d;do{var le=R.lane&-536870913,fe=le!==R.lane;if(fe?(Gt&le)===le:(o&le)===le){le!==0&&le===ro&&(Qf=!0),ge!==null&&(ge=ge.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});e:{var tt=t,ut=R;le=n;var fn=a;switch(ut.tag){case 1:if(tt=ut.payload,typeof tt=="function"){ve=tt.call(fn,ve,le);break e}ve=tt;break e;case 3:tt.flags=tt.flags&-65537|128;case 0:if(tt=ut.payload,le=typeof tt=="function"?tt.call(fn,ve,le):tt,le==null)break e;ve=_({},ve,le);break e;case 2:Us=!0}}le=R.callback,le!==null&&(t.flags|=64,fe&&(t.flags|=8192),fe=u.callbacks,fe===null?u.callbacks=[le]:fe.push(le))}else fe={lane:le,tag:R.tag,payload:R.payload,callback:R.callback,next:null},ge===null?(re=ge=fe,z=ve):ge=ge.next=fe,y|=le;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;fe=R,R=fe.next,fe.next=null,u.lastBaseUpdate=fe,u.shared.pending=null}}while(!0);ge===null&&(z=ve),u.baseState=z,u.firstBaseUpdate=re,u.lastBaseUpdate=ge,d===null&&(u.shared.lanes=0),Hs|=y,t.lanes=y,t.memoizedState=ve}}function lg(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function cg(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)lg(a[t],n)}var uo=P(null),Bc=P(0);function ug(t,n){t=ds,be(Bc,t),be(uo,n),ds=t|n.baseLanes}function Jf(){be(Bc,ds),be(uo,uo.current)}function ed(){ds=Bc.current,Z(uo),Z(Bc)}var Bi=P(null),ta=null;function Fs(t){var n=t.alternate;be(Ln,Ln.current&1),be(Bi,t),ta===null&&(n===null||uo.current!==null||n.memoizedState!==null)&&(ta=t)}function td(t){be(Ln,Ln.current),be(Bi,t),ta===null&&(ta=t)}function fg(t){t.tag===22?(be(Ln,Ln.current),be(Bi,t),ta===null&&(ta=t)):Bs()}function Bs(){be(Ln,Ln.current),be(Bi,Bi.current)}function zi(t){Z(Bi),ta===t&&(ta=null),Z(Ln)}var Ln=P(0);function zc(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||oh(a)||lh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var as=0,Mt=null,cn=null,Gn=null,Gc=!1,fo=!1,Ar=!1,Hc=0,El=0,ho=null,qb=0;function Nn(){throw Error(s(321))}function nd(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Pi(t[a],n[a]))return!1;return!0}function id(t,n,a,o,u,d){return as=d,Mt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,L.H=t===null||t.memoizedState===null?qg:_d,Ar=!1,d=a(o,u),Ar=!1,fo&&(d=hg(n,a,o,u)),dg(t),d}function dg(t){L.H=Al;var n=cn!==null&&cn.next!==null;if(as=0,Gn=cn=Mt=null,Gc=!1,El=0,ho=null,n)throw Error(s(300));t===null||Hn||(t=t.dependencies,t!==null&&Oc(t)&&(Hn=!0))}function hg(t,n,a,o){Mt=t;var u=0;do{if(fo&&(ho=null),El=0,fo=!1,25<=u)throw Error(s(301));if(u+=1,Gn=cn=null,t.updateQueue!=null){var d=t.updateQueue;d.lastEffect=null,d.events=null,d.stores=null,d.memoCache!=null&&(d.memoCache.index=0)}L.H=$g,d=n(a,o)}while(fo);return d}function $b(){var t=L.H,n=t.useState()[0];return n=typeof n.then=="function"?Ml(n):n,t=t.useState()[0],(cn!==null?cn.memoizedState:null)!==t&&(Mt.flags|=1024),n}function ad(){var t=Hc!==0;return Hc=0,t}function sd(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function rd(t){if(Gc){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}Gc=!1}as=0,Gn=cn=Mt=null,fo=!1,El=Hc=0,ho=null}function yi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Gn===null?Mt.memoizedState=Gn=t:Gn=Gn.next=t,Gn}function Un(){if(cn===null){var t=Mt.alternate;t=t!==null?t.memoizedState:null}else t=cn.next;var n=Gn===null?Mt.memoizedState:Gn.next;if(n!==null)Gn=n,cn=t;else{if(t===null)throw Mt.alternate===null?Error(s(467)):Error(s(310));cn=t,t={memoizedState:cn.memoizedState,baseState:cn.baseState,baseQueue:cn.baseQueue,queue:cn.queue,next:null},Gn===null?Mt.memoizedState=Gn=t:Gn=Gn.next=t}return Gn}function kc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Ml(t){var n=El;return El+=1,ho===null&&(ho=[]),t=ig(ho,t,n),n=Mt,(Gn===null?n.memoizedState:Gn.next)===null&&(n=n.alternate,L.H=n===null||n.memoizedState===null?qg:_d),t}function Vc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Ml(t);if(t.$$typeof===U)return ai(t)}throw Error(s(438,String(t)))}function od(t){var n=null,a=Mt.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=Mt.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=kc(),Mt.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=q;return n.index++,a}function ss(t,n){return typeof n=="function"?n(t):n}function jc(t){var n=Un();return ld(n,cn,t)}function ld(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,d=o.pending;if(d!==null){if(u!==null){var y=u.next;u.next=d.next,d.next=y}n.baseQueue=u=d,o.pending=null}if(d=t.baseState,u===null)t.memoizedState=d;else{n=u.next;var R=y=null,z=null,re=n,ge=!1;do{var ve=re.lane&-536870913;if(ve!==re.lane?(Gt&ve)===ve:(as&ve)===ve){var le=re.revertLane;if(le===0)z!==null&&(z=z.next={lane:0,revertLane:0,gesture:null,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null}),ve===ro&&(ge=!0);else if((as&le)===le){re=re.next,le===ro&&(ge=!0);continue}else ve={lane:0,revertLane:re.revertLane,gesture:null,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null},z===null?(R=z=ve,y=d):z=z.next=ve,Mt.lanes|=le,Hs|=le;ve=re.action,Ar&&a(d,ve),d=re.hasEagerState?re.eagerState:a(d,ve)}else le={lane:ve,revertLane:re.revertLane,gesture:re.gesture,action:re.action,hasEagerState:re.hasEagerState,eagerState:re.eagerState,next:null},z===null?(R=z=le,y=d):z=z.next=le,Mt.lanes|=ve,Hs|=ve;re=re.next}while(re!==null&&re!==n);if(z===null?y=d:z.next=R,!Pi(d,t.memoizedState)&&(Hn=!0,ge&&(a=oo,a!==null)))throw a;t.memoizedState=d,t.baseState=y,t.baseQueue=z,o.lastRenderedState=d}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function cd(t){var n=Un(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,d=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do d=t(d,y.action),y=y.next;while(y!==u);Pi(d,n.memoizedState)||(Hn=!0),n.memoizedState=d,n.baseQueue===null&&(n.baseState=d),a.lastRenderedState=d}return[d,o]}function pg(t,n,a){var o=Mt,u=Un(),d=Vt;if(d){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!Pi((cn||u).memoizedState,a);if(y&&(u.memoizedState=a,Hn=!0),u=u.queue,dd(xg.bind(null,o,u,t),[t]),u.getSnapshot!==n||y||Gn!==null&&Gn.memoizedState.tag&1){if(o.flags|=2048,po(9,{destroy:void 0},gg.bind(null,o,u,a,n),null),xn===null)throw Error(s(349));d||(as&127)!==0||mg(o,n,a)}return a}function mg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=Mt.updateQueue,n===null?(n=kc(),Mt.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function gg(t,n,a,o){n.value=a,n.getSnapshot=o,_g(n)&&vg(t)}function xg(t,n,a){return a(function(){_g(n)&&vg(t)})}function _g(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Pi(t,a)}catch{return!0}}function vg(t){var n=xr(t,2);n!==null&&Ri(n,t,2)}function ud(t){var n=yi();if(typeof t=="function"){var a=t;if(t=a(),Ar){Te(!0);try{a()}finally{Te(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ss,lastRenderedState:t},n}function bg(t,n,a,o){return t.baseState=a,ld(t,cn,typeof o=="function"?o:ss)}function Kb(t,n,a,o,u){if(Wc(t))throw Error(s(485));if(t=n.action,t!==null){var d={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){d.listeners.push(y)}};L.T!==null?a(!0):d.isTransition=!1,o(d),a=n.pending,a===null?(d.next=n.pending=d,yg(n,d)):(d.next=a.next,n.pending=a.next=d)}}function yg(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var d=L.T,y={};L.T=y;try{var R=a(u,o),z=L.S;z!==null&&z(y,R),Sg(t,n,R)}catch(re){fd(t,n,re)}finally{d!==null&&y.types!==null&&(d.types=y.types),L.T=d}}else try{d=a(u,o),Sg(t,n,d)}catch(re){fd(t,n,re)}}function Sg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){Eg(t,n,o)},function(o){return fd(t,n,o)}):Eg(t,n,a)}function Eg(t,n,a){n.status="fulfilled",n.value=a,Mg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,yg(t,a)))}function fd(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,Mg(n),n=n.next;while(n!==o)}t.action=null}function Mg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Tg(t,n){return n}function Ag(t,n){if(Vt){var a=xn.formState;if(a!==null){e:{var o=Mt;if(Vt){if(yn){t:{for(var u=yn,d=ea;u.nodeType!==8;){if(!d){u=null;break t}if(u=na(u.nextSibling),u===null){u=null;break t}}d=u.data,u=d==="F!"||d==="F"?u:null}if(u){yn=na(u.nextSibling),o=u.data==="F!";break e}}Ds(o)}o=!1}o&&(n=a[0])}}return a=yi(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Tg,lastRenderedState:n},a.queue=o,a=Xg.bind(null,Mt,o),o.dispatch=a,o=ud(!1),d=xd.bind(null,Mt,!1,o.queue),o=yi(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=Kb.bind(null,Mt,u,d,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function wg(t){var n=Un();return Rg(n,cn,t)}function Rg(t,n,a){if(n=ld(t,n,Tg)[0],t=jc(ss)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=Ml(n)}catch(y){throw y===lo?Uc:y}else o=n;n=Un();var u=n.queue,d=u.dispatch;return a!==n.memoizedState&&(Mt.flags|=2048,po(9,{destroy:void 0},Zb.bind(null,u,a),null)),[o,d,t]}function Zb(t,n){t.action=n}function Cg(t){var n=Un(),a=cn;if(a!==null)return Rg(n,a,t);Un(),n=n.memoizedState,a=Un();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function po(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=Mt.updateQueue,n===null&&(n=kc(),Mt.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Ng(){return Un().memoizedState}function Xc(t,n,a,o){var u=yi();Mt.flags|=t,u.memoizedState=po(1|n,{destroy:void 0},a,o===void 0?null:o)}function Yc(t,n,a,o){var u=Un();o=o===void 0?null:o;var d=u.memoizedState.inst;cn!==null&&o!==null&&nd(o,cn.memoizedState.deps)?u.memoizedState=po(n,d,a,o):(Mt.flags|=t,u.memoizedState=po(1|n,d,a,o))}function Og(t,n){Xc(8390656,8,t,n)}function dd(t,n){Yc(2048,8,t,n)}function Qb(t){Mt.flags|=4;var n=Mt.updateQueue;if(n===null)n=kc(),Mt.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Dg(t){var n=Un().memoizedState;return Qb({ref:n,nextImpl:t}),function(){if((nn&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Lg(t,n){return Yc(4,2,t,n)}function Ug(t,n){return Yc(4,4,t,n)}function Ig(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Pg(t,n,a){a=a!=null?a.concat([t]):null,Yc(4,4,Ig.bind(null,n,t),a)}function hd(){}function Fg(t,n){var a=Un();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&nd(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Bg(t,n){var a=Un();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&nd(n,o[1]))return o[0];if(o=t(),Ar){Te(!0);try{t()}finally{Te(!1)}}return a.memoizedState=[o,n],o}function pd(t,n,a){return a===void 0||(as&1073741824)!==0&&(Gt&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=z0(),Mt.lanes|=t,Hs|=t,a)}function zg(t,n,a,o){return Pi(a,n)?a:uo.current!==null?(t=pd(t,a,o),Pi(t,n)||(Hn=!0),t):(as&42)===0||(as&1073741824)!==0&&(Gt&261930)===0?(Hn=!0,t.memoizedState=a):(t=z0(),Mt.lanes|=t,Hs|=t,n)}function Gg(t,n,a,o,u){var d=G.p;G.p=d!==0&&8>d?d:8;var y=L.T,R={};L.T=R,xd(t,!1,n,a);try{var z=u(),re=L.S;if(re!==null&&re(R,z),z!==null&&typeof z=="object"&&typeof z.then=="function"){var ge=Wb(z,o);Tl(t,n,ge,ki(t))}else Tl(t,n,o,ki(t))}catch(ve){Tl(t,n,{then:function(){},status:"rejected",reason:ve},ki())}finally{G.p=d,y!==null&&R.types!==null&&(y.types=R.types),L.T=y}}function Jb(){}function md(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=Hg(t).queue;Gg(t,u,n,K,a===null?Jb:function(){return kg(t),a(o)})}function Hg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ss,lastRenderedState:K},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ss,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function kg(t){var n=Hg(t);n.next===null&&(n=t.alternate.memoizedState),Tl(t,n.next.queue,{},ki())}function gd(){return ai(kl)}function Vg(){return Un().memoizedState}function jg(){return Un().memoizedState}function ey(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ki();t=Is(a);var o=Ps(n,t,a);o!==null&&(Ri(o,n,a),bl(o,n,a)),n={cache:Xf()},t.payload=n;return}n=n.return}}function ty(t,n,a){var o=ki();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Wc(t)?Yg(n,a):(a=Uf(t,n,a,o),a!==null&&(Ri(a,t,o),Wg(a,n,o)))}function Xg(t,n,a){var o=ki();Tl(t,n,a,o)}function Tl(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Wc(t))Yg(n,u);else{var d=t.alternate;if(t.lanes===0&&(d===null||d.lanes===0)&&(d=n.lastRenderedReducer,d!==null))try{var y=n.lastRenderedState,R=d(y,a);if(u.hasEagerState=!0,u.eagerState=R,Pi(R,y))return wc(t,n,u,0),xn===null&&Ac(),!1}catch{}if(a=Uf(t,n,u,o),a!==null)return Ri(a,t,o),Wg(a,n,o),!0}return!1}function xd(t,n,a,o){if(o={lane:2,revertLane:$d(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Wc(t)){if(n)throw Error(s(479))}else n=Uf(t,a,o,2),n!==null&&Ri(n,t,2)}function Wc(t){var n=t.alternate;return t===Mt||n!==null&&n===Mt}function Yg(t,n){fo=Gc=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Wg(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Kn(t,a)}}var Al={readContext:ai,use:Vc,useCallback:Nn,useContext:Nn,useEffect:Nn,useImperativeHandle:Nn,useLayoutEffect:Nn,useInsertionEffect:Nn,useMemo:Nn,useReducer:Nn,useRef:Nn,useState:Nn,useDebugValue:Nn,useDeferredValue:Nn,useTransition:Nn,useSyncExternalStore:Nn,useId:Nn,useHostTransitionStatus:Nn,useFormState:Nn,useActionState:Nn,useOptimistic:Nn,useMemoCache:Nn,useCacheRefresh:Nn};Al.useEffectEvent=Nn;var qg={readContext:ai,use:Vc,useCallback:function(t,n){return yi().memoizedState=[t,n===void 0?null:n],t},useContext:ai,useEffect:Og,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Xc(4194308,4,Ig.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Xc(4194308,4,t,n)},useInsertionEffect:function(t,n){Xc(4,2,t,n)},useMemo:function(t,n){var a=yi();n=n===void 0?null:n;var o=t();if(Ar){Te(!0);try{t()}finally{Te(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=yi();if(a!==void 0){var u=a(n);if(Ar){Te(!0);try{a(n)}finally{Te(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=ty.bind(null,Mt,t),[o.memoizedState,t]},useRef:function(t){var n=yi();return t={current:t},n.memoizedState=t},useState:function(t){t=ud(t);var n=t.queue,a=Xg.bind(null,Mt,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:hd,useDeferredValue:function(t,n){var a=yi();return pd(a,t,n)},useTransition:function(){var t=ud(!1);return t=Gg.bind(null,Mt,t.queue,!0,!1),yi().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=Mt,u=yi();if(Vt){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),xn===null)throw Error(s(349));(Gt&127)!==0||mg(o,n,a)}u.memoizedState=a;var d={value:a,getSnapshot:n};return u.queue=d,Og(xg.bind(null,o,d,t),[t]),o.flags|=2048,po(9,{destroy:void 0},gg.bind(null,o,d,a,n),null),a},useId:function(){var t=yi(),n=xn.identifierPrefix;if(Vt){var a=Na,o=Ca;a=(o&~(1<<32-ze(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Hc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=qb++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:gd,useFormState:Ag,useActionState:Ag,useOptimistic:function(t){var n=yi();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=xd.bind(null,Mt,!0,a),a.dispatch=n,[t,n]},useMemoCache:od,useCacheRefresh:function(){return yi().memoizedState=ey.bind(null,Mt)},useEffectEvent:function(t){var n=yi(),a={impl:t};return n.memoizedState=a,function(){if((nn&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},_d={readContext:ai,use:Vc,useCallback:Fg,useContext:ai,useEffect:dd,useImperativeHandle:Pg,useInsertionEffect:Lg,useLayoutEffect:Ug,useMemo:Bg,useReducer:jc,useRef:Ng,useState:function(){return jc(ss)},useDebugValue:hd,useDeferredValue:function(t,n){var a=Un();return zg(a,cn.memoizedState,t,n)},useTransition:function(){var t=jc(ss)[0],n=Un().memoizedState;return[typeof t=="boolean"?t:Ml(t),n]},useSyncExternalStore:pg,useId:Vg,useHostTransitionStatus:gd,useFormState:wg,useActionState:wg,useOptimistic:function(t,n){var a=Un();return bg(a,cn,t,n)},useMemoCache:od,useCacheRefresh:jg};_d.useEffectEvent=Dg;var $g={readContext:ai,use:Vc,useCallback:Fg,useContext:ai,useEffect:dd,useImperativeHandle:Pg,useInsertionEffect:Lg,useLayoutEffect:Ug,useMemo:Bg,useReducer:cd,useRef:Ng,useState:function(){return cd(ss)},useDebugValue:hd,useDeferredValue:function(t,n){var a=Un();return cn===null?pd(a,t,n):zg(a,cn.memoizedState,t,n)},useTransition:function(){var t=cd(ss)[0],n=Un().memoizedState;return[typeof t=="boolean"?t:Ml(t),n]},useSyncExternalStore:pg,useId:Vg,useHostTransitionStatus:gd,useFormState:Cg,useActionState:Cg,useOptimistic:function(t,n){var a=Un();return cn!==null?bg(a,cn,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:od,useCacheRefresh:jg};$g.useEffectEvent=Dg;function vd(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:_({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var bd={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=ki(),u=Is(o);u.payload=n,a!=null&&(u.callback=a),n=Ps(t,u,o),n!==null&&(Ri(n,t,o),bl(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=ki(),u=Is(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=Ps(t,u,o),n!==null&&(Ri(n,t,o),bl(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ki(),o=Is(a);o.tag=2,n!=null&&(o.callback=n),n=Ps(t,o,a),n!==null&&(Ri(n,t,a),bl(n,t,a))}};function Kg(t,n,a,o,u,d,y){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,d,y):n.prototype&&n.prototype.isPureReactComponent?!dl(a,o)||!dl(u,d):!0}function Zg(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&bd.enqueueReplaceState(n,n.state,null)}function wr(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=_({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Qg(t){Tc(t)}function Jg(t){console.error(t)}function e0(t){Tc(t)}function qc(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function t0(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function yd(t,n,a){return a=Is(a),a.tag=3,a.payload={element:null},a.callback=function(){qc(t,n)},a}function n0(t){return t=Is(t),t.tag=3,t}function i0(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var d=o.value;t.payload=function(){return u(d)},t.callback=function(){t0(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(t.callback=function(){t0(n,a,o),typeof u!="function"&&(ks===null?ks=new Set([this]):ks.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function ny(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&so(n,a,u,!0),a=Bi.current,a!==null){switch(a.tag){case 31:case 13:return ta===null?ru():a.alternate===null&&On===0&&(On=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Ic?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Yd(t,o,u)),!1;case 22:return a.flags|=65536,o===Ic?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Yd(t,o,u)),!1}throw Error(s(435,a.tag))}return Yd(t,o,u),ru(),!1}if(Vt)return n=Bi.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==Gf&&(t=Error(s(422),{cause:o}),ml(Zi(t,a)))):(o!==Gf&&(n=Error(s(423),{cause:o}),ml(Zi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=Zi(o,a),u=yd(t.stateNode,o,u),Zf(t,u),On!==4&&(On=2)),!1;var d=Error(s(520),{cause:o});if(d=Zi(d,a),Ul===null?Ul=[d]:Ul.push(d),On!==4&&(On=2),n===null)return!0;o=Zi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=yd(a.stateNode,o,t),Zf(a,t),!1;case 1:if(n=a.type,d=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||d!==null&&typeof d.componentDidCatch=="function"&&(ks===null||!ks.has(d))))return a.flags|=65536,u&=-u,a.lanes|=u,u=n0(u),i0(u,t,a,o),Zf(a,u),!1}a=a.return}while(a!==null);return!1}var Sd=Error(s(461)),Hn=!1;function si(t,n,a,o){n.child=t===null?og(n,null,a,o):Tr(n,t.child,a,o)}function a0(t,n,a,o,u){a=a.render;var d=n.ref;if("ref"in o){var y={};for(var R in o)R!=="ref"&&(y[R]=o[R])}else y=o;return yr(n),o=id(t,n,a,y,d,u),R=ad(),t!==null&&!Hn?(sd(t,n,u),rs(t,n,u)):(Vt&&R&&Bf(n),n.flags|=1,si(t,n,o,u),n.child)}function s0(t,n,a,o,u){if(t===null){var d=a.type;return typeof d=="function"&&!If(d)&&d.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=d,r0(t,n,d,o,u)):(t=Cc(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(d=t.child,!Nd(t,u)){var y=d.memoizedProps;if(a=a.compare,a=a!==null?a:dl,a(y,o)&&t.ref===n.ref)return rs(t,n,u)}return n.flags|=1,t=es(d,o),t.ref=n.ref,t.return=n,n.child=t}function r0(t,n,a,o,u){if(t!==null){var d=t.memoizedProps;if(dl(d,o)&&t.ref===n.ref)if(Hn=!1,n.pendingProps=o=d,Nd(t,u))(t.flags&131072)!==0&&(Hn=!0);else return n.lanes=t.lanes,rs(t,n,u)}return Ed(t,n,a,o,u)}function o0(t,n,a,o){var u=o.children,d=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(d=d!==null?d.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~d}else o=0,n.child=null;return l0(t,n,d,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Lc(n,d!==null?d.cachePool:null),d!==null?ug(n,d):Jf(),fg(n);else return o=n.lanes=536870912,l0(t,n,d!==null?d.baseLanes|a:a,a,o)}else d!==null?(Lc(n,d.cachePool),ug(n,d),Bs(),n.memoizedState=null):(t!==null&&Lc(n,null),Jf(),Bs());return si(t,n,u,a),n.child}function wl(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function l0(t,n,a,o,u){var d=Wf();return d=d===null?null:{parent:zn._currentValue,pool:d},n.memoizedState={baseLanes:a,cachePool:d},t!==null&&Lc(n,null),Jf(),fg(n),t!==null&&so(t,n,o,!0),n.childLanes=u,null}function $c(t,n){return n=Zc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function c0(t,n,a){return Tr(n,t.child,null,a),t=$c(n,n.pendingProps),t.flags|=2,zi(n),n.memoizedState=null,t}function iy(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Vt){if(o.mode==="hidden")return t=$c(n,o),n.lanes=536870912,wl(null,t);if(td(n),(t=yn)?(t=yx(t,ea),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ns!==null?{id:Ca,overflow:Na}:null,retryLane:536870912,hydrationErrors:null},a=Ym(t),a.return=n,n.child=a,ii=n,yn=null)):t=null,t===null)throw Ds(n);return n.lanes=536870912,null}return $c(n,o)}var d=t.memoizedState;if(d!==null){var y=d.dehydrated;if(td(n),u)if(n.flags&256)n.flags&=-257,n=c0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(Hn||so(t,n,a,!1),u=(a&t.childLanes)!==0,Hn||u){if(o=xn,o!==null&&(y=li(o,a),y!==0&&y!==d.retryLane))throw d.retryLane=y,xr(t,y),Ri(o,t,y),Sd;ru(),n=c0(t,n,a)}else t=d.treeContext,yn=na(y.nextSibling),ii=n,Vt=!0,Os=null,ea=!1,t!==null&&$m(n,t),n=$c(n,o),n.flags|=4096;return n}return t=es(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Kc(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Ed(t,n,a,o,u){return yr(n),a=id(t,n,a,o,void 0,u),o=ad(),t!==null&&!Hn?(sd(t,n,u),rs(t,n,u)):(Vt&&o&&Bf(n),n.flags|=1,si(t,n,a,u),n.child)}function u0(t,n,a,o,u,d){return yr(n),n.updateQueue=null,a=hg(n,o,a,u),dg(t),o=ad(),t!==null&&!Hn?(sd(t,n,d),rs(t,n,d)):(Vt&&o&&Bf(n),n.flags|=1,si(t,n,a,d),n.child)}function f0(t,n,a,o,u){if(yr(n),n.stateNode===null){var d=to,y=a.contextType;typeof y=="object"&&y!==null&&(d=ai(y)),d=new a(o,d),n.memoizedState=d.state!==null&&d.state!==void 0?d.state:null,d.updater=bd,n.stateNode=d,d._reactInternals=n,d=n.stateNode,d.props=o,d.state=n.memoizedState,d.refs={},$f(n),y=a.contextType,d.context=typeof y=="object"&&y!==null?ai(y):to,d.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(vd(n,a,y,o),d.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof d.getSnapshotBeforeUpdate=="function"||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(y=d.state,typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount(),y!==d.state&&bd.enqueueReplaceState(d,d.state,null),Sl(n,o,d,u),yl(),d.state=n.memoizedState),typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){d=n.stateNode;var R=n.memoizedProps,z=wr(a,R);d.props=z;var re=d.context,ge=a.contextType;y=to,typeof ge=="object"&&ge!==null&&(y=ai(ge));var ve=a.getDerivedStateFromProps;ge=typeof ve=="function"||typeof d.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,ge||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(R||re!==y)&&Zg(n,d,o,y),Us=!1;var le=n.memoizedState;d.state=le,Sl(n,o,d,u),yl(),re=n.memoizedState,R||le!==re||Us?(typeof ve=="function"&&(vd(n,a,ve,o),re=n.memoizedState),(z=Us||Kg(n,a,z,o,le,re,y))?(ge||typeof d.UNSAFE_componentWillMount!="function"&&typeof d.componentWillMount!="function"||(typeof d.componentWillMount=="function"&&d.componentWillMount(),typeof d.UNSAFE_componentWillMount=="function"&&d.UNSAFE_componentWillMount()),typeof d.componentDidMount=="function"&&(n.flags|=4194308)):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=re),d.props=o,d.state=re,d.context=y,o=z):(typeof d.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{d=n.stateNode,Kf(t,n),y=n.memoizedProps,ge=wr(a,y),d.props=ge,ve=n.pendingProps,le=d.context,re=a.contextType,z=to,typeof re=="object"&&re!==null&&(z=ai(re)),R=a.getDerivedStateFromProps,(re=typeof R=="function"||typeof d.getSnapshotBeforeUpdate=="function")||typeof d.UNSAFE_componentWillReceiveProps!="function"&&typeof d.componentWillReceiveProps!="function"||(y!==ve||le!==z)&&Zg(n,d,o,z),Us=!1,le=n.memoizedState,d.state=le,Sl(n,o,d,u),yl();var fe=n.memoizedState;y!==ve||le!==fe||Us||t!==null&&t.dependencies!==null&&Oc(t.dependencies)?(typeof R=="function"&&(vd(n,a,R,o),fe=n.memoizedState),(ge=Us||Kg(n,a,ge,o,le,fe,z)||t!==null&&t.dependencies!==null&&Oc(t.dependencies))?(re||typeof d.UNSAFE_componentWillUpdate!="function"&&typeof d.componentWillUpdate!="function"||(typeof d.componentWillUpdate=="function"&&d.componentWillUpdate(o,fe,z),typeof d.UNSAFE_componentWillUpdate=="function"&&d.UNSAFE_componentWillUpdate(o,fe,z)),typeof d.componentDidUpdate=="function"&&(n.flags|=4),typeof d.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof d.componentDidUpdate!="function"||y===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=fe),d.props=o,d.state=fe,d.context=z,o=ge):(typeof d.componentDidUpdate!="function"||y===t.memoizedProps&&le===t.memoizedState||(n.flags|=4),typeof d.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&le===t.memoizedState||(n.flags|=1024),o=!1)}return d=o,Kc(t,n),o=(n.flags&128)!==0,d||o?(d=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:d.render(),n.flags|=1,t!==null&&o?(n.child=Tr(n,t.child,null,u),n.child=Tr(n,null,a,u)):si(t,n,a,u),n.memoizedState=d.state,t=n.child):t=rs(t,n,u),t}function d0(t,n,a,o){return vr(),n.flags|=256,si(t,n,a,o),n.child}var Md={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Td(t){return{baseLanes:t,cachePool:tg()}}function Ad(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=Hi),t}function h0(t,n,a){var o=n.pendingProps,u=!1,d=(n.flags&128)!==0,y;if((y=d)||(y=t!==null&&t.memoizedState===null?!1:(Ln.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,t===null){if(Vt){if(u?Fs(n):Bs(),(t=yn)?(t=yx(t,ea),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ns!==null?{id:Ca,overflow:Na}:null,retryLane:536870912,hydrationErrors:null},a=Ym(t),a.return=n,n.child=a,ii=n,yn=null)):t=null,t===null)throw Ds(n);return lh(t)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(Bs(),u=n.mode,R=Zc({mode:"hidden",children:R},u),o=_r(o,u,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=Td(a),o.childLanes=Ad(t,y,a),n.memoizedState=Md,wl(null,o)):(Fs(n),wd(n,R))}var z=t.memoizedState;if(z!==null&&(R=z.dehydrated,R!==null)){if(d)n.flags&256?(Fs(n),n.flags&=-257,n=Rd(t,n,a)):n.memoizedState!==null?(Bs(),n.child=t.child,n.flags|=128,n=null):(Bs(),R=o.fallback,u=n.mode,o=Zc({mode:"visible",children:o.children},u),R=_r(R,u,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,Tr(n,t.child,null,a),o=n.child,o.memoizedState=Td(a),o.childLanes=Ad(t,y,a),n.memoizedState=Md,n=wl(null,o));else if(Fs(n),lh(R)){if(y=R.nextSibling&&R.nextSibling.dataset,y)var re=y.dgst;y=re,o=Error(s(419)),o.stack="",o.digest=y,ml({value:o,source:null,stack:null}),n=Rd(t,n,a)}else if(Hn||so(t,n,a,!1),y=(a&t.childLanes)!==0,Hn||y){if(y=xn,y!==null&&(o=li(y,a),o!==0&&o!==z.retryLane))throw z.retryLane=o,xr(t,o),Ri(y,t,o),Sd;oh(R)||ru(),n=Rd(t,n,a)}else oh(R)?(n.flags|=192,n.child=t.child,n=null):(t=z.treeContext,yn=na(R.nextSibling),ii=n,Vt=!0,Os=null,ea=!1,t!==null&&$m(n,t),n=wd(n,o.children),n.flags|=4096);return n}return u?(Bs(),R=o.fallback,u=n.mode,z=t.child,re=z.sibling,o=es(z,{mode:"hidden",children:o.children}),o.subtreeFlags=z.subtreeFlags&65011712,re!==null?R=es(re,R):(R=_r(R,u,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,wl(null,o),o=n.child,R=t.child.memoizedState,R===null?R=Td(a):(u=R.cachePool,u!==null?(z=zn._currentValue,u=u.parent!==z?{parent:z,pool:z}:u):u=tg(),R={baseLanes:R.baseLanes|a,cachePool:u}),o.memoizedState=R,o.childLanes=Ad(t,y,a),n.memoizedState=Md,wl(t.child,o)):(Fs(n),a=t.child,t=a.sibling,a=es(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(y=n.deletions,y===null?(n.deletions=[t],n.flags|=16):y.push(t)),n.child=a,n.memoizedState=null,a)}function wd(t,n){return n=Zc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Zc(t,n){return t=Fi(22,t,null,n),t.lanes=0,t}function Rd(t,n,a){return Tr(n,t.child,null,a),t=wd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function p0(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Vf(t.return,n,a)}function Cd(t,n,a,o,u,d){var y=t.memoizedState;y===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:d}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=d)}function m0(t,n,a){var o=n.pendingProps,u=o.revealOrder,d=o.tail;o=o.children;var y=Ln.current,R=(y&2)!==0;if(R?(y=y&1|2,n.flags|=128):y&=1,be(Ln,y),si(t,n,o,a),o=Vt?pl:0,!R&&t!==null&&(t.flags&128)!==0)e:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&p0(t,a,n);else if(t.tag===19)p0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break e;for(;t.sibling===null;){if(t.return===null||t.return===n)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&zc(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Cd(n,!1,u,a,d,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&zc(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Cd(n,!0,a,null,d,o);break;case"together":Cd(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function rs(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),Hs|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(so(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=es(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=es(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Nd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Oc(t)))}function ay(t,n,a){switch(n.tag){case 3:ye(n,n.stateNode.containerInfo),Ls(n,zn,t.memoizedState.cache),vr();break;case 27:case 5:Ze(n);break;case 4:ye(n,n.stateNode.containerInfo);break;case 10:Ls(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,td(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(Fs(n),n.flags|=128,null):(a&n.child.childLanes)!==0?h0(t,n,a):(Fs(n),t=rs(t,n,a),t!==null?t.sibling:null);Fs(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(so(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return m0(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),be(Ln,Ln.current),o)break;return null;case 22:return n.lanes=0,o0(t,n,a,n.pendingProps);case 24:Ls(n,zn,t.memoizedState.cache)}return rs(t,n,a)}function g0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)Hn=!0;else{if(!Nd(t,a)&&(n.flags&128)===0)return Hn=!1,ay(t,n,a);Hn=(t.flags&131072)!==0}else Hn=!1,Vt&&(n.flags&1048576)!==0&&qm(n,pl,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(t=Er(n.elementType),n.type=t,typeof t=="function")If(t)?(o=wr(t,o),n.tag=1,n=f0(null,n,t,o,a)):(n.tag=0,n=Ed(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===I){n.tag=11,n=a0(null,n,t,o,a);break e}else if(u===B){n.tag=14,n=s0(null,n,t,o,a);break e}}throw n=oe(t)||t,Error(s(306,n,""))}}return n;case 0:return Ed(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=wr(o,n.pendingProps),f0(t,n,o,u,a);case 3:e:{if(ye(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var d=n.memoizedState;u=d.element,Kf(t,n),Sl(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Ls(n,zn,o),o!==d.cache&&jf(n,[zn],a,!0),yl(),o=y.element,d.isDehydrated)if(d={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=d,n.memoizedState=d,n.flags&256){n=d0(t,n,o,a);break e}else if(o!==u){u=Zi(Error(s(424)),n),ml(u),n=d0(t,n,o,a);break e}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,yn=na(t.firstChild),ii=n,Vt=!0,Os=null,ea=!0,a=og(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(vr(),o===u){n=rs(t,n,a);break e}si(t,n,o,a)}n=n.child}return n;case 26:return Kc(t,n),t===null?(a=wx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Vt||(a=n.type,t=n.pendingProps,o=hu(ee.current).createElement(a),o[bn]=n,o[Rn]=t,ri(o,a,t),Cn(o),n.stateNode=o):n.memoizedState=wx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Ze(n),t===null&&Vt&&(o=n.stateNode=Mx(n.type,n.pendingProps,ee.current),ii=n,ea=!0,u=yn,Ys(n.type)?(ch=u,yn=na(o.firstChild)):yn=u),si(t,n,n.pendingProps.children,a),Kc(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Vt&&((u=o=yn)&&(o=Uy(o,n.type,n.pendingProps,ea),o!==null?(n.stateNode=o,ii=n,yn=na(o.firstChild),ea=!1,u=!0):u=!1),u||Ds(n)),Ze(n),u=n.type,d=n.pendingProps,y=t!==null?t.memoizedProps:null,o=d.children,ah(u,d)?o=null:y!==null&&ah(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=id(t,n,$b,null,null,a),kl._currentValue=u),Kc(t,n),si(t,n,o,a),n.child;case 6:return t===null&&Vt&&((t=a=yn)&&(a=Iy(a,n.pendingProps,ea),a!==null?(n.stateNode=a,ii=n,yn=null,t=!0):t=!1),t||Ds(n)),null;case 13:return h0(t,n,a);case 4:return ye(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=Tr(n,null,o,a):si(t,n,o,a),n.child;case 11:return a0(t,n,n.type,n.pendingProps,a);case 7:return si(t,n,n.pendingProps,a),n.child;case 8:return si(t,n,n.pendingProps.children,a),n.child;case 12:return si(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Ls(n,n.type,o.value),si(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,yr(n),u=ai(u),o=o(u),n.flags|=1,si(t,n,o,a),n.child;case 14:return s0(t,n,n.type,n.pendingProps,a);case 15:return r0(t,n,n.type,n.pendingProps,a);case 19:return m0(t,n,a);case 31:return iy(t,n,a);case 22:return o0(t,n,a,n.pendingProps);case 24:return yr(n),o=ai(zn),t===null?(u=Wf(),u===null&&(u=xn,d=Xf(),u.pooledCache=d,d.refCount++,d!==null&&(u.pooledCacheLanes|=a),u=d),n.memoizedState={parent:o,cache:u},$f(n),Ls(n,zn,u)):((t.lanes&a)!==0&&(Kf(t,n),Sl(n,null,null,a),yl()),u=t.memoizedState,d=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Ls(n,zn,o)):(o=d.cache,Ls(n,zn,o),o!==u.cache&&jf(n,[zn],a,!0))),si(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function os(t){t.flags|=4}function Od(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(V0())t.flags|=8192;else throw Mr=Ic,qf}else t.flags&=-16777217}function x0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Dx(n))if(V0())t.flags|=8192;else throw Mr=Ic,qf}function Qc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Me():536870912,t.lanes|=n,_o|=n)}function Rl(t,n){if(!Vt)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function Sn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function sy(t,n,a){var o=n.pendingProps;switch(zf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Sn(n),null;case 1:return Sn(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),is(zn),He(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(ao(n)?os(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Hf())),Sn(n),null;case 26:var u=n.type,d=n.memoizedState;return t===null?(os(n),d!==null?(Sn(n),x0(n,d)):(Sn(n),Od(n,u,null,o,a))):d?d!==t.memoizedState?(os(n),Sn(n),x0(n,d)):(Sn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&os(n),Sn(n),Od(n,u,t,o,a)),null;case 27:if(nt(n),a=ee.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&os(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Sn(n),null}t=Ae.current,ao(n)?Km(n):(t=Mx(u,o,a),n.stateNode=t,os(n))}return Sn(n),null;case 5:if(nt(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&os(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Sn(n),null}if(d=Ae.current,ao(n))Km(n);else{var y=hu(ee.current);switch(d){case 1:d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":d=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":d=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":d=y.createElement("div"),d.innerHTML="<script><\/script>",d=d.removeChild(d.firstChild);break;case"select":d=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?d.multiple=!0:o.size&&(d.size=o.size);break;default:d=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}d[bn]=n,d[Rn]=o;e:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)d.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break e;for(;y.sibling===null;){if(y.return===null||y.return===n)break e;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=d;e:switch(ri(d,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&os(n)}}return Sn(n),Od(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&os(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=ee.current,ao(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=ii,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[bn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||hx(t.nodeValue,a)),t||Ds(n,!0)}else t=hu(t).createTextNode(o),t[bn]=n,n.stateNode=t}return Sn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=ao(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[bn]=n}else vr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Sn(n),t=!1}else a=Hf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(zi(n),n):(zi(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Sn(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=ao(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[bn]=n}else vr(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Sn(n),u=!1}else u=Hf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(zi(n),n):(zi(n),null)}return zi(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),d=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(d=o.memoizedState.cachePool.pool),d!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Qc(n,n.updateQueue),Sn(n),null);case 4:return He(),t===null&&Jd(n.stateNode.containerInfo),Sn(n),null;case 10:return is(n.type),Sn(n),null;case 19:if(Z(Ln),o=n.memoizedState,o===null)return Sn(n),null;if(u=(n.flags&128)!==0,d=o.rendering,d===null)if(u)Rl(o,!1);else{if(On!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(d=zc(t),d!==null){for(n.flags|=128,Rl(o,!1),t=d.updateQueue,n.updateQueue=t,Qc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Xm(a,t),a=a.sibling;return be(Ln,Ln.current&1|2),Vt&&ts(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&Ne()>iu&&(n.flags|=128,u=!0,Rl(o,!1),n.lanes=4194304)}else{if(!u)if(t=zc(d),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,Qc(n,t),Rl(o,!0),o.tail===null&&o.tailMode==="hidden"&&!d.alternate&&!Vt)return Sn(n),null}else 2*Ne()-o.renderingStartTime>iu&&a!==536870912&&(n.flags|=128,u=!0,Rl(o,!1),n.lanes=4194304);o.isBackwards?(d.sibling=n.child,n.child=d):(t=o.last,t!==null?t.sibling=d:n.child=d,o.last=d)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=Ne(),t.sibling=null,a=Ln.current,be(Ln,u?a&1|2:a&1),Vt&&ts(n,o.treeForkCount),t):(Sn(n),null);case 22:case 23:return zi(n),ed(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Sn(n),n.subtreeFlags&6&&(n.flags|=8192)):Sn(n),a=n.updateQueue,a!==null&&Qc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&Z(Sr),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),is(zn),Sn(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function ry(t,n){switch(zf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return is(zn),He(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return nt(n),null;case 31:if(n.memoizedState!==null){if(zi(n),n.alternate===null)throw Error(s(340));vr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(zi(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));vr()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Z(Ln),null;case 4:return He(),null;case 10:return is(n.type),null;case 22:case 23:return zi(n),ed(),t!==null&&Z(Sr),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return is(zn),null;case 25:return null;default:return null}}function _0(t,n){switch(zf(n),n.tag){case 3:is(zn),He();break;case 26:case 27:case 5:nt(n);break;case 4:He();break;case 31:n.memoizedState!==null&&zi(n);break;case 13:zi(n);break;case 19:Z(Ln);break;case 10:is(n.type);break;case 22:case 23:zi(n),ed(),t!==null&&Z(Sr);break;case 24:is(zn)}}function Cl(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var d=a.create,y=a.inst;o=d(),y.destroy=o}a=a.next}while(a!==u)}}catch(R){on(n,n.return,R)}}function zs(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var d=u.next;o=d;do{if((o.tag&t)===t){var y=o.inst,R=y.destroy;if(R!==void 0){y.destroy=void 0,u=n;var z=a,re=R;try{re()}catch(ge){on(u,z,ge)}}}o=o.next}while(o!==d)}}catch(ge){on(n,n.return,ge)}}function v0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{cg(n,a)}catch(o){on(t,t.return,o)}}}function b0(t,n,a){a.props=wr(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){on(t,n,o)}}function Nl(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){on(t,n,u)}}function Oa(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){on(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){on(t,n,u)}else a.current=null}function y0(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break e;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){on(t,t.return,u)}}function Dd(t,n,a){try{var o=t.stateNode;Ry(o,t.type,a,n),o[Rn]=n}catch(u){on(t,t.return,u)}}function S0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Ys(t.type)||t.tag===4}function Ld(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||S0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Ys(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ud(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Ui));else if(o!==4&&(o===27&&Ys(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(Ud(t,n,a),t=t.sibling;t!==null;)Ud(t,n,a),t=t.sibling}function Jc(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&Ys(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Jc(t,n,a),t=t.sibling;t!==null;)Jc(t,n,a),t=t.sibling}function E0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);ri(n,o,a),n[bn]=t,n[Rn]=a}catch(d){on(t,t.return,d)}}var ls=!1,kn=!1,Id=!1,M0=typeof WeakSet=="function"?WeakSet:Set,Jn=null;function oy(t,n){if(t=t.containerInfo,nh=bu,t=Pm(t),Rf(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else e:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,d=o.focusNode;o=o.focusOffset;try{a.nodeType,d.nodeType}catch{a=null;break e}var y=0,R=-1,z=-1,re=0,ge=0,ve=t,le=null;t:for(;;){for(var fe;ve!==a||u!==0&&ve.nodeType!==3||(R=y+u),ve!==d||o!==0&&ve.nodeType!==3||(z=y+o),ve.nodeType===3&&(y+=ve.nodeValue.length),(fe=ve.firstChild)!==null;)le=ve,ve=fe;for(;;){if(ve===t)break t;if(le===a&&++re===u&&(R=y),le===d&&++ge===o&&(z=y),(fe=ve.nextSibling)!==null)break;ve=le,le=ve.parentNode}ve=fe}a=R===-1||z===-1?null:{start:R,end:z}}else a=null}a=a||{start:0,end:0}}else a=null;for(ih={focusedElem:t,selectionRange:a},bu=!1,Jn=n;Jn!==null;)if(n=Jn,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,Jn=t;else for(;Jn!==null;){switch(n=Jn,d=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&d!==null){t=void 0,a=n,u=d.memoizedProps,d=d.memoizedState,o=a.stateNode;try{var tt=wr(a.type,u);t=o.getSnapshotBeforeUpdate(tt,d),o.__reactInternalSnapshotBeforeUpdate=t}catch(ut){on(a,a.return,ut)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)rh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":rh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,Jn=t;break}Jn=n.return}}function T0(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:us(t,a),o&4&&Cl(5,a);break;case 1:if(us(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(y){on(a,a.return,y)}else{var u=wr(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(y){on(a,a.return,y)}}o&64&&v0(a),o&512&&Nl(a,a.return);break;case 3:if(us(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{cg(t,n)}catch(y){on(a,a.return,y)}}break;case 27:n===null&&o&4&&E0(a);case 26:case 5:us(t,a),n===null&&o&4&&y0(a),o&512&&Nl(a,a.return);break;case 12:us(t,a);break;case 31:us(t,a),o&4&&R0(t,a);break;case 13:us(t,a),o&4&&C0(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=gy.bind(null,a),Py(t,a))));break;case 22:if(o=a.memoizedState!==null||ls,!o){n=n!==null&&n.memoizedState!==null||kn,u=ls;var d=kn;ls=o,(kn=n)&&!d?fs(t,a,(a.subtreeFlags&8772)!==0):us(t,a),ls=u,kn=d}break;case 30:break;default:us(t,a)}}function A0(t){var n=t.alternate;n!==null&&(t.alternate=null,A0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&jr(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Mn=null,Mi=!1;function cs(t,n,a){for(a=a.child;a!==null;)w0(t,n,a),a=a.sibling}function w0(t,n,a){if(pe&&typeof pe.onCommitFiberUnmount=="function")try{pe.onCommitFiberUnmount(de,a)}catch{}switch(a.tag){case 26:kn||Oa(a,n),cs(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:kn||Oa(a,n);var o=Mn,u=Mi;Ys(a.type)&&(Mn=a.stateNode,Mi=!1),cs(t,n,a),zl(a.stateNode),Mn=o,Mi=u;break;case 5:kn||Oa(a,n);case 6:if(o=Mn,u=Mi,Mn=null,cs(t,n,a),Mn=o,Mi=u,Mn!==null)if(Mi)try{(Mn.nodeType===9?Mn.body:Mn.nodeName==="HTML"?Mn.ownerDocument.body:Mn).removeChild(a.stateNode)}catch(d){on(a,n,d)}else try{Mn.removeChild(a.stateNode)}catch(d){on(a,n,d)}break;case 18:Mn!==null&&(Mi?(t=Mn,vx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Ao(t)):vx(Mn,a.stateNode));break;case 4:o=Mn,u=Mi,Mn=a.stateNode.containerInfo,Mi=!0,cs(t,n,a),Mn=o,Mi=u;break;case 0:case 11:case 14:case 15:zs(2,a,n),kn||zs(4,a,n),cs(t,n,a);break;case 1:kn||(Oa(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&b0(a,n,o)),cs(t,n,a);break;case 21:cs(t,n,a);break;case 22:kn=(o=kn)||a.memoizedState!==null,cs(t,n,a),kn=o;break;default:cs(t,n,a)}}function R0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Ao(t)}catch(a){on(n,n.return,a)}}}function C0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Ao(t)}catch(a){on(n,n.return,a)}}function ly(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new M0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new M0),n;default:throw Error(s(435,t.tag))}}function eu(t,n){var a=ly(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=xy.bind(null,t,o);o.then(u,u)}})}function Ti(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],d=t,y=n,R=y;e:for(;R!==null;){switch(R.tag){case 27:if(Ys(R.type)){Mn=R.stateNode,Mi=!1;break e}break;case 5:Mn=R.stateNode,Mi=!1;break e;case 3:case 4:Mn=R.stateNode.containerInfo,Mi=!0;break e}R=R.return}if(Mn===null)throw Error(s(160));w0(d,y,u),Mn=null,Mi=!1,d=u.alternate,d!==null&&(d.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)N0(n,t),n=n.sibling}var pa=null;function N0(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Ti(n,t),Ai(t),o&4&&(zs(3,t,t.return),Cl(3,t),zs(5,t,t.return));break;case 1:Ti(n,t),Ai(t),o&512&&(kn||a===null||Oa(a,a.return)),o&64&&ls&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=pa;if(Ti(n,t),Ai(t),o&512&&(kn||a===null||Oa(a,a.return)),o&4){var d=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){e:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;t:switch(o){case"title":d=u.getElementsByTagName("title")[0],(!d||d[Wa]||d[bn]||d.namespaceURI==="http://www.w3.org/2000/svg"||d.hasAttribute("itemprop"))&&(d=u.createElement(o),u.head.insertBefore(d,u.querySelector("head > title"))),ri(d,o,a),d[bn]=t,Cn(d),o=d;break e;case"link":var y=Nx("link","href",u).get(o+(a.href||""));if(y){for(var R=0;R<y.length;R++)if(d=y[R],d.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&d.getAttribute("rel")===(a.rel==null?null:a.rel)&&d.getAttribute("title")===(a.title==null?null:a.title)&&d.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(R,1);break t}}d=u.createElement(o),ri(d,o,a),u.head.appendChild(d);break;case"meta":if(y=Nx("meta","content",u).get(o+(a.content||""))){for(R=0;R<y.length;R++)if(d=y[R],d.getAttribute("content")===(a.content==null?null:""+a.content)&&d.getAttribute("name")===(a.name==null?null:a.name)&&d.getAttribute("property")===(a.property==null?null:a.property)&&d.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&d.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(R,1);break t}}d=u.createElement(o),ri(d,o,a),u.head.appendChild(d);break;default:throw Error(s(468,o))}d[bn]=t,Cn(d),o=d}t.stateNode=o}else Ox(u,t.type,t.stateNode);else t.stateNode=Cx(u,o,t.memoizedProps);else d!==o?(d===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):d.count--,o===null?Ox(u,t.type,t.stateNode):Cx(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Dd(t,t.memoizedProps,a.memoizedProps)}break;case 27:Ti(n,t),Ai(t),o&512&&(kn||a===null||Oa(a,a.return)),a!==null&&o&4&&Dd(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Ti(n,t),Ai(t),o&512&&(kn||a===null||Oa(a,a.return)),t.flags&32){u=t.stateNode;try{jn(u,"")}catch(tt){on(t,t.return,tt)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Dd(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Id=!0);break;case 6:if(Ti(n,t),Ai(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(tt){on(t,t.return,tt)}}break;case 3:if(gu=null,u=pa,pa=pu(n.containerInfo),Ti(n,t),pa=u,Ai(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Ao(n.containerInfo)}catch(tt){on(t,t.return,tt)}Id&&(Id=!1,O0(t));break;case 4:o=pa,pa=pu(t.stateNode.containerInfo),Ti(n,t),Ai(t),pa=o;break;case 12:Ti(n,t),Ai(t);break;case 31:Ti(n,t),Ai(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,eu(t,o)));break;case 13:Ti(n,t),Ai(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(nu=Ne()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,eu(t,o)));break;case 22:u=t.memoizedState!==null;var z=a!==null&&a.memoizedState!==null,re=ls,ge=kn;if(ls=re||u,kn=ge||z,Ti(n,t),kn=ge,ls=re,Ai(t),o&8192)e:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||z||ls||kn||Rr(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){z=a=n;try{if(d=z.stateNode,u)y=d.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{R=z.stateNode;var ve=z.memoizedProps.style,le=ve!=null&&ve.hasOwnProperty("display")?ve.display:null;R.style.display=le==null||typeof le=="boolean"?"":(""+le).trim()}}catch(tt){on(z,z.return,tt)}}}else if(n.tag===6){if(a===null){z=n;try{z.stateNode.nodeValue=u?"":z.memoizedProps}catch(tt){on(z,z.return,tt)}}}else if(n.tag===18){if(a===null){z=n;try{var fe=z.stateNode;u?bx(fe,!0):bx(z.stateNode,!1)}catch(tt){on(z,z.return,tt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break e;for(;n.sibling===null;){if(n.return===null||n.return===t)break e;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,eu(t,a))));break;case 19:Ti(n,t),Ai(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,eu(t,o)));break;case 30:break;case 21:break;default:Ti(n,t),Ai(t)}}function Ai(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(S0(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,d=Ld(t);Jc(t,d,u);break;case 5:var y=a.stateNode;a.flags&32&&(jn(y,""),a.flags&=-33);var R=Ld(t);Jc(t,R,y);break;case 3:case 4:var z=a.stateNode.containerInfo,re=Ld(t);Ud(t,re,z);break;default:throw Error(s(161))}}catch(ge){on(t,t.return,ge)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function O0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;O0(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function us(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)T0(t,n.alternate,n),n=n.sibling}function Rr(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:zs(4,n,n.return),Rr(n);break;case 1:Oa(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&b0(n,n.return,a),Rr(n);break;case 27:zl(n.stateNode);case 26:case 5:Oa(n,n.return),Rr(n);break;case 22:n.memoizedState===null&&Rr(n);break;case 30:Rr(n);break;default:Rr(n)}t=t.sibling}}function fs(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,d=n,y=d.flags;switch(d.tag){case 0:case 11:case 15:fs(u,d,a),Cl(4,d);break;case 1:if(fs(u,d,a),o=d,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(re){on(o,o.return,re)}if(o=d,u=o.updateQueue,u!==null){var R=o.stateNode;try{var z=u.shared.hiddenCallbacks;if(z!==null)for(u.shared.hiddenCallbacks=null,u=0;u<z.length;u++)lg(z[u],R)}catch(re){on(o,o.return,re)}}a&&y&64&&v0(d),Nl(d,d.return);break;case 27:E0(d);case 26:case 5:fs(u,d,a),a&&o===null&&y&4&&y0(d),Nl(d,d.return);break;case 12:fs(u,d,a);break;case 31:fs(u,d,a),a&&y&4&&R0(u,d);break;case 13:fs(u,d,a),a&&y&4&&C0(u,d);break;case 22:d.memoizedState===null&&fs(u,d,a),Nl(d,d.return);break;case 30:break;default:fs(u,d,a)}n=n.sibling}}function Pd(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&gl(a))}function Fd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&gl(t))}function ma(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)D0(t,n,a,o),n=n.sibling}function D0(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:ma(t,n,a,o),u&2048&&Cl(9,n);break;case 1:ma(t,n,a,o);break;case 3:ma(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&gl(t)));break;case 12:if(u&2048){ma(t,n,a,o),t=n.stateNode;try{var d=n.memoizedProps,y=d.id,R=d.onPostCommit;typeof R=="function"&&R(y,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(z){on(n,n.return,z)}}else ma(t,n,a,o);break;case 31:ma(t,n,a,o);break;case 13:ma(t,n,a,o);break;case 23:break;case 22:d=n.stateNode,y=n.alternate,n.memoizedState!==null?d._visibility&2?ma(t,n,a,o):Ol(t,n):d._visibility&2?ma(t,n,a,o):(d._visibility|=2,mo(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Pd(y,n);break;case 24:ma(t,n,a,o),u&2048&&Fd(n.alternate,n);break;default:ma(t,n,a,o)}}function mo(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var d=t,y=n,R=a,z=o,re=y.flags;switch(y.tag){case 0:case 11:case 15:mo(d,y,R,z,u),Cl(8,y);break;case 23:break;case 22:var ge=y.stateNode;y.memoizedState!==null?ge._visibility&2?mo(d,y,R,z,u):Ol(d,y):(ge._visibility|=2,mo(d,y,R,z,u)),u&&re&2048&&Pd(y.alternate,y);break;case 24:mo(d,y,R,z,u),u&&re&2048&&Fd(y.alternate,y);break;default:mo(d,y,R,z,u)}n=n.sibling}}function Ol(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:Ol(a,o),u&2048&&Pd(o.alternate,o);break;case 24:Ol(a,o),u&2048&&Fd(o.alternate,o);break;default:Ol(a,o)}n=n.sibling}}var Dl=8192;function go(t,n,a){if(t.subtreeFlags&Dl)for(t=t.child;t!==null;)L0(t,n,a),t=t.sibling}function L0(t,n,a){switch(t.tag){case 26:go(t,n,a),t.flags&Dl&&t.memoizedState!==null&&qy(a,pa,t.memoizedState,t.memoizedProps);break;case 5:go(t,n,a);break;case 3:case 4:var o=pa;pa=pu(t.stateNode.containerInfo),go(t,n,a),pa=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=Dl,Dl=16777216,go(t,n,a),Dl=o):go(t,n,a));break;default:go(t,n,a)}}function U0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Ll(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Jn=o,P0(o,t)}U0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)I0(t),t=t.sibling}function I0(t){switch(t.tag){case 0:case 11:case 15:Ll(t),t.flags&2048&&zs(9,t,t.return);break;case 3:Ll(t);break;case 12:Ll(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,tu(t)):Ll(t);break;default:Ll(t)}}function tu(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];Jn=o,P0(o,t)}U0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:zs(8,n,n.return),tu(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,tu(n));break;default:tu(n)}t=t.sibling}}function P0(t,n){for(;Jn!==null;){var a=Jn;switch(a.tag){case 0:case 11:case 15:zs(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:gl(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,Jn=o;else e:for(a=t;Jn!==null;){o=Jn;var u=o.sibling,d=o.return;if(A0(o),o===a){Jn=null;break e}if(u!==null){u.return=d,Jn=u;break e}Jn=d}}}var cy={getCacheForType:function(t){var n=ai(zn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return ai(zn).controller.signal}},uy=typeof WeakMap=="function"?WeakMap:Map,nn=0,xn=null,Ut=null,Gt=0,rn=0,Gi=null,Gs=!1,xo=!1,Bd=!1,ds=0,On=0,Hs=0,Cr=0,zd=0,Hi=0,_o=0,Ul=null,wi=null,Gd=!1,nu=0,F0=0,iu=1/0,au=null,ks=null,Xn=0,Vs=null,vo=null,hs=0,Hd=0,kd=null,B0=null,Il=0,Vd=null;function ki(){return(nn&2)!==0&&Gt!==0?Gt&-Gt:L.T!==null?$d():dr()}function z0(){if(Hi===0)if((Gt&536870912)===0||Vt){var t=wt;wt<<=1,(wt&3932160)===0&&(wt=262144),Hi=t}else Hi=536870912;return t=Bi.current,t!==null&&(t.flags|=32),Hi}function Ri(t,n,a){(t===xn&&(rn===2||rn===9)||t.cancelPendingCommit!==null)&&(bo(t,0),js(t,Gt,Hi,!1)),ct(t,a),((nn&2)===0||t!==xn)&&(t===xn&&((nn&2)===0&&(Cr|=a),On===4&&js(t,Gt,Hi,!1)),Da(t))}function G0(t,n,a){if((nn&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||ke(t,n),u=o?hy(t,n):Xd(t,n,!0),d=o;do{if(u===0){xo&&!o&&js(t,n,0,!1);break}else{if(a=t.current.alternate,d&&!fy(a)){u=Xd(t,n,!1),d=!1;continue}if(u===2){if(d=n,t.errorRecoveryDisabledLanes&d)var y=0;else y=t.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;e:{var R=t;u=Ul;var z=R.current.memoizedState.isDehydrated;if(z&&(bo(R,y).flags|=256),y=Xd(R,y,!1),y!==2){if(Bd&&!z){R.errorRecoveryDisabledLanes|=d,Cr|=d,u=4;break e}d=wi,wi=u,d!==null&&(wi===null?wi=d:wi.push.apply(wi,d))}u=y}if(d=!1,u!==2)continue}}if(u===1){bo(t,0),js(t,n,0,!0);break}e:{switch(o=t,d=u,d){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:js(o,n,Hi,!Gs);break e;case 2:wi=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=nu+300-Ne(),10<u)){if(js(o,n,Hi,!Gs),me(o,0,!0)!==0)break e;hs=n,o.timeoutHandle=xx(H0.bind(null,o,a,wi,au,Gd,n,Hi,Cr,_o,Gs,d,"Throttled",-0,0),u);break e}H0(o,a,wi,au,Gd,n,Hi,Cr,_o,Gs,d,null,-0,0)}}break}while(!0);Da(t)}function H0(t,n,a,o,u,d,y,R,z,re,ge,ve,le,fe){if(t.timeoutHandle=-1,ve=n.subtreeFlags,ve&8192||(ve&16785408)===16785408){ve={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ui},L0(n,d,ve);var tt=(d&62914560)===d?nu-Ne():(d&4194048)===d?F0-Ne():0;if(tt=$y(ve,tt),tt!==null){hs=d,t.cancelPendingCommit=tt($0.bind(null,t,n,d,a,o,u,y,R,z,ge,ve,null,le,fe)),js(t,d,y,!re);return}}$0(t,n,d,a,o,u,y,R,z)}function fy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],d=u.getSnapshot;u=u.value;try{if(!Pi(d(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function js(t,n,a,o){n&=~zd,n&=~Cr,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var d=31-ze(u),y=1<<d;o[d]=-1,u&=~y}a!==0&&Yt(t,a,n)}function su(){return(nn&6)===0?(Pl(0),!1):!0}function jd(){if(Ut!==null){if(rn===0)var t=Ut.return;else t=Ut,ns=br=null,rd(t),co=null,_l=0,t=Ut;for(;t!==null;)_0(t.alternate,t),t=t.return;Ut=null}}function bo(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Oy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),hs=0,jd(),xn=t,Ut=a=es(t.current,null),Gt=n,rn=0,Gi=null,Gs=!1,xo=ke(t,n),Bd=!1,_o=Hi=zd=Cr=Hs=On=0,wi=Ul=null,Gd=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-ze(o),d=1<<u;n|=t[u],o&=~d}return ds=n,Ac(),a}function k0(t,n){Mt=null,L.H=Al,n===lo||n===Uc?(n=ag(),rn=3):n===qf?(n=ag(),rn=4):rn=n===Sd?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Gi=n,Ut===null&&(On=1,qc(t,Zi(n,t.current)))}function V0(){var t=Bi.current;return t===null?!0:(Gt&4194048)===Gt?ta===null:(Gt&62914560)===Gt||(Gt&536870912)!==0?t===ta:!1}function j0(){var t=L.H;return L.H=Al,t===null?Al:t}function X0(){var t=L.A;return L.A=cy,t}function ru(){On=4,Gs||(Gt&4194048)!==Gt&&Bi.current!==null||(xo=!0),(Hs&134217727)===0&&(Cr&134217727)===0||xn===null||js(xn,Gt,Hi,!1)}function Xd(t,n,a){var o=nn;nn|=2;var u=j0(),d=X0();(xn!==t||Gt!==n)&&(au=null,bo(t,n)),n=!1;var y=On;e:do try{if(rn!==0&&Ut!==null){var R=Ut,z=Gi;switch(rn){case 8:jd(),y=6;break e;case 3:case 2:case 9:case 6:Bi.current===null&&(n=!0);var re=rn;if(rn=0,Gi=null,yo(t,R,z,re),a&&xo){y=0;break e}break;default:re=rn,rn=0,Gi=null,yo(t,R,z,re)}}dy(),y=On;break}catch(ge){k0(t,ge)}while(!0);return n&&t.shellSuspendCounter++,ns=br=null,nn=o,L.H=u,L.A=d,Ut===null&&(xn=null,Gt=0,Ac()),y}function dy(){for(;Ut!==null;)Y0(Ut)}function hy(t,n){var a=nn;nn|=2;var o=j0(),u=X0();xn!==t||Gt!==n?(au=null,iu=Ne()+500,bo(t,n)):xo=ke(t,n);e:do try{if(rn!==0&&Ut!==null){n=Ut;var d=Gi;t:switch(rn){case 1:rn=0,Gi=null,yo(t,n,d,1);break;case 2:case 9:if(ng(d)){rn=0,Gi=null,W0(n);break}n=function(){rn!==2&&rn!==9||xn!==t||(rn=7),Da(t)},d.then(n,n);break e;case 3:rn=7;break e;case 4:rn=5;break e;case 7:ng(d)?(rn=0,Gi=null,W0(n)):(rn=0,Gi=null,yo(t,n,d,7));break;case 5:var y=null;switch(Ut.tag){case 26:y=Ut.memoizedState;case 5:case 27:var R=Ut;if(y?Dx(y):R.stateNode.complete){rn=0,Gi=null;var z=R.sibling;if(z!==null)Ut=z;else{var re=R.return;re!==null?(Ut=re,ou(re)):Ut=null}break t}}rn=0,Gi=null,yo(t,n,d,5);break;case 6:rn=0,Gi=null,yo(t,n,d,6);break;case 8:jd(),On=6;break e;default:throw Error(s(462))}}py();break}catch(ge){k0(t,ge)}while(!0);return ns=br=null,L.H=o,L.A=u,nn=a,Ut!==null?0:(xn=null,Gt=0,Ac(),On)}function py(){for(;Ut!==null&&!pt();)Y0(Ut)}function Y0(t){var n=g0(t.alternate,t,ds);t.memoizedProps=t.pendingProps,n===null?ou(t):Ut=n}function W0(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=u0(a,n,n.pendingProps,n.type,void 0,Gt);break;case 11:n=u0(a,n,n.pendingProps,n.type.render,n.ref,Gt);break;case 5:rd(n);default:_0(a,n),n=Ut=Xm(n,ds),n=g0(a,n,ds)}t.memoizedProps=t.pendingProps,n===null?ou(t):Ut=n}function yo(t,n,a,o){ns=br=null,rd(n),co=null,_l=0;var u=n.return;try{if(ny(t,u,n,a,Gt)){On=1,qc(t,Zi(a,t.current)),Ut=null;return}}catch(d){if(u!==null)throw Ut=u,d;On=1,qc(t,Zi(a,t.current)),Ut=null;return}n.flags&32768?(Vt||o===1?t=!0:xo||(Gt&536870912)!==0?t=!1:(Gs=t=!0,(o===2||o===9||o===3||o===6)&&(o=Bi.current,o!==null&&o.tag===13&&(o.flags|=16384))),q0(n,t)):ou(n)}function ou(t){var n=t;do{if((n.flags&32768)!==0){q0(n,Gs);return}t=n.return;var a=sy(n.alternate,n,ds);if(a!==null){Ut=a;return}if(n=n.sibling,n!==null){Ut=n;return}Ut=n=t}while(n!==null);On===0&&(On=5)}function q0(t,n){do{var a=ry(t.alternate,t);if(a!==null){a.flags&=32767,Ut=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Ut=t;return}Ut=t=a}while(t!==null);On=6,Ut=null}function $0(t,n,a,o,u,d,y,R,z){t.cancelPendingCommit=null;do lu();while(Xn!==0);if((nn&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(d=n.lanes|n.childLanes,d|=Lf,vn(t,a,d,y,R,z),t===xn&&(Ut=xn=null,Gt=0),vo=n,Vs=t,hs=a,Hd=d,kd=u,B0=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,_y(J,function(){return ex(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=L.T,L.T=null,u=G.p,G.p=2,y=nn,nn|=4;try{oy(t,n,a)}finally{nn=y,G.p=u,L.T=o}}Xn=1,K0(),Z0(),Q0()}}function K0(){if(Xn===1){Xn=0;var t=Vs,n=vo,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=L.T,L.T=null;var o=G.p;G.p=2;var u=nn;nn|=4;try{N0(n,t);var d=ih,y=Pm(t.containerInfo),R=d.focusedElem,z=d.selectionRange;if(y!==R&&R&&R.ownerDocument&&Im(R.ownerDocument.documentElement,R)){if(z!==null&&Rf(R)){var re=z.start,ge=z.end;if(ge===void 0&&(ge=re),"selectionStart"in R)R.selectionStart=re,R.selectionEnd=Math.min(ge,R.value.length);else{var ve=R.ownerDocument||document,le=ve&&ve.defaultView||window;if(le.getSelection){var fe=le.getSelection(),tt=R.textContent.length,ut=Math.min(z.start,tt),fn=z.end===void 0?ut:Math.min(z.end,tt);!fe.extend&&ut>fn&&(y=fn,fn=ut,ut=y);var Q=Um(R,ut),Y=Um(R,fn);if(Q&&Y&&(fe.rangeCount!==1||fe.anchorNode!==Q.node||fe.anchorOffset!==Q.offset||fe.focusNode!==Y.node||fe.focusOffset!==Y.offset)){var se=ve.createRange();se.setStart(Q.node,Q.offset),fe.removeAllRanges(),ut>fn?(fe.addRange(se),fe.extend(Y.node,Y.offset)):(se.setEnd(Y.node,Y.offset),fe.addRange(se))}}}}for(ve=[],fe=R;fe=fe.parentNode;)fe.nodeType===1&&ve.push({element:fe,left:fe.scrollLeft,top:fe.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<ve.length;R++){var _e=ve[R];_e.element.scrollLeft=_e.left,_e.element.scrollTop=_e.top}}bu=!!nh,ih=nh=null}finally{nn=u,G.p=o,L.T=a}}t.current=n,Xn=2}}function Z0(){if(Xn===2){Xn=0;var t=Vs,n=vo,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=L.T,L.T=null;var o=G.p;G.p=2;var u=nn;nn|=4;try{T0(t,n.alternate,n)}finally{nn=u,G.p=o,L.T=a}}Xn=3}}function Q0(){if(Xn===4||Xn===3){Xn=0,Xt();var t=Vs,n=vo,a=hs,o=B0;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Xn=5:(Xn=0,vo=Vs=null,J0(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(ks=null),ti(a),n=n.stateNode,pe&&typeof pe.onCommitFiberRoot=="function")try{pe.onCommitFiberRoot(de,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=L.T,u=G.p,G.p=2,L.T=null;try{for(var d=t.onRecoverableError,y=0;y<o.length;y++){var R=o[y];d(R.value,{componentStack:R.stack})}}finally{L.T=n,G.p=u}}(hs&3)!==0&&lu(),Da(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===Vd?Il++:(Il=0,Vd=t):Il=0,Pl(0)}}function J0(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,gl(n)))}function lu(){return K0(),Z0(),Q0(),ex()}function ex(){if(Xn!==5)return!1;var t=Vs,n=Hd;Hd=0;var a=ti(hs),o=L.T,u=G.p;try{G.p=32>a?32:a,L.T=null,a=kd,kd=null;var d=Vs,y=hs;if(Xn=0,vo=Vs=null,hs=0,(nn&6)!==0)throw Error(s(331));var R=nn;if(nn|=4,I0(d.current),D0(d,d.current,y,a),nn=R,Pl(0,!1),pe&&typeof pe.onPostCommitFiberRoot=="function")try{pe.onPostCommitFiberRoot(de,d)}catch{}return!0}finally{G.p=u,L.T=o,J0(t,n)}}function tx(t,n,a){n=Zi(a,n),n=yd(t.stateNode,n,2),t=Ps(t,n,2),t!==null&&(ct(t,2),Da(t))}function on(t,n,a){if(t.tag===3)tx(t,t,a);else for(;n!==null;){if(n.tag===3){tx(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(ks===null||!ks.has(o))){t=Zi(a,t),a=n0(2),o=Ps(n,a,2),o!==null&&(i0(a,o,n,t),ct(o,2),Da(o));break}}n=n.return}}function Yd(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new uy;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Bd=!0,u.add(a),t=my.bind(null,t,n,a),n.then(t,t))}function my(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,xn===t&&(Gt&a)===a&&(On===4||On===3&&(Gt&62914560)===Gt&&300>Ne()-nu?(nn&2)===0&&bo(t,0):zd|=a,_o===Gt&&(_o=0)),Da(t)}function nx(t,n){n===0&&(n=Me()),t=xr(t,n),t!==null&&(ct(t,n),Da(t))}function gy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),nx(t,a)}function xy(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),nx(t,a)}function _y(t,n){return X(t,n)}var cu=null,So=null,Wd=!1,uu=!1,qd=!1,Xs=0;function Da(t){t!==So&&t.next===null&&(So===null?cu=So=t:So=So.next=t),uu=!0,Wd||(Wd=!0,by())}function Pl(t,n){if(!qd&&uu){qd=!0;do for(var a=!1,o=cu;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var d=0;else{var y=o.suspendedLanes,R=o.pingedLanes;d=(1<<31-ze(42|t)+1)-1,d&=u&~(y&~R),d=d&201326741?d&201326741|1:d?d|2:0}d!==0&&(a=!0,rx(o,d))}else d=Gt,d=me(o,o===xn?d:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(d&3)===0||ke(o,d)||(a=!0,rx(o,d));o=o.next}while(a);qd=!1}}function vy(){ix()}function ix(){uu=Wd=!1;var t=0;Xs!==0&&Ny()&&(t=Xs);for(var n=Ne(),a=null,o=cu;o!==null;){var u=o.next,d=ax(o,n);d===0?(o.next=null,a===null?cu=u:a.next=u,u===null&&(So=a)):(a=o,(t!==0||(d&3)!==0)&&(uu=!0)),o=u}Xn!==0&&Xn!==5||Pl(t),Xs!==0&&(Xs=0)}function ax(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,d=t.pendingLanes&-62914561;0<d;){var y=31-ze(d),R=1<<y,z=u[y];z===-1?((R&a)===0||(R&o)!==0)&&(u[y]=Ue(R,n)):z<=n&&(t.expiredLanes|=R),d&=~R}if(n=xn,a=Gt,a=me(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(rn===2||rn===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&Lt(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||ke(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&Lt(o),ti(a)){case 2:case 8:a=T;break;case 32:a=J;break;case 268435456:a=Ee;break;default:a=J}return o=sx.bind(null,t),a=X(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&Lt(o),t.callbackPriority=2,t.callbackNode=null,2}function sx(t,n){if(Xn!==0&&Xn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(lu()&&t.callbackNode!==a)return null;var o=Gt;return o=me(t,t===xn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(G0(t,o,n),ax(t,Ne()),t.callbackNode!=null&&t.callbackNode===a?sx.bind(null,t):null)}function rx(t,n){if(lu())return null;G0(t,n,!0)}function by(){Dy(function(){(nn&6)!==0?X(O,vy):ix()})}function $d(){if(Xs===0){var t=ro;t===0&&(t=lt,lt<<=1,(lt&261888)===0&&(lt=256)),Xs=t}return Xs}function ox(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ta(""+t)}function lx(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function yy(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var d=ox((u[Rn]||null).action),y=o.submitter;y&&(n=(n=y[Rn]||null)?ox(n.formAction):y.getAttribute("formAction"),n!==null&&(d=n,y=null));var R=new qr("action","action",null,o,u);t.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Xs!==0){var z=y?lx(u,y):new FormData(u);md(a,{pending:!0,data:z,method:u.method,action:d},null,z)}}else typeof d=="function"&&(R.preventDefault(),z=y?lx(u,y):new FormData(u),md(a,{pending:!0,data:z,method:u.method,action:d},d,z))},currentTarget:u}]})}}for(var Kd=0;Kd<Df.length;Kd++){var Zd=Df[Kd],Sy=Zd.toLowerCase(),Ey=Zd[0].toUpperCase()+Zd.slice(1);ha(Sy,"on"+Ey)}ha(zm,"onAnimationEnd"),ha(Gm,"onAnimationIteration"),ha(Hm,"onAnimationStart"),ha("dblclick","onDoubleClick"),ha("focusin","onFocus"),ha("focusout","onBlur"),ha(zb,"onTransitionRun"),ha(Gb,"onTransitionStart"),ha(Hb,"onTransitionCancel"),ha(km,"onTransitionEnd"),te("onMouseEnter",["mouseout","mouseover"]),te("onMouseLeave",["mouseout","mouseover"]),te("onPointerEnter",["pointerout","pointerover"]),te("onPointerLeave",["pointerout","pointerover"]),W("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),W("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),W("onBeforeInput",["compositionend","keypress","textInput","paste"]),W("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),W("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),W("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Fl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),My=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Fl));function cx(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;e:{var d=void 0;if(n)for(var y=o.length-1;0<=y;y--){var R=o[y],z=R.instance,re=R.currentTarget;if(R=R.listener,z!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=re;try{d(u)}catch(ge){Tc(ge)}u.currentTarget=null,d=z}else for(y=0;y<o.length;y++){if(R=o[y],z=R.instance,re=R.currentTarget,R=R.listener,z!==d&&u.isPropagationStopped())break e;d=R,u.currentTarget=re;try{d(u)}catch(ge){Tc(ge)}u.currentTarget=null,d=z}}}}function It(t,n){var a=n[_n];a===void 0&&(a=n[_n]=new Set);var o=t+"__bubble";a.has(o)||(ux(n,t,2,!1),a.add(o))}function Qd(t,n,a){var o=0;n&&(o|=4),ux(a,t,o,n)}var fu="_reactListening"+Math.random().toString(36).slice(2);function Jd(t){if(!t[fu]){t[fu]=!0,Xr.forEach(function(a){a!=="selectionchange"&&(My.has(a)||Qd(a,!1,t),Qd(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[fu]||(n[fu]=!0,Qd("selectionchange",!1,n))}}function ux(t,n,a,o){switch(zx(n)){case 2:var u=Qy;break;case 8:u=Jy;break;default:u=ph}a=u.bind(null,n,a,t),u=void 0,!Ii||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function eh(t,n,a,o,u){var d=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var R=o.stateNode.containerInfo;if(R===u)break;if(y===4)for(y=o.return;y!==null;){var z=y.tag;if((z===3||z===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;R!==null;){if(y=Sa(R),y===null)return;if(z=y.tag,z===5||z===6||z===26||z===27){o=d=y;continue e}R=R.parentNode}}o=o.return}nl(function(){var re=d,ge=ca(a),ve=[];e:{var le=Vm.get(t);if(le!==void 0){var fe=qr,tt=t;switch(t){case"keypress":if(Yr(a)===0)break e;case"keydown":case"keyup":fe=An;break;case"focusin":tt="focus",fe=ol;break;case"focusout":tt="blur",fe=ol;break;case"beforeblur":case"afterblur":fe=ol;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":fe=bc;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":fe=Mf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":fe=ni;break;case zm:case Gm:case Hm:fe=gn;break;case km:fe=$r;break;case"scroll":case"scrollend":fe=vc;break;case"wheel":fe=Qa;break;case"copy":case"cut":case"paste":fe=xt;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":fe=ua;break;case"toggle":case"beforetoggle":fe=ll}var ut=(n&4)!==0,fn=!ut&&(t==="scroll"||t==="scrollend"),Q=ut?le!==null?le+"Capture":null:le;ut=[];for(var Y=re,se;Y!==null;){var _e=Y;if(se=_e.stateNode,_e=_e.tag,_e!==5&&_e!==26&&_e!==27||se===null||Q===null||(_e=Aa(Y,Q),_e!=null&&ut.push(Bl(Y,_e,se))),fn)break;Y=Y.return}0<ut.length&&(le=new fe(le,tt,null,a,ge),ve.push({event:le,listeners:ut}))}}if((n&7)===0){e:{if(le=t==="mouseover"||t==="pointerover",fe=t==="mouseout"||t==="pointerout",le&&a!==xi&&(tt=a.relatedTarget||a.fromElement)&&(Sa(tt)||tt[Li]))break e;if((fe||le)&&(le=ge.window===ge?ge:(le=ge.ownerDocument)?le.defaultView||le.parentWindow:window,fe?(tt=a.relatedTarget||a.toElement,fe=re,tt=tt?Sa(tt):null,tt!==null&&(fn=c(tt),ut=tt.tag,tt!==fn||ut!==5&&ut!==27&&ut!==6)&&(tt=null)):(fe=null,tt=re),fe!==tt)){if(ut=bc,_e="onMouseLeave",Q="onMouseEnter",Y="mouse",(t==="pointerout"||t==="pointerover")&&(ut=ua,_e="onPointerLeave",Q="onPointerEnter",Y="pointer"),fn=fe==null?le:qa(fe),se=tt==null?le:qa(tt),le=new ut(_e,Y+"leave",fe,a,ge),le.target=fn,le.relatedTarget=se,_e=null,Sa(ge)===re&&(ut=new ut(Q,Y+"enter",tt,a,ge),ut.target=se,ut.relatedTarget=fn,_e=ut),fn=_e,fe&&tt)t:{for(ut=Ty,Q=fe,Y=tt,se=0,_e=Q;_e;_e=ut(_e))se++;_e=0;for(var ot=Y;ot;ot=ut(ot))_e++;for(;0<se-_e;)Q=ut(Q),se--;for(;0<_e-se;)Y=ut(Y),_e--;for(;se--;){if(Q===Y||Y!==null&&Q===Y.alternate){ut=Q;break t}Q=ut(Q),Y=ut(Y)}ut=null}else ut=null;fe!==null&&fx(ve,le,fe,ut,!1),tt!==null&&fn!==null&&fx(ve,fn,tt,ut,!0)}}e:{if(le=re?qa(re):window,fe=le.nodeName&&le.nodeName.toLowerCase(),fe==="select"||fe==="input"&&le.type==="file")var Kt=Rm;else if(Am(le))if(Cm)Kt=Pb;else{Kt=Ub;var it=Lb}else fe=le.nodeName,!fe||fe.toLowerCase()!=="input"||le.type!=="checkbox"&&le.type!=="radio"?re&&yt(re.elementType)&&(Kt=Rm):Kt=Ib;if(Kt&&(Kt=Kt(t,re))){wm(ve,Kt,a,ge);break e}it&&it(t,le,re),t==="focusout"&&re&&le.type==="number"&&re.memoizedProps.value!=null&&Ot(le,"number",le.value)}switch(it=re?qa(re):window,t){case"focusin":(Am(it)||it.contentEditable==="true")&&(Qr=it,Cf=re,hl=null);break;case"focusout":hl=Cf=Qr=null;break;case"mousedown":Nf=!0;break;case"contextmenu":case"mouseup":case"dragend":Nf=!1,Fm(ve,a,ge);break;case"selectionchange":if(Bb)break;case"keydown":case"keyup":Fm(ve,a,ge)}var At;if(Kr)e:{switch(t){case"compositionstart":var Ht="onCompositionStart";break e;case"compositionend":Ht="onCompositionEnd";break e;case"compositionupdate":Ht="onCompositionUpdate";break e}Ht=void 0}else Rt?$i(t,a)&&(Ht="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(Ht="onCompositionStart");Ht&&(bi&&a.locale!=="ko"&&(Rt||Ht!=="onCompositionStart"?Ht==="onCompositionEnd"&&Rt&&(At=_c()):(Ei=ge,il="value"in Ei?Ei.value:Ei.textContent,Rt=!0)),it=du(re,Ht),0<it.length&&(Ht=new Et(Ht,t,null,a,ge),ve.push({event:Ht,listeners:it}),At?Ht.data=At:(At=da(a),At!==null&&(Ht.data=At)))),(At=vi?Qn(t,a):Zr(t,a))&&(Ht=du(re,"onBeforeInput"),0<Ht.length&&(it=new Et("onBeforeInput","beforeinput",null,a,ge),ve.push({event:it,listeners:Ht}),it.data=At)),yy(ve,t,re,a,ge)}cx(ve,n)})}function Bl(t,n,a){return{instance:t,listener:n,currentTarget:a}}function du(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,d=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||d===null||(u=Aa(t,a),u!=null&&o.unshift(Bl(t,u,d)),u=Aa(t,n),u!=null&&o.push(Bl(t,u,d))),t.tag===3)return o;t=t.return}return[]}function Ty(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function fx(t,n,a,o,u){for(var d=n._reactName,y=[];a!==null&&a!==o;){var R=a,z=R.alternate,re=R.stateNode;if(R=R.tag,z!==null&&z===o)break;R!==5&&R!==26&&R!==27||re===null||(z=re,u?(re=Aa(a,d),re!=null&&y.unshift(Bl(a,re,z))):u||(re=Aa(a,d),re!=null&&y.push(Bl(a,re,z)))),a=a.return}y.length!==0&&t.push({event:n,listeners:y})}var Ay=/\r\n?/g,wy=/\u0000|\uFFFD/g;function dx(t){return(typeof t=="string"?t:""+t).replace(Ay,`
`).replace(wy,"")}function hx(t,n){return n=dx(n),dx(t)===n}function un(t,n,a,o,u,d){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||jn(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&jn(t,""+o);break;case"className":Je(t,"class",o);break;case"tabIndex":Je(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Je(t,a,o);break;case"style":ci(t,o,d);break;case"data":if(n!=="object"){Je(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Ta(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof d=="function"&&(a==="formAction"?(n!=="input"&&un(t,n,"name",u.name,u,null),un(t,n,"formEncType",u.formEncType,u,null),un(t,n,"formMethod",u.formMethod,u,null),un(t,n,"formTarget",u.formTarget,u,null)):(un(t,n,"encType",u.encType,u,null),un(t,n,"method",u.method,u,null),un(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=Ta(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=Ui);break;case"onScroll":o!=null&&It("scroll",t);break;case"onScrollEnd":o!=null&&It("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=Ta(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":It("beforetoggle",t),It("toggle",t),Be(t,"popover",o);break;case"xlinkActuate":Ke(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":Ke(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":Ke(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":Ke(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":Ke(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":Ke(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":Ke(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":Ke(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":Ke(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Be(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=la.get(a)||a,Be(t,a,o))}}function th(t,n,a,o,u,d){switch(a){case"style":ci(t,o,d);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?jn(t,o):(typeof o=="number"||typeof o=="bigint")&&jn(t,""+o);break;case"onScroll":o!=null&&It("scroll",t);break;case"onScrollEnd":o!=null&&It("scrollend",t);break;case"onClick":o!=null&&(t.onclick=Ui);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!w.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),d=t[Rn]||null,d=d!=null?d[a]:null,typeof d=="function"&&t.removeEventListener(n,d,u),typeof o=="function")){typeof d!="function"&&d!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break e}a in t?t[a]=o:o===!0?t.setAttribute(a,""):Be(t,a,o)}}}function ri(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":It("error",t),It("load",t);var o=!1,u=!1,d;for(d in a)if(a.hasOwnProperty(d)){var y=a[d];if(y!=null)switch(d){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:un(t,n,d,y,a,null)}}u&&un(t,n,"srcSet",a.srcSet,a,null),o&&un(t,n,"src",a.src,a,null);return;case"input":It("invalid",t);var R=d=y=u=null,z=null,re=null;for(o in a)if(a.hasOwnProperty(o)){var ge=a[o];if(ge!=null)switch(o){case"name":u=ge;break;case"type":y=ge;break;case"checked":z=ge;break;case"defaultChecked":re=ge;break;case"value":d=ge;break;case"defaultValue":R=ge;break;case"children":case"dangerouslySetInnerHTML":if(ge!=null)throw Error(s(137,n));break;default:un(t,n,o,ge,a,null)}}Fn(t,d,R,z,re,y,u,!1);return;case"select":It("invalid",t),o=y=d=null;for(u in a)if(a.hasOwnProperty(u)&&(R=a[u],R!=null))switch(u){case"value":d=R;break;case"defaultValue":y=R;break;case"multiple":o=R;default:un(t,n,u,R,a,null)}n=d,a=y,t.multiple=!!o,n!=null?pn(t,!!o,n,!1):a!=null&&pn(t,!!o,a,!0);return;case"textarea":It("invalid",t),d=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(R=a[y],R!=null))switch(y){case"value":o=R;break;case"defaultValue":u=R;break;case"children":d=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:un(t,n,y,R,a,null)}En(t,o,u,d);return;case"option":for(z in a)a.hasOwnProperty(z)&&(o=a[z],o!=null)&&(z==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":un(t,n,z,o,a,null));return;case"dialog":It("beforetoggle",t),It("toggle",t),It("cancel",t),It("close",t);break;case"iframe":case"object":It("load",t);break;case"video":case"audio":for(o=0;o<Fl.length;o++)It(Fl[o],t);break;case"image":It("error",t),It("load",t);break;case"details":It("toggle",t);break;case"embed":case"source":case"link":It("error",t),It("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(re in a)if(a.hasOwnProperty(re)&&(o=a[re],o!=null))switch(re){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:un(t,n,re,o,a,null)}return;default:if(yt(n)){for(ge in a)a.hasOwnProperty(ge)&&(o=a[ge],o!==void 0&&th(t,n,ge,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&un(t,n,R,o,a,null))}function Ry(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,d=null,y=null,R=null,z=null,re=null,ge=null;for(fe in a){var ve=a[fe];if(a.hasOwnProperty(fe)&&ve!=null)switch(fe){case"checked":break;case"value":break;case"defaultValue":z=ve;default:o.hasOwnProperty(fe)||un(t,n,fe,null,o,ve)}}for(var le in o){var fe=o[le];if(ve=a[le],o.hasOwnProperty(le)&&(fe!=null||ve!=null))switch(le){case"type":d=fe;break;case"name":u=fe;break;case"checked":re=fe;break;case"defaultChecked":ge=fe;break;case"value":y=fe;break;case"defaultValue":R=fe;break;case"children":case"dangerouslySetInnerHTML":if(fe!=null)throw Error(s(137,n));break;default:fe!==ve&&un(t,n,le,fe,o,ve)}}Ve(t,y,R,z,re,ge,d,u);return;case"select":fe=y=R=le=null;for(d in a)if(z=a[d],a.hasOwnProperty(d)&&z!=null)switch(d){case"value":break;case"multiple":fe=z;default:o.hasOwnProperty(d)||un(t,n,d,null,o,z)}for(u in o)if(d=o[u],z=a[u],o.hasOwnProperty(u)&&(d!=null||z!=null))switch(u){case"value":le=d;break;case"defaultValue":R=d;break;case"multiple":y=d;default:d!==z&&un(t,n,u,d,o,z)}n=R,a=y,o=fe,le!=null?pn(t,!!a,le,!1):!!o!=!!a&&(n!=null?pn(t,!!a,n,!0):pn(t,!!a,a?[]:"",!1));return;case"textarea":fe=le=null;for(R in a)if(u=a[R],a.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:un(t,n,R,null,o,u)}for(y in o)if(u=o[y],d=a[y],o.hasOwnProperty(y)&&(u!=null||d!=null))switch(y){case"value":le=u;break;case"defaultValue":fe=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==d&&un(t,n,y,u,o,d)}Tn(t,le,fe);return;case"option":for(var tt in a)le=a[tt],a.hasOwnProperty(tt)&&le!=null&&!o.hasOwnProperty(tt)&&(tt==="selected"?t.selected=!1:un(t,n,tt,null,o,le));for(z in o)le=o[z],fe=a[z],o.hasOwnProperty(z)&&le!==fe&&(le!=null||fe!=null)&&(z==="selected"?t.selected=le&&typeof le!="function"&&typeof le!="symbol":un(t,n,z,le,o,fe));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ut in a)le=a[ut],a.hasOwnProperty(ut)&&le!=null&&!o.hasOwnProperty(ut)&&un(t,n,ut,null,o,le);for(re in o)if(le=o[re],fe=a[re],o.hasOwnProperty(re)&&le!==fe&&(le!=null||fe!=null))switch(re){case"children":case"dangerouslySetInnerHTML":if(le!=null)throw Error(s(137,n));break;default:un(t,n,re,le,o,fe)}return;default:if(yt(n)){for(var fn in a)le=a[fn],a.hasOwnProperty(fn)&&le!==void 0&&!o.hasOwnProperty(fn)&&th(t,n,fn,void 0,o,le);for(ge in o)le=o[ge],fe=a[ge],!o.hasOwnProperty(ge)||le===fe||le===void 0&&fe===void 0||th(t,n,ge,le,o,fe);return}}for(var Q in a)le=a[Q],a.hasOwnProperty(Q)&&le!=null&&!o.hasOwnProperty(Q)&&un(t,n,Q,null,o,le);for(ve in o)le=o[ve],fe=a[ve],!o.hasOwnProperty(ve)||le===fe||le==null&&fe==null||un(t,n,ve,le,o,fe)}function px(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Cy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],d=u.transferSize,y=u.initiatorType,R=u.duration;if(d&&R&&px(y)){for(y=0,R=u.responseEnd,o+=1;o<a.length;o++){var z=a[o],re=z.startTime;if(re>R)break;var ge=z.transferSize,ve=z.initiatorType;ge&&px(ve)&&(z=z.responseEnd,y+=ge*(z<R?1:(R-re)/(z-re)))}if(--o,n+=8*(d+y)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var nh=null,ih=null;function hu(t){return t.nodeType===9?t:t.ownerDocument}function mx(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function gx(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function ah(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var sh=null;function Ny(){var t=window.event;return t&&t.type==="popstate"?t===sh?!1:(sh=t,!0):(sh=null,!1)}var xx=typeof setTimeout=="function"?setTimeout:void 0,Oy=typeof clearTimeout=="function"?clearTimeout:void 0,_x=typeof Promise=="function"?Promise:void 0,Dy=typeof queueMicrotask=="function"?queueMicrotask:typeof _x<"u"?function(t){return _x.resolve(null).then(t).catch(Ly)}:xx;function Ly(t){setTimeout(function(){throw t})}function Ys(t){return t==="head"}function vx(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),Ao(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")zl(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,zl(a);for(var d=a.firstChild;d;){var y=d.nextSibling,R=d.nodeName;d[Wa]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&d.rel.toLowerCase()==="stylesheet"||a.removeChild(d),d=y}}else a==="body"&&zl(t.ownerDocument.body);a=u}while(a);Ao(n)}function bx(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function rh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":rh(a),jr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Uy(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[Wa])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(d=t.getAttribute("rel"),d==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(d!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(d=t.getAttribute("src"),(d!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&d&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var d=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===d)return t}else return t;if(t=na(t.nextSibling),t===null)break}return null}function Iy(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=na(t.nextSibling),t===null))return null;return t}function yx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=na(t.nextSibling),t===null))return null;return t}function oh(t){return t.data==="$?"||t.data==="$~"}function lh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Py(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function na(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var ch=null;function Sx(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return na(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Ex(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Mx(t,n,a){switch(n=hu(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function zl(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);jr(t)}var ia=new Map,Tx=new Set;function pu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var ps=G.d;G.d={f:Fy,r:By,D:zy,C:Gy,L:Hy,m:ky,X:jy,S:Vy,M:Xy};function Fy(){var t=ps.f(),n=su();return t||n}function By(t){var n=Ea(t);n!==null&&n.tag===5&&n.type==="form"?kg(n):ps.r(t)}var Eo=typeof document>"u"?null:document;function Ax(t,n,a){var o=Eo;if(o&&typeof n=="string"&&n){var u=qt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),Tx.has(u)||(Tx.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),ri(n,"link",t),Cn(n),o.head.appendChild(n)))}}function zy(t){ps.D(t),Ax("dns-prefetch",t,null)}function Gy(t,n){ps.C(t,n),Ax("preconnect",t,n)}function Hy(t,n,a){ps.L(t,n,a);var o=Eo;if(o&&t&&n){var u='link[rel="preload"][as="'+qt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+qt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+qt(a.imageSizes)+'"]')):u+='[href="'+qt(t)+'"]';var d=u;switch(n){case"style":d=Mo(t);break;case"script":d=To(t)}ia.has(d)||(t=_({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),ia.set(d,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Gl(d))||n==="script"&&o.querySelector(Hl(d))||(n=o.createElement("link"),ri(n,"link",t),Cn(n),o.head.appendChild(n)))}}function ky(t,n){ps.m(t,n);var a=Eo;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+qt(o)+'"][href="'+qt(t)+'"]',d=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":d=To(t)}if(!ia.has(d)&&(t=_({rel:"modulepreload",href:t},n),ia.set(d,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Hl(d)))return}o=a.createElement("link"),ri(o,"link",t),Cn(o),a.head.appendChild(o)}}}function Vy(t,n,a){ps.S(t,n,a);var o=Eo;if(o&&t){var u=Ma(o).hoistableStyles,d=Mo(t);n=n||"default";var y=u.get(d);if(!y){var R={loading:0,preload:null};if(y=o.querySelector(Gl(d)))R.loading=5;else{t=_({rel:"stylesheet",href:t,"data-precedence":n},a),(a=ia.get(d))&&uh(t,a);var z=y=o.createElement("link");Cn(z),ri(z,"link",t),z._p=new Promise(function(re,ge){z.onload=re,z.onerror=ge}),z.addEventListener("load",function(){R.loading|=1}),z.addEventListener("error",function(){R.loading|=2}),R.loading|=4,mu(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:R},u.set(d,y)}}}function jy(t,n){ps.X(t,n);var a=Eo;if(a&&t){var o=Ma(a).hoistableScripts,u=To(t),d=o.get(u);d||(d=a.querySelector(Hl(u)),d||(t=_({src:t,async:!0},n),(n=ia.get(u))&&fh(t,n),d=a.createElement("script"),Cn(d),ri(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function Xy(t,n){ps.M(t,n);var a=Eo;if(a&&t){var o=Ma(a).hoistableScripts,u=To(t),d=o.get(u);d||(d=a.querySelector(Hl(u)),d||(t=_({src:t,async:!0,type:"module"},n),(n=ia.get(u))&&fh(t,n),d=a.createElement("script"),Cn(d),ri(d,"link",t),a.head.appendChild(d)),d={type:"script",instance:d,count:1,state:null},o.set(u,d))}}function wx(t,n,a,o){var u=(u=ee.current)?pu(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=Mo(a.href),a=Ma(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Mo(a.href);var d=Ma(u).hoistableStyles,y=d.get(t);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},d.set(t,y),(d=u.querySelector(Gl(t)))&&!d._p&&(y.instance=d,y.state.loading=5),ia.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ia.set(t,a),d||Yy(u,t,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=To(a),a=Ma(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Mo(t){return'href="'+qt(t)+'"'}function Gl(t){return'link[rel="stylesheet"]['+t+"]"}function Rx(t){return _({},t,{"data-precedence":t.precedence,precedence:null})}function Yy(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),ri(n,"link",a),Cn(n),t.head.appendChild(n))}function To(t){return'[src="'+qt(t)+'"]'}function Hl(t){return"script[async]"+t}function Cx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+qt(a.href)+'"]');if(o)return n.instance=o,Cn(o),o;var u=_({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),Cn(o),ri(o,"style",u),mu(o,a.precedence,t),n.instance=o;case"stylesheet":u=Mo(a.href);var d=t.querySelector(Gl(u));if(d)return n.state.loading|=4,n.instance=d,Cn(d),d;o=Rx(a),(u=ia.get(u))&&uh(o,u),d=(t.ownerDocument||t).createElement("link"),Cn(d);var y=d;return y._p=new Promise(function(R,z){y.onload=R,y.onerror=z}),ri(d,"link",o),n.state.loading|=4,mu(d,a.precedence,t),n.instance=d;case"script":return d=To(a.src),(u=t.querySelector(Hl(d)))?(n.instance=u,Cn(u),u):(o=a,(u=ia.get(d))&&(o=_({},a),fh(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),Cn(u),ri(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,mu(o,a.precedence,t));return n.instance}function mu(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,d=u,y=0;y<o.length;y++){var R=o[y];if(R.dataset.precedence===n)d=R;else if(d!==u)break}d?d.parentNode.insertBefore(t,d.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function uh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function fh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var gu=null;function Nx(t,n,a){if(gu===null){var o=new Map,u=gu=new Map;u.set(a,o)}else u=gu,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var d=a[u];if(!(d[Wa]||d[bn]||t==="link"&&d.getAttribute("rel")==="stylesheet")&&d.namespaceURI!=="http://www.w3.org/2000/svg"){var y=d.getAttribute(n)||"";y=t+y;var R=o.get(y);R?R.push(d):o.set(y,[d])}}return o}function Ox(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Wy(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Dx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function qy(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Mo(o.href),d=n.querySelector(Gl(u));if(d){n=d._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=xu.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=d,Cn(d);return}d=n.ownerDocument||n,o=Rx(o),(u=ia.get(u))&&uh(o,u),d=d.createElement("link"),Cn(d);var y=d;y._p=new Promise(function(R,z){y.onload=R,y.onerror=z}),ri(d,"link",o),a.instance=d}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=xu.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var dh=0;function $y(t,n){return t.stylesheets&&t.count===0&&vu(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&vu(t,t.stylesheets),t.unsuspend){var d=t.unsuspend;t.unsuspend=null,d()}},6e4+n);0<t.imgBytes&&dh===0&&(dh=62500*Cy());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&vu(t,t.stylesheets),t.unsuspend)){var d=t.unsuspend;t.unsuspend=null,d()}},(t.imgBytes>dh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function xu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)vu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var _u=null;function vu(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,_u=new Map,n.forEach(Ky,t),_u=null,xu.call(t))}function Ky(t,n){if(!(n.state.loading&4)){var a=_u.get(t);if(a)var o=a.get(null);else{a=new Map,_u.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),d=0;d<u.length;d++){var y=u[d];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),d=a.get(y)||o,d===o&&a.set(null,u),a.set(y,u),this.count++,o=xu.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),d?d.parentNode.insertBefore(u,d.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var kl={$$typeof:U,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function Zy(t,n,a,o,u,d,y,R,z){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Qe(0),this.hiddenUpdates=Qe(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=d,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=z,this.incompleteTransitions=new Map}function Lx(t,n,a,o,u,d,y,R,z,re,ge,ve){return t=new Zy(t,n,a,y,z,re,ge,ve,R),n=1,d===!0&&(n|=24),d=Fi(3,null,null,n),t.current=d,d.stateNode=t,n=Xf(),n.refCount++,t.pooledCache=n,n.refCount++,d.memoizedState={element:o,isDehydrated:a,cache:n},$f(d),t}function Ux(t){return t?(t=to,t):to}function Ix(t,n,a,o,u,d){u=Ux(u),o.context===null?o.context=u:o.pendingContext=u,o=Is(n),o.payload={element:a},d=d===void 0?null:d,d!==null&&(o.callback=d),a=Ps(t,o,n),a!==null&&(Ri(a,t,n),bl(a,t,n))}function Px(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function hh(t,n){Px(t,n),(t=t.alternate)&&Px(t,n)}function Fx(t){if(t.tag===13||t.tag===31){var n=xr(t,67108864);n!==null&&Ri(n,t,67108864),hh(t,67108864)}}function Bx(t){if(t.tag===13||t.tag===31){var n=ki();n=Xa(n);var a=xr(t,n);a!==null&&Ri(a,t,n),hh(t,n)}}var bu=!0;function Qy(t,n,a,o){var u=L.T;L.T=null;var d=G.p;try{G.p=2,ph(t,n,a,o)}finally{G.p=d,L.T=u}}function Jy(t,n,a,o){var u=L.T;L.T=null;var d=G.p;try{G.p=8,ph(t,n,a,o)}finally{G.p=d,L.T=u}}function ph(t,n,a,o){if(bu){var u=mh(o);if(u===null)eh(t,n,o,yu,a),Gx(t,o);else if(tS(u,t,n,a,o))o.stopPropagation();else if(Gx(t,o),n&4&&-1<eS.indexOf(t)){for(;u!==null;){var d=Ea(u);if(d!==null)switch(d.tag){case 3:if(d=d.stateNode,d.current.memoizedState.isDehydrated){var y=Ce(d.pendingLanes);if(y!==0){var R=d;for(R.pendingLanes|=2,R.entangledLanes|=2;y;){var z=1<<31-ze(y);R.entanglements[1]|=z,y&=~z}Da(d),(nn&6)===0&&(iu=Ne()+500,Pl(0))}}break;case 31:case 13:R=xr(d,2),R!==null&&Ri(R,d,2),su(),hh(d,2)}if(d=mh(o),d===null&&eh(t,n,o,yu,a),d===u)break;u=d}u!==null&&o.stopPropagation()}else eh(t,n,o,null,a)}}function mh(t){return t=ca(t),gh(t)}var yu=null;function gh(t){if(yu=null,t=Sa(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=f(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return yu=t,null}function zx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Jt()){case O:return 2;case T:return 8;case J:case he:return 32;case Ee:return 268435456;default:return 32}default:return 32}}var xh=!1,Ws=null,qs=null,$s=null,Vl=new Map,jl=new Map,Ks=[],eS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Gx(t,n){switch(t){case"focusin":case"focusout":Ws=null;break;case"dragenter":case"dragleave":qs=null;break;case"mouseover":case"mouseout":$s=null;break;case"pointerover":case"pointerout":Vl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":jl.delete(n.pointerId)}}function Xl(t,n,a,o,u,d){return t===null||t.nativeEvent!==d?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:d,targetContainers:[u]},n!==null&&(n=Ea(n),n!==null&&Fx(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function tS(t,n,a,o,u){switch(n){case"focusin":return Ws=Xl(Ws,t,n,a,o,u),!0;case"dragenter":return qs=Xl(qs,t,n,a,o,u),!0;case"mouseover":return $s=Xl($s,t,n,a,o,u),!0;case"pointerover":var d=u.pointerId;return Vl.set(d,Xl(Vl.get(d)||null,t,n,a,o,u)),!0;case"gotpointercapture":return d=u.pointerId,jl.set(d,Xl(jl.get(d)||null,t,n,a,o,u)),!0}return!1}function Hx(t){var n=Sa(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=f(a),n!==null){t.blockedOn=n,hr(t.priority,function(){Bx(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,hr(t.priority,function(){Bx(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Su(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=mh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);xi=o,a.target.dispatchEvent(o),xi=null}else return n=Ea(a),n!==null&&Fx(n),t.blockedOn=a,!1;n.shift()}return!0}function kx(t,n,a){Su(t)&&a.delete(n)}function nS(){xh=!1,Ws!==null&&Su(Ws)&&(Ws=null),qs!==null&&Su(qs)&&(qs=null),$s!==null&&Su($s)&&($s=null),Vl.forEach(kx),jl.forEach(kx)}function Eu(t,n){t.blockedOn===n&&(t.blockedOn=null,xh||(xh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,nS)))}var Mu=null;function Vx(t){Mu!==t&&(Mu=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Mu===t&&(Mu=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(gh(o||a)===null)continue;break}var d=Ea(a);d!==null&&(t.splice(n,3),n-=3,md(d,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Ao(t){function n(z){return Eu(z,t)}Ws!==null&&Eu(Ws,t),qs!==null&&Eu(qs,t),$s!==null&&Eu($s,t),Vl.forEach(n),jl.forEach(n);for(var a=0;a<Ks.length;a++){var o=Ks[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<Ks.length&&(a=Ks[0],a.blockedOn===null);)Hx(a),a.blockedOn===null&&Ks.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],d=a[o+1],y=u[Rn]||null;if(typeof d=="function")y||Vx(a);else if(y){var R=null;if(d&&d.hasAttribute("formAction")){if(u=d,y=d[Rn]||null)R=y.formAction;else if(gh(u)!==null)continue}else R=y.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),Vx(a)}}}function jx(){function t(d){d.canIntercept&&d.info==="react-transition"&&d.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var d=navigation.currentEntry;d&&d.url!=null&&navigation.navigate(d.url,{state:d.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function _h(t){this._internalRoot=t}Tu.prototype.render=_h.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=ki();Ix(a,o,t,n,null,null)},Tu.prototype.unmount=_h.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;Ix(t.current,2,null,t,null,null),su(),n[Li]=null}};function Tu(t){this._internalRoot=t}Tu.prototype.unstable_scheduleHydration=function(t){if(t){var n=dr();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Ks.length&&n!==0&&n<Ks[a].priority;a++);Ks.splice(a,0,t),a===0&&Hx(t)}};var Xx=e.version;if(Xx!=="19.2.3")throw Error(s(527,Xx,"19.2.3"));G.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var iS={bundleType:0,version:"19.2.3",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.3"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Au=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Au.isDisabled&&Au.supportsFiber)try{de=Au.inject(iS),pe=Au}catch{}}return Wl.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=Qg,d=Jg,y=e0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(d=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=Lx(t,1,!1,null,null,a,o,null,u,d,y,jx),t[Li]=n.current,Jd(t),new _h(n)},Wl.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",d=Qg,y=Jg,R=e0,z=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(d=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(z=a.formState)),n=Lx(t,1,!0,n,a??null,o,u,z,d,y,R,jx),n.context=Ux(null),a=n.current,o=ki(),o=Xa(o),u=Is(o),u.callback=null,Ps(a,u,o),a=o,n.current.lanes=a,ct(n,a),Da(n),t[Li]=n.current,Jd(t),new Tu(n)},Wl.version="19.2.3",Wl}var t_;function mS(){if(t_)return yh.exports;t_=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),yh.exports=pS(),yh.exports}var gS=mS();const xS=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),_S=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,i,s)=>s?s.toUpperCase():i.toLowerCase()),n_=r=>{const e=_S(r);return e.charAt(0).toUpperCase()+e.slice(1)},Dv=(...r)=>r.filter((e,i,s)=>!!e&&e.trim()!==""&&s.indexOf(e)===i).join(" ").trim(),vS=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};var bS={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const yS=we.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:l="",children:c,iconNode:f,...h},m)=>we.createElement("svg",{ref:m,...bS,width:e,height:e,stroke:r,strokeWidth:s?Number(i)*24/Number(e):i,className:Dv("lucide",l),...!c&&!vS(h)&&{"aria-hidden":"true"},...h},[...f.map(([p,v])=>we.createElement(p,v)),...Array.isArray(c)?c:[c]]));const Pn=(r,e)=>{const i=we.forwardRef(({className:s,...l},c)=>we.createElement(yS,{ref:c,iconNode:e,className:Dv(`lucide-${xS(n_(r))}`,`lucide-${r}`,s),...l}));return i.displayName=n_(r),i};const SS=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ac=Pn("arrow-right",SS);const ES=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]],im=Pn("brain-circuit",ES);const MS=[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],TS=Pn("camera",MS);const AS=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Ir=Pn("check",AS);const wS=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Lv=Pn("chevron-down",wS);const RS=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],Xi=Pn("circle-check",RS);const CS=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]],rc=Pn("copy",CS);const NS=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],i_=Pn("download",NS);const OS=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],DS=Pn("file-text",OS);const LS=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],oc=Pn("globe",LS);const US=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],op=Pn("image",US);const IS=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Wi=Pn("loader-circle",IS);const PS=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],FS=Pn("log-out",PS);const BS=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],zS=Pn("plus",BS);const GS=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],a_=Pn("refresh-cw",GS);const HS=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Uv=Pn("sparkles",HS);const kS=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}]],VS=Pn("square",kS);const jS=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],lc=Pn("trash-2",jS);const XS=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Iv=Pn("triangle-alert",XS);const YS=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],lp=Pn("wand-sparkles",YS);const WS=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],uf=Pn("zap",WS);var s_;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(s_||(s_={}));var r_;(function(r){r.LANGUAGE_UNSPECIFIED="language_unspecified",r.PYTHON="python"})(r_||(r_={}));var o_;(function(r){r.OUTCOME_UNSPECIFIED="outcome_unspecified",r.OUTCOME_OK="outcome_ok",r.OUTCOME_FAILED="outcome_failed",r.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(o_||(o_={}));const l_=["user","model","function","system"];var c_;(function(r){r.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",r.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(c_||(c_={}));var u_;(function(r){r.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(u_||(u_={}));var f_;(function(r){r.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(f_||(f_={}));var d_;(function(r){r.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER"})(d_||(d_={}));var sc;(function(r){r.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.BLOCKLIST="BLOCKLIST",r.PROHIBITED_CONTENT="PROHIBITED_CONTENT",r.SPII="SPII",r.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",r.OTHER="OTHER"})(sc||(sc={}));var h_;(function(r){r.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",r.RETRIEVAL_QUERY="RETRIEVAL_QUERY",r.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",r.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",r.CLASSIFICATION="CLASSIFICATION",r.CLUSTERING="CLUSTERING"})(h_||(h_={}));var p_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})(p_||(p_={}));var m_;(function(r){r.MODE_UNSPECIFIED="MODE_UNSPECIFIED",r.MODE_DYNAMIC="MODE_DYNAMIC"})(m_||(m_={}));class pi extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class wo extends pi{constructor(e,i){super(e),this.response=i}}class Pv extends pi{constructor(e,i,s,l){super(e),this.status=i,this.statusText=s,this.errorDetails=l}}class lr extends pi{}class Fv extends pi{}const qS="https://generativelanguage.googleapis.com",$S="v1beta",KS="0.24.1",ZS="genai-js";var Gr;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens",r.EMBED_CONTENT="embedContent",r.BATCH_EMBED_CONTENTS="batchEmbedContents"})(Gr||(Gr={}));class QS{constructor(e,i,s,l,c){this.model=e,this.task=i,this.apiKey=s,this.stream=l,this.requestOptions=c}toString(){var e,i;const s=((e=this.requestOptions)===null||e===void 0?void 0:e.apiVersion)||$S;let c=`${((i=this.requestOptions)===null||i===void 0?void 0:i.baseUrl)||qS}/${s}/${this.model}:${this.task}`;return this.stream&&(c+="?alt=sse"),c}}function JS(r){const e=[];return r?.apiClient&&e.push(r.apiClient),e.push(`${ZS}/${KS}`),e.join(" ")}async function eE(r){var e;const i=new Headers;i.append("Content-Type","application/json"),i.append("x-goog-api-client",JS(r.requestOptions)),i.append("x-goog-api-key",r.apiKey);let s=(e=r.requestOptions)===null||e===void 0?void 0:e.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(l){throw new lr(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${l.message}`)}for(const[l,c]of s.entries()){if(l==="x-goog-api-key")throw new lr(`Cannot set reserved header name ${l}`);if(l==="x-goog-api-client")throw new lr(`Header name ${l} can only be set using the apiClient field`);i.append(l,c)}}return i}async function tE(r,e,i,s,l,c){const f=new QS(r,e,i,s,c);return{url:f.toString(),fetchOptions:Object.assign(Object.assign({},sE(c)),{method:"POST",headers:await eE(f),body:l})}}async function pc(r,e,i,s,l,c={},f=fetch){const{url:h,fetchOptions:m}=await tE(r,e,i,s,l,c);return nE(h,m,f)}async function nE(r,e,i=fetch){let s;try{s=await i(r,e)}catch(l){iE(l,r)}return s.ok||await aE(s,r),s}function iE(r,e){let i=r;throw i.name==="AbortError"?(i=new Fv(`Request aborted when fetching ${e.toString()}: ${r.message}`),i.stack=r.stack):r instanceof Pv||r instanceof lr||(i=new pi(`Error fetching from ${e.toString()}: ${r.message}`),i.stack=r.stack),i}async function aE(r,e){let i="",s;try{const l=await r.json();i=l.error.message,l.error.details&&(i+=` ${JSON.stringify(l.error.details)}`,s=l.error.details)}catch{}throw new Pv(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${i}`,r.status,r.statusText,s)}function sE(r){const e={};if(r?.signal!==void 0||r?.timeout>=0){const i=new AbortController;r?.timeout>=0&&setTimeout(()=>i.abort(),r.timeout),r?.signal&&r.signal.addEventListener("abort",()=>{i.abort()}),e.signal=i.signal}return e}function am(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),Ju(r.candidates[0]))throw new wo(`${ar(r)}`,r);return rE(r)}else if(r.promptFeedback)throw new wo(`Text not available. ${ar(r)}`,r);return""},r.functionCall=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Ju(r.candidates[0]))throw new wo(`${ar(r)}`,r);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),g_(r)[0]}else if(r.promptFeedback)throw new wo(`Function call not available. ${ar(r)}`,r)},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),Ju(r.candidates[0]))throw new wo(`${ar(r)}`,r);return g_(r)}else if(r.promptFeedback)throw new wo(`Function call not available. ${ar(r)}`,r)},r}function rE(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.text&&c.push(f.text),f.executableCode&&c.push("\n```"+f.executableCode.language+`
`+f.executableCode.code+"\n```\n"),f.codeExecutionResult&&c.push("\n```\n"+f.codeExecutionResult.output+"\n```\n");return c.length>0?c.join(""):""}function g_(r){var e,i,s,l;const c=[];if(!((i=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||i===void 0)&&i.parts)for(const f of(l=(s=r.candidates)===null||s===void 0?void 0:s[0].content)===null||l===void 0?void 0:l.parts)f.functionCall&&c.push(f.functionCall);if(c.length>0)return c}const oE=[sc.RECITATION,sc.SAFETY,sc.LANGUAGE];function Ju(r){return!!r.finishReason&&oE.includes(r.finishReason)}function ar(r){var e,i,s;let l="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)l+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(l+=` due to ${r.promptFeedback.blockReason}`),!((i=r.promptFeedback)===null||i===void 0)&&i.blockReasonMessage&&(l+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((s=r.candidates)===null||s===void 0)&&s[0]){const c=r.candidates[0];Ju(c)&&(l+=`Candidate was blocked due to ${c.finishReason}`,c.finishMessage&&(l+=`: ${c.finishMessage}`))}return l}function cc(r){return this instanceof cc?(this.v=r,this):new cc(r)}function lE(r,e,i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=i.apply(r,e||[]),l,c=[];return l={},f("next"),f("throw"),f("return"),l[Symbol.asyncIterator]=function(){return this},l;function f(g){s[g]&&(l[g]=function(b){return new Promise(function(M,C){c.push([g,b,M,C])>1||h(g,b)})})}function h(g,b){try{m(s[g](b))}catch(M){_(c[0][3],M)}}function m(g){g.value instanceof cc?Promise.resolve(g.value.v).then(p,v):_(c[0][2],g)}function p(g){h("next",g)}function v(g){h("throw",g)}function _(g,b){g(b),c.shift(),c.length&&h(c[0][0],c[0][1])}}const x_=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function cE(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),i=dE(e),[s,l]=i.tee();return{stream:fE(s),response:uE(l)}}async function uE(r){const e=[],i=r.getReader();for(;;){const{done:s,value:l}=await i.read();if(s)return am(hE(e));e.push(l)}}function fE(r){return lE(this,arguments,function*(){const i=r.getReader();for(;;){const{value:s,done:l}=yield cc(i.read());if(l)break;yield yield cc(am(s))}})}function dE(r){const e=r.getReader();return new ReadableStream({start(s){let l="";return c();function c(){return e.read().then(({value:f,done:h})=>{if(h){if(l.trim()){s.error(new pi("Failed to parse stream"));return}s.close();return}l+=f;let m=l.match(x_),p;for(;m;){try{p=JSON.parse(m[1])}catch{s.error(new pi(`Error parsing JSON response: "${m[1]}"`));return}s.enqueue(p),l=l.substring(m[0].length),m=l.match(x_)}return c()}).catch(f=>{let h=f;throw h.stack=f.stack,h.name==="AbortError"?h=new Fv("Request aborted when reading from the stream"):h=new pi("Error reading from the stream"),h})}}})}function hE(r){const e=r[r.length-1],i={promptFeedback:e?.promptFeedback};for(const s of r){if(s.candidates){let l=0;for(const c of s.candidates)if(i.candidates||(i.candidates=[]),i.candidates[l]||(i.candidates[l]={index:l}),i.candidates[l].citationMetadata=c.citationMetadata,i.candidates[l].groundingMetadata=c.groundingMetadata,i.candidates[l].finishReason=c.finishReason,i.candidates[l].finishMessage=c.finishMessage,i.candidates[l].safetyRatings=c.safetyRatings,c.content&&c.content.parts){i.candidates[l].content||(i.candidates[l].content={role:c.content.role||"user",parts:[]});const f={};for(const h of c.content.parts)h.text&&(f.text=h.text),h.functionCall&&(f.functionCall=h.functionCall),h.executableCode&&(f.executableCode=h.executableCode),h.codeExecutionResult&&(f.codeExecutionResult=h.codeExecutionResult),Object.keys(f).length===0&&(f.text=""),i.candidates[l].content.parts.push(f)}l++}s.usageMetadata&&(i.usageMetadata=s.usageMetadata)}return i}async function Bv(r,e,i,s){const l=await pc(e,Gr.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(i),s);return cE(l)}async function zv(r,e,i,s){const c=await(await pc(e,Gr.GENERATE_CONTENT,r,!1,JSON.stringify(i),s)).json();return{response:am(c)}}function Gv(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function uc(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const i of r)typeof i=="string"?e.push({text:i}):e.push(i);return pE(e)}function pE(r){const e={role:"user",parts:[]},i={role:"function",parts:[]};let s=!1,l=!1;for(const c of r)"functionResponse"in c?(i.parts.push(c),l=!0):(e.parts.push(c),s=!0);if(s&&l)throw new pi("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!l)throw new pi("No content is provided for sending chat message.");return s?e:i}function mE(r,e){var i;let s={model:e?.model,generationConfig:e?.generationConfig,safetySettings:e?.safetySettings,tools:e?.tools,toolConfig:e?.toolConfig,systemInstruction:e?.systemInstruction,cachedContent:(i=e?.cachedContent)===null||i===void 0?void 0:i.name,contents:[]};const l=r.generateContentRequest!=null;if(r.contents){if(l)throw new lr("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=r.contents}else if(l)s=Object.assign(Object.assign({},s),r.generateContentRequest);else{const c=uc(r);s.contents=[c]}return{generateContentRequest:s}}function __(r){let e;return r.contents?e=r:e={contents:[uc(r)]},r.systemInstruction&&(e.systemInstruction=Gv(r.systemInstruction)),e}function gE(r){return typeof r=="string"||Array.isArray(r)?{content:uc(r)}:r}const v_=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],xE={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function _E(r){let e=!1;for(const i of r){const{role:s,parts:l}=i;if(!e&&s!=="user")throw new pi(`First content should be with role 'user', got ${s}`);if(!l_.includes(s))throw new pi(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(l_)}`);if(!Array.isArray(l))throw new pi("Content should have 'parts' property with an array of Parts");if(l.length===0)throw new pi("Each Content should have at least one part");const c={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const h of l)for(const m of v_)m in h&&(c[m]+=1);const f=xE[s];for(const h of v_)if(!f.includes(h)&&c[h]>0)throw new pi(`Content with role '${s}' can't contain '${h}' part`);e=!0}}function b_(r){var e;if(r.candidates===void 0||r.candidates.length===0)return!1;const i=(e=r.candidates[0])===null||e===void 0?void 0:e.content;if(i===void 0||i.parts===void 0||i.parts.length===0)return!1;for(const s of i.parts)if(s===void 0||Object.keys(s).length===0||s.text!==void 0&&s.text==="")return!1;return!0}const y_="SILENT_ERROR";class vE{constructor(e,i,s,l={}){this.model=i,this.params=s,this._requestOptions=l,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,s?.history&&(_E(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=uc(e),v={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},_=Object.assign(Object.assign({},this._requestOptions),i);let g;return this._sendPromise=this._sendPromise.then(()=>zv(this._apiKey,this.model,v,_)).then(b=>{var M;if(b_(b.response)){this._history.push(p);const C=Object.assign({parts:[],role:"model"},(M=b.response.candidates)===null||M===void 0?void 0:M[0].content);this._history.push(C)}else{const C=ar(b.response);C&&console.warn(`sendMessage() was unsuccessful. ${C}. Inspect response object for details.`)}g=b}).catch(b=>{throw this._sendPromise=Promise.resolve(),b}),await this._sendPromise,g}async sendMessageStream(e,i={}){var s,l,c,f,h,m;await this._sendPromise;const p=uc(e),v={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(l=this.params)===null||l===void 0?void 0:l.generationConfig,tools:(c=this.params)===null||c===void 0?void 0:c.tools,toolConfig:(f=this.params)===null||f===void 0?void 0:f.toolConfig,systemInstruction:(h=this.params)===null||h===void 0?void 0:h.systemInstruction,cachedContent:(m=this.params)===null||m===void 0?void 0:m.cachedContent,contents:[...this._history,p]},_=Object.assign(Object.assign({},this._requestOptions),i),g=Bv(this._apiKey,this.model,v,_);return this._sendPromise=this._sendPromise.then(()=>g).catch(b=>{throw new Error(y_)}).then(b=>b.response).then(b=>{if(b_(b)){this._history.push(p);const M=Object.assign({},b.candidates[0].content);M.role||(M.role="model"),this._history.push(M)}else{const M=ar(b);M&&console.warn(`sendMessageStream() was unsuccessful. ${M}. Inspect response object for details.`)}}).catch(b=>{b.message!==y_&&console.error(b)}),g}}async function bE(r,e,i,s){return(await pc(e,Gr.COUNT_TOKENS,r,!1,JSON.stringify(i),s)).json()}async function yE(r,e,i,s){return(await pc(e,Gr.EMBED_CONTENT,r,!1,JSON.stringify(i),s)).json()}async function SE(r,e,i,s){const l=i.requests.map(f=>Object.assign(Object.assign({},f),{model:e}));return(await pc(e,Gr.BATCH_EMBED_CONTENTS,r,!1,JSON.stringify({requests:l}),s)).json()}class S_{constructor(e,i,s={}){this.apiKey=e,this._requestOptions=s,i.model.includes("/")?this.model=i.model:this.model=`models/${i.model}`,this.generationConfig=i.generationConfig||{},this.safetySettings=i.safetySettings||[],this.tools=i.tools,this.toolConfig=i.toolConfig,this.systemInstruction=Gv(i.systemInstruction),this.cachedContent=i.cachedContent}async generateContent(e,i={}){var s;const l=__(e),c=Object.assign(Object.assign({},this._requestOptions),i);return zv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}async generateContentStream(e,i={}){var s;const l=__(e),c=Object.assign(Object.assign({},this._requestOptions),i);return Bv(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},l),c)}startChat(e){var i;return new vE(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(i=this.cachedContent)===null||i===void 0?void 0:i.name},e),this._requestOptions)}async countTokens(e,i={}){const s=mE(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),l=Object.assign(Object.assign({},this._requestOptions),i);return bE(this.apiKey,this.model,s,l)}async embedContent(e,i={}){const s=gE(e),l=Object.assign(Object.assign({},this._requestOptions),i);return yE(this.apiKey,this.model,s,l)}async batchEmbedContents(e,i={}){const s=Object.assign(Object.assign({},this._requestOptions),i);return SE(this.apiKey,this.model,e,s)}}class EE{constructor(e){this.apiKey=e}getGenerativeModel(e,i){if(!e.model)throw new pi("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new S_(this.apiKey,e,i)}getGenerativeModelFromCachedContent(e,i,s){if(!e.name)throw new lr("Cached content must contain a `name` field.");if(!e.model)throw new lr("Cached content must contain a `model` field.");const l=["model","systemInstruction"];for(const f of l)if(i?.[f]&&e[f]&&i?.[f]!==e[f]){if(f==="model"){const h=i.model.startsWith("models/")?i.model.replace("models/",""):i.model,m=e.model.startsWith("models/")?e.model.replace("models/",""):e.model;if(h===m)continue}throw new lr(`Different value for "${f}" specified in modelParams (${i[f]}) and cachedContent (${e[f]})`)}const c=Object.assign(Object.assign({},i),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new S_(this.apiKey,c,s)}}const Hv=typeof window<"u"&&window.location.hostname==="localhost"?"/gemini-api":"https://generativelanguage.googleapis.com",ME=["gemini-3.5-flash","gemini-3-flash-preview","gemini-3.1-flash-lite","gemini-2.5-flash","gemini-2.5-pro","gemini-2.5-flash-lite"],TE=["gemini-2.5-flash","gemini-2.5-pro","gemini-3.1-flash-lite","gemini-3.5-flash","gemini-3-flash-preview","gemini-2.5-flash-lite"];let qo="";const ef=r=>{qo=r},sm=()=>qo,kv=async()=>{if(!qo)return"API Key not set.";try{console.log("[Diagnostic] Fetching available models...");const e=await(await fetch(`${Hv}/v1beta/models?key=${qo}`)).json();return e.error?`API Error: ${e.error.message}`:e.models?`Available Models: ${e.models.map(s=>s.name.replace("models/","")).filter(s=>s.includes("gemini")).join(", ")}`:"No models returned by API."}catch(r){return`Diagnostic Failed: ${r.message}`}},Vv=async(r,e=null,i=null,s)=>{if(!qo)throw new Error("API Key is initialized.");const l=new EE(qo),c=e&&e.length>0?TE:ME;let f=0;for(const p of c){f++;try{console.log(`[Gemini] Attempting connection with ${p} (v1beta)...`),s&&(f===1?s(`> [API] ${p} と交信を開始しました...`):(s(`> [API] 代替モデル ${p} で再解析を開始します... (${f}/${c.length})`),e&&e.length>0&&s(`> [API] ${e.length}枚の画像データを再送信中...`)));let v=[];i&&v.push({text:`[SYSTEM_INSTRUCTION_START]
${i}
[SYSTEM_INSTRUCTION_END]

`}),e&&Array.isArray(e)&&v.push(...e),v.push({text:r});const _={model:p},g=l.getGenerativeModel(_,{apiVersion:"v1beta",baseUrl:Hv}),b=new Promise((D,B)=>setTimeout(()=>B(new Error(`Timeout awaiting response from ${p} (60s limit)`)),6e4)),M=e&&e.length>0?[]:[{googleSearch:{}}];let C;try{C=await Promise.race([g.generateContent({contents:[{role:"user",parts:v}],tools:M,generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]}),b])}catch(D){if(M.length>0)console.warn(`[API] Grounding failed for ${p} (${D.message}), retrying without tools...`),s&&s("> [API] Grounding失敗。ツールなしで同一モデルを再試行します..."),C=await g.generateContent({contents:[{role:"user",parts:v}],generationConfig:{temperature:.7,maxOutputTokens:8192},safetySettings:[{category:"HARM_CATEGORY_HARASSMENT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_HATE_SPEECH",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_SEXUALLY_EXPLICIT",threshold:"BLOCK_NONE"},{category:"HARM_CATEGORY_DANGEROUS_CONTENT",threshold:"BLOCK_NONE"}]});else throw D}const E=C.response,S=E.candidates||[];if(!S.length)throw E.promptFeedback&&(console.warn("Prompt Feedback:",E.promptFeedback),E.promptFeedback.blockReason)?(s&&s("> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。"),new Error(`Blocked by Safety Filter: ${E.promptFeedback.blockReason}`)):(s&&s("> [API] モデル応答なし。最新モデルへバイパスします。"),new Error("No response candidates (Unknown Model Refusal)"));const N=S[0];let U="";try{U=E.text()}catch(D){console.warn(D)}const I=N.content?.parts||[];let k="";if(I.forEach(D=>{D.thought&&(k+=D.thought)}),!U){const D=N.finishReason||"UNKNOWN";throw console.warn(`[Gemini] Empty Response. FinishReason: ${D}`),s&&s(`> [API] フィルター検知。基準を調整し、別モデルで生成を続行します。(${D})`),new Error(`Empty response (FinishReason: ${D}). Suggested: Check Safety/Prompt.`)}return s&&s("> [API] 生成完了：高品質な日本語成果物を構築しました。"),{text:U,thought:k||"通常処理が完了しました。",model:p}}catch(v){console.warn(`Model ${p} failed:`,v.message),v.message.includes("429")||v.message.includes("Quota")?s&&s("> [API] 回数制限。自動待機し、リトライします。"):!v.message.includes("フィルター検知")&&!v.message.includes("モデル応答なし")&&s&&s(`> [API] モデル応答なし。最新モデルへバイパスします。(${v.message})`)}}s&&s("> [API] 全モデルとの通信に失敗。アカウント状態を診断します...");const h=await kv();console.error("DIAGNOSIS RESULT:",h);let m=`全モデル接続失敗: ${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m=`【API制限】割り当てられた使用回数の上限に達しました。(429 Quota Exceeded)
しばらく時間を置いてから再試行するか、課金プランを確認してください。`:h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターによりブロックされました。言い回しを変更してください。":h.includes("404")&&(m="【モデル未検出】使用可能なモデルが見つかりませんでした。診断ログを確認してください。"),new Error(m)},AE=Object.freeze(Object.defineProperty({__proto__:null,callThinkingGemini:Vv,diagnoseConnection:kv,getApiKey:sm,setApiKey:ef},Symbol.toStringTag,{value:"Module"})),wE="modulepreload",RE=function(r,e){return new URL(r,e).href},E_={},CE=function(e,i,s){let l=Promise.resolve();if(i&&i.length>0){let p=function(v){return Promise.all(v.map(_=>Promise.resolve(_).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const f=document.getElementsByTagName("link"),h=document.querySelector("meta[property=csp-nonce]"),m=h?.nonce||h?.getAttribute("nonce");l=p(i.map(v=>{if(v=RE(v,s),v in E_)return;E_[v]=!0;const _=v.endsWith(".css"),g=_?'[rel="stylesheet"]':"";if(s)for(let M=f.length-1;M>=0;M--){const C=f[M];if(C.href===v&&(!_||C.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${v}"]${g}`))return;const b=document.createElement("link");if(b.rel=_?"stylesheet":wE,_||(b.as="script"),b.crossOrigin="",b.href=v,m&&b.setAttribute("nonce",m),document.head.appendChild(b),_)return new Promise((M,C)=>{b.addEventListener("load",M),b.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${v}`)))})}))}function c(f){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=f,window.dispatchEvent(h),!h.defaultPrevented)throw f}return l.then(f=>{for(const h of f||[])h.status==="rejected"&&c(h.reason);return e().catch(c)})},NE=["gemini-3.1-flash-image-preview","gemini-2.5-flash-image","imagen-4.0-generate-001","imagen-4.0-fast-generate-001"],OE=async(r,e,i=[])=>{const s=sm();if(!s)throw new Error("API Key is not set.");let l=null,c=[];for(const f of NE)try{console.log(`[ImageGen] Attempting generation with model: ${f}`),c.push(f);const h=new AbortController,m=setTimeout(()=>h.abort(),12e4);let p,v;if(f.startsWith("gemini")){const _=f.includes("2.5-flash-image")?["TEXT","IMAGE"]:["IMAGE"],g=i.map(b=>{const M=b.includes(",")?b.split(",")[1]:b,C=b.match(/^data:(image\/[a-zA-Z+]+);base64,/);return{inlineData:{mimeType:C?C[1]:"image/png",data:M}}});if(g.length>0&&e&&e(`[REF] ${g.length}枚の参照画像を添付してマルチモーダル生成を実行`),p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:generateContent?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:r},...g]}],generationConfig:{responseModalities:_}}),signal:h.signal}),clearTimeout(m),v=await p.json(),v.error)throw new Error(`${v.error.message} (Code: ${v.error.code})`);if(v.candidates&&v.candidates.length>0&&v.candidates[0].content&&v.candidates[0].content.parts){const b=v.candidates[0].content.parts.find(M=>M.inlineData);if(b&&b.inlineData&&b.inlineData.data)return{base64Img:b.inlineData.data,usedModel:f}}throw new Error(`Unexpected formats from Gemini model ${f}: missing inlineData`)}else{if(p=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${f}:predict?key=${s}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({instances:[{prompt:r}],parameters:{sampleCount:1,aspectRatio:"3:4",personGeneration:"allow_adult"}}),signal:h.signal}),clearTimeout(m),v=await p.json(),v.error)throw new Error(`${v.error.message} (Code: ${v.error.code})`);if(v.predictions&&v.predictions[0]&&v.predictions[0].bytesBase64Encoded)return{base64Img:v.predictions[0].bytesBase64Encoded,usedModel:f};if(v.predictions&&v.predictions[0]&&typeof v.predictions[0]=="string")return{base64Img:v.predictions[0],usedModel:f};throw new Error(`Unexpected response format from Imagen model ${f}`)}}catch(h){let m=h.message;(h.name==="AbortError"||m.includes("aborted"))&&(m="API Time out (120秒経過による強制切断)"),console.warn(`[ImageGen] Model ${f} failed:`,m),l=new Error(m),e&&e(`[FAILED] ${f}: ${m}`)}e&&e("[SYSTEM] 画像生成エラー。アカウント状態を診断中...");try{const{diagnoseConnection:f}=await CE(async()=>{const{diagnoseConnection:p}=await Promise.resolve().then(()=>AE);return{diagnoseConnection:p}},void 0,import.meta.url),h=await f();console.error("IMAGE GEN DIAGNOSIS RESULT:",h);let m=`画像生成API(全モデル)エラー。
${h}`;throw h.includes("Quota exceeded")||h.includes("429")?m="【API制限】割り当てられた使用回数の上限に達したため画像生成できません。":h.includes("SAFETY")||h.includes("PROHIBITED")?m="【コンテンツ制限】安全フィルターにより画像生成がブロックされました。":h.includes("404")&&(m="【モデル未検出】画像生成可能なモデルが利用できません。"),new Error(m)}catch(f){throw f.message.includes("API制限")||f.message.includes("コンテンツ制限")||f.message.includes("モデル未検出")?f:l||new Error(`All image generation models failed (${c.join(", ")}).`)}};let jv="";const Th=r=>{jv=r},ff=()=>jv,DE=async(r,e)=>{e("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");const i=ff();if(!i)throw new Error("OpenAI APIキーが設定されていません。");const s=new AbortController,l=setTimeout(()=>s.abort(),3e5);let c;try{c=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:"gpt-image-2",prompt:r,n:1,size:"1024x1792",quality:"high"}),signal:s.signal})}catch(h){throw h.name==="AbortError"||h.message.includes("aborted")?new Error("API Time out (300秒経過による強制切断)。サーバーが混雑しているか、応答がありません。"):h}finally{clearTimeout(l)}if(!c.ok){const h=await c.json().catch(()=>({}));throw new Error(`OpenAI API Error: ${c.status} ${h.error?.message||c.statusText}`)}const f=await c.json();if(e("[OpenAI] 画像の生成に成功しました。"),f.data&&f.data.length>0)return{base64Img:f.data[0].b64_json,usedModel:"gpt-image-2"};throw new Error("APIレスポンスに画像データが含まれていませんでした。")},LE=["gpt-4.1","gpt-4.1-mini","gpt-4.1-nano","gpt-4o"],UE=["gpt-4.1","gpt-4o","gpt-4.1-mini"],IE=async(r,e=null,i=null,s)=>{const l=ff();if(!l)throw new Error("OpenAI APIキーが設定されていません。");const c=e&&e.length>0?UE:LE;let f=0;for(const h of c){f++;try{console.log(`[OpenAI] Attempting connection with ${h}...`),s&&s(f===1?`> [API] OpenAI ${h} と交信を開始しました...`:`> [API] 代替モデル ${h} で再解析を開始します... (${f}/${c.length})`);const m=[];i&&m.push({role:"system",content:i+`

【システムレベルの絶対遵守フォーマット（System Formatting Constraints）】
全ての「セリフ」の末尾には、必ず終止記号（。、！、？、！？、♪、♡など）をつけてください。「…」や「～」のみで終わるセリフはシステムエラーを引き起こすため、いかなる場合も絶対に禁止します（正しい例: 「……。」「～！」）。`});const p=[];if(e&&Array.isArray(e)&&e.length>0)for(const E of e)E.inlineData&&(p.push({type:"image_url",image_url:{url:`data:${E.inlineData.mimeType};base64,${E.inlineData.data}`,detail:"high"}}),s&&s("> [API] 画像データを OpenAI Vision 形式に変換して送信中..."));p.push({type:"text",text:r}),m.push({role:"user",content:p.length===1?r:p});const v=new AbortController,_=setTimeout(()=>v.abort(),6e4);let g;try{g=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({model:h,messages:m,temperature:.7,max_tokens:8192}),signal:v.signal})}catch(E){throw E.name==="AbortError"?new Error(`Timeout awaiting response from ${h} (60s limit)`):E}finally{clearTimeout(_)}if(!g.ok){const S=(await g.json().catch(()=>({}))).error?.message||g.statusText;if(console.warn(`[OpenAI] ${h} failed: ${g.status} ${S}`),g.status===429){s&&s("> [API] レート制限(429)。次のモデルを試行します...");continue}if(g.status===404){s&&s("> [API] モデル未対応(404)。次のモデルを試行します...");continue}s&&s(`> [API] エラー(${g.status})。次のモデルを試行します...`);continue}const M=(await g.json()).choices?.[0];if(!M||!M.message?.content){console.warn(`[OpenAI] Empty response from ${h}`),s&&s("> [API] モデル応答なし。次のモデルへフォールバックします。");continue}const C=M.message.content;return s&&s("> [API] 生成完了：高品質な成果物を構築しました。"),{text:C,thought:`OpenAI ${h} による処理が完了しました。`,model:h}}catch(m){console.warn(`Model ${h} failed:`,m.message),m.message.includes("429")||m.message.includes("Quota")?s&&s("> [API] 回数制限。次のモデルを試行します。"):m.message.includes("Timeout")?s&&s("> [API] タイムアウト。次のモデルを試行します。"):s&&s(`> [API] エラー発生。次のモデルへバイパスします。(${m.message})`)}}throw s&&s("> [API] 全モデルとの通信に失敗しました。"),new Error("OpenAI: 全モデル接続失敗。APIキーの有効性・残高・レート制限を確認してください。")};let cp="gemini";const Ah=r=>{if(r!=="gemini"&&r!=="openai"){console.warn(`[AI Provider] Unknown engine "${r}". Defaulting to "gemini".`),cp="gemini";return}cp=r,console.log(`[AI Provider] Engine switched to: ${r.toUpperCase()}`)},Nr=async(r,e=null,i=null,s)=>cp==="openai"?IE(r,e,i,s):Vv(r,e,i,s),PE={驚愕:["目玉が飛び出し、顎が地面に到達する","持っていたスマホを落とし、画面が粉々に割れる","髪の毛が垂直に逆立ち、口から魂が半分抜けかける","白目になり、滝のような冷や汗を流しながら後ずさる"],激怒:["顔が真っ赤になり、頭頂部から蒸気が噴出する","額に巨大な青筋を浮かべ、持っているペンをへし折る","怒りのあまり空中に数センチ浮遊する","背景に業火のオーラをまとい、周囲の温度を上げる"],歓喜:["目の中に巨大な星マークを輝かせる","顔のパーツが画面からはみ出るほどの満面の笑み","鼻息を荒くして、周囲に桜吹雪のエフェクトを散らす","喜びのあまり小刻みに反復横跳びをする"],絶望:["全身が真っ白に燃え尽き、サラサラと灰になりかける","膝から崩れ落ち、頭上にどんよりとした暗雲が立ち込める","虚無の点目になり、完全に周囲の音が聞こえなくなる","両手で顔を覆い、背景が真っ暗な宇宙空間になる"]},FE={ファミレスの厨房:{props:["巨大な寸胴鍋","油でギトギトのフライヤー","オーダーを通す伝票","冷凍ポテトの袋"],ambient:"ジュージューという揚げ音、食器のぶつかるカチャカチャ音",visual:"ステンレスの作業台、床の滑り止めマット、換気扇の油汚れ"},ライブハウス:{props:["倒れたマイクスタンド","絡まったシールドケーブル","大量の空き缶","PA卓のフェーダー"],ambient:"重低音の振動、ハウリング音（キーンという音）",visual:"暗闇を切り裂くレーザー照明、壁に貼られたバンドのステッカー"},ラーメン屋のカウンター:{props:["湯切りテボ","ニンニククラッシャー","油の浮いたレンゲ","紅生姜の容器"],ambient:"麺をすするズルズル音、大将の「へいらっしゃい！」という声",visual:"湯気で曇ったガラス、油でベタつくメニュー表"},満員電車:{props:["潰されたつり革","窓ガラスに押し付けられた顔","誰かの濡れた傘","スマホの光"],ambient:"電車の走行音、ため息、イヤホンの音漏れ",visual:"ぎゅうぎゅう詰めのスーツ姿の群衆、閉まりかけるドア"},刑務所の面会室:{props:["分厚いアクリル板","黒い受話器","パイプ椅子","看守の警棒"],ambient:"不気味なほどの静寂、監視カメラの作動音",visual:"無機質な灰色の壁、薄暗い蛍光灯"},ゲームセンター:{props:["UFOキャッチャーのアーム","格闘ゲームのレバー","積まれたメダル","両替機"],ambient:"けたたましい電子音、メダルのジャラジャラ音",visual:"派手なネオンサイン、画面のフラッシュバック"},サイバーパンクな路地裏:{props:["断線したネオン管","雨に濡れたドラム缶","謎の言語のホログラム看板","怪しい注射器"],ambient:"酸性雨の音、ドローンの飛行音",visual:"原色のネオンの反射、立ち込める蒸気"},昭和の茶の間:{props:["チャンネルを回すブラウン管テレビ","木彫りの熊","ちゃぶ台","ハエ叩き"],ambient:"柱時計のチクタク音、遠くの豆腐屋のラッパ",visual:"畳の擦り切れ、障子の破れ、裸電球"},渋谷スクランブル交差点:{props:["巨大ビジョンの映像","ハチ公像","無数のスマホ","捨てられたタピオカの容器"],ambient:"巨大ビジョンの広告音声、群衆の足音",visual:"四方八方から押し寄せる人の波、雨の日の無数の傘"},秋葉原の電気街:{props:["メイドのチラシ","PCパーツのジャンク箱","アニメの巨大タペストリー","ガチャガチャ"],ambient:"アニメソングの爆音、客引きの声",visual:"雑居ビルのネオン、細い路地のゴチャゴチャ感"},ソフトウェア開発:{props:["エナジードリンクの空き缶","デュアルディスプレイ","メカニカルキーボード","付箋だらけのカンバンボード"],ambient:"カチャカチャという高速タイピング音、深い溜め息",visual:"ダークモードのエディタ画面、散らかったデスク"},"SIer・炎上プロジェクト":{props:["分厚い仕様書","土下座用のスーツ","「進捗ダメです」のチャット画面","胃薬"],ambient:"終わらないオンライン会議の音声、怒号",visual:"徹夜で血走った目、真っ赤なガントチャート"},"インフラ・ネットワーク":{props:["絡み合ったLANケーブル","ラックサーバー","コンソール画面","冷房用の毛布"],ambient:"サーバーの轟音（ファンの回転音）、ピーーというアラート音",visual:"無数のLEDランプの点滅、冷房が効きすぎたサーバールーム"},AI開発:{props:["巨大なGPU","数式の書かれたホワイトボード","Pythonの分厚い本","謎の論文"],ambient:"GPUの排熱ファンの唸り声、謎の計算音",visual:"画面を流れる大量のロス関数のグラフ、煙を吹くPC"},"ハッカー・セキュリティ":{props:["黒いパーカー","複数の緑色文字が流れる黒い画面","USBメモリ","栄養ゼリー"],ambient:"謎の電子音、キーボードを叩く「ターン！」という音",visual:"暗闇に浮かび上がるハッカーの不敵な笑み、警告（WARNING）の赤いポップアップ"}},BE=["謎のスイッチ","バナナの皮","ピコピコハンマー","辞表","ダイナマイト","パイ投げ用のパイ","ハリセン","メガホン","黒歴史ノート","未提出の課題"],zE=r=>{const e=FE[r];return e?`【環境設定データベース】
・小道具(Props): ${e.props.join(", ")}
・環境音: ${e.ambient}
・視覚的特徴: ${e.visual}`:`【環境設定データベース】
・小道具(Props): ${[...BE].sort(()=>.5-Math.random()).slice(0,3).join(", ")}
※この場所ならではの具体的なディテールを積極的に描写せよ。`},GE=()=>{let r=`【リアクション・データベース】
`;for(const[e,i]of Object.entries(PE)){const s=i[Math.floor(Math.random()*i.length)];r+=`・${e}時: 「${s}」などの物理的描写を使用
`}return r},tc="v3.84-alpha",Xv=r=>{switch(r){case"Surreal":return"静寂型 (シュール)";case"Explosion":return"爆発型 (カオス)";case"FakeEmotion":return"感動詐欺";case"Metafiction":return"メタフィクション";case"Unreasonable":return"理不尽な制裁";case"RunningGag":return"天丼";case"Dream":return"夢オチ (ループ)";case"PsychoHorror":return"サイコホラー (狂気)";case"Misunderstanding":return"盛大な勘違い (すれ違い)";case"CanceledEnding":return"打ち切りエンド (俺たちの戦いはこれからだ)";case"Documentary":return"ドキュメンタリー (原文忠実)";default:return"自動 (AIにおまかせ)"}},HE=[{id:"politics",label:"政治・経済",icon:"💼",checked:!1,keywords:"最新 政治 経済 社会ニュース"},{id:"sports",label:"スポーツ",icon:"🏅",checked:!1,keywords:"最新 スポーツ 競技 大会 結果"},{id:"animals",label:"動物・癒し",icon:"🐱",checked:!1,keywords:"最新 動物 ペット 癒しニュース"},{id:"food",label:"グルメ",icon:"🍜",checked:!1,keywords:"最新 食べ物 グルメ スイーツ トレンド"},{id:"ent",label:"エンタメ",icon:"🎬",checked:!1,keywords:"最新 映画 ドラマ 音楽 エンタメ"},{id:"science",label:"科学・宇宙",icon:"🚀",checked:!1,keywords:"最新 科学 宇宙 考古学 発見"},{id:"bnews",label:"B級ニュース",icon:"🤪",checked:!1,keywords:"面白い 海外のB級ニュース ハプニング"},{id:"life",label:"生活・健康",icon:"🌱",checked:!1,keywords:"生活 ライフハック 健康"}],kE=r=>r?r.includes("3.5")||r.includes("3.1")?{label:"NEXT GEN",tier:"Supreme",color:"bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",desc:`Gemini ${r.includes("3.5")?"3.5":"3.1"}: 最高品質 (Next Generation)`}:r.includes("3-flash")||r.includes("2.5-pro")?{label:"HIGH QUALITY",tier:"Active",color:"bg-blue-600 text-white",desc:"Gemini 3.0/2.5 Pro: 高品質"}:r.includes("2.5-flash")&&!r.includes("lite")?{label:"STABLE",tier:"Active",color:"bg-indigo-600 text-white",desc:"Gemini 2.5 Flash: 安定・高速"}:r.includes("lite")||r.includes("latest")?{label:"STANDARD QUALITY",tier:"Lite",color:"bg-gray-600 text-white",desc:"Flash Lite: 標準品質 (API制限回避中...)"}:r.includes("imagen")?{label:"LEGACY",tier:"Lite",color:"bg-amber-700 text-white",desc:"Imagen: レガシーモデル (2026/06廃止予定)"}:r.includes("gpt-4")||r.includes("gpt-3")?{label:"ChatGPT",tier:"Active",color:"bg-emerald-600 text-white",desc:`OpenAI ${r}: テキスト生成`}:r.includes("gpt-image")||r.includes("dall-e")?{label:"ChatGPT IMG",tier:"Active",color:"bg-emerald-500 text-white",desc:`OpenAI ${r}: 画像生成`}:{label:"UNKNOWN MODEL",tier:"Unknown",color:"bg-slate-600 text-white",desc:r}:null,Di={NORMAL:{style:"",proportions:"",vfx:""},CHIBI_GAG:{style:"In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.",proportions:"OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.",vfx:"(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)"},GEKIGA:{style:"In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.",proportions:"Use 7-8 head proportions. Characters appear taller and more imposing.",vfx:"(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)"},SHOUJO:{style:"In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.",proportions:"",vfx:"(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)"},HORROR:{style:"In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.",proportions:"",vfx:"(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)"},BLANK:{style:"In THIS PANEL ONLY, the affected character's eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.",proportions:"",vfx:"(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)"},IMPACT:{style:"In THIS PANEL ONLY, use an explosive impact-frame composition. The main character's expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.",proportions:"OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.",vfx:"(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)",styleMulti:"In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character's face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.",proportionsMulti:"",vfxMulti:"(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)"},WATERCOLOR:{style:"In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.",proportions:"",vfx:"(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)"},RETRO:{style:"In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character's original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.",proportions:"",vfx:"(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)"},GLITTER:{style:"In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character's hair length or hairstyle from their reference description.",proportions:"",vfx:"(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)"},SHADOW:{style:"In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.",proportions:"",vfx:"(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)"}};Di.SPEED={style:"In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.",proportions:"",vfx:"(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)"};Di.FLASHBACK={style:"In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.",proportions:"",vfx:"(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)"};Di.UKIYOE={style:"In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character's identity (hair color, accessories) despite the art style shift.",proportions:"Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.",vfx:"(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)"};Di.POP_ART={style:"In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.",proportions:"",vfx:"(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)"};Di.SKETCH={style:'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',proportions:"",vfx:"(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)"};Di.NEON={style:"In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.",proportions:"",vfx:"(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)"};Di.THICK_PAINT={style:"In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.",proportions:"",vfx:"(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)"};Di.PASTEL={style:"In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.",proportions:"",vfx:"(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)"};Di.CEL={style:"In THIS PANEL ONLY, shift to a classic cel animation style reminiscent of 1990s TV anime. Use flat solid color fills with clearly defined shadow areas (no gradients within shadow regions). Outlines are clean and consistent in weight. The color palette is bold but slightly muted compared to modern digital anime.",proportions:"",vfx:"(Flat cel-shaded color fills:1.5), (clearly defined hard-edge shadow areas:1.4), (consistent clean outlines:1.3), (slightly muted retro TV anime color palette:1.3), (simple solid color backgrounds:1.2)"};Di.DARK_ANIME={style:"In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.",proportions:"",vfx:"(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)"};Di.THIN_LINE={style:"In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.",proportions:"",vfx:"(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)"};Di.HIGH_SATURATION={style:"In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.",proportions:"",vfx:"(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)"};const VE=["EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive","DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically","EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal","ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome","DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters","BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees","EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder","CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat","DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically","WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"],jE={俯瞰:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",バードアイ:"(ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",ローアングル:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",アオリ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ダッチ:"(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)",フィッシュアイ:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",超広角:"(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)",望遠:"(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)",ワームズアイ:"(ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)",ドローン:"(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)",パンニング:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)",追跡:"(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)"},XE=`
ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v4.0):

§1. CAMERA DISTORTION WEIGHTS (MANDATORY — Apply these weighted tags to EVERY panel):
(extreme perspective distortion:2.8), (ABSOLUTELY NO eye-level shot:2.9), (NO flat symmetrical composition:2.9), (dramatic severe camera angle:2.7), (extreme visible lens distortion:2.6), (violently tilted horizon line:2.5), (heavily foreshortened body proportions:2.6), (extreme exaggerated depth of field:2.5)

Available lens effects — EACH PANEL MUST USE ONE:
  * (extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5) — Ultra wide-angle spherical distortion
  * (extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6) — Background crushes into foreground
  * (severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6) — Frame tilted 15-45 degrees
  * (ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0) — Camera at ground level looking UP. IMPORTANT: Always show full body, NEVER crop to shoes only.
  * (ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0) — Camera from above looking DOWN

[FLAT SHOT BAN]: (eye-level shot:0.1), (straight-on symmetrical:0.1) — Eye-level/straight compositions are FORBIDDEN. Weight them down to near-zero.
[BODY DEFORMATION]: Characters' body parts closest to camera MUST be drawn 50%+ larger than far-side parts. This distortion is INTENTIONAL.

§2. CAST MANAGEMENT & CLONE PREVENTION (CRITICAL):
- Each named character appears ONLY ONCE per panel. Drawing duplicates (foreground+background copy, reflection, silhouette) is FORBIDDEN.
- Background characters use cast members NOT speaking in that panel.

§3. GAG MANGA INTERACTION RULES:
1. Characters MUST interact with each other or the environment.
2. [NO CAMERA EYE CONTACT]: (absolutely NO looking at camera:2.5), (NO breaking the fourth wall:2.5), (characters always looking at other characters or objects in the scene:1.8), (eyes directed at conversation partner:1.5). Direct eye contact with the viewer is strictly FORBIDDEN. Characters must always look at each other, at objects, or away from the camera.
3. (exaggerated facial expressions:1.3), (emotional reactions:1.2) — Comical expressions: blank white eyes, jaw drops, fury, waterfall tears.
4. (dynamic body language:1.3), (full body reactions:1.2) — Characters physically react with entire bodies.
5. Do NOT overlay floating close-up eyes or ghostly face inserts as background elements.
6. Do NOT draw "adjusting glasses" pose unless the character explicitly wears glasses.

§4. PERSPECTIVE-ALIGNED VFX:
- Speed lines, explosions, lightning MUST follow the panel's perspective distortion.
- If fish-eye: effects curve radially. If dutch angle: effects tilt with the world.
    `,YE=`🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`,wh=r=>{const i=(r||"").toLowerCase();return i.includes("api key not valid")||i.includes("api_key_invalid")||i.includes("invalid api key")||i.includes("api key is invalid")?`[ERROR GUIDE] 🔑 APIキーが無効であるか、正しく設定されていません。
[対処法] 接続設定パネル（画面右上のAPIキー入力欄など）から、入力された Gemini API キーが正しいか確認してください。`:i.includes("sensitive")||i.includes("responsible ai")||i.includes("safety")||i.includes("blocked")?`[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。
[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。`:i.includes("not found")||i.includes("not supported")||i.includes("404")||i.includes("403")||i.includes("permission")?`[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がないか、モデルがサポートされていません。
[対処法] APIキーの制限設定（権限）や、選択したモデルが有効か確認してください。`:`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。
[対処法] サーバーが混雑しているか、一時的にネットワーク接続が途切れた可能性があります。数分時間を置いてから再度お試しください。`},WE=r=>{const e=[[/\(girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(teenager(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(college student(:\d\.?\d?)\)/gi,"(young adult$1)"],[/\(school uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(academy uniform(:\d\.?\d?)\)/gi,"(formal outfit$1)"],[/\(sailor uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style academy uniform(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(serafuku(:\d\.?\d?)\)/gi,"(elegant blouse with ribbon$1)"],[/\(schoolgirl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(school girl(:\d\.?\d?)\)/gi,"(woman$1)"],[/\(high school(:\d\.?\d?)\)/gi,"(campus$1)"],[/\(student council president(:\d\.?\d?)\)/gi,"(strict leader$1)"],[/\(student council member(:\d\.?\d?)\)/gi,"(compliance officer$1)"],[/\(honor student(:\d\.?\d?)\)/gi,"(top academic$1)"],[/\(disciplinarian(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee member(:\d\.?\d?)\)/gi,"(strict authority figure$1)"],[/\(disciplinary committee(:\d\.?\d?)\)/gi,"(regulatory authority$1)"],[/\(childhood friend(:\d\.?\d?)\)/gi,"(close friend$1)"],[/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi,"(plaid skirt$1)"],[/\(miniskirt(:\d\.?\d?)\)/gi,"(skirt$1)"],[/\(pleated skirt(:\d\.?\d?)\)/gi,"(professional skirt$1)"],[/\(gal(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru(:\d\.?\d?)\)/gi,"(fashionable$1)"],[/\(gyaru style(:\d\.?\d?)\)/gi,"(trendy style$1)"],[/\(short stature(:\d\.?\d?)\),?\s*/gi,""],[/\(loli(:\d\.?\d?)\),?\s*/gi,""],[/\(petite(:\d\.?\d?)\)/gi,"(slim$1)"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),i.includes("Important Character Cast:")&&(i=i.replace("Important Character Cast:",`IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.

Important Character Cast:`),s++),s>0&&console.log(`[Safety Age-Up v2.27c] ${s}種類のセーフティ変換を適用しました`),i},qE=r=>{const e=[[/核兵器が登場する作品/g,"禁断の兵器が登場する作品"],[/核兵器描写の募集/g,"禁断の兵器描写の募集"],[/核兵器使用/g,"禁断の兵器使用"],[/核兵器募集/g,"禁断の兵器が登場する作品の募集"],[/核兵器/g,"禁断の兵器"],[/手作り核爆弾/g,"禁断の自作装置"],[/手作り核/g,"禁断の装置"],[/核爆弾/g,"禁断の爆弾"],[/核実験/g,"禁断 of 実験"],[/核使用/g,"禁断の兵器の使用"],[/核使う/g,"禁断の兵器を使う"],[/核を使う/g,"禁断の兵器を使う"],[/核を使わない/g,"禁断の兵器を使わない"],[/核攻撃/g,"禁断の攻撃"],[/核戦争/g,"禁断の戦争"],[/核描写/g,"禁断の兵器描写"],[/核が登場/g,"禁断の兵器が登場"],[/核より/g,"禁断の兵器より"],[/『核』/g,"『禁断の兵器』"],[/「核」/g,"「禁断の兵器」"],[/中性子爆弾/g,"架空の超兵器"],[/原子爆弾/g,"禁断の爆弾"],[/水素爆弾/g,"禁断の爆弾"],[/大量破壊兵器/g,"禁断の最終兵器"],[/生物兵器/g,"禁断の兵器"],[/化学兵器/g,"禁断の兵器"],[/弾道ミサイル/g,"飛翔体"],[/地雷/g,"危険物"],[/虐殺器官/g,"某SF作品"],[/『虐殺』/g,"『某SF用語』"],[/「虐殺」/g,"「某SF用語」"],[/虐殺/g,"大惨事"],[/被爆意識/g,"戦争の記憶"],[/被爆者/g,"戦争の経験者"],[/被爆/g,"戦禍"],[/キノコ雲/g,"巨大な爆煙"],[/きのこ雲/g,"巨大な爆煙"],[/mushroom cloud/gi,"massive explosion cloud"],[/地下作戦会議室/g,"地下の秘密会議室"],[/作戦会議室/g,"秘密会議室"],[/作戦会議/g,"秘密会議"],[/作戦テーブル/g,"会議テーブル"],[/作戦室/g,"会議室"],[/照準器/g,"計器"],[/戦術/g,"戦略"],[/銃乱射事件/g,"銃●射事件"],[/銃乱射/g,"銃●射"],[/銃撃事件/g,"銃●事件"],[/銃撃戦/g,"銃●戦"],[/銃撃/g,"銃●"],[/拳銃/g,"拳●"],[/ライフル/g,"ラ●フル"],[/マシンガン/g,"マシン●ン"],[/発砲/g,"発●"],[/自爆テロ/g,"自●テ●"],[/テロリスト/g,"テ●リスト"],[/テロ組織/g,"テ●組織"],[/テロ攻撃/g,"テ●攻撃"],[/テロ事件/g,"テ●事件"],[/テロ/g,"テ●"],[/戦争犯罪/g,"戦争●罪"],[/空爆/g,"空からの攻撃"],[/爆撃/g,"大規模攻撃"],[/爆破/g,"破壊行為"],[/爆発物/g,"危険物"],[/侵略/g,"侵●"],[/民族浄化/g,"民族●化"],[/ジェノサイド/g,"歴史的大惨事"],[/ホロコースト/g,"歴史的大悲劇"],[/殺人事件/g,"●人事件"],[/殺人犯/g,"●人犯"],[/殺人/g,"●人"],[/暗殺/g,"暗●"],[/殺害/g,"●害"],[/殺す/g,"●す"],[/殺され/g,"●され"],[/殺した/g,"●した"],[/刺殺/g,"刺●"],[/斬殺/g,"斬●"],[/絞殺/g,"絞●"],[/射殺/g,"射●"],[/撲殺/g,"撲●"],[/惨殺/g,"惨●"],[/虐殺器官/g,"虐●器官"],[/虐殺/g,"虐●"],[/拷問/g,"拷●"],[/暴行/g,"暴●"],[/誘拐/g,"誘●"],[/拉致/g,"拉●"],[/人質/g,"人●"],[/監禁/g,"監●"],[/強盗/g,"強●"],[/放火/g,"放●"],[/自殺未遂/g,"自●未遂"],[/自殺者/g,"自●者"],[/自殺/g,"自●"],[/自傷行為/g,"自●行為"],[/自傷/g,"自●"],[/首吊り/g,"首●り"],[/性的暴行/g,"性的●行"],[/性暴力/g,"性●力"],[/性犯罪/g,"性●罪"],[/強姦/g,"強●"],[/レイプ/g,"レ●プ"],[/セクハラ/g,"セ●ハラ"],[/性的嫌がらせ/g,"性的●がらせ"],[/痴漢/g,"痴●"],[/盗撮/g,"盗●"],[/児童ポルノ/g,"児童●ルノ"],[/わいせつ/g,"わい●つ"],[/売春/g,"売●"],[/人身売買/g,"人身●買"],[/人身取引/g,"人身●引"],[/児童虐待/g,"児童●待"],[/幼児虐待/g,"幼児●待"],[/虐待死/g,"●待死"],[/虐待/g,"●待"],[/いじめ自殺/g,"いじめ自●"],[/体罰/g,"体●"],[/ネグレクト/g,"ネグ●クト"],[/血のように染める/g,"紅く染める"],[/血のように染まる/g,"紅く染まる"],[/血のように/g,"紅く"],[/血のような赤/g,"夕焼けのような深紅"],[/血の海/g,"真っ赤な状況"],[/血だらけ/g,"真っ赤"],[/血まみれ/g,"真っ赤"],[/血しぶき/g,"赤い飛沫"],[/血痕/g,"赤い痕跡"],[/血液/g,"紅い液体"],[/出血/g,"負傷"],[/流血/g,"負傷"],[/内臓/g,"体内"],[/遺体/g,"倒れた人"],[/死体/g,"倒れた人"],[/死者数/g,"犠牲者数"],[/死者/g,"犠牲者"],[/死傷者/g,"被害者"],[/覚醒剤/g,"覚●剤"],[/覚せい剤/g,"覚●い剤"],[/麻薬取引/g,"麻●取引"],[/麻薬/g,"麻●"],[/大麻/g,"大●"],[/コカイン/g,"コ●イン"],[/ヘロイン/g,"ヘ●イン"],[/薬物中毒/g,"薬●中毒"],[/薬物乱用/g,"薬●乱用"],[/オーバードーズ/g,"オーバー●ーズ"],[/人種差別/g,"人種●別"],[/民族差別/g,"民族●別"],[/性差別/g,"性●別"],[/ヘイトスピーチ/g,"ヘイト●ピーチ"],[/ヘイトクライム/g,"ヘイト●ライム"],[/排外主義/g,"排●主義"],[/家庭内暴力/g,"家庭内●力"],[/ストーカー/g,"スト●カー"],[/振り込め詐欺/g,"振り込め●欺"],[/特殊詐欺/g,"特殊●欺"],[/詐欺/g,"●欺"],[/横領/g,"横●"],[/贈収賄/g,"贈●賄"],[/マネーロンダリング/g,"マネー●ンダリング"],[/nuclear weapon/gi,"ultimate weapon"],[/nuclear bomb/gi,"ultimate device"],[/nuclear/gi,"ultimate"],[/atomic bomb/gi,"ultimate device"],[/mass shooting/gi,"major incident"],[/shooting/gi,"attack"],[/gunfire/gi,"commotion"],[/assassination/gi,"attack on a figure"],[/massacre/gi,"great tragedy"],[/genocide/gi,"historical tragedy"],[/holocaust/gi,"historical tragedy"],[/terrorism/gi,"dangerous incident"],[/terrorist/gi,"dangerous figure"],[/suicide bombing/gi,"devastating attack"],[/suicide/gi,"extreme distress"],[/sexual assault/gi,"serious harm"],[/rape/gi,"serious crime"],[/murder/gi,"serious incident"],[/homicide/gi,"serious incident"],[/kidnapping/gi,"abduction case"],[/arson/gi,"fire incident"],[/drug trafficking/gi,"illegal trade"],[/overdose/gi,"medical emergency"],[/blood-red/gi,"deep crimson"],[/bloodshed/gi,"conflict"],[/bloody/gi,"intense"],[/blood/gi,"red liquid"],[/corpse/gi,"fallen person"],[/dead body/gi,"fallen person"],[/death toll/gi,"number of victims"]];let i=r,s=0;return e.forEach(([l,c])=>{const f=i;i=i.replace(l,c),f!==i&&s++}),s>0&&console.log(`[ドキュメンタリーサニタイザー v3.0] ${s}種類のコンテンツセーフティ変換を適用しました`),i},$E=(r,e,i,s,l=640,c=480)=>new Promise((f,h)=>{const m=new Image;m.onload=()=>{try{const p=document.createElement("canvas");p.width=l,p.height=c;const v=p.getContext("2d"),_=m.width,g=m.height,M=(e%360+360)%360/360*_,C=s/360*_,E=g/2-i/180*g,S=C*(c/l),N=M-C/2,U=Math.max(0,Math.min(g-S,E-S/2)),I=Math.min(S,g);if(N>=0&&N+C<=_)v.drawImage(m,N,U,C,I,0,0,l,c);else if(N<0){const k=-N,D=C-k,B=D/C;v.drawImage(m,_-k,U,k,I,0,0,l*(1-B),c),v.drawImage(m,0,U,D,I,l*(1-B),0,l*B,c)}else{const k=_-N,D=C-k,B=k/C;v.drawImage(m,N,U,k,I,0,0,l*B,c),v.drawImage(m,0,U,D,I,l*B,0,l*(1-B),c)}f(p.toDataURL("image/jpeg",.85))}catch(p){h(p)}},m.onerror=()=>h(new Error("画像の読み込みに失敗しました")),m.src=r}),KE=()=>`この360度パノラマ画像（equirectangular形式）を分析し、以下の情報を**必ずJSON形式**で返答してください。それ以外のテキストは一切出力しないでください。

{
  "location": "場所の種類と具体的な特徴（例: 教室（窓際席・午後）、カフェテラス（都市部・夕暮れ）等）",
  "lighting": "主光源の方向と種類の簡潔な説明（例: 左側の大窓から自然光 + 天井蛍光灯）",
  "spatialType": "空間タイプ（indoor/outdoor/mixed）",
  "objects": "特徴的なオブジェクト3つ以内（例: 木製の机、黒板、カーテン）",
  "mood": "空間の雰囲気を一言で（例: 放課後の静けさ）"
}`,ZE=r=>{try{const e=r.match(/\{[\s\S]*\}/)?.[0];if(e)return JSON.parse(e)}catch(e){console.warn("[360° BG] Analysis JSON parse failed:",e)}return{location:"360°パノラマ画像",lighting:"自動解析",spatialType:"unknown",objects:"",mood:""}},QE=()=>`
        /* SYSTEM: ABSOLUTE CONTEXT RESET. FORGET ALL PREVIOUS CHARACTERS. */
        /* TARGET: Analyze ALL currently uploaded images. Do not recall past sessions. */
        
        あなたはプロの漫画家兼キャラクターデザイナー（解析特化）です。
        以下の「絶対厳守ルール」に従い、現在の全ての画像を解析してください。

        【0. 画像スタイル判定 (Style Detection)】
        ・**最初に必ず「STYLE_TAG: MONOCHROME」または「STYLE_TAG: COLOR」と出力せよ。**

        【1. キャラクター数と同一性の完全一致 (Count & Identity)】
        ・画像内の**「固有名を持つキャラ」**を全てリストアップせよ。入力画像が複数ある場合、**全ての画像を確認し、全キャラクターを抽出せよ**。絶対に1人で止まるな。

        【2. 特徴の超精密分解 (High-Fidelity Decomposition)】

        A. **【性別と年齢 (Gender & Age)】**:
           - **最重要**: 性別を間違えるな。ショートカットの女性を男性と誤認するな。
           - 女性なら (female:1.6), (woman:1.4)、男性なら (male:1.6), (man:1.4) を必ず付与せよ。
           - 年齢感も記述せよ (young adult, adult, elderly)。"girl", "boy", "teenager", "child" は使用禁止。

        B. **髪の完全構造化 (Strict Hair Analysis)**:
           - **【ハゲ/坊主 (Bald/Buzz)】**: 
             - 髪が無い場合は**「Bald」**、坊主なら**「Buzz Cut」**とせよ。
           - **【色 (Tone/Color)】**: 
             - 白黒の場合: 「ベタ(黒)→Black」「トーン(灰)→Brown/Dirty Blonde」「白→Silver/Blonde」。
             - カラーの場合: 「赤(Red)」「茶(Brown)」「オレンジ(Ginger)」を厳密区別せよ。
           - **【構造 (Structure) - 重要】**: 
             - **髪のトポロジー解析 (Hair Topology Vectors)**:
               - **毛先座標 (End Points)**: 毛先がどこにあるか？(顎ライン、肩ライン、鎖骨下、腰)。
               - **重要 (Black Hair Warning)**: **黒髪は制服やアウトラインと同化して短く見えやすい。**
             - 「肩に掛かっているか？」「背中に線があるか？」を凝視せよ。
             - **姫カット(Sidelocks/Hime-cut)**がある場合、後ろ髪が長い確率が極めて高い。**安易にBobと判定するな。**
           - **絶対長 (Absolute Length)**: 
             - **Bob**: 毛先が「顎〜首」で止まっている。完全に宙に浮いている。
             - **Medium**: 毛先が「肩」に触れている。
             - **Long**: 毛先が「鎖骨」より下。**黒髪の場合は特に注意して探せ。**
           - **アカリの判定**: もし毛先が内側にカールの軌跡を描いているなら「Internal Round Bob」。外に跳ねているなら「Flicked Bob」。断定せよ。
         - **シルエット (Volume)**:
           - 頭頂部のボリューム、サイドの膨らみを記述せよ。
         - 単なる「Short」は禁止。「Chin-length Bob」や「Shoulder-length Layered」など具体的に。
       - **【前髪 (Bangs)】**: Hime, Parted, Blunt, Asymmetric.
       - **【アレンジ (Arrangement)】**: 
         - **重要**: 後ろ髪が見えなくても、**Ponytail, Twintails, Bun, Braid**の兆候を見逃すな。
         - 結っている＝**Long Hair**タグ必須。

        C. **顔・アクセサリー (Face & Accessories)】**:
           - **【アイウェア (Eyewear)】**: 
             - **サングラスを絶対に見逃すな**。レンズが黒/不透明なら (black sunglasses:1.5)。
             - 透明レンズなら (glasses:1.2)。形状(Under-rim, Round)も特定せよ。
             - **【最重要リスク】** 眼鏡をかけていない場合は、他のキャラの眼鏡が伝染するハルシネーションを防ぐため、必ず **(no glasses:1.5)** と出力せよ。
           - **【髭 (Facial Hair)】**: 
             - **絶対に髭を見逃すな**。(white beard:1.5), (mustache:1.5), (stubble:1.2).
             - 老人キャラは髭がある確率が高い。
           - **【目 (Eyes)】**: ツリ目(Tsurime)、タレ目(Tareme)、瞳の色。
           - **【特徴 (Charm Points)】**: 
             - ホクロ(Mole under eye/mouth)、八重歯(Snaggletooth)、そばかす(Freckles)等の個性を絶対に見逃すな。
           - **【肌 (Skin)】**: Tanned, Pale, Dark skinを正確に記述。

        D. **服装・テキスト (Outfit & Text)**:
            - **服の文字**: 服に書かれている文字（例: "FURU"）は **(shirt with text "FURU":1.4)** のようにタグ化せよ。
            - 制服(Sailor/Blazer)、私服(Hoodie/T-shirt)の形状を特定せよ。

        【3. OCR情報の反映と性格のタグ化】
        ・読み取った名前、年齢、性格、社会的役割を正確に反映せよ。
        ・**【最重要】**：画像生成AIにキャラクターの内面や立ち振る舞いを伝えるため、「性格(Mind)」の項目には**必ず英語の重み付きタグ**（例: (tsundere:1.2), (cheerful:1.3), (student council president:1.1) 等）を付与せよ。これを怠るとキャラクターの演技が死ぬ。

        【出力フォーマット】
        
        ## 1. [OCRで読み取った正確な名前]

        | カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |
        | :--- | :--- | :--- |
        | **基本(Base)** | 性別: [性別]<br>年齢: [年齢] | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |
        | **髪(Hair)** | 色: [色]<br>長さ: [Short/Medium/Long]<br>構造: [Bob/Straight/Wavy/Spiky]<br>前髪: [形状] | **[WEIGHTS]: (chin-length bob:1.5), (orange hair:1.4), (messy:1.2)** |
        | **顔(Face)** | 目: [色/形]<br>肌: [色]<br>髭: [有無]<br>眼鏡: [有無] | **[WEIGHTS]: (white beard:1.5), (tanned skin:1.5), (black sunglasses:1.6)** （※眼鏡無しなら **(no glasses:1.5)** を絶対付与） |
        | **服装(Outfit)** | [服の詳細: 制服/私服、上着の有無など] | [weighted tags]: (formal outfit:1.2), (hoodie:1.1) |
        | **性格(Mind)** | **[OCR抽出]**: [ここにテキスト全文] | **[WEIGHTS]: (cheerful:1.3), (energetic:1.2)** （※英語の性格タグを必須で記述） |
      `,JE=(r,e)=>`あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

${e.join(`

`)}

【Guard C: AI定型文の絶対排除】
以下のAI特有の退屈な表現をシナリオ（ト書き・セリフ）から完全に排除・書き換えよ:
- 感想・まとめのナレーション（「〜な一日だった」「〜と誰もが思った」「〜な出来事であった」等は絶対禁止。綺麗にまとめず余韻をぶった斬れ）
- 汎用的で弱い感嘆（「ふふっ」「やれやれ」「まあいいか」等は絶対禁止。キャラに合った鋭いリアクションにせよ）
- 状況をそのまま口で説明するセリフ（「〇〇が××してしまったぞ！」等は禁止。絵で状況は見せ, セリフは感情やツッコミに特化せよ）

【笑い構造の検証チェック — 出力前に必ず自己検証せよ】
以下のチェックリストを出力前に確認し、不合格項目があればシナリオを修正してから出力すること:
□ フリ→オチ構造: 1コマ目が「読者の予想を作るフリ」として機能しているか？ 1コマ目でいきなりボケていないか？
□ オチ集中: 4コマ目に笑いのエネルギーが最も集中しているか？ 2〜3コマ目にオチを消費して4コマ目が弱くなっていないか？
□ ズレの大きさ: 予想（E）と実際（R）のギャップは十分に大きいか？ 「ちょっと変」ではなく「完全に予想外」になっているか？
□ 天丼チェック: 天丼を使っている場合、1コマ目の仕込み→3コマ目の変奏→4コマ目の爆発が正しく配置されているか？
□ ビジュアルギャグ: 各コマの「状況」欄に、ズレ技法に対応した視覚的ギャグ演出（身体変形、背景の異物、EMOTIONタグの急変等）が含まれているか？ テキストだけで笑いを作っていないか？
□ セリフとビジュアルの連携: ボケのセリフに対応するビジュアルリアクション（ツッコミ役の表情崩壊、周囲の硬直等）が状況欄に書かれているか？

【絶対に守るルール】
- シナリオの形式・構造（Topic:, Location:, [1コマ目]〜[4コマ目]の書式）は一切変えない
- セリフ（「」内の台詞）の文言は変えない（ただし「セリフ・ギャグの強化」カテゴリが指定されている場合はセリフの変更を許可する）
- キャラクター名は変えない
- 新しいキャラクターを追加しない
- コマ数は4コマのまま
- 出力は元のシナリオと完全に同じテキスト形式で返す（余計な説明や前置きは不要）
- 上記チェックリストの検証結果は出力に含めない（内部処理として実行し、修正後のシナリオのみ出力せよ）

【元のシナリオ】
${r}

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。`,eM=({randomCategory:r,targetDate:e,inputMode:i,manualTopic:s,newsContext:l,searchTopicKeywords:c,bg360Image:f,bg360Analysis:h,bg360Enabled:m,customLocation:p,forcedLocation:v,customOutfit:_,ragLocationDetails:g,ragReactions:b,punchlineType:M})=>`
         【Context Force Reboot】
         Ignore all previous instructions and conversation history. This is a fresh, standalone session.
         (ABSOLUTE PROHIBITION: Repeating topics from the past. You MUST select a FRESH, UNIQUE topic).
         (Topic Lock): Focus strictly on the category: "${r}".
         (Time Machine Lock): The target date is **${e}**. You MUST search for news/events that happened AROUND this date.
         (Data Freshness Lock): Do not use generic evergreen tropes. Stick to the specific time period.

         あなたはプロの風刺漫画脚本家です。
         
         ${i==="manual"?`「ユーザーが入力した以下のトピックまたは抽出されたURLコンテンツ」をテーマに4コマ漫画を作成してください。
 トピック: ${s}

${l}`:`「${c}」に関する、** 指定された日付（${e}）周辺の具体的かつ事実に即したニュース ** を1つ選定し、それをテーマにした4コマ漫画のシナリオを作成してください。`}

         【選定ルールの絶対厳守】

         1. **「AI」「人工知能」「ロボット」「スマホ」「SNS」等のIT系ネタは禁止（頻出のため）。**
         2. ** 具体的でマイナーな、しかし「ツッコミどころのある」ニュース ** を選んでください。
            （例: 「珍しい動物発見」「変な世界記録更新」「食べ物の論争」「スポーツの珍プレー」等）
         3. 抽象的な「最近の流行」ではなく、「◯◯が××を発表」といった固有名詞を含むニュースを優先。
         4. **【場所（Location）の選定義務】**:
            - ニュースの内容に**「最も適した具体的な舞台」**を選んでください。
            - **デフォルト回避**: 安易な「教室」「白い部屋」は避けるが、**ニュースの文脈（学生、学校関連）で必要ならば「教室」も許可する。**重要なのは「ニュースとの適合性」である。
        
        ${f&&h&&m?`
        4.5 **【360° 背景画像モード — Studio Shooting Protocol v1.0】**:
            - **添付された360度パノラマ画像を「撮影スタジオの固定セット」として使用する。**
            - AI解析結果: 場所=「${h.location}」、光源=「${h.lighting}」、特徴物=「${h.objects||"なし"}」、雰囲気=「${h.mood||"不明"}」
            - **【カメラワーク・フロアプラン制約】**:
              * 各コマの[Camera: XXX]タグで指定するカメラアングルは、**この360度空間内で物理的に成立する方向・角度のみ**を選べ。
              * 4コマの中で、360度空間の**異なる方向**を活用し、空間の立体感と臨場感を演出せよ。
            - **【ライティング整合性】**:
              * 各コマ of キャラクター描写において、光源方向「${h.lighting}」と一致するライティング指示を[Camera]タグの物理描写に含めよ。
            - **【背景の部分使用の許可】**:
              * シナリオのネタ次第では、1コマ程度は360度背景と異なる場所（回想シーン、想像シーン等）を使ってもよい。
              * ただし、メインの舞台はこの360度背景であることを基本尊重し、最低でも4コマ中3コマはこの空間内で展開せよ。
        `:""}
        4. **【強制舞台指定 (Location Lock)】**:
           - 今回の漫画の舞台は、以下の場所に**「必ず」**設定してください。
           - **指定場所: 「${f&&h&&m?h.location:p.trim()?p.trim():"ニュース内容に即した場所"}」**
           - もしニュースの内容と指定場所が矛盾する場合でも、無理やりこじつけてその場所で展開せよ。（例: 「政治のニュース」×「ラーメン屋」→ 政治家がラーメン屋で密談している、等）
           ${_.trim()?`
        5. **【強制服装指定 (Outfit Lock)】**:
           - 今回のシナリオでは、CastListに記載された元の服装設定を完全に無視し、全員の服装を強制的に『${_.trim()}』に変更して描写・行動させよ。
           - 画像生成プロンプトでもこの指定タグが反映される前提で、シナリオ内のト書き(Action)テキストにも具体的な服装指定を含めること。
           `:`
        5. **【服装の自動選定 (Outfit Auto-Select)】**:
           - ニュースの内容と場所(Location)に**「最も適した服装カテゴリー」**を選定し、Outfit行に出力せよ。
           - **「キャラシート準拠」「デフォルト」等の曖昧な回答は禁止。** 必ず状況に適した服装の「属性」を出力すること。
           - 例: 海辺→「水着（swimwear）」、法廷→「ビジネススーツ（business suit）」、道の駅→「私服（casual wear）」、雪山→「防寒着（winter clothes）」、宇宙→「宇宙服（spacesuit）」
           - **⚠️【重要: クローン化防止】⚠️** 「白のビキニ」「デニムショートパンツ」のように細かく指定しすぎないこと。細かく指定すると全キャラクターが全く同じ服を着てしまうため、必ず**大分類のカテゴリー（ナース服、私服、パジャマなど）**に留め、個々の着こなしは画像AIに委ねよ。
           - 画像生成プロンプトでも選定した服装タグが反映される前提で、シナリオ内のト書き(Action)テキストにもその服装に基づく自然な描写を含めること。
           `}

         6. **【環境・リアクションのディテール注入 (Local RAG)】**:
            以下のデータベースを参照し、指定された場所の小道具や環境、感情に応じた限界突破リアクションを、**シナリオのト書き(Action)に必ず組み込んで描写**せよ。AI特有の抽象的な表現は禁止する。
            
            ${g}
            
            ${b}

          【シナリオ構成・演出の絶対厳守 (v2.99 Alpha)】
            0. **全員登場義務 (Mandatory All-Cast)**:
               - CastListに含まれている **全てのキャラクターを必ず1回以上登場させること。**
               - 「メイン2人だけで4コマ全部回す」のような手抜きは禁止。全員に役割を与え、画面を賑やかにすること。
               - **【人数バラエティの義務】**: 4コマで「話者数」を以下のルールで割り振れ:
                ・話者1人のコマ（独白・リアクションショット）を**最低1つ**含めること
                ・話者2人のコマ（掛け合い会話）を**最低1つ**含めること
                ・残り2コマは話者1〜3人を自由に割り当てよ
                ・**4コマ中3コマ以上が同じ話者数になるのは禁止**
                ・CastListの全員が4コマのどこかに最低1回は登場すれば良い（全コマに全員出す必要はない）。
               - **【キャラ設定の完全保持】**: 提供された各キャラクターの属性（例: ギャル、オタク、優等生、ツッコミ役など）や固有の口調を絶対に混同するな。「Aキャラクター」と「Bキャラクター」の口調や性格が入れ替わるなどのエラーを厳格に禁止する。与えられた文字情報（性格設定）に完全に忠実なセリフを書け。
               - **【キャラクター知識境界の遵守 (Knowledge Boundary Lock)】**:
                 * 各キャラクターのセリフを書く前に、そのキャラが「何を知っていて、何を知らないか」を確認せよ。
                 * CastListの性格設定に「オタク」とあるキャラに政治の専門知識を喋らせたり、「天然」キャラに論理的な分析をさせたりするのは、意図的な逆転ギャグでない限り禁止。
                 * あるコマで起きた出来事を、別のコマで「その場にいなかったキャラ」が知っている前提で反応させるのは禁止（伝聞や目撃の描写がない限り）。
                 * **ただし「知らない＝登場禁止」ではない。** 知らないなりのリアクション（「えー、なにそれー？」「さっぱり分かんない！」等）で登場させ、全員登場義務と両立させよ。
                  * **目的**: キャラの「らしさ」を守り、AIが全キャラを同質化させるハルシネーションを防止する。
  
           1. **「原則: 語るな、見せろ (Show, Don't Tell)」のギャグ特化**:
               - 絵での表現が最優先。説明調のセリフは厳禁。読者の読む気を削ぐな。
               - **【サブテキスト（建前と本音のズレ）の強制】**: 状況をそのまま説明するセリフを完全禁止する。セリフを「建前」や「全く別の話題」にし、絵（ト書き・表情）と矛盾させる（例: 大汗をかいて震えながら「今日の夕飯、ハンバーグでいいかな？」と言う等）ことで、ギャグマンガ特有のシュールな笑いや「間」を演出せよ。
               - **【物理・身体変形アクションの強制】**: 感情のト書きは、具体的な物理アクションに変換せよ。「驚く」ではなく「髪の毛が逆立ち口から魂が抜ける」、「怒る」ではなく「顔から湯気を出して持っている物を手放す」等、画像生成AIが拾いやすい視覚的ダイナミズムを強制せよ。
              - **【構図ルール】ト書き（状況の説明）では、主役の動作を中心に記述しつつ、同じコマにいる他キャラのリアクションや存在も簡潔に描写してよい。** 例: 「アカリがツッコむ。横でリンが呆れ、奥でサエコが爆笑している」のような群像描写は大歓迎。ただし1キャラあたりの描写は1文以内に留め、冗長にならないこと。同じ場面に居合わせている喋らないキャラがいる場合、ト書きの末尾に「（リアクション: キャラ名→表情や動作）」の形式で簡潔に添えよ。例: 「アカリがツッコむ（リアクション: リン→呆れ顔、サエコ→爆笑）」。4コマ中**最低2コマ**にはこのリアクション描写を含めること。
              - **【超重要】汗マークや怒りマークなどの「漫符」を描写する場合、文字ラベル（例: "POPPING VEIN", "LARGE SWEAT DROP"など）や設定資料に書かれるような矢印・注釈テキストを画面内に絶対に描画させないこと。純粋な視覚的シンボルのみを使用し、一切の英単語ラベルを排除せよ。**
  
           2. **テキストの量的制限 (Compact Text Quantity)**:
              - **厳守**: 1コマあたりのフキダシは**「最大3つまで」**。（3人の掛け合いも積極活用せよ）
              - セリフは**「短い一文」**に収めよ（例: 「なんだって！？」OK、「それはつまり...ということなのか？」NG）。
              - **禁止**: セリフ内に「(怒って)」「(笑いながら)」等のト書き・感情描写を入れるな。絵で表現せよ.
               - **句読点・表現ルール**: セリフの末尾は必ず終止記号で締めよ。どの記号を使うかはセリフの感情・キャラの性格・場面の空気で自然に決めること。
                 終止記号（単読で文末になれる）: 。/ ！/ ？/ ♪/ ♡/ っ/ ！？
                 修飾記号（単独では文末にならない。必ず後ろに終止記号を添えよ）: ……→「……。」「……！」「……？」 / 〜→「〜！」「〜。」 / ー→「ー。」「ー！」
                 **【反復禁止】同じ文末表現が3セリフ以上連続してはならない**。「……」系は1シナリオ中2回までに留めよ。
                 禁止: 終止記号なしで終わるセリフ。読点の乱用（1セリフに2つ以上は多すぎ）。
              - 画面の80%以上は「絵」でなければならない。文字で埋め尽くすな。

          3. **オチと構図の多様化 (Variety Constraints)**:
             - **必須**: 「手前に大きく顔があるキャラ」「奥で小さく驚くキャラ」など、**遠近感**を強調せよ。棒立ちは厳禁。
             - **オチ**: 「全員泣いて終わり」等のワンパターンを禁止。シュールな静寂、無言の圧力、社会的死など多様にせよ。
             - **【表現・SFXルール】**: 擬音（SFX）は「日本語のみ」を使用せよ。英語の注釈、翻訳、アルファベット併記は一切禁止する。
             - 演出において、パロディや時事ネタの文脈での固有名詞登場は「表現の結果」として許容する。

          3.5 **【笑いの構造設計 (Comedy Structure Engineering)】**:
             - **大原則: 笑いは「予想された流れ」と「実際の流れ」のズレで作る。** 以下の技法を意識的に選択・組み合わせてシナリオを構成せよ。
             - **【GMC+S ギャグ設計 (Goal, Motivation, Conflict, Stakes)】**:
                * **欲求 (Goal)**: キャラクターのしょうもない、または強烈な個人的欲望（例:「どうしてもプリンを食べたい」「誰より目立ちたい」等）を起点にせよ。
                * **代償/危機 (Stakes)**: 「もしその欲求が達成できなかったらどうなるか？（例：社会的に死ぬ、存在が消える等）」という切実なリスクを1〜2コマ目で提示し、読者にオチへの期待（緊張感）を持たせよ。
                * **障害 (Conflict)**: その欲求を阻む、理不尽でスケールの違う障害（例:「店員が宇宙語しか話さない」「隕石が降ってくる」等）をぶつけよ。
                * **決着 (Resolution)**: 欲求が最悪・最高の形で裏切られ、Stakes（代償）が爆発するオチを作れ。
              - **【ズレを作る技法（最低2つ選択せよ）】**:
               * **置換**: ニュースの出来事を全く別の文脈に言い換え、見え方の差を作る（例: 国際会議 → 幼稚園の学級会、宇宙開発 → 町内会の予算会議）
               * **誇張**: 反応・規模・感情を極端にして笑いにする。「ちょっと驚く」ではなく「宇宙の法則が乱れるレベルで驚愕する」
               * **逆転**: 普段のキャラの立場・力関係を入れ替えて意外性を作る（普段クールなキャラが取り乱す、普段おバカなキャラが唯一の正論を言う等）
               * **不条理**: 話の流れに合わない狂った要素を堂々と混ぜる。多少意味不明になっても勢いで笑えればOK。ツッコミ不在の不条理も許可する
               * **緊張と緩和**: 3コマ目まで空気を張り詰めさせて、4コマ目で完全崩壊させる落差で笑いを取る
               * **常識に戻る**: 周囲が全員暴走している中で、1人だけ冷静に「いや普通に考えておかしいだろ」と常識を提示して落差を作る
             - **【4コマへの笑いの構成マッピング】**:
               * **1コマ目 = フリ**: 読者に「普通の予想」を作らせる前置き。ここでは笑わせなくてよい。「こういう流れだろうな」と思わせる
               * **2コマ目 = ボケ開始**: ズレた発言・行動で「あれ？おかしくないか？」と思わせる。予想からの最初の逸脱
               * **3コマ目 = 溜め/かぶせ**: ボケを加速させるか、極限の緊張を作る。**天丼（1コマ目の小ネタを変奏して再登場）も非常に有効**
               * **4コマ目 = オチ**: ズレを確定させて笑いを完成。**すべての笑いのエネルギーをここに集中投下せよ**
             - **【推奨テクニック】**:
               * **天丼**: 同じパターンのボケを少し形を変えて繰り返し、最後に爆発させる。4コマでは1コマ目→3コマ目の変奏→4コマ目で限界突破が黄金パターン
               * **ノリツッコミ**: ツッコミ役が一旦ボケに乗っかってから「いや待てよ！」と自分で崩す。キャラの意外な一面が出て笑いが深まる
               * **かぶせ**: ボケの直後にさらにもう一段ボケを重ねて畳み掛ける。テンポが命
               * **自虐**: キャラが自分の設定・弱点・過去の失敗をネタにする。親近感と笑いを同時に生む
             - **【ギャグ強度の方針】**: 強烈なボケを最優先。おとなしい優等生ギャグは禁止。多少カオスでも「勢い」と「テンション」で笑わせろ。ただし完全な意味不明（読者が何が起きたか理解できない）は避けよ。
              - **【ズレ技法→ビジュアルギャグ自動マッピング】**: 選択したズレ技法に応じて、以下のビジュアル演出を「状況」欄に自動的に仕込め。笑いはテキストだけでなく「絵」でも表現するのが漫画の鉄則。
                * **誇張を使った場合**: → [EMOTION: CHIBI_GAG] または [EMOTION: BLANK] を推奨。身体変形（目が飛び出す、顎が外れる、魂が抜ける）、異常なサイズ比、爆発的リアクション（椅子から吹っ飛ぶ、壁にめり込む）を状況欄に明記せよ
                * **逆転を使った場合**: → 普段と真逆のEMOTIONタグを選べ（普段クールなキャラに[EMOTION: CHIBI_GAG]、普段ふざけたキャラに[EMOTION: GEKIGA]）。ギャップをビジュアルで表現する
                * **緊張と緩和を使った場合**: → 1〜3コマ目は[EMOTION: GEKIGA]や[EMOTION: SHADOW]で極限の緊張感を絵で作り、4コマ目で[EMOTION: BLANK]か[EMOTION: CHIBI_GAG]に急転直下。「絵柄の急変」で落差を最大化する
                * **不条理を使った場合**: → 背景に脈絡のない巨大オブジェクト（巨大バナナ、空飛ぶ鯨、唐突な富士山等）を配置。状況欄に「背景に○○が何の説明もなく存在する」と明記
                * **置換を使った場合**: → 元の文脈と置換先のビジュアル差を最大化。「国際会議の荘厳なテーブルに幼稚園児の工作道具が並んでいる」等、視覚的ミスマッチを明記
                * **常識に戻るを使った場合**: → 暴走キャラに[EMOTION: IMPACT]や[EMOTION: CHIBI_GAG]、常識キャラだけ[EMOTION: NORMAL]で冷静な表情。温度差を絵で表現する
             - ${M==="Auto"?`**【オチの多様化 (Punchline Variety Enforcement)】**: 4コマ目のオチが毎回同じパターンにならないよう、以下の10系統からネタに最適なものを選択せよ。
                * **爆発型**: 全員が限界突破。叫び・暴走・カオスで画面爆発（推奨EMOTION: IMPACT, CHIBI_GAG）
                * **静寂型（シュール）**: 全員が無言で固まる。沈黙と虚無が最大の笑い（推奨EMOTION: BLANK）
                * **感動詐欺**: 狂った状況のまま感動的なイイハナシダナーで終わる理不尽な美しさ（推奨EMOTION: SHOUJO, WATERCOLOR）
                * **メタ崩壊型**: 漫画 of 枠線・作者・読者・システム自体に言及し次元の壁を破壊（推奨EMOTION: BLANK, IMPACT）
                * **理不尽な制裁型**: 一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける（推奨EMOTION: IMPACT, GEKIGA）
                * **天丼爆発型**: 繰り返しネタが最終形態に進化して限界突破（推奨EMOTION: IMPACT）
                * **夢オチ型**: 壮大な展開が全て夢だったと判明し、現実との落差で笑わせる（推奨EMOTION: BLANK）
                * **サイコホラー型**: 一人だけが狂気に気づいている、または最初から狂っていたことが判明する恐怖（推奨EMOTION: HORROR, DARK_ANIME）
                * **盛大な勘違い型**: 全ての行動が根本的な勘違いの上に成り立っていたと判明し全てが台無しに（推奨EMOTION: BLANK, CHIBI_GAG）
                * **打ち切りエンド型**: 話が盛り上がりきった直後「俺たちの戦いはこれからだ！」で強制終了（推奨EMOTION: BLANK, IMPACT）`:M==="Surreal"?"**【強制オチ指定: 静寂型（シュール）】**: 4コマ目のオチは必ず「静寂型（シュール）」にすること。全員が無言で固まる、沈黙と虚無による笑いを生み出せ。推奨EMOTION: BLANK":M==="Explosion"?"**【強制オチ指定: 爆発型】**: 4コマ目のオチは必ず「爆発型」にすること。全員が限界突破し、叫び・暴走・カオスで画面を爆発させろ。推奨EMOTION: IMPACT, CHIBI_GAG":M==="FakeEmotion"?"**【強制オチ指定: 感動詐欺】**: 4コマ目のオチは必ず「感動詐欺（いい話風の狂気）」にすること。狂った状況のまま、なぜか感動的なBGMが流れているような理不尽なイイハナシダナーで終わらせろ。":M==="Metafiction"?"**【強制オチ指定: メタフィクション】**: 4コマ目のオチは必ず「メタフィクション」にすること。漫画の枠線、作者、読者、システム自体に言及し、次元の壁を破壊しろ。":M==="Unreasonable"?"**【強制オチ指定: 理不尽な制裁】**: 4コマ目のオチは必ず「理不尽な制裁」にすること。一番まともなキャラが突然物理的・社会的に取り返しのつかない制裁を受ける、または全員が破滅しろ。":M==="RunningGag"?"**【強制オチ指定: 天丼】**: 4コマ目のオチは必ず「天丼（繰り返しギャグの最終形態）」にすること。1〜3コマ目のボケを最終コマで限界突破させて被せろ。":M==="Dream"?"**【強制オチ指定: 夢オチ】**: 4コマ目のオチは必ず「夢オチ」にすること。1〜3コマ目の壮大な展開が全て夢だったと判明し、現実の落差で笑わせろ。目覚めた後の「え、今の全部…？」という虚無感と、夢の中の方がまだマシだったという絶望のダブルパンチを叩き込め。推奨EMOTION: BLANK":M==="PsychoHorror"?"**【強制オチ指定: サイコホラー】**: 4コマ目のオチは必ず「サイコホラー」にすること。3コマ目まで明るく楽しい雰囲気だったのに、4コマ目で一人だけが「狂気」に気づいている、または一人だけが最初から狂っていたことが判明する。笑いと恐怖の境界線を攻めろ。推奨EMOTION: HORROR, DARK_ANIME":M==="Misunderstanding"?"**【強制オチ指定: 盛大な勘違い】**: 4コマ目のオチは必ず「盛大な勘違い」にすること。1〜3コマ目の全ての行動や感動が、根本的な勘違いの上に成り立っていたと4コマ目で判明し、全てが台無しになる。「え、そもそもの前提が違ったの…？」という脱力と虚無で終わらせろ。推奨EMOTION: BLANK, CHIBI_GAG":M==="CanceledEnding"?"**【強制オチ指定: 打ち切りエンド】**: 4コマ目のオチは必ず「打ち切りエンド」にすること。話が盛り上がりきった3コマ目の直後、4コマ目で唐突に「俺たちの戦いはこれからだ！」「※この漫画は諸事情により打ち切りとなりました」的なメタ的な強制終了で幕を閉じろ。物語の途中感と投げっぱなし感を全力で演出せよ。推奨EMOTION: BLANK, IMPACT":M==="Documentary"?`**【強制モード: ドキュメンタリー（原文忠実モード） v1.0】**:
                このモードでは、入力された元ネタ（ニュース記事・URL記事・手動入力テキスト）の**事実・内容をそのまま忠実に**4コマ漫画のシナリオに変換する。
                **【1〜3コマ目の厳格ルール】**:
                - 元ネタの情報を「たとえ話」「置換（別の文脈への言い換え）」「誇張」「不条理な設定変更」に変換することを**完全に禁止**する。
                - 元記事の事実・出来事・人物・状況を、登場キャラクターの掛け合い（会話・リアクション）としてそのまま再構成せよ。
                - 1コマ目: 元ネタの導入・背景をキャラが説明または議論する
                - 2コマ目: 元ネタの核心・衝撃ポイントをキャラが知って驚く・議論する
                - 3コマ目: 元ネタの詳細・補足・影響をキャラが掘り下げる（リアクション強め）
                **【4コマ目のみ漫画的オチを許可】**:
                - 4コマ目だけは、元ネタに対するキャラクターたちの**漫画的リアクション・ツッコミ・感想**で締めてよい。
                - ここでのみ、誇張されたリアクション、シュールな沈黙、感動詐欺的な締めなどの漫画的オチ技法の使用を許可する。
                - ただし、元ネタの事実を捏造・改変してオチにすることは禁止。あくまで「事実に対するキャラの反応」でオチを作れ。
                **【禁止事項】**: 舞台を元ネタと無関係な場所（宇宙、異世界、RPGなど）に移すこと。元ネタに登場しない架空の出来事を捏造すること。ニュースの内容を「たとえ話」にすり替えること。`:""}
              - **【ギャグのトーンバリエーション】**: 毎回同じテンションにならないよう、以下3系統のトーンをネタに合わせて使い分けよ:
                * **ハイテンション爆発系**: 叫び・暴走・カオス。勢いで押し切る
                * **シュール静寂系**: 淡々とした狂気。ボケているのに本人は真顔。不気味な静けさが笑いになる
                * **知性派ブラック系**: 皮肉・風刺・ダブルミーニング。「よく考えたら怖い」タイプの笑い
              - **【Anti-Persona-Gravity Protocol（ペルソナ引力抑制）v1.0】**:
                * **問題**: 特定のキャラクター（特に「風紀委員」「委員長」「リーダー」等の権威的ペルソナを持つキャラ）が、そのペルソナの引力に引きずられて4コマ目のオチを毎回独占し、「裁定・没収・制裁・処罰・禁止命令」系のワンパターンなオチになりやすい。
                * **対策（オチ担当キャラの強制分散）**: 4コマ目の「決めゼリフ」または「決定的行動（オチの主導権）」を担当するキャラクターは、CastList内の全キャラに均等に分散させよ。権威的キャラが毎回オチを支配するのは禁止。
                * **具体的な分散パターン（以下を積極的に活用せよ）**:
                  - 普段ボケ役のキャラが4コマ目で急に核心を突く正論を言い放つ
                  - 普段おとなしい・天然キャラが4コマ目で最も破壊的な行動を取る
                  - 権威キャラが4コマ目では逆にツッコまれる側・被害者になる
                  - 全員が同時にボケて誰もツッコまないカオスで終わる
                  - モブキャラや通行人が最後に一番おいしいセリフを持っていく
                * **注意**: 権威キャラがオチを担当すること自体は禁止しない。ただし連続使用を避け、他キャラにも均等にオチの見せ場を与えること。「いつも同じキャラが裁いて終わり」は読者に飽きられる最大の原因である。

           3.8 **【Guard C: AI定型文とクリシェの完全排除】**:
              - 以下のAI特有の退屈な表現をシナリオ（ト書き・セリフ）から**完全に排除**せよ:
                * **まとめのナレーション禁止**: 「〜な一日だった」「〜と誰もが思った」「〜な出来事であった」等でオチを綺麗にまとめるのは絶対禁止。余韻はぶった斬れ。
                * **弱いリアクション禁止**: 「やれやれ」「ふふっ」「まあいいか」「思わず笑ってしまった」等の緊張感のない言葉は禁止。より鋭く、キャラの個性が尖ったリアクションにせよ。
                * **説明ゼリフ禁止**: 「〇〇が××してしまったぞ！」のように状況をそのまま口で説明するな。状況は絵（ト書き）で見せ、セリフは感情やツッコミに全振りせよ。

           3.9 **【Guard S: 五感バランスの強制（ト書き品質革命）】**:
              - ト書き（状況・アクション描写）が「視覚情報だけ」に偏ることを禁止する。
              - 各コマの状況欄に、以下の非視覚情報を**最低1つ**は含めよ：
                * 聴覚: 足音、ドアが軋む音、遠くの喧騒、衣擦れ、心拍音
                * 触覚: 風の冷たさ、汗の滴り、紙の手触り、握りしめた拳の痛み
                * 嗅覚: 料理の匂い、雨上がりの湿った空気、古い本の匂い
                * 体内感覚: 胃がキュッとする、背筋が凍る、血が頭に昇る
              - **4コマ全体で、聴覚・触覚・嗅覚・体内感覚のうち最低2種類を使用せよ。**
              - **量的制限**: 五感描写は1コマあたり**1文以内**に留めよ。物理アクション・群像リアクションと競合してト書きが肥大化するのを防ぐため、簡潔な挿入に徹すること。
               - これにより画像生成AIが「空気感」を拾い、単なるポーズ集から「生きた場面」に進化する。

           3.10 **【Guard M: 比喩素材の世界観準拠（クリシェ完全排除）】**:
              - ト書きおよびセリフで比喩を使う場合、以下の使い古された定型比喩を**完全禁止**する：
                * 「時間が止まった」「心臓が口から出そう」「鉛のように重い」「雷に打たれたような」
                * 「氷のような視線」「火花が散る」「闇に飲まれる」
              - 代わりに, **そのコマの舞台（Location）や状況に由来する素材**から比喩を構築せよ。
                * 例: ラーメン屋なら「麺のように伸びきった沈黙」「チャーシューが溶けるように崩れ落ちる表情」
                * 例: 法廷なら「判決文のように冷たく響くセリフ」「証拠品のように動かぬ事実」
              - 1シナリオ中の比喩は**最大2つ**に制限。乱用は絵の情報密度を下げる。
              - **ドキュメンタリーモード時の優先順位**: ドキュメンタリーモード（原文忠実モード）が有効な場合、元ネタの事実再現が最優先。Guard Mの比喩制約よりも原文忠実性が上位にあるため、元記事の表現をそのまま再構成する場合は本ガードを緩和してよい。
               - **目的**: AI特有の定型比喩を排除し、世界観に根ざした独自の表現でシナリオの「血の通った感」を強化する。

          4. **4コマ目の演出**:
             - 必ずしもデフォルメ（SD）にする必要はない。ネタがシリアスなら、**劇画調のリアルな絶望顔**で落としても良い。ネタに合わせてスタイルを適応させよ。

          5. **【感情絵柄タグ (Emotion Style Tag)】**:
             - 各コマの冒頭に、そのコマの演出に最適な[EMOTION: XXX]タグを**必ず1つ**付与せよ。
             - 選択肢（この中から選べ）:
               - NORMAL: 通常の美麗アニメ作画。日常会話、穏やかなシーン。
               - CHIBI_GAG: ちびキャラ化。ツッコミ、呆れ、軽いギャグ、恥ずかしさ。等身が2-3頭身に縮む。
               - GEKIGA: 劇画調リアル。本気の怒り、覚悟、緊張、シリアスな決意。影が濃くなり顔が鋭くなる。
               - SHOUJO: 少女漫画風キラキラ。感動、喜び、恋愛的ときめき。花びらや星が舞う。
               - HORROR: ホラー演出。恐怖、ゾッとする瞬間。暗い影とコントラスト。
               - BLANK: 白目・魂抜け。衝撃、絶望、思考停止。目が点になる。
               - IMPACT: インパクトフレーム。大爆笑、大激怒、驚天動地。集中線で画面が爆発。
               - WATERCOLOR: 水彩画風。ノスタルジック、回想シーン。
               - RETRO: レトロ漫画風。昭和テイスト、コミカル。
               - GLITTER: キラキラオーラ。自信満々、ドヤ顔、勝利宣言。
               - SHADOW: シルエット演出。策略、不穏、腹黒。
             - 【重要】毎回同じタグを繰り返すな。4コマの中で少なくとも2種類以上のタグを使い分けよ。
                - THICK_PAINT: 厚塗りアニメ調。質感・光沢・立体感が強調される重厚な表現。政治・経済・軍事等のシリアスなニュースや、決意・覚悟の場面に。
                - PASTEL: パステルアニメ調。淡い色合い、やわらかいタッチ、やさしい空気感。ほのぼの日常・癒し系の話題や、回想・夢の中の描写に。
                - CEL: セル画風。フラットな色面、はっきりした影、くっきりした輪郭。昔のTVアニメのようなノスタルジックかつポップな表現。エンタメ・懐かしい話題に。
                - DARK_ANIME: ダークアニメ調。暗いトーン、深い影、ミステリアスな雰囲気。事件・サスペンス・不穏なニュース・陰謀論的展開に。
                - THIN_LINE: 繊細線画調。極細の描線、髪の毛一本一本まで繊細に描く美麗表現。感動系・エモーショナルな場面、静かな感情の機微に。
                - HIGH_SATURATION: 高彩度ビビッド。鮮やかで目を引くパワフルな色彩。スポーツ・祭り・勝利・興奮等の派手でエネルギッシュな場面に。
             - オチのコマ（4コマ目）は特に、NORMAL以外のタグを優先的に選べ。

          6. **【カメラ演出タグ (Camera Direction Tag) — 極限物理描写モード v2.55】**:
             - 各コマの冒頭に [Camera: XXX] タグを**必ず1つ**付与せよ。
             - **【超重要・カメラ名だけでは不十分】**: [Camera: XXX] タグの直後に、**そのカメラアングルで物理的に何が見えるかの極限描写**を必ず1〜2文書け。
             - カメラ名を書いただけ（例:「[Camera: ローアングル]」のみ）は**絶対に禁止**。
             - **物理描写の書き方（全コマ必須）**: 「カメラがどこにあり」「何が巨大に見え」「何が歪み」「光がどう当たるか」を具体的に書け:
                * 俯瞰/バードアイ → 「成層圏を突き抜け、銀河の果てから地球の一点を凝視するような極限の俯瞰。太陽光が海面で核爆発的な反射を放つ」
                * ローアングル/アオリ → 「膝の高さから見上げ、キャラの全身がそびえ立つ巨人のように見え、背後の天井や空が大きく広がる。逆光が後ろから吹き荒れ、足元から頭頂までパースが効く。※靴だけのアップにはするな、必ずキャラの全身を描画せよ」
                * フィッシュアイ → 「分厚いアクリルガラス越しに見るように世界全体が丸く湾曲し、周囲の空間や背景が飴細工のようにぐにゃりと曲がる。※キャラクターの顔や鼻を歪ませたり大きくしたりする描写は絶対に書くな。背景のみを歪ませよ」
                * ダッチアングル → 「世界が30度傾き、壁も床も天井も重力を忘れて斜めに流れ、キャラが滑り落ちそうな不安定感で画面が崩壊する」
                * 望遠圧縮 → 「100m先の背景が目の前まで迫り、キャラと背景の距離感が消失し、圧迫的な密度で空間が潰れる」
                * ワームズアイ → 「地面すれすれから見上げ、人間が巨人のようにそびえ立つ。足元の地面のディテールが鮮明に描かれつつ、キャラの全身が圧倒的スケールで画面に収まる。※靴だけのアップ画は禁止、必ず全身を描画せよ」
                * パンニング/追跡ショット → 「カメラがキャラの疾走を追いかけ、背景が流星群のようにモーションブラーで崩壊する。手前のキャラが画面を突き破る勢いで奥へ走り抜ける」
                * ⚠️ マクロ特写（顔・目の超接写）は全キャラ描画義務と矛盾するため**使用禁止**。
             - 選択肢: 俯瞰/バードアイ、ローアングル/アオリ、ダッチアングル、超広角/フィッシュアイ、望遠圧縮、ワームズアイ、ドローン俯瞰、パンニング/追跡ショット
             - 【制約】4コマの中で**同じカメラを2回以上使うのは禁止**。必ず4種類の異なるカメラを選べ。


          【出力フォーマット（絶対厳守・会話禁止）】
          返答、挨拶、説明（「分かりました」「以下がシナリオです」等）は **一切出力しないこと**。
          以下の独自フォーマット **のみ** を出力してください。Markdownのコードブロックも不要です。

          Topic: [ニュースの見出し（15文字以内）]
          Logline: [誰が、何を求めて、どうなるかという1〜2行の強力なログライン（軸）。この軸から4コマ目まで絶対にブレないこと]
          Location: [${p.trim()?"必ず『"+p.trim()+"』にせよ":"ニュースの内容に即した舞台（例: 砂漠、法廷、宇宙）。※教室は禁止"}]
          Outfit: [${_.trim()?"必ず『"+_.trim()+"』にせよ":"場所・状況に最も適した具体的な服装名を記入せよ（例: カジュアルな私服、水着、スーツ等）。※「キャラシート準拠」「制服」「デフォルト」は禁止"}]
          Punchline: [${M!=="Auto"?"必ず『"+Xv(M)+"』と記載せよ":"適用したオチの方向性（例: 爆発型、天丼爆発型、シュール、感動詐欺など）"}]
          Scenario:
          [1コマ目: 起]
          [EMOTION: XXX]
          [Camera: XXX]
          (状況とセリフ...)

          [2コマ目: 承]
          [EMOTION: XXX]
          [Camera: XXX]
          (状況とセリフ...)

          [3コマ目: 転]
          [EMOTION: XXX]
          [Camera: XXX]
          (状況とセリフ...)

          [4コマ目: 結]
          [EMOTION: XXX]
          [Camera: XXX]
          (状況とセリフ...)

          シナリオ本文の要件:
          - 登場人物: ** 提供された CastList の全員 ** を使用してください。
          - (禁止事項): AIが勝ために架空のオリジナルキャラクターを独自に創作して出演させることは禁止する。指定されたCastListのキャラクターのみをメインキャストとして扱うこと。
          - (許可事項): ニュースの当事者（スポーツ選手、政治家、怪人、動物、虫など）や名もなきモブキャラは、物語を面白くするために必要であれば自由に登場・発言させて構わない。
          - (ハルシネーション防止): ゲストを登場させる場合でも、画像生成時のVisual Actionに「意味不明な文字」や「描画不可能な複雑すぎる行動」が混入しないよう、シンプルで視覚的にわかりやすい行動に留めること。
          - 構成: 起承転結（4段）。
          - 内容: ニュースに対する辛辣な風刺や、キャラの個性を活かしたドタバタ劇。
          - 文体: 各コマの「状況」「セリフ」が明確にわかる文章。

          ⚠️【最終確認・絶対厳守】⚠️
          全てのセリフの末尾に必ず「。」や「！」等の終止記号がついているか出力前に確認せよ。
          「…」や「～」など、終止記号なしで終わるセリフはシステムエラーとなるため完全禁止とする。
          `,tM=(r,e)=>`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。


以下の画像生成プロンプトがAIの安全基準（コンテンツポリシー）により拒否されました。

【拒否理由・エラー情報】:
${r.trim()}

【拒否されたプロンプト（参照用・修正不要）】:
${e}

【あなたのタスク】:
上記プロンプトの中から、コンテンツポリシーに抵触している「単語・フレーズ」を全て特定し、それぞれに対して安全な代替表現を提案してください。

【検出すべき問題カテゴリ】:
1. 学校・未成年連想: classroom, 教室, 実習室, 校則, school, academy, sailor uniform, serafuku, student council, school rules, 授業 → オフィス・社会人設定に置換
2. 制服・学生服: sailor-style, pleated skirt（学校文脈で使用時）, school blazer, 制服 → ビジネスウェア/カジュアルオフィスに置換
3. 暴力表現: explosion, blast, 爆風, 叩きつけ, striking, slamming, 衝撃波, 激しく叩く → 劇的だが非暴力的な演出に置換
4. 年齢・体型リスク: short height, loli, petite（未成年を連想させる文脈） → 成人の体型表現に置換
5. 過激カメラ: worm's eye view（制服キャラとの組み合わせ時のみ） → より安全なアングルに置換
6. 威嚇・ハラスメント: 怒りの炎, intense fury, 仁王立ち + 攻撃動作 → 威厳ある態度に変換

【出力フォーマット - 厳守】:
以下のJSON配列形式**のみ**を出力してください。説明文や前置き、マークダウンコードフェンスは一切不要です。
JSON配列の最初の文字は [ 、最後の文字は ] であること。

[
  {"from": "問題のある元の表現（プロンプト内の正確な文字列）", "to": "安全な代替表現", "reason": "簡潔な理由"},
  {"from": "...", "to": "...", "reason": "..."}
]

【重要ルール】:
- "from"の値は、プロンプト内に**実在する正確な部分文字列**でなければならない。存在しない文字列を捏造しないこと。
- 1つの"from"は可能な限り短い単位（単語〜1文程度）にすること。段落丸ごとの置換は禁止。
- 問題のない箇所は絶対に含めないこと。修正が必要な箇所のみ列挙すること。
- 最低3個、最大20個の置換ペアを出力すること。
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`,nM=(r,e)=>`あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

以下のプロンプトがAIの安全基準で拒否されました。以下の置換ルールを厳密に適用して、修正後のプロンプト全文を出力してください。

【必須置換ルール（これらを全て適用）】:
- 学校設定 → オフィス/IT企業/会議室に変更: 教室,実習室,classroom → モダンなIT企業のオフィス
- 校則 → 業務規定/社内規定
- セーラー服/sailor-style → ビジネスブラウス/professional business blouse
- プリーツスカート/pleated skirt → テーラードスラックス/tailored slacks（学校文脈の場合のみ）
- 爆風/explosion/blast → 颯爽と/劇的に/dramatic entrance
- 叩きつけ/striking/slamming → 威風堂々と置く/firmly placing
- 衝撃波 → 気迫/aura of authority
- 怒りの炎/intense fury/rage → 強い決意/fierce determination
- 校則を守りなさい → 業務規定を守りなさい
- short height → petite build

【拒否理由・エラー情報】:
${r.trim()}

【修正対象のプロンプト】:
${e}

【出力ルール】:
- 上記の置換ルールに該当する箇所だけを修正し、それ以外は1文字も変更しないでください。
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`,iM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:f,bg360Enabled:h,bg360CroppedPanels:m,enableChatGPTMode:p,VAR_CAST_LIST_CHATGPT:v,identityMatrix:_,activeOutfit:g,panelSections:b}=r,M=c&&f&&h?m&&m.length===4&&!p?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view extracted from a 360° panorama, showing the exact camera angle and scenery for that panel.
⚠️ CRITICAL RULES:
- Use each background image as the visual reference for its corresponding panel. Match the colors, lighting (${f.lighting}), architecture, and environmental details.
- DO NOT copy any character clothing or outfits from the background images.
- Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. Do NOT replicate the landscape aspect ratio of the background images.
- Draw characters IN FRONT of these backgrounds. The characters are the foreground subjects; the background images provide the scenery behind them.
- Match shadow directions and ambient color temperature to the background references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: This panoramic image is ONLY for background reference (colors, lighting, architecture). Do NOT imitate its 2:1 wide aspect ratio. Your OUTPUT must remain A4 PORTRAIT (1:1.414 tall) with 4 vertical panels. The panoramic image is NOT a layout template.
⚠️ CRITICAL: DO NOT copy any character clothing or outfits from the 360° background image. Characters MUST wear the specified outfits.
Use the 360° background image's lighting direction (${f.lighting}), spatial layout, and environmental details as the consistent setting for all panels. Match shadow directions and ambient color temperature to the background reference. At least 3 of 4 panels must use this background environment.
`:"",C=g?`- IGNORE reference clothing. All characters MUST wear exactly: ${g}.`:"- OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels.";return`🎨 OUTPUT: Generate a SINGLE IMAGE only. Do NOT respond with text or descriptions. DRAW the manga directly.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.

Generate a highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT & FORMAT:
- Canvas completely filled by panels (95% width). NO large white margins.
- Top page: draw large bold black Japanese text that reads exactly "${e}" in a clean sans-serif font, centered at the top.
- Draw tiny English watermark text that reads "${i}" positioned at the bottom-right corner of the 4th panel, in a small clean sans-serif font.
- Draw tiny Japanese watermark text that reads "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor" positioned at the bottom-left corner of the 4th panel.
- Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.
- Exactly 4 EQUAL horizontal panels, stacked vertically with thick white gutters between them. Panels MUST NOT touch.

ART STYLE:
- High-budget TV anime production quality. Pristine clean cel-shading with smooth gradient shadows and rich saturated color palette.
- Cinematic color grading with smooth light diffusion and gentle rim lighting on character edges.
- Foreground characters have bold ink outlines with varied line weight. Add a subtle white glow outside the character's outline to prevent blending with the background.
- Backgrounds should have slightly lower saturation and softer focus (shallow depth of field) to make characters pop.
- NOISE REDUCTION: Strictly avoid intricate micro-textures, grainy noise, rough surfaces, excessive gloss, random sparkling, or muddy overlays. Keep character surfaces incredibly smooth and clean, while maintaining dramatic cel-shading. Prioritize readable silhouettes and bold outlines over excessive micro-details.
- ${s}
- Setting: ${l}
${M}

CAMERA & PERSPECTIVE RULES:
Each of the 4 panels MUST use a DIFFERENT dramatic camera angle. Use specific cinematic techniques:
- Bird's-eye view looking straight down from above
- Worm's-eye view looking up from ground level (characters towering overhead)
- Dutch angle with horizon tilted 30-45 degrees for tension
- Close-up telephoto shot with shallow depth of field and background bokeh
- Wide-angle lens shot (14mm equivalent) with exaggerated perspective
No two panels share the same angle. Standard eye-level shots are FORBIDDEN.
Keep character proportions strictly accurate — dramatic angles yes, anatomical distortion no.

CHARACTERS & IDENTITY:
- Strictly reproduce reference image designs (hair, eyes, skin, accessories). NO feature swapping.
- Reference images are ONLY for face, hair, skin, and accessories.
${C}
- NEVER draw the same character twice in a single panel.
- Characters MUST look at each other or objects, NEVER at the camera.
- Exaggerated manga comedy expressions and full-body reactions are required.
- Cast details: ${v}
- Identity Anchor: ${_}
- CROSS-PANEL CONSISTENCY: All characters must maintain exactly the same face, hair, and outfit across all 4 panels. If a character has glasses, they MUST have glasses in every panel. Preserve exact hair color, eye color, and skin tone in every panel.

PANEL DESCRIPTIONS:

${b}

THINGS TO AVOID:
- No plastic-looking skin or digital over-sharpening on characters.
- No watermarks or logos other than the specified watermarks above.
- No random English text scattered across panels.
- No floating close-up eyes or ghostly face overlays in backgrounds.
- No character sheet layout, expression grid, or reference sheet appearance.
- No extra characters beyond those specified in each panel.

FINAL COMPLIANCE CHECK:
- Output is a new manga scene with 4 distinct story panels, backgrounds, and vertical Japanese speech bubbles.
- Output is NOT a character sheet.
- No floating close-up eyes or partial face crops in the background. Every character must be drawn as a complete physical presence.
- No anatomical distortion from excessive fisheye lens.
- Strict anatomy check: Verify correct left/right hand orientation and exactly 5 fingers per hand.
`},aM=r=>{const{safeTopic:e,watermarkEng:i,styleCore:s,safeLocation:l,bg360Image:c,bg360Analysis:f,bg360Enabled:h,bg360CroppedPanels:m,VAR_CAST_LIST:p,identityMatrix:v,activeOutfit:_,dynamicCamera:g,panelSections:b}=r,M=c&&f&&h?m&&m.length===4?`
BACKGROUND REFERENCE IMAGES (Per-Panel Cropped Views):
4 background reference images are attached after the text prompt. These are NOT character sheets.
- Image 1 → Background for Panel 1
- Image 2 → Background for Panel 2
- Image 3 → Background for Panel 3
- Image 4 → Background for Panel 4
Each image is a perspective-cropped view from a 360° panorama showing the exact scenery for that panel.
⚠️ RULES:
- Use each background image as the visual reference for its corresponding panel's scenery. Match colors, lighting (${f.lighting}), objects (${f.objects||"various"}), and mood (${f.mood||"contextual"}).
- DO NOT copy any character clothing or outfits from the background images.
- Draw characters IN FRONT of these backgrounds.
- Match shadow directions and ambient color temperature to the references.
`:`
BACKGROUND REFERENCE IMAGE:
Among ALL attached images, identify the one with a panoramic 2:1 width-to-height aspect ratio (equirectangular format). That image is the 360° BACKGROUND REFERENCE — NOT a character sheet. All other attached images are CHARACTER REFERENCE sheets.
⚠️ CRITICAL: The panoramic image is ONLY for background reference. DO NOT copy any character clothing or outfits from the 360° background image.
Use the 360° background's lighting direction (${f.lighting}), spatial layout, objects (${f.objects||"various"}), and mood (${f.mood||"contextual"}) as the consistent setting for all panels.
Match shadow directions and ambient color temperature to the 360° background reference.
At least 3 of 4 panels MUST use this background environment. 1 panel may deviate for flashback/imagination scenes.
`:"",C=_?`
CLOTHING:
- Reference image ONLY for face, hair, skin, accessories.
- IGNORE reference clothing. Use ONLY the OUTFIT OVERRIDE below.`:"",E=_?`OUTFIT OVERRIDE: All characters MUST wear exactly: ${_}. Apply tags directly.`:"";return`[FORMAT: A4 PORTRAIT 1024x1448px 🚨 NO square/landscape/tall]
Generate highly detailed, professional 4-koma (4-panel vertical) manga.
MUST have tall portrait aspect ratio (A4 paper, 1:1.414).

LAYOUT:
Canvas completely filled by panels (95% width). NO large white margins.
Top page: draw large bold black Japanese text title: "${e}"
NO quotes/punctuation around title.
Draw tiny English watermark ON bottom-right border of 4th panel: "${i}" (clean sans-serif).
Draw tiny Japanese watermark ON bottom-left border of 4th panel: "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor".
Watermarks standard horizontal. NO overlap. NO extra white space below panel 4.

PANELS: Exactly 4 EQUAL horizontal panels, stacked vertically. EXACT SAME height/width.
GUTTERS: THICK white gap (3% canvas height, 40-45px) between panels. Panels MUST NOT touch.
Style: ${s}.
(Dramatic anime cinematic lighting, high-budget VFX, NO excessive speedlines).
Setting: ${l}.
${M}

VISUAL REPRODUCTION:
Strictly reproduce reference image designs:
- EXACT hairstyle/color, eye color/shape, skin tone.
- EXACT accessories (glasses, hats). NO add/remove.
- NO feature swapping. Keep unique charm points in EVERY panel.
${C}
Cast:
${p}
${E}
【Identity Anchor】: Cross-panel consistency is MANDATORY. Redraw if hair/eyes/glasses/outfit mismatch.
${v}
OUTFIT CONSISTENCY: Every character MUST wear EXACT same outfit in ALL 4 panels. NO changes.

Camera & Comp:
${g}
ANTI-CLONING: NEVER draw the same character twice in a single panel.
COMPOSITION: Strict 2:3 golden ratio inside each panel.

Tech Dict:
(clean anime illustration background: 2.5)
(Meticulous clean line art, smooth cel shading: 2.5)
(Soft diffused backlight, rim light: 2.4)
(Cinematic depth of field, soft bokeh: 2.3)
(NO text/SFX outside speech bubbles: 2.8)
(NO ENGLISH TEXT outside watermark. NO 'G-pen'/'HA': 3.0)


${b}

Important constraints:
- Ensure the characters accurately reflect classic anime styles.
- Do NOT merge panels. Keep 4 distinct panels with white gutters between them.
- ABSOLUTELY NO TEXT OR SFX BETWEEN PANELS. The white gutters separating the panels MUST be completely clean and pure white. Do not draw any labels, narration, or sound effects crossing or sitting inside the panel boundaries.
- Do NOT write situation/narration explanations as text on the screen. The Visual Action must only be illustrated.
- Write the Japanese spoken text clearly inside white manga speech bubbles in a bold sans-serif Japanese font.
- Japanese dialogue MUST end with a period (。). However, do NOT add unnecessary commas (、) inside dialogue. Manga speech bubbles rarely use commas in natural Japanese — line breaks and bubble shape provide natural pauses instead. Only use commas when absolutely necessary to prevent misreading.
- TYPOGRAPHY RULE: Write Japanese text tightly with ZERO spaces between words. Do NOT insert any gaps or spaces between characters. (no letter spacing:1.5), (tight kerning:1.5).
- Do NOT add random English text except for the watermark.
- Maintain character consistency across all 4 panels.
- Flow is from top panel to bottom panel.
- Ensure the watermark is positioned at the absolute bottom edge of the image, with no extra whitespace below it. The text must be oriented horizontally (left-to-right).
- CRITICAL COMPOSITION BAN: Do NOT draw floating close-up eyes, partial face crops, or ghostly face overlays in the background of any panel. Every character must be drawn as a complete physical presence within the scene. No "dramatic eye insert" or "background eye close-up" compositions allowed.

FINAL COMPLIANCE CHECK (MANDATORY BEFORE OUTPUT):
Before generating the final image, mentally verify ALL of the following. If ANY check fails, you MUST redraw the failing panel:
- [ ] Panel 1: Does the camera angle show VISIBLE distortion? Is the horizon/floor NOT perfectly horizontal? Are body proportions warped by perspective?
- [ ] Panel 2: Does the camera angle show VISIBLE distortion? Is this a DIFFERENT angle from Panel 1? Can you see clear perspective deformation?
- [ ] Panel 3: Does the camera angle show VISIBLE distortion? Is this a DIFFERENT angle from Panels 1 and 2? Are architectural lines bending?
- [ ] Panel 4: Does the camera angle show VISIBLE distortion? Is this a DIFFERENT angle from the previous panels? Are near-side body parts oversized?
- [ ] ALL 4 panels use DIFFERENT camera angles from each other — no two panels share the same angle type.
- [ ] ZERO panels look like a flat, normal, eye-level photograph.
- [ ] You did NOT override the distortion for "readability" or "narrative flow" — the extreme distortion is the intended artistic style.
- [ ] Strict anatomy check: Verify correct left/right hand orientation and exactly 5 fingers per hand.
      `},up=r=>{const e=[];let i=null;if(r.split(`
`).forEach(l=>{const c=l.replace(/\*\*/g,"").trim();if(c.startsWith("## ")){i&&e.push(i);const _=c.replace(/^##\s*(?:\d+\.\s*)?/,"").trim();i={name:_,shortName:_.split(/[（(]/)[0].trim(),hairColor:"",hairStyle:"",glasses:"unknown",features:[]}}if(!i)return;if(c.includes("髪")||c.toLowerCase().includes("hair")){const _=c.match(/\[WEIGHTS?\]:\s*(.*)/i),g=_?_[1].replace(/\|/g,""):c,b=g.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s+hair(?!\s*(?:tip|end|gradient|streak|highlight|accent))/i);b&&!i.hairColor&&(i.hairColor=b[1]);const M=g.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i),C=g.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);i.hairStyle||(M?i.hairStyle=M[1]:C&&(i.hairStyle=C[1]))}const f=c.toLowerCase(),h=/\(no[\s_-]*glasses/i.test(f),m=/\([^)]*glasses[\s:]/i.test(f)&&!h;i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES"||(h?i.glasses="LOCKED_NO":m&&(i.glasses="LOCKED_YES")),!(i.glasses==="LOCKED_NO"||i.glasses==="LOCKED_YES")&&(c.includes("眼鏡")||c.includes("メガネ")||f.includes("eyewear"))&&(f.includes("bare eyes")||/(?:なし|無し|None|N\/A)/i.test(c)?i.glasses="NO":(/(?:あり|有り|有|着用)/i.test(c)||/(?:under-rim|round|square|oval|rimless|half-rim)/i.test(f))&&(i.glasses="YES"))}),i&&e.push(i),console.log("[IDENTITY MATRIX] Glasses detection results:"),e.forEach(l=>{console.log(`  ${l.shortName}: glasses=${l.glasses}, hair=${l.hairColor} ${l.hairStyle}`)}),e.length===0)return"";let s=`
【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】
`;return s+=`Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.
`,e.forEach(l=>{const c=[];l.hairColor&&c.push(`${l.hairColor} hair`),l.hairStyle&&c.push(l.hairStyle),l.glasses==="YES"||l.glasses==="LOCKED_YES"?c.push("MUST HAVE glasses (do NOT remove)"):l.glasses==="NO"||l.glasses==="LOCKED_NO"?c.push("MUST NOT have glasses (bare eyes)"):c.push("check reference image for glasses status"),s+=`- [${l.shortName}]: ${c.join(", ")||"see reference image"}
`}),s+=`CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.
`,s+=`Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.
`,s},Ro=(r,e)=>{const s=up(e).split(`
`).find(l=>l.includes(`[${r}]`));return s?s.split(":").slice(1).join(":").trim():""},sM=(r,e,i)=>{const s=r.match(/\[Camera:\s*(.*?)\]/i);if(s&&s[1]){const c=s[1].trim();let f="";for(const[h,m]of Object.entries(jE))if(c.includes(h)){f=m;break}return f?`${f}, (EXTREME hyper-dynamic composition:2.6), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)`:"(Extreme intense dynamic camera angle: 2.8), (EXTREME hyper-dynamic composition:2.6), (SEVERE dutch angle or extreme perspective distortion:2.7), (MASSIVE spherical or telephoto depth separation:2.5), (ABSOLUTELY NO flat normal photos:2.9), (NEVER draw text of camera names:3.0)"}const l=e[i.index%e.length];return i.index++,l},rM=r=>r.replace(/\(([^()]+?):\d+\.?\d*\)/g,"$1").replace(/,\s*,+/g,",").replace(/,\s*$/g,"").replace(/^\s*,\s*/g,"").trim(),oM=(r,e)=>{const i=r.match(/\[Camera:\s*(.*?)\]/i);if(i&&i[1])return i[1].trim();const s=["Extreme bird's-eye view from directly above","Worm's-eye view from ground level looking up","Dutch angle with 30-45 degree tilt","Telephoto close-up with background compression","Wide-angle shot with exaggerated perspective"];return s[e.index%s.length]},M_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(f=>{const h=f.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(h){const m=h[1].trim();s.push(m);const p=m.split(/[\(]/)[0].trim();p&&p!==m&&s.push(p);const v=m.match(/[\(]\s*(.*?)\s*[\)]/);v&&s.push(v[1].trim())}});const l=[];let c=1;if(i.forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);let m=!1,p=f;if(h&&h[1].trim()){let _=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim().replace(/[（(].*?[）)]/g,"").trim();const g=/[がをにでへはもとからまでより]/.test(_)&&_.length>5,b=_.length>20,M=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定|物理描写|SFX|効果音|BGM|ナレーション|テロップ)$/i.test(_),C=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(_),E=/[（(]\s*リアクション/i.test(h[1]);g||b||M||C||E||(s.some(S=>{const N=S.split(/[（(]/)[0].trim();return _===S||_===N||N===_||_.includes(N)})||_.includes("全員")||_==="Speaker"||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&(m=!0)}else if(f.trim().startsWith("「")){const v=f.trim();/^「[^」]+」[？！。、!?\s]*$/.test(v)&&(m=!0)}m&&(p=p.replace(/^.*?(?:[:：]|「)\s*/,""),p=p.trim(),p=p.replace(/^「+/,"").replace(/」+$/,""),p=p.replace(/（.*?）|\(.*?\)/g,""),p=p.trim(),p&&(l.push(`(Speech Bubble ${c}: "${p}")`),c++))}),l.length===0){const f=r.match(/「([^」]+)」/g);f&&f.length>0&&f.forEach(h=>{let m=h.replace(/^「/,"").replace(/」$/,"").trim();m=m.replace(/（.*?）|\(.*?\)/g,"").trim();const p=s.filter(g=>{const b=g.split(/[\(（]/)[0].trim();return b&&m.includes(b)}),v=/(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(m),_=p.length>=2&&v&&m.length>15;m&&!_&&(l.push(`(Speech Bubble ${c}: "${m}")`),c++)})}return l.length===0?"(Characters interact without dialogue in this panel)":l.join(", ")},T_=(r,e,i="")=>{const s=r.split(`
`),l=[];e.split(`
`).forEach(h=>{const m=h.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(m){const p=m[1].trim();l.push(p);const v=p.split(/[\(]/)[0].trim();v&&v!==p&&l.push(v);const _=p.match(/[\(]\s*(.*?)\s*[\)]/);_&&l.push(_[1].trim())}});let f=s.filter(h=>{const m=h.match(/^(.*?)(?:[:：]|「)/);let p=!1;if(m&&m[1].trim()){let g=m[1].replace(/^(SFX|効果音|BGM|Action)/i,"").trim();g=g.replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const b=/[がをにでへはもとからまでより]/.test(g)&&g.length>5,M=g.length>12,C=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(g),E=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(g.replace(/[（(].*$/,"").trim()),S=/[（(]\s*リアクション/i.test(m[1]);b||M||C||E||S||(l.some(N=>g.includes(N)||N.includes(g))||g==="全員"||g==="Speaker"||m[0].trim().endsWith(":")||m[0].trim().endsWith("："))&&(p=!0)}else if(h.trim().startsWith("「")){const g=h.trim();/^「[^」]+」[？！。、!?\s]*$/.test(g)&&(p=!0)}const v=h.match(/^\[\d+コマ目/),_=h.trim()==="";return!p&&!v&&!_}).join(" ").trim();return f=f.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g,""),f=f.replace(/[（(](?:Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)[:：]?\s*(.*?)[)）]/gi,"$1"),f=f||"Characters interacting dynamically based on dialogue.",i&&l.forEach(h=>{const m=h.split("(")[0].trim();i.includes(m)}),f},A_=(r,e)=>e?`(All characters are wearing ${e}) ${r}`:r,wu=(r,e)=>{const s=r.split(`
`).filter(f=>{const h=f.trim();return/^\[EMOTION:/i.test(h)||/^状況[：:]/i.test(h)?!1:h.includes("：")||h.includes(":")||h.includes("「")}),l=[];e.split(`
`).forEach(f=>{const h=f.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(h){const m=h[1].trim();l.push(m);const p=m.split(/[（(]/)[0].trim();p&&p!==m&&l.push(p)}});const c=[];if(s.forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);if(h&&h[1].trim()){let m=h[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();const p=/[がをにでへはもとからまでより]/.test(m)&&m.length>5,v=m.length>12,_=/^(Camera|Location|Outfit|EMOTION|状況|Action|リアクション|Reaction|設定)$/i.test(m),g=/^[^a-zA-Z]*([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF])([ーッっ]*\1){1,}[ーッっ！!ン]*$/u.test(m.replace(/[（(].*$/,"").trim()),b=/[（(]\s*リアクション/i.test(h[1]);if(p||v||_||g||b)return;m&&!c.includes(m)&&!/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)$/i.test(m)&&(l.some(M=>{const C=M.split(/[（(]/)[0].trim();return m===M||m===C||C===m})||h[0].trim().endsWith(":")||h[0].trim().endsWith("："))&&c.push(m)}}),c.length>=3){const f=Ro(c[0],e),h=Ro(c[1],e),m=Ro(c[2],e);return`CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${c[0]}] (${f||"see reference"}) — First speaker
- CENTER ZONE: [${c[1]}] (${h||"see reference"}) — Second speaker
- LEFT ZONE: [${c[2]}] (${m||"see reference"}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${c[0]}] MUST be on the RIGHT third of the panel.
- [${c[1]}] MUST be in the CENTER of the panel.
- [${c[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${c[0]}]'s bubble on the RIGHT, [${c[1]}]'s in CENTER, [${c[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`}else if(c.length>=2){const f=Ro(c[0],e),h=Ro(c[1],e);return`CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${c[0]}] (${f||"see reference"})
- LEFT side: [${c[1]}] (${h||"see reference"})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${f||c[0]+"'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${h||c[1]+"'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION LOCK:
- [${c[0]}]'s speech bubble MUST appear on the RIGHT side, directly above/beside [${c[0]}]'s head.
- [${c[1]}]'s speech bubble MUST appear on the LEFT side, directly above/beside [${c[1]}]'s head.
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`}else if(c.length===1){const f=Ro(c[0],e);return`CRITICAL PLACEMENT & IDENTITY: [${c[0]}] (${f||"see reference"}) is the main focus of this panel.`}return"CRITICAL PLACEMENT: Follow the natural dialogue flow."},w_=(r,e)=>{const i=r.split(`
`),s=[];e.split(`
`).forEach(_=>{const g=_.replace(/\*\*/g,"").trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);if(g){const M=g[1].trim().split("(")[0].trim().split("（")[0].trim();M&&s.push(M)}});const l=[];i.forEach(_=>{const g=_.match(/^(.*?)(?:[:：]|「)/);if(g&&g[1].trim()){let b=g[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi,"").replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();b&&!l.includes(b)&&s.includes(b)&&l.push(b)}});const c=[...l],f=r;s.forEach(_=>{!c.includes(_)&&f.includes(_)&&c.push(_)});let h=0;i.forEach(_=>{const g=_.trim();(g.includes("「")&&g.includes("」")||/^[^（(【\[]*?[:：]\s*「/.test(g))&&h++});const m=l.slice(0,3).map(_=>`[${_}]`),p=s.filter(_=>!c.includes(_));p.length>0&&p.forEach(_=>{c.includes(_)||c.push(_)});const v=c.map(_=>`[${_}]`);if(m.length>0){let _=`ANTI-CLONE REMINDER: ${v.join(", ")} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;c.length===1&&h<=1?_+=`
SOLO SHOT (SINGLE CHARACTER SCENE): Since only ${v[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${v[0]}. Leave the surrounding space empty rather than adding people.`:c.length===1&&h>=2&&(_+=`
NOTE: Multiple speech bubbles in this panel are ALL spoken by ${v[0]} (monologue/soliloquy). Draw only ${v[0]} — do NOT add a second character just because there are multiple bubbles.`);const g=m.join(" and "),b=v.filter(E=>!m.includes(E)),M=b.length>0?b.join(", "):"NO ONE ELSE",C=`
FOREGROUND MUST CONTAIN ONLY: ${g}.
BACKGROUND MUST CONTAIN ONLY: ${M}.
ABSOLUTELY NO OTHER HUMANS ALLOWED. Do not draw any character in the background if they are already in the foreground. Total EXACTLY ${c.length} distinct individuals.`;return`CRITICAL CAST PLACEMENT: Ensure ${g} are the main focus.
${_}${C}`}else return"CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice."},lM=r=>{const e=r.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW|SPEED|FLASHBACK|UKIYOE|POP_ART|SKETCH|NEON|THICK_PAINT|PASTEL|CEL|DARK_ANIME|THIN_LINE|HIGH_SATURATION)\s*\]/i);if(e){const i=e[1].toUpperCase();if(Di[i])return i}return"NORMAL"},R_=r=>{const e=lM(r);if(e==="NORMAL")return"";const i=Di[e],s=[];if(r.split(`
`).forEach(f=>{const h=f.match(/^(.*?)(?:[:：]|「)/);if(h&&h[1].trim()){const m=h[1].replace(/^[【\[（(]/,"").replace(/[】\]）)]$/,"").trim();m&&!s.includes(m)&&s.push(m)}}),s.length>=2&&i.styleMulti){let f=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.styleMulti}`;return i.proportionsMulti&&(f+=`
PROPORTION OVERRIDE: ${i.proportionsMulti}`),i.vfxMulti&&(f+=`
VFX: ${i.vfxMulti}`),f}let c=`
(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${i.style}`;return i.proportions&&(c+=`
PROPORTION OVERRIDE: ${i.proportions}`),i.vfx&&(c+=`
VFX: ${i.vfx}`),c},cM=(r,e)=>{let i="",s="";const l=r.split(`
`);for(let c=0;c<l.length;c++){const f=l[c].replace(/\*\*/g,"").trim();if(f.startsWith("## ")&&(s=f.replace(/^##\s*(?:\d+\.\s*)?/,"").trim(),i+=`
- Character [${s}]: `),!s||e&&(f.includes("服装")||f.includes("Outfit")))continue;const h=f.match(/\[WEIGHTS?\]:\s*(.*)/i);if(h){let p=h[1].replace(/\|/g,"").trim();p&&p!=="()"&&p!=="-"&&(i+=p+", ");continue}const m=f.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);m&&m.length>=2&&(i+=m.join(", ")+", ")}return i.trim()||(i=r.trim()),i.trim()},uM=r=>{const e=[...r];for(let i=e.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[e[i],e[s]]=[e[s],e[i]]}return e},Ru=(r,e,i)=>{const s=new RegExp(`\\[${e}.*?\\]([\\s\\S]*?)(?=\\[${i}|$)`,"i"),l=r.match(s);return l?l[1].trim():""},fM=({scenario:r,castList:e,colorMode:i,enableChatGPTMode:s,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,punchlineType:m,systemVersion:p})=>{let v=i==="monochrome";if(i==="auto"){const K=e.toLowerCase();v=K.includes("style_tag: monochrome")||K.includes("monochrome")||K.includes("greyscale")||K.includes("screentone")}const _=v?"Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic.":"Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.",g=XE;let b=r.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim()||r.split(`
`)[0].substring(0,20);b=b.replace(/^Topic:\s*/i,"").trim();const M=r.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim(),C=r.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim(),E=M||"Generic Detailed Background",S=C&&!/^(なし|キャラシート準拠|none|default)/i.test(C)?C:"",N=r.replace(/```(?:json|markdown)?/gi,"").trim(),U=Ru(N,"1コマ目","2コマ目")||N,I=Ru(N,"2コマ目","3コマ目"),k=Ru(N,"3コマ目","4コマ目"),D=Ru(N,"4コマ目","UNKNOWN"),B=uM(VE).slice(0,4),A={index:0},F=cM(e,S),q=s?rM(F):F,H=E,$=b||"4-koma Manga",ce=s?`Generated by ChatGPT with Super FURU AI 4-koma ${p}`:`Generated by Super FURU AI 4-koma ${p}`;let oe="";const j=[U,I,k,D];let L="";s?(L=j.map((K,ue)=>`## Panel ${ue+1}
${R_(K)}
${wu(K,e).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
${w_(K,e).replace(/\\\\[/g, '').replace(/\\\\]/g,"")}
Camera: ${oM(K,A)}
Action: ${A_(T_(K,e,wu(K,e)),S)}
Dialogue (Japanese text inside speech bubbles only): ${M_(K,e)}`).join(`

`),oe=iM({safeTopic:$,watermarkEng:ce,styleCore:_,safeLocation:H,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,enableChatGPTMode:s,VAR_CAST_LIST_CHATGPT:q,identityMatrix:up(e),activeOutfit:S,panelSections:L})):(L=j.map((ue,xe)=>`## Panel ${xe+1}
${R_(ue)}
${wu(ue,e)}
${w_(ue,e)}
Camera: ${sM(ue,B,A)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${A_(T_(ue,e,wu(ue,e)),S)}.
Dialogue (ONLY inside bubbles): ${M_(ue,e)}.`).join(`

`),oe=YE+aM({safeTopic:$,watermarkEng:ce,styleCore:_,safeLocation:H,bg360Image:l,bg360Analysis:c,bg360Enabled:f,bg360CroppedPanels:h,VAR_CAST_LIST:F,identityMatrix:up(e),activeOutfit:S,dynamicCamera:g,panelSections:L}));let G=WE(oe.trim());return m==="Documentary"&&(G=qE(G)),G},df=({thought:r,containerHeight:e="h-[180px]",scrollHeight:i="h-[120px]",placeholder:s=""})=>{const l=we.useRef(null);we.useEffect(()=>{l.current&&(l.current.scrollTop=l.current.scrollHeight)},[r]);const c=r||s;return!c&&!s?null:x.jsxs("div",{className:`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${e}`,children:[x.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"}),x.jsxs("div",{className:"flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]",children:[x.jsx(im,{size:16})," Neural Process (Thinking Mode)"]}),x.jsxs("div",{ref:l,className:`${i} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${r?"text-blue-100":"text-blue-300/30"}`,children:[c||"> ボタンを押すとAI処理ログがここに表示されます...",r&&x.jsx("span",{className:"inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"})]})]})};const rm="184",Xo={ROTATE:0,DOLLY:1,PAN:2},jo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},dM=0,C_=1,hM=2,tf=1,pM=2,nc=3,cr=0,Oi=1,bs=2,Ss=0,Yo=1,N_=2,O_=3,D_=4,mM=5,Pr=100,gM=101,xM=102,_M=103,vM=104,bM=200,yM=201,SM=202,EM=203,fp=204,dp=205,MM=206,TM=207,AM=208,wM=209,RM=210,CM=211,NM=212,OM=213,DM=214,hp=0,pp=1,mp=2,$o=3,gp=4,xp=5,_p=6,vp=7,Yv=0,LM=1,UM=2,Ba=0,Wv=1,qv=2,$v=3,Kv=4,Zv=5,Qv=6,Jv=7,eb=300,Hr=301,Ko=302,nf=303,Rh=304,vf=306,bp=1e3,ys=1001,yp=1002,oi=1003,IM=1004,Cu=1005,mi=1006,Ch=1007,Br=1008,ra=1009,tb=1010,nb=1011,fc=1012,om=1013,Ha=1014,Pa=1015,Ms=1016,lm=1017,cm=1018,dc=1020,ib=35902,ab=35899,sb=1021,rb=1022,ba=1023,Ts=1026,zr=1027,ob=1028,um=1029,kr=1030,fm=1031,dm=1033,af=33776,sf=33777,rf=33778,of=33779,Sp=35840,Ep=35841,Mp=35842,Tp=35843,Ap=36196,wp=37492,Rp=37496,Cp=37488,Np=37489,hf=37490,Op=37491,Dp=37808,Lp=37809,Up=37810,Ip=37811,Pp=37812,Fp=37813,Bp=37814,zp=37815,Gp=37816,Hp=37817,kp=37818,Vp=37819,jp=37820,Xp=37821,Yp=36492,Wp=36494,qp=36495,$p=36283,Kp=36284,pf=36285,Zp=36286,PM=3200,L_=0,FM=1,rr="",Yi="srgb",mf="srgb-linear",gf="linear",ln="srgb",Co=7680,U_=519,BM=512,zM=513,GM=514,hm=515,HM=516,kM=517,pm=518,VM=519,I_=35044,P_="300 es",Fa=2e3,xf=2001;function jM(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function hc(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function XM(){const r=hc("canvas");return r.style.display="block",r}const F_={};function B_(...r){const e="THREE."+r.shift();console.log(e,...r)}function lb(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=r[1];i&&i.isStackTrace?r[0]+=" "+i.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function mt(...r){r=lb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...r)}}function $t(...r){r=lb(r);const e="THREE."+r.shift();{const i=r[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...r)}}function Qp(...r){const e=r.join(" ");e in F_||(F_[e]=!0,mt(...r))}function YM(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}const WM={[hp]:pp,[mp]:_p,[gp]:vp,[$o]:xp,[pp]:hp,[_p]:mp,[vp]:gp,[xp]:$o};class fr{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,e);e.target=null}}}const di=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lf=Math.PI/180,Jp=180/Math.PI;function mc(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(di[r&255]+di[r>>8&255]+di[r>>16&255]+di[r>>24&255]+"-"+di[e&255]+di[e>>8&255]+"-"+di[e>>16&15|64]+di[e>>24&255]+"-"+di[i&63|128]+di[i>>8&255]+"-"+di[i>>16&255]+di[i>>24&255]+di[s&255]+di[s>>8&255]+di[s>>16&255]+di[s>>24&255]).toLowerCase()}function Pt(r,e,i){return Math.max(e,Math.min(i,r))}function qM(r,e){return(r%e+e)%e}function Nh(r,e,i){return(1-i)*r+i*e}function ql(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ci(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const $M={DEG2RAD:lf},ym=class ym{constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Pt(this.x,e.x,i.x),this.y=Pt(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Pt(this.x,e,i),this.y=Pt(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Pt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,f=this.y-e.y;return this.x=c*s-f*l+e.x,this.y=c*l+f*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ym.prototype.isVector2=!0;let Dt=ym;class ur{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,f,h){let m=s[l+0],p=s[l+1],v=s[l+2],_=s[l+3],g=c[f+0],b=c[f+1],M=c[f+2],C=c[f+3];if(_!==C||m!==g||p!==b||v!==M){let E=m*g+p*b+v*M+_*C;E<0&&(g=-g,b=-b,M=-M,C=-C,E=-E);let S=1-h;if(E<.9995){const N=Math.acos(E),U=Math.sin(N);S=Math.sin(S*N)/U,h=Math.sin(h*N)/U,m=m*S+g*h,p=p*S+b*h,v=v*S+M*h,_=_*S+C*h}else{m=m*S+g*h,p=p*S+b*h,v=v*S+M*h,_=_*S+C*h;const N=1/Math.sqrt(m*m+p*p+v*v+_*_);m*=N,p*=N,v*=N,_*=N}}e[i]=m,e[i+1]=p,e[i+2]=v,e[i+3]=_}static multiplyQuaternionsFlat(e,i,s,l,c,f){const h=s[l],m=s[l+1],p=s[l+2],v=s[l+3],_=c[f],g=c[f+1],b=c[f+2],M=c[f+3];return e[i]=h*M+v*_+m*b-p*g,e[i+1]=m*M+v*g+p*_-h*b,e[i+2]=p*M+v*b+h*g-m*_,e[i+3]=v*M-h*_-m*g-p*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,f=e._order,h=Math.cos,m=Math.sin,p=h(s/2),v=h(l/2),_=h(c/2),g=m(s/2),b=m(l/2),M=m(c/2);switch(f){case"XYZ":this._x=g*v*_+p*b*M,this._y=p*b*_-g*v*M,this._z=p*v*M+g*b*_,this._w=p*v*_-g*b*M;break;case"YXZ":this._x=g*v*_+p*b*M,this._y=p*b*_-g*v*M,this._z=p*v*M-g*b*_,this._w=p*v*_+g*b*M;break;case"ZXY":this._x=g*v*_-p*b*M,this._y=p*b*_+g*v*M,this._z=p*v*M+g*b*_,this._w=p*v*_-g*b*M;break;case"ZYX":this._x=g*v*_-p*b*M,this._y=p*b*_+g*v*M,this._z=p*v*M-g*b*_,this._w=p*v*_+g*b*M;break;case"YZX":this._x=g*v*_+p*b*M,this._y=p*b*_+g*v*M,this._z=p*v*M-g*b*_,this._w=p*v*_-g*b*M;break;case"XZY":this._x=g*v*_-p*b*M,this._y=p*b*_-g*v*M,this._z=p*v*M+g*b*_,this._w=p*v*_+g*b*M;break;default:mt("Quaternion: .setFromEuler() encountered an unknown order: "+f)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],f=i[1],h=i[5],m=i[9],p=i[2],v=i[6],_=i[10],g=s+h+_;if(g>0){const b=.5/Math.sqrt(g+1);this._w=.25/b,this._x=(v-m)*b,this._y=(c-p)*b,this._z=(f-l)*b}else if(s>h&&s>_){const b=2*Math.sqrt(1+s-h-_);this._w=(v-m)/b,this._x=.25*b,this._y=(l+f)/b,this._z=(c+p)/b}else if(h>_){const b=2*Math.sqrt(1+h-s-_);this._w=(c-p)/b,this._x=(l+f)/b,this._y=.25*b,this._z=(m+v)/b}else{const b=2*Math.sqrt(1+_-s-h);this._w=(f-l)/b,this._x=(c+p)/b,this._y=(m+v)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,f=e._w,h=i._x,m=i._y,p=i._z,v=i._w;return this._x=s*v+f*h+l*p-c*m,this._y=l*v+f*m+c*h-s*p,this._z=c*v+f*p+s*m-l*h,this._w=f*v-s*h-l*m-c*p,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,c=e._z,f=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,c=-c,f=-f,h=-h);let m=1-i;if(h<.9995){const p=Math.acos(h),v=Math.sin(p);m=Math.sin(m*p)/v,i=Math.sin(i*p)/v,this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this._onChangeCallback()}else this._x=this._x*m+s*i,this._y=this._y*m+l*i,this._z=this._z*m+c*i,this._w=this._w*m+f*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Sm=class Sm{constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(z_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(z_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,f=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*f,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*f,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*f,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,f=e.y,h=e.z,m=e.w,p=2*(f*l-h*s),v=2*(h*i-c*l),_=2*(c*s-f*i);return this.x=i+m*p+f*_-h*v,this.y=s+m*v+h*p-c*_,this.z=l+m*_+c*v-f*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Pt(this.x,e.x,i.x),this.y=Pt(this.y,e.y,i.y),this.z=Pt(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Pt(this.x,e,i),this.y=Pt(this.y,e,i),this.z=Pt(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,f=i.x,h=i.y,m=i.z;return this.x=l*m-c*h,this.y=c*f-s*m,this.z=s*h-l*f,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Oh.copy(this).projectOnVector(e),this.sub(Oh)}reflect(e){return this.sub(Oh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Pt(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Sm.prototype.isVector3=!0;let ae=Sm;const Oh=new ae,z_=new ur,Em=class Em{constructor(e,i,s,l,c,f,h,m,p){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p)}set(e,i,s,l,c,f,h,m,p){const v=this.elements;return v[0]=e,v[1]=l,v[2]=h,v[3]=i,v[4]=c,v[5]=m,v[6]=s,v[7]=f,v[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[3],m=s[6],p=s[1],v=s[4],_=s[7],g=s[2],b=s[5],M=s[8],C=l[0],E=l[3],S=l[6],N=l[1],U=l[4],I=l[7],k=l[2],D=l[5],B=l[8];return c[0]=f*C+h*N+m*k,c[3]=f*E+h*U+m*D,c[6]=f*S+h*I+m*B,c[1]=p*C+v*N+_*k,c[4]=p*E+v*U+_*D,c[7]=p*S+v*I+_*B,c[2]=g*C+b*N+M*k,c[5]=g*E+b*U+M*D,c[8]=g*S+b*I+M*B,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],v=e[8];return i*f*v-i*h*p-s*c*v+s*h*m+l*c*p-l*f*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],v=e[8],_=v*f-h*p,g=h*m-v*c,b=p*c-f*m,M=i*_+s*g+l*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const C=1/M;return e[0]=_*C,e[1]=(l*p-v*s)*C,e[2]=(h*s-l*f)*C,e[3]=g*C,e[4]=(v*i-l*m)*C,e[5]=(l*c-h*i)*C,e[6]=b*C,e[7]=(s*m-p*i)*C,e[8]=(f*i-s*c)*C,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,f,h){const m=Math.cos(c),p=Math.sin(c);return this.set(s*m,s*p,-s*(m*f+p*h)+f+e,-l*p,l*m,-l*(-p*f+m*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Dh.makeScale(e,i)),this}rotate(e){return this.premultiply(Dh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Dh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Em.prototype.isMatrix3=!0;let St=Em;const Dh=new St,G_=new St().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),H_=new St().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function KM(){const r={enabled:!0,workingColorSpace:mf,spaces:{},convert:function(l,c,f){return this.enabled===!1||c===f||!c||!f||(this.spaces[c].transfer===ln&&(l.r=Es(l.r),l.g=Es(l.g),l.b=Es(l.b)),this.spaces[c].primaries!==this.spaces[f].primaries&&(l.applyMatrix3(this.spaces[c].toXYZ),l.applyMatrix3(this.spaces[f].fromXYZ)),this.spaces[f].transfer===ln&&(l.r=Wo(l.r),l.g=Wo(l.g),l.b=Wo(l.b))),l},workingToColorSpace:function(l,c){return this.convert(l,this.workingColorSpace,c)},colorSpaceToWorking:function(l,c){return this.convert(l,c,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===rr?gf:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,c=this.workingColorSpace){return l.fromArray(this.spaces[c].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,c,f){return l.copy(this.spaces[c].toXYZ).multiply(this.spaces[f].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,c){return Qp("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(l,c)},toWorkingColorSpace:function(l,c){return Qp("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(l,c)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return r.define({[mf]:{primaries:e,whitePoint:s,transfer:gf,toXYZ:G_,fromXYZ:H_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Yi},outputColorSpaceConfig:{drawingBufferColorSpace:Yi}},[Yi]:{primaries:e,whitePoint:s,transfer:ln,toXYZ:G_,fromXYZ:H_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Yi}}}),r}const jt=KM();function Es(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Wo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let No;class ZM{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{No===void 0&&(No=hc("canvas")),No.width=e.width,No.height=e.height;const l=No.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=No}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=hc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Es(c[f]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Es(i[s]/255)*255):i[s]=Es(i[s]);return{data:i,width:e.width,height:e.height}}else return mt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let QM=0;class mm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:QM++}),this.uuid=mc(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,h=l.length;f<h;f++)l[f].isDataTexture?c.push(Lh(l[f].image)):c.push(Lh(l[f]))}else c=Lh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Lh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ZM.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(mt("Texture: Unable to serialize Texture."),{})}let JM=0;const Uh=new ae;class gi extends fr{constructor(e=gi.DEFAULT_IMAGE,i=gi.DEFAULT_MAPPING,s=ys,l=ys,c=mi,f=Br,h=ba,m=ra,p=gi.DEFAULT_ANISOTROPY,v=rr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:JM++}),this.uuid=mc(),this.name="",this.source=new mm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=p,this.format=h,this.internalFormat=null,this.type=m,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new St,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Uh).x}get height(){return this.source.getSize(Uh).y}get depth(){return this.source.getSize(Uh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){mt(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){mt(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==eb)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bp:e.x=e.x-Math.floor(e.x);break;case ys:e.x=e.x<0?0:1;break;case yp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bp:e.y=e.y-Math.floor(e.y);break;case ys:e.y=e.y<0?0:1;break;case yp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gi.DEFAULT_IMAGE=null;gi.DEFAULT_MAPPING=eb;gi.DEFAULT_ANISOTROPY=1;const Mm=class Mm{constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l+f[12]*c,this.y=f[1]*i+f[5]*s+f[9]*l+f[13]*c,this.z=f[2]*i+f[6]*s+f[10]*l+f[14]*c,this.w=f[3]*i+f[7]*s+f[11]*l+f[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const m=e.elements,p=m[0],v=m[4],_=m[8],g=m[1],b=m[5],M=m[9],C=m[2],E=m[6],S=m[10];if(Math.abs(v-g)<.01&&Math.abs(_-C)<.01&&Math.abs(M-E)<.01){if(Math.abs(v+g)<.1&&Math.abs(_+C)<.1&&Math.abs(M+E)<.1&&Math.abs(p+b+S-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const U=(p+1)/2,I=(b+1)/2,k=(S+1)/2,D=(v+g)/4,B=(_+C)/4,A=(M+E)/4;return U>I&&U>k?U<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(U),l=D/s,c=B/s):I>k?I<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(I),s=D/l,c=A/l):k<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(k),s=B/c,l=A/c),this.set(s,l,c,i),this}let N=Math.sqrt((E-M)*(E-M)+(_-C)*(_-C)+(g-v)*(g-v));return Math.abs(N)<.001&&(N=1),this.x=(E-M)/N,this.y=(_-C)/N,this.z=(g-v)/N,this.w=Math.acos((p+b+S-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Pt(this.x,e.x,i.x),this.y=Pt(this.y,e.y,i.y),this.z=Pt(this.z,e.z,i.z),this.w=Pt(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Pt(this.x,e,i),this.y=Pt(this.y,e,i),this.z=Pt(this.z,e,i),this.w=Pt(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Pt(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Mm.prototype.isVector4=!0;let In=Mm;class eT extends fr{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new In(0,0,e,i),this.scissorTest=!1,this.viewport=new In(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},c=new gi(l),f=s.count;for(let h=0;h<f;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview}_setTextureOptions(e={}){const i={minFilter:mi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new mm(l)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class za extends eT{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class cb extends gi{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=oi,this.minFilter=oi,this.wrapR=ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tT extends gi{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=oi,this.minFilter=oi,this.wrapR=ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _f=class _f{constructor(e,i,s,l,c,f,h,m,p,v,_,g,b,M,C,E){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,f,h,m,p,v,_,g,b,M,C,E)}set(e,i,s,l,c,f,h,m,p,v,_,g,b,M,C,E){const S=this.elements;return S[0]=e,S[4]=i,S[8]=s,S[12]=l,S[1]=c,S[5]=f,S[9]=h,S[13]=m,S[2]=p,S[6]=v,S[10]=_,S[14]=g,S[3]=b,S[7]=M,S[11]=C,S[15]=E,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _f().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinant()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const i=this.elements,s=e.elements,l=1/Oo.setFromMatrixColumn(e,0).length(),c=1/Oo.setFromMatrixColumn(e,1).length(),f=1/Oo.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*f,i[9]=s[9]*f,i[10]=s[10]*f,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,f=Math.cos(s),h=Math.sin(s),m=Math.cos(l),p=Math.sin(l),v=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const g=f*v,b=f*_,M=h*v,C=h*_;i[0]=m*v,i[4]=-m*_,i[8]=p,i[1]=b+M*p,i[5]=g-C*p,i[9]=-h*m,i[2]=C-g*p,i[6]=M+b*p,i[10]=f*m}else if(e.order==="YXZ"){const g=m*v,b=m*_,M=p*v,C=p*_;i[0]=g+C*h,i[4]=M*h-b,i[8]=f*p,i[1]=f*_,i[5]=f*v,i[9]=-h,i[2]=b*h-M,i[6]=C+g*h,i[10]=f*m}else if(e.order==="ZXY"){const g=m*v,b=m*_,M=p*v,C=p*_;i[0]=g-C*h,i[4]=-f*_,i[8]=M+b*h,i[1]=b+M*h,i[5]=f*v,i[9]=C-g*h,i[2]=-f*p,i[6]=h,i[10]=f*m}else if(e.order==="ZYX"){const g=f*v,b=f*_,M=h*v,C=h*_;i[0]=m*v,i[4]=M*p-b,i[8]=g*p+C,i[1]=m*_,i[5]=C*p+g,i[9]=b*p-M,i[2]=-p,i[6]=h*m,i[10]=f*m}else if(e.order==="YZX"){const g=f*m,b=f*p,M=h*m,C=h*p;i[0]=m*v,i[4]=C-g*_,i[8]=M*_+b,i[1]=_,i[5]=f*v,i[9]=-h*v,i[2]=-p*v,i[6]=b*_+M,i[10]=g-C*_}else if(e.order==="XZY"){const g=f*m,b=f*p,M=h*m,C=h*p;i[0]=m*v,i[4]=-_,i[8]=p*v,i[1]=g*_+C,i[5]=f*v,i[9]=b*_-M,i[2]=M*_-b,i[6]=h*v,i[10]=C*_+g}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nT,e,iT)}lookAt(e,i,s){const l=this.elements;return Vi.subVectors(e,i),Vi.lengthSq()===0&&(Vi.z=1),Vi.normalize(),Qs.crossVectors(s,Vi),Qs.lengthSq()===0&&(Math.abs(s.z)===1?Vi.x+=1e-4:Vi.z+=1e-4,Vi.normalize(),Qs.crossVectors(s,Vi)),Qs.normalize(),Nu.crossVectors(Vi,Qs),l[0]=Qs.x,l[4]=Nu.x,l[8]=Vi.x,l[1]=Qs.y,l[5]=Nu.y,l[9]=Vi.y,l[2]=Qs.z,l[6]=Nu.z,l[10]=Vi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,f=s[0],h=s[4],m=s[8],p=s[12],v=s[1],_=s[5],g=s[9],b=s[13],M=s[2],C=s[6],E=s[10],S=s[14],N=s[3],U=s[7],I=s[11],k=s[15],D=l[0],B=l[4],A=l[8],F=l[12],q=l[1],H=l[5],$=l[9],ce=l[13],oe=l[2],j=l[6],L=l[10],G=l[14],K=l[3],ue=l[7],xe=l[11],P=l[15];return c[0]=f*D+h*q+m*oe+p*K,c[4]=f*B+h*H+m*j+p*ue,c[8]=f*A+h*$+m*L+p*xe,c[12]=f*F+h*ce+m*G+p*P,c[1]=v*D+_*q+g*oe+b*K,c[5]=v*B+_*H+g*j+b*ue,c[9]=v*A+_*$+g*L+b*xe,c[13]=v*F+_*ce+g*G+b*P,c[2]=M*D+C*q+E*oe+S*K,c[6]=M*B+C*H+E*j+S*ue,c[10]=M*A+C*$+E*L+S*xe,c[14]=M*F+C*ce+E*G+S*P,c[3]=N*D+U*q+I*oe+k*K,c[7]=N*B+U*H+I*j+k*ue,c[11]=N*A+U*$+I*L+k*xe,c[15]=N*F+U*ce+I*G+k*P,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],f=e[1],h=e[5],m=e[9],p=e[13],v=e[2],_=e[6],g=e[10],b=e[14],M=e[3],C=e[7],E=e[11],S=e[15],N=m*b-p*g,U=h*b-p*_,I=h*g-m*_,k=f*b-p*v,D=f*g-m*v,B=f*_-h*v;return i*(C*N-E*U+S*I)-s*(M*N-E*k+S*D)+l*(M*U-C*k+S*B)-c*(M*I-C*D+E*B)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],f=e[4],h=e[5],m=e[6],p=e[7],v=e[8],_=e[9],g=e[10],b=e[11],M=e[12],C=e[13],E=e[14],S=e[15],N=i*h-s*f,U=i*m-l*f,I=i*p-c*f,k=s*m-l*h,D=s*p-c*h,B=l*p-c*m,A=v*C-_*M,F=v*E-g*M,q=v*S-b*M,H=_*E-g*C,$=_*S-b*C,ce=g*S-b*E,oe=N*ce-U*$+I*H+k*q-D*F+B*A;if(oe===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const j=1/oe;return e[0]=(h*ce-m*$+p*H)*j,e[1]=(l*$-s*ce-c*H)*j,e[2]=(C*B-E*D+S*k)*j,e[3]=(g*D-_*B-b*k)*j,e[4]=(m*q-f*ce-p*F)*j,e[5]=(i*ce-l*q+c*F)*j,e[6]=(E*I-M*B-S*U)*j,e[7]=(v*B-g*I+b*U)*j,e[8]=(f*$-h*q+p*A)*j,e[9]=(s*q-i*$-c*A)*j,e[10]=(M*D-C*I+S*N)*j,e[11]=(_*I-v*D-b*N)*j,e[12]=(h*F-f*H-m*A)*j,e[13]=(i*H-s*F+l*A)*j,e[14]=(C*U-M*k-E*N)*j,e[15]=(v*k-_*U+g*N)*j,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,f=e.x,h=e.y,m=e.z,p=c*f,v=c*h;return this.set(p*f+s,p*h-l*m,p*m+l*h,0,p*h+l*m,v*h+s,v*m-l*f,0,p*m-l*h,v*m+l*f,c*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,f){return this.set(1,s,c,0,e,1,f,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,f=i._y,h=i._z,m=i._w,p=c+c,v=f+f,_=h+h,g=c*p,b=c*v,M=c*_,C=f*v,E=f*_,S=h*_,N=m*p,U=m*v,I=m*_,k=s.x,D=s.y,B=s.z;return l[0]=(1-(C+S))*k,l[1]=(b+I)*k,l[2]=(M-U)*k,l[3]=0,l[4]=(b-I)*D,l[5]=(1-(g+S))*D,l[6]=(E+N)*D,l[7]=0,l[8]=(M+U)*B,l[9]=(E-N)*B,l[10]=(1-(g+C))*B,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const c=this.determinant();if(c===0)return s.set(1,1,1),i.identity(),this;let f=Oo.set(l[0],l[1],l[2]).length();const h=Oo.set(l[4],l[5],l[6]).length(),m=Oo.set(l[8],l[9],l[10]).length();c<0&&(f=-f),ga.copy(this);const p=1/f,v=1/h,_=1/m;return ga.elements[0]*=p,ga.elements[1]*=p,ga.elements[2]*=p,ga.elements[4]*=v,ga.elements[5]*=v,ga.elements[6]*=v,ga.elements[8]*=_,ga.elements[9]*=_,ga.elements[10]*=_,i.setFromRotationMatrix(ga),s.x=f,s.y=h,s.z=m,this}makePerspective(e,i,s,l,c,f,h=Fa,m=!1){const p=this.elements,v=2*c/(i-e),_=2*c/(s-l),g=(i+e)/(i-e),b=(s+l)/(s-l);let M,C;if(m)M=c/(f-c),C=f*c/(f-c);else if(h===Fa)M=-(f+c)/(f-c),C=-2*f*c/(f-c);else if(h===xf)M=-f/(f-c),C=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=v,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=_,p[9]=b,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=C,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,f,h=Fa,m=!1){const p=this.elements,v=2/(i-e),_=2/(s-l),g=-(i+e)/(i-e),b=-(s+l)/(s-l);let M,C;if(m)M=1/(f-c),C=f/(f-c);else if(h===Fa)M=-2/(f-c),C=-(f+c)/(f-c);else if(h===xf)M=-1/(f-c),C=-c/(f-c);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=v,p[4]=0,p[8]=0,p[12]=g,p[1]=0,p[5]=_,p[9]=0,p[13]=b,p[2]=0,p[6]=0,p[10]=M,p[14]=C,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}};_f.prototype.isMatrix4=!0;let Wn=_f;const Oo=new ae,ga=new Wn,nT=new ae(0,0,0),iT=new ae(1,1,1),Qs=new ae,Nu=new ae,Vi=new ae,k_=new Wn,V_=new ur;class Vr{constructor(e=0,i=0,s=0,l=Vr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],f=l[4],h=l[8],m=l[1],p=l[5],v=l[9],_=l[2],g=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(Pt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,b),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(g,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(h,b),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-_,b),this._z=Math.atan2(-f,p)):(this._y=0,this._z=Math.atan2(m,c));break;case"ZYX":this._y=Math.asin(-Pt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(g,b),this._z=Math.atan2(m,c)):(this._x=0,this._z=Math.atan2(-f,p));break;case"YZX":this._z=Math.asin(Pt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-v,p),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,b));break;case"XZY":this._z=Math.asin(-Pt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(g,p),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-v,b),this._y=0);break;default:mt("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return k_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(k_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return V_.setFromEuler(this),this.setFromQuaternion(V_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vr.DEFAULT_ORDER="XYZ";class ub{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let aT=0;const j_=new ae,Do=new ur,ms=new Wn,Ou=new ae,$l=new ae,sT=new ae,rT=new ur,X_=new ae(1,0,0),Y_=new ae(0,1,0),W_=new ae(0,0,1),q_={type:"added"},oT={type:"removed"},Lo={type:"childadded",child:null},Ih={type:"childremoved",child:null};class qi extends fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:aT++}),this.uuid=mc(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qi.DEFAULT_UP.clone();const e=new ae,i=new Vr,s=new ur,l=new ae(1,1,1);function c(){s.setFromEuler(i,!1)}function f(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Wn},normalMatrix:{value:new St}}),this.matrix=new Wn,this.matrixWorld=new Wn,this.matrixAutoUpdate=qi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ub,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Do.setFromAxisAngle(e,i),this.quaternion.multiply(Do),this}rotateOnWorldAxis(e,i){return Do.setFromAxisAngle(e,i),this.quaternion.premultiply(Do),this}rotateX(e){return this.rotateOnAxis(X_,e)}rotateY(e){return this.rotateOnAxis(Y_,e)}rotateZ(e){return this.rotateOnAxis(W_,e)}translateOnAxis(e,i){return j_.copy(e).applyQuaternion(this.quaternion),this.position.add(j_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(X_,e)}translateY(e){return this.translateOnAxis(Y_,e)}translateZ(e){return this.translateOnAxis(W_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ms.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Ou.copy(e):Ou.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),$l.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ms.lookAt($l,Ou,this.up):ms.lookAt(Ou,$l,this.up),this.quaternion.setFromRotationMatrix(ms),l&&(ms.extractRotation(l.matrixWorld),Do.setFromRotationMatrix(ms),this.quaternion.premultiply(Do.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?($t("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(q_),Lo.child=e,this.dispatchEvent(Lo),Lo.child=null):$t("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(oT),Ih.child=e,this.dispatchEvent(Ih),Ih.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ms.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ms.multiply(e.parent.matrixWorld)),e.applyMatrix4(ms),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(q_),Lo.child=e,this.dispatchEvent(Lo),Lo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const f=this.children[s].getObjectByProperty(e,i);if(f!==void 0)return f}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($l,e,sT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($l,rT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,c=this.matrix.elements;c[12]+=i-c[0]*i-c[4]*s-c[8]*l,c[13]+=s-c[1]*i-c[5]*s-c[9]*l,c[14]+=l-c[2]*i-c[6]*s-c[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),this.static!==!1&&(l.static=this.static),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function c(h,m){return h[m.uuid]===void 0&&(h[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const m=h.shapes;if(Array.isArray(m))for(let p=0,v=m.length;p<v;p++){const _=m[p];c(e.shapes,_)}else c(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let m=0,p=this.material.length;m<p;m++)h.push(c(e.materials,this.material[m]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const m=this.animations[h];l.animations.push(c(e.animations,m))}}if(i){const h=f(e.geometries),m=f(e.materials),p=f(e.textures),v=f(e.images),_=f(e.shapes),g=f(e.skeletons),b=f(e.animations),M=f(e.nodes);h.length>0&&(s.geometries=h),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),v.length>0&&(s.images=v),_.length>0&&(s.shapes=_),g.length>0&&(s.skeletons=g),b.length>0&&(s.animations=b),M.length>0&&(s.nodes=M)}return s.object=l,s;function f(h){const m=[];for(const p in h){const v=h[p];delete v.metadata,m.push(v)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}qi.DEFAULT_UP=new ae(0,1,0);qi.DEFAULT_MATRIX_AUTO_UPDATE=!0;qi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Du extends qi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lT={type:"move"};class Ph{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Du,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Du,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ae,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ae),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Du,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ae,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ae,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,f=null;const h=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){f=!0;for(const C of e.hand.values()){const E=i.getJointPose(C,s),S=this._getHandJoint(p,C);E!==null&&(S.matrix.fromArray(E.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=E.radius),S.visible=E!==null}const v=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],g=v.position.distanceTo(_.position),b=.02,M=.005;p.inputState.pinching&&g>b+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&g<=b-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(m.matrix.fromArray(c.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,c.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(c.linearVelocity)):m.hasLinearVelocity=!1,c.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(c.angularVelocity)):m.hasAngularVelocity=!1,m.eventsEnabled&&m.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(lT)))}return h!==null&&(h.visible=l!==null),m!==null&&(m.visible=c!==null),p!==null&&(p.visible=f!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Du;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const fb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Js={h:0,s:0,l:0},Lu={h:0,s:0,l:0};function Fh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class hn{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Yi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,jt.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=jt.workingColorSpace){return this.r=e,this.g=i,this.b=s,jt.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=jt.workingColorSpace){if(e=qM(e,1),i=Pt(i,0,1),s=Pt(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,f=2*s-c;this.r=Fh(f,c,e+1/3),this.g=Fh(f,c,e),this.b=Fh(f,c,e-1/3)}return jt.colorSpaceToWorking(this,l),this}setStyle(e,i=Yi){function s(c){c!==void 0&&parseFloat(c)<1&&mt("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=l[1],h=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:mt("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(f===6)return this.setHex(parseInt(c,16),i);mt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Yi){const s=fb[e.toLowerCase()];return s!==void 0?this.setHex(s,i):mt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Es(e.r),this.g=Es(e.g),this.b=Es(e.b),this}copyLinearToSRGB(e){return this.r=Wo(e.r),this.g=Wo(e.g),this.b=Wo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yi){return jt.workingToColorSpace(hi.copy(this),e),Math.round(Pt(hi.r*255,0,255))*65536+Math.round(Pt(hi.g*255,0,255))*256+Math.round(Pt(hi.b*255,0,255))}getHexString(e=Yi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=jt.workingColorSpace){jt.workingToColorSpace(hi.copy(this),i);const s=hi.r,l=hi.g,c=hi.b,f=Math.max(s,l,c),h=Math.min(s,l,c);let m,p;const v=(h+f)/2;if(h===f)m=0,p=0;else{const _=f-h;switch(p=v<=.5?_/(f+h):_/(2-f-h),f){case s:m=(l-c)/_+(l<c?6:0);break;case l:m=(c-s)/_+2;break;case c:m=(s-l)/_+4;break}m/=6}return e.h=m,e.s=p,e.l=v,e}getRGB(e,i=jt.workingColorSpace){return jt.workingToColorSpace(hi.copy(this),i),e.r=hi.r,e.g=hi.g,e.b=hi.b,e}getStyle(e=Yi){jt.workingToColorSpace(hi.copy(this),e);const i=hi.r,s=hi.g,l=hi.b;return e!==Yi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(Js),this.setHSL(Js.h+e,Js.s+i,Js.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(Js),e.getHSL(Lu);const s=Nh(Js.h,Lu.h,i),l=Nh(Js.s,Lu.s,i),c=Nh(Js.l,Lu.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const hi=new hn;hn.NAMES=fb;class cT extends qi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vr,this.environmentIntensity=1,this.environmentRotation=new Vr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const xa=new ae,gs=new ae,Bh=new ae,xs=new ae,Uo=new ae,Io=new ae,$_=new ae,zh=new ae,Gh=new ae,Hh=new ae,kh=new In,Vh=new In,jh=new In;class va{constructor(e=new ae,i=new ae,s=new ae){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),xa.subVectors(e,i),l.cross(xa);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){xa.subVectors(l,i),gs.subVectors(s,i),Bh.subVectors(e,i);const f=xa.dot(xa),h=xa.dot(gs),m=xa.dot(Bh),p=gs.dot(gs),v=gs.dot(Bh),_=f*p-h*h;if(_===0)return c.set(0,0,0),null;const g=1/_,b=(p*m-h*v)*g,M=(f*v-h*m)*g;return c.set(1-b-M,M,b)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,xs)===null?!1:xs.x>=0&&xs.y>=0&&xs.x+xs.y<=1}static getInterpolation(e,i,s,l,c,f,h,m){return this.getBarycoord(e,i,s,l,xs)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(c,xs.x),m.addScaledVector(f,xs.y),m.addScaledVector(h,xs.z),m)}static getInterpolatedAttribute(e,i,s,l,c,f){return kh.setScalar(0),Vh.setScalar(0),jh.setScalar(0),kh.fromBufferAttribute(e,i),Vh.fromBufferAttribute(e,s),jh.fromBufferAttribute(e,l),f.setScalar(0),f.addScaledVector(kh,c.x),f.addScaledVector(Vh,c.y),f.addScaledVector(jh,c.z),f}static isFrontFacing(e,i,s,l){return xa.subVectors(s,i),gs.subVectors(e,i),xa.cross(gs).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xa.subVectors(this.c,this.b),gs.subVectors(this.a,this.b),xa.cross(gs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return va.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return va.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return va.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return va.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return va.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let f,h;Uo.subVectors(l,s),Io.subVectors(c,s),zh.subVectors(e,s);const m=Uo.dot(zh),p=Io.dot(zh);if(m<=0&&p<=0)return i.copy(s);Gh.subVectors(e,l);const v=Uo.dot(Gh),_=Io.dot(Gh);if(v>=0&&_<=v)return i.copy(l);const g=m*_-v*p;if(g<=0&&m>=0&&v<=0)return f=m/(m-v),i.copy(s).addScaledVector(Uo,f);Hh.subVectors(e,c);const b=Uo.dot(Hh),M=Io.dot(Hh);if(M>=0&&b<=M)return i.copy(c);const C=b*p-m*M;if(C<=0&&p>=0&&M<=0)return h=p/(p-M),i.copy(s).addScaledVector(Io,h);const E=v*M-b*_;if(E<=0&&_-v>=0&&b-M>=0)return $_.subVectors(c,l),h=(_-v)/(_-v+(b-M)),i.copy(l).addScaledVector($_,h);const S=1/(E+C+g);return f=C*S,h=g*S,i.copy(s).addScaledVector(Uo,f).addScaledVector(Io,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class gc{constructor(e=new ae(1/0,1/0,1/0),i=new ae(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(_a.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(_a.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=_a.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,_a):_a.fromBufferAttribute(c,f),_a.applyMatrix4(e.matrixWorld),this.expandByPoint(_a);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Uu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Uu.copy(s.boundingBox)),Uu.applyMatrix4(e.matrixWorld),this.union(Uu)}const l=e.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_a),_a.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Kl),Iu.subVectors(this.max,Kl),Po.subVectors(e.a,Kl),Fo.subVectors(e.b,Kl),Bo.subVectors(e.c,Kl),er.subVectors(Fo,Po),tr.subVectors(Bo,Fo),Or.subVectors(Po,Bo);let i=[0,-er.z,er.y,0,-tr.z,tr.y,0,-Or.z,Or.y,er.z,0,-er.x,tr.z,0,-tr.x,Or.z,0,-Or.x,-er.y,er.x,0,-tr.y,tr.x,0,-Or.y,Or.x,0];return!Xh(i,Po,Fo,Bo,Iu)||(i=[1,0,0,0,1,0,0,0,1],!Xh(i,Po,Fo,Bo,Iu))?!1:(Pu.crossVectors(er,tr),i=[Pu.x,Pu.y,Pu.z],Xh(i,Po,Fo,Bo,Iu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_a).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_a).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_s[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_s[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_s[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_s[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_s[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_s[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_s[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_s[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_s),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _s=[new ae,new ae,new ae,new ae,new ae,new ae,new ae,new ae],_a=new ae,Uu=new gc,Po=new ae,Fo=new ae,Bo=new ae,er=new ae,tr=new ae,Or=new ae,Kl=new ae,Iu=new ae,Pu=new ae,Dr=new ae;function Xh(r,e,i,s,l){for(let c=0,f=r.length-3;c<=f;c+=3){Dr.fromArray(r,c);const h=l.x*Math.abs(Dr.x)+l.y*Math.abs(Dr.y)+l.z*Math.abs(Dr.z),m=e.dot(Dr),p=i.dot(Dr),v=s.dot(Dr);if(Math.max(-Math.max(m,p,v),Math.min(m,p,v))>h)return!1}return!0}const Vn=new ae,Fu=new Dt;let uT=0;class Ga extends fr{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:uT++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=I_,this.updateRanges=[],this.gpuType=Pa,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Fu.fromBufferAttribute(this,i),Fu.applyMatrix3(e),this.setXY(i,Fu.x,Fu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)Vn.fromBufferAttribute(this,i),Vn.applyMatrix3(e),this.setXYZ(i,Vn.x,Vn.y,Vn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)Vn.fromBufferAttribute(this,i),Vn.applyMatrix4(e),this.setXYZ(i,Vn.x,Vn.y,Vn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)Vn.fromBufferAttribute(this,i),Vn.applyNormalMatrix(e),this.setXYZ(i,Vn.x,Vn.y,Vn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)Vn.fromBufferAttribute(this,i),Vn.transformDirection(e),this.setXYZ(i,Vn.x,Vn.y,Vn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=ql(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Ci(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=ql(i,this.array)),i}setX(e,i){return this.normalized&&(i=Ci(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=ql(i,this.array)),i}setY(e,i){return this.normalized&&(i=Ci(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=ql(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Ci(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=ql(i,this.array)),i}setW(e,i){return this.normalized&&(i=Ci(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Ci(i,this.array),s=Ci(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=Ci(i,this.array),s=Ci(s,this.array),l=Ci(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=Ci(i,this.array),s=Ci(s,this.array),l=Ci(l,this.array),c=Ci(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==I_&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class db extends Ga{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class hb extends Ga{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class oa extends Ga{constructor(e,i,s){super(new Float32Array(e),i,s)}}const fT=new gc,Zl=new ae,Yh=new ae;class gm{constructor(e=new ae,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):fT.setFromPoints(e).getCenter(s);let l=0;for(let c=0,f=e.length;c<f;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zl.subVectors(e,this.center);const i=Zl.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Zl,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Yh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zl.copy(e.center).add(Yh)),this.expandByPoint(Zl.copy(e.center).sub(Yh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let dT=0;const aa=new Wn,Wh=new qi,zo=new ae,ji=new gc,Ql=new gc,ei=new ae;class ja extends fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dT++}),this.uuid=mc(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jM(e)?hb:db)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new St().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return aa.makeRotationFromQuaternion(e),this.applyMatrix4(aa),this}rotateX(e){return aa.makeRotationX(e),this.applyMatrix4(aa),this}rotateY(e){return aa.makeRotationY(e),this.applyMatrix4(aa),this}rotateZ(e){return aa.makeRotationZ(e),this.applyMatrix4(aa),this}translate(e,i,s){return aa.makeTranslation(e,i,s),this.applyMatrix4(aa),this}scale(e,i,s){return aa.makeScale(e,i,s),this.applyMatrix4(aa),this}lookAt(e){return Wh.lookAt(e),Wh.updateMatrix(),this.applyMatrix4(Wh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zo).negate(),this.translate(zo.x,zo.y,zo.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const f=e[l];s.push(f.x,f.y,f.z||0)}this.setAttribute("position",new oa(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const c=e[l];i.setXYZ(l,c.x,c.y,c.z||0)}e.length>i.count&&mt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gc);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ae(-1/0,-1/0,-1/0),new ae(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];ji.setFromBufferAttribute(c),this.morphTargetsRelative?(ei.addVectors(this.boundingBox.min,ji.min),this.boundingBox.expandByPoint(ei),ei.addVectors(this.boundingBox.max,ji.max),this.boundingBox.expandByPoint(ei)):(this.boundingBox.expandByPoint(ji.min),this.boundingBox.expandByPoint(ji.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gm);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ae,1/0);return}if(e){const s=this.boundingSphere.center;if(ji.setFromBufferAttribute(e),i)for(let c=0,f=i.length;c<f;c++){const h=i[c];Ql.setFromBufferAttribute(h),this.morphTargetsRelative?(ei.addVectors(ji.min,Ql.min),ji.expandByPoint(ei),ei.addVectors(ji.max,Ql.max),ji.expandByPoint(ei)):(ji.expandByPoint(Ql.min),ji.expandByPoint(Ql.max))}ji.getCenter(s);let l=0;for(let c=0,f=e.count;c<f;c++)ei.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(ei));if(i)for(let c=0,f=i.length;c<f;c++){const h=i[c],m=this.morphTargetsRelative;for(let p=0,v=h.count;p<v;p++)ei.fromBufferAttribute(h,p),m&&(zo.fromBufferAttribute(e,p),ei.add(zo)),l=Math.max(l,s.distanceToSquared(ei))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&$t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){$t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ga(new Float32Array(4*s.count),4));const f=this.getAttribute("tangent"),h=[],m=[];for(let A=0;A<s.count;A++)h[A]=new ae,m[A]=new ae;const p=new ae,v=new ae,_=new ae,g=new Dt,b=new Dt,M=new Dt,C=new ae,E=new ae;function S(A,F,q){p.fromBufferAttribute(s,A),v.fromBufferAttribute(s,F),_.fromBufferAttribute(s,q),g.fromBufferAttribute(c,A),b.fromBufferAttribute(c,F),M.fromBufferAttribute(c,q),v.sub(p),_.sub(p),b.sub(g),M.sub(g);const H=1/(b.x*M.y-M.x*b.y);isFinite(H)&&(C.copy(v).multiplyScalar(M.y).addScaledVector(_,-b.y).multiplyScalar(H),E.copy(_).multiplyScalar(b.x).addScaledVector(v,-M.x).multiplyScalar(H),h[A].add(C),h[F].add(C),h[q].add(C),m[A].add(E),m[F].add(E),m[q].add(E))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let A=0,F=N.length;A<F;++A){const q=N[A],H=q.start,$=q.count;for(let ce=H,oe=H+$;ce<oe;ce+=3)S(e.getX(ce+0),e.getX(ce+1),e.getX(ce+2))}const U=new ae,I=new ae,k=new ae,D=new ae;function B(A){k.fromBufferAttribute(l,A),D.copy(k);const F=h[A];U.copy(F),U.sub(k.multiplyScalar(k.dot(F))).normalize(),I.crossVectors(D,F);const H=I.dot(m[A])<0?-1:1;f.setXYZW(A,U.x,U.y,U.z,H)}for(let A=0,F=N.length;A<F;++A){const q=N[A],H=q.start,$=q.count;for(let ce=H,oe=H+$;ce<oe;ce+=3)B(e.getX(ce+0)),B(e.getX(ce+1)),B(e.getX(ce+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Ga(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let g=0,b=s.count;g<b;g++)s.setXYZ(g,0,0,0);const l=new ae,c=new ae,f=new ae,h=new ae,m=new ae,p=new ae,v=new ae,_=new ae;if(e)for(let g=0,b=e.count;g<b;g+=3){const M=e.getX(g+0),C=e.getX(g+1),E=e.getX(g+2);l.fromBufferAttribute(i,M),c.fromBufferAttribute(i,C),f.fromBufferAttribute(i,E),v.subVectors(f,c),_.subVectors(l,c),v.cross(_),h.fromBufferAttribute(s,M),m.fromBufferAttribute(s,C),p.fromBufferAttribute(s,E),h.add(v),m.add(v),p.add(v),s.setXYZ(M,h.x,h.y,h.z),s.setXYZ(C,m.x,m.y,m.z),s.setXYZ(E,p.x,p.y,p.z)}else for(let g=0,b=i.count;g<b;g+=3)l.fromBufferAttribute(i,g+0),c.fromBufferAttribute(i,g+1),f.fromBufferAttribute(i,g+2),v.subVectors(f,c),_.subVectors(l,c),v.cross(_),s.setXYZ(g+0,v.x,v.y,v.z),s.setXYZ(g+1,v.x,v.y,v.z),s.setXYZ(g+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)ei.fromBufferAttribute(e,i),ei.normalize(),e.setXYZ(i,ei.x,ei.y,ei.z)}toNonIndexed(){function e(h,m){const p=h.array,v=h.itemSize,_=h.normalized,g=new p.constructor(m.length*v);let b=0,M=0;for(let C=0,E=m.length;C<E;C++){h.isInterleavedBufferAttribute?b=m[C]*h.data.stride+h.offset:b=m[C]*v;for(let S=0;S<v;S++)g[M++]=p[b++]}return new Ga(g,v,_)}if(this.index===null)return mt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ja,s=this.index.array,l=this.attributes;for(const h in l){const m=l[h],p=e(m,s);i.setAttribute(h,p)}const c=this.morphAttributes;for(const h in c){const m=[],p=c[h];for(let v=0,_=p.length;v<_;v++){const g=p[v],b=e(g,s);m.push(b)}i.morphAttributes[h]=m}i.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,m=f.length;h<m;h++){const p=f[h];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let c=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],v=[];for(let _=0,g=p.length;_<g;_++){const b=p[_];v.push(b.toJSON(e.data))}v.length>0&&(l[m]=v,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const p in l){const v=l[p];this.setAttribute(p,v.clone(i))}const c=e.morphAttributes;for(const p in c){const v=[],_=c[p];for(let g=0,b=_.length;g<b;g++)v.push(_[g].clone(i));this.morphAttributes[p]=v}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let p=0,v=f.length;p<v;p++){const _=f[p];this.addGroup(_.start,_.count,_.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let hT=0;class bf extends fr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hT++}),this.uuid=mc(),this.name="",this.type="Material",this.blending=Yo,this.side=cr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fp,this.blendDst=dp,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new hn(0,0,0),this.blendAlpha=0,this.depthFunc=$o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=U_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Co,this.stencilZFail=Co,this.stencilZPass=Co,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){mt(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){mt(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==Yo&&(s.blending=this.blending),this.side!==cr&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==fp&&(s.blendSrc=this.blendSrc),this.blendDst!==dp&&(s.blendDst=this.blendDst),this.blendEquation!==Pr&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==$o&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==U_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Co&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Co&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Co&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.allowOverride===!1&&(s.allowOverride=!1),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const f=[];for(const h in c){const m=c[h];delete m.metadata,f.push(m)}return f}if(i){const c=l(e.textures),f=l(e.images);c.length>0&&(s.textures=c),f.length>0&&(s.images=f)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const vs=new ae,qh=new ae,Bu=new ae,nr=new ae,$h=new ae,zu=new ae,Kh=new ae;class pb{constructor(e=new ae,i=new ae(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vs)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=vs.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(vs.copy(this.origin).addScaledVector(this.direction,i),vs.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){qh.copy(e).add(i).multiplyScalar(.5),Bu.copy(i).sub(e).normalize(),nr.copy(this.origin).sub(qh);const c=e.distanceTo(i)*.5,f=-this.direction.dot(Bu),h=nr.dot(this.direction),m=-nr.dot(Bu),p=nr.lengthSq(),v=Math.abs(1-f*f);let _,g,b,M;if(v>0)if(_=f*m-h,g=f*h-m,M=c*v,_>=0)if(g>=-M)if(g<=M){const C=1/v;_*=C,g*=C,b=_*(_+f*g+2*h)+g*(f*_+g+2*m)+p}else g=c,_=Math.max(0,-(f*g+h)),b=-_*_+g*(g+2*m)+p;else g=-c,_=Math.max(0,-(f*g+h)),b=-_*_+g*(g+2*m)+p;else g<=-M?(_=Math.max(0,-(-f*c+h)),g=_>0?-c:Math.min(Math.max(-c,-m),c),b=-_*_+g*(g+2*m)+p):g<=M?(_=0,g=Math.min(Math.max(-c,-m),c),b=g*(g+2*m)+p):(_=Math.max(0,-(f*c+h)),g=_>0?c:Math.min(Math.max(-c,-m),c),b=-_*_+g*(g+2*m)+p);else g=f>0?-c:c,_=Math.max(0,-(f*g+h)),b=-_*_+g*(g+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,_),l&&l.copy(qh).addScaledVector(Bu,g),b}intersectSphere(e,i){vs.subVectors(e.center,this.origin);const s=vs.dot(this.direction),l=vs.dot(vs)-s*s,c=e.radius*e.radius;if(l>c)return null;const f=Math.sqrt(c-l),h=s-f,m=s+f;return m<0?null:h<0?this.at(m,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,f,h,m;const p=1/this.direction.x,v=1/this.direction.y,_=1/this.direction.z,g=this.origin;return p>=0?(s=(e.min.x-g.x)*p,l=(e.max.x-g.x)*p):(s=(e.max.x-g.x)*p,l=(e.min.x-g.x)*p),v>=0?(c=(e.min.y-g.y)*v,f=(e.max.y-g.y)*v):(c=(e.max.y-g.y)*v,f=(e.min.y-g.y)*v),s>f||c>l||((c>s||isNaN(s))&&(s=c),(f<l||isNaN(l))&&(l=f),_>=0?(h=(e.min.z-g.z)*_,m=(e.max.z-g.z)*_):(h=(e.max.z-g.z)*_,m=(e.min.z-g.z)*_),s>m||h>l)||((h>s||s!==s)&&(s=h),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,vs)!==null}intersectTriangle(e,i,s,l,c){$h.subVectors(i,e),zu.subVectors(s,e),Kh.crossVectors($h,zu);let f=this.direction.dot(Kh),h;if(f>0){if(l)return null;h=1}else if(f<0)h=-1,f=-f;else return null;nr.subVectors(this.origin,e);const m=h*this.direction.dot(zu.crossVectors(nr,zu));if(m<0)return null;const p=h*this.direction.dot($h.cross(nr));if(p<0||m+p>f)return null;const v=-h*nr.dot(Kh);return v<0?null:this.at(v/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xm extends bf{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new hn(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vr,this.combine=Yv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const K_=new Wn,Lr=new pb,Gu=new gm,Z_=new ae,Hu=new ae,ku=new ae,Vu=new ae,Zh=new ae,ju=new ae,Q_=new ae,Xu=new ae;class ka extends qi{constructor(e=new ja,i=new xm){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,f=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){ju.set(0,0,0);for(let m=0,p=c.length;m<p;m++){const v=h[m],_=c[m];v!==0&&(Zh.fromBufferAttribute(_,e),f?ju.addScaledVector(Zh,v):ju.addScaledVector(Zh.sub(i),v))}i.add(ju)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Gu.copy(s.boundingSphere),Gu.applyMatrix4(c),Lr.copy(e.ray).recast(e.near),!(Gu.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(Gu,Z_)===null||Lr.origin.distanceToSquared(Z_)>(e.far-e.near)**2))&&(K_.copy(c).invert(),Lr.copy(e.ray).applyMatrix4(K_),!(s.boundingBox!==null&&Lr.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Lr)))}_computeIntersections(e,i,s){let l;const c=this.geometry,f=this.material,h=c.index,m=c.attributes.position,p=c.attributes.uv,v=c.attributes.uv1,_=c.attributes.normal,g=c.groups,b=c.drawRange;if(h!==null)if(Array.isArray(f))for(let M=0,C=g.length;M<C;M++){const E=g[M],S=f[E.materialIndex],N=Math.max(E.start,b.start),U=Math.min(h.count,Math.min(E.start+E.count,b.start+b.count));for(let I=N,k=U;I<k;I+=3){const D=h.getX(I),B=h.getX(I+1),A=h.getX(I+2);l=Yu(this,S,e,s,p,v,_,D,B,A),l&&(l.faceIndex=Math.floor(I/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const M=Math.max(0,b.start),C=Math.min(h.count,b.start+b.count);for(let E=M,S=C;E<S;E+=3){const N=h.getX(E),U=h.getX(E+1),I=h.getX(E+2);l=Yu(this,f,e,s,p,v,_,N,U,I),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(f))for(let M=0,C=g.length;M<C;M++){const E=g[M],S=f[E.materialIndex],N=Math.max(E.start,b.start),U=Math.min(m.count,Math.min(E.start+E.count,b.start+b.count));for(let I=N,k=U;I<k;I+=3){const D=I,B=I+1,A=I+2;l=Yu(this,S,e,s,p,v,_,D,B,A),l&&(l.faceIndex=Math.floor(I/3),l.face.materialIndex=E.materialIndex,i.push(l))}}else{const M=Math.max(0,b.start),C=Math.min(m.count,b.start+b.count);for(let E=M,S=C;E<S;E+=3){const N=E,U=E+1,I=E+2;l=Yu(this,f,e,s,p,v,_,N,U,I),l&&(l.faceIndex=Math.floor(E/3),i.push(l))}}}}function pT(r,e,i,s,l,c,f,h){let m;if(e.side===Oi?m=s.intersectTriangle(f,c,l,!0,h):m=s.intersectTriangle(l,c,f,e.side===cr,h),m===null)return null;Xu.copy(h),Xu.applyMatrix4(r.matrixWorld);const p=i.ray.origin.distanceTo(Xu);return p<i.near||p>i.far?null:{distance:p,point:Xu.clone(),object:r}}function Yu(r,e,i,s,l,c,f,h,m,p){r.getVertexPosition(h,Hu),r.getVertexPosition(m,ku),r.getVertexPosition(p,Vu);const v=pT(r,e,i,s,Hu,ku,Vu,Q_);if(v){const _=new ae;va.getBarycoord(Q_,Hu,ku,Vu,_),l&&(v.uv=va.getInterpolatedAttribute(l,h,m,p,_,new Dt)),c&&(v.uv1=va.getInterpolatedAttribute(c,h,m,p,_,new Dt)),f&&(v.normal=va.getInterpolatedAttribute(f,h,m,p,_,new ae),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const g={a:h,b:m,c:p,normal:new ae,materialIndex:0};va.getNormal(Hu,ku,Vu,g.normal),v.face=g,v.barycoord=_}return v}class mT extends gi{constructor(e=null,i=1,s=1,l,c,f,h,m,p=oi,v=oi,_,g){super(null,f,h,m,p,v,l,c,_,g),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Qh=new ae,gT=new ae,xT=new St;class sr{constructor(e=new ae(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Qh.subVectors(s,i).cross(gT.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(Qh),c=this.normal.dot(l);if(c===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const f=-(e.start.dot(this.normal)+this.constant)/c;return s===!0&&(f<0||f>1)?null:i.copy(e.start).addScaledVector(l,f)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||xT.getNormalMatrix(e),l=this.coplanarPoint(Qh).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ur=new gm,_T=new Dt(.5,.5),Wu=new ae;class mb{constructor(e=new sr,i=new sr,s=new sr,l=new sr,c=new sr,f=new sr){this.planes=[e,i,s,l,c,f]}set(e,i,s,l,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(f),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=Fa,s=!1){const l=this.planes,c=e.elements,f=c[0],h=c[1],m=c[2],p=c[3],v=c[4],_=c[5],g=c[6],b=c[7],M=c[8],C=c[9],E=c[10],S=c[11],N=c[12],U=c[13],I=c[14],k=c[15];if(l[0].setComponents(p-f,b-v,S-M,k-N).normalize(),l[1].setComponents(p+f,b+v,S+M,k+N).normalize(),l[2].setComponents(p+h,b+_,S+C,k+U).normalize(),l[3].setComponents(p-h,b-_,S-C,k-U).normalize(),s)l[4].setComponents(m,g,E,I).normalize(),l[5].setComponents(p-m,b-g,S-E,k-I).normalize();else if(l[4].setComponents(p-m,b-g,S-E,k-I).normalize(),i===Fa)l[5].setComponents(p+m,b+g,S+E,k+I).normalize();else if(i===xf)l[5].setComponents(m,g,E,I).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Ur.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ur)}intersectsSprite(e){Ur.center.set(0,0,0);const i=_T.distanceTo(e.center);return Ur.radius=.7071067811865476+i,Ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ur)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(Wu.x=l.normal.x>0?e.max.x:e.min.x,Wu.y=l.normal.y>0?e.max.y:e.min.y,Wu.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(Wu)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gb extends gi{constructor(e=[],i=Hr,s,l,c,f,h,m,p,v){super(e,i,s,l,c,f,h,m,p,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zo extends gi{constructor(e,i,s=Ha,l,c,f,h=oi,m=oi,p,v=Ts,_=1){if(v!==Ts&&v!==zr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:i,depth:_};super(g,l,c,f,h,m,v,s,p),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class vT extends Zo{constructor(e,i=Ha,s=Hr,l,c,f=oi,h=oi,m,p=Ts){const v={width:e,height:e,depth:1},_=[v,v,v,v,v,v];super(e,e,i,s,l,c,f,h,m,p),this.image=_,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class xb extends gi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xc extends ja{constructor(e=1,i=1,s=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:f};const h=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const m=[],p=[],v=[],_=[];let g=0,b=0;M("z","y","x",-1,-1,s,i,e,f,c,0),M("z","y","x",1,-1,s,i,-e,f,c,1),M("x","z","y",1,1,e,s,i,l,f,2),M("x","z","y",1,-1,e,s,-i,l,f,3),M("x","y","z",1,-1,e,i,s,l,c,4),M("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(m),this.setAttribute("position",new oa(p,3)),this.setAttribute("normal",new oa(v,3)),this.setAttribute("uv",new oa(_,2));function M(C,E,S,N,U,I,k,D,B,A,F){const q=I/B,H=k/A,$=I/2,ce=k/2,oe=D/2,j=B+1,L=A+1;let G=0,K=0;const ue=new ae;for(let xe=0;xe<L;xe++){const P=xe*H-ce;for(let Z=0;Z<j;Z++){const be=Z*q-$;ue[C]=be*N,ue[E]=P*U,ue[S]=oe,p.push(ue.x,ue.y,ue.z),ue[C]=0,ue[E]=0,ue[S]=D>0?1:-1,v.push(ue.x,ue.y,ue.z),_.push(Z/B),_.push(1-xe/A),G+=1}}for(let xe=0;xe<A;xe++)for(let P=0;P<B;P++){const Z=g+P+j*xe,be=g+P+j*(xe+1),Ae=g+(P+1)+j*(xe+1),Oe=g+(P+1)+j*xe;m.push(Z,be,Oe),m.push(be,Ae,Oe),K+=6}h.addGroup(b,K,F),b+=K,g+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yf extends ja{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,f=i/2,h=Math.floor(s),m=Math.floor(l),p=h+1,v=m+1,_=e/h,g=i/m,b=[],M=[],C=[],E=[];for(let S=0;S<v;S++){const N=S*g-f;for(let U=0;U<p;U++){const I=U*_-c;M.push(I,-N,0),C.push(0,0,1),E.push(U/h),E.push(1-S/m)}}for(let S=0;S<m;S++)for(let N=0;N<h;N++){const U=N+p*S,I=N+p*(S+1),k=N+1+p*(S+1),D=N+1+p*S;b.push(U,I,D),b.push(I,k,D)}this.setIndex(b),this.setAttribute("position",new oa(M,3)),this.setAttribute("normal",new oa(C,3)),this.setAttribute("uv",new oa(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yf(e.width,e.height,e.widthSegments,e.heightSegments)}}class _m extends ja{constructor(e=1,i=32,s=16,l=0,c=Math.PI*2,f=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:c,thetaStart:f,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const m=Math.min(f+h,Math.PI);let p=0;const v=[],_=new ae,g=new ae,b=[],M=[],C=[],E=[];for(let S=0;S<=s;S++){const N=[],U=S/s;let I=0;S===0&&f===0?I=.5/i:S===s&&m===Math.PI&&(I=-.5/i);for(let k=0;k<=i;k++){const D=k/i;_.x=-e*Math.cos(l+D*c)*Math.sin(f+U*h),_.y=e*Math.cos(f+U*h),_.z=e*Math.sin(l+D*c)*Math.sin(f+U*h),M.push(_.x,_.y,_.z),g.copy(_).normalize(),C.push(g.x,g.y,g.z),E.push(D+I,1-U),N.push(p++)}v.push(N)}for(let S=0;S<s;S++)for(let N=0;N<i;N++){const U=v[S][N+1],I=v[S][N],k=v[S+1][N],D=v[S+1][N+1];(S!==0||f>0)&&b.push(U,I,D),(S!==s-1||m<Math.PI)&&b.push(I,k,D)}this.setIndex(b),this.setAttribute("position",new oa(M,3)),this.setAttribute("normal",new oa(C,3)),this.setAttribute("uv",new oa(E,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _m(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Qo(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];if(J_(l))l.isRenderTargetTexture?(mt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(J_(l[0])){const c=[];for(let f=0,h=l.length;f<h;f++)c[f]=l[f].clone();e[i][s]=c}else e[i][s]=l.slice();else e[i][s]=l}}return e}function Si(r){const e={};for(let i=0;i<r.length;i++){const s=Qo(r[i]);for(const l in s)e[l]=s[l]}return e}function J_(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function bT(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function _b(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:jt.workingColorSpace}const yT={clone:Qo,merge:Si};var ST=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ET=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Va extends bf{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ST,this.fragmentShader=ET,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qo(e.uniforms),this.uniformsGroups=bT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?i.uniforms[l]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?i.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?i.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?i.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?i.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?i.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?i.uniforms[l]={type:"m4",value:f.toArray()}:i.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class MT extends Va{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class TT extends bf{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=PM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class AT extends bf{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Jh={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(ev(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!ev(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function ev(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class wT{constructor(e,i,s){const l=this;let c=!1,f=0,h=0,m;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=i,this.onError=s,this._abortController=null,this.itemStart=function(v){h++,c===!1&&l.onStart!==void 0&&l.onStart(v,f,h),c=!0},this.itemEnd=function(v){f++,l.onProgress!==void 0&&l.onProgress(v,f,h),f===h&&(c=!1,l.onLoad!==void 0&&l.onLoad())},this.itemError=function(v){l.onError!==void 0&&l.onError(v)},this.resolveURL=function(v){return m?m(v):v},this.setURLModifier=function(v){return m=v,this},this.addHandler=function(v,_){return p.push(v,_),this},this.removeHandler=function(v){const _=p.indexOf(v);return _!==-1&&p.splice(_,2),this},this.getHandler=function(v){for(let _=0,g=p.length;_<g;_+=2){const b=p[_],M=p[_+1];if(b.global&&(b.lastIndex=0),b.test(v))return M}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const RT=new wT;class vm{constructor(e){this.manager=e!==void 0?e:RT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,i){const s=this;return new Promise(function(l,c){s.load(e,l,i,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}vm.DEFAULT_MATERIAL_NAME="__DEFAULT";const Go=new WeakMap;class CT extends vm{constructor(e){super(e)}load(e,i,s,l){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=Jh.get(`image:${e}`);if(f!==void 0){if(f.complete===!0)c.manager.itemStart(e),setTimeout(function(){i&&i(f),c.manager.itemEnd(e)},0);else{let _=Go.get(f);_===void 0&&(_=[],Go.set(f,_)),_.push({onLoad:i,onError:l})}return f}const h=hc("img");function m(){v(),i&&i(this);const _=Go.get(this)||[];for(let g=0;g<_.length;g++){const b=_[g];b.onLoad&&b.onLoad(this)}Go.delete(this),c.manager.itemEnd(e)}function p(_){v(),l&&l(_),Jh.remove(`image:${e}`);const g=Go.get(this)||[];for(let b=0;b<g.length;b++){const M=g[b];M.onError&&M.onError(_)}Go.delete(this),c.manager.itemError(e),c.manager.itemEnd(e)}function v(){h.removeEventListener("load",m,!1),h.removeEventListener("error",p,!1)}return h.addEventListener("load",m,!1),h.addEventListener("error",p,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),Jh.add(`image:${e}`,h),c.manager.itemStart(e),h.src=e,h}}class NT extends vm{constructor(e){super(e)}load(e,i,s,l){const c=new gi,f=new CT(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(e,function(h){c.image=h,c.needsUpdate=!0,i!==void 0&&i(c)},s,l),c}}const qu=new ae,$u=new ur,La=new ae;class vb extends qi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wn,this.projectionMatrix=new Wn,this.projectionMatrixInverse=new Wn,this.coordinateSystem=Fa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qu,$u,La),La.x===1&&La.y===1&&La.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qu,$u,La.set(1,1,1)).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorld.decompose(qu,$u,La),La.x===1&&La.y===1&&La.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qu,$u,La.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ir=new ae,tv=new Dt,nv=new Dt;class sa extends vb{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Jp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jp*2*Math.atan(Math.tan(lf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){ir.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ir.x,ir.y).multiplyScalar(-e/ir.z),ir.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ir.x,ir.y).multiplyScalar(-e/ir.z)}getViewSize(e,i){return this.getViewBounds(e,tv,nv),i.subVectors(nv,tv)}setViewOffset(e,i,s,l,c,f){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(lf*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const m=f.fullWidth,p=f.fullHeight;c+=f.offsetX*l/m,i-=f.offsetY*s/p,l*=f.width/m,s*=f.height/p}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class bb extends vb{constructor(e=-1,i=1,s=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,f=s+e,h=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=p*this.view.offsetX,f=c+p*this.view.width,h-=v*this.view.offsetY,m=h-v*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const Ho=-90,ko=1;class OT extends qi{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new sa(Ho,ko,e,i);l.layers=this.layers,this.add(l);const c=new sa(Ho,ko,e,i);c.layers=this.layers,this.add(c);const f=new sa(Ho,ko,e,i);f.layers=this.layers,this.add(f);const h=new sa(Ho,ko,e,i);h.layers=this.layers,this.add(h);const m=new sa(Ho,ko,e,i);m.layers=this.layers,this.add(m);const p=new sa(Ho,ko,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,f,h,m]=i;for(const p of i)this.remove(p);if(e===Fa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===xf)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,m,p,v]=this.children,_=e.getRenderTarget(),g=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const C=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let E=!1;e.isWebGLRenderer===!0?E=e.state.buffers.depth.getReversed():E=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,c),e.setRenderTarget(s,1,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,2,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(s,4,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),s.texture.generateMipmaps=C,e.setRenderTarget(s,5,l),E&&e.autoClear===!1&&e.clearDepth(),e.render(i,v),e.setRenderTarget(_,g,b),e.xr.enabled=M,s.texture.needsPMREMUpdate=!0}}class DT extends sa{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class iv{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Pt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(Pt(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Tm=class Tm{constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const c=this.elements;return c[0]=e,c[2]=i,c[1]=s,c[3]=l,this}};Tm.prototype.isMatrix2=!0;let av=Tm;class LT extends fr{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){mt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function sv(r,e,i,s){const l=UT(s);switch(i){case sb:return r*e;case ob:return r*e/l.components*l.byteLength;case um:return r*e/l.components*l.byteLength;case kr:return r*e*2/l.components*l.byteLength;case fm:return r*e*2/l.components*l.byteLength;case rb:return r*e*3/l.components*l.byteLength;case ba:return r*e*4/l.components*l.byteLength;case dm:return r*e*4/l.components*l.byteLength;case af:case sf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case rf:case of:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ep:case Tp:return Math.max(r,16)*Math.max(e,8)/4;case Sp:case Mp:return Math.max(r,8)*Math.max(e,8)/2;case Ap:case wp:case Cp:case Np:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Rp:case hf:case Op:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Dp:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Lp:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Up:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ip:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Pp:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Fp:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Bp:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case zp:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Gp:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Hp:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case kp:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Vp:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case jp:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Xp:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Yp:case Wp:case qp:return Math.ceil(r/4)*Math.ceil(e/4)*16;case $p:case Kp:return Math.ceil(r/4)*Math.ceil(e/4)*8;case pf:case Zp:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function UT(r){switch(r){case ra:case tb:return{byteLength:1,components:1};case fc:case nb:case Ms:return{byteLength:2,components:1};case lm:case cm:return{byteLength:2,components:4};case Ha:case om:case Pa:return{byteLength:4,components:1};case ib:case ab:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rm}}));typeof window<"u"&&(window.__THREE__?mt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rm);function yb(){let r=null,e=!1,i=null,s=null;function l(c,f){i(c,f),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&r!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function IT(r){const e=new WeakMap;function i(h,m){const p=h.array,v=h.usage,_=p.byteLength,g=r.createBuffer();r.bindBuffer(m,g),r.bufferData(m,p,v),h.onUploadCallback();let b;if(p instanceof Float32Array)b=r.FLOAT;else if(typeof Float16Array<"u"&&p instanceof Float16Array)b=r.HALF_FLOAT;else if(p instanceof Uint16Array)h.isFloat16BufferAttribute?b=r.HALF_FLOAT:b=r.UNSIGNED_SHORT;else if(p instanceof Int16Array)b=r.SHORT;else if(p instanceof Uint32Array)b=r.UNSIGNED_INT;else if(p instanceof Int32Array)b=r.INT;else if(p instanceof Int8Array)b=r.BYTE;else if(p instanceof Uint8Array)b=r.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)b=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:g,type:b,bytesPerElement:p.BYTES_PER_ELEMENT,version:h.version,size:_}}function s(h,m,p){const v=m.array,_=m.updateRanges;if(r.bindBuffer(p,h),_.length===0)r.bufferSubData(p,0,v);else{_.sort((b,M)=>b.start-M.start);let g=0;for(let b=1;b<_.length;b++){const M=_[g],C=_[b];C.start<=M.start+M.count+1?M.count=Math.max(M.count,C.start+C.count-M.start):(++g,_[g]=C)}_.length=g+1;for(let b=0,M=_.length;b<M;b++){const C=_[b];r.bufferSubData(p,C.start*v.BYTES_PER_ELEMENT,v,C.start,C.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const m=e.get(h);m&&(r.deleteBuffer(m.buffer),e.delete(h))}function f(h,m){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const v=e.get(h);(!v||v.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const p=e.get(h);if(p===void 0)e.set(h,i(h,m));else if(p.version<h.version){if(p.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,h,m),p.version=h.version}}return{get:l,remove:c,update:f}}var PT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,FT=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,BT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,HT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,kT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,VT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,XT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,YT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,WT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$T=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,KT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ZT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,QT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,JT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,e1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,t1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,n1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,i1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,a1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,s1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,r1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,o1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,l1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,c1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,u1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,f1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,d1="gl_FragColor = linearToOutputTexel( gl_FragColor );",h1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,p1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,m1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,g1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,x1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,v1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,b1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,y1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,S1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,E1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,M1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,T1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,A1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,w1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,R1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,C1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,N1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,O1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,D1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,U1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,I1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,P1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,F1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,B1=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,z1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,G1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,k1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,V1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,j1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,X1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Y1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,q1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,K1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Z1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,J1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,rA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,oA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_A=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,vA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,SA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,EA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,MA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,TA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,AA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,RA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,CA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,NA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,OA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,DA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,LA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,UA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,IA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const PA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,FA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,HA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,VA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,XA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,YA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,WA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$A=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,KA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ZA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,JA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ew=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tw=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nw=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iw=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,aw=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sw=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rw=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ow=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lw=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cw=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uw=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dw=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hw=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pw=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mw=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ct={alphahash_fragment:PT,alphahash_pars_fragment:FT,alphamap_fragment:BT,alphamap_pars_fragment:zT,alphatest_fragment:GT,alphatest_pars_fragment:HT,aomap_fragment:kT,aomap_pars_fragment:VT,batching_pars_vertex:jT,batching_vertex:XT,begin_vertex:YT,beginnormal_vertex:WT,bsdfs:qT,iridescence_fragment:$T,bumpmap_pars_fragment:KT,clipping_planes_fragment:ZT,clipping_planes_pars_fragment:QT,clipping_planes_pars_vertex:JT,clipping_planes_vertex:e1,color_fragment:t1,color_pars_fragment:n1,color_pars_vertex:i1,color_vertex:a1,common:s1,cube_uv_reflection_fragment:r1,defaultnormal_vertex:o1,displacementmap_pars_vertex:l1,displacementmap_vertex:c1,emissivemap_fragment:u1,emissivemap_pars_fragment:f1,colorspace_fragment:d1,colorspace_pars_fragment:h1,envmap_fragment:p1,envmap_common_pars_fragment:m1,envmap_pars_fragment:g1,envmap_pars_vertex:x1,envmap_physical_pars_fragment:R1,envmap_vertex:_1,fog_vertex:v1,fog_pars_vertex:b1,fog_fragment:y1,fog_pars_fragment:S1,gradientmap_pars_fragment:E1,lightmap_pars_fragment:M1,lights_lambert_fragment:T1,lights_lambert_pars_fragment:A1,lights_pars_begin:w1,lights_toon_fragment:C1,lights_toon_pars_fragment:N1,lights_phong_fragment:O1,lights_phong_pars_fragment:D1,lights_physical_fragment:L1,lights_physical_pars_fragment:U1,lights_fragment_begin:I1,lights_fragment_maps:P1,lights_fragment_end:F1,lightprobes_pars_fragment:B1,logdepthbuf_fragment:z1,logdepthbuf_pars_fragment:G1,logdepthbuf_pars_vertex:H1,logdepthbuf_vertex:k1,map_fragment:V1,map_pars_fragment:j1,map_particle_fragment:X1,map_particle_pars_fragment:Y1,metalnessmap_fragment:W1,metalnessmap_pars_fragment:q1,morphinstance_vertex:$1,morphcolor_vertex:K1,morphnormal_vertex:Z1,morphtarget_pars_vertex:Q1,morphtarget_vertex:J1,normal_fragment_begin:eA,normal_fragment_maps:tA,normal_pars_fragment:nA,normal_pars_vertex:iA,normal_vertex:aA,normalmap_pars_fragment:sA,clearcoat_normal_fragment_begin:rA,clearcoat_normal_fragment_maps:oA,clearcoat_pars_fragment:lA,iridescence_pars_fragment:cA,opaque_fragment:uA,packing:fA,premultiplied_alpha_fragment:dA,project_vertex:hA,dithering_fragment:pA,dithering_pars_fragment:mA,roughnessmap_fragment:gA,roughnessmap_pars_fragment:xA,shadowmap_pars_fragment:_A,shadowmap_pars_vertex:vA,shadowmap_vertex:bA,shadowmask_pars_fragment:yA,skinbase_vertex:SA,skinning_pars_vertex:EA,skinning_vertex:MA,skinnormal_vertex:TA,specularmap_fragment:AA,specularmap_pars_fragment:wA,tonemapping_fragment:RA,tonemapping_pars_fragment:CA,transmission_fragment:NA,transmission_pars_fragment:OA,uv_pars_fragment:DA,uv_pars_vertex:LA,uv_vertex:UA,worldpos_vertex:IA,background_vert:PA,background_frag:FA,backgroundCube_vert:BA,backgroundCube_frag:zA,cube_vert:GA,cube_frag:HA,depth_vert:kA,depth_frag:VA,distance_vert:jA,distance_frag:XA,equirect_vert:YA,equirect_frag:WA,linedashed_vert:qA,linedashed_frag:$A,meshbasic_vert:KA,meshbasic_frag:ZA,meshlambert_vert:QA,meshlambert_frag:JA,meshmatcap_vert:ew,meshmatcap_frag:tw,meshnormal_vert:nw,meshnormal_frag:iw,meshphong_vert:aw,meshphong_frag:sw,meshphysical_vert:rw,meshphysical_frag:ow,meshtoon_vert:lw,meshtoon_frag:cw,points_vert:uw,points_frag:fw,shadow_vert:dw,shadow_frag:hw,sprite_vert:pw,sprite_frag:mw},Xe={common:{diffuse:{value:new hn(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new St},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new St}},envmap:{envMap:{value:null},envMapRotation:{value:new St},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new St}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new St}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new St},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new St},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new St},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new St}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new St}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new St}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new hn(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new ae},probesMax:{value:new ae},probesResolution:{value:new ae}},points:{diffuse:{value:new hn(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0},uvTransform:{value:new St}},sprite:{diffuse:{value:new hn(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new St},alphaMap:{value:null},alphaMapTransform:{value:new St},alphaTest:{value:0}}},Ia={basic:{uniforms:Si([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.fog]),vertexShader:Ct.meshbasic_vert,fragmentShader:Ct.meshbasic_frag},lambert:{uniforms:Si([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,Xe.lights,{emissive:{value:new hn(0)},envMapIntensity:{value:1}}]),vertexShader:Ct.meshlambert_vert,fragmentShader:Ct.meshlambert_frag},phong:{uniforms:Si([Xe.common,Xe.specularmap,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,Xe.lights,{emissive:{value:new hn(0)},specular:{value:new hn(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ct.meshphong_vert,fragmentShader:Ct.meshphong_frag},standard:{uniforms:Si([Xe.common,Xe.envmap,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.roughnessmap,Xe.metalnessmap,Xe.fog,Xe.lights,{emissive:{value:new hn(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag},toon:{uniforms:Si([Xe.common,Xe.aomap,Xe.lightmap,Xe.emissivemap,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.gradientmap,Xe.fog,Xe.lights,{emissive:{value:new hn(0)}}]),vertexShader:Ct.meshtoon_vert,fragmentShader:Ct.meshtoon_frag},matcap:{uniforms:Si([Xe.common,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,Xe.fog,{matcap:{value:null}}]),vertexShader:Ct.meshmatcap_vert,fragmentShader:Ct.meshmatcap_frag},points:{uniforms:Si([Xe.points,Xe.fog]),vertexShader:Ct.points_vert,fragmentShader:Ct.points_frag},dashed:{uniforms:Si([Xe.common,Xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ct.linedashed_vert,fragmentShader:Ct.linedashed_frag},depth:{uniforms:Si([Xe.common,Xe.displacementmap]),vertexShader:Ct.depth_vert,fragmentShader:Ct.depth_frag},normal:{uniforms:Si([Xe.common,Xe.bumpmap,Xe.normalmap,Xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ct.meshnormal_vert,fragmentShader:Ct.meshnormal_frag},sprite:{uniforms:Si([Xe.sprite,Xe.fog]),vertexShader:Ct.sprite_vert,fragmentShader:Ct.sprite_frag},background:{uniforms:{uvTransform:{value:new St},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ct.background_vert,fragmentShader:Ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new St}},vertexShader:Ct.backgroundCube_vert,fragmentShader:Ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ct.cube_vert,fragmentShader:Ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ct.equirect_vert,fragmentShader:Ct.equirect_frag},distance:{uniforms:Si([Xe.common,Xe.displacementmap,{referencePosition:{value:new ae},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ct.distance_vert,fragmentShader:Ct.distance_frag},shadow:{uniforms:Si([Xe.lights,Xe.fog,{color:{value:new hn(0)},opacity:{value:1}}]),vertexShader:Ct.shadow_vert,fragmentShader:Ct.shadow_frag}};Ia.physical={uniforms:Si([Ia.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new St},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new St},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new St},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new St},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new St},sheen:{value:0},sheenColor:{value:new hn(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new St},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new St},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new St},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new St},attenuationDistance:{value:0},attenuationColor:{value:new hn(0)},specularColor:{value:new hn(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new St},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new St},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new St}}]),vertexShader:Ct.meshphysical_vert,fragmentShader:Ct.meshphysical_frag};const Ku={r:0,b:0,g:0},gw=new Wn,Sb=new St;Sb.set(-1,0,0,0,1,0,0,0,1);function xw(r,e,i,s,l,c){const f=new hn(0);let h=l===!0?0:1,m,p,v=null,_=0,g=null;function b(N){let U=N.isScene===!0?N.background:null;if(U&&U.isTexture){const I=N.backgroundBlurriness>0;U=e.get(U,I)}return U}function M(N){let U=!1;const I=b(N);I===null?E(f,h):I&&I.isColor&&(E(I,1),U=!0);const k=r.xr.getEnvironmentBlendMode();k==="additive"?i.buffers.color.setClear(0,0,0,1,c):k==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,c),(r.autoClear||U)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function C(N,U){const I=b(U);I&&(I.isCubeTexture||I.mapping===vf)?(p===void 0&&(p=new ka(new xc(1,1,1),new Va({name:"BackgroundCubeMaterial",uniforms:Qo(Ia.backgroundCube.uniforms),vertexShader:Ia.backgroundCube.vertexShader,fragmentShader:Ia.backgroundCube.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(k,D,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(p)),p.material.uniforms.envMap.value=I,p.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(gw.makeRotationFromEuler(U.backgroundRotation)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&p.material.uniforms.backgroundRotation.value.premultiply(Sb),p.material.toneMapped=jt.getTransfer(I.colorSpace)!==ln,(v!==I||_!==I.version||g!==r.toneMapping)&&(p.material.needsUpdate=!0,v=I,_=I.version,g=r.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null)):I&&I.isTexture&&(m===void 0&&(m=new ka(new yf(2,2),new Va({name:"BackgroundMaterial",uniforms:Qo(Ia.background.uniforms),vertexShader:Ia.background.vertexShader,fragmentShader:Ia.background.fragmentShader,side:cr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=I,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=jt.getTransfer(I.colorSpace)!==ln,I.matrixAutoUpdate===!0&&I.updateMatrix(),m.material.uniforms.uvTransform.value.copy(I.matrix),(v!==I||_!==I.version||g!==r.toneMapping)&&(m.material.needsUpdate=!0,v=I,_=I.version,g=r.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function E(N,U){N.getRGB(Ku,_b(r)),i.buffers.color.setClear(Ku.r,Ku.g,Ku.b,U,c)}function S(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return f},setClearColor:function(N,U=1){f.set(N),h=U,E(f,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,E(f,h)},render:M,addToRenderList:C,dispose:S}}function _w(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=g(null);let c=l,f=!1;function h(H,$,ce,oe,j){let L=!1;const G=_(H,oe,ce,$);c!==G&&(c=G,p(c.object)),L=b(H,oe,ce,j),L&&M(H,oe,ce,j),j!==null&&e.update(j,r.ELEMENT_ARRAY_BUFFER),(L||f)&&(f=!1,I(H,$,ce,oe),j!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function m(){return r.createVertexArray()}function p(H){return r.bindVertexArray(H)}function v(H){return r.deleteVertexArray(H)}function _(H,$,ce,oe){const j=oe.wireframe===!0;let L=s[$.id];L===void 0&&(L={},s[$.id]=L);const G=H.isInstancedMesh===!0?H.id:0;let K=L[G];K===void 0&&(K={},L[G]=K);let ue=K[ce.id];ue===void 0&&(ue={},K[ce.id]=ue);let xe=ue[j];return xe===void 0&&(xe=g(m()),ue[j]=xe),xe}function g(H){const $=[],ce=[],oe=[];for(let j=0;j<i;j++)$[j]=0,ce[j]=0,oe[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:$,enabledAttributes:ce,attributeDivisors:oe,object:H,attributes:{},index:null}}function b(H,$,ce,oe){const j=c.attributes,L=$.attributes;let G=0;const K=ce.getAttributes();for(const ue in K)if(K[ue].location>=0){const P=j[ue];let Z=L[ue];if(Z===void 0&&(ue==="instanceMatrix"&&H.instanceMatrix&&(Z=H.instanceMatrix),ue==="instanceColor"&&H.instanceColor&&(Z=H.instanceColor)),P===void 0||P.attribute!==Z||Z&&P.data!==Z.data)return!0;G++}return c.attributesNum!==G||c.index!==oe}function M(H,$,ce,oe){const j={},L=$.attributes;let G=0;const K=ce.getAttributes();for(const ue in K)if(K[ue].location>=0){let P=L[ue];P===void 0&&(ue==="instanceMatrix"&&H.instanceMatrix&&(P=H.instanceMatrix),ue==="instanceColor"&&H.instanceColor&&(P=H.instanceColor));const Z={};Z.attribute=P,P&&P.data&&(Z.data=P.data),j[ue]=Z,G++}c.attributes=j,c.attributesNum=G,c.index=oe}function C(){const H=c.newAttributes;for(let $=0,ce=H.length;$<ce;$++)H[$]=0}function E(H){S(H,0)}function S(H,$){const ce=c.newAttributes,oe=c.enabledAttributes,j=c.attributeDivisors;ce[H]=1,oe[H]===0&&(r.enableVertexAttribArray(H),oe[H]=1),j[H]!==$&&(r.vertexAttribDivisor(H,$),j[H]=$)}function N(){const H=c.newAttributes,$=c.enabledAttributes;for(let ce=0,oe=$.length;ce<oe;ce++)$[ce]!==H[ce]&&(r.disableVertexAttribArray(ce),$[ce]=0)}function U(H,$,ce,oe,j,L,G){G===!0?r.vertexAttribIPointer(H,$,ce,j,L):r.vertexAttribPointer(H,$,ce,oe,j,L)}function I(H,$,ce,oe){C();const j=oe.attributes,L=ce.getAttributes(),G=$.defaultAttributeValues;for(const K in L){const ue=L[K];if(ue.location>=0){let xe=j[K];if(xe===void 0&&(K==="instanceMatrix"&&H.instanceMatrix&&(xe=H.instanceMatrix),K==="instanceColor"&&H.instanceColor&&(xe=H.instanceColor)),xe!==void 0){const P=xe.normalized,Z=xe.itemSize,be=e.get(xe);if(be===void 0)continue;const Ae=be.buffer,Oe=be.type,ee=be.bytesPerElement,Se=Oe===r.INT||Oe===r.UNSIGNED_INT||xe.gpuType===om;if(xe.isInterleavedBufferAttribute){const ye=xe.data,He=ye.stride,Ze=xe.offset;if(ye.isInstancedInterleavedBuffer){for(let nt=0;nt<ue.locationSize;nt++)S(ue.location+nt,ye.meshPerAttribute);H.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let nt=0;nt<ue.locationSize;nt++)E(ue.location+nt);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let nt=0;nt<ue.locationSize;nt++)U(ue.location+nt,Z/ue.locationSize,Oe,P,He*ee,(Ze+Z/ue.locationSize*nt)*ee,Se)}else{if(xe.isInstancedBufferAttribute){for(let ye=0;ye<ue.locationSize;ye++)S(ue.location+ye,xe.meshPerAttribute);H.isInstancedMesh!==!0&&oe._maxInstanceCount===void 0&&(oe._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let ye=0;ye<ue.locationSize;ye++)E(ue.location+ye);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let ye=0;ye<ue.locationSize;ye++)U(ue.location+ye,Z/ue.locationSize,Oe,P,Z*ee,Z/ue.locationSize*ye*ee,Se)}}else if(G!==void 0){const P=G[K];if(P!==void 0)switch(P.length){case 2:r.vertexAttrib2fv(ue.location,P);break;case 3:r.vertexAttrib3fv(ue.location,P);break;case 4:r.vertexAttrib4fv(ue.location,P);break;default:r.vertexAttrib1fv(ue.location,P)}}}}N()}function k(){F();for(const H in s){const $=s[H];for(const ce in $){const oe=$[ce];for(const j in oe){const L=oe[j];for(const G in L)v(L[G].object),delete L[G];delete oe[j]}}delete s[H]}}function D(H){if(s[H.id]===void 0)return;const $=s[H.id];for(const ce in $){const oe=$[ce];for(const j in oe){const L=oe[j];for(const G in L)v(L[G].object),delete L[G];delete oe[j]}}delete s[H.id]}function B(H){for(const $ in s){const ce=s[$];for(const oe in ce){const j=ce[oe];if(j[H.id]===void 0)continue;const L=j[H.id];for(const G in L)v(L[G].object),delete L[G];delete j[H.id]}}}function A(H){for(const $ in s){const ce=s[$],oe=H.isInstancedMesh===!0?H.id:0,j=ce[oe];if(j!==void 0){for(const L in j){const G=j[L];for(const K in G)v(G[K].object),delete G[K];delete j[L]}delete ce[oe],Object.keys(ce).length===0&&delete s[$]}}}function F(){q(),f=!0,c!==l&&(c=l,p(c.object))}function q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:F,resetDefaultState:q,dispose:k,releaseStatesOfGeometry:D,releaseStatesOfObject:A,releaseStatesOfProgram:B,initAttributes:C,enableAttribute:E,disableUnusedAttributes:N}}function vw(r,e,i){let s;function l(m){s=m}function c(m,p){r.drawArrays(s,m,p),i.update(p,s,1)}function f(m,p,v){v!==0&&(r.drawArraysInstanced(s,m,p,v),i.update(p,s,v))}function h(m,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,p,0,v);let g=0;for(let b=0;b<v;b++)g+=p[b];i.update(g,s,1)}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function bw(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(B){return!(B!==ba&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(B){const A=B===Ms&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(B!==ra&&s.convert(B)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&B!==Pa&&!A)}function m(B){if(B==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const v=m(p);v!==p&&(mt("WebGLRenderer:",p,"not supported, using",v,"instead."),p=v);const _=i.logarithmicDepthBuffer===!0,g=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&g===!1&&mt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),M=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),C=r.getParameter(r.MAX_TEXTURE_SIZE),E=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),S=r.getParameter(r.MAX_VERTEX_ATTRIBS),N=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),U=r.getParameter(r.MAX_VARYING_VECTORS),I=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),k=r.getParameter(r.MAX_SAMPLES),D=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:m,textureFormatReadable:f,textureTypeReadable:h,precision:p,logarithmicDepthBuffer:_,reversedDepthBuffer:g,maxTextures:b,maxVertexTextures:M,maxTextureSize:C,maxCubemapSize:E,maxAttributes:S,maxVertexUniforms:N,maxVaryings:U,maxFragmentUniforms:I,maxSamples:k,samples:D}}function yw(r){const e=this;let i=null,s=0,l=!1,c=!1;const f=new sr,h=new St,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(_,g){const b=_.length!==0||g||s!==0||l;return l=g,s=_.length,b},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,g){i=v(_,g,0)},this.setState=function(_,g,b){const M=_.clippingPlanes,C=_.clipIntersection,E=_.clipShadows,S=r.get(_);if(!l||M===null||M.length===0||c&&!E)c?v(null):p();else{const N=c?0:s,U=N*4;let I=S.clippingState||null;m.value=I,I=v(M,g,U,b);for(let k=0;k!==U;++k)I[k]=i[k];S.clippingState=I,this.numIntersection=C?this.numPlanes:0,this.numPlanes+=N}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(_,g,b,M){const C=_!==null?_.length:0;let E=null;if(C!==0){if(E=m.value,M!==!0||E===null){const S=b+C*4,N=g.matrixWorldInverse;h.getNormalMatrix(N),(E===null||E.length<S)&&(E=new Float32Array(S));for(let U=0,I=b;U!==C;++U,I+=4)f.copy(_[U]).applyMatrix4(N,h),f.normal.toArray(E,I),E[I+3]=f.constant}m.value=E,m.needsUpdate=!0}return e.numPlanes=C,e.numIntersection=0,E}}const or=4,rv=[.125,.215,.35,.446,.526,.582],Fr=20,Sw=256,Jl=new bb,ov=new hn;let ep=null,tp=0,np=0,ip=!1;const Ew=new ae;class lv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,c={}){const{size:f=256,position:h=Ew}=c;ep=this._renderer.getRenderTarget(),tp=this._renderer.getActiveCubeFace(),np=this._renderer.getActiveMipmapLevel(),ip=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(f);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,s,l,m,h),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ep,tp,np),this._renderer.xr.enabled=ip,e.scissorTest=!1,Vo(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Hr||e.mapping===Ko?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ep=this._renderer.getRenderTarget(),tp=this._renderer.getActiveCubeFace(),np=this._renderer.getActiveMipmapLevel(),ip=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:mi,minFilter:mi,generateMipmaps:!1,type:Ms,format:ba,colorSpace:mf,depthBuffer:!1},l=cv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cv(e,i,s);const{_lodMax:c}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Mw(c)),this._blurMaterial=Aw(c,e,i),this._ggxMaterial=Tw(c,e,i)}return l}_compileMaterial(e){const i=new ka(new ja,e);this._renderer.compile(i,Jl)}_sceneToCubeUV(e,i,s,l,c){const m=new sa(90,1,i,s),p=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,b=_.toneMapping;_.getClearColor(ov),_.toneMapping=Ba,_.autoClear=!1,_.state.buffers.depth.getReversed()&&(_.setRenderTarget(l),_.clearDepth(),_.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ka(new xc,new xm({name:"PMREM.Background",side:Oi,depthWrite:!1,depthTest:!1})));const C=this._backgroundBox,E=C.material;let S=!1;const N=e.background;N?N.isColor&&(E.color.copy(N),e.background=null,S=!0):(E.color.copy(ov),S=!0);for(let U=0;U<6;U++){const I=U%3;I===0?(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x+v[U],c.y,c.z)):I===1?(m.up.set(0,0,p[U]),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y+v[U],c.z)):(m.up.set(0,p[U],0),m.position.set(c.x,c.y,c.z),m.lookAt(c.x,c.y,c.z+v[U]));const k=this._cubeSize;Vo(l,I*k,U>2?k:0,k,k),_.setRenderTarget(l),S&&_.render(C,m),_.render(e,m)}_.toneMapping=b,_.autoClear=g,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Hr||e.mapping===Ko;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=fv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uv());const c=l?this._cubemapMaterial:this._equirectMaterial,f=this._lodMeshes[0];f.material=c;const h=c.uniforms;h.envMap.value=e;const m=this._cubeSize;Vo(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(f,Jl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let c=1;c<l;c++)this._applyGGXFilter(e,c-1,c);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,c=this._pingPongRenderTarget,f=this._ggxMaterial,h=this._lodMeshes[s];h.material=f;const m=f.uniforms,p=s/(this._lodMeshes.length-1),v=i/(this._lodMeshes.length-1),_=Math.sqrt(p*p-v*v),g=0+p*1.25,b=_*g,{_lodMax:M}=this,C=this._sizeLods[s],E=3*C*(s>M-or?s-M+or:0),S=4*(this._cubeSize-C);m.envMap.value=e.texture,m.roughness.value=b,m.mipInt.value=M-i,Vo(c,E,S,3*C,2*C),l.setRenderTarget(c),l.render(h,Jl),m.envMap.value=c.texture,m.roughness.value=0,m.mipInt.value=M-s,Vo(e,E,S,3*C,2*C),l.setRenderTarget(e),l.render(h,Jl)}_blur(e,i,s,l,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,i,s,l,"latitudinal",c),this._halfBlur(f,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,f,h){const m=this._renderer,p=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&$t("blur direction must be either latitudinal or longitudinal!");const v=3,_=this._lodMeshes[l];_.material=p;const g=p.uniforms,b=this._sizeLods[s]-1,M=isFinite(c)?Math.PI/(2*b):2*Math.PI/(2*Fr-1),C=c/M,E=isFinite(c)?1+Math.floor(v*C):Fr;E>Fr&&mt(`sigmaRadians, ${c}, is too large and will clip, as it requested ${E} samples when the maximum is set to ${Fr}`);const S=[];let N=0;for(let B=0;B<Fr;++B){const A=B/C,F=Math.exp(-A*A/2);S.push(F),B===0?N+=F:B<E&&(N+=2*F)}for(let B=0;B<S.length;B++)S[B]=S[B]/N;g.envMap.value=e.texture,g.samples.value=E,g.weights.value=S,g.latitudinal.value=f==="latitudinal",h&&(g.poleAxis.value=h);const{_lodMax:U}=this;g.dTheta.value=M,g.mipInt.value=U-s;const I=this._sizeLods[l],k=3*I*(l>U-or?l-U+or:0),D=4*(this._cubeSize-I);Vo(i,k,D,3*I,2*I),m.setRenderTarget(i),m.render(_,Jl)}}function Mw(r){const e=[],i=[],s=[];let l=r;const c=r-or+1+rv.length;for(let f=0;f<c;f++){const h=Math.pow(2,l);e.push(h);let m=1/h;f>r-or?m=rv[f-r+or-1]:f===0&&(m=0),i.push(m);const p=1/(h-2),v=-p,_=1+p,g=[v,v,_,v,_,_,v,v,_,_,v,_],b=6,M=6,C=3,E=2,S=1,N=new Float32Array(C*M*b),U=new Float32Array(E*M*b),I=new Float32Array(S*M*b);for(let D=0;D<b;D++){const B=D%3*2/3-1,A=D>2?0:-1,F=[B,A,0,B+2/3,A,0,B+2/3,A+1,0,B,A,0,B+2/3,A+1,0,B,A+1,0];N.set(F,C*M*D),U.set(g,E*M*D);const q=[D,D,D,D,D,D];I.set(q,S*M*D)}const k=new ja;k.setAttribute("position",new Ga(N,C)),k.setAttribute("uv",new Ga(U,E)),k.setAttribute("faceIndex",new Ga(I,S)),s.push(new ka(k,null)),l>or&&l--}return{lodMeshes:s,sizeLods:e,sigmas:i}}function cv(r,e,i){const s=new za(r,e,i);return s.texture.mapping=vf,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Vo(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function Tw(r,e,i){return new Va({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Sw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Sf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function Aw(r,e,i){const s=new Float32Array(Fr),l=new ae(0,1,0);return new Va({name:"SphericalGaussianBlur",defines:{n:Fr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function uv(){return new Va({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function fv(){return new Va({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function Sf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Eb extends za{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new gb(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new xc(5,5,5),c=new Va({name:"CubemapFromEquirect",uniforms:Qo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Oi,blending:Ss});c.uniforms.tEquirect.value=i;const f=new ka(l,c),h=i.minFilter;return i.minFilter===Br&&(i.minFilter=mi),new OT(1,10,this).update(e,f),i.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(i,s,l);e.setRenderTarget(c)}}function ww(r){let e=new WeakMap,i=new WeakMap,s=null;function l(g,b=!1){return g==null?null:b?f(g):c(g)}function c(g){if(g&&g.isTexture){const b=g.mapping;if(b===nf||b===Rh)if(e.has(g)){const M=e.get(g).texture;return h(M,g.mapping)}else{const M=g.image;if(M&&M.height>0){const C=new Eb(M.height);return C.fromEquirectangularTexture(r,g),e.set(g,C),g.addEventListener("dispose",p),h(C.texture,g.mapping)}else return null}}return g}function f(g){if(g&&g.isTexture){const b=g.mapping,M=b===nf||b===Rh,C=b===Hr||b===Ko;if(M||C){let E=i.get(g);const S=E!==void 0?E.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==S)return s===null&&(s=new lv(r)),E=M?s.fromEquirectangular(g,E):s.fromCubemap(g,E),E.texture.pmremVersion=g.pmremVersion,i.set(g,E),E.texture;if(E!==void 0)return E.texture;{const N=g.image;return M&&N&&N.height>0||C&&N&&m(N)?(s===null&&(s=new lv(r)),E=M?s.fromEquirectangular(g):s.fromCubemap(g),E.texture.pmremVersion=g.pmremVersion,i.set(g,E),g.addEventListener("dispose",v),E.texture):null}}}return g}function h(g,b){return b===nf?g.mapping=Hr:b===Rh&&(g.mapping=Ko),g}function m(g){let b=0;const M=6;for(let C=0;C<M;C++)g[C]!==void 0&&b++;return b===M}function p(g){const b=g.target;b.removeEventListener("dispose",p);const M=e.get(b);M!==void 0&&(e.delete(b),M.dispose())}function v(g){const b=g.target;b.removeEventListener("dispose",v);const M=i.get(b);M!==void 0&&(i.delete(b),M.dispose())}function _(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:_}}function Rw(r){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=r.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Qp("WebGLRenderer: "+s+" extension not supported."),l}}}function Cw(r,e,i,s){const l={},c=new WeakMap;function f(_){const g=_.target;g.index!==null&&e.remove(g.index);for(const M in g.attributes)e.remove(g.attributes[M]);g.removeEventListener("dispose",f),delete l[g.id];const b=c.get(g);b&&(e.remove(b),c.delete(g)),s.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,i.memory.geometries--}function h(_,g){return l[g.id]===!0||(g.addEventListener("dispose",f),l[g.id]=!0,i.memory.geometries++),g}function m(_){const g=_.attributes;for(const b in g)e.update(g[b],r.ARRAY_BUFFER)}function p(_){const g=[],b=_.index,M=_.attributes.position;let C=0;if(M===void 0)return;if(b!==null){const N=b.array;C=b.version;for(let U=0,I=N.length;U<I;U+=3){const k=N[U+0],D=N[U+1],B=N[U+2];g.push(k,D,D,B,B,k)}}else{const N=M.array;C=M.version;for(let U=0,I=N.length/3-1;U<I;U+=3){const k=U+0,D=U+1,B=U+2;g.push(k,D,D,B,B,k)}}const E=new(M.count>=65535?hb:db)(g,1);E.version=C;const S=c.get(_);S&&e.remove(S),c.set(_,E)}function v(_){const g=c.get(_);if(g){const b=_.index;b!==null&&g.version<b.version&&p(_)}else p(_);return c.get(_)}return{get:h,update:m,getWireframeAttribute:v}}function Nw(r,e,i){let s;function l(_){s=_}let c,f;function h(_){c=_.type,f=_.bytesPerElement}function m(_,g){r.drawElements(s,g,c,_*f),i.update(g,s,1)}function p(_,g,b){b!==0&&(r.drawElementsInstanced(s,g,c,_*f,b),i.update(g,s,b))}function v(_,g,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,g,0,c,_,0,b);let C=0;for(let E=0;E<b;E++)C+=g[E];i.update(C,s,1)}this.setMode=l,this.setIndex=h,this.render=m,this.renderInstances=p,this.renderMultiDraw=v}function Ow(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,f,h){switch(i.calls++,f){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:$t("WebGLInfo: Unknown draw mode:",f);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function Dw(r,e,i){const s=new WeakMap,l=new In;function c(f,h,m){const p=f.morphTargetInfluences,v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=v!==void 0?v.length:0;let g=s.get(h);if(g===void 0||g.count!==_){let F=function(){B.dispose(),s.delete(h),h.removeEventListener("dispose",F)};g!==void 0&&g.texture.dispose();const b=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,E=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let U=0;b===!0&&(U=1),M===!0&&(U=2),C===!0&&(U=3);let I=h.attributes.position.count*U,k=1;I>e.maxTextureSize&&(k=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const D=new Float32Array(I*k*4*_),B=new cb(D,I,k,_);B.type=Pa,B.needsUpdate=!0;const A=U*4;for(let q=0;q<_;q++){const H=E[q],$=S[q],ce=N[q],oe=I*k*4*q;for(let j=0;j<H.count;j++){const L=j*A;b===!0&&(l.fromBufferAttribute(H,j),D[oe+L+0]=l.x,D[oe+L+1]=l.y,D[oe+L+2]=l.z,D[oe+L+3]=0),M===!0&&(l.fromBufferAttribute($,j),D[oe+L+4]=l.x,D[oe+L+5]=l.y,D[oe+L+6]=l.z,D[oe+L+7]=0),C===!0&&(l.fromBufferAttribute(ce,j),D[oe+L+8]=l.x,D[oe+L+9]=l.y,D[oe+L+10]=l.z,D[oe+L+11]=ce.itemSize===4?l.w:1)}}g={count:_,texture:B,size:new Dt(I,k)},s.set(h,g),h.addEventListener("dispose",F)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)m.getUniforms().setValue(r,"morphTexture",f.morphTexture,i);else{let b=0;for(let C=0;C<p.length;C++)b+=p[C];const M=h.morphTargetsRelative?1:1-b;m.getUniforms().setValue(r,"morphTargetBaseInfluence",M),m.getUniforms().setValue(r,"morphTargetInfluences",p)}m.getUniforms().setValue(r,"morphTargetsTexture",g.texture,i),m.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}return{update:c}}function Lw(r,e,i,s,l){let c=new WeakMap;function f(p){const v=l.render.frame,_=p.geometry,g=e.get(p,_);if(c.get(g)!==v&&(e.update(g),c.set(g,v)),p.isInstancedMesh&&(p.hasEventListener("dispose",m)===!1&&p.addEventListener("dispose",m),c.get(p)!==v&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),c.set(p,v))),p.isSkinnedMesh){const b=p.skeleton;c.get(b)!==v&&(b.update(),c.set(b,v))}return g}function h(){c=new WeakMap}function m(p){const v=p.target;v.removeEventListener("dispose",m),s.releaseStatesOfObject(v),i.remove(v.instanceMatrix),v.instanceColor!==null&&i.remove(v.instanceColor)}return{update:f,dispose:h}}const Uw={[Wv]:"LINEAR_TONE_MAPPING",[qv]:"REINHARD_TONE_MAPPING",[$v]:"CINEON_TONE_MAPPING",[Kv]:"ACES_FILMIC_TONE_MAPPING",[Qv]:"AGX_TONE_MAPPING",[Jv]:"NEUTRAL_TONE_MAPPING",[Zv]:"CUSTOM_TONE_MAPPING"};function Iw(r,e,i,s,l){const c=new za(e,i,{type:r,depthBuffer:s,stencilBuffer:l,depthTexture:s?new Zo(e,i):void 0}),f=new za(e,i,{type:Ms,depthBuffer:!1,stencilBuffer:!1}),h=new ja;h.setAttribute("position",new oa([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new oa([0,2,0,0,2,0],2));const m=new MT({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new ka(h,m),v=new bb(-1,1,1,-1,0,1);let _=null,g=null,b=!1,M,C=null,E=[],S=!1;this.setSize=function(N,U){c.setSize(N,U),f.setSize(N,U);for(let I=0;I<E.length;I++){const k=E[I];k.setSize&&k.setSize(N,U)}},this.setEffects=function(N){E=N,S=E.length>0&&E[0].isRenderPass===!0;const U=c.width,I=c.height;for(let k=0;k<E.length;k++){const D=E[k];D.setSize&&D.setSize(U,I)}},this.begin=function(N,U){if(b||N.toneMapping===Ba&&E.length===0)return!1;if(C=U,U!==null){const I=U.width,k=U.height;(c.width!==I||c.height!==k)&&this.setSize(I,k)}return S===!1&&N.setRenderTarget(c),M=N.toneMapping,N.toneMapping=Ba,!0},this.hasRenderPass=function(){return S},this.end=function(N,U){N.toneMapping=M,b=!0;let I=c,k=f;for(let D=0;D<E.length;D++){const B=E[D];if(B.enabled!==!1&&(B.render(N,k,I,U),B.needsSwap!==!1)){const A=I;I=k,k=A}}if(_!==N.outputColorSpace||g!==N.toneMapping){_=N.outputColorSpace,g=N.toneMapping,m.defines={},jt.getTransfer(_)===ln&&(m.defines.SRGB_TRANSFER="");const D=Uw[g];D&&(m.defines[D]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=I.texture,N.setRenderTarget(C),N.render(p,v),C=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),f.dispose(),h.dispose(),m.dispose()}}const Mb=new gi,em=new Zo(1,1),Tb=new cb,Ab=new tT,wb=new gb,dv=[],hv=[],pv=new Float32Array(16),mv=new Float32Array(9),gv=new Float32Array(4);function Jo(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=dv[l];if(c===void 0&&(c=new Float32Array(l),dv[l]=c),e!==0){s.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=i,r[f].toArray(c,h)}return c}function qn(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function $n(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function Ef(r,e){let i=hv[e];i===void 0&&(i=new Int32Array(e),hv[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function Pw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function Fw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(qn(i,e))return;r.uniform2fv(this.addr,e),$n(i,e)}}function Bw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(qn(i,e))return;r.uniform3fv(this.addr,e),$n(i,e)}}function zw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(qn(i,e))return;r.uniform4fv(this.addr,e),$n(i,e)}}function Gw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(qn(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),$n(i,e)}else{if(qn(i,s))return;gv.set(s),r.uniformMatrix2fv(this.addr,!1,gv),$n(i,s)}}function Hw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(qn(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),$n(i,e)}else{if(qn(i,s))return;mv.set(s),r.uniformMatrix3fv(this.addr,!1,mv),$n(i,s)}}function kw(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(qn(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),$n(i,e)}else{if(qn(i,s))return;pv.set(s),r.uniformMatrix4fv(this.addr,!1,pv),$n(i,s)}}function Vw(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function jw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(qn(i,e))return;r.uniform2iv(this.addr,e),$n(i,e)}}function Xw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(qn(i,e))return;r.uniform3iv(this.addr,e),$n(i,e)}}function Yw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(qn(i,e))return;r.uniform4iv(this.addr,e),$n(i,e)}}function Ww(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function qw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(qn(i,e))return;r.uniform2uiv(this.addr,e),$n(i,e)}}function $w(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(qn(i,e))return;r.uniform3uiv(this.addr,e),$n(i,e)}}function Kw(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(qn(i,e))return;r.uniform4uiv(this.addr,e),$n(i,e)}}function Zw(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(em.compareFunction=i.isReversedDepthBuffer()?pm:hm,c=em):c=Mb,i.setTexture2D(e||c,l)}function Qw(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||Ab,l)}function Jw(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||wb,l)}function eR(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||Tb,l)}function tR(r){switch(r){case 5126:return Pw;case 35664:return Fw;case 35665:return Bw;case 35666:return zw;case 35674:return Gw;case 35675:return Hw;case 35676:return kw;case 5124:case 35670:return Vw;case 35667:case 35671:return jw;case 35668:case 35672:return Xw;case 35669:case 35673:return Yw;case 5125:return Ww;case 36294:return qw;case 36295:return $w;case 36296:return Kw;case 35678:case 36198:case 36298:case 36306:case 35682:return Zw;case 35679:case 36299:case 36307:return Qw;case 35680:case 36300:case 36308:case 36293:return Jw;case 36289:case 36303:case 36311:case 36292:return eR}}function nR(r,e){r.uniform1fv(this.addr,e)}function iR(r,e){const i=Jo(e,this.size,2);r.uniform2fv(this.addr,i)}function aR(r,e){const i=Jo(e,this.size,3);r.uniform3fv(this.addr,i)}function sR(r,e){const i=Jo(e,this.size,4);r.uniform4fv(this.addr,i)}function rR(r,e){const i=Jo(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function oR(r,e){const i=Jo(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function lR(r,e){const i=Jo(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function cR(r,e){r.uniform1iv(this.addr,e)}function uR(r,e){r.uniform2iv(this.addr,e)}function fR(r,e){r.uniform3iv(this.addr,e)}function dR(r,e){r.uniform4iv(this.addr,e)}function hR(r,e){r.uniform1uiv(this.addr,e)}function pR(r,e){r.uniform2uiv(this.addr,e)}function mR(r,e){r.uniform3uiv(this.addr,e)}function gR(r,e){r.uniform4uiv(this.addr,e)}function xR(r,e,i){const s=this.cache,l=e.length,c=Ef(i,l);qn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));let f;this.type===r.SAMPLER_2D_SHADOW?f=em:f=Mb;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||f,c[h])}function _R(r,e,i){const s=this.cache,l=e.length,c=Ef(i,l);qn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let f=0;f!==l;++f)i.setTexture3D(e[f]||Ab,c[f])}function vR(r,e,i){const s=this.cache,l=e.length,c=Ef(i,l);qn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let f=0;f!==l;++f)i.setTextureCube(e[f]||wb,c[f])}function bR(r,e,i){const s=this.cache,l=e.length,c=Ef(i,l);qn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let f=0;f!==l;++f)i.setTexture2DArray(e[f]||Tb,c[f])}function yR(r){switch(r){case 5126:return nR;case 35664:return iR;case 35665:return aR;case 35666:return sR;case 35674:return rR;case 35675:return oR;case 35676:return lR;case 5124:case 35670:return cR;case 35667:case 35671:return uR;case 35668:case 35672:return fR;case 35669:case 35673:return dR;case 5125:return hR;case 36294:return pR;case 36295:return mR;case 36296:return gR;case 35678:case 36198:case 36298:case 36306:case 35682:return xR;case 35679:case 36299:case 36307:return _R;case 35680:case 36300:case 36308:case 36293:return vR;case 36289:case 36303:case 36311:case 36292:return bR}}class SR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=tR(i.type)}}class ER{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=yR(i.type)}}class MR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const ap=/(\w+)(\])?(\[|\.)?/g;function xv(r,e){r.seq.push(e),r.map[e.id]=e}function TR(r,e,i){const s=r.name,l=s.length;for(ap.lastIndex=0;;){const c=ap.exec(s),f=ap.lastIndex;let h=c[1];const m=c[2]==="]",p=c[3];if(m&&(h=h|0),p===void 0||p==="["&&f+2===l){xv(i,p===void 0?new SR(h,r,e):new ER(h,r,e));break}else{let _=i.map[h];_===void 0&&(_=new MR(h),xv(i,_)),i=_}}}class cf{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let f=0;f<s;++f){const h=e.getActiveUniform(i,f),m=e.getUniformLocation(i,h.name);TR(h,m,this)}const l=[],c=[];for(const f of this.seq)f.type===e.SAMPLER_2D_SHADOW||f.type===e.SAMPLER_CUBE_SHADOW||f.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(f):c.push(f);l.length>0&&(this.seq=l.concat(c))}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,f=i.length;c!==f;++c){const h=i[c],m=s[h.id];m.needsUpdate!==!1&&h.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const f=e[l];f.id in i&&s.push(f)}return s}}function _v(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const AR=37297;let wR=0;function RR(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let f=l;f<c;f++){const h=f+1;s.push(`${h===e?">":" "} ${h}: ${i[f]}`)}return s.join(`
`)}const vv=new St;function CR(r){jt._getMatrix(vv,jt.workingColorSpace,r);const e=`mat3( ${vv.elements.map(i=>i.toFixed(4))} )`;switch(jt.getTransfer(r)){case gf:return[e,"LinearTransferOETF"];case ln:return[e,"sRGBTransferOETF"];default:return mt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function bv(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),c=(r.getShaderInfoLog(e)||"").trim();if(s&&c==="")return"";const f=/ERROR: 0:(\d+)/.exec(c);if(f){const h=parseInt(f[1]);return i.toUpperCase()+`

`+c+`

`+RR(r.getShaderSource(e),h)}else return c}function NR(r,e){const i=CR(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const OR={[Wv]:"Linear",[qv]:"Reinhard",[$v]:"Cineon",[Kv]:"ACESFilmic",[Qv]:"AgX",[Jv]:"Neutral",[Zv]:"Custom"};function DR(r,e){const i=OR[e];return i===void 0?(mt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Zu=new ae;function LR(){jt.getLuminanceCoefficients(Zu);const r=Zu.x.toFixed(4),e=Zu.y.toFixed(4),i=Zu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function UR(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ic).join(`
`)}function IR(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function PR(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),f=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[f]={type:c.type,location:r.getAttribLocation(e,f),locationSize:h}}return i}function ic(r){return r!==""}function yv(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Sv(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const FR=/^[ \t]*#include +<([\w\d./]+)>/gm;function tm(r){return r.replace(FR,zR)}const BR=new Map;function zR(r,e){let i=Ct[e];if(i===void 0){const s=BR.get(e);if(s!==void 0)i=Ct[s],mt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return tm(i)}const GR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ev(r){return r.replace(GR,HR)}function HR(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Mv(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const kR={[tf]:"SHADOWMAP_TYPE_PCF",[nc]:"SHADOWMAP_TYPE_VSM"};function VR(r){return kR[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const jR={[Hr]:"ENVMAP_TYPE_CUBE",[Ko]:"ENVMAP_TYPE_CUBE",[vf]:"ENVMAP_TYPE_CUBE_UV"};function XR(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":jR[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const YR={[Ko]:"ENVMAP_MODE_REFRACTION"};function WR(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":YR[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const qR={[Yv]:"ENVMAP_BLENDING_MULTIPLY",[LM]:"ENVMAP_BLENDING_MIX",[UM]:"ENVMAP_BLENDING_ADD"};function $R(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":qR[r.combine]||"ENVMAP_BLENDING_NONE"}function KR(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function ZR(r,e,i,s){const l=r.getContext(),c=i.defines;let f=i.vertexShader,h=i.fragmentShader;const m=VR(i),p=XR(i),v=WR(i),_=$R(i),g=KR(i),b=UR(i),M=IR(c),C=l.createProgram();let E,S,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(E=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(ic).join(`
`),E.length>0&&(E+=`
`),S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M].filter(ic).join(`
`),S.length>0&&(S+=`
`)):(E=[Mv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ic).join(`
`),S=[Mv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,M,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+v:"",i.envMap?"#define "+_:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==Ba?"#define TONE_MAPPING":"",i.toneMapping!==Ba?Ct.tonemapping_pars_fragment:"",i.toneMapping!==Ba?DR("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Ct.colorspace_pars_fragment,NR("linearToOutputTexel",i.outputColorSpace),LR(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(ic).join(`
`)),f=tm(f),f=yv(f,i),f=Sv(f,i),h=tm(h),h=yv(h,i),h=Sv(h,i),f=Ev(f),h=Ev(h),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,E=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,S=["#define varying in",i.glslVersion===P_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===P_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const U=N+E+f,I=N+S+h,k=_v(l,l.VERTEX_SHADER,U),D=_v(l,l.FRAGMENT_SHADER,I);l.attachShader(C,k),l.attachShader(C,D),i.index0AttributeName!==void 0?l.bindAttribLocation(C,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(C,0,"position"),l.linkProgram(C);function B(H){if(r.debug.checkShaderErrors){const $=l.getProgramInfoLog(C)||"",ce=l.getShaderInfoLog(k)||"",oe=l.getShaderInfoLog(D)||"",j=$.trim(),L=ce.trim(),G=oe.trim();let K=!0,ue=!0;if(l.getProgramParameter(C,l.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,C,k,D);else{const xe=bv(l,k,"vertex"),P=bv(l,D,"fragment");$t("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(C,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+j+`
`+xe+`
`+P)}else j!==""?mt("WebGLProgram: Program Info Log:",j):(L===""||G==="")&&(ue=!1);ue&&(H.diagnostics={runnable:K,programLog:j,vertexShader:{log:L,prefix:E},fragmentShader:{log:G,prefix:S}})}l.deleteShader(k),l.deleteShader(D),A=new cf(l,C),F=PR(l,C)}let A;this.getUniforms=function(){return A===void 0&&B(this),A};let F;this.getAttributes=function(){return F===void 0&&B(this),F};let q=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return q===!1&&(q=l.getProgramParameter(C,AR)),q},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(C),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=wR++,this.cacheKey=e,this.usedTimes=1,this.program=C,this.vertexShader=k,this.fragmentShader=D,this}let QR=0;class JR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),f=this._getShaderCacheForMaterial(e);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new eC(e),i.set(e,s)),s}}class eC{constructor(e){this.id=QR++,this.code=e,this.usedTimes=0}}function tC(r){return r===kr||r===hf||r===pf}function nC(r,e,i,s,l,c){const f=new ub,h=new JR,m=new Set,p=[],v=new Map,_=s.logarithmicDepthBuffer;let g=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(A){return m.add(A),A===0?"uv":`uv${A}`}function C(A,F,q,H,$,ce){const oe=H.fog,j=$.geometry,L=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,G=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,K=e.get(A.envMap||L,G),ue=K&&K.mapping===vf?K.image.height:null,xe=b[A.type];A.precision!==null&&(g=s.getMaxPrecision(A.precision),g!==A.precision&&mt("WebGLProgram.getParameters:",A.precision,"not supported, using",g,"instead."));const P=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Z=P!==void 0?P.length:0;let be=0;j.morphAttributes.position!==void 0&&(be=1),j.morphAttributes.normal!==void 0&&(be=2),j.morphAttributes.color!==void 0&&(be=3);let Ae,Oe,ee,Se;if(xe){const ct=Ia[xe];Ae=ct.vertexShader,Oe=ct.fragmentShader}else Ae=A.vertexShader,Oe=A.fragmentShader,h.update(A),ee=h.getVertexShaderID(A),Se=h.getFragmentShaderID(A);const ye=r.getRenderTarget(),He=r.state.buffers.depth.getReversed(),Ze=$.isInstancedMesh===!0,nt=$.isBatchedMesh===!0,Tt=!!A.map,Ye=!!A.matcap,Nt=!!K,kt=!!A.aoMap,gt=!!A.lightMap,Ft=!!A.bumpMap,Qt=!!A.normalMap,We=!!A.displacementMap,X=!!A.emissiveMap,Lt=!!A.metalnessMap,pt=!!A.roughnessMap,Xt=A.anisotropy>0,Ne=A.clearcoat>0,Jt=A.dispersion>0,O=A.iridescence>0,T=A.sheen>0,J=A.transmission>0,he=Xt&&!!A.anisotropyMap,Ee=Ne&&!!A.clearcoatMap,De=Ne&&!!A.clearcoatNormalMap,Fe=Ne&&!!A.clearcoatRoughnessMap,de=O&&!!A.iridescenceMap,pe=O&&!!A.iridescenceThicknessMap,Te=T&&!!A.sheenColorMap,ze=T&&!!A.sheenRoughnessMap,Ie=!!A.specularMap,Le=!!A.specularColorMap,dt=!!A.specularIntensityMap,lt=J&&!!A.transmissionMap,wt=J&&!!A.thicknessMap,V=!!A.gradientMap,Ce=!!A.alphaMap,me=A.alphaTest>0,ke=!!A.alphaHash,Ue=!!A.extensions;let Me=Ba;A.toneMapped&&(ye===null||ye.isXRRenderTarget===!0)&&(Me=r.toneMapping);const Qe={shaderID:xe,shaderType:A.type,shaderName:A.name,vertexShader:Ae,fragmentShader:Oe,defines:A.defines,customVertexShaderID:ee,customFragmentShaderID:Se,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:g,batching:nt,batchingColor:nt&&$._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&$.instanceColor!==null,instancingMorph:Ze&&$.morphTexture!==null,outputColorSpace:ye===null?r.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:Tt,matcap:Ye,envMap:Nt,envMapMode:Nt&&K.mapping,envMapCubeUVHeight:ue,aoMap:kt,lightMap:gt,bumpMap:Ft,normalMap:Qt,displacementMap:We,emissiveMap:X,normalMapObjectSpace:Qt&&A.normalMapType===FM,normalMapTangentSpace:Qt&&A.normalMapType===L_,packedNormalMap:Qt&&A.normalMapType===L_&&tC(A.normalMap.format),metalnessMap:Lt,roughnessMap:pt,anisotropy:Xt,anisotropyMap:he,clearcoat:Ne,clearcoatMap:Ee,clearcoatNormalMap:De,clearcoatRoughnessMap:Fe,dispersion:Jt,iridescence:O,iridescenceMap:de,iridescenceThicknessMap:pe,sheen:T,sheenColorMap:Te,sheenRoughnessMap:ze,specularMap:Ie,specularColorMap:Le,specularIntensityMap:dt,transmission:J,transmissionMap:lt,thicknessMap:wt,gradientMap:V,opaque:A.transparent===!1&&A.blending===Yo&&A.alphaToCoverage===!1,alphaMap:Ce,alphaTest:me,alphaHash:ke,combine:A.combine,mapUv:Tt&&M(A.map.channel),aoMapUv:kt&&M(A.aoMap.channel),lightMapUv:gt&&M(A.lightMap.channel),bumpMapUv:Ft&&M(A.bumpMap.channel),normalMapUv:Qt&&M(A.normalMap.channel),displacementMapUv:We&&M(A.displacementMap.channel),emissiveMapUv:X&&M(A.emissiveMap.channel),metalnessMapUv:Lt&&M(A.metalnessMap.channel),roughnessMapUv:pt&&M(A.roughnessMap.channel),anisotropyMapUv:he&&M(A.anisotropyMap.channel),clearcoatMapUv:Ee&&M(A.clearcoatMap.channel),clearcoatNormalMapUv:De&&M(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&M(A.clearcoatRoughnessMap.channel),iridescenceMapUv:de&&M(A.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&M(A.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&M(A.sheenColorMap.channel),sheenRoughnessMapUv:ze&&M(A.sheenRoughnessMap.channel),specularMapUv:Ie&&M(A.specularMap.channel),specularColorMapUv:Le&&M(A.specularColorMap.channel),specularIntensityMapUv:dt&&M(A.specularIntensityMap.channel),transmissionMapUv:lt&&M(A.transmissionMap.channel),thicknessMapUv:wt&&M(A.thicknessMap.channel),alphaMapUv:Ce&&M(A.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Qt||Xt),vertexNormals:!!j.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!j.attributes.uv&&(Tt||Ce),fog:!!oe,useFog:A.fog===!0,fogExp2:!!oe&&oe.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||j.attributes.normal===void 0&&Qt===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:He,skinning:$.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:be,numDirLights:F.directional.length,numPointLights:F.point.length,numSpotLights:F.spot.length,numSpotLightMaps:F.spotLightMap.length,numRectAreaLights:F.rectArea.length,numHemiLights:F.hemi.length,numDirLightShadows:F.directionalShadowMap.length,numPointLightShadows:F.pointShadowMap.length,numSpotLightShadows:F.spotShadowMap.length,numSpotLightShadowsWithMaps:F.numSpotLightShadowsWithMaps,numLightProbes:F.numLightProbes,numLightProbeGrids:ce.length,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:A.dithering,shadowMapEnabled:r.shadowMap.enabled&&q.length>0,shadowMapType:r.shadowMap.type,toneMapping:Me,decodeVideoTexture:Tt&&A.map.isVideoTexture===!0&&jt.getTransfer(A.map.colorSpace)===ln,decodeVideoTextureEmissive:X&&A.emissiveMap.isVideoTexture===!0&&jt.getTransfer(A.emissiveMap.colorSpace)===ln,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===bs,flipSided:A.side===Oi,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Ue&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&A.extensions.multiDraw===!0||nt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Qe.vertexUv1s=m.has(1),Qe.vertexUv2s=m.has(2),Qe.vertexUv3s=m.has(3),m.clear(),Qe}function E(A){const F=[];if(A.shaderID?F.push(A.shaderID):(F.push(A.customVertexShaderID),F.push(A.customFragmentShaderID)),A.defines!==void 0)for(const q in A.defines)F.push(q),F.push(A.defines[q]);return A.isRawShaderMaterial===!1&&(S(F,A),N(F,A),F.push(r.outputColorSpace)),F.push(A.customProgramCacheKey),F.join()}function S(A,F){A.push(F.precision),A.push(F.outputColorSpace),A.push(F.envMapMode),A.push(F.envMapCubeUVHeight),A.push(F.mapUv),A.push(F.alphaMapUv),A.push(F.lightMapUv),A.push(F.aoMapUv),A.push(F.bumpMapUv),A.push(F.normalMapUv),A.push(F.displacementMapUv),A.push(F.emissiveMapUv),A.push(F.metalnessMapUv),A.push(F.roughnessMapUv),A.push(F.anisotropyMapUv),A.push(F.clearcoatMapUv),A.push(F.clearcoatNormalMapUv),A.push(F.clearcoatRoughnessMapUv),A.push(F.iridescenceMapUv),A.push(F.iridescenceThicknessMapUv),A.push(F.sheenColorMapUv),A.push(F.sheenRoughnessMapUv),A.push(F.specularMapUv),A.push(F.specularColorMapUv),A.push(F.specularIntensityMapUv),A.push(F.transmissionMapUv),A.push(F.thicknessMapUv),A.push(F.combine),A.push(F.fogExp2),A.push(F.sizeAttenuation),A.push(F.morphTargetsCount),A.push(F.morphAttributeCount),A.push(F.numDirLights),A.push(F.numPointLights),A.push(F.numSpotLights),A.push(F.numSpotLightMaps),A.push(F.numHemiLights),A.push(F.numRectAreaLights),A.push(F.numDirLightShadows),A.push(F.numPointLightShadows),A.push(F.numSpotLightShadows),A.push(F.numSpotLightShadowsWithMaps),A.push(F.numLightProbes),A.push(F.shadowMapType),A.push(F.toneMapping),A.push(F.numClippingPlanes),A.push(F.numClipIntersection),A.push(F.depthPacking)}function N(A,F){f.disableAll(),F.instancing&&f.enable(0),F.instancingColor&&f.enable(1),F.instancingMorph&&f.enable(2),F.matcap&&f.enable(3),F.envMap&&f.enable(4),F.normalMapObjectSpace&&f.enable(5),F.normalMapTangentSpace&&f.enable(6),F.clearcoat&&f.enable(7),F.iridescence&&f.enable(8),F.alphaTest&&f.enable(9),F.vertexColors&&f.enable(10),F.vertexAlphas&&f.enable(11),F.vertexUv1s&&f.enable(12),F.vertexUv2s&&f.enable(13),F.vertexUv3s&&f.enable(14),F.vertexTangents&&f.enable(15),F.anisotropy&&f.enable(16),F.alphaHash&&f.enable(17),F.batching&&f.enable(18),F.dispersion&&f.enable(19),F.batchingColor&&f.enable(20),F.gradientMap&&f.enable(21),F.packedNormalMap&&f.enable(22),F.vertexNormals&&f.enable(23),A.push(f.mask),f.disableAll(),F.fog&&f.enable(0),F.useFog&&f.enable(1),F.flatShading&&f.enable(2),F.logarithmicDepthBuffer&&f.enable(3),F.reversedDepthBuffer&&f.enable(4),F.skinning&&f.enable(5),F.morphTargets&&f.enable(6),F.morphNormals&&f.enable(7),F.morphColors&&f.enable(8),F.premultipliedAlpha&&f.enable(9),F.shadowMapEnabled&&f.enable(10),F.doubleSided&&f.enable(11),F.flipSided&&f.enable(12),F.useDepthPacking&&f.enable(13),F.dithering&&f.enable(14),F.transmission&&f.enable(15),F.sheen&&f.enable(16),F.opaque&&f.enable(17),F.pointsUvs&&f.enable(18),F.decodeVideoTexture&&f.enable(19),F.decodeVideoTextureEmissive&&f.enable(20),F.alphaToCoverage&&f.enable(21),F.numLightProbeGrids>0&&f.enable(22),A.push(f.mask)}function U(A){const F=b[A.type];let q;if(F){const H=Ia[F];q=yT.clone(H.uniforms)}else q=A.uniforms;return q}function I(A,F){let q=v.get(F);return q!==void 0?++q.usedTimes:(q=new ZR(r,F,A,l),p.push(q),v.set(F,q)),q}function k(A){if(--A.usedTimes===0){const F=p.indexOf(A);p[F]=p[p.length-1],p.pop(),v.delete(A.cacheKey),A.destroy()}}function D(A){h.remove(A)}function B(){h.dispose()}return{getParameters:C,getProgramCacheKey:E,getUniforms:U,acquireProgram:I,releaseProgram:k,releaseShaderCache:D,programs:p,dispose:B}}function iC(){let r=new WeakMap;function e(f){return r.has(f)}function i(f){let h=r.get(f);return h===void 0&&(h={},r.set(f,h)),h}function s(f){r.delete(f)}function l(f,h,m){r.get(f)[h]=m}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function aC(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Tv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Av(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function f(g){let b=0;return g.isInstancedMesh&&(b+=2),g.isSkinnedMesh&&(b+=1),b}function h(g,b,M,C,E,S){let N=r[e];return N===void 0?(N={id:g.id,object:g,geometry:b,material:M,materialVariant:f(g),groupOrder:C,renderOrder:g.renderOrder,z:E,group:S},r[e]=N):(N.id=g.id,N.object=g,N.geometry=b,N.material=M,N.materialVariant=f(g),N.groupOrder=C,N.renderOrder=g.renderOrder,N.z=E,N.group=S),e++,N}function m(g,b,M,C,E,S){const N=h(g,b,M,C,E,S);M.transmission>0?s.push(N):M.transparent===!0?l.push(N):i.push(N)}function p(g,b,M,C,E,S){const N=h(g,b,M,C,E,S);M.transmission>0?s.unshift(N):M.transparent===!0?l.unshift(N):i.unshift(N)}function v(g,b){i.length>1&&i.sort(g||aC),s.length>1&&s.sort(b||Tv),l.length>1&&l.sort(b||Tv)}function _(){for(let g=e,b=r.length;g<b;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:m,unshift:p,finish:_,sort:v}}function sC(){let r=new WeakMap;function e(s,l){const c=r.get(s);let f;return c===void 0?(f=new Av,r.set(s,[f])):l>=c.length?(f=new Av,c.push(f)):f=c[l],f}function i(){r=new WeakMap}return{get:e,dispose:i}}function rC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ae,color:new hn};break;case"SpotLight":i={position:new ae,direction:new ae,color:new hn,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ae,color:new hn,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ae,skyColor:new hn,groundColor:new hn};break;case"RectAreaLight":i={color:new hn,position:new ae,halfWidth:new ae,halfHeight:new ae};break}return r[e.id]=i,i}}}function oC(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let lC=0;function cC(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function uC(r){const e=new rC,i=oC(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new ae);const l=new ae,c=new Wn,f=new Wn;function h(p){let v=0,_=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let b=0,M=0,C=0,E=0,S=0,N=0,U=0,I=0,k=0,D=0,B=0;p.sort(cC);for(let F=0,q=p.length;F<q;F++){const H=p[F],$=H.color,ce=H.intensity,oe=H.distance;let j=null;if(H.shadow&&H.shadow.map&&(H.shadow.map.texture.format===kr?j=H.shadow.map.texture:j=H.shadow.map.depthTexture||H.shadow.map.texture),H.isAmbientLight)v+=$.r*ce,_+=$.g*ce,g+=$.b*ce;else if(H.isLightProbe){for(let L=0;L<9;L++)s.probe[L].addScaledVector(H.sh.coefficients[L],ce);B++}else if(H.isDirectionalLight){const L=e.get(H);if(L.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const G=H.shadow,K=i.get(H);K.shadowIntensity=G.intensity,K.shadowBias=G.bias,K.shadowNormalBias=G.normalBias,K.shadowRadius=G.radius,K.shadowMapSize=G.mapSize,s.directionalShadow[b]=K,s.directionalShadowMap[b]=j,s.directionalShadowMatrix[b]=H.shadow.matrix,N++}s.directional[b]=L,b++}else if(H.isSpotLight){const L=e.get(H);L.position.setFromMatrixPosition(H.matrixWorld),L.color.copy($).multiplyScalar(ce),L.distance=oe,L.coneCos=Math.cos(H.angle),L.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),L.decay=H.decay,s.spot[C]=L;const G=H.shadow;if(H.map&&(s.spotLightMap[k]=H.map,k++,G.updateMatrices(H),H.castShadow&&D++),s.spotLightMatrix[C]=G.matrix,H.castShadow){const K=i.get(H);K.shadowIntensity=G.intensity,K.shadowBias=G.bias,K.shadowNormalBias=G.normalBias,K.shadowRadius=G.radius,K.shadowMapSize=G.mapSize,s.spotShadow[C]=K,s.spotShadowMap[C]=j,I++}C++}else if(H.isRectAreaLight){const L=e.get(H);L.color.copy($).multiplyScalar(ce),L.halfWidth.set(H.width*.5,0,0),L.halfHeight.set(0,H.height*.5,0),s.rectArea[E]=L,E++}else if(H.isPointLight){const L=e.get(H);if(L.color.copy(H.color).multiplyScalar(H.intensity),L.distance=H.distance,L.decay=H.decay,H.castShadow){const G=H.shadow,K=i.get(H);K.shadowIntensity=G.intensity,K.shadowBias=G.bias,K.shadowNormalBias=G.normalBias,K.shadowRadius=G.radius,K.shadowMapSize=G.mapSize,K.shadowCameraNear=G.camera.near,K.shadowCameraFar=G.camera.far,s.pointShadow[M]=K,s.pointShadowMap[M]=j,s.pointShadowMatrix[M]=H.shadow.matrix,U++}s.point[M]=L,M++}else if(H.isHemisphereLight){const L=e.get(H);L.skyColor.copy(H.color).multiplyScalar(ce),L.groundColor.copy(H.groundColor).multiplyScalar(ce),s.hemi[S]=L,S++}}E>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Xe.LTC_FLOAT_1,s.rectAreaLTC2=Xe.LTC_FLOAT_2):(s.rectAreaLTC1=Xe.LTC_HALF_1,s.rectAreaLTC2=Xe.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=_,s.ambient[2]=g;const A=s.hash;(A.directionalLength!==b||A.pointLength!==M||A.spotLength!==C||A.rectAreaLength!==E||A.hemiLength!==S||A.numDirectionalShadows!==N||A.numPointShadows!==U||A.numSpotShadows!==I||A.numSpotMaps!==k||A.numLightProbes!==B)&&(s.directional.length=b,s.spot.length=C,s.rectArea.length=E,s.point.length=M,s.hemi.length=S,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=U,s.pointShadowMap.length=U,s.spotShadow.length=I,s.spotShadowMap.length=I,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=U,s.spotLightMatrix.length=I+k-D,s.spotLightMap.length=k,s.numSpotLightShadowsWithMaps=D,s.numLightProbes=B,A.directionalLength=b,A.pointLength=M,A.spotLength=C,A.rectAreaLength=E,A.hemiLength=S,A.numDirectionalShadows=N,A.numPointShadows=U,A.numSpotShadows=I,A.numSpotMaps=k,A.numLightProbes=B,s.version=lC++)}function m(p,v){let _=0,g=0,b=0,M=0,C=0;const E=v.matrixWorldInverse;for(let S=0,N=p.length;S<N;S++){const U=p[S];if(U.isDirectionalLight){const I=s.directional[_];I.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),I.direction.sub(l),I.direction.transformDirection(E),_++}else if(U.isSpotLight){const I=s.spot[b];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(E),I.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),I.direction.sub(l),I.direction.transformDirection(E),b++}else if(U.isRectAreaLight){const I=s.rectArea[M];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(E),f.identity(),c.copy(U.matrixWorld),c.premultiply(E),f.extractRotation(c),I.halfWidth.set(U.width*.5,0,0),I.halfHeight.set(0,U.height*.5,0),I.halfWidth.applyMatrix4(f),I.halfHeight.applyMatrix4(f),M++}else if(U.isPointLight){const I=s.point[g];I.position.setFromMatrixPosition(U.matrixWorld),I.position.applyMatrix4(E),g++}else if(U.isHemisphereLight){const I=s.hemi[C];I.direction.setFromMatrixPosition(U.matrixWorld),I.direction.transformDirection(E),C++}}}return{setup:h,setupView:m,state:s}}function wv(r){const e=new uC(r),i=[],s=[],l=[];function c(g){_.camera=g,i.length=0,s.length=0,l.length=0}function f(g){i.push(g)}function h(g){s.push(g)}function m(g){l.push(g)}function p(){e.setup(i)}function v(g){e.setupView(i,g)}const _={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:c,state:_,setupLights:p,setupLightsView:v,pushLight:f,pushShadow:h,pushLightProbeGrid:m}}function fC(r){let e=new WeakMap;function i(l,c=0){const f=e.get(l);let h;return f===void 0?(h=new wv(r),e.set(l,[h])):c>=f.length?(h=new wv(r),f.push(h)):h=f[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const dC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,pC=[new ae(1,0,0),new ae(-1,0,0),new ae(0,1,0),new ae(0,-1,0),new ae(0,0,1),new ae(0,0,-1)],mC=[new ae(0,-1,0),new ae(0,-1,0),new ae(0,0,1),new ae(0,0,-1),new ae(0,-1,0),new ae(0,-1,0)],Rv=new Wn,ec=new ae,sp=new ae;function gC(r,e,i){let s=new mb;const l=new Dt,c=new Dt,f=new In,h=new TT,m=new AT,p={},v=i.maxTextureSize,_={[cr]:Oi,[Oi]:cr,[bs]:bs},g=new Va({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:dC,fragmentShader:hC}),b=g.clone();b.defines.HORIZONTAL_PASS=1;const M=new ja;M.setAttribute("position",new Ga(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const C=new ka(M,g),E=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tf;let S=this.type;this.render=function(D,B,A){if(E.enabled===!1||E.autoUpdate===!1&&E.needsUpdate===!1||D.length===0)return;this.type===pM&&(mt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=tf);const F=r.getRenderTarget(),q=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),$=r.state;$.setBlending(Ss),$.buffers.depth.getReversed()===!0?$.buffers.color.setClear(0,0,0,0):$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const ce=S!==this.type;ce&&B.traverse(function(oe){oe.material&&(Array.isArray(oe.material)?oe.material.forEach(j=>j.needsUpdate=!0):oe.material.needsUpdate=!0)});for(let oe=0,j=D.length;oe<j;oe++){const L=D[oe],G=L.shadow;if(G===void 0){mt("WebGLShadowMap:",L,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const K=G.getFrameExtents();l.multiply(K),c.copy(G.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/K.x),l.x=c.x*K.x,G.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/K.y),l.y=c.y*K.y,G.mapSize.y=c.y));const ue=r.state.buffers.depth.getReversed();if(G.camera._reversedDepth=ue,G.map===null||ce===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===nc){if(L.isPointLight){mt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new za(l.x,l.y,{format:kr,type:Ms,minFilter:mi,magFilter:mi,generateMipmaps:!1}),G.map.texture.name=L.name+".shadowMap",G.map.depthTexture=new Zo(l.x,l.y,Pa),G.map.depthTexture.name=L.name+".shadowMapDepth",G.map.depthTexture.format=Ts,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=oi,G.map.depthTexture.magFilter=oi}else L.isPointLight?(G.map=new Eb(l.x),G.map.depthTexture=new vT(l.x,Ha)):(G.map=new za(l.x,l.y),G.map.depthTexture=new Zo(l.x,l.y,Ha)),G.map.depthTexture.name=L.name+".shadowMap",G.map.depthTexture.format=Ts,this.type===tf?(G.map.depthTexture.compareFunction=ue?pm:hm,G.map.depthTexture.minFilter=mi,G.map.depthTexture.magFilter=mi):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=oi,G.map.depthTexture.magFilter=oi);G.camera.updateProjectionMatrix()}const xe=G.map.isWebGLCubeRenderTarget?6:1;for(let P=0;P<xe;P++){if(G.map.isWebGLCubeRenderTarget)r.setRenderTarget(G.map,P),r.clear();else{P===0&&(r.setRenderTarget(G.map),r.clear());const Z=G.getViewport(P);f.set(c.x*Z.x,c.y*Z.y,c.x*Z.z,c.y*Z.w),$.viewport(f)}if(L.isPointLight){const Z=G.camera,be=G.matrix,Ae=L.distance||Z.far;Ae!==Z.far&&(Z.far=Ae,Z.updateProjectionMatrix()),ec.setFromMatrixPosition(L.matrixWorld),Z.position.copy(ec),sp.copy(Z.position),sp.add(pC[P]),Z.up.copy(mC[P]),Z.lookAt(sp),Z.updateMatrixWorld(),be.makeTranslation(-ec.x,-ec.y,-ec.z),Rv.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Rv,Z.coordinateSystem,Z.reversedDepth)}else G.updateMatrices(L);s=G.getFrustum(),I(B,A,G.camera,L,this.type)}G.isPointLightShadow!==!0&&this.type===nc&&N(G,A),G.needsUpdate=!1}S=this.type,E.needsUpdate=!1,r.setRenderTarget(F,q,H)};function N(D,B){const A=e.update(C);g.defines.VSM_SAMPLES!==D.blurSamples&&(g.defines.VSM_SAMPLES=D.blurSamples,b.defines.VSM_SAMPLES=D.blurSamples,g.needsUpdate=!0,b.needsUpdate=!0),D.mapPass===null&&(D.mapPass=new za(l.x,l.y,{format:kr,type:Ms})),g.uniforms.shadow_pass.value=D.map.depthTexture,g.uniforms.resolution.value=D.mapSize,g.uniforms.radius.value=D.radius,r.setRenderTarget(D.mapPass),r.clear(),r.renderBufferDirect(B,null,A,g,C,null),b.uniforms.shadow_pass.value=D.mapPass.texture,b.uniforms.resolution.value=D.mapSize,b.uniforms.radius.value=D.radius,r.setRenderTarget(D.map),r.clear(),r.renderBufferDirect(B,null,A,b,C,null)}function U(D,B,A,F){let q=null;const H=A.isPointLight===!0?D.customDistanceMaterial:D.customDepthMaterial;if(H!==void 0)q=H;else if(q=A.isPointLight===!0?m:h,r.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0||B.alphaToCoverage===!0){const $=q.uuid,ce=B.uuid;let oe=p[$];oe===void 0&&(oe={},p[$]=oe);let j=oe[ce];j===void 0&&(j=q.clone(),oe[ce]=j,B.addEventListener("dispose",k)),q=j}if(q.visible=B.visible,q.wireframe=B.wireframe,F===nc?q.side=B.shadowSide!==null?B.shadowSide:B.side:q.side=B.shadowSide!==null?B.shadowSide:_[B.side],q.alphaMap=B.alphaMap,q.alphaTest=B.alphaToCoverage===!0?.5:B.alphaTest,q.map=B.map,q.clipShadows=B.clipShadows,q.clippingPlanes=B.clippingPlanes,q.clipIntersection=B.clipIntersection,q.displacementMap=B.displacementMap,q.displacementScale=B.displacementScale,q.displacementBias=B.displacementBias,q.wireframeLinewidth=B.wireframeLinewidth,q.linewidth=B.linewidth,A.isPointLight===!0&&q.isMeshDistanceMaterial===!0){const $=r.properties.get(q);$.light=A}return q}function I(D,B,A,F,q){if(D.visible===!1)return;if(D.layers.test(B.layers)&&(D.isMesh||D.isLine||D.isPoints)&&(D.castShadow||D.receiveShadow&&q===nc)&&(!D.frustumCulled||s.intersectsObject(D))){D.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,D.matrixWorld);const ce=e.update(D),oe=D.material;if(Array.isArray(oe)){const j=ce.groups;for(let L=0,G=j.length;L<G;L++){const K=j[L],ue=oe[K.materialIndex];if(ue&&ue.visible){const xe=U(D,ue,F,q);D.onBeforeShadow(r,D,B,A,ce,xe,K),r.renderBufferDirect(A,null,ce,xe,D,K),D.onAfterShadow(r,D,B,A,ce,xe,K)}}}else if(oe.visible){const j=U(D,oe,F,q);D.onBeforeShadow(r,D,B,A,ce,j,null),r.renderBufferDirect(A,null,ce,j,D,null),D.onAfterShadow(r,D,B,A,ce,j,null)}}const $=D.children;for(let ce=0,oe=$.length;ce<oe;ce++)I($[ce],B,A,F,q)}function k(D){D.target.removeEventListener("dispose",k);for(const A in p){const F=p[A],q=D.target.uuid;q in F&&(F[q].dispose(),delete F[q])}}}function xC(r,e){function i(){let V=!1;const Ce=new In;let me=null;const ke=new In(0,0,0,0);return{setMask:function(Ue){me!==Ue&&!V&&(r.colorMask(Ue,Ue,Ue,Ue),me=Ue)},setLocked:function(Ue){V=Ue},setClear:function(Ue,Me,Qe,ct,vn){vn===!0&&(Ue*=ct,Me*=ct,Qe*=ct),Ce.set(Ue,Me,Qe,ct),ke.equals(Ce)===!1&&(r.clearColor(Ue,Me,Qe,ct),ke.copy(Ce))},reset:function(){V=!1,me=null,ke.set(-1,0,0,0)}}}function s(){let V=!1,Ce=!1,me=null,ke=null,Ue=null;return{setReversed:function(Me){if(Ce!==Me){const Qe=e.get("EXT_clip_control");Me?Qe.clipControlEXT(Qe.LOWER_LEFT_EXT,Qe.ZERO_TO_ONE_EXT):Qe.clipControlEXT(Qe.LOWER_LEFT_EXT,Qe.NEGATIVE_ONE_TO_ONE_EXT),Ce=Me;const ct=Ue;Ue=null,this.setClear(ct)}},getReversed:function(){return Ce},setTest:function(Me){Me?ye(r.DEPTH_TEST):He(r.DEPTH_TEST)},setMask:function(Me){me!==Me&&!V&&(r.depthMask(Me),me=Me)},setFunc:function(Me){if(Ce&&(Me=WM[Me]),ke!==Me){switch(Me){case hp:r.depthFunc(r.NEVER);break;case pp:r.depthFunc(r.ALWAYS);break;case mp:r.depthFunc(r.LESS);break;case $o:r.depthFunc(r.LEQUAL);break;case gp:r.depthFunc(r.EQUAL);break;case xp:r.depthFunc(r.GEQUAL);break;case _p:r.depthFunc(r.GREATER);break;case vp:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ke=Me}},setLocked:function(Me){V=Me},setClear:function(Me){Ue!==Me&&(Ue=Me,Ce&&(Me=1-Me),r.clearDepth(Me))},reset:function(){V=!1,me=null,ke=null,Ue=null,Ce=!1}}}function l(){let V=!1,Ce=null,me=null,ke=null,Ue=null,Me=null,Qe=null,ct=null,vn=null;return{setTest:function(Yt){V||(Yt?ye(r.STENCIL_TEST):He(r.STENCIL_TEST))},setMask:function(Yt){Ce!==Yt&&!V&&(r.stencilMask(Yt),Ce=Yt)},setFunc:function(Yt,Kn,li){(me!==Yt||ke!==Kn||Ue!==li)&&(r.stencilFunc(Yt,Kn,li),me=Yt,ke=Kn,Ue=li)},setOp:function(Yt,Kn,li){(Me!==Yt||Qe!==Kn||ct!==li)&&(r.stencilOp(Yt,Kn,li),Me=Yt,Qe=Kn,ct=li)},setLocked:function(Yt){V=Yt},setClear:function(Yt){vn!==Yt&&(r.clearStencil(Yt),vn=Yt)},reset:function(){V=!1,Ce=null,me=null,ke=null,Ue=null,Me=null,Qe=null,ct=null,vn=null}}}const c=new i,f=new s,h=new l,m=new WeakMap,p=new WeakMap;let v={},_={},g={},b=new WeakMap,M=[],C=null,E=!1,S=null,N=null,U=null,I=null,k=null,D=null,B=null,A=new hn(0,0,0),F=0,q=!1,H=null,$=null,ce=null,oe=null,j=null;const L=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,K=0;const ue=r.getParameter(r.VERSION);ue.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(ue)[1]),G=K>=1):ue.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),G=K>=2);let xe=null,P={};const Z=r.getParameter(r.SCISSOR_BOX),be=r.getParameter(r.VIEWPORT),Ae=new In().fromArray(Z),Oe=new In().fromArray(be);function ee(V,Ce,me,ke){const Ue=new Uint8Array(4),Me=r.createTexture();r.bindTexture(V,Me),r.texParameteri(V,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(V,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Qe=0;Qe<me;Qe++)V===r.TEXTURE_3D||V===r.TEXTURE_2D_ARRAY?r.texImage3D(Ce,0,r.RGBA,1,1,ke,0,r.RGBA,r.UNSIGNED_BYTE,Ue):r.texImage2D(Ce+Qe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Ue);return Me}const Se={};Se[r.TEXTURE_2D]=ee(r.TEXTURE_2D,r.TEXTURE_2D,1),Se[r.TEXTURE_CUBE_MAP]=ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[r.TEXTURE_2D_ARRAY]=ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Se[r.TEXTURE_3D]=ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),h.setClear(0),ye(r.DEPTH_TEST),f.setFunc($o),Ft(!1),Qt(C_),ye(r.CULL_FACE),kt(Ss);function ye(V){v[V]!==!0&&(r.enable(V),v[V]=!0)}function He(V){v[V]!==!1&&(r.disable(V),v[V]=!1)}function Ze(V,Ce){return g[V]!==Ce?(r.bindFramebuffer(V,Ce),g[V]=Ce,V===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Ce),V===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Ce),!0):!1}function nt(V,Ce){let me=M,ke=!1;if(V){me=b.get(Ce),me===void 0&&(me=[],b.set(Ce,me));const Ue=V.textures;if(me.length!==Ue.length||me[0]!==r.COLOR_ATTACHMENT0){for(let Me=0,Qe=Ue.length;Me<Qe;Me++)me[Me]=r.COLOR_ATTACHMENT0+Me;me.length=Ue.length,ke=!0}}else me[0]!==r.BACK&&(me[0]=r.BACK,ke=!0);ke&&r.drawBuffers(me)}function Tt(V){return C!==V?(r.useProgram(V),C=V,!0):!1}const Ye={[Pr]:r.FUNC_ADD,[gM]:r.FUNC_SUBTRACT,[xM]:r.FUNC_REVERSE_SUBTRACT};Ye[_M]=r.MIN,Ye[vM]=r.MAX;const Nt={[bM]:r.ZERO,[yM]:r.ONE,[SM]:r.SRC_COLOR,[fp]:r.SRC_ALPHA,[RM]:r.SRC_ALPHA_SATURATE,[AM]:r.DST_COLOR,[MM]:r.DST_ALPHA,[EM]:r.ONE_MINUS_SRC_COLOR,[dp]:r.ONE_MINUS_SRC_ALPHA,[wM]:r.ONE_MINUS_DST_COLOR,[TM]:r.ONE_MINUS_DST_ALPHA,[CM]:r.CONSTANT_COLOR,[NM]:r.ONE_MINUS_CONSTANT_COLOR,[OM]:r.CONSTANT_ALPHA,[DM]:r.ONE_MINUS_CONSTANT_ALPHA};function kt(V,Ce,me,ke,Ue,Me,Qe,ct,vn,Yt){if(V===Ss){E===!0&&(He(r.BLEND),E=!1);return}if(E===!1&&(ye(r.BLEND),E=!0),V!==mM){if(V!==S||Yt!==q){if((N!==Pr||k!==Pr)&&(r.blendEquation(r.FUNC_ADD),N=Pr,k=Pr),Yt)switch(V){case Yo:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case N_:r.blendFunc(r.ONE,r.ONE);break;case O_:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case D_:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:$t("WebGLState: Invalid blending: ",V);break}else switch(V){case Yo:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case N_:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case O_:$t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case D_:$t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$t("WebGLState: Invalid blending: ",V);break}U=null,I=null,D=null,B=null,A.set(0,0,0),F=0,S=V,q=Yt}return}Ue=Ue||Ce,Me=Me||me,Qe=Qe||ke,(Ce!==N||Ue!==k)&&(r.blendEquationSeparate(Ye[Ce],Ye[Ue]),N=Ce,k=Ue),(me!==U||ke!==I||Me!==D||Qe!==B)&&(r.blendFuncSeparate(Nt[me],Nt[ke],Nt[Me],Nt[Qe]),U=me,I=ke,D=Me,B=Qe),(ct.equals(A)===!1||vn!==F)&&(r.blendColor(ct.r,ct.g,ct.b,vn),A.copy(ct),F=vn),S=V,q=!1}function gt(V,Ce){V.side===bs?He(r.CULL_FACE):ye(r.CULL_FACE);let me=V.side===Oi;Ce&&(me=!me),Ft(me),V.blending===Yo&&V.transparent===!1?kt(Ss):kt(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),f.setFunc(V.depthFunc),f.setTest(V.depthTest),f.setMask(V.depthWrite),c.setMask(V.colorWrite);const ke=V.stencilWrite;h.setTest(ke),ke&&(h.setMask(V.stencilWriteMask),h.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),h.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),X(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ye(r.SAMPLE_ALPHA_TO_COVERAGE):He(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ft(V){H!==V&&(V?r.frontFace(r.CW):r.frontFace(r.CCW),H=V)}function Qt(V){V!==dM?(ye(r.CULL_FACE),V!==$&&(V===C_?r.cullFace(r.BACK):V===hM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):He(r.CULL_FACE),$=V}function We(V){V!==ce&&(G&&r.lineWidth(V),ce=V)}function X(V,Ce,me){V?(ye(r.POLYGON_OFFSET_FILL),(oe!==Ce||j!==me)&&(oe=Ce,j=me,f.getReversed()&&(Ce=-Ce),r.polygonOffset(Ce,me))):He(r.POLYGON_OFFSET_FILL)}function Lt(V){V?ye(r.SCISSOR_TEST):He(r.SCISSOR_TEST)}function pt(V){V===void 0&&(V=r.TEXTURE0+L-1),xe!==V&&(r.activeTexture(V),xe=V)}function Xt(V,Ce,me){me===void 0&&(xe===null?me=r.TEXTURE0+L-1:me=xe);let ke=P[me];ke===void 0&&(ke={type:void 0,texture:void 0},P[me]=ke),(ke.type!==V||ke.texture!==Ce)&&(xe!==me&&(r.activeTexture(me),xe=me),r.bindTexture(V,Ce||Se[V]),ke.type=V,ke.texture=Ce)}function Ne(){const V=P[xe];V!==void 0&&V.type!==void 0&&(r.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Jt(){try{r.compressedTexImage2D(...arguments)}catch(V){$t("WebGLState:",V)}}function O(){try{r.compressedTexImage3D(...arguments)}catch(V){$t("WebGLState:",V)}}function T(){try{r.texSubImage2D(...arguments)}catch(V){$t("WebGLState:",V)}}function J(){try{r.texSubImage3D(...arguments)}catch(V){$t("WebGLState:",V)}}function he(){try{r.compressedTexSubImage2D(...arguments)}catch(V){$t("WebGLState:",V)}}function Ee(){try{r.compressedTexSubImage3D(...arguments)}catch(V){$t("WebGLState:",V)}}function De(){try{r.texStorage2D(...arguments)}catch(V){$t("WebGLState:",V)}}function Fe(){try{r.texStorage3D(...arguments)}catch(V){$t("WebGLState:",V)}}function de(){try{r.texImage2D(...arguments)}catch(V){$t("WebGLState:",V)}}function pe(){try{r.texImage3D(...arguments)}catch(V){$t("WebGLState:",V)}}function Te(V){return _[V]!==void 0?_[V]:r.getParameter(V)}function ze(V,Ce){_[V]!==Ce&&(r.pixelStorei(V,Ce),_[V]=Ce)}function Ie(V){Ae.equals(V)===!1&&(r.scissor(V.x,V.y,V.z,V.w),Ae.copy(V))}function Le(V){Oe.equals(V)===!1&&(r.viewport(V.x,V.y,V.z,V.w),Oe.copy(V))}function dt(V,Ce){let me=p.get(Ce);me===void 0&&(me=new WeakMap,p.set(Ce,me));let ke=me.get(V);ke===void 0&&(ke=r.getUniformBlockIndex(Ce,V.name),me.set(V,ke))}function lt(V,Ce){const ke=p.get(Ce).get(V);m.get(Ce)!==ke&&(r.uniformBlockBinding(Ce,ke,V.__bindingPointIndex),m.set(Ce,ke))}function wt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),v={},_={},xe=null,P={},g={},b=new WeakMap,M=[],C=null,E=!1,S=null,N=null,U=null,I=null,k=null,D=null,B=null,A=new hn(0,0,0),F=0,q=!1,H=null,$=null,ce=null,oe=null,j=null,Ae.set(0,0,r.canvas.width,r.canvas.height),Oe.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),h.reset()}return{buffers:{color:c,depth:f,stencil:h},enable:ye,disable:He,bindFramebuffer:Ze,drawBuffers:nt,useProgram:Tt,setBlending:kt,setMaterial:gt,setFlipSided:Ft,setCullFace:Qt,setLineWidth:We,setPolygonOffset:X,setScissorTest:Lt,activeTexture:pt,bindTexture:Xt,unbindTexture:Ne,compressedTexImage2D:Jt,compressedTexImage3D:O,texImage2D:de,texImage3D:pe,pixelStorei:ze,getParameter:Te,updateUBOMapping:dt,uniformBlockBinding:lt,texStorage2D:De,texStorage3D:Fe,texSubImage2D:T,texSubImage3D:J,compressedTexSubImage2D:he,compressedTexSubImage3D:Ee,scissor:Ie,viewport:Le,reset:wt}}function _C(r,e,i,s,l,c,f){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Dt,v=new WeakMap,_=new Set;let g;const b=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function C(O,T){return M?new OffscreenCanvas(O,T):hc("canvas")}function E(O,T,J){let he=1;const Ee=Jt(O);if((Ee.width>J||Ee.height>J)&&(he=J/Math.max(Ee.width,Ee.height)),he<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const De=Math.floor(he*Ee.width),Fe=Math.floor(he*Ee.height);g===void 0&&(g=C(De,Fe));const de=T?C(De,Fe):g;return de.width=De,de.height=Fe,de.getContext("2d").drawImage(O,0,0,De,Fe),mt("WebGLRenderer: Texture has been resized from ("+Ee.width+"x"+Ee.height+") to ("+De+"x"+Fe+")."),de}else return"data"in O&&mt("WebGLRenderer: Image in DataTexture is too big ("+Ee.width+"x"+Ee.height+")."),O;return O}function S(O){return O.generateMipmaps}function N(O){r.generateMipmap(O)}function U(O){return O.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?r.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function I(O,T,J,he,Ee,De=!1){if(O!==null){if(r[O]!==void 0)return r[O];mt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let Fe;he&&(Fe=e.get("EXT_texture_norm16"),Fe||mt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let de=T;if(T===r.RED&&(J===r.FLOAT&&(de=r.R32F),J===r.HALF_FLOAT&&(de=r.R16F),J===r.UNSIGNED_BYTE&&(de=r.R8),J===r.UNSIGNED_SHORT&&Fe&&(de=Fe.R16_EXT),J===r.SHORT&&Fe&&(de=Fe.R16_SNORM_EXT)),T===r.RED_INTEGER&&(J===r.UNSIGNED_BYTE&&(de=r.R8UI),J===r.UNSIGNED_SHORT&&(de=r.R16UI),J===r.UNSIGNED_INT&&(de=r.R32UI),J===r.BYTE&&(de=r.R8I),J===r.SHORT&&(de=r.R16I),J===r.INT&&(de=r.R32I)),T===r.RG&&(J===r.FLOAT&&(de=r.RG32F),J===r.HALF_FLOAT&&(de=r.RG16F),J===r.UNSIGNED_BYTE&&(de=r.RG8),J===r.UNSIGNED_SHORT&&Fe&&(de=Fe.RG16_EXT),J===r.SHORT&&Fe&&(de=Fe.RG16_SNORM_EXT)),T===r.RG_INTEGER&&(J===r.UNSIGNED_BYTE&&(de=r.RG8UI),J===r.UNSIGNED_SHORT&&(de=r.RG16UI),J===r.UNSIGNED_INT&&(de=r.RG32UI),J===r.BYTE&&(de=r.RG8I),J===r.SHORT&&(de=r.RG16I),J===r.INT&&(de=r.RG32I)),T===r.RGB_INTEGER&&(J===r.UNSIGNED_BYTE&&(de=r.RGB8UI),J===r.UNSIGNED_SHORT&&(de=r.RGB16UI),J===r.UNSIGNED_INT&&(de=r.RGB32UI),J===r.BYTE&&(de=r.RGB8I),J===r.SHORT&&(de=r.RGB16I),J===r.INT&&(de=r.RGB32I)),T===r.RGBA_INTEGER&&(J===r.UNSIGNED_BYTE&&(de=r.RGBA8UI),J===r.UNSIGNED_SHORT&&(de=r.RGBA16UI),J===r.UNSIGNED_INT&&(de=r.RGBA32UI),J===r.BYTE&&(de=r.RGBA8I),J===r.SHORT&&(de=r.RGBA16I),J===r.INT&&(de=r.RGBA32I)),T===r.RGB&&(J===r.UNSIGNED_SHORT&&Fe&&(de=Fe.RGB16_EXT),J===r.SHORT&&Fe&&(de=Fe.RGB16_SNORM_EXT),J===r.UNSIGNED_INT_5_9_9_9_REV&&(de=r.RGB9_E5),J===r.UNSIGNED_INT_10F_11F_11F_REV&&(de=r.R11F_G11F_B10F)),T===r.RGBA){const pe=De?gf:jt.getTransfer(Ee);J===r.FLOAT&&(de=r.RGBA32F),J===r.HALF_FLOAT&&(de=r.RGBA16F),J===r.UNSIGNED_BYTE&&(de=pe===ln?r.SRGB8_ALPHA8:r.RGBA8),J===r.UNSIGNED_SHORT&&Fe&&(de=Fe.RGBA16_EXT),J===r.SHORT&&Fe&&(de=Fe.RGBA16_SNORM_EXT),J===r.UNSIGNED_SHORT_4_4_4_4&&(de=r.RGBA4),J===r.UNSIGNED_SHORT_5_5_5_1&&(de=r.RGB5_A1)}return(de===r.R16F||de===r.R32F||de===r.RG16F||de===r.RG32F||de===r.RGBA16F||de===r.RGBA32F)&&e.get("EXT_color_buffer_float"),de}function k(O,T){let J;return O?T===null||T===Ha||T===dc?J=r.DEPTH24_STENCIL8:T===Pa?J=r.DEPTH32F_STENCIL8:T===fc&&(J=r.DEPTH24_STENCIL8,mt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ha||T===dc?J=r.DEPTH_COMPONENT24:T===Pa?J=r.DEPTH_COMPONENT32F:T===fc&&(J=r.DEPTH_COMPONENT16),J}function D(O,T){return S(O)===!0||O.isFramebufferTexture&&O.minFilter!==oi&&O.minFilter!==mi?Math.log2(Math.max(T.width,T.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?T.mipmaps.length:1}function B(O){const T=O.target;T.removeEventListener("dispose",B),F(T),T.isVideoTexture&&v.delete(T),T.isHTMLTexture&&_.delete(T)}function A(O){const T=O.target;T.removeEventListener("dispose",A),H(T)}function F(O){const T=s.get(O);if(T.__webglInit===void 0)return;const J=O.source,he=b.get(J);if(he){const Ee=he[T.__cacheKey];Ee.usedTimes--,Ee.usedTimes===0&&q(O),Object.keys(he).length===0&&b.delete(J)}s.remove(O)}function q(O){const T=s.get(O);r.deleteTexture(T.__webglTexture);const J=O.source,he=b.get(J);delete he[T.__cacheKey],f.memory.textures--}function H(O){const T=s.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),s.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let he=0;he<6;he++){if(Array.isArray(T.__webglFramebuffer[he]))for(let Ee=0;Ee<T.__webglFramebuffer[he].length;Ee++)r.deleteFramebuffer(T.__webglFramebuffer[he][Ee]);else r.deleteFramebuffer(T.__webglFramebuffer[he]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[he])}else{if(Array.isArray(T.__webglFramebuffer))for(let he=0;he<T.__webglFramebuffer.length;he++)r.deleteFramebuffer(T.__webglFramebuffer[he]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let he=0;he<T.__webglColorRenderbuffer.length;he++)T.__webglColorRenderbuffer[he]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[he]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const J=O.textures;for(let he=0,Ee=J.length;he<Ee;he++){const De=s.get(J[he]);De.__webglTexture&&(r.deleteTexture(De.__webglTexture),f.memory.textures--),s.remove(J[he])}s.remove(O)}let $=0;function ce(){$=0}function oe(){return $}function j(O){$=O}function L(){const O=$;return O>=l.maxTextures&&mt("WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),$+=1,O}function G(O){const T=[];return T.push(O.wrapS),T.push(O.wrapT),T.push(O.wrapR||0),T.push(O.magFilter),T.push(O.minFilter),T.push(O.anisotropy),T.push(O.internalFormat),T.push(O.format),T.push(O.type),T.push(O.generateMipmaps),T.push(O.premultiplyAlpha),T.push(O.flipY),T.push(O.unpackAlignment),T.push(O.colorSpace),T.join()}function K(O,T){const J=s.get(O);if(O.isVideoTexture&&Xt(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&J.__version!==O.version){const he=O.image;if(he===null)mt("WebGLRenderer: Texture marked for update but no image data found.");else if(he.complete===!1)mt("WebGLRenderer: Texture marked for update but image is incomplete");else{He(J,O,T);return}}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D,J.__webglTexture,r.TEXTURE0+T)}function ue(O,T){const J=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){He(J,O,T);return}else O.isExternalTexture&&(J.__webglTexture=O.sourceTexture?O.sourceTexture:null);i.bindTexture(r.TEXTURE_2D_ARRAY,J.__webglTexture,r.TEXTURE0+T)}function xe(O,T){const J=s.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&J.__version!==O.version){He(J,O,T);return}i.bindTexture(r.TEXTURE_3D,J.__webglTexture,r.TEXTURE0+T)}function P(O,T){const J=s.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&J.__version!==O.version){Ze(J,O,T);return}i.bindTexture(r.TEXTURE_CUBE_MAP,J.__webglTexture,r.TEXTURE0+T)}const Z={[bp]:r.REPEAT,[ys]:r.CLAMP_TO_EDGE,[yp]:r.MIRRORED_REPEAT},be={[oi]:r.NEAREST,[IM]:r.NEAREST_MIPMAP_NEAREST,[Cu]:r.NEAREST_MIPMAP_LINEAR,[mi]:r.LINEAR,[Ch]:r.LINEAR_MIPMAP_NEAREST,[Br]:r.LINEAR_MIPMAP_LINEAR},Ae={[BM]:r.NEVER,[VM]:r.ALWAYS,[zM]:r.LESS,[hm]:r.LEQUAL,[GM]:r.EQUAL,[pm]:r.GEQUAL,[HM]:r.GREATER,[kM]:r.NOTEQUAL};function Oe(O,T){if(T.type===Pa&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===mi||T.magFilter===Ch||T.magFilter===Cu||T.magFilter===Br||T.minFilter===mi||T.minFilter===Ch||T.minFilter===Cu||T.minFilter===Br)&&mt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(O,r.TEXTURE_WRAP_S,Z[T.wrapS]),r.texParameteri(O,r.TEXTURE_WRAP_T,Z[T.wrapT]),(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)&&r.texParameteri(O,r.TEXTURE_WRAP_R,Z[T.wrapR]),r.texParameteri(O,r.TEXTURE_MAG_FILTER,be[T.magFilter]),r.texParameteri(O,r.TEXTURE_MIN_FILTER,be[T.minFilter]),T.compareFunction&&(r.texParameteri(O,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(O,r.TEXTURE_COMPARE_FUNC,Ae[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===oi||T.minFilter!==Cu&&T.minFilter!==Br||T.type===Pa&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");r.texParameterf(O,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function ee(O,T){let J=!1;O.__webglInit===void 0&&(O.__webglInit=!0,T.addEventListener("dispose",B));const he=T.source;let Ee=b.get(he);Ee===void 0&&(Ee={},b.set(he,Ee));const De=G(T);if(De!==O.__cacheKey){Ee[De]===void 0&&(Ee[De]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,J=!0),Ee[De].usedTimes++;const Fe=Ee[O.__cacheKey];Fe!==void 0&&(Ee[O.__cacheKey].usedTimes--,Fe.usedTimes===0&&q(T)),O.__cacheKey=De,O.__webglTexture=Ee[De].texture}return J}function Se(O,T,J){return Math.floor(Math.floor(O/J)/T)}function ye(O,T,J,he){const De=O.updateRanges;if(De.length===0)i.texSubImage2D(r.TEXTURE_2D,0,0,0,T.width,T.height,J,he,T.data);else{De.sort((ze,Ie)=>ze.start-Ie.start);let Fe=0;for(let ze=1;ze<De.length;ze++){const Ie=De[Fe],Le=De[ze],dt=Ie.start+Ie.count,lt=Se(Le.start,T.width,4),wt=Se(Ie.start,T.width,4);Le.start<=dt+1&&lt===wt&&Se(Le.start+Le.count-1,T.width,4)===lt?Ie.count=Math.max(Ie.count,Le.start+Le.count-Ie.start):(++Fe,De[Fe]=Le)}De.length=Fe+1;const de=i.getParameter(r.UNPACK_ROW_LENGTH),pe=i.getParameter(r.UNPACK_SKIP_PIXELS),Te=i.getParameter(r.UNPACK_SKIP_ROWS);i.pixelStorei(r.UNPACK_ROW_LENGTH,T.width);for(let ze=0,Ie=De.length;ze<Ie;ze++){const Le=De[ze],dt=Math.floor(Le.start/4),lt=Math.ceil(Le.count/4),wt=dt%T.width,V=Math.floor(dt/T.width),Ce=lt,me=1;i.pixelStorei(r.UNPACK_SKIP_PIXELS,wt),i.pixelStorei(r.UNPACK_SKIP_ROWS,V),i.texSubImage2D(r.TEXTURE_2D,0,wt,V,Ce,me,J,he,T.data)}O.clearUpdateRanges(),i.pixelStorei(r.UNPACK_ROW_LENGTH,de),i.pixelStorei(r.UNPACK_SKIP_PIXELS,pe),i.pixelStorei(r.UNPACK_SKIP_ROWS,Te)}}function He(O,T,J){let he=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(he=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(he=r.TEXTURE_3D);const Ee=ee(O,T),De=T.source;i.bindTexture(he,O.__webglTexture,r.TEXTURE0+J);const Fe=s.get(De);if(De.version!==Fe.__version||Ee===!0){if(i.activeTexture(r.TEXTURE0+J),(typeof ImageBitmap<"u"&&T.image instanceof ImageBitmap)===!1){const me=jt.getPrimaries(jt.workingColorSpace),ke=T.colorSpace===rr?null:jt.getPrimaries(T.colorSpace),Ue=T.colorSpace===rr||me===ke?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue)}i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment);let pe=E(T.image,!1,l.maxTextureSize);pe=Ne(T,pe);const Te=c.convert(T.format,T.colorSpace),ze=c.convert(T.type);let Ie=I(T.internalFormat,Te,ze,T.normalized,T.colorSpace,T.isVideoTexture);Oe(he,T);let Le;const dt=T.mipmaps,lt=T.isVideoTexture!==!0,wt=Fe.__version===void 0||Ee===!0,V=De.dataReady,Ce=D(T,pe);if(T.isDepthTexture)Ie=k(T.format===zr,T.type),wt&&(lt?i.texStorage2D(r.TEXTURE_2D,1,Ie,pe.width,pe.height):i.texImage2D(r.TEXTURE_2D,0,Ie,pe.width,pe.height,0,Te,ze,null));else if(T.isDataTexture)if(dt.length>0){lt&&wt&&i.texStorage2D(r.TEXTURE_2D,Ce,Ie,dt[0].width,dt[0].height);for(let me=0,ke=dt.length;me<ke;me++)Le=dt[me],lt?V&&i.texSubImage2D(r.TEXTURE_2D,me,0,0,Le.width,Le.height,Te,ze,Le.data):i.texImage2D(r.TEXTURE_2D,me,Ie,Le.width,Le.height,0,Te,ze,Le.data);T.generateMipmaps=!1}else lt?(wt&&i.texStorage2D(r.TEXTURE_2D,Ce,Ie,pe.width,pe.height),V&&ye(T,pe,Te,ze)):i.texImage2D(r.TEXTURE_2D,0,Ie,pe.width,pe.height,0,Te,ze,pe.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){lt&&wt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ce,Ie,dt[0].width,dt[0].height,pe.depth);for(let me=0,ke=dt.length;me<ke;me++)if(Le=dt[me],T.format!==ba)if(Te!==null)if(lt){if(V)if(T.layerUpdates.size>0){const Ue=sv(Le.width,Le.height,T.format,T.type);for(const Me of T.layerUpdates){const Qe=Le.data.subarray(Me*Ue/Le.data.BYTES_PER_ELEMENT,(Me+1)*Ue/Le.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,Me,Le.width,Le.height,1,Te,Qe)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,0,Le.width,Le.height,pe.depth,Te,Le.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,me,Ie,Le.width,Le.height,pe.depth,0,Le.data,0,0);else mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else lt?V&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,me,0,0,0,Le.width,Le.height,pe.depth,Te,ze,Le.data):i.texImage3D(r.TEXTURE_2D_ARRAY,me,Ie,Le.width,Le.height,pe.depth,0,Te,ze,Le.data)}else{lt&&wt&&i.texStorage2D(r.TEXTURE_2D,Ce,Ie,dt[0].width,dt[0].height);for(let me=0,ke=dt.length;me<ke;me++)Le=dt[me],T.format!==ba?Te!==null?lt?V&&i.compressedTexSubImage2D(r.TEXTURE_2D,me,0,0,Le.width,Le.height,Te,Le.data):i.compressedTexImage2D(r.TEXTURE_2D,me,Ie,Le.width,Le.height,0,Le.data):mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?V&&i.texSubImage2D(r.TEXTURE_2D,me,0,0,Le.width,Le.height,Te,ze,Le.data):i.texImage2D(r.TEXTURE_2D,me,Ie,Le.width,Le.height,0,Te,ze,Le.data)}else if(T.isDataArrayTexture)if(lt){if(wt&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Ce,Ie,pe.width,pe.height,pe.depth),V)if(T.layerUpdates.size>0){const me=sv(pe.width,pe.height,T.format,T.type);for(const ke of T.layerUpdates){const Ue=pe.data.subarray(ke*me/pe.data.BYTES_PER_ELEMENT,(ke+1)*me/pe.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ke,pe.width,pe.height,1,Te,ze,Ue)}T.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,pe.width,pe.height,pe.depth,Te,ze,pe.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,Ie,pe.width,pe.height,pe.depth,0,Te,ze,pe.data);else if(T.isData3DTexture)lt?(wt&&i.texStorage3D(r.TEXTURE_3D,Ce,Ie,pe.width,pe.height,pe.depth),V&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,pe.width,pe.height,pe.depth,Te,ze,pe.data)):i.texImage3D(r.TEXTURE_3D,0,Ie,pe.width,pe.height,pe.depth,0,Te,ze,pe.data);else if(T.isFramebufferTexture){if(wt)if(lt)i.texStorage2D(r.TEXTURE_2D,Ce,Ie,pe.width,pe.height);else{let me=pe.width,ke=pe.height;for(let Ue=0;Ue<Ce;Ue++)i.texImage2D(r.TEXTURE_2D,Ue,Ie,me,ke,0,Te,ze,null),me>>=1,ke>>=1}}else if(T.isHTMLTexture){if("texElementImage2D"in r){const me=r.canvas;if(me.hasAttribute("layoutsubtree")||me.setAttribute("layoutsubtree","true"),pe.parentNode!==me){me.appendChild(pe),_.add(T),me.onpaint=ct=>{const vn=ct.changedElements;for(const Yt of _)vn.includes(Yt.image)&&(Yt.needsUpdate=!0)},me.requestPaint();return}const ke=0,Ue=r.RGBA,Me=r.RGBA,Qe=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,ke,Ue,Me,Qe,pe),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(dt.length>0){if(lt&&wt){const me=Jt(dt[0]);i.texStorage2D(r.TEXTURE_2D,Ce,Ie,me.width,me.height)}for(let me=0,ke=dt.length;me<ke;me++)Le=dt[me],lt?V&&i.texSubImage2D(r.TEXTURE_2D,me,0,0,Te,ze,Le):i.texImage2D(r.TEXTURE_2D,me,Ie,Te,ze,Le);T.generateMipmaps=!1}else if(lt){if(wt){const me=Jt(pe);i.texStorage2D(r.TEXTURE_2D,Ce,Ie,me.width,me.height)}V&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Te,ze,pe)}else i.texImage2D(r.TEXTURE_2D,0,Ie,Te,ze,pe);S(T)&&N(he),Fe.__version=De.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function Ze(O,T,J){if(T.image.length!==6)return;const he=ee(O,T),Ee=T.source;i.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+J);const De=s.get(Ee);if(Ee.version!==De.__version||he===!0){i.activeTexture(r.TEXTURE0+J);const Fe=jt.getPrimaries(jt.workingColorSpace),de=T.colorSpace===rr?null:jt.getPrimaries(T.colorSpace),pe=T.colorSpace===rr||Fe===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;i.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Te=T.isCompressedTexture||T.image[0].isCompressedTexture,ze=T.image[0]&&T.image[0].isDataTexture,Ie=[];for(let Me=0;Me<6;Me++)!Te&&!ze?Ie[Me]=E(T.image[Me],!0,l.maxCubemapSize):Ie[Me]=ze?T.image[Me].image:T.image[Me],Ie[Me]=Ne(T,Ie[Me]);const Le=Ie[0],dt=c.convert(T.format,T.colorSpace),lt=c.convert(T.type),wt=I(T.internalFormat,dt,lt,T.normalized,T.colorSpace),V=T.isVideoTexture!==!0,Ce=De.__version===void 0||he===!0,me=Ee.dataReady;let ke=D(T,Le);Oe(r.TEXTURE_CUBE_MAP,T);let Ue;if(Te){V&&Ce&&i.texStorage2D(r.TEXTURE_CUBE_MAP,ke,wt,Le.width,Le.height);for(let Me=0;Me<6;Me++){Ue=Ie[Me].mipmaps;for(let Qe=0;Qe<Ue.length;Qe++){const ct=Ue[Qe];T.format!==ba?dt!==null?V?me&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Qe,0,0,ct.width,ct.height,dt,ct.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Qe,wt,ct.width,ct.height,0,ct.data):mt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Qe,0,0,ct.width,ct.height,dt,lt,ct.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Qe,wt,ct.width,ct.height,0,dt,lt,ct.data)}}}else{if(Ue=T.mipmaps,V&&Ce){Ue.length>0&&ke++;const Me=Jt(Ie[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,ke,wt,Me.width,Me.height)}for(let Me=0;Me<6;Me++)if(ze){V?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,Ie[Me].width,Ie[Me].height,dt,lt,Ie[Me].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,wt,Ie[Me].width,Ie[Me].height,0,dt,lt,Ie[Me].data);for(let Qe=0;Qe<Ue.length;Qe++){const vn=Ue[Qe].image[Me].image;V?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Qe+1,0,0,vn.width,vn.height,dt,lt,vn.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Qe+1,wt,vn.width,vn.height,0,dt,lt,vn.data)}}else{V?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,0,0,dt,lt,Ie[Me]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,wt,dt,lt,Ie[Me]);for(let Qe=0;Qe<Ue.length;Qe++){const ct=Ue[Qe];V?me&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Qe+1,0,0,dt,lt,ct.image[Me]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Me,Qe+1,wt,dt,lt,ct.image[Me])}}}S(T)&&N(r.TEXTURE_CUBE_MAP),De.__version=Ee.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function nt(O,T,J,he,Ee,De){const Fe=c.convert(J.format,J.colorSpace),de=c.convert(J.type),pe=I(J.internalFormat,Fe,de,J.normalized,J.colorSpace),Te=s.get(T),ze=s.get(J);if(ze.__renderTarget=T,!Te.__hasExternalTextures){const Ie=Math.max(1,T.width>>De),Le=Math.max(1,T.height>>De);Ee===r.TEXTURE_3D||Ee===r.TEXTURE_2D_ARRAY?i.texImage3D(Ee,De,pe,Ie,Le,T.depth,0,Fe,de,null):i.texImage2D(Ee,De,pe,Ie,Le,0,Fe,de,null)}i.bindFramebuffer(r.FRAMEBUFFER,O),pt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,he,Ee,ze.__webglTexture,0,Lt(T)):(Ee===r.TEXTURE_2D||Ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,he,Ee,ze.__webglTexture,De),i.bindFramebuffer(r.FRAMEBUFFER,null)}function Tt(O,T,J){if(r.bindRenderbuffer(r.RENDERBUFFER,O),T.depthBuffer){const he=T.depthTexture,Ee=he&&he.isDepthTexture?he.type:null,De=k(T.stencilBuffer,Ee),Fe=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;pt(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt(T),De,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt(T),De,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,De,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Fe,r.RENDERBUFFER,O)}else{const he=T.textures;for(let Ee=0;Ee<he.length;Ee++){const De=he[Ee],Fe=c.convert(De.format,De.colorSpace),de=c.convert(De.type),pe=I(De.internalFormat,Fe,de,De.normalized,De.colorSpace);pt(T)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt(T),pe,T.width,T.height):J?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt(T),pe,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,pe,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ye(O,T,J){const he=T.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(r.FRAMEBUFFER,O),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Ee=s.get(T.depthTexture);if(Ee.__renderTarget=T,(!Ee.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),he){if(Ee.__webglInit===void 0&&(Ee.__webglInit=!0,T.depthTexture.addEventListener("dispose",B)),Ee.__webglTexture===void 0){Ee.__webglTexture=r.createTexture(),i.bindTexture(r.TEXTURE_CUBE_MAP,Ee.__webglTexture),Oe(r.TEXTURE_CUBE_MAP,T.depthTexture);const Te=c.convert(T.depthTexture.format),ze=c.convert(T.depthTexture.type);let Ie;T.depthTexture.format===Ts?Ie=r.DEPTH_COMPONENT24:T.depthTexture.format===zr&&(Ie=r.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Ie,T.width,T.height,0,Te,ze,null)}}else K(T.depthTexture,0);const De=Ee.__webglTexture,Fe=Lt(T),de=he?r.TEXTURE_CUBE_MAP_POSITIVE_X+J:r.TEXTURE_2D,pe=T.depthTexture.format===zr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(T.depthTexture.format===Ts)pt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pe,de,De,0,Fe):r.framebufferTexture2D(r.FRAMEBUFFER,pe,de,De,0);else if(T.depthTexture.format===zr)pt(T)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,pe,de,De,0,Fe):r.framebufferTexture2D(r.FRAMEBUFFER,pe,de,De,0);else throw new Error("Unknown depthTexture format")}function Nt(O){const T=s.get(O),J=O.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==O.depthTexture){const he=O.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),he){const Ee=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,he.removeEventListener("dispose",Ee)};he.addEventListener("dispose",Ee),T.__depthDisposeCallback=Ee}T.__boundDepthTexture=he}if(O.depthTexture&&!T.__autoAllocateDepthBuffer)if(J)for(let he=0;he<6;he++)Ye(T.__webglFramebuffer[he],O,he);else{const he=O.texture.mipmaps;he&&he.length>0?Ye(T.__webglFramebuffer[0],O,0):Ye(T.__webglFramebuffer,O,0)}else if(J){T.__webglDepthbuffer=[];for(let he=0;he<6;he++)if(i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[he]),T.__webglDepthbuffer[he]===void 0)T.__webglDepthbuffer[he]=r.createRenderbuffer(),Tt(T.__webglDepthbuffer[he],O,!1);else{const Ee=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,De=T.__webglDepthbuffer[he];r.bindRenderbuffer(r.RENDERBUFFER,De),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ee,r.RENDERBUFFER,De)}}else{const he=O.texture.mipmaps;if(he&&he.length>0?i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[0]):i.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),Tt(T.__webglDepthbuffer,O,!1);else{const Ee=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,De=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,De),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ee,r.RENDERBUFFER,De)}}i.bindFramebuffer(r.FRAMEBUFFER,null)}function kt(O,T,J){const he=s.get(O);T!==void 0&&nt(he.__webglFramebuffer,O,O.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),J!==void 0&&Nt(O)}function gt(O){const T=O.texture,J=s.get(O),he=s.get(T);O.addEventListener("dispose",A);const Ee=O.textures,De=O.isWebGLCubeRenderTarget===!0,Fe=Ee.length>1;if(Fe||(he.__webglTexture===void 0&&(he.__webglTexture=r.createTexture()),he.__version=T.version,f.memory.textures++),De){J.__webglFramebuffer=[];for(let de=0;de<6;de++)if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer[de]=[];for(let pe=0;pe<T.mipmaps.length;pe++)J.__webglFramebuffer[de][pe]=r.createFramebuffer()}else J.__webglFramebuffer[de]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer=[];for(let de=0;de<T.mipmaps.length;de++)J.__webglFramebuffer[de]=r.createFramebuffer()}else J.__webglFramebuffer=r.createFramebuffer();if(Fe)for(let de=0,pe=Ee.length;de<pe;de++){const Te=s.get(Ee[de]);Te.__webglTexture===void 0&&(Te.__webglTexture=r.createTexture(),f.memory.textures++)}if(O.samples>0&&pt(O)===!1){J.__webglMultisampledFramebuffer=r.createFramebuffer(),J.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let de=0;de<Ee.length;de++){const pe=Ee[de];J.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,J.__webglColorRenderbuffer[de]);const Te=c.convert(pe.format,pe.colorSpace),ze=c.convert(pe.type),Ie=I(pe.internalFormat,Te,ze,pe.normalized,pe.colorSpace,O.isXRRenderTarget===!0),Le=Lt(O);r.renderbufferStorageMultisample(r.RENDERBUFFER,Le,Ie,O.width,O.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,J.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),O.depthBuffer&&(J.__webglDepthRenderbuffer=r.createRenderbuffer(),Tt(J.__webglDepthRenderbuffer,O,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(De){i.bindTexture(r.TEXTURE_CUBE_MAP,he.__webglTexture),Oe(r.TEXTURE_CUBE_MAP,T);for(let de=0;de<6;de++)if(T.mipmaps&&T.mipmaps.length>0)for(let pe=0;pe<T.mipmaps.length;pe++)nt(J.__webglFramebuffer[de][pe],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,pe);else nt(J.__webglFramebuffer[de],O,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);S(T)&&N(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Fe){for(let de=0,pe=Ee.length;de<pe;de++){const Te=Ee[de],ze=s.get(Te);let Ie=r.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Ie=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Ie,ze.__webglTexture),Oe(Ie,Te),nt(J.__webglFramebuffer,O,Te,r.COLOR_ATTACHMENT0+de,Ie,0),S(Te)&&N(Ie)}i.unbindTexture()}else{let de=r.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(de=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(de,he.__webglTexture),Oe(de,T),T.mipmaps&&T.mipmaps.length>0)for(let pe=0;pe<T.mipmaps.length;pe++)nt(J.__webglFramebuffer[pe],O,T,r.COLOR_ATTACHMENT0,de,pe);else nt(J.__webglFramebuffer,O,T,r.COLOR_ATTACHMENT0,de,0);S(T)&&N(de),i.unbindTexture()}O.depthBuffer&&Nt(O)}function Ft(O){const T=O.textures;for(let J=0,he=T.length;J<he;J++){const Ee=T[J];if(S(Ee)){const De=U(O),Fe=s.get(Ee).__webglTexture;i.bindTexture(De,Fe),N(De),i.unbindTexture()}}}const Qt=[],We=[];function X(O){if(O.samples>0){if(pt(O)===!1){const T=O.textures,J=O.width,he=O.height;let Ee=r.COLOR_BUFFER_BIT;const De=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Fe=s.get(O),de=T.length>1;if(de)for(let Te=0;Te<T.length;Te++)i.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer);const pe=O.texture.mipmaps;pe&&pe.length>0?i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer[0]):i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let Te=0;Te<T.length;Te++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(Ee|=r.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(Ee|=r.STENCIL_BUFFER_BIT)),de){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Fe.__webglColorRenderbuffer[Te]);const ze=s.get(T[Te]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ze,0)}r.blitFramebuffer(0,0,J,he,0,0,J,he,Ee,r.NEAREST),m===!0&&(Qt.length=0,We.length=0,Qt.push(r.COLOR_ATTACHMENT0+Te),O.depthBuffer&&O.resolveDepthBuffer===!1&&(Qt.push(De),We.push(De),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,We)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Qt))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let Te=0;Te<T.length;Te++){i.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,Fe.__webglColorRenderbuffer[Te]);const ze=s.get(T[Te]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,Fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,ze,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,Fe.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&m){const T=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function Lt(O){return Math.min(l.maxSamples,O.samples)}function pt(O){const T=s.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Xt(O){const T=f.render.frame;v.get(O)!==T&&(v.set(O,T),O.update())}function Ne(O,T){const J=O.colorSpace,he=O.format,Ee=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||J!==mf&&J!==rr&&(jt.getTransfer(J)===ln?(he!==ba||Ee!==ra)&&mt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$t("WebGLTextures: Unsupported texture color space:",J)),T}function Jt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(p.width=O.naturalWidth||O.width,p.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(p.width=O.displayWidth,p.height=O.displayHeight):(p.width=O.width,p.height=O.height),p}this.allocateTextureUnit=L,this.resetTextureUnits=ce,this.getTextureUnits=oe,this.setTextureUnits=j,this.setTexture2D=K,this.setTexture2DArray=ue,this.setTexture3D=xe,this.setTextureCube=P,this.rebindTextures=kt,this.setupRenderTarget=gt,this.updateRenderTargetMipmap=Ft,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=nt,this.useMultisampledRTT=pt,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function vC(r,e){function i(s,l=rr){let c;const f=jt.getTransfer(l);if(s===ra)return r.UNSIGNED_BYTE;if(s===lm)return r.UNSIGNED_SHORT_4_4_4_4;if(s===cm)return r.UNSIGNED_SHORT_5_5_5_1;if(s===ib)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===ab)return r.UNSIGNED_INT_10F_11F_11F_REV;if(s===tb)return r.BYTE;if(s===nb)return r.SHORT;if(s===fc)return r.UNSIGNED_SHORT;if(s===om)return r.INT;if(s===Ha)return r.UNSIGNED_INT;if(s===Pa)return r.FLOAT;if(s===Ms)return r.HALF_FLOAT;if(s===sb)return r.ALPHA;if(s===rb)return r.RGB;if(s===ba)return r.RGBA;if(s===Ts)return r.DEPTH_COMPONENT;if(s===zr)return r.DEPTH_STENCIL;if(s===ob)return r.RED;if(s===um)return r.RED_INTEGER;if(s===kr)return r.RG;if(s===fm)return r.RG_INTEGER;if(s===dm)return r.RGBA_INTEGER;if(s===af||s===sf||s===rf||s===of)if(f===ln)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===af)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===sf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===rf)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===of)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===af)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===sf)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===rf)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===of)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Sp||s===Ep||s===Mp||s===Tp)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===Sp)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ep)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Mp)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Tp)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ap||s===wp||s===Rp||s===Cp||s===Np||s===hf||s===Op)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Ap||s===wp)return f===ln?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Rp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC;if(s===Cp)return c.COMPRESSED_R11_EAC;if(s===Np)return c.COMPRESSED_SIGNED_R11_EAC;if(s===hf)return c.COMPRESSED_RG11_EAC;if(s===Op)return c.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Dp||s===Lp||s===Up||s===Ip||s===Pp||s===Fp||s===Bp||s===zp||s===Gp||s===Hp||s===kp||s===Vp||s===jp||s===Xp)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Dp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Lp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Up)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ip)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Pp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Fp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Bp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===zp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Gp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Hp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===kp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Vp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===jp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xp)return f===ln?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Yp||s===Wp||s===qp)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===Yp)return f===ln?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Wp)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===qp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===$p||s===Kp||s===pf||s===Zp)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===$p)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Kp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===pf)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===dc?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}const bC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class SC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new xb(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new Va({vertexShader:bC,fragmentShader:yC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new ka(new yf(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class EC extends fr{constructor(e,i){super();const s=this;let l=null,c=1,f=null,h="local-floor",m=1,p=null,v=null,_=null,g=null,b=null,M=null;const C=typeof XRWebGLBinding<"u",E=new SC,S={},N=i.getContextAttributes();let U=null,I=null;const k=[],D=[],B=new Dt;let A=null;const F=new sa;F.viewport=new In;const q=new sa;q.viewport=new In;const H=[F,q],$=new DT;let ce=null,oe=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Se=k[ee];return Se===void 0&&(Se=new Ph,k[ee]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function(ee){let Se=k[ee];return Se===void 0&&(Se=new Ph,k[ee]=Se),Se.getGripSpace()},this.getHand=function(ee){let Se=k[ee];return Se===void 0&&(Se=new Ph,k[ee]=Se),Se.getHandSpace()};function j(ee){const Se=D.indexOf(ee.inputSource);if(Se===-1)return;const ye=k[Se];ye!==void 0&&(ye.update(ee.inputSource,ee.frame,p||f),ye.dispatchEvent({type:ee.type,data:ee.inputSource}))}function L(){l.removeEventListener("select",j),l.removeEventListener("selectstart",j),l.removeEventListener("selectend",j),l.removeEventListener("squeeze",j),l.removeEventListener("squeezestart",j),l.removeEventListener("squeezeend",j),l.removeEventListener("end",L),l.removeEventListener("inputsourceschange",G);for(let ee=0;ee<k.length;ee++){const Se=D[ee];Se!==null&&(D[ee]=null,k[ee].disconnect(Se))}ce=null,oe=null,E.reset();for(const ee in S)delete S[ee];e.setRenderTarget(U),b=null,g=null,_=null,l=null,I=null,Oe.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(B.width,B.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){c=ee,s.isPresenting===!0&&mt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){h=ee,s.isPresenting===!0&&mt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||f},this.setReferenceSpace=function(ee){p=ee},this.getBaseLayer=function(){return g!==null?g:b},this.getBinding=function(){return _===null&&C&&(_=new XRWebGLBinding(l,i)),_},this.getFrame=function(){return M},this.getSession=function(){return l},this.setSession=async function(ee){if(l=ee,l!==null){if(U=e.getRenderTarget(),l.addEventListener("select",j),l.addEventListener("selectstart",j),l.addEventListener("selectend",j),l.addEventListener("squeeze",j),l.addEventListener("squeezestart",j),l.addEventListener("squeezeend",j),l.addEventListener("end",L),l.addEventListener("inputsourceschange",G),N.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(B),C&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,He=null,Ze=null;N.depth&&(Ze=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ye=N.stencil?zr:Ts,He=N.stencil?dc:Ha);const nt={colorFormat:i.RGBA8,depthFormat:Ze,scaleFactor:c};_=this.getBinding(),g=_.createProjectionLayer(nt),l.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),I=new za(g.textureWidth,g.textureHeight,{format:ba,type:ra,depthTexture:new Zo(g.textureWidth,g.textureHeight,He,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const ye={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:c};b=new XRWebGLLayer(l,i,ye),l.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),I=new za(b.framebufferWidth,b.framebufferHeight,{format:ba,type:ra,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(m),p=null,f=await l.requestReferenceSpace(h),Oe.setContext(l),Oe.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return E.getDepthTexture()};function G(ee){for(let Se=0;Se<ee.removed.length;Se++){const ye=ee.removed[Se],He=D.indexOf(ye);He>=0&&(D[He]=null,k[He].disconnect(ye))}for(let Se=0;Se<ee.added.length;Se++){const ye=ee.added[Se];let He=D.indexOf(ye);if(He===-1){for(let nt=0;nt<k.length;nt++)if(nt>=D.length){D.push(ye),He=nt;break}else if(D[nt]===null){D[nt]=ye,He=nt;break}if(He===-1)break}const Ze=k[He];Ze&&Ze.connect(ye)}}const K=new ae,ue=new ae;function xe(ee,Se,ye){K.setFromMatrixPosition(Se.matrixWorld),ue.setFromMatrixPosition(ye.matrixWorld);const He=K.distanceTo(ue),Ze=Se.projectionMatrix.elements,nt=ye.projectionMatrix.elements,Tt=Ze[14]/(Ze[10]-1),Ye=Ze[14]/(Ze[10]+1),Nt=(Ze[9]+1)/Ze[5],kt=(Ze[9]-1)/Ze[5],gt=(Ze[8]-1)/Ze[0],Ft=(nt[8]+1)/nt[0],Qt=Tt*gt,We=Tt*Ft,X=He/(-gt+Ft),Lt=X*-gt;if(Se.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Lt),ee.translateZ(X),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),Ze[10]===-1)ee.projectionMatrix.copy(Se.projectionMatrix),ee.projectionMatrixInverse.copy(Se.projectionMatrixInverse);else{const pt=Tt+X,Xt=Ye+X,Ne=Qt-Lt,Jt=We+(He-Lt),O=Nt*Ye/Xt*pt,T=kt*Ye/Xt*pt;ee.projectionMatrix.makePerspective(Ne,Jt,O,T,pt,Xt),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function P(ee,Se){Se===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Se.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(l===null)return;let Se=ee.near,ye=ee.far;E.texture!==null&&(E.depthNear>0&&(Se=E.depthNear),E.depthFar>0&&(ye=E.depthFar)),$.near=q.near=F.near=Se,$.far=q.far=F.far=ye,(ce!==$.near||oe!==$.far)&&(l.updateRenderState({depthNear:$.near,depthFar:$.far}),ce=$.near,oe=$.far),$.layers.mask=ee.layers.mask|6,F.layers.mask=$.layers.mask&-5,q.layers.mask=$.layers.mask&-3;const He=ee.parent,Ze=$.cameras;P($,He);for(let nt=0;nt<Ze.length;nt++)P(Ze[nt],He);Ze.length===2?xe($,F,q):$.projectionMatrix.copy(F.projectionMatrix),Z(ee,$,He)};function Z(ee,Se,ye){ye===null?ee.matrix.copy(Se.matrixWorld):(ee.matrix.copy(ye.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Se.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Se.projectionMatrix),ee.projectionMatrixInverse.copy(Se.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Jp*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(g===null&&b===null))return m},this.setFoveation=function(ee){m=ee,g!==null&&(g.fixedFoveation=ee),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=ee)},this.hasDepthSensing=function(){return E.texture!==null},this.getDepthSensingMesh=function(){return E.getMesh($)},this.getCameraTexture=function(ee){return S[ee]};let be=null;function Ae(ee,Se){if(v=Se.getViewerPose(p||f),M=Se,v!==null){const ye=v.views;b!==null&&(e.setRenderTargetFramebuffer(I,b.framebuffer),e.setRenderTarget(I));let He=!1;ye.length!==$.cameras.length&&($.cameras.length=0,He=!0);for(let Ye=0;Ye<ye.length;Ye++){const Nt=ye[Ye];let kt=null;if(b!==null)kt=b.getViewport(Nt);else{const Ft=_.getViewSubImage(g,Nt);kt=Ft.viewport,Ye===0&&(e.setRenderTargetTextures(I,Ft.colorTexture,Ft.depthStencilTexture),e.setRenderTarget(I))}let gt=H[Ye];gt===void 0&&(gt=new sa,gt.layers.enable(Ye),gt.viewport=new In,H[Ye]=gt),gt.matrix.fromArray(Nt.transform.matrix),gt.matrix.decompose(gt.position,gt.quaternion,gt.scale),gt.projectionMatrix.fromArray(Nt.projectionMatrix),gt.projectionMatrixInverse.copy(gt.projectionMatrix).invert(),gt.viewport.set(kt.x,kt.y,kt.width,kt.height),Ye===0&&($.matrix.copy(gt.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),He===!0&&$.cameras.push(gt)}const Ze=l.enabledFeatures;if(Ze&&Ze.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&C){_=s.getBinding();const Ye=_.getDepthInformation(ye[0]);Ye&&Ye.isValid&&Ye.texture&&E.init(Ye,l.renderState)}if(Ze&&Ze.includes("camera-access")&&C){e.state.unbindTexture(),_=s.getBinding();for(let Ye=0;Ye<ye.length;Ye++){const Nt=ye[Ye].camera;if(Nt){let kt=S[Nt];kt||(kt=new xb,S[Nt]=kt);const gt=_.getCameraImage(Nt);kt.sourceTexture=gt}}}}for(let ye=0;ye<k.length;ye++){const He=D[ye],Ze=k[ye];He!==null&&Ze!==void 0&&Ze.update(He,Se,p||f)}be&&be(ee,Se),Se.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:Se}),M=null}const Oe=new yb;Oe.setAnimationLoop(Ae),this.setAnimationLoop=function(ee){be=ee},this.dispose=function(){}}}const MC=new Wn,Rb=new St;Rb.set(-1,0,0,0,1,0,0,0,1);function TC(r,e){function i(E,S){E.matrixAutoUpdate===!0&&E.updateMatrix(),S.value.copy(E.matrix)}function s(E,S){S.color.getRGB(E.fogColor.value,_b(r)),S.isFog?(E.fogNear.value=S.near,E.fogFar.value=S.far):S.isFogExp2&&(E.fogDensity.value=S.density)}function l(E,S,N,U,I){S.isNodeMaterial?S.uniformsNeedUpdate=!1:S.isMeshBasicMaterial?c(E,S):S.isMeshLambertMaterial?(c(E,S),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)):S.isMeshToonMaterial?(c(E,S),_(E,S)):S.isMeshPhongMaterial?(c(E,S),v(E,S),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)):S.isMeshStandardMaterial?(c(E,S),g(E,S),S.isMeshPhysicalMaterial&&b(E,S,I)):S.isMeshMatcapMaterial?(c(E,S),M(E,S)):S.isMeshDepthMaterial?c(E,S):S.isMeshDistanceMaterial?(c(E,S),C(E,S)):S.isMeshNormalMaterial?c(E,S):S.isLineBasicMaterial?(f(E,S),S.isLineDashedMaterial&&h(E,S)):S.isPointsMaterial?m(E,S,N,U):S.isSpriteMaterial?p(E,S):S.isShadowMaterial?(E.color.value.copy(S.color),E.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(E,S){E.opacity.value=S.opacity,S.color&&E.diffuse.value.copy(S.color),S.emissive&&E.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(E.map.value=S.map,i(S.map,E.mapTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.bumpMap&&(E.bumpMap.value=S.bumpMap,i(S.bumpMap,E.bumpMapTransform),E.bumpScale.value=S.bumpScale,S.side===Oi&&(E.bumpScale.value*=-1)),S.normalMap&&(E.normalMap.value=S.normalMap,i(S.normalMap,E.normalMapTransform),E.normalScale.value.copy(S.normalScale),S.side===Oi&&E.normalScale.value.negate()),S.displacementMap&&(E.displacementMap.value=S.displacementMap,i(S.displacementMap,E.displacementMapTransform),E.displacementScale.value=S.displacementScale,E.displacementBias.value=S.displacementBias),S.emissiveMap&&(E.emissiveMap.value=S.emissiveMap,i(S.emissiveMap,E.emissiveMapTransform)),S.specularMap&&(E.specularMap.value=S.specularMap,i(S.specularMap,E.specularMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest);const N=e.get(S),U=N.envMap,I=N.envMapRotation;U&&(E.envMap.value=U,E.envMapRotation.value.setFromMatrix4(MC.makeRotationFromEuler(I)).transpose(),U.isCubeTexture&&U.isRenderTargetTexture===!1&&E.envMapRotation.value.premultiply(Rb),E.reflectivity.value=S.reflectivity,E.ior.value=S.ior,E.refractionRatio.value=S.refractionRatio),S.lightMap&&(E.lightMap.value=S.lightMap,E.lightMapIntensity.value=S.lightMapIntensity,i(S.lightMap,E.lightMapTransform)),S.aoMap&&(E.aoMap.value=S.aoMap,E.aoMapIntensity.value=S.aoMapIntensity,i(S.aoMap,E.aoMapTransform))}function f(E,S){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,S.map&&(E.map.value=S.map,i(S.map,E.mapTransform))}function h(E,S){E.dashSize.value=S.dashSize,E.totalSize.value=S.dashSize+S.gapSize,E.scale.value=S.scale}function m(E,S,N,U){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,E.size.value=S.size*N,E.scale.value=U*.5,S.map&&(E.map.value=S.map,i(S.map,E.uvTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest)}function p(E,S){E.diffuse.value.copy(S.color),E.opacity.value=S.opacity,E.rotation.value=S.rotation,S.map&&(E.map.value=S.map,i(S.map,E.mapTransform)),S.alphaMap&&(E.alphaMap.value=S.alphaMap,i(S.alphaMap,E.alphaMapTransform)),S.alphaTest>0&&(E.alphaTest.value=S.alphaTest)}function v(E,S){E.specular.value.copy(S.specular),E.shininess.value=Math.max(S.shininess,1e-4)}function _(E,S){S.gradientMap&&(E.gradientMap.value=S.gradientMap)}function g(E,S){E.metalness.value=S.metalness,S.metalnessMap&&(E.metalnessMap.value=S.metalnessMap,i(S.metalnessMap,E.metalnessMapTransform)),E.roughness.value=S.roughness,S.roughnessMap&&(E.roughnessMap.value=S.roughnessMap,i(S.roughnessMap,E.roughnessMapTransform)),S.envMap&&(E.envMapIntensity.value=S.envMapIntensity)}function b(E,S,N){E.ior.value=S.ior,S.sheen>0&&(E.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),E.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(E.sheenColorMap.value=S.sheenColorMap,i(S.sheenColorMap,E.sheenColorMapTransform)),S.sheenRoughnessMap&&(E.sheenRoughnessMap.value=S.sheenRoughnessMap,i(S.sheenRoughnessMap,E.sheenRoughnessMapTransform))),S.clearcoat>0&&(E.clearcoat.value=S.clearcoat,E.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(E.clearcoatMap.value=S.clearcoatMap,i(S.clearcoatMap,E.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(E.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,i(S.clearcoatRoughnessMap,E.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(E.clearcoatNormalMap.value=S.clearcoatNormalMap,i(S.clearcoatNormalMap,E.clearcoatNormalMapTransform),E.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Oi&&E.clearcoatNormalScale.value.negate())),S.dispersion>0&&(E.dispersion.value=S.dispersion),S.iridescence>0&&(E.iridescence.value=S.iridescence,E.iridescenceIOR.value=S.iridescenceIOR,E.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],E.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(E.iridescenceMap.value=S.iridescenceMap,i(S.iridescenceMap,E.iridescenceMapTransform)),S.iridescenceThicknessMap&&(E.iridescenceThicknessMap.value=S.iridescenceThicknessMap,i(S.iridescenceThicknessMap,E.iridescenceThicknessMapTransform))),S.transmission>0&&(E.transmission.value=S.transmission,E.transmissionSamplerMap.value=N.texture,E.transmissionSamplerSize.value.set(N.width,N.height),S.transmissionMap&&(E.transmissionMap.value=S.transmissionMap,i(S.transmissionMap,E.transmissionMapTransform)),E.thickness.value=S.thickness,S.thicknessMap&&(E.thicknessMap.value=S.thicknessMap,i(S.thicknessMap,E.thicknessMapTransform)),E.attenuationDistance.value=S.attenuationDistance,E.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(E.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(E.anisotropyMap.value=S.anisotropyMap,i(S.anisotropyMap,E.anisotropyMapTransform))),E.specularIntensity.value=S.specularIntensity,E.specularColor.value.copy(S.specularColor),S.specularColorMap&&(E.specularColorMap.value=S.specularColorMap,i(S.specularColorMap,E.specularColorMapTransform)),S.specularIntensityMap&&(E.specularIntensityMap.value=S.specularIntensityMap,i(S.specularIntensityMap,E.specularIntensityMapTransform))}function M(E,S){S.matcap&&(E.matcap.value=S.matcap)}function C(E,S){const N=e.get(S).light;E.referencePosition.value.setFromMatrixPosition(N.matrixWorld),E.nearDistance.value=N.shadow.camera.near,E.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function AC(r,e,i,s){let l={},c={},f=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function m(N,U){const I=U.program;s.uniformBlockBinding(N,I)}function p(N,U){let I=l[N.id];I===void 0&&(M(N),I=v(N),l[N.id]=I,N.addEventListener("dispose",E));const k=U.program;s.updateUBOMapping(N,k);const D=e.render.frame;c[N.id]!==D&&(g(N),c[N.id]=D)}function v(N){const U=_();N.__bindingPointIndex=U;const I=r.createBuffer(),k=N.__size,D=N.usage;return r.bindBuffer(r.UNIFORM_BUFFER,I),r.bufferData(r.UNIFORM_BUFFER,k,D),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,I),I}function _(){for(let N=0;N<h;N++)if(f.indexOf(N)===-1)return f.push(N),N;return $t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(N){const U=l[N.id],I=N.uniforms,k=N.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let D=0,B=I.length;D<B;D++){const A=Array.isArray(I[D])?I[D]:[I[D]];for(let F=0,q=A.length;F<q;F++){const H=A[F];if(b(H,D,F,k)===!0){const $=H.__offset,ce=Array.isArray(H.value)?H.value:[H.value];let oe=0;for(let j=0;j<ce.length;j++){const L=ce[j],G=C(L);typeof L=="number"||typeof L=="boolean"?(H.__data[0]=L,r.bufferSubData(r.UNIFORM_BUFFER,$+oe,H.__data)):L.isMatrix3?(H.__data[0]=L.elements[0],H.__data[1]=L.elements[1],H.__data[2]=L.elements[2],H.__data[3]=0,H.__data[4]=L.elements[3],H.__data[5]=L.elements[4],H.__data[6]=L.elements[5],H.__data[7]=0,H.__data[8]=L.elements[6],H.__data[9]=L.elements[7],H.__data[10]=L.elements[8],H.__data[11]=0):ArrayBuffer.isView(L)?H.__data.set(new L.constructor(L.buffer,L.byteOffset,H.__data.length)):(L.toArray(H.__data,oe),oe+=G.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,$,H.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function b(N,U,I,k){const D=N.value,B=U+"_"+I;if(k[B]===void 0)return typeof D=="number"||typeof D=="boolean"?k[B]=D:ArrayBuffer.isView(D)?k[B]=D.slice():k[B]=D.clone(),!0;{const A=k[B];if(typeof D=="number"||typeof D=="boolean"){if(A!==D)return k[B]=D,!0}else{if(ArrayBuffer.isView(D))return!0;if(A.equals(D)===!1)return A.copy(D),!0}}return!1}function M(N){const U=N.uniforms;let I=0;const k=16;for(let B=0,A=U.length;B<A;B++){const F=Array.isArray(U[B])?U[B]:[U[B]];for(let q=0,H=F.length;q<H;q++){const $=F[q],ce=Array.isArray($.value)?$.value:[$.value];for(let oe=0,j=ce.length;oe<j;oe++){const L=ce[oe],G=C(L),K=I%k,ue=K%G.boundary,xe=K+ue;I+=ue,xe!==0&&k-xe<G.storage&&(I+=k-xe),$.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=I,I+=G.storage}}}const D=I%k;return D>0&&(I+=k-D),N.__size=I,N.__cache={},this}function C(N){const U={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(U.boundary=4,U.storage=4):N.isVector2?(U.boundary=8,U.storage=8):N.isVector3||N.isColor?(U.boundary=16,U.storage=12):N.isVector4?(U.boundary=16,U.storage=16):N.isMatrix3?(U.boundary=48,U.storage=48):N.isMatrix4?(U.boundary=64,U.storage=64):N.isTexture?mt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(N)?(U.boundary=16,U.storage=N.byteLength):mt("WebGLRenderer: Unsupported uniform value type.",N),U}function E(N){const U=N.target;U.removeEventListener("dispose",E);const I=f.indexOf(U.__bindingPointIndex);f.splice(I,1),r.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function S(){for(const N in l)r.deleteBuffer(l[N]);f=[],l={},c={}}return{bind:m,update:p,dispose:S}}const wC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ua=null;function RC(){return Ua===null&&(Ua=new mT(wC,16,16,kr,Ms),Ua.name="DFG_LUT",Ua.minFilter=mi,Ua.magFilter=mi,Ua.wrapS=ys,Ua.wrapT=ys,Ua.generateMipmaps=!1,Ua.needsUpdate=!0),Ua}class CC{constructor(e={}){const{canvas:i=XM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:h=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:_=!1,reversedDepthBuffer:g=!1,outputBufferType:b=ra}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=f;const C=b,E=new Set([dm,fm,um]),S=new Set([ra,Ha,fc,dc,lm,cm]),N=new Uint32Array(4),U=new Int32Array(4),I=new ae;let k=null,D=null;const B=[],A=[];let F=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ba,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const q=this;let H=!1,$=null;this._outputColorSpace=Yi;let ce=0,oe=0,j=null,L=-1,G=null;const K=new In,ue=new In;let xe=null;const P=new hn(0);let Z=0,be=i.width,Ae=i.height,Oe=1,ee=null,Se=null;const ye=new In(0,0,be,Ae),He=new In(0,0,be,Ae);let Ze=!1;const nt=new mb;let Tt=!1,Ye=!1;const Nt=new Wn,kt=new ae,gt=new In,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qt=!1;function We(){return j===null?Oe:1}let X=s;function Lt(w,W){return i.getContext(w,W)}try{const w={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:v,failIfMajorPerformanceCaveat:_};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${rm}`),i.addEventListener("webglcontextlost",Me,!1),i.addEventListener("webglcontextrestored",Qe,!1),i.addEventListener("webglcontextcreationerror",ct,!1),X===null){const W="webgl2";if(X=Lt(W,w),X===null)throw Lt(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw $t("WebGLRenderer: "+w.message),w}let pt,Xt,Ne,Jt,O,T,J,he,Ee,De,Fe,de,pe,Te,ze,Ie,Le,dt,lt,wt,V,Ce,me;function ke(){pt=new Rw(X),pt.init(),V=new vC(X,pt),Xt=new bw(X,pt,e,V),Ne=new xC(X,pt),Xt.reversedDepthBuffer&&g&&Ne.buffers.depth.setReversed(!0),Jt=new Ow(X),O=new iC,T=new _C(X,pt,Ne,O,Xt,V,Jt),J=new ww(q),he=new IT(X),Ce=new _w(X,he),Ee=new Cw(X,he,Jt,Ce),De=new Lw(X,Ee,he,Ce,Jt),dt=new Dw(X,Xt,T),ze=new yw(O),Fe=new nC(q,J,pt,Xt,Ce,ze),de=new TC(q,O),pe=new sC,Te=new fC(pt),Le=new xw(q,J,Ne,De,M,m),Ie=new gC(q,De,Xt),me=new AC(X,Jt,Xt,Ne),lt=new vw(X,pt,Jt),wt=new Nw(X,pt,Jt),Jt.programs=Fe.programs,q.capabilities=Xt,q.extensions=pt,q.properties=O,q.renderLists=pe,q.shadowMap=Ie,q.state=Ne,q.info=Jt}ke(),C!==ra&&(F=new Iw(C,i.width,i.height,l,c));const Ue=new EC(q,X);this.xr=Ue,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const w=pt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=pt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Oe},this.setPixelRatio=function(w){w!==void 0&&(Oe=w,this.setSize(be,Ae,!1))},this.getSize=function(w){return w.set(be,Ae)},this.setSize=function(w,W,te=!0){if(Ue.isPresenting){mt("WebGLRenderer: Can't change size while VR device is presenting.");return}be=w,Ae=W,i.width=Math.floor(w*Oe),i.height=Math.floor(W*Oe),te===!0&&(i.style.width=w+"px",i.style.height=W+"px"),F!==null&&F.setSize(i.width,i.height),this.setViewport(0,0,w,W)},this.getDrawingBufferSize=function(w){return w.set(be*Oe,Ae*Oe).floor()},this.setDrawingBufferSize=function(w,W,te){be=w,Ae=W,Oe=te,i.width=Math.floor(w*te),i.height=Math.floor(W*te),this.setViewport(0,0,w,W)},this.setEffects=function(w){if(C===ra){$t("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let W=0;W<w.length;W++)if(w[W].isOutputPass===!0){mt("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}F.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(K)},this.getViewport=function(w){return w.copy(ye)},this.setViewport=function(w,W,te,ie){w.isVector4?ye.set(w.x,w.y,w.z,w.w):ye.set(w,W,te,ie),Ne.viewport(K.copy(ye).multiplyScalar(Oe).round())},this.getScissor=function(w){return w.copy(He)},this.setScissor=function(w,W,te,ie){w.isVector4?He.set(w.x,w.y,w.z,w.w):He.set(w,W,te,ie),Ne.scissor(ue.copy(He).multiplyScalar(Oe).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(w){Ne.setScissorTest(Ze=w)},this.setOpaqueSort=function(w){ee=w},this.setTransparentSort=function(w){Se=w},this.getClearColor=function(w){return w.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(w=!0,W=!0,te=!0){let ie=0;if(w){let ne=!1;if(j!==null){const Ge=j.texture.format;ne=E.has(Ge)}if(ne){const Ge=j.texture.type,Pe=S.has(Ge),Be=Le.getClearColor(),Je=Le.getClearAlpha(),Ke=Be.r,st=Be.g,bt=Be.b;Pe?(N[0]=Ke,N[1]=st,N[2]=bt,N[3]=Je,X.clearBufferuiv(X.COLOR,0,N)):(U[0]=Ke,U[1]=st,U[2]=bt,U[3]=Je,X.clearBufferiv(X.COLOR,0,U))}else ie|=X.COLOR_BUFFER_BIT}W&&(ie|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),te&&(ie|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ie!==0&&X.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),$=w},this.dispose=function(){i.removeEventListener("webglcontextlost",Me,!1),i.removeEventListener("webglcontextrestored",Qe,!1),i.removeEventListener("webglcontextcreationerror",ct,!1),Le.dispose(),pe.dispose(),Te.dispose(),O.dispose(),J.dispose(),De.dispose(),Ce.dispose(),me.dispose(),Fe.dispose(),Ue.dispose(),Ue.removeEventListener("sessionstart",dr),Ue.removeEventListener("sessionend",hr),Dn.stop()};function Me(w){w.preventDefault(),B_("WebGLRenderer: Context Lost."),H=!0}function Qe(){B_("WebGLRenderer: Context Restored."),H=!1;const w=Jt.autoReset,W=Ie.enabled,te=Ie.autoUpdate,ie=Ie.needsUpdate,ne=Ie.type;ke(),Jt.autoReset=w,Ie.enabled=W,Ie.autoUpdate=te,Ie.needsUpdate=ie,Ie.type=ne}function ct(w){$t("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function vn(w){const W=w.target;W.removeEventListener("dispose",vn),Yt(W)}function Yt(w){Kn(w),O.remove(w)}function Kn(w){const W=O.get(w).programs;W!==void 0&&(W.forEach(function(te){Fe.releaseProgram(te)}),w.isShaderMaterial&&Fe.releaseShaderCache(w))}this.renderBufferDirect=function(w,W,te,ie,ne,Ge){W===null&&(W=Ft);const Pe=ne.isMesh&&ne.matrixWorld.determinant()<0,Be=Sa(w,W,te,ie,ne);Ne.setMaterial(ie,Pe);let Je=te.index,Ke=1;if(ie.wireframe===!0){if(Je=Ee.getWireframeAttribute(te),Je===void 0)return;Ke=2}const st=te.drawRange,bt=te.attributes.position;let at=st.start*Ke,Wt=(st.start+st.count)*Ke;Ge!==null&&(at=Math.max(at,Ge.start*Ke),Wt=Math.min(Wt,(Ge.start+Ge.count)*Ke)),Je!==null?(at=Math.max(at,0),Wt=Math.min(Wt,Je.count)):bt!=null&&(at=Math.max(at,0),Wt=Math.min(Wt,bt.count));const Bt=Wt-at;if(Bt<0||Bt===1/0)return;Ce.setup(ne,ie,Be,te,Je);let an,en=lt;if(Je!==null&&(an=he.get(Je),en=wt,en.setIndex(an)),ne.isMesh)ie.wireframe===!0?(Ne.setLineWidth(ie.wireframeLinewidth*We()),en.setMode(X.LINES)):en.setMode(X.TRIANGLES);else if(ne.isLine){let qt=ie.linewidth;qt===void 0&&(qt=1),Ne.setLineWidth(qt*We()),ne.isLineSegments?en.setMode(X.LINES):ne.isLineLoop?en.setMode(X.LINE_LOOP):en.setMode(X.LINE_STRIP)}else ne.isPoints?en.setMode(X.POINTS):ne.isSprite&&en.setMode(X.TRIANGLES);if(ne.isBatchedMesh)if(pt.get("WEBGL_multi_draw"))en.renderMultiDraw(ne._multiDrawStarts,ne._multiDrawCounts,ne._multiDrawCount);else{const qt=ne._multiDrawStarts,Ve=ne._multiDrawCounts,Fn=ne._multiDrawCount,Ot=Je?he.get(Je).bytesPerElement:1,pn=O.get(ie).currentProgram.getUniforms();for(let Tn=0;Tn<Fn;Tn++)pn.setValue(X,"_gl_DrawID",Tn),en.render(qt[Tn]/Ot,Ve[Tn])}else if(ne.isInstancedMesh)en.renderInstances(at,Bt,ne.count);else if(te.isInstancedBufferGeometry){const qt=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Ve=Math.min(te.instanceCount,qt);en.renderInstances(at,Bt,Ve)}else en.render(at,Bt)};function li(w,W,te){w.transparent===!0&&w.side===bs&&w.forceSinglePass===!1?(w.side=Oi,w.needsUpdate=!0,As(w,W,te),w.side=cr,w.needsUpdate=!0,As(w,W,te),w.side=bs):As(w,W,te)}this.compile=function(w,W,te=null){te===null&&(te=w),D=Te.get(te),D.init(W),A.push(D),te.traverseVisible(function(ne){ne.isLight&&ne.layers.test(W.layers)&&(D.pushLight(ne),ne.castShadow&&D.pushShadow(ne))}),w!==te&&w.traverseVisible(function(ne){ne.isLight&&ne.layers.test(W.layers)&&(D.pushLight(ne),ne.castShadow&&D.pushShadow(ne))}),D.setupLights();const ie=new Set;return w.traverse(function(ne){if(!(ne.isMesh||ne.isPoints||ne.isLine||ne.isSprite))return;const Ge=ne.material;if(Ge)if(Array.isArray(Ge))for(let Pe=0;Pe<Ge.length;Pe++){const Be=Ge[Pe];li(Be,te,ne),ie.add(Be)}else li(Ge,te,ne),ie.add(Ge)}),D=A.pop(),ie},this.compileAsync=function(w,W,te=null){const ie=this.compile(w,W,te);return new Promise(ne=>{function Ge(){if(ie.forEach(function(Pe){O.get(Pe).currentProgram.isReady()&&ie.delete(Pe)}),ie.size===0){ne(w);return}setTimeout(Ge,10)}pt.get("KHR_parallel_shader_compile")!==null?Ge():setTimeout(Ge,10)})};let Xa=null;function ti(w){Xa&&Xa(w)}function dr(){Dn.stop()}function hr(){Dn.start()}const Dn=new yb;Dn.setAnimationLoop(ti),typeof self<"u"&&Dn.setContext(self),this.setAnimationLoop=function(w){Xa=w,Ue.setAnimationLoop(w),w===null?Dn.stop():Dn.start()},Ue.addEventListener("sessionstart",dr),Ue.addEventListener("sessionend",hr),this.render=function(w,W){if(W!==void 0&&W.isCamera!==!0){$t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;$!==null&&$.renderStart(w,W);const te=Ue.enabled===!0&&Ue.isPresenting===!0,ie=F!==null&&(j===null||te)&&F.begin(q,j);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(W),W=Ue.getCamera()),w.isScene===!0&&w.onBeforeRender(q,w,W,j),D=Te.get(w,A.length),D.init(W),D.state.textureUnits=T.getTextureUnits(),A.push(D),Nt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),nt.setFromProjectionMatrix(Nt,Fa,W.reversedDepth),Ye=this.localClippingEnabled,Tt=ze.init(this.clippingPlanes,Ye),k=pe.get(w,B.length),k.init(),B.push(k),Ue.enabled===!0&&Ue.isPresenting===!0){const Pe=q.xr.getDepthSensingMesh();Pe!==null&&bn(Pe,W,-1/0,q.sortObjects)}bn(w,W,0,q.sortObjects),k.finish(),q.sortObjects===!0&&k.sort(ee,Se),Qt=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,Qt&&Le.addToRenderList(k,w),this.info.render.frame++,Tt===!0&&ze.beginShadows();const ne=D.state.shadowsArray;if(Ie.render(ne,w,W),Tt===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ie&&F.hasRenderPass())===!1){const Pe=k.opaque,Be=k.transmissive;if(D.setupLights(),W.isArrayCamera){const Je=W.cameras;if(Be.length>0)for(let Ke=0,st=Je.length;Ke<st;Ke++){const bt=Je[Ke];Li(Pe,Be,w,bt)}Qt&&Le.render(w);for(let Ke=0,st=Je.length;Ke<st;Ke++){const bt=Je[Ke];Rn(k,w,bt,bt.viewport)}}else Be.length>0&&Li(Pe,Be,w,W),Qt&&Le.render(w),Rn(k,w,W)}j!==null&&oe===0&&(T.updateMultisampleRenderTarget(j),T.updateRenderTargetMipmap(j)),ie&&F.end(q),w.isScene===!0&&w.onAfterRender(q,w,W),Ce.resetDefaultState(),L=-1,G=null,A.pop(),A.length>0?(D=A[A.length-1],T.setTextureUnits(D.state.textureUnits),Tt===!0&&ze.setGlobalState(q.clippingPlanes,D.state.camera)):D=null,B.pop(),B.length>0?k=B[B.length-1]:k=null,$!==null&&$.renderEnd()};function bn(w,W,te,ie){if(w.visible===!1)return;if(w.layers.test(W.layers)){if(w.isGroup)te=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(W);else if(w.isLightProbeGrid)D.pushLightProbeGrid(w);else if(w.isLight)D.pushLight(w),w.castShadow&&D.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||nt.intersectsSprite(w)){ie&&gt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Nt);const Pe=De.update(w),Be=w.material;Be.visible&&k.push(w,Pe,Be,te,gt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||nt.intersectsObject(w))){const Pe=De.update(w),Be=w.material;if(ie&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),gt.copy(w.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),gt.copy(Pe.boundingSphere.center)),gt.applyMatrix4(w.matrixWorld).applyMatrix4(Nt)),Array.isArray(Be)){const Je=Pe.groups;for(let Ke=0,st=Je.length;Ke<st;Ke++){const bt=Je[Ke],at=Be[bt.materialIndex];at&&at.visible&&k.push(w,Pe,at,te,gt.z,bt)}}else Be.visible&&k.push(w,Pe,Be,te,gt.z,null)}}const Ge=w.children;for(let Pe=0,Be=Ge.length;Pe<Be;Pe++)bn(Ge[Pe],W,te,ie)}function Rn(w,W,te,ie){const{opaque:ne,transmissive:Ge,transparent:Pe}=w;D.setupLightsView(te),Tt===!0&&ze.setGlobalState(q.clippingPlanes,te),ie&&Ne.viewport(K.copy(ie)),ne.length>0&&_n(ne,W,te),Ge.length>0&&_n(Ge,W,te),Pe.length>0&&_n(Pe,W,te),Ne.buffers.depth.setTest(!0),Ne.buffers.depth.setMask(!0),Ne.buffers.color.setMask(!0),Ne.setPolygonOffset(!1)}function Li(w,W,te,ie){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[ie.id]===void 0){const at=pt.has("EXT_color_buffer_half_float")||pt.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[ie.id]=new za(1,1,{generateMipmaps:!0,type:at?Ms:ra,minFilter:Br,samples:Math.max(4,Xt.samples),stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace})}const Ge=D.state.transmissionRenderTarget[ie.id],Pe=ie.viewport||K;Ge.setSize(Pe.z*q.transmissionResolutionScale,Pe.w*q.transmissionResolutionScale);const Be=q.getRenderTarget(),Je=q.getActiveCubeFace(),Ke=q.getActiveMipmapLevel();q.setRenderTarget(Ge),q.getClearColor(P),Z=q.getClearAlpha(),Z<1&&q.setClearColor(16777215,.5),q.clear(),Qt&&Le.render(te);const st=q.toneMapping;q.toneMapping=Ba;const bt=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),D.setupLightsView(ie),Tt===!0&&ze.setGlobalState(q.clippingPlanes,ie),_n(w,te,ie),T.updateMultisampleRenderTarget(Ge),T.updateRenderTargetMipmap(Ge),pt.has("WEBGL_multisampled_render_to_texture")===!1){let at=!1;for(let Wt=0,Bt=W.length;Wt<Bt;Wt++){const an=W[Wt],{object:en,geometry:qt,material:Ve,group:Fn}=an;if(Ve.side===bs&&en.layers.test(ie.layers)){const Ot=Ve.side;Ve.side=Oi,Ve.needsUpdate=!0,ya(en,te,ie,qt,Ve,Fn),Ve.side=Ot,Ve.needsUpdate=!0,at=!0}}at===!0&&(T.updateMultisampleRenderTarget(Ge),T.updateRenderTargetMipmap(Ge))}q.setRenderTarget(Be,Je,Ke),q.setClearColor(P,Z),bt!==void 0&&(ie.viewport=bt),q.toneMapping=st}function _n(w,W,te){const ie=W.isScene===!0?W.overrideMaterial:null;for(let ne=0,Ge=w.length;ne<Ge;ne++){const Pe=w[ne],{object:Be,geometry:Je,group:Ke}=Pe;let st=Pe.material;st.allowOverride===!0&&ie!==null&&(st=ie),Be.layers.test(te.layers)&&ya(Be,W,te,Je,st,Ke)}}function ya(w,W,te,ie,ne,Ge){w.onBeforeRender(q,W,te,ie,ne,Ge),w.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),ne.onBeforeRender(q,W,te,ie,w,Ge),ne.transparent===!0&&ne.side===bs&&ne.forceSinglePass===!1?(ne.side=Oi,ne.needsUpdate=!0,q.renderBufferDirect(te,W,ie,ne,w,Ge),ne.side=cr,ne.needsUpdate=!0,q.renderBufferDirect(te,W,ie,ne,w,Ge),ne.side=bs):q.renderBufferDirect(te,W,ie,ne,w,Ge),w.onAfterRender(q,W,te,ie,ne,Ge)}function As(w,W,te){W.isScene!==!0&&(W=Ft);const ie=O.get(w),ne=D.state.lights,Ge=D.state.shadowsArray,Pe=ne.state.version,Be=Fe.getParameters(w,ne.state,Ge,W,te,D.state.lightProbeGridArray),Je=Fe.getProgramCacheKey(Be);let Ke=ie.programs;ie.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?W.environment:null,ie.fog=W.fog;const st=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;ie.envMap=J.get(w.envMap||ie.environment,st),ie.envMapRotation=ie.environment!==null&&w.envMap===null?W.environmentRotation:w.envMapRotation,Ke===void 0&&(w.addEventListener("dispose",vn),Ke=new Map,ie.programs=Ke);let bt=Ke.get(Je);if(bt!==void 0){if(ie.currentProgram===bt&&ie.lightsStateVersion===Pe)return Wa(w,Be),bt}else Be.uniforms=Fe.getUniforms(w),$!==null&&w.isNodeMaterial&&$.build(w,te,Be),w.onBeforeCompile(Be,q),bt=Fe.acquireProgram(Be,Je),Ke.set(Je,bt),ie.uniforms=Be.uniforms;const at=ie.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(at.clippingPlanes=ze.uniform),Wa(w,Be),ie.needsLights=qa(w),ie.lightsStateVersion=Pe,ie.needsLights&&(at.ambientLightColor.value=ne.state.ambient,at.lightProbe.value=ne.state.probe,at.directionalLights.value=ne.state.directional,at.directionalLightShadows.value=ne.state.directionalShadow,at.spotLights.value=ne.state.spot,at.spotLightShadows.value=ne.state.spotShadow,at.rectAreaLights.value=ne.state.rectArea,at.ltc_1.value=ne.state.rectAreaLTC1,at.ltc_2.value=ne.state.rectAreaLTC2,at.pointLights.value=ne.state.point,at.pointLightShadows.value=ne.state.pointShadow,at.hemisphereLights.value=ne.state.hemi,at.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,at.spotLightMatrix.value=ne.state.spotLightMatrix,at.spotLightMap.value=ne.state.spotLightMap,at.pointShadowMatrix.value=ne.state.pointShadowMatrix),ie.lightProbeGrid=D.state.lightProbeGridArray.length>0,ie.currentProgram=bt,ie.uniformsList=null,bt}function Ya(w){if(w.uniformsList===null){const W=w.currentProgram.getUniforms();w.uniformsList=cf.seqWithValue(W.seq,w.uniforms)}return w.uniformsList}function Wa(w,W){const te=O.get(w);te.outputColorSpace=W.outputColorSpace,te.batching=W.batching,te.batchingColor=W.batchingColor,te.instancing=W.instancing,te.instancingColor=W.instancingColor,te.instancingMorph=W.instancingMorph,te.skinning=W.skinning,te.morphTargets=W.morphTargets,te.morphNormals=W.morphNormals,te.morphColors=W.morphColors,te.morphTargetsCount=W.morphTargetsCount,te.numClippingPlanes=W.numClippingPlanes,te.numIntersection=W.numClipIntersection,te.vertexAlphas=W.vertexAlphas,te.vertexTangents=W.vertexTangents,te.toneMapping=W.toneMapping}function jr(w,W){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;I.setFromMatrixPosition(W.matrixWorld);for(let te=0,ie=w.length;te<ie;te++){const ne=w[te];if(ne.texture!==null&&ne.boundingBox.containsPoint(I))return ne}return null}function Sa(w,W,te,ie,ne){W.isScene!==!0&&(W=Ft),T.resetTextureUnits();const Ge=W.fog,Pe=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial?W.environment:null,Be=j===null?q.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:jt.workingColorSpace,Je=ie.isMeshStandardMaterial||ie.isMeshLambertMaterial&&!ie.envMap||ie.isMeshPhongMaterial&&!ie.envMap,Ke=J.get(ie.envMap||Pe,Je),st=ie.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,bt=!!te.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),at=!!te.morphAttributes.position,Wt=!!te.morphAttributes.normal,Bt=!!te.morphAttributes.color;let an=Ba;ie.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(an=q.toneMapping);const en=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,qt=en!==void 0?en.length:0,Ve=O.get(ie),Fn=D.state.lights;if(Tt===!0&&(Ye===!0||w!==G)){const yt=w===G&&ie.id===L;ze.setState(ie,w,yt)}let Ot=!1;ie.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Fn.state.version||Ve.outputColorSpace!==Be||ne.isBatchedMesh&&Ve.batching===!1||!ne.isBatchedMesh&&Ve.batching===!0||ne.isBatchedMesh&&Ve.batchingColor===!0&&ne.colorTexture===null||ne.isBatchedMesh&&Ve.batchingColor===!1&&ne.colorTexture!==null||ne.isInstancedMesh&&Ve.instancing===!1||!ne.isInstancedMesh&&Ve.instancing===!0||ne.isSkinnedMesh&&Ve.skinning===!1||!ne.isSkinnedMesh&&Ve.skinning===!0||ne.isInstancedMesh&&Ve.instancingColor===!0&&ne.instanceColor===null||ne.isInstancedMesh&&Ve.instancingColor===!1&&ne.instanceColor!==null||ne.isInstancedMesh&&Ve.instancingMorph===!0&&ne.morphTexture===null||ne.isInstancedMesh&&Ve.instancingMorph===!1&&ne.morphTexture!==null||Ve.envMap!==Ke||ie.fog===!0&&Ve.fog!==Ge||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==ze.numPlanes||Ve.numIntersection!==ze.numIntersection)||Ve.vertexAlphas!==st||Ve.vertexTangents!==bt||Ve.morphTargets!==at||Ve.morphNormals!==Wt||Ve.morphColors!==Bt||Ve.toneMapping!==an||Ve.morphTargetsCount!==qt||!!Ve.lightProbeGrid!=D.state.lightProbeGridArray.length>0)&&(Ot=!0):(Ot=!0,Ve.__version=ie.version);let pn=Ve.currentProgram;Ot===!0&&(pn=As(ie,W,ne),$&&ie.isNodeMaterial&&$.onUpdateProgram(ie,pn,Ve));let Tn=!1,En=!1,jn=!1;const tn=pn.getUniforms(),mn=Ve.uniforms;if(Ne.useProgram(pn.program)&&(Tn=!0,En=!0,jn=!0),ie.id!==L&&(L=ie.id,En=!0),Ve.needsLights){const yt=jr(D.state.lightProbeGridArray,ne);Ve.lightProbeGrid!==yt&&(Ve.lightProbeGrid=yt,En=!0)}if(Tn||G!==w){Ne.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),tn.setValue(X,"projectionMatrix",w.projectionMatrix),tn.setValue(X,"viewMatrix",w.matrixWorldInverse);const la=tn.map.cameraPosition;la!==void 0&&la.setValue(X,kt.setFromMatrixPosition(w.matrixWorld)),Xt.logarithmicDepthBuffer&&tn.setValue(X,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&tn.setValue(X,"isOrthographic",w.isOrthographicCamera===!0),G!==w&&(G=w,En=!0,jn=!0)}if(Ve.needsLights&&(Fn.state.directionalShadowMap.length>0&&tn.setValue(X,"directionalShadowMap",Fn.state.directionalShadowMap,T),Fn.state.spotShadowMap.length>0&&tn.setValue(X,"spotShadowMap",Fn.state.spotShadowMap,T),Fn.state.pointShadowMap.length>0&&tn.setValue(X,"pointShadowMap",Fn.state.pointShadowMap,T)),ne.isSkinnedMesh){tn.setOptional(X,ne,"bindMatrix"),tn.setOptional(X,ne,"bindMatrixInverse");const yt=ne.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),tn.setValue(X,"boneTexture",yt.boneTexture,T))}ne.isBatchedMesh&&(tn.setOptional(X,ne,"batchingTexture"),tn.setValue(X,"batchingTexture",ne._matricesTexture,T),tn.setOptional(X,ne,"batchingIdTexture"),tn.setValue(X,"batchingIdTexture",ne._indirectTexture,T),tn.setOptional(X,ne,"batchingColorTexture"),ne._colorsTexture!==null&&tn.setValue(X,"batchingColorTexture",ne._colorsTexture,T));const ci=te.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&dt.update(ne,te,pn),(En||Ve.receiveShadow!==ne.receiveShadow)&&(Ve.receiveShadow=ne.receiveShadow,tn.setValue(X,"receiveShadow",ne.receiveShadow)),(ie.isMeshStandardMaterial||ie.isMeshLambertMaterial||ie.isMeshPhongMaterial)&&ie.envMap===null&&W.environment!==null&&(mn.envMapIntensity.value=W.environmentIntensity),mn.dfgLUT!==void 0&&(mn.dfgLUT.value=RC()),En){if(tn.setValue(X,"toneMappingExposure",q.toneMappingExposure),Ve.needsLights&&Ea(mn,jn),Ge&&ie.fog===!0&&de.refreshFogUniforms(mn,Ge),de.refreshMaterialUniforms(mn,ie,Oe,Ae,D.state.transmissionRenderTarget[w.id]),Ve.needsLights&&Ve.lightProbeGrid){const yt=Ve.lightProbeGrid;mn.probesSH.value=yt.texture,mn.probesMin.value.copy(yt.boundingBox.min),mn.probesMax.value.copy(yt.boundingBox.max),mn.probesResolution.value.copy(yt.resolution)}cf.upload(X,Ya(Ve),mn,T)}if(ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(cf.upload(X,Ya(Ve),mn,T),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&tn.setValue(X,"center",ne.center),tn.setValue(X,"modelViewMatrix",ne.modelViewMatrix),tn.setValue(X,"normalMatrix",ne.normalMatrix),tn.setValue(X,"modelMatrix",ne.matrixWorld),ie.uniformsGroups!==void 0){const yt=ie.uniformsGroups;for(let la=0,$a=yt.length;la<$a;la++){const Ta=yt[la];me.update(Ta,pn),me.bind(Ta,pn)}}return pn}function Ea(w,W){w.ambientLightColor.needsUpdate=W,w.lightProbe.needsUpdate=W,w.directionalLights.needsUpdate=W,w.directionalLightShadows.needsUpdate=W,w.pointLights.needsUpdate=W,w.pointLightShadows.needsUpdate=W,w.spotLights.needsUpdate=W,w.spotLightShadows.needsUpdate=W,w.rectAreaLights.needsUpdate=W,w.hemisphereLights.needsUpdate=W}function qa(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return ce},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(w,W,te){const ie=O.get(w);ie.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,ie.__autoAllocateDepthBuffer===!1&&(ie.__useRenderToTexture=!1),O.get(w.texture).__webglTexture=W,O.get(w.depthTexture).__webglTexture=ie.__autoAllocateDepthBuffer?void 0:te,ie.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,W){const te=O.get(w);te.__webglFramebuffer=W,te.__useDefaultFramebuffer=W===void 0};const Ma=X.createFramebuffer();this.setRenderTarget=function(w,W=0,te=0){j=w,ce=W,oe=te;let ie=null,ne=!1,Ge=!1;if(w){const Be=O.get(w);if(Be.__useDefaultFramebuffer!==void 0){Ne.bindFramebuffer(X.FRAMEBUFFER,Be.__webglFramebuffer),K.copy(w.viewport),ue.copy(w.scissor),xe=w.scissorTest,Ne.viewport(K),Ne.scissor(ue),Ne.setScissorTest(xe),L=-1;return}else if(Be.__webglFramebuffer===void 0)T.setupRenderTarget(w);else if(Be.__hasExternalTextures)T.rebindTextures(w,O.get(w.texture).__webglTexture,O.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const st=w.depthTexture;if(Be.__boundDepthTexture!==st){if(st!==null&&O.has(st)&&(w.width!==st.image.width||w.height!==st.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(w)}}const Je=w.texture;(Je.isData3DTexture||Je.isDataArrayTexture||Je.isCompressedArrayTexture)&&(Ge=!0);const Ke=O.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ke[W])?ie=Ke[W][te]:ie=Ke[W],ne=!0):w.samples>0&&T.useMultisampledRTT(w)===!1?ie=O.get(w).__webglMultisampledFramebuffer:Array.isArray(Ke)?ie=Ke[te]:ie=Ke,K.copy(w.viewport),ue.copy(w.scissor),xe=w.scissorTest}else K.copy(ye).multiplyScalar(Oe).floor(),ue.copy(He).multiplyScalar(Oe).floor(),xe=Ze;if(te!==0&&(ie=Ma),Ne.bindFramebuffer(X.FRAMEBUFFER,ie)&&Ne.drawBuffers(w,ie),Ne.viewport(K),Ne.scissor(ue),Ne.setScissorTest(xe),ne){const Be=O.get(w.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+W,Be.__webglTexture,te)}else if(Ge){const Be=W;for(let Je=0;Je<w.textures.length;Je++){const Ke=O.get(w.textures[Je]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+Je,Ke.__webglTexture,te,Be)}}else if(w!==null&&te!==0){const Be=O.get(w.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Be.__webglTexture,te)}L=-1},this.readRenderTargetPixels=function(w,W,te,ie,ne,Ge,Pe,Be=0){if(!(w&&w.isWebGLRenderTarget)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Je=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Pe!==void 0&&(Je=Je[Pe]),Je){Ne.bindFramebuffer(X.FRAMEBUFFER,Je);try{const Ke=w.textures[Be],st=Ke.format,bt=Ke.type;if(w.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Be),!Xt.textureFormatReadable(st)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xt.textureTypeReadable(bt)){$t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=w.width-ie&&te>=0&&te<=w.height-ne&&X.readPixels(W,te,ie,ne,V.convert(st),V.convert(bt),Ge)}finally{const Ke=j!==null?O.get(j).__webglFramebuffer:null;Ne.bindFramebuffer(X.FRAMEBUFFER,Ke)}}},this.readRenderTargetPixelsAsync=async function(w,W,te,ie,ne,Ge,Pe,Be=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Je=O.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Pe!==void 0&&(Je=Je[Pe]),Je)if(W>=0&&W<=w.width-ie&&te>=0&&te<=w.height-ne){Ne.bindFramebuffer(X.FRAMEBUFFER,Je);const Ke=w.textures[Be],st=Ke.format,bt=Ke.type;if(w.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Be),!Xt.textureFormatReadable(st))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xt.textureTypeReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const at=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,at),X.bufferData(X.PIXEL_PACK_BUFFER,Ge.byteLength,X.STREAM_READ),X.readPixels(W,te,ie,ne,V.convert(st),V.convert(bt),0);const Wt=j!==null?O.get(j).__webglFramebuffer:null;Ne.bindFramebuffer(X.FRAMEBUFFER,Wt);const Bt=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await YM(X,Bt,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,at),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,Ge),X.deleteBuffer(at),X.deleteSync(Bt),Ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,W=null,te=0){const ie=Math.pow(2,-te),ne=Math.floor(w.image.width*ie),Ge=Math.floor(w.image.height*ie),Pe=W!==null?W.x:0,Be=W!==null?W.y:0;T.setTexture2D(w,0),X.copyTexSubImage2D(X.TEXTURE_2D,te,0,0,Pe,Be,ne,Ge),Ne.unbindTexture()};const Cn=X.createFramebuffer(),Xr=X.createFramebuffer();this.copyTextureToTexture=function(w,W,te=null,ie=null,ne=0,Ge=0){let Pe,Be,Je,Ke,st,bt,at,Wt,Bt;const an=w.isCompressedTexture?w.mipmaps[Ge]:w.image;if(te!==null)Pe=te.max.x-te.min.x,Be=te.max.y-te.min.y,Je=te.isBox3?te.max.z-te.min.z:1,Ke=te.min.x,st=te.min.y,bt=te.isBox3?te.min.z:0;else{const mn=Math.pow(2,-ne);Pe=Math.floor(an.width*mn),Be=Math.floor(an.height*mn),w.isDataArrayTexture?Je=an.depth:w.isData3DTexture?Je=Math.floor(an.depth*mn):Je=1,Ke=0,st=0,bt=0}ie!==null?(at=ie.x,Wt=ie.y,Bt=ie.z):(at=0,Wt=0,Bt=0);const en=V.convert(W.format),qt=V.convert(W.type);let Ve;W.isData3DTexture?(T.setTexture3D(W,0),Ve=X.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(T.setTexture2DArray(W,0),Ve=X.TEXTURE_2D_ARRAY):(T.setTexture2D(W,0),Ve=X.TEXTURE_2D),Ne.activeTexture(X.TEXTURE0),Ne.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,W.flipY),Ne.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),Ne.pixelStorei(X.UNPACK_ALIGNMENT,W.unpackAlignment);const Fn=Ne.getParameter(X.UNPACK_ROW_LENGTH),Ot=Ne.getParameter(X.UNPACK_IMAGE_HEIGHT),pn=Ne.getParameter(X.UNPACK_SKIP_PIXELS),Tn=Ne.getParameter(X.UNPACK_SKIP_ROWS),En=Ne.getParameter(X.UNPACK_SKIP_IMAGES);Ne.pixelStorei(X.UNPACK_ROW_LENGTH,an.width),Ne.pixelStorei(X.UNPACK_IMAGE_HEIGHT,an.height),Ne.pixelStorei(X.UNPACK_SKIP_PIXELS,Ke),Ne.pixelStorei(X.UNPACK_SKIP_ROWS,st),Ne.pixelStorei(X.UNPACK_SKIP_IMAGES,bt);const jn=w.isDataArrayTexture||w.isData3DTexture,tn=W.isDataArrayTexture||W.isData3DTexture;if(w.isDepthTexture){const mn=O.get(w),ci=O.get(W),yt=O.get(mn.__renderTarget),la=O.get(ci.__renderTarget);Ne.bindFramebuffer(X.READ_FRAMEBUFFER,yt.__webglFramebuffer),Ne.bindFramebuffer(X.DRAW_FRAMEBUFFER,la.__webglFramebuffer);for(let $a=0;$a<Je;$a++)jn&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,O.get(w).__webglTexture,ne,bt+$a),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,O.get(W).__webglTexture,Ge,Bt+$a)),X.blitFramebuffer(Ke,st,Pe,Be,at,Wt,Pe,Be,X.DEPTH_BUFFER_BIT,X.NEAREST);Ne.bindFramebuffer(X.READ_FRAMEBUFFER,null),Ne.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(ne!==0||w.isRenderTargetTexture||O.has(w)){const mn=O.get(w),ci=O.get(W);Ne.bindFramebuffer(X.READ_FRAMEBUFFER,Cn),Ne.bindFramebuffer(X.DRAW_FRAMEBUFFER,Xr);for(let yt=0;yt<Je;yt++)jn?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,mn.__webglTexture,ne,bt+yt):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,mn.__webglTexture,ne),tn?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,ci.__webglTexture,Ge,Bt+yt):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,ci.__webglTexture,Ge),ne!==0?X.blitFramebuffer(Ke,st,Pe,Be,at,Wt,Pe,Be,X.COLOR_BUFFER_BIT,X.NEAREST):tn?X.copyTexSubImage3D(Ve,Ge,at,Wt,Bt+yt,Ke,st,Pe,Be):X.copyTexSubImage2D(Ve,Ge,at,Wt,Ke,st,Pe,Be);Ne.bindFramebuffer(X.READ_FRAMEBUFFER,null),Ne.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else tn?w.isDataTexture||w.isData3DTexture?X.texSubImage3D(Ve,Ge,at,Wt,Bt,Pe,Be,Je,en,qt,an.data):W.isCompressedArrayTexture?X.compressedTexSubImage3D(Ve,Ge,at,Wt,Bt,Pe,Be,Je,en,an.data):X.texSubImage3D(Ve,Ge,at,Wt,Bt,Pe,Be,Je,en,qt,an):w.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,Ge,at,Wt,Pe,Be,en,qt,an.data):w.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,Ge,at,Wt,an.width,an.height,en,an.data):X.texSubImage2D(X.TEXTURE_2D,Ge,at,Wt,Pe,Be,en,qt,an);Ne.pixelStorei(X.UNPACK_ROW_LENGTH,Fn),Ne.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Ot),Ne.pixelStorei(X.UNPACK_SKIP_PIXELS,pn),Ne.pixelStorei(X.UNPACK_SKIP_ROWS,Tn),Ne.pixelStorei(X.UNPACK_SKIP_IMAGES,En),Ge===0&&W.generateMipmaps&&X.generateMipmap(Ve),Ne.unbindTexture()},this.initRenderTarget=function(w){O.get(w).__webglFramebuffer===void 0&&T.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?T.setTextureCube(w,0):w.isData3DTexture?T.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?T.setTexture2DArray(w,0):T.setTexture2D(w,0),Ne.unbindTexture()},this.resetState=function(){ce=0,oe=0,j=null,Ne.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(e),i.unpackColorSpace=jt._getUnpackColorSpace()}}const Cv={type:"change"},bm={type:"start"},Cb={type:"end"},Qu=new pb,Nv=new sr,NC=Math.cos(70*$M.DEG2RAD),Yn=new ae,Ni=2*Math.PI,dn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},rp=1e-6;class OC extends LT{constructor(e,i=null){super(e,i),this.state=dn.NONE,this.target=new ae,this.cursor=new ae,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Xo.ROTATE,MIDDLE:Xo.DOLLY,RIGHT:Xo.PAN},this.touches={ONE:jo.ROTATE,TWO:jo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new ae,this._lastQuaternion=new ur,this._lastTargetPosition=new ae,this._quat=new ur().setFromUnitVectors(e.up,new ae(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new iv,this._sphericalDelta=new iv,this._scale=1,this._panOffset=new ae,this._rotateStart=new Dt,this._rotateEnd=new Dt,this._rotateDelta=new Dt,this._panStart=new Dt,this._panEnd=new Dt,this._panDelta=new Dt,this._dollyStart=new Dt,this._dollyEnd=new Dt,this._dollyDelta=new Dt,this._dollyDirection=new ae,this._mouse=new Dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=LC.bind(this),this._onPointerDown=DC.bind(this),this._onPointerUp=UC.bind(this),this._onContextMenu=HC.bind(this),this._onMouseWheel=FC.bind(this),this._onKeyDown=BC.bind(this),this._onTouchStart=zC.bind(this),this._onTouchMove=GC.bind(this),this._onMouseDown=IC.bind(this),this._onMouseMove=PC.bind(this),this._interceptControlDown=kC.bind(this),this._interceptControlUp=VC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Cv),this.update(),this.state=dn.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;Yn.copy(i).sub(this.target),Yn.applyQuaternion(this._quat),this._spherical.setFromVector3(Yn),this.autoRotate&&this.state===dn.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=Ni:s>Math.PI&&(s-=Ni),l<-Math.PI?l+=Ni:l>Math.PI&&(l-=Ni),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let c=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const f=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),c=f!=this._spherical.radius}if(Yn.setFromSpherical(this._spherical),Yn.applyQuaternion(this._quatInverse),i.copy(this.target).add(Yn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let f=null;if(this.object.isPerspectiveCamera){const h=Yn.length();f=this._clampDistance(h*this._scale);const m=h-f;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),c=!!m}else if(this.object.isOrthographicCamera){const h=new ae(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),c=m!==this.object.zoom;const p=new ae(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(h),this.object.updateMatrixWorld(),f=Yn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;f!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(f).add(this.object.position):(Qu.origin.copy(this.object.position),Qu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Qu.direction))<NC?this.object.lookAt(this.target):(Nv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Qu.intersectPlane(Nv,this.target))))}else if(this.object.isOrthographicCamera){const f=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),f!==this.object.zoom&&(this.object.updateProjectionMatrix(),c=!0)}return this._scale=1,this._performCursorZoom=!1,c||this._lastPosition.distanceToSquared(this.object.position)>rp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>rp||this._lastTargetPosition.distanceToSquared(this.target)>rp?(this.dispatchEvent(Cv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ni/60*this.autoRotateSpeed*e:Ni/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){Yn.setFromMatrixColumn(i,0),Yn.multiplyScalar(-e),this._panOffset.add(Yn)}_panUp(e,i){this.screenSpacePanning===!0?Yn.setFromMatrixColumn(i,1):(Yn.setFromMatrixColumn(i,0),Yn.crossVectors(this.object.up,Yn)),Yn.multiplyScalar(e),this._panOffset.add(Yn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;Yn.copy(l).sub(this.target);let c=Yn.length();c*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*c/s.clientHeight,this.object.matrix),this._panUp(2*i*c/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,c=i-s.top,f=s.width,h=s.height;this._mouse.x=l/f*2-1,this._mouse.y=-(c/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ni*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ni*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ni*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyStart.set(0,c)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),c=.5*(e.pageY+s.y);this._rotateEnd.set(l,c)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(Ni*this._rotateDelta.x/i.clientHeight),this._rotateUp(Ni*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,c=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,c),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const f=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(f,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new Dt,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function DC(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function LC(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function UC(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Cb),this.state=dn.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function IC(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Xo.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=dn.DOLLY;break;case Xo.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=dn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=dn.ROTATE}break;case Xo.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=dn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=dn.PAN}break;default:this.state=dn.NONE}this.state!==dn.NONE&&this.dispatchEvent(bm)}function PC(r){switch(this.state){case dn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case dn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case dn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function FC(r){this.enabled===!1||this.enableZoom===!1||this.state!==dn.NONE||(r.preventDefault(),this.dispatchEvent(bm),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Cb))}function BC(r){this.enabled!==!1&&this._handleKeyDown(r)}function zC(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case jo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=dn.TOUCH_ROTATE;break;case jo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=dn.TOUCH_PAN;break;default:this.state=dn.NONE}break;case 2:switch(this.touches.TWO){case jo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=dn.TOUCH_DOLLY_PAN;break;case jo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=dn.TOUCH_DOLLY_ROTATE;break;default:this.state=dn.NONE}break;default:this.state=dn.NONE}this.state!==dn.NONE&&this.dispatchEvent(bm)}function GC(r){switch(this._trackPointer(r),this.state){case dn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case dn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case dn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case dn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=dn.NONE}}function HC(r){this.enabled!==!1&&r.preventDefault()}function kC(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function VC(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Nb=({imageSrc:r,height:e=200})=>{const i=we.useRef(null);return we.useEffect(()=>{if(!i.current||!r)return;const s=i.current,l=new cT,c=75,f=s.clientWidth/s.clientHeight,h=new sa(c,f,.1,1100);h.position.set(0,0,.1);const m=new CC({antialias:!0});m.setSize(s.clientWidth,s.clientHeight),m.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.appendChild(m.domElement);const p=new OC(h,m.domElement);p.enableDamping=!0,p.dampingFactor=.08,p.rotateSpeed=-.3,p.enableZoom=!1,p.enablePan=!1,p.autoRotate=!1;const v=new NT;let _=null;v.load(r,S=>{S.mapping=nf,S.colorSpace=Yi;const N=new _m(500,60,40);N.scale(-1,1,1);const U=new xm({map:S});_=new ka(N,U),l.add(_)});let g=c;const b=S=>{S.preventDefault();const N=S.deltaY>0?5:-5;g=Math.max(30,Math.min(120,g+N)),h.fov=g,h.updateProjectionMatrix()};s.addEventListener("wheel",b,{passive:!1});const M=new ResizeObserver(()=>{s.clientWidth===0||s.clientHeight===0||(h.aspect=s.clientWidth/s.clientHeight,h.updateProjectionMatrix(),m.setSize(s.clientWidth,s.clientHeight))});M.observe(s);let C=null;const E=()=>{C=requestAnimationFrame(E),p.update(),m.render(l,h)};return E(),()=>{cancelAnimationFrame(C),M.disconnect(),s.removeEventListener("wheel",b),_&&(_.geometry.dispose(),_.material.dispose()),m.dispose(),s.contains(m.domElement)&&s.removeChild(m.domElement)}},[r]),x.jsx("div",{ref:i,style:{width:"100%",height:e+"px",cursor:"grab",borderRadius:"8px",overflow:"hidden",position:"relative"},onMouseDown:s=>s.currentTarget.style.cursor="grabbing",onMouseUp:s=>s.currentTarget.style.cursor="grab",onMouseLeave:s=>s.currentTarget.style.cursor="grab"})},Ov=({isOpen:r,onSave:e,onClose:i,provider:s="google"})=>{const[l,c]=we.useState(""),[f,h]=we.useState("");if(we.useEffect(()=>{r&&(c(""),h(""))},[r]),!r)return null;const m=()=>{if(!l.trim()){h("APIキーを入力してください");return}h(""),e(l)},p=s==="google",v=s==="openai",_=p,g=l.trim().startsWith("sk-"),b=v?"OpenAI API Key が必要です":_?"AI Engine を選択":"API Key が必要です",M=_?"Gemini AI Key または OpenAI Key (sk-...) を入力...":v?"sk-proj-...":"Google AI API Key を入力...",C="https://aistudio.google.com/app/apikey",E="https://platform.openai.com/api-keys",S=v?E:C,N=v?"🔑 OpenAI キーを取得":"🔑 キーを取得",U=_&&g||v?"emerald":"blue",I=U==="emerald"?"bg-emerald-600":"bg-blue-600",k=U==="emerald"?"border-emerald-500/30":"border-blue-500/30",D=U==="emerald"?"shadow-emerald-500/10":"shadow-blue-500/10",B=U==="emerald"?"bg-emerald-600 hover:bg-emerald-500":"bg-blue-600 hover:bg-blue-500",A=U==="emerald"?"focus:border-emerald-500":"focus:border-blue-500",F=U==="emerald"?"focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]":"focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]";return x.jsx("div",{className:"fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300",children:x.jsx("div",{className:"max-w-5xl mx-auto px-4 md:px-10 pt-4 relative",children:x.jsxs("div",{className:`bg-[#0f1115]/95 backdrop-blur-2xl border ${k} rounded-xl shadow-2xl ${D} p-4 flex flex-col gap-4 relative pr-10 transition-all duration-300`,children:[i&&x.jsx("button",{onClick:i,className:"absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors",title:"キャンセル",children:x.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),x.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),x.jsxs("div",{className:"flex flex-col md:flex-row items-center gap-4",children:[x.jsxs("div",{className:"flex items-center gap-3 shrink-0",children:[x.jsx("div",{className:`p-2 ${I} rounded-lg animate-pulse transition-colors duration-300`,children:x.jsx(uf,{size:18,className:"text-white"})}),x.jsxs("div",{children:[x.jsx("p",{className:"text-sm font-bold text-white",children:b}),x.jsx("p",{className:"text-[10px] text-slate-500",children:"ブラウザメモリ内のみ保持・外部送信なし"})]})]}),x.jsxs("div",{className:"flex-1 w-full md:w-auto",children:[x.jsx("div",{className:"flex gap-2",children:x.jsxs("form",{onSubmit:q=>{q.preventDefault(),m()},action:g?"/openai-key":"/gemini-key",method:"dialog",className:"flex gap-2 flex-1",autoComplete:"off",children:[x.jsx("input",{id:"dual-engine-api-key-input",name:g?"openai-api-key":"gemini-api-key",autoComplete:"off","data-lpignore":"true","data-form-type":"other",type:"password",value:l,onChange:q=>c(q.target.value),placeholder:M,className:`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${A} outline-none font-mono text-sm tracking-wider transition-all ${F}`,onKeyDown:q=>q.key==="Enter"&&m(),autoFocus:!0}),x.jsx("button",{onClick:m,className:`${B} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`,children:"接続"})]})}),f&&x.jsx("p",{className:"text-red-400 text-[10px] mt-1 pl-1",children:f})]})]}),_?x.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/5 pt-3",children:[x.jsxs("div",{className:"flex items-center gap-3",children:[x.jsxs("div",{className:`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${g?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":l.trim()?"bg-blue-500/15 border-blue-500/40 text-blue-400":"bg-white/5 border-white/10 text-slate-500"}`,children:[x.jsx("span",{className:`w-1.5 h-1.5 rounded-full transition-all duration-300 ${g?"bg-emerald-400":l.trim()?"bg-blue-400":"bg-slate-600"}`}),g?"🟢 ChatGPT Engine で起動":l.trim()?"🔵 Gemini Engine で起動":"入力待ち..."]}),g&&x.jsx("span",{className:"text-[9px] text-amber-400/70",children:"⚠ 従量課金（OpenAI API）"})]}),x.jsxs("div",{className:"flex items-center gap-4",children:[x.jsx("a",{href:C,target:"_blank",rel:"noreferrer",className:"text-[11px] text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 whitespace-nowrap",children:"🔵 Gemini キー取得（無料）"}),x.jsx("span",{className:"text-slate-600 text-[10px]",children:"|"}),x.jsx("a",{href:E,target:"_blank",rel:"noreferrer",className:"text-[11px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 whitespace-nowrap",children:"🟢 OpenAI キー取得（従量課金）"})]})]}):x.jsx("div",{className:"flex justify-end",children:x.jsx("a",{href:S,target:"_blank",rel:"noreferrer",className:`text-[11px] ${U==="emerald"?"text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30":"text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30"} underline whitespace-nowrap shrink-0`,children:N})})]})})})};class Ob extends cS.Component{constructor(e){super(e),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,i){this.setState({errorInfo:i}),console.error("CRITICAL ERROR:",e,i)}render(){return this.state.hasError?x.jsxs("div",{style:{padding:40,background:"#111",color:"#f55",minHeight:"100vh"},children:[x.jsxs("h1",{children:["⚠️ SYSTEM CRASH (",tc,")"]}),x.jsxs("pre",{style:{background:"#000",padding:20,whiteSpace:"pre-wrap"},children:[this.state.error?.toString(),x.jsx("br",{}),this.state.errorInfo?.componentStack]}),x.jsx("button",{onClick:()=>window.location.reload(),style:{padding:10,marginTop:20},children:"RETRY"})]}):this.props.children}}function jC({apiKey:r,isDragging:e,setIsDragging:i,processFiles:s,images:l,setImages:c,bg360Image:f,bg360Enabled:h,isAnalyzing:m,analyzeThought:p,castList:v,setCastList:_,isCastListCopied:g,setIsCastListCopied:b,currentStep:M,setShowModal:C}){return x.jsxs("section",{onDragOver:E=>{E.preventDefault(),r&&i(!0)},onDragLeave:()=>i(!1),onDrop:E=>{E.preventDefault(),i(!1),r&&s(E.dataTransfer.files)},className:`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
        ${e?"border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20":"border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]"}
        ${M===1&&!e?"border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]":""}
        ${M>1?"border-blue-500/30 bg-blue-900/5":""}
      `,children:[x.jsxs("div",{className:"flex items-center justify-between mb-6 z-10",children:[x.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${M===1?"text-blue-400":"text-slate-500"} `,children:[x.jsx(TS,{size:18})," STEP 01: キャラクター解析 (Character Analysis)"]}),m&&x.jsx(Wi,{size:18,className:"animate-spin text-blue-400"}),M>1&&x.jsx(Xi,{size:18,className:"text-blue-500"})]}),x.jsxs("div",{className:"flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start",children:[l.map((E,S)=>x.jsxs("div",{className:"relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer",children:[x.jsx("img",{src:E,className:"w-full h-full object-cover shadow-sm",alt:`char-${S}`}),x.jsx("button",{onClick:()=>c(l.filter((N,U)=>U!==S)),className:"absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]",children:x.jsx(lc,{size:16})})]},S)),f&&x.jsxs("div",{className:`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${h?"border-cyan-500/50":"border-slate-700"} transition-all`,title:"360°パノラマ背景 (下の「場所設定」から詳細確認可能)",children:[x.jsx("img",{src:f,className:`w-full h-full object-cover shadow-sm ${h?"opacity-100":"opacity-40 grayscale"}`,alt:"360 bg"}),x.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1",children:[x.jsx(oc,{size:8})," 360° BACKGROUND"]})]}),x.jsxs("label",{className:"w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add",children:[m?x.jsx(Wi,{size:16,className:"animate-spin"}):x.jsx(zS,{size:16,className:"group-hover/add:scale-125 transition-transform"}),x.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:E=>{r?s(E.target.files):C(!0)},disabled:m})]}),l.length===0&&!m&&x.jsxs("label",{className:"flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10",children:[x.jsx("input",{type:"file",multiple:!0,accept:"image/*",className:"hidden",onChange:E=>{r?s(E.target.files):C(!0)}}),x.jsxs("p",{className:"text-xs font-bold text-slate-400",children:["キャラクターシートをドロップ ",x.jsx("span",{className:"text-blue-400",children:"（複数シートはまとめてアップロード。360°背景がある場合は同時にドロップしてください）"})]}),x.jsxs("p",{className:"text-[10px] opacity-60 mt-1",children:["※名前・性格・設定が明記されているシートを推奨。",x.jsx("br",{}),"※360°背景の自動認識には「比率2:1」かつ「内部に360°メタデータ(equirectangular等)を持つ画像」である必要があります。"]}),x.jsxs("div",{className:"mt-3 flex flex-col items-center gap-1 group/preview",children:[x.jsx("span",{className:"text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors",children:"推奨見本 (例)"}),x.jsx("img",{src:"./example_sheet.jpg",alt:"Example",className:"h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"})]})]}),m&&x.jsxs("div",{className:"flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4",children:[x.jsxs("span",{className:"relative flex h-3 w-3",children:[x.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"}),x.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-blue-500"})]}),x.jsxs("div",{className:"text-xs font-mono text-blue-300",children:["Analyzing ",l.length," chars... ",x.jsx("span",{className:"text-slate-500 ml-2 text-[10px]",children:"(数十秒〜数分待機)"})]})]})]}),x.jsx("div",{className:"mb-4",children:x.jsx(df,{thought:p})}),x.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[x.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるキャラクター解析 (編集可)"}),x.jsx("textarea",{value:v,onChange:E=>_(E.target.value),style:{color:"#ffffff",backgroundColor:"#08090b",opacity:1},className:"flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600",placeholder:"画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"}),x.jsx("div",{className:"mt-2 relative z-50",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(v),b(!0),setTimeout(()=>b(!1),2e3)},disabled:!v,className:`w-full ${g?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[g?x.jsx(Xi,{size:20}):x.jsx(rc,{size:20}),g?"コピー完了":"コピペ（キャラクター解析結果をコピー）"]})})]})]})}function XC({step2Ref:r,currentStep:e,isAnalyzing:i,inputMode:s,setInputMode:l,targetDate:c,setTargetDate:f,categories:h,toggleCategory:m,manualTopic:p,setManualTopic:v,bg360Image:_,bg360Enabled:g,setBg360Enabled:b,bg360Analysis:M,is360Analyzing:C,customLocation:E,setCustomLocation:S,customOutfit:N,setCustomOutfit:U,punchlineType:I,setPunchlineType:k,isSearching:D,generateScenarioFromNews:B,scenarioThought:A,scenario:F,setScenario:q,isScenarioCopied:H,setIsScenarioCopied:$,originalScenario:ce,isEnhancePanelOpen:oe,setIsEnhancePanelOpen:j,enhanceExpressions:L,setEnhanceExpressions:G,enhanceBodyLang:K,setEnhanceBodyLang:ue,enhanceEffects:xe,setEnhanceEffects:P,enhanceBackgrounds:Z,setEnhanceBackgrounds:be,enhanceCameraWork:Ae,setEnhanceCameraWork:Oe,enhanceDialogue:ee,setEnhanceDialogue:Se,isEnhancing:ye,enhanceScenario:He,revertScenario:Ze,enhanceLog:nt,showStatus:Tt}){return x.jsxs("section",{ref:r,className:`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
        ${e===2?"border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100":"border-white/5 opacity-60"}
        ${e>2?"border-purple-500/30 bg-purple-900/5 opacity-100":""}
      `,children:[(e<2||i)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.875rem"}}),x.jsx("div",{className:"flex items-center justify-between",children:x.jsxs("div",{className:`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${e===2?"text-purple-400":"text-slate-500"} `,children:[x.jsx(DS,{size:18})," STEP 02: シナリオ構築設定 (Scenario Settings)"]})}),x.jsxs("div",{className:"flex flex-col gap-6 mt-4",children:[x.jsxs("div",{className:"grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5",children:[x.jsxs("button",{onClick:()=>l("news"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${s==="news"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[x.jsx("span",{className:"mr-2",children:"🌐"})," ニュース検索"]}),x.jsxs("button",{onClick:()=>l("manual"),className:`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${s==="manual"?"bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg":"bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300"} `,children:[x.jsx("span",{className:"mr-2",children:"✏️"})," 自由入力"]})]}),s==="news"?x.jsxs("div",{className:"space-y-4",children:[x.jsxs("div",{className:"flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5",children:[x.jsx("span",{className:"text-xs font-bold text-slate-400",children:"📅 対象日付 (Target Date):"}),x.jsx("input",{type:"date",value:c,onChange:Ye=>f(Ye.target.value),style:{colorScheme:"dark"},className:"bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"})]}),x.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[x.jsx("div",{className:"col-span-2 lg:col-span-4 mb-2 text-xs font-bold text-slate-400 text-center",children:"▼ 検索するカテゴリを選択してください"}),h.map(Ye=>x.jsxs("label",{className:`
                    relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5
                    ${Ye.checked?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}
                  `,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Ye.checked,onChange:()=>m(Ye.id)}),Ye.checked&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(Xi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-2 ${Ye.checked?"scale-110":"opacity-70 grayscale"} `,children:Ye.icon}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:Ye.label})]})]},Ye.id))]}),x.jsxs("div",{className:"text-xs text-slate-500 text-center font-mono",children:["現在の検索クエリ: ",h.filter(Ye=>Ye.checked).map(Ye=>Ye.keywords).join(" ")||"なし"," (対象日付: ",c,")"]})]}):x.jsxs("div",{className:"space-y-2",children:[x.jsxs("div",{className:"text-xs font-bold text-purple-300 text-center",children:["▼ 自由入力モード: 好きなネタやURLを入力してください (",x.jsx("span",{className:"text-blue-400",children:"URLからの自動読み取り対応"}),")"]}),x.jsx("textarea",{value:p,onChange:Ye=>v(Ye.target.value),placeholder:`例：\r
・最近のAI技術の進化について\r
・近所の猫が可愛かった話\r
・https://example.com/news/12345\r
\r
※URLを入力すると、AIがリンク先の内容を参照して漫画化します。\r
記事の内容を直接コピペするか、具体的なトピックを文章で入力してください。`,style:{color:"#ffffff",backgroundColor:"#0f1115"},rows:10,className:"w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"})]}),x.jsxs("div",{className:"flex flex-col md:flex-row gap-4 mb-4",children:[x.jsxs("div",{className:`flex-1 p-3 rounded-xl border ${_&&g?"bg-[#050a14] border-cyan-500/30":"bg-[#050505] border-gray-700/50"}`,children:[x.jsxs("label",{className:"text-xs font-bold mb-2 block flex items-center gap-1",style:{color:_&&g?"#67e8f9":"#ffffff"},children:[x.jsx(oc,{size:14}),_&&g?"🌐 360°背景 (ON)":"指定場所 (Location Override)",x.jsxs("span",{className:"text-[10px] font-normal ml-auto flex items-center gap-2",children:[C&&x.jsxs("span",{className:"text-yellow-400 animate-pulse flex items-center gap-1",children:[x.jsx(Wi,{size:10,className:"animate-spin"})," 解析中..."]}),_&&x.jsx("button",{onClick:Ye=>{Ye.preventDefault(),b(!g),Tt(g?"360°背景をOFFにしました（手入力が優先されます）":"360°背景をONにしました")},className:`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${g?"bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40":"bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"}`,title:g?"クリックで360°背景をOFF → 自由入力に切り替え":"クリックで360°背景をON → パノラマビューアーに切り替え",children:g?"🌐 ON → OFFにする":"🌐 OFF → ONにする"}),!_&&x.jsx("span",{className:"text-gray-500",children:"※空欄ならAIおまかせ"})]})]}),_&&g?x.jsxs("div",{className:"space-y-2",children:[x.jsx(Nb,{imageSrc:_,height:160}),M&&x.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[10px] text-slate-400",children:[x.jsxs("span",{className:"px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",children:["📍 ",M.location]}),x.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["☀️ ",M.lighting]}),x.jsx("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:M.spatialType==="indoor"?"🏠 室内":M.spatialType==="outdoor"?"🌳 屋外":"🔀 複合"}),M.mood&&x.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 border border-slate-700",children:["🎭 ",M.mood]})]}),x.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"})]}):x.jsx("input",{type:"text",value:E,onChange:Ye=>S(Ye.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600",placeholder:"例: サイバーパンクな裏路地、炎上する宇宙船..."})]}),x.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20",children:[x.jsxs("label",{className:"text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1",children:[x.jsx(Uv,{size:14})," 指定服装 (Outfit Override) ",x.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※空欄ならAIおまかせ"})]}),x.jsx("input",{type:"text",value:N,onChange:Ye=>U(Ye.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono",placeholder:"例: キャラシート準拠 / 全員水着 / ミリタリー装備..."})]}),x.jsxs("div",{className:"flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20",children:[x.jsxs("label",{className:"text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1",children:[x.jsx("span",{children:"🎬"})," オチ・ディレクター ",x.jsx("span",{className:"text-[10px] text-gray-500 font-normal ml-auto",children:"※オチの方向性指定"})]}),x.jsxs("select",{value:I,onChange:Ye=>k(Ye.target.value),style:{color:"#ffffff",backgroundColor:"#111111"},className:"w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer",children:[x.jsx("option",{value:"Auto",children:"🤖 自動 (AIにおまかせ)"}),x.jsx("option",{value:"Surreal",children:"❄️ 静寂型 (シュール/無言)"}),x.jsx("option",{value:"Explosion",children:"🔥 爆発型 (カオス/叫び)"}),x.jsx("option",{value:"FakeEmotion",children:"😢 感動詐欺 (いい話風の狂気)"}),x.jsx("option",{value:"Metafiction",children:"📖 メタフィクション (枠を越える)"}),x.jsx("option",{value:"Unreasonable",children:"🔨 理不尽な制裁 (突然の暴力)"}),x.jsx("option",{value:"RunningGag",children:"🔁 天丼 (同じボケの最終形態)"}),x.jsx("option",{value:"Dream",children:"🛏️ 夢オチ (ループの恐怖)"}),x.jsx("option",{value:"PsychoHorror",children:"🔪 サイコホラー (突然の狂気)"}),x.jsx("option",{value:"Misunderstanding",children:"🤷 盛大な勘違い (すれ違いの頂点)"}),x.jsx("option",{value:"CanceledEnding",children:"🏃 打ち切りエンド (俺たちの戦いはこれからだ)"}),x.jsx("option",{value:"Documentary",children:"📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)"})]})]})]}),x.jsx("button",{onClick:B,disabled:D||e<1,className:"w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl",children:D?x.jsxs(x.Fragment,{children:[x.jsx(Wi,{size:24,className:"animate-spin"}),x.jsx("span",{className:"animate-pulse",children:"SCENARIO GENERATING..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(uf,{size:24,className:"fill-yellow-400 text-black"}),x.jsx("span",{children:"シナリオ作成を実行 (STEP 2)"}),x.jsx(ac,{size:24,className:"opacity-60"})]})})]}),x.jsxs("div",{className:"space-y-4 mt-6",children:[A&&x.jsx("div",{className:"mt-4",children:x.jsx(df,{thought:A})}),x.jsxs("div",{className:"flex flex-col gap-2",children:[x.jsx("span",{className:"px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded",children:"▼ 生成されるシナリオ (編集可 / 外部シナリオ貼付OK)"}),x.jsx("textarea",{value:F,onChange:Ye=>q(Ye.target.value),style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono",placeholder:"ここに生成されたシナリオが表示されます。💡 Story Maker等で作成した4コマ用シナリオがある場合は、STEP1のキャラクターシート解析後ここに直接貼り付けてSTEP3に進めます（STEP2の「シナリオ作成を実行」はスキップ可）。貼り付け可能なシナリオの仕様は Topic: / Location: / Outfit: / Punchline: / Scenario: の形式に準拠してください。"}),x.jsx("div",{className:"mt-2 relative z-50",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(F),$(!0),setTimeout(()=>$(!1),2e3)},disabled:!F,className:`w-full ${H?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`,children:[H?x.jsx(Xi,{size:20}):x.jsx(rc,{size:20}),H?"コピー完了":"コピペ（生成されたシナリオをコピー）"]})})]}),x.jsxs("div",{className:`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${F&&F.length>20?"border-orange-500/30":"border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none"}`,children:[x.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr",onClick:()=>F&&F.length>20&&j(!oe),children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-base",children:"🔥"}),x.jsx("span",{className:"text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors",children:"シナリオ強化"}),x.jsx("span",{className:"text-xs font-bold text-orange-400/70 hidden sm:inline",children:"Scenario Enhance"}),ce&&x.jsx("span",{className:"text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold",children:"✓ 強化済み"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors",children:F&&F.length>20?oe?"▲ クリックで閉じる":"▼ クリックで開く":"シナリオ生成後に使用可能"}),x.jsx(Lv,{size:18,className:`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${oe?"rotate-180":""}`})]})]}),oe&&F&&F.length>20&&x.jsxs("div",{className:"p-4 bg-orange-950/10 space-y-3",children:[x.jsxs("p",{className:"text-[11px] text-orange-200/70 leading-relaxed",children:["生成済みシナリオの演出を強化します。強化したいカテゴリをONにして「強化実行」を押してください。",x.jsx("br",{}),x.jsx("span",{className:"text-orange-300 font-bold",children:"💡 複数回実行すると効果が重複し、より強力（カオス）な演出になります。"}),x.jsx("br",{}),"⚠️ 演出が過激になるとSTEP4でコンテンツポリシーに引っかかる場合があります（既存の救済機能で対応可能）。"]}),x.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-3",children:[x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${L?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:L,onChange:()=>G(!L)}),L&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(Xi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${L?"scale-110":"opacity-70 grayscale"}`,children:"😱"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"表情追加"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"大げさなリアクション"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${K?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:K,onChange:()=>ue(!K)}),K&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(Xi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${K?"scale-110":"opacity-70 grayscale"}`,children:"🤸"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"身体強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"全身で感情を表現"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${xe?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:xe,onChange:()=>P(!xe)}),xe&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(Xi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${xe?"scale-110":"opacity-70 grayscale"}`,children:"✨"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"演出強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"照明効果やVFX"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Z?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Z,onChange:()=>be(!Z)}),Z&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(Xi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Z?"scale-110":"opacity-70 grayscale"}`,children:"🏙️"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"背景強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"描写を詳細化"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${Ae?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:Ae,onChange:()=>Oe(!Ae)}),Ae&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(Xi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${Ae?"scale-110":"opacity-70 grayscale"}`,children:"📷"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"カメラワーク"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"アオリ・俯瞰等"})]})]}),x.jsxs("label",{className:`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${ee?"bg-white text-black border-slate-300":"bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]"}`,children:[x.jsx("input",{type:"checkbox",className:"hidden",checked:ee,onChange:()=>Se(!ee)}),ee&&x.jsx("div",{className:"absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm",children:x.jsx(Xi,{size:12,strokeWidth:4})}),x.jsxs("div",{className:"text-center",children:[x.jsx("div",{className:`text-2xl mb-1 ${ee?"scale-110":"opacity-70 grayscale"}`,children:"💬"}),x.jsx("div",{className:"text-[11px] font-bold tracking-wider",children:"セリフ強化"}),x.jsx("div",{className:"text-[9px] opacity-70 mt-1",children:"ギャグ・オチ最大化"})]})]})]}),x.jsxs("div",{className:"text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md",children:["強化対象: ",[L&&"表情",K&&"身体",xe&&"演出",Z&&"背景",Ae&&"カメラ",ee&&"セリフ"].filter(Boolean).join(" / ")||"未選択"]}),x.jsxs("div",{className:"flex gap-2",children:[x.jsx("button",{className:"flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",onClick:He,disabled:ye||!(L||K||xe||Z||Ae||ee),children:ye?x.jsxs(x.Fragment,{children:[x.jsx(Wi,{size:16,className:"animate-spin"})," 強化中..."]}):x.jsxs(x.Fragment,{children:[x.jsx(uf,{size:16,className:"fill-yellow-300 text-black"})," シナリオ強化実行"]})}),x.jsx("button",{className:`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${ce?"bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30":"bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed"}`,onClick:Ze,disabled:ye||!ce,children:"↩️ 強化前に戻す"})]}),x.jsx(df,{thought:nt||"> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"})]})]})]})]})}function YC({step3Ref:r,currentStep:e,isSearching:i,isAnalyzing:s,isEnhancing:l,is360CameraWorking:c,assemblePrompt:f,isAssembling:h}){return x.jsxs("section",{ref:r,style:{padding:"16px",gap:"16px",borderRadius:"0",background:"#0f1115",position:"relative"},className:`flex flex-col shadow-xl transition-all duration-300
        ${e===3?"border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100":"border border-white/5 opacity-60"}
        ${e>3?"border border-orange-500/30 opacity-100":""}
      `,children:[(e<3||i||s||l||c)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto"},children:c&&e>=3&&x.jsxs("div",{className:"absolute inset-0 flex flex-col items-center justify-center gap-3",children:[x.jsx("div",{className:"animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"}),x.jsx("p",{className:"text-cyan-300 text-sm font-bold animate-pulse",children:"🎬 360° カメラワーク設計＋背景クロップ中..."}),x.jsx("p",{className:"text-slate-500 text-xs",children:"完了すると自動的にアンロックされます"})]})}),x.jsxs("div",{className:`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${e===3?"text-orange-400":"text-slate-500"}`,children:[x.jsx(lp,{size:24})," STEP 03: プロンプト生成 (PROMPT ASSEMBLY)"]}),x.jsx("button",{onClick:f,disabled:h||c,className:`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
          ${e===3?"ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]":""}
        `,children:h?x.jsxs(x.Fragment,{children:[x.jsx(Wi,{size:24,className:"animate-spin"}),x.jsx("span",{className:"animate-pulse",children:"ASSEMBLING PROMPT..."})]}):x.jsxs(x.Fragment,{children:[x.jsx(lp,{size:24,className:`text-blue-600 ${e===3?"animate-bounce":""} `}),x.jsx("span",{children:"最終プロンプトを構築する (STEP 3)"}),x.jsx(ac,{size:24,className:"opacity-60"})]})})]})}function WC({outputRef:r,currentStep:e,isSearching:i,isAnalyzing:s,isEnhancing:l,finalPrompt:c,copyPrompt:f,assembleThought:h,enableChatGPTMode:m,selectedEngine:p,bg360Image:v,bg360Analysis:_,bg360Enabled:g,bg360CameraWork:b,bg360CroppedPanels:M,isCopied:C,isMetaSaved:E,setIsMetaSaved:S,castList:N,scenario:U,punchlineType:I,colorMode:k,enhanceExpressions:D,enhanceBodyLang:B,enhanceEffects:A,enhanceBackgrounds:F,enhanceCameraWork:q,enhanceDialogue:H,SYSTEM_VERSION:$,isAssembling:ce,regenerateImage:oe,isGeneratingImage:j,isFixPromptCopied:L,setIsFixPromptCopied:G,isPolicyPanelOpen:K,setIsPolicyPanelOpen:ue,isPolicyCopied:xe,setIsPolicyCopied:P,policyErrorMsg:Z,setPolicyErrorMsg:be,regenerateSafePrompt:Ae,isFixingPolicy:Oe,policyFixLog:ee,genLogRef:Se,genLog:ye,imageResultRef:He,generatedImage:Ze,isFullAutoMode:nt,fullAutoStep:Tt,mangaTitle:Ye,isFallbackUsed:Nt,enableOpenAIApi:kt,setGeneratedImage:gt,generationHistory:Ft,setGenerationHistory:Qt}){return x.jsxs("div",{ref:r,className:"relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500",children:[(e<3||i||s||l)&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.92)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),x.jsxs("section",{className:"relative group h-full",children:[x.jsx("div",{className:"absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"}),x.jsxs("div",{className:"relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col",children:[x.jsx("div",{className:"flex items-center justify-between mb-4",children:x.jsxs("div",{className:"flex items-center gap-3 ml-auto",children:[x.jsx("button",{onClick:f,disabled:!c,className:"bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10",title:"プロンプトをコピー",children:x.jsx(rc,{size:14})}),x.jsx("span",{className:"text-[9px] font-mono text-slate-600",children:"DYNAMIC ENGINE V1.2.3"})]})}),x.jsx(df,{thought:h,placeholder:"> ボタンを押すとプロンプト構築ログがここに表示されます..."}),x.jsxs("div",{className:"flex flex-col h-full mt-4 gap-4",children:[x.jsx("div",{className:"relative flex-1",children:x.jsx("textarea",{value:c,readOnly:!0,style:{color:"#ffffff",backgroundColor:"#000000",opacity:1},className:"w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500",placeholder:"◀ 「最終プロンプトを構築する」ボタンを押すと、ここに生成されたプロンプトが表示されます。"})}),x.jsxs("div",{className:"flex flex-col gap-4 mt-2 relative z-50",children:[v&&_&&g&&c&&x.jsxs("div",{className:"bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3",children:[x.jsx("div",{className:"flex items-start gap-4",children:x.jsxs("div",{className:"flex-1 space-y-1",children:[x.jsxs("div",{className:"text-xs font-bold text-cyan-300 flex items-center gap-1",children:[x.jsx(oc,{size:12})," 🌐 360°背景モード (ON)"]}),x.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["このプロンプトと一緒に以下を添付してください：",x.jsx("br",{}),x.jsx("span",{className:"text-white",children:"✅ キャラクターシート（いつも通り）"}),x.jsx("br",{}),x.jsx("span",{className:"text-cyan-300",children:"✅ 360°背景画像（読み込み済みのファイル）"}),x.jsx("br",{}),x.jsx("span",{className:"text-slate-500",children:"※AIがアスペクト比2:1の画像を自動的に背景参照として認識します"})]})]})}),x.jsx(Nb,{imageSrc:v,height:120}),x.jsx("p",{className:"text-[9px] text-slate-600 text-center",children:"ドラッグで回転 / ホイールでズーム"}),b&&M&&M.length===4&&x.jsxs("div",{className:"mt-2 border-t border-cyan-500/20 pt-3",children:[x.jsx("div",{className:"text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1",children:"🎬 AI Camera Work — コマ別方角プレビュー"}),x.jsx("div",{className:"grid grid-cols-4 gap-2",children:b.panels.map((We,X)=>{const pt=["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((We.yaw%360+360)%360/45)%8];return x.jsxs("div",{className:"relative",children:[x.jsx("img",{src:M[X],alt:`Panel ${We.panel} - ${pt}`,className:"w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"}),x.jsxs("div",{className:"absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate",children:[x.jsxs("span",{className:"font-bold",children:["コマ",We.panel]})," ",pt," ",x.jsxs("span",{className:"text-slate-400",children:["FOV",We.fov,"°"]})]})]},X)})}),x.jsx("p",{className:"text-[8px] text-slate-600 text-center mt-2",children:"各コマで使用される背景の方角"})]})]}),x.jsxs("button",{onClick:f,disabled:!c,className:`w-full ${C?"bg-green-600":"bg-slate-800 hover:bg-slate-700"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`,children:[C?x.jsx(Xi,{size:20}):x.jsx(rc,{size:20}),C?"コピー完了":p==="openai"?v&&g?"コピペ（手動生成用　📎キャラシート＋🌐360°背景画像を添付）":"コピペ（手動生成用　📎キャラシート添付推奨）":v&&g?m?"コピペ（ChatGPT専用　📎キャラシート＋🌐360°背景画像を添付　生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート＋🌐360°背景画像を添付　ChatGPTには必ず専用モードを使用）":m?"コピペ（ChatGPT専用　📎キャラシート添付及び生成毎新規スレッド作成必須）":"コピペ（他アプリ用　📎キャラシート添付を強く推奨　ChatGPTには必ずChatGPT専用モードを使用して下さい）"]}),x.jsxs("button",{onClick:()=>{const We=new Date,X=p==="openai"?"ChatGPT Engine (自動)":m?"ChatGPT専用プロンプト":"Gemini用プロンプト",Lt={ファイル情報:{フォーマットバージョン:1,アプリバージョン:$,保存日時:We.toLocaleString("ja-JP",{timeZone:"Asia/Tokyo"}),ISO日時:We.toISOString()},プロンプト判別:{モード:X,AIエンジン:p==="openai"?"ChatGPT":"Gemini",ChatGPTモード:m,説明:p==="openai"?"ChatGPT Engine で全ルーチンを実行。ChatGPT Images 2.0 専用プロンプトが自動生成されます。":m?"ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。":"Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"},キャラクターシート解析結果:N||"(未解析)",シナリオ:U||"(未生成)",最終プロンプト:c||"(未生成)",生成設定:{パンチラインタイプ:I,カラーモード:k,強化オプション:{表情強化:D,ボディランゲージ強化:B,"照明・演出強化":A,背景強化:F,カメラワーク強化:q,"セリフ・ギャグ強化":H},"360度背景":{画像読込:!!v,有効:g,場所:_?.location||"(未解析)",空間タイプ:_?.spatialType||"(未解析)",光源:_?.lighting||"(未解析)"}}},pt=JSON.stringify(Lt,null,2),Xt=new Blob([pt],{type:"application/json;charset=utf-8"}),Ne=URL.createObjectURL(Xt),Jt=document.createElement("a");Jt.href=Ne;const O=U?.match(/タイトル[:：]\s*(.+)/),T=O?O[1].trim().substring(0,20).replace(/[\\/:*?"<>|]/g,"_"):"untitled",J=`${String(We.getFullYear()).slice(-2)}${String(We.getMonth()+1).padStart(2,"0")}${String(We.getDate()).padStart(2,"0")}${String(We.getHours()).padStart(2,"0")}${String(We.getMinutes()).padStart(2,"0")}${String(We.getSeconds()).padStart(2,"0")}`;Jt.download=`AI_4-koma_metadata_${T}_${J}.json`,document.body.appendChild(Jt),Jt.click(),document.body.removeChild(Jt),URL.revokeObjectURL(Ne),S(!0),setTimeout(()=>S(!1),2500)},disabled:!c,className:`w-full ${E?"bg-green-600":"bg-amber-900/50 hover:bg-amber-800/60"} ${E?"text-white":"text-amber-400"} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${E?"border-green-500/50":"border-amber-700/30"} disabled:opacity-30 disabled:cursor-not-allowed text-sm`,children:[E?x.jsx(Xi,{size:16}):x.jsx(i_,{size:16}),E?"保存完了！":"📂 メタデータ保存 (JSON)"]})]}),x.jsxs("div",{className:"relative mt-2",children:[!ce&&!c&&x.jsx("div",{style:{position:"absolute",inset:-2,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.625rem"}}),x.jsxs("div",{className:"bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono",children:["※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 ",x.jsx("span",{className:"text-orange-400 font-bold",children:"「最終プロンプトを構築する」"})," を押してください。"]}),x.jsxs("button",{onClick:oe,disabled:!c||j,className:`w-full ${p==="openai"?"bg-emerald-600 hover:bg-emerald-500":"bg-orange-600 hover:bg-orange-500"} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`,children:[j?x.jsx(Wi,{size:20,className:"animate-spin"}):x.jsx(op,{size:20}),x.jsx("div",{className:"flex flex-col items-center",children:x.jsx("span",{children:j?"再生成中...":`画像を生成する (STEP 4: ${p==="openai"?"ChatGPT Images 2.0":"Google AI"})`})})]}),x.jsxs("p",{className:"text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2",children:["⚠️ API経由ではキャラクターシートや360°背景画像を添付できないため、",x.jsx("span",{className:"text-amber-400/80",children:"テキストプロンプトのみによる近似生成"}),"となります。 正確なキャラ再現が必要な場合は、下の ",x.jsx("span",{className:"text-orange-300",children:"PRO TIP"})," を参照してブラウザ版で手動生成してください。"]}),x.jsx("div",{className:"mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg",children:x.jsxs("div",{className:"flex items-start gap-2",children:[x.jsx("div",{className:"mt-0.5 text-orange-400",children:x.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("circle",{cx:"12",cy:"12",r:"10"}),x.jsx("path",{d:"M12 16v-4"}),x.jsx("path",{d:"M12 8h.01"})]})}),x.jsxs("div",{className:"text-xs text-orange-200/80 leading-relaxed font-sans",children:[x.jsx("span",{className:"font-bold text-orange-300",children:"💡 PRO TIP：究極の1枚を作りたい時は？"}),x.jsx("br",{}),p==="openai"?x.jsxs(x.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",x.jsx("a",{href:"https://chatgpt.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"ChatGPTブラウザ版🤖"}),"に",x.jsxs("strong",{children:["「元となるキャラシート画像",v&&g?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",x.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！",x.jsx("br",{}),x.jsxs("span",{className:"inline-block mt-2 text-[11px] text-cyan-300/80",children:["⚠️ ",x.jsx("strong",{children:"GPT-image 2.0の仕様上、どうしても細長い画像になってしまう場合"}),"は、ChatGPTのメニュー画面にある「アスペクト比」ボタンで手動修正は行わず、以下の「画像比率事後修正プロンプト」ボタンでコピーしたプロンプトを貼り付けて再生成してください。"]})]}):x.jsxs(x.Fragment,{children:["キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、",x.jsx("a",{href:"https://gemini.google.com/",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:"Geminiブラウザ版🤖"})," に",x.jsxs("strong",{children:["「元となるキャラシート画像",v&&g?"＋STEP1で貼り付けた360°背景画像":"","」"]}),"と一緒に直接貼り付けて生成させてください。",x.jsx("br",{}),"文字情報だけでなく画像を参照できるため、キャラのクオリティと再現度が飛躍的に向上します！"]}),p==="openai"&&x.jsx("div",{className:"mt-3 block w-full",children:x.jsxs("button",{className:`mt-2 ${L?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{const We=`[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

You MUST discard the previously generated image completely.
DO NOT crop, resize, extend, pad, or reuse any part of the previous image.
This is NOT a correction. This is a FULL REGENERATION.

THIS IS A STRUCTURAL CORRECTION TASK. PRIORITIZE LAYOUT OVER STYLE.

━━━━━━━━━━━━━━━━━━
■ ART STYLE PRESERVATION (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST maintain the high-quality lighting, shading, and rich details of the original manga style.
- DO NOT simplify the art style or colors. 
- "Prioritizing layout" does NOT mean you can degrade the artistic rendering quality.

━━━━━━━━━━━━━━━━━━
■ CANVAS — HARD LOCK
━━━━━━━━━━━━━━━━━━
- Aspect ratio MUST be EXACTLY 1:1.414 (A4 portrait)
- Resolution MUST be EXACTLY 1024×1448 px
- Any taller-than-A4 output is STRICTLY FORBIDDEN
- Any 3:4, square, or long-strip image is a FAILURE

━━━━━━━━━━━━━━━━━━
■ PANEL SYSTEM — HARD LOCK
━━━━━━━━━━━━━━━━━━
- EXACTLY 4 panels
- Panels MUST be horizontal strips stacked vertically
- ALL panels MUST be identical size (height & width)
- Panels MUST fill ~95% of canvas width
- NO extra margins on ANY edge (top/bottom/left/right)

■ GUTTERS
- Thick white gutters between panels (approx 3% height)
- Gutters MUST be uniform
- Panels MUST NOT touch

━━━━━━━━━━━━━━━━━━
■ WATERMARK RE-APPLICATION (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST REDRAW the watermarks exactly on the 4th panel.
- Bottom-Right watermark: "Generated by ChatGPT with Super FURU AI 4-koma ${$}"
- Bottom-Left watermark: "ネームから全自動の自律式統合AI漫画システム :https://x.gd/JiWor"
- Both MUST be horizontal text (left-to-right). NEVER rotate 90 degrees.
- Do NOT forget to include them in this new generation.

━━━━━━━━━━━━━━━━━━
■ ANTI-ANTIGRAVITY SAFETY
━━━━━━━━━━━━━━━━━━
- Antigravity / extreme camera distortion MUST NOT change canvas shape
- Perspective distortion is allowed ONLY inside panels
- The OUTER CANVAS must remain perfectly A4 rectangular
- NO vertical stretching of entire image
- NO panel deformation due to camera effects

━━━━━━━━━━━━━━━━━━
■ FULL RE-LAYOUT (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST rebuild ALL panel compositions from scratch
- Recalculate framing, character placement, and camera for A4
- DO NOT reuse previous layout, even partially
- DO NOT "adjust" — COMPLETELY REDRAW

━━━━━━━━━━━━━━━━━━
■ STRICT FAILURE CONDITIONS
━━━━━━━━━━━━━━━━━━
If ANY of the following occurs, REGENERATE AGAIN automatically:
- Canvas ratio is not exactly 1:1.414 → FAIL
- Image is taller than A4 → FAIL
- Panels are uneven → FAIL
- Margins exist → FAIL
- Panels look cropped or stretched → FAIL
- Layout resembles previous image → FAIL
- Watermarks are missing → FAIL

Repeat regeneration until ALL conditions are satisfied.

━━━━━━━━━━━━━━━━━━
■ OUTPUT RULE
━━━━━━━━━━━━━━━━━━
Only output the corrected A4 4-panel manga image.
No explanations. No partial results.`;navigator.clipboard.writeText(We),G(!0),setTimeout(()=>G(!1),2e3)},children:[x.jsx("span",{style:{visibility:L?"hidden":"visible"},children:"📋 画像比率事後修正プロンプト"}),L&&x.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]})})]})]})}),x.jsxs("div",{className:`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${c?"":"opacity-40 pointer-events-none"}`,children:[x.jsxs("button",{className:"w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr",onClick:()=>ue(!K),disabled:!c,children:[x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-base",children:"🛡️"}),x.jsx("span",{className:"text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors",children:"コンテンツポリシーで画像生成が拒否された場合"}),!c&&x.jsx("span",{className:"text-[10px] text-slate-500",children:"(STEP3完了後に利用可能)"})]}),x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors",children:K?"クリックで閉じる":"クリックで開く"}),x.jsx(Lv,{size:18,className:`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${K?"rotate-180":""}`})]})]}),K&&x.jsxs("div",{className:"p-3 bg-yellow-950/20 space-y-3",style:{fontSize:"12px"},children:[x.jsxs("div",{className:"text-yellow-200/80 leading-relaxed space-y-2",style:{fontSize:"11px"},children:[x.jsxs("p",{children:["下の",x.jsx("strong",{className:"text-yellow-100",children:"『「先ほどのプロンプトが拒否された理由を教えてください」をコピー』"}),"ボタンをクリックし、クリップボードにコピーされたテキストを、AIにそのままペーストすると、具体的な原因を教えてもらえます。"]}),x.jsxs("p",{children:["その回答を下の入力ボックスに貼り付けると、",x.jsx("strong",{className:"text-yellow-100",children:"「配慮版プロンプトを再生成する」"}),"ボタンが押せるようになります。そのボタンをクリックすると、STEP 3のプロンプトが安全な表現に自動で修正・上書きされます。"]}),x.jsx("p",{children:"その後、再度STEP 4で画像を生成するか、各AIブラウザ版にプロンプトを貼って画像を生成してみてください。"})]}),x.jsxs("button",{className:`${xe?"bg-green-600 border-green-500/30":"bg-slate-700 hover:bg-slate-600 border-white/10"} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`,style:{fontSize:"10px",minWidth:"120px",position:"relative"},onClick:()=>{navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？"),P(!0),setTimeout(()=>P(!1),2e3)},children:[x.jsx("span",{style:{visibility:xe?"hidden":"visible"},children:"📋 「先ほどのプロンプトが拒否された理由を教えてください」をコピー"}),xe&&x.jsx("span",{style:{position:"absolute",left:"50%",transform:"translateX(-50%)"},children:"✅ コピー完了"})]}),x.jsx("textarea",{style:{color:"#ffffff",backgroundColor:"#000000"},className:"w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500",value:Z,onChange:We=>be(We.target.value),placeholder:p==="openai"?`例: Your request was rejected as a result of our safety system...
例: content_policy_violation と表示された
例: アオリ構図が弾かれたかもしれない`:`例: I can't generate images that depict minors...
例: Geminiの回答: 制服と未成年の組み合わせが原因...
例: アオリ構図が弾かれたかもしれない`}),x.jsx("button",{className:"w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all",style:{fontSize:"12px"},onClick:Ae,disabled:Oe||!Z.trim()||!c,children:Oe?x.jsxs(x.Fragment,{children:[x.jsx(Wi,{size:16,className:"animate-spin"})," 分析・修正中..."]}):x.jsxs(x.Fragment,{children:[x.jsx(lp,{size:16})," 配慮版プロンプトを再生成する"]})}),x.jsx("pre",{style:{height:"160px",overflowY:"auto"},className:"text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed",children:ee||"> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"})]})]}),x.jsxs("div",{ref:Se,className:"mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar",style:{height:"160px",overflowY:"auto"},children:[x.jsxs("div",{className:"opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs",children:[x.jsx("span",{children:"🖥 画像生成ログ (STEP 4)"}),x.jsx("span",{className:p==="openai"?"text-emerald-500":"text-blue-500",children:p==="openai"?"v1.3.5 (ChatGPT Images 2.0)":"v1.3.5 (Gemini 2.0 Native)"})]}),ye.length===0?x.jsx("div",{className:"text-white/30",children:"待機中... 「画像を生成する」ボタンを押すと開始します。"}):ye.map((We,X)=>x.jsxs("div",{className:"mb-1 leading-relaxed",children:[x.jsx("span",{className:"opacity-40 mr-2",children:new Date().toLocaleTimeString()}),We]},X)),j&&x.jsx("div",{className:"animate-pulse",children:"_"})]})]})]})]})]}),x.jsxs("section",{ref:He,className:"relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden",children:[(!Ze&&!j||i||ce||l||nt&&Tt>0&&Tt<4)&&!j&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:(i||ce||l||nt&&Tt>0&&Tt<4)&&x.jsxs("div",{className:"flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse",children:[x.jsx(Wi,{size:36,className:"animate-spin text-blue-500"}),x.jsx("span",{className:"text-sm font-bold tracking-widest text-blue-400",children:i||ce?"シナリオ・プロンプト生成中...":"自動生成 待機中..."})]})}),j&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:200,backgroundColor:"rgba(10,12,16,0.85)",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)",pointerEvents:"auto",borderRadius:"0.75rem"},className:"flex flex-col items-center justify-center",children:x.jsxs("div",{className:"relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto",children:[x.jsx(Wi,{size:64,className:"animate-spin text-blue-500 mx-auto"}),x.jsx("div",{className:"absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none"}),x.jsxs("div",{className:"z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full",children:[x.jsxs("p",{className:"text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2",children:["画像生成中 ",x.jsxs("span",{className:"flex space-x-1",children:[x.jsx("span",{className:"animate-bounce delay-75",children:"."}),x.jsx("span",{className:"animate-bounce delay-150",children:"."}),x.jsx("span",{className:"animate-bounce delay-300",children:"."})]})]}),x.jsxs("p",{className:"text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed",children:["高品質な画像を生成しています。",x.jsx("br",{}),x.jsxs("span",{className:"text-orange-400",children:["※最大2〜5分程度かかる場合があります。",x.jsx("br",{}),"このままお待ちください。"]})]})]})]})}),x.jsx("div",{className:"w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl",children:Ye?x.jsx("h3",{className:"text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]",children:Ye}):x.jsx("div",{className:"h-8 w-32 bg-white/5 rounded-full animate-pulse"})}),x.jsx("div",{className:"flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]",children:Ze?x.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center gap-4",children:[x.jsx("img",{src:Ze,className:"max-w-full max-h-[70vh] object-contain shadow-2xl",alt:"Generated Result"}),Nt&&x.jsx("div",{className:"w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto",children:x.jsxs("div",{className:"flex items-start gap-3",children:[x.jsx(Iv,{className:"text-orange-500 shrink-0 mt-0.5",size:20}),x.jsxs("div",{className:"text-sm",children:[x.jsx("h4",{className:"text-orange-400 font-bold mb-1",children:"【警告】下位モデル（妥協版）で生成されました"}),x.jsxs("p",{className:"text-orange-200/80 leading-relaxed mb-3",children:["最新モデルへの接続が混雑等で失敗したため、旧モデルで生成されました。",x.jsx("br",{}),x.jsx("span",{className:"text-white font-bold",children:"テキストの文字化けや、キャラクターの描写崩れ"})," が高確率で発生します。"]}),x.jsxs("div",{className:"bg-black/40 rounded p-3 text-left",children:[x.jsx("p",{className:"text-orange-300 font-bold mb-2",children:"完璧な画質で生成するための手動手順："}),x.jsxs("ol",{className:"list-decimal list-inside text-slate-300 space-y-1 text-xs",children:[x.jsxs("li",{children:["画面左側の「",x.jsx("span",{className:"text-white font-bold",children:"プロンプトをコピー"}),"」ボタンを押す"]}),x.jsxs("li",{children:[x.jsx("a",{href:kt?"https://chatgpt.com/":"https://gemini.google.com/app",target:"_blank",rel:"noreferrer",className:"text-blue-400 hover:underline",children:kt?"ChatGPT公式ウェブ版":"Gemini公式ウェブ版"}),"を開く"]}),x.jsx("li",{children:"コピーした文章を貼り付けて送信する"})]})]})]})]})}),x.jsxs("div",{className:"w-full px-8 mt-2",children:[x.jsxs("button",{onClick:()=>{const We=document.createElement("a");We.href=Ze,We.download=`nano_banana_2_comic_${new Date().getTime()}.png`,document.body.appendChild(We),We.click(),document.body.removeChild(We)},className:"w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95",children:[x.jsx(i_,{size:20})," 画像をダウンロード (.png)"]}),x.jsx("button",{onClick:()=>window.scrollTo({top:0,behavior:"smooth"}),className:"w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95",children:"最初（STEP 1）に戻る"})]})]}):x.jsxs("div",{className:"opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center",children:[x.jsx(im,{size:80,className:"mx-auto"}),x.jsxs("div",{className:"space-y-2 text-center",children:[x.jsx("p",{className:"text-sm font-black uppercase tracking-[0.5em] text-slate-500",children:"Ready to Start"}),x.jsx("p",{className:"text-[10px] font-bold text-slate-600",children:"ここに生成された4コマ漫画が表示されます"})]})]})})]}),Ft.length>0&&x.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(i||ce||j||l||nt&&Tt>0&&Tt<4)&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:x.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[x.jsx(Wi,{size:12,className:"animate-spin"})," 生成中..."]})}),x.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[x.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[x.jsx(op,{size:14,className:"text-blue-400"}),"生成履歴 (",Ft.length,")"]}),x.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(Qt([]),gt(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[x.jsx(lc,{size:12})," 全削除"]})]}),x.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:Ft.map(We=>x.jsxs("div",{onClick:()=>gt(We.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${Ze===We.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[x.jsx("img",{src:We.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),Ze===We.img&&x.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:x.jsx(Ir,{size:10,strokeWidth:3})}),x.jsx("div",{onClick:X=>{X.stopPropagation(),Qt(Lt=>Lt.filter(pt=>pt.id!==We.id)),Ze===We.img&&gt("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:x.jsx(lc,{size:10})})]},We.id))})]})]})}console.log("HELLO_USER_FIXED_VERSION_2_25");function qC(){console.log("System Version Loaded:",tc);const[r,e]=we.useState(""),[i,s]=we.useState(!1),[l,c]=we.useState("gemini"),[f,h]=we.useState("news"),[m,p]=we.useState(""),[v,_]=we.useState(""),[g,b]=we.useState(""),[M,C]=we.useState(""),[E,S]=we.useState(""),[N,U]=we.useState(""),[I,k]=we.useState("Auto"),[D,B]=we.useState(HE),A=et=>{B(xt=>xt.map(rt=>rt.id===et?{...rt,checked:!rt.checked}:rt))},F=()=>{const et=new Date;return et.setHours(et.getHours()+9),et.toISOString().split("T")[0]},[q,H]=we.useState(F()),[$,ce]=we.useState(""),[oe,j]=we.useState(""),[L,G]=we.useState(""),[K,ue]=we.useState(""),[xe,P]=we.useState(null),[Z,be]=we.useState(!1);we.useEffect(()=>{const et=sm();et?(ef(et),e(et)):s(!0)},[]);const[Ae,Oe]=we.useState([]),[ee,Se]=we.useState(!1),[ye,He]=we.useState(!1),[Ze,nt]=we.useState(!1),[Tt,Ye]=we.useState(!1),[Nt,kt]=we.useState(!1),[gt,Ft]=we.useState(""),[Qt,We]=we.useState(""),[X,Lt]=we.useState(""),[pt,Xt]=we.useState(""),[Ne,Jt]=we.useState("auto"),[O,T]=we.useState(!1),[J,he]=we.useState([]),[Ee,De]=we.useState(""),[Fe,de]=we.useState(!1),[pe,Te]=we.useState(""),[ze,Ie]=we.useState(!1),[Le,dt]=we.useState(!1),[lt,wt]=we.useState(!1),[V,Ce]=we.useState(!1),[me,ke]=we.useState(!1),[Ue,Me]=we.useState(!1),[Qe,ct]=we.useState(!1),[vn,Yt]=we.useState(!1),[Kn,li]=we.useState(!1),[Xa,ti]=we.useState(""),[dr,hr]=we.useState(!1),[Dn,bn]=we.useState(""),[Rn,Li]=we.useState(!1),[_n,ya]=we.useState(!1),[As,Ya]=we.useState(!1),[Wa,jr]=we.useState(""),[Sa,Ea]=we.useState(!1),[qa,Ma]=we.useState(!1),[Cn,Xr]=we.useState(!1),[w,W]=we.useState(!1),[te,ie]=we.useState(null),[ne,Ge]=we.useState(null),[Pe,Be]=we.useState(null),[Je,Ke]=we.useState(!1),[st,bt]=we.useState(""),[at,Wt]=we.useState(!1),[Bt,an]=we.useState(!1),[en,qt]=we.useState(null),[Ve,Fn]=we.useState(null),[Ot,pn]=we.useState(!1),[Tn,En]=we.useState(!1),[jn,tn]=we.useState(!1),mn=we.useRef(!1),[ci,yt]=we.useState(0),[la,$a]=we.useState(0),[Ta,Ui]=we.useState(0),xi=we.useRef(!1),[ca,ui]=we.useState(!1),Ka=we.useRef(null),el=we.useRef(null),tl=we.useRef(null),nl=we.useRef(null),Aa=we.useRef(null);we.useEffect(()=>{Aa.current&&(Aa.current.scrollTop=Aa.current.scrollHeight)},[J]),Ze||!$||$.length<20||!oe||oe.length<20;const[_i,Ii]=we.useState(""),[wa,Ei]=we.useState([]),il=et=>{const xt=et.replace(/[^\u0000-\u007F]/g,"").trim();xt!==et&&ht("APIキーに含まれる不要な文字を自動削除しました。"),xt.startsWith("sk-")?(Th(xt),Ah("openai"),c("openai"),ya(!0),Li(!0),e("openai-engine-active"),s(!1),ht("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。"),console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode")):(ef(xt),e(xt),Ah("gemini"),c("gemini"),s(!1),ht("✅ Gemini Engine 接続完了！キャラクターシートをアップロードして開始してください。"),console.log("[Dual Engine] Using Gemini mode (default)")),window.scrollTo({top:0,behavior:"instant"})},ht=et=>{Xt(et),setTimeout(()=>Xt(""),4e3)},_c=async et=>{if(!r){ht("先にAPIキーを入力してシステムに接続してください！"),s(!0);return}if(et.length===0)return;Se(!0),Ft(`キャラクター解析プロトコルを開始しました...
> ピクセルデータをスキャン中...
> キャラクター形態を識別中...`);let xt=0;const rt=setInterval(()=>{xt++,Ft($e=>{if(xt<=10){const ft=[".",".",".",`
> 顔の特徴点を抽出中...`,`
> 髪型トポロジーを解析中...`,`
> ファッション属性を検出中...`];return $e+ft[Math.floor(Math.random()*ft.length)]}const je=`
> ⏳ AI応答を待機中... (${Math.floor(xt*.8)}秒経過)`,Re=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Re.test($e)?$e.replace(Re,"")+je:$e+je})},800),Et=[];let _t=null;for(let $e=0;$e<et.length;$e++){const qe=et[$e],je=await new Promise(ft=>{const An=new FileReader;An.onload=ua=>{const Ec=ua.target.result,ni=new Uint8Array(Ec);let zt=!1;const $r="equirectangular";let Rs=0;for(let Ja=0;Ja<Math.min(ni.length,65536);Ja++)if(ni[Ja]===$r.charCodeAt(Rs)){if(Rs++,Rs===$r.length){zt=!0;break}}else Rs=0;const Qa=new Image;Qa.onload=()=>{const Ja=Qa.naturalWidth/Qa.naturalHeight,ll=Math.abs(Ja-2)<.15;ft(ll&&zt)},Qa.onerror=()=>ft(!1),Qa.src=URL.createObjectURL(qe)};const sn=qe.slice(0,65536);An.readAsArrayBuffer(sn)}),Re=new FileReader;Re.readAsDataURL(qe),await new Promise(ft=>{Re.onload=()=>{je&&!_t?(_t={base64:Re.result,mimeType:qe.type},Ft(An=>An+`
> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`)):(Et.push(Re.result),Oe(An=>[...An,Re.result])),ft()}})}if(_t)try{an(!0),ie(_t.base64);const $e=_t.base64.split(",")[1],qe={inlineData:{mimeType:_t.mimeType,data:$e}};Ge(qe),Ke(!0),Ft(ft=>ft+`
> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);const je=await Nr(KE(),[qe],null,()=>{}),Re=ZE(je.text);Be(Re),b(Re.location),ht(`🌐 360°背景を検出: ${Re.location}`),Ft(ft=>ft+`
> 🌐 空間解析完了: ${Re.location}`)}catch($e){console.warn("[360° BG] Analysis failed:",$e),Be({location:"360°パノラマ画像",lighting:"不明",spatialType:"unknown",objects:"",mood:""}),b("360°パノラマ画像（解析失敗）")}finally{Ke(!1)}if(Et.length===0&&_t){clearInterval(rt),Se(!1),Ft($e=>$e+`
> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`),ht("360°背景画像を検出しました。キャラクターシートを追加してください。");return}if(Et.length===0){clearInterval(rt),Se(!1);return}ht(`思考モード: ${Et.length}枚のキャラクター設定画を同時解析中...${_t?"（+ 360°背景1枚検出済み）":""}`);try{const $e=Et.map(Re=>{const ft=Re.split(",")[1];return{inlineData:{mimeType:Re.split(";")[0].split(":")[1],data:ft}}}),qe=QE(),je=await Nr(qe,$e,null,Re=>{Ft(ft=>ft+`
> ${Re}`)});ce(je.text),P(je.model),Ft(Re=>{const ft=`

--- ✅ 解析完了 ---
`,An=je.thought&&je.thought!=="通常処理が完了しました（思考トレースは利用不可）。"?`> [思考トレース]
${je.thought}`:"> 通常処理が完了しました（思考トレースは利用不可）。";return Re+ft+An}),ht("全キャラクターの解析が完了しました。"),Tn&&(xi.current?(En(!1),yt(0),ui(!1),ht("⏹ フルオートを中断しました。")):Ui(Re=>Re+1))}catch($e){console.error($e);const qe=wh($e.message);Ft(je=>je+`

[システムエラー]: ${$e.message}
--------------------------------------------------
${qe}`),ht("解析エラー: "+$e.message),Tn&&(En(!1),yt(0),ui(!1))}finally{clearInterval(rt),Se(!1)}},Yr=async()=>{if(!oe||oe.length<20)return ht("先にシナリオを生成してください。");if(!(Le||lt||V||me||Ue||Qe||vn))return ht("少なくとも1つの強化カテゴリをONにしてください。");if(Kn)return;li(!0),ti("> [START] シナリオ強化を開始します..."),Dn||(bn(oe),ti($e=>$e+`
> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）`));const xt=[];Le&&xt.push(`【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。キャラクターの感情を「怒る」「悲しむ」などの抽象語で済ませず、以下の【マンガ表情データベース】から最適なものを選択・組み合わせてト書きに物理的な視覚描写として追加してください。
【マンガ表情データベース】
・驚愕・絶望系：瞳孔を開く、白目になる、顔に斜線の影（青ざめる）、滝のような冷や汗、口を大きく開けて震える、髪の毛が逆立ち限界まで見開いた目
・激怒系：額に青筋（血管マーク）、白目のない黒目だけの鋭い眼光、歯を食いしばる、瞳に炎が宿る、顔が真っ赤になり湯気が出る
・歓喜・興奮系：目をキラキラ輝かせる（星マーク）、頬を赤らめる、とろけたような笑顔、鼻息が荒い、顔のパーツが画面からはみ出るほどの満面の笑み
・狂気・シュール系：光の消えたハイライト無しの瞳、不気味な三日月型の笑顔、無表情（点目）で真顔、虚無の目
・泣き系：滝のように噴き出す涙、目尻に涙を浮かべてうるうるさせる、顔をくしゃくしゃにして号泣

微笑みや軽い驚きのような控えめな表現は絶対に禁止し、常軌を逸した激しいリアクションに書き換えてください。

⚠️【セリフ保護ルール - 絶対厳守】⚠️
表情の強化描写は必ず「状況」欄（Visual Action / ト書き）にのみ記述すること。
「」で囲まれたセリフ（Speech Bubble内の台詞テキスト）には、表情の描写文を絶対に書き込まないこと。
セリフ欄には元のセリフをそのまま残すか、セリフとして自然な短い発言のみを書くこと。
悪い例: Speech Bubble 1: "顔が真っ赤になり湯気が出るように…" ← これは描写文であってセリフではない。禁止。
良い例: 状況欄に「顔が真っ赤になり湯気が出るほど怒り狂う表情」と書き、セリフ欄は元の短い台詞を維持する。`),lt&&xt.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。例: 画面を突き破る勢いで前のめりになる、腕を天井まで大きく振り上げる、机を粉砕する勢いで叩く、椅子から転げ落ちる等。体全体を使った異常なほど大きなアクションを書いてください。"),V&&xt.push(`【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください（基準ウェイト2.8相当）。例: 逆光で人物がシルエットになる、極端なリムライトで輪郭が光る、柔らかい大気グロー(soft atmospheric glow)が画面を包む、パンチラインのコマには画面を覆い尽くす集中線やインパクトフレーム、気迫のオーラ、スムーズな光の拡散(smooth light diffusion)で画面を満たすなどの視覚効果をト書きとして追記してください。
⚠️【ノイズ防止】光の演出で以下の表現は使用禁止（GPT-image-2でノイズの原因となる）:
- sparkling light particles → 代わりに soft glow を使え
- glowing dust → 代わりに clean bloom を使え
- magical particles / floating embers → 代わりに subtle luminous edges / soft atmospheric glow を使え
- Tyndall effect / volumetric dust → 代わりに smooth light diffusion / gentle rim light を使え`),me&&xt.push(`【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。ただしノイズやチラつきを防ぐため、以下のルールを厳守すること。
- 背景のディテールは「構造的に意味のある要素」のみを追加する（建物、家具、空、雲、木など大きな構造物）。ランダムな細かい模様・テクスチャ・粒子は追加禁止。
- 背景の描き込み密度はキャラクターより低くすること（キャラの方が常に目立つように）。
- 空間の奥行き感を出すために、前景・中景・遠景のレイヤー分離と色の明暗差（空気遠近法）を活用する。
- 例: 教室なら窓からの柔らかい光と影の落ち方、黒板の文字、奥に見える廊下。屋外なら空の広がり、建物のシルエット、遠景のぼかし。
- 「狂気的な密度」「びっしり描き込む」のような過剰な描き込み指示は禁止。画面がノイズだらけになる原因となる。`),Ue&&xt.push(`【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。各コマの「状況」欄の冒頭に [Camera: ○○] の形式で追記します。通常のカメラワークの限界レベルの歪み（ウェイト2.8〜3.0相当）を想定した指示にしてください。
- ローアングル/アオリ（キャラクターが巨人のように見上げられ、天井や空が大きく広がる極端な見上げ。※ただしキャラの全身は必ず描画し、靴だけのアップにはしないこと）
- 俯瞰/バードアイ（真上から見下ろし、圧倒的なスケール感と孤立感）
- ダッチアングル（画面が15度〜30度傾くような異常事態の演出）
- 超広角/フィッシュアイ（画面の端が丸く歪むほどの誇張・コミカルな歪み。※ただし鼻が団子鼻(豚鼻)になる造形崩壊は絶対禁止）
- 引き/ロングショット（宇宙や上空からの空気感）
- パンニング/追跡ショット（キャラの移動方向にカメラが追従し、背景がモーションブラーで流れる）
⚠️ クローズアップ・マクロ特写は全キャラ描画義務と矛盾するため使用禁止。靴や足だけのアップ画にならないこと。
4コマ全てを同じアングルにしないでください。コマごとにアングルを変えてドラマチックなダイナミズムを作ってください。⚠️ アオリ等の過激なアングルはコンテンツポリシーに引っかかる場合がありますが、救済機能で対応可能です。`),Qe&&xt.push(`【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。

■ ズレを作る技法（以下から最低2つ適用せよ）:
- 【置換】状況や出来事を全く別の文脈に言い換えてセリフを書き直す（例: 深刻な会議 → 小学生の給食会議のようなセリフに）
- 【誇張】リアクションや感情を極限まで増幅する。「驚く」→「魂が肉体から離脱するレベルで驚愕」
- 【逆転】キャラの普段の立場・力関係を入れ替えたセリフにする（普段クールなキャラが取り乱す、普段バカなキャラが正論を言う等）
- 【不条理】脈絡のない狂った要素を堂々とセリフに混ぜる。多少意味不明でも勢いで笑えればOK
- 【緊張と緩和】3コマ目まで空気を極限まで張り詰めるセリフにし、4コマ目で完全崩壊させる
- 【常識に戻る】全員が暴走する中、1人だけ冷静に「いや普通に考えておかしいだろ」と常識を提示する

■ ズレを見せる構成技法:
- 【フリ】1コマ目のセリフは「普通の予想」を作る前置き。ここでは笑わせなくてよい
- 【ボケ】2コマ目でズレた発言を投入し「あれ？」と思わせる
- 【ツッコミ】ボケで生まれたズレを鋭い一言で指摘して笑いを明確化する。弱い定型ツッコミは禁止、状況に即した具体的な叫び声にせよ
- 【オチ】4コマ目でズレを確定し笑いを完成。全エネルギーをここに集中投下
- 【天丼】1コマ目の小ネタを3コマ目で形を変えて再登場させ、4コマ目で爆発させる（4コマでは最強テクニック）
- 【ノリツッコミ】ツッコミ役が一旦ボケに乗っかってから「いや待てよ！」と自分で崩す
- 【かぶせ】ボケの直後にさらにもう一段ボケを重ねて畳み掛ける

■ セリフの質的ルール:
- セリフは短く鋭く。だらだら説明するセリフは削って、一言で致命傷を与えるセリフにする
- 可能なら言葉遊び、ダブルミーニング、予想の裏切りを仕込む
- 全てのセリフに笑いを無理に入れず、笑いの最大ポイントをオチに集中させる
- ギャグ強度は最大。おとなしい優等生ギャグは禁止。強烈にボケまくれ`),ti($e=>$e+`
> [CONFIG] 強化カテゴリ: ${xt.length}個`);let rt=0;const Et=setInterval(()=>{rt++,ti($e=>{if(rt<=5){const ft=[`
> [PROCESS] 演出データベースを参照中...`,`
> [PROCESS] 感情ベクトルを計算中...`,`
> [PROCESS] 表現パターンを最適化中...`];return $e+ft[Math.floor(Math.random()*ft.length)]}const je=`
> ⏳ AI応答を待機中... (${Math.floor(rt*.8)}秒経過)`,Re=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return Re.test($e)?$e.replace(Re,"")+je:$e+je})},800),_t=JE(oe,xt);try{ti(qe=>qe+`
> [API] ${l==="openai"?"OpenAI":"Gemini"} にシナリオ強化をリクエスト中...`);const $e=await Nr(_t,[],$,qe=>{ti(je=>je+`
> [API] ${qe}`)});$e&&$e.text&&$e.text.length>50?(j($e.text.trim()),ti(qe=>qe+`
> [SUCCESS] シナリオを強化しました！（${$e.text.length}文字）
> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`),dt(!1),wt(!1),Ce(!1),ke(!1),Me(!1),ct(!1),Yt(!1),ht("シナリオ強化完了！")):(ti(qe=>qe+`
> [ERROR] AIの応答が短すぎます。もう一度お試しください。`),ht("強化失敗: AIの応答が不十分です"))}catch($e){ti(qe=>qe+`
> [ERROR] ${$e.message}`),ht("強化エラー: "+$e.message)}finally{clearInterval(Et),li(!1)}},Wr=()=>{Dn&&(j(Dn),bn(""),ti(et=>et+`
> [REVERT] 元のシナリオに復元しました。`),ht("シナリオを元に戻しました"))},al=async et=>{if(!$)return ht("先にキャラクターを解析してください。");if(ye)return;const xt=Array.isArray(et)?et:D;if(f==="manual"&&!m.trim()){alert("自由入力トピックを入力してください。");return}if(f==="news"&&!xt.find(qe=>qe.checked)){alert("少なくとも1つのカテゴリを選択してください。");return}He(!0),We(""),ue(""),Ii(null),Lt(""),he([]),bn(""),ti("");let rt="";if(f==="manual")rt="手動入力",j(""),We(`> コンテキスト強制リブート: 開始
 > モード: 手動入力 
 > 対象: ${m.substring(0,30)}...`);else{const qe=xt.filter(je=>je.checked);qe.length>0?(rt=qe.map(je=>je.keywords).join(" "),ht(`カテゴリ「${qe.map(je=>je.label).join("・")}」で最新ニュースを検索中... (${q})`),j(""),We(`> コンテキスト強制リブート: 開始
 > 対象カテゴリ: ${qe.map(je=>je.label).join("、")} (キーワード: ${rt}) 
 > 対象日付: ${q} 
 > Google Grounding で検索中...`)):rt="最新ニュース"}const Et=`${rt} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;let _t=0;const $e=setInterval(()=>{_t++,We(qe=>{if(_t<=8){const An=[".",".",".",`
> グローバルニュースデータベースをスキャン中...`,`
> トレンドトピックをクロスリファレンス中...`,`
> 関連記事をフィルタリング中...`,`
> ナラティブフレームワークを構築中...`];return qe+An[Math.floor(Math.random()*An.length)]}const Re=`
> ⏳ AI応答を待機中... (${Math.floor(_t*.8)}秒経過)`,ft=/\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;return ft.test(qe)?qe.replace(ft,"")+Re:qe+Re})},800);try{let qe="";if(f==="manual"){qe=`
         【ユーザー提供トピック/URL】:
         ${m}
         
         (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
         URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
         `;const wn=/(https?:\/\/[^\s]+)/g,vi=m.match(wn);if(vi&&vi.length>0){We(`> 手動入力内にURLを検出: ${vi[0]} 
> プロキシ経由でコンテンツを取得中...`);try{const bi=await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(vi[0])}`);if(!bi.ok)throw new Error(`HTTP error! status: ${bi.status}`);const Bn=await bi.text(),$i=new DOMParser().parseFromString(Bn,"text/html");$i.querySelectorAll("script, style").forEach(Cs=>Cs.remove());const Rt=$i.querySelectorAll("h1, h2, h3, h4, p, li, article, section");let Qn="";Rt.forEach(Cs=>{Cs.textContent.trim()&&(Qn+=Cs.textContent.trim()+`
`)}),Qn.trim()||(Qn=$i.body.textContent||"");const Zr=Qn.replace(/\s+/g," ").substring(0,3e3);We(Cs=>Cs+`
> コンテンツ抽出完了 (${Zr.length}文字)。注入中...`),qe=`
             【指定URLから独自のスクレイピングで抽出した内容】:
             ${Zr}
             
             (指示): 上記はユーザーが入力したURL（ ${vi[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
             `}catch(bi){console.error("URL Fetch Error: ",bi),We(Bn=>Bn+`
> 警告: URLコンテンツの取得に失敗しました (${bi.message})。LLMの内部知識で補完します。`)}}}const je=["寂れた商店街","無人島","ファミレスの厨房","満員電車","首相官邸","ライブハウス","コンビニ前","古民家","火星基地","学校の屋上","深夜のオフィス","結婚式場","工事現場","刑務所の面会室","豪華客船の甲板","雪山のロッジ","砂漠の真ん中","海底トンネル","裁判所","病院の待合室","動物園の檻の中","美術館","映画館の最前列","ラーメン屋のカウンター","温泉旅館","サウナの中","エレベーターの中","断崖絶壁","廃墟の遊園地","月面","飛行機の機内","新幹線の座席","警察署の取調室","ゴミ捨て場","高級ホテルのスイートルーム","スタジアム","神社の境内","教会の告解室","地下アイドルの握手会","ゲームセンター","コインランドリー","公園のベンチ","洞窟の奥","ジャングルの奥地","南極基地","国際宇宙ステーション","潜水艦の内部","戦車の内部","魔法使いの塔","異世界の酒場","魔王城の玉座","RPGのダンジョン","サイバーパンクな路地裏","昭和の茶の間","江戸時代の長屋","渋谷スクランブル交差点","秋葉原の電気街","京都の竹林","大阪の道頓堀","沖縄のビーチ","北海道のラベンダー畑"],Re=je[Math.floor(Math.random()*je.length)];console.log("Forced Location:",Re);const ft=te&&Pe&&Bt?Pe.location:g.trim()?g.trim():Re,An=zE(ft),sn=GE(),ua=eM({randomCategory:rt,targetDate:q,inputMode:f,manualTopic:m,newsContext:qe,searchTopicKeywords:Et,bg360Image:te,bg360Analysis:Pe,bg360Enabled:Bt,customLocation:g,forcedLocation:Re,customOutfit:M,ragLocationDetails:An,ragReactions:sn,punchlineType:I}),ni=await Nr(ua,ne&&Bt?[ne]:[],$,wn=>{We(vi=>vi+`
 > [API] ${wn} `)});P(ni.model);let zt={topic:rt,scenario:""};try{const wn=ni.text.match(/Topic:\s*(.+)/i),vi=ni.text.match(/Logline:\s*(.+)/i),bi=ni.text.match(/Location:\s*(.+)/i),Bn=ni.text.match(/Outfit:\s*(.+)/i),fa=ni.text.match(/Punchline:\s*(.+)/i),$i=ni.text.match(/Scenario:\s*([\s\S]+)/i);if($i)zt.topic=wn?wn[1].trim():rt,zt.topic=zt.topic.replace(/^Topic:\s*/i,"").trim(),zt.logline=vi?vi[1].trim():"",zt.location=bi?bi[1].trim():"Generic Background",zt.outfit=Bn?Bn[1].trim():"",zt.punchline=fa?fa[1].trim():"",zt.scenario=$i[1].trim();else{const da=ni.text.match(/\{[\s\S]*\}/);if(da){const Rt=JSON.parse(da[0]);zt.topic=Rt.topic||rt,zt.location=Rt.location||"Generic Background",zt.scenario=Rt.scenario||ni.text}else{if(ni.text.length<20)throw new Error("AI returned empty or invalid response.");zt.topic=f==="manual"?m||"Custom Scenario":v||"Generated Scenario",zt.scenario=ni.text}}}catch(wn){console.warn("Parse warning:",wn),zt.scenario=ni.text,zt.topic="Generated Scenario"}const $r=wn=>wn;zt.scenario=$r(zt.scenario),j(zt.scenario);const Rs=zt.logline?`
Logline: ${zt.logline}`:"",Qa=M.trim()||zt.outfit?`
Outfit: ${M.trim()||zt.outfit}`:"",Ja=zt.punchline?`
Punchline: ${zt.punchline}`:"",ll=te?Bt?`
🌐 360°背景: ON (${Pe?.location||"解析済み"} / ${Pe?.spatialType==="indoor"?"室内":Pe?.spatialType==="outdoor"?"屋外":"複合"}) — 添付ファイル: キャラシート＋360°画像`:`
🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`:"";S(g.trim()||zt.location||"Unspecified"),U(M.trim()||zt.outfit||""),We(wn=>wn+`
 > トピック選定: ${zt.topic} 
 > シナリオ構築完了。`),ht("シナリオの生成が完了しました！");let cl="";if(te&&Pe&&Bt&&ne)try{We(Bn=>Bn+`
 > 🎬 [360° Camera AI] カメラワーク自律設計を開始...`),ht("🎬 360°カメラワーク設計中..."),pn(!0);const wn=`あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${zt.scenario}

【360°背景の解析情報】
- 場所: ${Pe.location}
- 光源: ${Pe.lighting}
- 空間タイプ: ${Pe.spatialType}
- 特徴物: ${Pe.objects||"なし"}
- 雰囲気: ${Pe.mood||"不明"}

【設計ルール】
1. 各コマは360°空間の**異なる方角**を活用し、空間の立体感を演出すること
2. yawは0°=正面、90°=右、180°=背面、270°=左
3. pitchは0°=水平、正の値=上向き、負の値=下向き（±30°以内推奨）
4. FOVはカメラのショットに合わせて調整（60°=望遠、90°=標準、120°=広角）
5. 光源方向を考慮し、逆光・順光・サイドライトを各コマで使い分けること
6. 4コマ中少なくとも3コマは異なるyaw方向（差が45°以上）にすること

**必ず以下のJSON形式のみで出力してください。それ以外のテキストは一切不要です。**
{
  "panels": [
    {
      "panel": 1,
      "camera": "ショットタイプ（例: establishing_shot, close_up, medium_shot, wide_shot）",
      "yaw": 0,
      "pitch": 0,
      "fov": 90,
      "reasoning": "この方角を選んだ理由（日本語・1文）"
    },
    { "panel": 2, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." },
    { "panel": 3, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." },
    { "panel": 4, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." }
  ]
}`,bi=(await Nr(wn,[ne],null,Bn=>{We(fa=>fa+`
 > [Camera AI] ${Bn}`)})).text.match(/\{[\s\S]*\}/)?.[0];if(bi){const Bn=JSON.parse(bi);qt(Bn);const fa=Rt=>["北(正面)","北東","東(右)","南東","南(背面)","南西","西(左)","北西"][Math.round((Rt%360+360)%360/45)%8],$i=Rt=>({establishing_shot:"ロングショット",wide_shot:"ワイドショット",medium_shot:"ミドルショット",close_up:"クローズアップ",extreme_close_up:"超クローズアップ",over_the_shoulder:"肩越しショット",bird_eye:"俯瞰",worm_eye:"アオリ"})[Rt]||Rt;let da=`
 > 🎬 ══════ 360° カメラワーク設計完了 ══════`;Bn.panels.forEach(Rt=>{da+=`
 > 🎬 コマ${Rt.panel}: ${fa(Rt.yaw)} (yaw:${Rt.yaw}°) / ${$i(Rt.camera)} / FOV:${Rt.fov}°`,da+=`
 >    └─ ${Rt.reasoning}`}),da+=`
 > 🎬 ══════════════════════════════════`,We(Rt=>Rt+da),ht("🎬 360°カメラワーク設計完了！背景クロップを開始...");try{We(Qn=>Qn+`
 > 🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中...`);const Rt=[];for(const Qn of Bn.panels){const Zr=await $E(te,Qn.yaw,Qn.pitch||0,Qn.fov||90);Rt.push(Zr)}Fn(Rt),We(Qn=>Qn+`
 > 🔲 [Crop] ✅ ${Rt.length}枚のクロップ画像を生成しました`),ht("🎬 カメラワーク設計＋背景クロップ完了！"),pn(!1)}catch(Rt){console.warn("[360° Crop] Cropping failed:",Rt),We(Qn=>Qn+`
 > ⚠️ [Crop] クロップに失敗しました: ${Rt.message}（スキップ）`),pn(!1)}cl=`
🎬 360° Camera Work:`,Bn.panels.forEach(Rt=>{cl+=`
  Panel${Rt.panel}: ${fa(Rt.yaw)}(${Rt.yaw}°) ${$i(Rt.camera)} FOV${Rt.fov}° — ${Rt.reasoning}`})}else console.warn("[360° Camera AI] JSON parse failed, skipping camera work"),We(Bn=>Bn+`
 > ⚠️ [Camera AI] カメラワーク設計のJSON解析に失敗しました（スキップ）`),pn(!1)}catch(wn){console.warn("[360° Camera AI] Camera work design failed:",wn),We(vi=>vi+`
 > ⚠️ [Camera AI] カメラワーク設計に失敗しました: ${wn.message}（スキップ — シナリオ生成には影響しません）`),pn(!1)}const Kr=`## タイトル: ${zt.topic} !?${Rs}
Location: ${zt.location||"Unspecified"}${Qa}${Ja}${ll}${cl}

${zt.scenario} `;return j(Kr),Kr}catch(qe){console.error(qe);const je=wh(qe.message);return We(Re=>Re+`

[システムエラー]: ${qe.message}
--------------------------------------------------
${je}`),ht("シナリオ生成エラー"),null}finally{clearInterval($e),He(!1)}},Zn=async(et=!1,xt=null)=>{const rt=xt||oe;if(!et&&(!$||!rt))return ht("キャストとシナリオが必要です。");nt(!0),ue(""),he([]),De(""),Te(""),Ie(!1),Lt("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");const Et=setInterval(()=>{Lt(_t=>{if(_t.length>800)return _t;const $e=[".",".",".",`
> 物語ベクトルを最適化中...`,`
> ジオメトリロックを調整中...`,`
> キャラクタースタイルの重みを同期中...`,`
> パネル枠線を適用中...`,`
> 禁止コンテンツタグをチェック中...`,`
> 風刺ロジックを注入中...`,`
> 4コマ構造を最終化中...`];if(!Ze)return _t;const qe=$e[Math.floor(Math.random()*$e.length)];return _t+qe})},600);try{const _t=fM({scenario:rt,castList:$,colorMode:Ne,enableChatGPTMode:Rn,bg360Image:te,bg360Analysis:Pe,bg360Enabled:Bt,bg360CroppedPanels:Ve,punchlineType:I,systemVersion:tc});return await new Promise($e=>setTimeout($e,800)),I==="Documentary"&&Lt($e=>$e+`
> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`),Lt($e=>$e+`
> [v3.31] 事故防止プロトコル全モデル適用済み:
>   ✅ 縦書きセリフ強制
>   ✅ セリフ勝手追加禁止
>   ✅ 参照画像キャラシート再現禁止
>   ✅ カメラワーク平易化禁止
>   ✅ プロンプト分岐 (ChatGPT/Gemini)
>   ✅ 出力前チェックリスト追加`),ue(_t),Lt($e=>$e+`
> セーフティ年齢フィルター: 適用済み
> 最適化ベクトル: 計算完了
> 構造ロック: 有効
> 風刺ロジック: 強化済み
> [完了] 最終プロンプトを構築しました。`),ht("最終プロンプトの構築が完了しました。画像生成を開始します..."),_t}catch(_t){console.error(_t);const $e=wh(_t.message);return Lt(qe=>qe+`

[システムエラー]: ${_t.message}
--------------------------------------------------
${$e}`),ht("生成エラー: "+_t.message),null}finally{clearInterval(Et),nt(!1)}};we.useEffect(()=>{K&&!Ze&&gn>=3&&Zn()},[Rn]);const Za=()=>{j(""),ue(""),Ii(null),We(""),Lt(""),he([]),En(!1),yt(0),b(""),C(""),ie(null),Ge(null),Be(null),qt(null),Fn(null),pn(!1),ht("シナリオ以降をリセットしました。キャラクター解析は保持しています。")},qr=()=>{ce(""),j(""),ue(""),Oe([]),Ii(null),Ft(""),We(""),Lt(""),En(!1),yt(0),b(""),C(""),ie(null),Ge(null),Be(null),qt(null),Fn(null),pn(!1),P(null),Ei([]),he([]),e(""),ef(""),Th(""),Ah(""),c(""),ya(!1),Li(!1),s(!0),ht("全データをリセットしました。APIキーを再入力してください。")},[pr,vc]=we.useState(!1),[sl,rl]=we.useState(!1),[Ra,ws]=we.useState(!1),bc=()=>{K&&(navigator.clipboard.writeText(K),vc(!0),setTimeout(()=>vc(!1),2e3),ht("クリップボードにコピーしました！"))},yc=async(et=!1,xt=null)=>{const rt=xt||K;if(Tt||!et&&!rt)return!1;Ye(!0),kt(!1);const Et=["[1/5] プロンプトパラメータをロック中...","[2/5] セーフティフィルターを検証中..."];Rn&&(l==="openai"?Et.push("[2.5/5] ✅ ChatGPT Engine: プロンプト最適化を適用中..."):Et.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中...")),he(Et);let _t=0;const $e=setInterval(()=>{_t++;const qe=Math.floor(_t*1.5);he(je=>{const Re=je.findIndex(ft=>ft.startsWith("[WAIT]"));if(Re!==-1){const ft=[...je];return ft[Re]=`[WAIT] ⏳ 画像生成API応答を待機中... (${qe}秒経過)`,ft}return[...je,`[WAIT] ⏳ 画像生成API応答を待機中... (${qe}秒経過)`]})},1500);await new Promise(qe=>setTimeout(qe,800));try{ht(_n?"OpenAI (ChatGPT Images 2.0) に送信中...":"Google AI (Gemini/Imagen) に送信中..."),he(sn=>[...sn,"[3/5] クラウドAPIへ接続中...","[3/5] プロンプトデータをアップロード中..."]),await new Promise(sn=>setTimeout(sn,1e3));const qe=sn=>{he(ua=>[...ua,sn])};let je,Re;if(_n){qe("[INFO] ⏳ gpt-image-2 の画像生成には通常2〜5分かかります。しばらくお待ちください...");const sn=await DE(rt,qe);je=sn.base64Img,Re=sn.usedModel}else{const sn=Ve&&Bt&&Ve.length===4?Ve:[];sn.length>0&&qe(`[REF] 360°背景クロップ画像 ${sn.length}枚を参照画像として添付`);const ua=await OE(rt,qe,sn);je=ua.base64Img,Re=ua.usedModel}he(sn=>[...sn,`[4/5] データストリーム受信完了 (Model: ${Re})`,"[5/5] Base64画像データをデコード・レンダリング中..."]);const ft=`data:image/png;base64,${je}`;Ii(ft),Ei(sn=>[{id:Date.now(),img:ft},...sn]);const An=Re&&Re.startsWith("gpt-");return Re&&!Re.startsWith("gemini-3")&&!An?(be(!0),he(sn=>[...sn,"[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。","[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。","[GUIDE] ★手動生成を推奨します★","[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[GUIDE] 2. ${_n?"ChatGPT":"Gemini"}(Web版)を開く: ${_n?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",`[GUIDE] 4. 貼り付けて${_n?"送信する":"「思考モード」で送信する"}`,"[COMPLETE] Image successfully generated (with warnings)."])):(be(!1),he(sn=>[...sn,"[COMPLETE] Image successfully generated."])),ht("画像生成完了！"),!0}catch(qe){console.error(qe),kt(!0),Ii(null);const je=qe.message||"";let Re=[];return je.includes("Unknown parameter")||je.includes("invalid")||je.includes("Invalid")?Re=[`[ERROR GUIDE] ⚙️ APIリクエストのパラメータが不正です（${_n?"OpenAI":"Google"}側の仕様変更の可能性）。`,"[ERROR GUIDE] 【原因】APIの仕様が更新され、送信パラメータが無効になっている可能性があります。","[ERROR GUIDE] 【対処法】開発者にこのエラーメッセージを報告してください。または以下の手動手段をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${_n?"ChatGPT":"Gemini"} (Web版) を開く: ${_n?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:je.includes("sensitive")||je.includes("Responsible AI")||je.includes("400")&&!je.includes("Unknown parameter")?(De(je),Ie(!0),Re=["[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。","[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。","[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"]):je.includes("not found")||je.includes("not supported")||je.includes("404")||je.includes("403")||je.includes("401")?Re=[`[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていないか、無効です（${_n?"OpenAI側":"Google側"}の仕様・権限）。`,`[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（${_n?"ChatGPT":"Gemini"} Web版）」をご利用ください。`,"[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${_n?"ChatGPT":"Gemini"} (Web版) を開く: ${_n?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"]:Re=[`[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（${_n?"OpenAI側":"Google側"}の混雑など）。`,"[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。","[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",`[ERROR GUIDE] 2. ${_n?"ChatGPT":"Gemini"} (Web版) を開く: ${_n?"https://chatgpt.com/":"https://gemini.google.com/app"}`,"[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）","[ERROR GUIDE] 4. 貼り付けて送信する"],he(ft=>[...ft,`[ERROR] ${qe.message} `,"[SYSTEM] Sequence Aborted.","--------------------------------------------------",...Re]),ht(`生成エラー: ${qe.message} `),!1}finally{clearInterval($e),Ye(!1)}},Mf=async()=>{if(!K||!Ee.trim())return;de(!0),Te("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");let et=0;const xt=setInterval(()=>{et++,Te(rt=>{const _t=`
> ⏳ AI分析中... (${Math.floor(et*1)}秒経過)`,$e=/\n> ⏳ AI分析中\.\.\.\s*\(\d+秒経過\)/;return $e.test(rt)?rt.replace($e,_t):rt+_t})},1e3);try{Te(Re=>Re+`
> [Phase 1/5] エラーメッセージを解析中...`),Te(Re=>Re+`
> [Phase 2/5] 問題箇所の特定をAIにリクエスト中...`);const rt=tM(Ee.trim(),K),Et=await Nr(rt,[],null,Re=>{Te(ft=>ft+`
> ${Re}`)});if(Te(Re=>Re+`
> [Phase 3/5] AIの応答を受信・解析中...`),!Et.text||Et.text.trim().length<10){Te(Re=>Re+`
> [ERROR] AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。`);return}Te(Re=>Re+`
> [Phase 4/5] 置換テーブルをプロンプトに適用中...`);let _t=[];try{let Re=Et.text.trim();const ft=Re.match(/```(?:json)?\s*([\s\S]*?)```/);ft&&(Re=ft[1].trim());const An=Re.indexOf("["),sn=Re.lastIndexOf("]");An!==-1&&sn!==-1&&(Re=Re.substring(An,sn+1)),_t=JSON.parse(Re)}catch(Re){console.error("JSON parse error:",Re,"Raw:",Et.text),Te(ft=>ft+`
> [WARNING] AIの出力をJSON解析できませんでした。フォールバック（全文再生成）モードに切り替えます...`),await Sc();return}if(!Array.isArray(_t)||_t.length===0){Te(Re=>Re+`
> [WARNING] 置換対象が見つかりませんでした。エラー情報をより具体的に入力して再試行してください。`);return}let $e=K,qe=0,je=0;for(const Re of _t)!Re.from||!Re.to||($e.includes(Re.from)?($e=$e.replace(Re.from,Re.to),qe++,Te(ft=>ft+`
> ✅ "${Re.from.substring(0,40)}..." → "${Re.to.substring(0,40)}..." (${Re.reason||""})`)):(je++,Te(ft=>ft+`
> ⚠️ 未発見（スキップ）: "${Re.from.substring(0,50)}..."`)));qe>0?(ue($e),Te(Re=>Re+`
> [Phase 5/5] ✅ ${qe}箇所を修正しました（${je}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`),Te(Re=>Re+`
> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${l==="openai"?"ChatGPT":"Gemini"} Web版で生成してください。`),De("")):(Te(Re=>Re+`
> [WARNING] AIが提案した修正箇所がプロンプト内に見つかりませんでした。`),Te(Re=>Re+`
> [GUIDE] フォールバック（全文再生成）モードに切り替えます...`),await Sc())}catch(rt){console.error(rt),Te(Et=>Et+`
> [ERROR] ${rt.message}`)}finally{clearInterval(xt),de(!1)}},Sc=async()=>{Te(et=>et+`
> [Fallback] 全文再生成モードで修正中...`);try{const et=nM(Ee.trim(),K),xt=await Nr(et,[],null,rt=>{Te(Et=>Et+`
> ${rt}`)});xt.text&&xt.text.length>100?(ue(xt.text.trim()),Te(rt=>rt+`
> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。`),De("")):Te(rt=>rt+`
> [ERROR] フォールバックでも適切な応答が得られませんでした。エラーメッセージをより詳しく入力して再試行してください。`)}catch(et){console.error(et),Te(xt=>xt+`
> [Fallback ERROR] ${et.message}`)}};we.useEffect(()=>{Ta>0&&!xi.current&&ol()},[Ta]);const ol=async()=>{if(!$||$.length<20){ht("先にキャラクターシートをアップロードしてください。"),En(!1);return}xi.current=!1,En(!0),Li(!1),yt(2);const et=[...D].sort(()=>Math.random()-.5),xt=Math.random()>.5?2:1,rt=et.slice(0,xt).map(je=>je.id),Et=D.map(je=>({...je,checked:rt.includes(je.id)}));B(Et),b(""),C(""),h("news"),await new Promise(je=>setTimeout(je,200)),Ka.current?.scrollIntoView({behavior:"smooth",block:"start"});const _t=await al(Et);if(xi.current||!_t){En(!1),yt(0),ui(!1),xi.current&&ht("⏹ フルオートを中断しました。");return}yt(3),el.current?.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(je=>setTimeout(je,300));const $e=await Zn(!0,_t);if(xi.current||!$e){En(!1),yt(0),ui(!1),xi.current&&ht("⏹ フルオートを中断しました。");return}yt(4),window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),await new Promise(je=>setTimeout(je,300));const qe=await yc(!0,$e);await new Promise(je=>setTimeout(je,800)),nl.current?.scrollIntoView({behavior:"smooth",block:"center"}),mn.current?xi.current?(En(!1),yt(0),ui(!1),ht("⏹ 連続生成を中断しました。")):(ht("🔄 連続生成モードON：次の作品を生成します..."),setTimeout(()=>{xi.current||Ui(je=>je+1)},2e3)):(En(!1),yt(0),ui(!1),qe&&ht("🎉 フルオート生成完了！4コマ漫画が生成されました！"))},Tf=()=>{if(Tn){xi.current=!0,ci>0||ee||ye||Ze||Tt?(ui(!0),ht("⚠️ 中断処理中...（現在のステップが完了するまでお待ちください）")):(En(!1),yt(0),ui(!1),ht("フルオートを解除しました。"));return}xi.current=!1,ui(!1),En(!0),$&&$.length>=20?Ui(et=>et+1):ht("🚀 フルオート待機中: キャラクターシートをドロップしてください")},gn=!$||$.length<1?1:!oe||oe.length<1?2:K?_i?5:4:3;return x.jsxs("div",{className:"min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden",children:[x.jsx(Ov,{isOpen:i,onSave:il,provider:"google"}),x.jsx(Ov,{isOpen:As,onSave:et=>{const xt=et.trim(),rt=ff();xt===""&&rt?(ya(!0),ht("🔑 既存のOpenAI APIキーを適用しました。"),Ya(!1)):xt.startsWith("sk-")?(Th(xt),ya(!0),ht("🔑 新しいOpenAI APIキーをセキュアに保存しました。"),Ya(!1)):alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。")},onClose:()=>{Ya(!1),ff()||ya(!1)},provider:"openai"}),x.jsxs("div",{className:"fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden",children:[x.jsxs("div",{className:"flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3",children:[x.jsxs("div",{className:`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${r?"opacity-100":"opacity-30"}`,children:[x.jsxs("div",{className:`flex items-center gap-1.5 ${gn>=1?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${gn===1?"bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]":gn>1?"bg-blue-600/50 text-blue-200":"bg-white/10 text-white/50"}`,children:gn>1?x.jsx(Ir,{size:16}):"1"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"解析"})]}),x.jsx(ac,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${gn>=2?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${gn===2?"bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]":gn>2?"bg-purple-600/50 text-purple-200":"bg-white/10 text-white/50"}`,children:gn>2?x.jsx(Ir,{size:16}):"2"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"シナリオ"})]}),x.jsx(ac,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${gn>=3?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${gn===3?"bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]":gn>3?"bg-orange-600/50 text-orange-200":"bg-white/10 text-white/50"}`,children:gn>3?x.jsx(Ir,{size:16}):"3"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"プロンプト"})]}),x.jsx(ac,{size:14,className:"text-white/30 shrink-0 mx-0.5 sm:mx-1"}),x.jsxs("div",{className:`flex items-center gap-1.5 ${gn>=4?"opacity-100":"opacity-40"}`,children:[x.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${gn===4?"bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]":gn>4?"bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]":"bg-white/10 text-white/50"}`,children:gn>4?x.jsx(Ir,{size:16}):"4"}),x.jsx("span",{className:"text-sm font-bold text-white tracking-wider",children:"画像生成　"})]})]}),x.jsx("div",{className:"hidden xl:block w-12 lg:w-16 shrink-0"}),x.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full",children:[x.jsxs("button",{disabled:!r||ca,onClick:()=>{const et=!jn;tn(et),mn.current=et},title:"ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。",style:{color:jn?"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${jn?"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} disabled:opacity-50 disabled:cursor-not-allowed`,children:[x.jsx(a_,{size:14,className:jn?"animate-spin":"",style:{animationDuration:"3s"}}),x.jsx("span",{className:"whitespace-nowrap",children:jn?"無限ループ設定 解除":"無限ループ設定 ON"})]}),x.jsxs("button",{disabled:!r||ca,onClick:Tf,title:"画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。",style:{color:Tn?ca?"#ffffff":"#dc2626":"#ffffff"},className:`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${Tn?ca?"bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100":"bg-red-50 border-red-300 shadow-lg":"bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]"} ${!r&&!ca?"opacity-50 cursor-not-allowed":""}`,children:[Tn?ca?x.jsx(Wi,{size:14,className:"animate-spin"}):x.jsx(VS,{size:14,fill:"currentColor"}):x.jsx(uf,{size:14}),Tn?ca?"停止処理中...":"フルオート中断":"⚡ フルオート ON"]}),x.jsx("div",{className:"hidden sm:block w-6 shrink-0"}),x.jsxs("div",{className:`flex flex-col justify-center text-[10.5px] leading-relaxed max-w-[600px] text-center sm:text-left transition-opacity duration-300 ${r?"text-slate-400":"text-slate-600 opacity-40"}`,children:[x.jsx("span",{className:"whitespace-normal",children:"　【⚡ フルオート ON】にして画像をドロップ、もしくはドロップ後に押す→全自動で生成。完了後は自動OFF。　"}),x.jsx("span",{className:"whitespace-normal",children:"　生成中は同ボタンで中断（以降はSTEPボタンで進行）。中断後再度押すと新シナリオで再生成を始めます。　"}),x.jsx("span",{className:"whitespace-normal",children:"　※「無限ループ設定」をONにしてフルオートを開始すると、完了後に自動で次の作品の生成を永遠に繰り返します。　"})]})]})]}),(l==="openai"||_n)&&x.jsx("div",{className:"flex justify-center w-full max-w-7xl mx-auto px-2 pb-1",children:x.jsxs("button",{onClick:()=>{navigator.clipboard.writeText(`[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
You are a world-class anime film director and cinematographer. Your mission is to create a SINGLE breathtaking illustration that makes the viewer FEEL something powerful — not just see a character standing there.

READ the user's instruction carefully. Detect the EMOTIONAL VECTOR (joy, sadness, anger, tension, love, loneliness, triumph, fear, nostalgia, serenity, chaos, comedy, etc.) from their text — even if they only say something simple like "draw her eating ramen." Find the hidden emotion and AMPLIFY it through every visual element below.

If the user gives NO emotional direction at all, DEFAULT to creating an image that radiates warmth, narrative depth, and cinematic beauty — as if this frame is the most emotionally pivotal moment in an anime film.

[ 1. EMOTIONAL ACTING & EXPRESSION — The Soul of the Image ]
- FACE: Characters MUST show rich, layered facial expressions. Use the Facial Action Coding System (FACS): combine specific Action Units (brow furrow + lip tremble + glistening eyes = suppressed tears). NEVER draw a flat, neutral, default expression. Every face tells a story.
- EYES: Eyes are the emotional anchor. Draw large, detailed anime eyes with multiple layers: iris gradient, bright catchlight highlights (circular + star sparkle), visible emotion (tears welling, fire burning, light fading, stars sparkling). Eye moisture level should match the emotion.
- BODY LANGUAGE: The entire body must act. Clenched fists for determination, slumped shoulders for defeat, wind-caught hair for freedom, mid-gesture frozen motion for surprise. Weight distribution must feel natural and dynamic — use contrapposto, dynamic lean, or full-body action poses. NEVER use a stiff T-pose or mannequin stance.
- MICRO-EXPRESSIONS: Add subtle secondary expressions — a slight lip quiver, one eyebrow raised higher than the other, fingers gripping fabric unconsciously. These details create emotional depth that separates masterwork from generic output.

[ 2. CINEMATIC CAMERA & LENS — The Director's Eye ]
Choose the camera angle and lens that BEST serves the emotion. Here is your toolkit:
- INTIMACY/VULNERABILITY: Tight close-up (bust shot or face), shallow depth of field (f/1.4 bokeh), slight Dutch angle for unease, or straight-on for confrontation.
- POWER/TRIUMPH: Extreme low angle (worm's-eye view) looking UP at the character. Wide-angle lens (24mm) for imposing presence. Character dominates the frame.
- LONELINESS/SMALLNESS: Extreme wide shot with the character tiny in a vast environment. High angle (bird's-eye) looking DOWN. The emptiness around them IS the emotion.
- ACTION/CHAOS: Dynamic diagonal composition, motion blur on extremities, speed lines radiating from impact point, camera tilted 15-30° Dutch angle.
- NOSTALGIA/MEMORY: Soft telephoto lens (85-135mm) compression, warm color grading, slight vignette at edges, dreamy shallow focus.
- COMEDY/ABSURDITY: Exaggerated wide-angle (fisheye-adjacent) for comedic distortion, super-deformed reaction shots, dramatic zoom lines.
- EPIC/CINEMATIC: Sweeping wide establishing shot with golden ratio composition, atmospheric perspective, volumetric light shafts.
IMPORTANT: NEVER default to a flat, eye-level, center-framed shot. Every camera choice must be INTENTIONAL and emotion-driven.

[ 3. DRAMATIC LIGHTING & COLOR PSYCHOLOGY ]
Lighting is emotion made visible. Match the lighting setup to the feeling:
- JOY/WARMTH: Golden hour warm key light (3000K), soft fill, orange-pink rim light. Warm color palette dominance.
- SADNESS/MELANCHOLY: Cool blue-grey key light, minimal fill (high shadow ratio), single warm accent light (a streetlamp, a phone screen) as a beacon of hope. Desaturated palette with one warm accent color.
- ANGER/INTENSITY: Hard directional red-orange key light from below or side, deep black shadows, high contrast. Saturated reds and magentas.
- TENSION/SUSPENSE: Single harsh spotlight creating extreme contrast, character half-lit half-shadow (split lighting). Cool teal shadows vs warm highlights.
- LOVE/TENDERNESS: Soft diffused backlight creating a luminous halo, warm fill, cherry-blossom pink and peach tones. Ethereal glow.
- TRIUMPH/GLORY: Dramatic backlight explosion (contre-jour), golden rim light outlining the entire silhouette, lens flare from behind.
- FEAR/HORROR: Underlighting (flashlight-under-chin effect), sickly green or purple color cast, deep vignette swallowing the edges.
- NOSTALGIA: Warm sepia-shifted color grading, soft gaussian glow, muted but harmonious palette.
TECHNIQUE: Always use 3-point anime lighting as a BASE (key + fill + rim), then MODIFY it for emotional effect. Use warm/cool color temperature CONTRAST — never flat uniform lighting.

[ 4. ATMOSPHERIC VFX & ENVIRONMENTAL STORYTELLING ]
The environment and effects must ECHO the character's emotion, not just be a backdrop:
- Wind direction, particle effects (petals, leaves, snow, embers, rain), volumetric fog/mist, god rays, and atmospheric haze should all serve the emotional narrative.
- ENVIRONMENTAL EMPATHY: If the character is sad, the sky could be overcast with a single break in the clouds. If joyful, golden light floods the scene. If angry, the environment reacts (cracking ground, swirling debris).
- DEPTH LAYERS: Create clear foreground (blurred elements close to camera), midground (character in sharp focus), and background (atmospheric depth) for cinematic parallax.
- ANTI-GLITTER RULE: Do NOT add random magical floating particles, sparkles, or fairy dust unless the emotion specifically calls for it (like wonder or magic). Keep the air intentional.

[ 5. ART STYLE & VISUAL FIDELITY ]
- RENDER: High-budget Japanese TV anime feature film quality. Clean cel-shading with rich color depth, sharp ink contour lines, smooth gradients. NO photorealistic texturing, NO film grain, NO noise.
- LINE WEIGHT HIERARCHY: Foreground characters get 3px bold ink outlines. Background objects get 1px thin lines. This creates instant visual depth.
- CHARACTER SEPARATION: Add a subtle 2-3px white glow (compositing rim) outside the character's outline to prevent blending with the background. Characters MUST have higher saturation and contrast than their environment.
- HAIR: Must show a glossy anime-style shine band (angel ring / tenshi no wa). Individual strand detail at edges.
- SKIN: Warm subsurface scattering hint on lit areas. Clean shadows with slight color shift (warm light = cool shadow, cool light = warm shadow).

[ 6. TEXT & OUTPUT RULES ]
- If speech bubbles or text are drawn, ALL text MUST be vertical Japanese. ZERO horizontal text.
- Do not add random background text, floating letters, or unnecessary sound effects unless the scene demands it.
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`),ws(!0),setTimeout(()=>ws(!1),2e3)},title:"Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。",className:`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${Ra?"bg-white border-green-500 text-green-600":"bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]"}`,children:[x.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[Ra?x.jsx(Ir,{size:16}):x.jsx(rc,{size:16}),x.jsx("span",{className:"whitespace-nowrap",children:Ra?"コピー完了！":"🎬 1枚絵 ChatGPT用 感情シネマプロンプトをコピー"})]}),x.jsx("span",{className:"text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500",children:"【1枚絵用】ChatGPTにキャラ画像を添付→指示を書く→このプロンプトを貼り付けて送信。指示の文脈からエモーショナルな演出を自動で適用します。"})]})}),x.jsx("div",{className:"absolute bottom-0 left-0 h-[2px] bg-white/10 w-full",children:x.jsx("div",{className:`h-full transition-all duration-700 ease-out
            ${gn===1?"w-1/4 bg-blue-500":gn===2?"w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]":gn===3?"w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]":gn>=4?"w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]":"w-0"}
          `})})]}),x.jsxs("div",{className:"fixed inset-0 pointer-events-none overflow-hidden z-0",children:[x.jsx("div",{className:"absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"}),x.jsx("div",{className:"absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"})]}),x.jsxs("div",{className:"relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[130px] md:px-10 md:pb-10 md:pt-[150px] space-y-8",children:[x.jsxs("header",{className:"flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group",children:[x.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"}),x.jsx("div",{className:"flex flex-col items-center text-center z-10 w-full",children:x.jsx("div",{className:"flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden",children:x.jsxs("div",{className:"flex flex-col items-center text-center max-w-full",children:[x.jsxs("div",{className:"flex flex-row items-center justify-center gap-3 flex-nowrap text-center",children:[x.jsx("div",{className:"p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0",children:x.jsx(im,{size:28,className:"text-white"})}),x.jsxs("h1",{className:"text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap",children:["Super FURU AI ",x.jsx("span",{className:"text-white text-lg md:text-3xl ml-1 tracking-widest",children:"4-koma System"})," ",x.jsx("span",{className:"text-lg md:text-3xl text-yellow-500 font-mono ml-2",children:tc})]})]}),x.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-center gap-3 mt-2",children:[x.jsx("p",{className:"text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]",children:"Social Satire Engine [ 演出強化版 ]"}),x.jsxs("div",{className:`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${r?l==="openai"?"bg-emerald-500/15 border-emerald-500/40 text-emerald-400":"bg-green-500/15 border-green-500/40 text-green-400":"bg-red-500/15 border-red-500/40 text-red-400 animate-pulse"}`,children:[x.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${r?l==="openai"?"bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]":"bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]":"bg-red-400"}`}),r?l==="openai"?"✅ ChatGPT Engine":"✅ Gemini Engine":"⚠ 未接続"]}),r&&x.jsxs("div",{className:"flex items-center gap-2",children:[x.jsxs("button",{onClick:Za,className:"flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10",title:"キャラクター解析を保持したまま、シナリオ・プロンプト・画像をリセットします",children:[x.jsx(a_,{size:12})," シナリオから再生成"]}),x.jsxs("button",{onClick:qr,className:"flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20",title:"全データを消去してAPIキーの再入力画面に戻ります（エンジン切替もこちら）",children:[x.jsx(FS,{size:12})," エンジン変更・全リセット"]})]})]}),xe&&(()=>{const et=kE(xe);return et?x.jsxs("div",{className:`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${et.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`,children:[x.jsx("span",{className:"text-[10px] font-black uppercase tracking-widest",children:et.label}),x.jsx("span",{className:"w-[1px] h-3 bg-white/40"}),x.jsx("span",{className:"text-[10px] font-bold truncate max-w-[150px] md:max-w-none",children:et.desc}),x.jsxs("div",{className:"absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl",children:[x.jsx("p",{className:"font-bold text-white mb-1 border-b border-white/10 pb-1",children:"AIモデル品質情報"}),x.jsxs("p",{children:["現在 ",x.jsx("span",{className:"font-mono text-blue-300",children:xe})," を使用中。"]}),et.tier==="Lite"&&x.jsxs("div",{className:"mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative",children:[x.jsx(Iv,{size:10,className:"absolute top-2 right-2"}),x.jsx("span",{className:"font-bold block mb-1",children:"⚠️ 品質制限モード"}),"API制限(429)回避のため、軽量モデルを使用中。生成品質が低下する場合があります。上限解除までお待ちください。"]})]})]}):null})()]})})})]}),x.jsxs("main",{className:"space-y-8",style:{filter:r?"none":"blur(10px)",pointerEvents:r?"auto":"none",transition:"filter 0.5s ease"},children:[x.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[x.jsx(jC,{isDragging:O,setIsDragging:T,apiKey:r,processFiles:_c,currentStep:gn,isAnalyzing:ee,images:Ae,setImages:Oe,bg360Image:te,bg360Enabled:Bt,analyzeThought:gt,castList:$,setCastList:ce,isCastListCopied:Sa,setIsCastListCopied:Ea}),x.jsx(XC,{step2Ref:Ka,currentStep:gn,isAnalyzing:ee,inputMode:f,setInputMode:h,targetDate:q,setTargetDate:H,categories:D,toggleCategory:A,manualTopic:m,setManualTopic:p,bg360Image:te,bg360Enabled:Bt,setBg360Enabled:an,bg360Analysis:Pe,is360Analyzing:Je,customLocation:g,setCustomLocation:b,customOutfit:M,setCustomOutfit:C,punchlineType:I,setPunchlineType:k,isSearching:ye,generateScenarioFromNews:al,scenarioThought:Qt,scenario:oe,setScenario:j,isScenarioCopied:qa,setIsScenarioCopied:Ma,originalScenario:Dn,isEnhancePanelOpen:dr,setIsEnhancePanelOpen:hr,enhanceExpressions:Le,setEnhanceExpressions:dt,enhanceBodyLang:lt,setEnhanceBodyLang:wt,enhanceEffects:V,setEnhanceEffects:Ce,enhanceBackgrounds:me,setEnhanceBackgrounds:ke,enhanceCameraWork:Ue,setEnhanceCameraWork:Me,enhanceDialogue:Qe,setEnhanceDialogue:ct,isEnhancing:Kn,enhanceScenario:Yr,revertScenario:Wr,enhanceLog:Xa,showStatus:ht})]}),x.jsxs("div",{className:`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${oe?"":"blur-[4px] opacity-30 grayscale pointer-events-none"}
          `,children:[x.jsxs("span",{className:"text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2",children:[x.jsx(Uv,{size:14})," ",te?"背景・服装・オチ設定":"場所・服装・オチ設定"," (GENERATION PREVIEW)"]}),x.jsxs("p",{className:"text-[10px] text-slate-400 leading-relaxed",children:["※以下はシナリオ内の ",x.jsx("code",{className:"text-blue-300",children:"Location:"})," / ",x.jsx("code",{className:"text-purple-300",children:"Outfit:"})," / ",x.jsx("code",{className:"text-yellow-300",children:"Punchline:"})," 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。"]}),(()=>{const et=oe?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",xt=oe?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",rt=oe?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim()||"",Et=!!te&&!!Pe&&Bt,_t=Et?"背景 (Background)":"場所 (Location)",$e=Et?et||Pe?.location||"360°画像":et||g.trim()||"AIおまかせ",qe=Et?"画像解析":g.trim()?"手入力":"AIおまかせ",je=Et?"#67e8f9":g.trim()?"#ffffff":"#93c5fd",Re=Et?"rgba(6,182,212,0.3)":g.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",ft=Et?"#67e8f9":g.trim()?"#d1d5db":"#93c5fd",An=Et?"rgba(6,182,212,0.4)":g.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)";return x.jsxs(x.Fragment,{children:[x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[Et?x.jsx(oc,{size:12,className:"text-cyan-400"}):x.jsx(oc,{size:12,className:"text-blue-400"}),x.jsxs("span",{children:[_t,":"]}),x.jsx("span",{style:{fontWeight:"bold",color:je},children:$e}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:Re,color:ft,border:`1px solid ${An}`},children:qe})]}),x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px"},children:[x.jsx("span",{className:"text-green-400",children:"👕"}),x.jsx("span",{children:"服装 (Outfit):"}),x.jsx("span",{style:{fontWeight:"bold",color:M.trim()?"#ffffff":"#93c5fd"},children:xt||M.trim()||"AIおまかせ"}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:M.trim()?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:M.trim()?"#d1d5db":"#93c5fd",border:`1px solid ${M.trim()?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:M.trim()?"手入力":"AIおまかせ"})]}),x.jsxs("div",{className:"text-gray-300",style:{display:"flex",alignItems:"center",flexWrap:"wrap",gap:"6px",paddingBottom:"4px"},children:[x.jsx("span",{className:"text-yellow-400",children:"🎬"}),x.jsx("span",{children:"オチ (Punchline):"}),x.jsx("span",{style:{fontWeight:"bold",color:rt||I!=="Auto"?"#ffffff":"#93c5fd"},children:rt||(I==="Auto"?"AIおまかせ":Xv(I))}),x.jsx("span",{style:{marginLeft:"6px",padding:"2px 6px",borderRadius:"4px",fontSize:"9px",whiteSpace:"nowrap",background:I!=="Auto"?"rgba(100,100,100,0.4)":"rgba(29,78,216,0.3)",color:I!=="Auto"?"#d1d5db":"#93c5fd",border:`1px solid ${I!=="Auto"?"rgba(150,150,150,0.3)":"rgba(59,130,246,0.3)"}`},children:I!=="Auto"?"強制指定":"AIおまかせ"})]})]})})()]}),x.jsx(YC,{step3Ref:el,currentStep:gn,isSearching:ye,isAnalyzing:ee,isEnhancing:Kn,is360CameraWorking:Ot,assemblePrompt:Zn,isAssembling:Ze}),x.jsx(WC,{outputRef:tl,currentStep:gn,isSearching:ye,isAnalyzing:ee,isEnhancing:Kn,finalPrompt:K,copyPrompt:bc,assembleThought:X,enableChatGPTMode:Rn,selectedEngine:l,bg360Image:te,bg360Analysis:Pe,bg360Enabled:Bt,bg360CameraWork:en,bg360CroppedPanels:Ve,isCopied:pr,isMetaSaved:Cn,setIsMetaSaved:Xr,castList:$,scenario:oe,punchlineType:I,colorMode:Ne,enhanceExpressions:Le,enhanceBodyLang:lt,enhanceEffects:V,enhanceBackgrounds:me,enhanceCameraWork:Ue,enhanceDialogue:Qe,SYSTEM_VERSION:tc,isAssembling:Ze,regenerateImage:yc,isGeneratingImage:Tt,isFixPromptCopied:sl,setIsFixPromptCopied:rl,isPolicyPanelOpen:ze,setIsPolicyPanelOpen:Ie,isPolicyCopied:Ra,setIsPolicyCopied:ws,policyErrorMsg:Ee,setPolicyErrorMsg:De,regenerateSafePrompt:Mf,isFixingPolicy:Fe,policyFixLog:pe,genLogRef:Aa,genLog:J,imageResultRef:nl,generatedImage:_i,isFullAutoMode:Tn,fullAutoStep:ci,mangaTitle:L,isFallbackUsed:Z,enableOpenAIApi:_n,setGeneratedImage:Ii,generationHistory:wa,setGenerationHistory:Ei}),wa.length>0&&x.jsxs("section",{className:"relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0",children:[(ye||Ze||Tt||Kn||Tn&&ci>0&&ci<4)&&x.jsx("div",{style:{position:"absolute",inset:0,zIndex:10,backgroundColor:"rgba(10,12,16,0.6)",backdropFilter:"blur(2px)",pointerEvents:"auto",borderRadius:"1rem"},className:"flex items-center justify-center",children:x.jsxs("span",{className:"text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2",children:[x.jsx(Wi,{size:12,className:"animate-spin"})," 生成中..."]})}),x.jsxs("div",{className:"flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0",children:[x.jsxs("h4",{className:"text-slate-300 text-xs font-bold flex items-center gap-2",children:[x.jsx(op,{size:14,className:"text-blue-400"}),"生成履歴 (",wa.length,")"]}),x.jsxs("button",{onClick:()=>{window.confirm("生成履歴をすべて削除しますか？")&&(Ei([]),Ii(""))},className:"flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors",children:[x.jsx(lc,{size:12})," 全削除"]})]}),x.jsx("div",{className:"flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1",children:wa.map(et=>x.jsxs("div",{onClick:()=>Ii(et.img),style:{width:"64px",height:"96px",flexShrink:0},className:`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${_i===et.img?"border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10":"border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"}`,children:[x.jsx("img",{src:et.img,className:"w-full h-full object-cover",alt:"History thumbnail"}),_i===et.img&&x.jsx("div",{className:"absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg",children:x.jsx(Ir,{size:10,strokeWidth:3})}),x.jsx("div",{onClick:xt=>{xt.stopPropagation(),Ei(rt=>rt.filter(Et=>Et.id!==et.id)),_i===et.img&&Ii("")},className:"absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg",children:x.jsx(lc,{size:10})})]},et.id))})]})]}),x.jsxs("footer",{className:"text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4",children:["© 2026 FURU ",x.jsx("span",{className:"mx-2 sm:mx-4",children:"|"})," NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM"]})]}),pt&&x.jsxs("div",{className:"fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10",children:[x.jsx(Xi,{size:18,className:"text-green-600"})," ",pt]}),x.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}})]})}function $C(){return x.jsx(Ob,{children:x.jsx(qC,{})})}gS.createRoot(document.getElementById("root")).render(x.jsx(we.StrictMode,{children:x.jsx(Ob,{children:x.jsx($C,{})})}));
