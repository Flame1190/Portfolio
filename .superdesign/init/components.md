# Shared primitives
The site uses HTML and CSS primitives. There is no component framework. The shared button, project, publication, link and filter rules are defined in styles.css.
~~~css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
:root{
    --paper:#0d1319;
    --ink:#edf3f6;
    --muted:#a7b7c3;
    --accent:#83dccf;
    --line:#30414d
}
*{
    box-sizing:border-box
}
html{
    scroll-behavior:smooth;
    scroll-padding-top:110px
}
body,body.hero-gradient{
    margin:0;
    background:var(--paper);
    color:var(--ink);
    font-family:'Space Grotesk',sans-serif;
    line-height:1.7
}
h1,h2{
    font-family:'Space Grotesk',sans-serif!important;
    font-weight:500!important;
    letter-spacing:-.045em;
    line-height:1.08!important
}
h1{
    font-size:clamp(3rem,6vw,5.5rem)!important
}
h2{
    font-size:clamp(2rem,3.5vw,3.5rem)!important
}
h3{
    font-weight:600;
    line-height:1.35
}
p{
    line-height:1.75
}
[class*="text-slate-"],.text-white{
    color:var(--muted)!important
}
h1,h2,h3,[class*="text-slate-200"]{
    color:var(--ink)!important
}
[class*="text-blue-"],.accent-text,.link-accent{
    color:var(--accent)!important
}
.accent-text{
    font-style:normal
}
.glass,.glass-lite{
    background:transparent;
    border:0;
    border-top:1px solid var(--line);
    box-shadow:none;
    backdrop-filter:none
}
.project-card,.publication-card{
    border-radius:0!important
}
.project-card{
    padding:24px 0!important
}
.project-card:hover h3,.publication-card:hover h3{
    color:var(--accent)!important
}
.project-img{
    width:100%;
    height:250px;
    object-fit:cover
}
img{
    max-width:100%;
    border-radius:0!important
}
.tech-tag{
    display:inline-block;
    color:var(--accent);
    font-size:.72rem;
    letter-spacing:.03em;
    padding:3px 0;
    margin-right:12px;
    border:0;
    background:none
}
.btn-primary,.btn-secondary{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:.4rem;
    padding:12px 19px;
    border:1px solid var(--accent);
    border-radius:0;
    color:var(--accent);
    font-size:.85rem;
    text-decoration:none
}
.btn-primary{
    background:var(--accent);
    color:var(--paper)
}
.btn-secondary:hover{
    background:#1c3039
}
a:hover{
    text-decoration:underline;
    text-underline-offset:5px
}
a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{
    outline:3px solid #83dccf!important;
    outline-offset:5px
}
.section-rule,.grid-pattern,.decorative-circle{
    display:none
}
#navbar{
    background:var(--paper);
    border-bottom:1px solid var(--line);
    box-shadow:none
}
.nav-link-active{
    text-decoration:underline;
    text-underline-offset:7px
}
.nav-dropdown>.glass{
    background:var(--paper);
    border:1px solid var(--line);
    border-radius:0
}
.nav-group:hover .nav-dropdown,.nav-group:focus-within .nav-dropdown{
    display:block
}
#mobile-menu{
    background:var(--paper)
}
main{
    padding-bottom:80px
}
main>div:first-child{
    text-align:left!important;
    border-bottom:1px solid var(--line);
    padding-bottom:40px
}
main>div:first-child p{
    margin-left:0!important
}
main section.grid{
    padding:40px 0!important
}
.publication-card{
    padding:28px 0!important;
    border-left:0!important
}
input,select{
    background:#14212a!important;
    color:var(--ink)!important;
    border:1px solid #526775!important;
    border-radius:0!important;
    min-height:44px;
    font-size:.875rem!important
}
#about{
    max-width:1152px;
    margin:auto;
    display:grid;
    grid-template-columns:1.15fr 1fr;
    gap:50px;
    padding:160px 24px 90px;
    text-align:left;
    align-items:center
}
#about .portrait{
    width:290px;
    height:360px;
    object-fit:cover;
    filter:grayscale(1)
}
#about .intro-label{
    font-size:.8rem;
    letter-spacing:.1em;
    text-transform:uppercase;
    color:var(--accent);
    margin-bottom:24px
}
#about h1{
    margin:0 0 24px
}
#about .intro-copy{
    max-width:600px;
    color:var(--muted);
    margin-bottom:28px
}
#about .intro-links{
    display:flex;
    flex-wrap:wrap;
    gap:12px
}
#dev,#community{
    padding-top:55px;
    padding-bottom:70px
}
#dev>div:first-child,#community>div:first-child,#research>div>div:first-child{
    text-align:left!important;
    margin-bottom:36px
}
#dev>div:first-child p,#community>div:first-child p,#research>div>div:first-child p{
    margin-left:0!important
}
#community .project-card .overflow-hidden{
    display:none
}
#research{
    padding-top:65px;
    padding-bottom:65px;
    background:#111d25;
    border-top:1px solid var(--line)
}
#contact{
    padding:65px 24px;
    background:#101a22
}
#contact img{
    max-height:230px;
    object-fit:cover
}
.icon-btn{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-width:48px;
    min-height:48px;
    color:var(--accent);
    border:1px solid #526775
}
.skip-link{
    position:fixed;
    top:-100px;
    left:16px;
    z-index:100;
    background:var(--ink);
    color:var(--paper);
    padding:12px
}
.skip-link:focus{
    top:12px
}
@media(max-width:767px){
    #about{
    grid-template-columns:1fr;
    padding-top:110px;
    gap:28px
}
#about .portrait{
    width:150px;
    height:180px
}
h1{
    font-size:3.2rem!important
}
.project-img{
    height:230px
}
main{
    padding-top:80px!important
}
}
@media(prefers-reduced-motion:reduce){
    html{
    scroll-behavior:auto
}
*,*::before,*::after{
    animation:none!important;
    transition:none!important
}
}
/* Research imagery leads the introduction. */
#about {
    min-height: 700px;
    gap: 48px;
}
#about h1 {
    font-size: clamp(3rem, 5.2vw, 4.8rem) !important;
    line-height: 1.03 !important;
}
#about .intro-label,
.tech-tag,
#about .intro-label {
    font-size: .72rem;
    letter-spacing: .06em;
}
#dev {
    border-top: 1px solid var(--line);
}
#dev h2, #research h2, #community h2 {
    font-size: clamp(2rem, 3vw, 2.8rem) !important;
}
#community {
    padding-top: 72px;
}
.btn-primary:hover {
    background: #a1eee3;
    text-decoration: none;
}
.btn-secondary:hover {
    text-decoration: none;
}
.project-card img {
    transition: filter .2s ease;
}
.project-card:hover img {
    filter: brightness(1.08);
}
@media (max-width: 767px) {
    #about {
        min-height: auto;
        gap: 36px;
        padding-bottom: 50px;
}
    #about h1 {
        font-size: clamp(2.7rem, 10vw, 4rem) !important;
}
}

