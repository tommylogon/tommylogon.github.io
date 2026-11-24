const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll("section,.project,.role").forEach(e=>{e.style.opacity=0;e.style.transform="translateY(16px)";e.style.transition="opacity .65s ease,transform .65s ease";io.observe(e)});
const s=document.createElement("style");s.textContent=".show{opacity:1!important;transform:none!important}";document.head.appendChild(s);
