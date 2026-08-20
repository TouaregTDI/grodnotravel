const screens = [...document.querySelectorAll(".screen")];

function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0, behavior:"instant"});
}

document.querySelectorAll("[data-go]").forEach(btn=>{
  btn.addEventListener("click",()=>show(btn.dataset.go));
});

document.querySelectorAll(".answers").forEach(group=>{
  group.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click",()=>{
      if(btn.disabled) return;
      const screen = btn.closest(".screen");
      const feedback = screen.querySelector(".feedback");
      const buttons = group.querySelectorAll("button");
      buttons.forEach(b=>b.disabled=true);

      if(btn.dataset.correct === "true"){
        btn.classList.add("correct");
        feedback.textContent = "Правильно ❤️";

        const memory = screen.querySelector(".memory-photo");
        if(memory && !memory.classList.contains("empty")){
          memory.classList.add("show");
          const nextButton = memory.querySelector(".continue-photo");
          nextButton.onclick = () => {
            const next = screen.nextElementSibling;
            if(next) show(next.id);
          };
        } else {
          setTimeout(()=>{
            const next = screen.nextElementSibling;
            if(next) show(next.id);
          }, 650);
        }
      } else {
        btn.classList.add("wrong");
        feedback.textContent = "Ммм… попробуй ещё раз 🙂";
        setTimeout(()=>{
          btn.classList.remove("wrong");
          buttons.forEach(b=>b.disabled=false);
          feedback.textContent = "";
        }, 700);
      }
    });
  });
});

document.querySelector(".reveal").addEventListener("click",()=>{
  show("final");
  makeConfetti();
});

document.getElementById("restart").addEventListener("click",()=>{
  document.querySelectorAll(".answers button").forEach(b=>{
    b.disabled=false;
    b.classList.remove("correct","wrong");
  });
  document.querySelectorAll(".feedback").forEach(x=>x.textContent="");
  document.querySelectorAll(".memory-photo").forEach(x=>x.classList.remove("show"));
  show("start");
});

function makeConfetti(){
  const box=document.querySelector(".finale");
  if(!box) return;
  const old=box.querySelector(".confetti");
  if(old) old.remove();
  const conf=document.createElement("div");
  conf.className="confetti";
  conf.setAttribute("aria-hidden","true");
  box.appendChild(conf);
  for(let i=0;i<36;i++){
    const el=document.createElement("i");
    el.style.left=Math.random()*100+"%";
    el.style.top=(-10-Math.random()*20)+"%";
    el.style.animationDelay=(Math.random()*1.2)+"s";
    el.style.animationDuration=(2.2+Math.random()*1.8)+"s";
    el.style.transform=`rotate(${Math.random()*180}deg)`;
    el.style.background=["#9c3f48","#d5a0a5","#9c8c7b","#4e5d50","#c9ad79"][i%5];
    conf.appendChild(el);
  }
}

// Final photo: show the real image when assets/touareg.jpg exists.
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("touaregPhoto");
  const placeholder = document.getElementById("carPlaceholder");
  if (!img) return;
  img.addEventListener("load", () => {
    img.style.display = "block";
    if (placeholder) placeholder.style.display = "none";
  });
  img.addEventListener("error", () => {
    img.style.display = "none";
    if (placeholder) placeholder.style.display = "flex";
  });
  if (img.complete && img.naturalWidth > 0) {
    img.style.display = "block";
    if (placeholder) placeholder.style.display = "none";
  }
});