/* Portrait and identity within the original project-led introduction. */
.research-identity {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
}
.research-identity img {
    width: 112px;
    height: 112px;
    flex-shrink: 0;
    object-fit: cover;
    border-radius: 2px !important;
    border: 1px solid var(--line);
}
#about .research-identity .intro-label {
    margin: 0;
    line-height: 1.8;
    font-family: 'IBM Plex Mono', monospace;
}
.research-identity .intro-label span {
    color: var(--muted);
}
.intro-availability {
    margin-top: 24px;
    font-size: .85rem;
    color: var(--muted);
    max-width: 520px;
}
.research-visual {
    margin: 0;
    border: 1px solid var(--line);
    position: relative;
    background: #17252e;
}
.research-visual::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 48px;
    height: 48px;
    border-top: 2px solid var(--accent);
    border-left: 2px solid var(--accent);
    pointer-events: none;
}
.research-visual img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
}
.research-visual figcaption {
    padding: 18px 20px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: .73rem;
    line-height: 1.7;
    color: var(--muted);
    border-top: 1px solid var(--line);
}
.research-visual figcaption a {
    display: block;
    color: var(--ink);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
    margin-bottom: 4px;
}
@media (max-width: 767px) {
    .research-visual { max-width: 520px; }
    .research-identity img { width: 88px; height: 88px; }
}

~~~
