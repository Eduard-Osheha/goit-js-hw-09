const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.body;t.addEventListener("click",(function(d){return t.setAttribute("disabled","true"),e.removeAttribute("disabled"),o=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),700),o})),e.addEventListener("click",(function(r){t.removeAttribute("disabled"),e.setAttribute("disabled","true"),clearInterval(o)}));let o=0;
//# sourceMappingURL=01-color-switcher.0d180518.js.map
