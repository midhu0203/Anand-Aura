/* ============================================================
   ANAND AURA — SHARED SCRIPT
   Loaded by every page at the bottom of <body>.
   Safe to load on every page: it only animates elements that
   actually exist on the current page (missing ones are skipped).
   ============================================================ */

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ---- Hero entrance (home page only — elements simply won't exist elsewhere) ---- */
gsap.from(".hero-copy .eyebrow", {opacity:0, y:16, duration:.6, delay:.1});
gsap.from(".hero h1", {opacity:0, y:24, duration:.8, delay:.2});
gsap.from(".hero p.lead", {opacity:0, y:20, duration:.7, delay:.4});
gsap.from(".hero-ctas .btn", {opacity:0, y:16, duration:.6, delay:.55, stagger:.1});
gsap.from(".hero-stats > div", {opacity:0, y:12, duration:.6, delay:.75, stagger:.08});
gsap.from("#hero-nodes g", {opacity:0, scale:.7, duration:.6, delay:.3, stagger:.15, ease:"back.out(1.7)"});
gsap.from("#spine", {opacity:0, duration:1, delay:.2});

/* ---- Page hero entrance (inner pages) ---- */
gsap.from(".page-hero .breadcrumb", {opacity:0, y:10, duration:.5});
gsap.from(".page-hero .eyebrow", {opacity:0, y:14, duration:.5, delay:.05});
gsap.from(".page-hero h1", {opacity:0, y:20, duration:.7, delay:.1});
gsap.from(".page-hero p.lead", {opacity:0, y:16, duration:.6, delay:.25});

/* ---- Flowing dots along the hero pipeline (home page) ---- */
if(document.getElementById("dot1")){
  gsap.to("#dot1", {motionPath:{path:"#spine", align:"#spine", alignOrigin:[0.5,0.5]}, duration:4, repeat:-1, ease:"none"});
  gsap.to("#dot2", {motionPath:{path:"#spine", align:"#spine", alignOrigin:[0.5,0.5]}, duration:4, repeat:-1, ease:"none", delay:2});
}

/* ---- Generic scroll reveals — reused across every page ---- */
const revealTargets = [
  ".about-visual", ".about-list li", ".value-card", ".service-card", ".journey-step",
  ".flow-diagram", ".feature-list li", ".split-panel", ".pipeline-node",
  ".stairs li", ".step-list li", ".testimonial-card", ".contact-info > *", "form"
];
revealTargets.forEach(sel => {
  gsap.utils.toArray(sel).forEach((el, i) => {
    gsap.from(el, {
      opacity:0, y:28, duration:.7, ease:"power2.out",
      scrollTrigger:{trigger:el, start:"top 88%"},
      delay: (i%6)*0.05
    });
  });
});

/* ---- AI diagram dot flow (AI Automation page) ---- */
if(document.getElementById("aidot1")){
  gsap.set("#aidot1", {x:200, y:60});
  gsap.to("#aidot1", {y:130, duration:1.2, repeat:-1, repeatDelay:.8, ease:"power1.inOut"});
  gsap.set("#aidot2", {x:200, y:280});
  gsap.to("#aidot2", {y:340, duration:1, repeat:-1, repeatDelay:1, ease:"power1.inOut"});
}

/* ---- Eyebrow slide-in on every section ---- */
gsap.utils.toArray(".eyebrow").forEach(el=>{
  gsap.from(el, {opacity:0, x:-14, duration:.6, scrollTrigger:{trigger:el, start:"top 92%"}});
});

/* ---- Nav shadow on scroll ---- */
ScrollTrigger.create({
  start: 60,
  onUpdate: () => {
    const nav = document.querySelector(".nav-inner");
    if(nav) nav.style.boxShadow = window.scrollY > 40 ? "0 8px 30px -12px rgba(0,0,0,.6)" : "none";
  }
});

/* ---- Mobile menu toggle ---- */
const burger = document.querySelector(".hamburger");
if(burger){
  burger.addEventListener("click", () => {
    const links = document.querySelector("nav.links");
    const open = links.style.display === "flex";
    links.style.cssText = open ? "" : "display:flex;position:fixed;top:78px;left:20px;right:20px;flex-direction:column;background:rgba(10,11,16,.95);border:1px solid var(--border);border-radius:16px;padding:20px;gap:18px;";
  });
}

/* ---- Mark current page's nav link as active ---- */
(function(){
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.links a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href === current) a.classList.add("active");
  });
})();

/* ---- Demo contact form (contact.html) ---- */
const contactForm = document.getElementById("contact-form");
if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    document.querySelector(".form-note-success").style.display = "block";
  });
}
