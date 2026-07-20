"use strict";var HyperframesPlayer=(()=>{var x=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames;var z=Object.prototype.hasOwnProperty;var U=(o,e)=>{for(var t in e)x(o,t,{get:e[t],enumerable:!0})},W=(o,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of j(e))!z.call(o,s)&&s!==t&&x(o,s,{get:()=>e[s],enumerable:!(i=F(e,s))||i.enumerable});return o};var $=o=>W(x({},"__esModule",{value:!0}),o);var B={};U(B,{HyperframesPlayer:()=>w,SPEED_PRESETS:()=>k,formatSpeed:()=>v,formatTime:()=>E});var N=`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
    background: #000;
    contain: layout style;
  }

  .hfp-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }


  .hfp-iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    border: none;
    pointer-events: none;
  }

  .hfp-poster {
    position: absolute;
    inset: 0;
    object-fit: contain;
    z-index: 1;
    pointer-events: none;
  }

  /* \u2500\u2500 Theming via CSS custom properties \u2500\u2500
   *
   * Override from outside the shadow DOM:
   *   hyperframes-player {
   *     --hfp-controls-bg: linear-gradient(transparent, rgba(0,0,0,0.9));
   *     --hfp-accent: #ff6b6b;
   *     --hfp-font: "Inter", sans-serif;
   *   }
   */

  .hfp-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: var(--hfp-controls-gap, 12px);
    padding: var(--hfp-controls-padding, 8px 16px);
    background: var(--hfp-controls-bg, linear-gradient(transparent, rgba(0, 0, 0, 0.7)));
    color: var(--hfp-color, #fff);
    font-family: var(--hfp-font, system-ui, -apple-system, sans-serif);
    font-size: var(--hfp-font-size, 13px);
    z-index: 10;
    pointer-events: auto;
    opacity: 1;
    transition: opacity 0.3s ease;
    user-select: none;
  }

  .hfp-controls.hfp-hidden {
    opacity: 0;
    pointer-events: none;
  }

  .hfp-play-btn {
    background: none;
    border: none;
    color: var(--hfp-color, #fff);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    z-index: 10;
  }

  .hfp-play-btn:hover {
    opacity: 0.8;
  }

  .hfp-play-btn svg,
  .hfp-play-btn svg * {
    pointer-events: none;
  }

  .hfp-scrubber {
    flex: 1;
    height: var(--hfp-scrubber-height, 4px);
    background: var(--hfp-scrubber-bg, rgba(255, 255, 255, 0.3));
    border-radius: var(--hfp-scrubber-radius, 2px);
    cursor: pointer;
    position: relative;
  }

  .hfp-scrubber:hover {
    height: var(--hfp-scrubber-height-hover, 6px);
  }

  .hfp-progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: var(--hfp-accent, #fff);
    border-radius: var(--hfp-scrubber-radius, 2px);
    pointer-events: none;
  }

  .hfp-time {
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
    opacity: 0.9;
  }

  .hfp-speed-wrap {
    position: relative;
    flex-shrink: 0;
  }

  .hfp-speed-btn {
    background: var(--hfp-speed-btn-bg, rgba(255, 255, 255, 0.15));
    border: none;
    border-radius: var(--hfp-speed-btn-radius, 4px);
    color: var(--hfp-color, #fff);
    cursor: pointer;
    font-family: var(--hfp-font, system-ui, -apple-system, sans-serif);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
    padding: 4px 8px;
    min-width: 40px;
    text-align: center;
    transition: background 0.15s ease;
  }

  .hfp-speed-btn:hover {
    background: var(--hfp-speed-btn-bg-hover, rgba(255, 255, 255, 0.3));
  }

  .hfp-speed-menu {
    position: absolute;
    bottom: calc(100% + 8px);
    right: 0;
    background: var(--hfp-menu-bg, rgba(20, 20, 20, 0.95));
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--hfp-menu-border, rgba(255, 255, 255, 0.1));
    border-radius: var(--hfp-menu-radius, 8px);
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 80px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(4px);
    transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
    box-shadow: var(--hfp-menu-shadow, 0 8px 24px rgba(0, 0, 0, 0.4));
  }

  .hfp-speed-menu.hfp-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .hfp-speed-option {
    background: none;
    border: none;
    border-radius: 4px;
    color: var(--hfp-menu-color, rgba(255, 255, 255, 0.7));
    cursor: pointer;
    font-family: var(--hfp-font, system-ui, -apple-system, sans-serif);
    font-size: 13px;
    font-variant-numeric: tabular-nums;
    padding: 6px 12px;
    text-align: left;
    transition: background 0.1s ease, color 0.1s ease;
    white-space: nowrap;
  }

  .hfp-speed-option:hover {
    background: var(--hfp-menu-hover-bg, rgba(255, 255, 255, 0.1));
    color: var(--hfp-color, #fff);
  }

  .hfp-speed-option.hfp-active {
    color: var(--hfp-accent, #fff);
    font-weight: 600;
  }
`,C='<svg width="24" height="24" viewBox="0 0 18 18" fill="currentColor"><polygon points="4,2 16,9 4,16"/></svg>',H='<svg width="24" height="24" viewBox="0 0 18 18" fill="currentColor"><rect x="3" y="2" width="4" height="14"/><rect x="11" y="2" width="4" height="14"/></svg>';var k=[.25,.5,1,1.5,2,4];function v(o){return Number.isInteger(o)?`${o}x`:`${o}x`}function E(o){if(!Number.isFinite(o)||o<0)return"0:00";let e=Math.floor(o),t=Math.floor(e/60),i=e%60;return`${t}:${i.toString().padStart(2,"0")}`}function D(o,e,t={}){let i=t.speedPresets??k,s=document.createElement("div");s.className="hfp-controls",s.addEventListener("click",r=>{r.stopPropagation()});let a=document.createElement("button");a.className="hfp-play-btn",a.type="button",a.innerHTML=C,a.setAttribute("aria-label","Play");let d=document.createElement("div");d.className="hfp-scrubber";let h=document.createElement("div");h.className="hfp-progress",h.style.width="0%",d.appendChild(h);let c=document.createElement("span");c.className="hfp-time",c.textContent="0:00 / 0:00";let l=document.createElement("div");l.className="hfp-speed-wrap";let p=document.createElement("button");p.className="hfp-speed-btn",p.type="button",p.textContent="1x",p.setAttribute("aria-label","Playback speed");let u=document.createElement("div");u.className="hfp-speed-menu",u.setAttribute("role","menu");for(let r of i){let n=document.createElement("button");n.className="hfp-speed-option",n.type="button",n.setAttribute("role","menuitem"),n.dataset.speed=String(r),n.textContent=v(r),r===1&&n.classList.add("hfp-active"),u.appendChild(n)}l.appendChild(u),l.appendChild(p),s.appendChild(a),s.appendChild(d),s.appendChild(c),s.appendChild(l),o.appendChild(s);let _=!1,b=null,g=i.indexOf(1);g===-1&&(g=0),a.addEventListener("click",r=>{r.stopPropagation(),_?e.onPause():e.onPlay()});let M=r=>{for(let n of u.querySelectorAll(".hfp-speed-option"))n.classList.toggle("hfp-active",n.dataset.speed===String(r))};p.addEventListener("click",r=>{r.stopPropagation();let n=u.classList.toggle("hfp-open");p.setAttribute("aria-expanded",String(n))}),u.addEventListener("click",r=>{r.stopPropagation();let n=r.target.closest(".hfp-speed-option");if(!n)return;let m=parseFloat(n.dataset.speed);g=i.indexOf(m),p.textContent=v(m),M(m),u.classList.remove("hfp-open"),p.setAttribute("aria-expanded","false"),e.onSpeedChange(m)});let A=()=>{u.classList.remove("hfp-open"),p.setAttribute("aria-expanded","false")};document.addEventListener("click",A);let y=r=>{let n=d.getBoundingClientRect(),m=Math.max(0,Math.min(1,(r-n.left)/n.width));e.onSeek(m)},f=!1;d.addEventListener("mousedown",r=>{r.stopPropagation(),f=!0,y(r.clientX)});let T=r=>{f&&y(r.clientX)},L=()=>{f=!1};document.addEventListener("mousemove",T),document.addEventListener("mouseup",L),d.addEventListener("touchstart",r=>{f=!0;let n=r.touches[0];n&&y(n.clientX)},{passive:!0});let S=r=>{if(f){let n=r.touches[0];n&&y(n.clientX)}},I=()=>{f=!1};document.addEventListener("touchmove",S,{passive:!0}),document.addEventListener("touchend",I);let R=()=>{b&&clearTimeout(b),b=setTimeout(()=>{_&&s.classList.add("hfp-hidden")},3e3)},O=o instanceof ShadowRoot?o.host:o;return O.addEventListener("mousemove",()=>{s.classList.remove("hfp-hidden"),R()}),O.addEventListener("mouseleave",()=>{_&&s.classList.add("hfp-hidden")}),{updateTime(r,n){let m=n>0?r/n*100:0;h.style.width=`${m}%`,c.textContent=`${E(r)} / ${E(n)}`},updatePlaying(r){_=r,a.innerHTML=r?H:C,a.setAttribute("aria-label",r?"Pause":"Play"),r?R():s.classList.remove("hfp-hidden")},updateSpeed(r){let n=i.indexOf(r);n!==-1&&(g=n),p.textContent=v(r),M(r)},show(){s.style.display=""},hide(){s.style.display="none"},destroy(){document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",L),document.removeEventListener("touchmove",S),document.removeEventListener("touchend",I),document.removeEventListener("click",A),b&&clearTimeout(b)}}}var P=30,Y="https://cdn.jsdelivr.net/npm/@hyperframes/core/dist/hyperframe.runtime.iife.js",w=class extends HTMLElement{static get observedAttributes(){return["src","width","height","controls","muted","poster","playback-rate","audio-src"]}shadow;container;iframe;posterEl=null;controlsApi=null;resizeObserver;_ready=!1;_duration=0;_currentTime=0;_paused=!0;_compositionWidth=1920;_compositionHeight=1080;_probeInterval=null;_lastUpdateMs=0;_parentMedia=[];_audioOwner="runtime";constructor(){super(),this.shadow=this.attachShadow({mode:"open"});let e=document.createElement("style");e.textContent=N,this.shadow.appendChild(e),this.container=document.createElement("div"),this.container.className="hfp-container",this.iframe=document.createElement("iframe"),this.iframe.className="hfp-iframe",this.iframe.sandbox.add("allow-scripts","allow-same-origin"),this.iframe.allow="autoplay; fullscreen",this.iframe.referrerPolicy="no-referrer",this.iframe.title="HyperFrames Composition",this.container.appendChild(this.iframe),this.shadow.appendChild(this.container),this.addEventListener("click",t=>{this._isControlsClick(t)||(this._paused?this.play():this.pause())}),this.resizeObserver=new ResizeObserver(()=>this._updateScale()),this._onMessage=this._onMessage.bind(this),this._onIframeLoad=this._onIframeLoad.bind(this)}connectedCallback(){this.resizeObserver.observe(this),window.addEventListener("message",this._onMessage),this.iframe.addEventListener("load",this._onIframeLoad),this.hasAttribute("controls")&&this._setupControls(),this.hasAttribute("poster")&&this._setupPoster(),this.hasAttribute("audio-src")&&this._setupParentAudioFromUrl(this.getAttribute("audio-src")),this.hasAttribute("src")&&(this.iframe.src=this.getAttribute("src"))}disconnectedCallback(){this.resizeObserver.disconnect(),window.removeEventListener("message",this._onMessage),this.iframe.removeEventListener("load",this._onIframeLoad),this._probeInterval&&clearInterval(this._probeInterval),this.controlsApi?.destroy();for(let e of this._parentMedia)e.el.pause(),e.el.src="";this._parentMedia=[]}attributeChangedCallback(e,t,i){switch(e){case"src":i&&(this._ready=!1,this.iframe.src=i);break;case"width":this._compositionWidth=parseInt(i||"1920",10),this._updateScale();break;case"height":this._compositionHeight=parseInt(i||"1080",10),this._updateScale();break;case"controls":i!==null?this._setupControls():(this.controlsApi?.destroy(),this.controlsApi=null);break;case"poster":this._setupPoster();break;case"playback-rate":{let s=parseFloat(i||"1");for(let a of this._parentMedia)a.el.playbackRate=s;this._sendControl("set-playback-rate",{playbackRate:s}),this.controlsApi?.updateSpeed(s),this.dispatchEvent(new Event("ratechange"));break}case"muted":for(let s of this._parentMedia)s.el.muted=i!==null;this._sendControl("set-muted",{muted:i!==null});break;case"audio-src":i&&this._setupParentAudioFromUrl(i);break}}get iframeElement(){return this.iframe}play(){this._hidePoster(),this._sendControl("play"),this._audioOwner==="parent"&&this._playParentMedia(),this._paused=!1,this.controlsApi?.updatePlaying(!0),this.dispatchEvent(new Event("play"))}pause(){this._sendControl("pause"),this._audioOwner==="parent"&&this._pauseParentMedia(),this._paused=!0,this.controlsApi?.updatePlaying(!1),this.dispatchEvent(new Event("pause"))}seek(e){let t=Math.round(e*P);if(this._sendControl("seek",{frame:t}),this._currentTime=e,this._audioOwner==="parent")for(let i of this._parentMedia){let s=e-i.start;s>=0&&s<i.duration&&(i.el.currentTime=s)}this._paused=!0,this.controlsApi?.updatePlaying(!1),this.controlsApi?.updateTime(this._currentTime,this._duration)}get currentTime(){return this._currentTime}set currentTime(e){this.seek(e)}get duration(){return this._duration}get paused(){return this._paused}get ready(){return this._ready}get playbackRate(){return parseFloat(this.getAttribute("playback-rate")||"1")}set playbackRate(e){this.setAttribute("playback-rate",String(e))}get muted(){return this.hasAttribute("muted")}set muted(e){e?this.setAttribute("muted",""):this.removeAttribute("muted")}get loop(){return this.hasAttribute("loop")}set loop(e){e?this.setAttribute("loop",""):this.removeAttribute("loop")}_sendControl(e,t={}){try{this.iframe.contentWindow?.postMessage({source:"hf-parent",type:"control",action:e,...t},"*")}catch{}}_isControlsClick(e){return e.composedPath().some(t=>t instanceof HTMLElement&&t.classList.contains("hfp-controls"))}_onMessage(e){if(e.source!==this.iframe.contentWindow)return;let t=e.data;if(!(!t||t.source!=="hf-preview")){if(t.type==="state"){this._currentTime=(t.frame??0)/P;let i=!this._paused;this._paused=!t.isPlaying,this._audioOwner==="parent"&&(i&&this._paused?this._pauseParentMedia():!i&&!this._paused&&this._playParentMedia(),this._mirrorParentMediaTime(this._currentTime));let s=performance.now();(s-this._lastUpdateMs>100||this._paused!==i)&&(this._lastUpdateMs=s,this.controlsApi?.updateTime(this._currentTime,this._duration),this.controlsApi?.updatePlaying(!this._paused),this.dispatchEvent(new CustomEvent("timeupdate",{detail:{currentTime:this._currentTime}}))),this._currentTime>=this._duration&&!this._paused&&(this._audioOwner==="parent"&&this._pauseParentMedia(),this.loop?(this.seek(0),this.play()):(this._paused=!0,this.controlsApi?.updatePlaying(!1),this.dispatchEvent(new Event("ended"))))}t.type==="media-autoplay-blocked"&&this._promoteToParentProxy(),t.type==="timeline"&&t.durationInFrames>0&&Number.isFinite(t.durationInFrames)&&(this._duration=t.durationInFrames/P,this.controlsApi?.updateTime(this._currentTime,this._duration)),t.type==="stage-size"&&t.width>0&&t.height>0&&(this._compositionWidth=t.width,this._compositionHeight=t.height,this._updateScale())}}_runtimeInjected=!1;_onIframeLoad(){let e=0;this._runtimeInjected=!1,this._probeInterval&&clearInterval(this._probeInterval),this._probeInterval=setInterval(()=>{e++;try{let t=this.iframe.contentWindow;if(!t)return;let i=!!(t.__hf||t.__player),s=!!(t.__timelines&&Object.keys(t.__timelines).length>0);if(!i&&s&&!this._runtimeInjected&&e>=5){this._injectRuntime();return}if(this._runtimeInjected&&!i)return;let d=(()=>{if(t.__player&&typeof t.__player.getDuration=="function")return t.__player;if(t.__timelines){let h=Object.keys(t.__timelines);if(h.length>0){let c=this.iframe.contentDocument?.querySelector("[data-composition-id]")?.getAttribute("data-composition-id"),l=c&&c in t.__timelines?c:h[h.length-1],p=t.__timelines[l];return{getDuration:()=>p.duration()}}}return null})();if(d&&d.getDuration()>0){clearInterval(this._probeInterval),this._duration=d.getDuration(),this._ready=!0,this.controlsApi?.updateTime(0,this._duration),this.dispatchEvent(new CustomEvent("ready",{detail:{duration:this._duration}}));let c=this.iframe.contentDocument?.querySelector("[data-composition-id]");if(c){let l=parseInt(c.getAttribute("data-width")||"0",10),p=parseInt(c.getAttribute("data-height")||"0",10);l>0&&p>0&&(this._compositionWidth=l,this._compositionHeight=p,this._updateScale())}this._setupParentMedia(),this.hasAttribute("autoplay")&&this.play();return}}catch{}e>=40&&(clearInterval(this._probeInterval),this.dispatchEvent(new CustomEvent("error",{detail:{message:"Composition timeline not found after 8s"}})))},200)}_injectRuntime(){this._runtimeInjected=!0;try{let e=this.iframe.contentDocument;if(!e)return;let t=e.createElement("script");t.src=Y,t.onload=()=>{},t.onerror=()=>{},(e.head||e.documentElement).appendChild(t)}catch{}}_updateScale(){let e=this.getBoundingClientRect();if(e.width===0||e.height===0)return;let t=Math.min(e.width/this._compositionWidth,e.height/this._compositionHeight);this.iframe.style.width=`${this._compositionWidth}px`,this.iframe.style.height=`${this._compositionHeight}px`,this.iframe.style.transform=`translate(-50%, -50%) scale(${t})`}_setupControls(){if(this.controlsApi)return;let e={onPlay:()=>this.play(),onPause:()=>this.pause(),onSeek:s=>this.seek(s*this._duration),onSpeedChange:s=>{this.playbackRate=s}},t=this.getAttribute("speed-presets"),i=t?t.split(",").map(Number).filter(s=>!isNaN(s)&&s>0):void 0;this.controlsApi=D(this.shadow,e,{speedPresets:i})}_setupPoster(){let e=this.getAttribute("poster");if(!e){this.posterEl?.remove(),this.posterEl=null;return}this.posterEl||(this.posterEl=document.createElement("img"),this.posterEl.className="hfp-poster",this.shadow.appendChild(this.posterEl)),this.posterEl.src=e}_playParentMedia(){for(let e of this._parentMedia)e.el.src&&e.el.play().catch(()=>{})}_pauseParentMedia(){for(let e of this._parentMedia)e.el.pause()}_mirrorParentMediaTime(e){for(let t of this._parentMedia){let i=e-t.start;i<0||i>=t.duration||Math.abs(t.el.currentTime-i)>.15&&(t.el.currentTime=i)}}_promoteToParentProxy(){this._audioOwner!=="parent"&&(this._audioOwner="parent",this._sendControl("set-media-output-muted",{muted:!0}),this._mirrorParentMediaTime(this._currentTime),this._paused||this._playParentMedia())}_createParentMedia(e,t,i,s){if(this._parentMedia.some(d=>d.el.src===e))return;let a=t==="video"?document.createElement("video"):new Audio;a.preload="auto",a.src=e,a.load(),a.muted=this.muted,this.playbackRate!==1&&(a.playbackRate=this.playbackRate),this._parentMedia.push({el:a,start:i,duration:s})}_setupParentAudioFromUrl(e){this._createParentMedia(e,"audio",0,1/0)}_setupParentMedia(){try{let e=this.iframe.contentDocument;if(!e)return;let t=e.querySelectorAll("audio[data-start], video[data-start]");for(let i of t){let s=i.getAttribute("src")||i.querySelector("source")?.getAttribute("src");if(!s)continue;let a=new URL(s,i.ownerDocument.baseURI).href,d=parseFloat(i.getAttribute("data-start")||"0"),h=parseFloat(i.getAttribute("data-duration")||"Infinity"),c=i.tagName==="VIDEO"?"video":"audio";this._createParentMedia(a,c,d,h)}}catch{}}_hidePoster(){this.posterEl?.remove(),this.posterEl=null}};customElements.get("hyperframes-player")||customElements.define("hyperframes-player",w);return $(B);})();
//# sourceMappingURL=hyperframes-player.global.js.map