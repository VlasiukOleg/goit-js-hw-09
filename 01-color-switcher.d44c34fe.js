const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let r=null;t.addEventListener("click",(function(t){t.target.setAttribute("disabled","");e.removeAttribute("disabled"),r=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(){clearInterval(r),t.removeAttribute("disabled"),e.setAttribute("disabled","")}));
//# sourceMappingURL=01-color-switcher.d44c34fe.js.map
