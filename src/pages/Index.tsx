import heroImg from "@/assets/newblue.jpeg";
import heroMobileImg from "@/assets/newblue.jpeg";
import vanImg from "@/assets/van.jfif";
import carImg from "@/assets/airport-surfers.png";
import surfTaxiImg from "@/assets/surf-taxi.jfif";
import galleryBeachImg from "@/assets/gallery-beach.jfif";
import galleryPoolImg from "@/assets/gallery-pool.jfif";
import promoImg from "@/assets/promo.jfif";
import viewpointImg from "@/assets/viewpoint.png";
import logoImg from "@/assets/logo.png";
import serviceAirportImg from "@/assets/service-airport.jpg";
import serviceSurfImg from "@/assets/service-surf.jpg";
import serviceDaytripImg from "@/assets/service-daytrip.jpg";
import serviceVolcanoImg from "@/assets/service-volcano.png";
import spotElTuncoImg from "@/assets/spot-el-tunco.jpg";
import spotElSunzalImg from "@/assets/spot-el-sunzal.jpg";
import spotPuntaRocaImg from "@/assets/spot-punta-roca.jpg";
import spotLaBocanaImg from "@/assets/spot-la-bocana.jpg";
import gallerySunsetSurfImg from "@/assets/gallery-sunset-surf.jpg";
import galleryPalmBeachImg from "@/assets/gallery-palm-beach.jpg";
import galleryFlightImg from "@/assets/gallery-tropical-road.jpg";
import taxi1VideoSrc from "@/assets/videos/taxi1.mp4";
import taxi2VideoSrc from "@/assets/videos/taxi2.mp4";
import taxi3VideoSrc from "@/assets/videos/taxi3.mp4";
import reviewSarahImg from "@/assets/review-sarah.png";
import reviewCarlosImg from "@/assets/review-carlos.png";
import reviewEmilyJakeImg from "@/assets/review-emily-jake.png";
import { Phone, MapPin, Shield, Star, Clock, Car, Compass, Camera, Users, Menu, Mail, Send, MessageSquarePlus, Mountain, Waves } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import TikTokIcon from "@/components/TikTokIcon";
import { Facebook, Instagram } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { getCMSProducts, getCMSMedia, getCMSPosts, getCMSPages, getCMSPage, type CMSProduct, type CMSMedia, type CMSPost, type CMSPage, type CMSSection } from "@/lib/cms";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReviewModal from "@/components/ReviewModal";

const WHATSAPP_NUMBER = "50375362408";
const PHONE_NUMBER = "+503 7536-2408";
const EMAIL_ADDRESS = "ucoach15@gmail.com";

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  message: string;
  created_at: string;
}

const LOCAL_CAROUSEL_VIDEOS = [taxi1VideoSrc, taxi2VideoSrc, taxi3VideoSrc];

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const reviewVideoRef = useRef<HTMLVideoElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [wslBannerVisible, setWslBannerVisible] = useState(true);

  // CMS videos prepended to local fallback videos
  const [cmsVideoUrls, setCmsVideoUrls] = useState<string[]>([]);

  const carouselVideos = useMemo(
    () => cmsVideoUrls.length > 0 ? [...cmsVideoUrls, ...LOCAL_CAROUSEL_VIDEOS] : LOCAL_CAROUSEL_VIDEOS,
    [cmsVideoUrls]
  );

  const goTo = useCallback((idx: number) => {
    setCarouselIndex((idx + carouselVideos.length) % carouselVideos.length);
  }, [carouselVideos.length]);

  const toggleMute = useCallback(() => {
    const video = reviewVideoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  useEffect(() => {
    const video = reviewVideoRef.current;
    if (!video) return;
    video.muted = isMuted;
    video.play().catch(() => {});
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);

    const onEnded = () => goTo(carouselIndex + 1);
    video.addEventListener("ended", onEnded);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
    };
  }, [carouselIndex, goTo, carouselVideos]);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [dbTestimonials, setDbTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = useCallback(async () => {
    const { data } = await supabase
      .from("testimonials" as any)
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setDbTestimonials(data as unknown as Testimonial[]);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // ── CMS state ──────────────────────────────────────────────────────────────
  const [cmsProducts, setCmsProducts] = useState<CMSProduct[]>([]);
  const [cmsMedia, setCmsMedia] = useState<CMSMedia[]>([]);
  const [cmsPosts, setCmsPosts] = useState<CMSPost[]>([]);
  const [cmsPages, setCmsPages] = useState<CMSPage[]>([]);
  const [cmsSections, setCmsSections] = useState<CMSSection[]>([]);
  const [cmsLoading, setCmsLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getCMSProducts(),
      getCMSMedia(),
      getCMSPosts(),
      getCMSPages(),
      getCMSPage("your-ride-to-paradise-starts-here"),
    ]).then(([products, media, posts, pages, page]) => {
      if (products.status === "fulfilled") setCmsProducts(products.value);
      if (media.status === "fulfilled") {
        setCmsMedia(media.value);
        const videos = media.value
          .filter(m => /\.(mp4|mov|webm)$/i.test(m.filename))
          .map(m => m.url);
        if (videos.length > 0) setCmsVideoUrls(videos);
      }
      if (posts.status === "fulfilled") setCmsPosts(posts.value);
      if (pages.status === "fulfilled") setCmsPages(pages.value);
      if (page.status === "fulfilled") setCmsSections(page.value.sections ?? []);
      setCmsLoading(false);
    });
  }, []);

  const { toast } = useToast();
  const navLinks = [
    { href: "#driver", label: "Meet Josh" },
    { href: "#services", label: "Services" },
    { href: "#surf-spots", label: "Surf Spots" },
    { href: "#why-us", label: "Why Us" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
    { href: "#book", label: "Book Now" },
  ];

  // Parse all text blocks from the CMS page body into an indexed array
  const mainPage = cmsPages[0] ?? null;
  const cmsBlocks: { tag: string; text: string }[] = (() => {
    if (!mainPage?.body) return [];
    const matches = mainPage.body.match(/<(p|h1|h2|h3)[^>]*>[\s\S]*?<\/(p|h1|h2|h3)>/gi) || [];
    return matches.map(m => ({
      tag: (m.match(/^<(\w+)/) || [])[1] || "p",
      text: m.replace(/<[^>]+>/g, "").trim(),
    })).filter(b => b.text.length > 0);
  })();

  // Helper: find text by approximate match (first block whose text starts with the search string)
  const cms = (search: string, fallback: string): string => {
    const lower = search.toLowerCase();
    const found = cmsBlocks.find(b => b.text.toLowerCase().startsWith(lower));
    return found ? found.text : fallback;
  };

  // Helper: get a section's data by type
  const section = (type: string) => cmsSections.find(s => s.type === type)?.data ?? null;

  // ── Section data helpers ───────────────────────────────────────────────────
  const heroSection         = section("hero");
  const aboutSection        = section("about");
  const testimonialsSection = section("testimonials");
  // find the services section whose heading is "Our Services"
  const servicesSection     = cmsSections.find(s => s.type === "services" && (s.data.heading as string)?.toLowerCase().includes("our services"))?.data ?? null;
  // find the surf spots cards section
  const surfSpotsSection    = cmsSections.find(s => s.type === "cards")?.data ?? null;
  // find the "why us" services section
  const whyUsSection        = cmsSections.find(s => s.type === "services" && (s.data.heading as string)?.toLowerCase().includes("ride"))?.data ?? null;
  const gallerySection      = section("gallery");
  const contactSection      = section("contact");
  const ctaSection          = section("cta");

  // Hero
  const heroTitle    = (heroSection?.heading as string) ?? mainPage?.title ?? "Your Ride to Paradise Starts Here";
  const heroSubtitle = (heroSection?.subheading as string) ?? "El Salvador's #1 surf taxi. Josh knows every break, every tide, every hidden gem — get to the right wave at the right time.";
  const heroLabel    = "El Salvador's Surf Taxi";

  // About / Driver
  const driverLabel   = "Meet Your Driver";
  const driverHeading = (aboutSection?.heading as string) ?? "Hey, I'm Josh! 🤙";
  const driverBioText = (aboutSection?.body as string) ?? null;

  // Testimonials
  const testimonialsLabel   = "Testimonials";
  const testimonialsHeading = (testimonialsSection?.heading as string) ?? "What Our Clients Say";

  // Services
  const servicesLabel   = "What We Offer";
  const servicesHeading = (servicesSection?.heading as string) ?? "Our Services";

  // Surf Spots
  const surfSpotsLabel       = "The Breaks Josh Knows Best";
  const surfSpotsHeading     = (surfSpotsSection?.heading as string) ?? "El Salvador's Best Surf Spots";
  const surfSpotsDescription = "Most drivers just drop you at the beach. Josh knows which break is firing, which tide to hit, and which spot matches your level — so you spend more time in the water, less time guessing.";

  // Why Us
  const whyUsLabel   = "Why Choose Us";
  const whyUsHeading = (whyUsSection?.heading as string) ?? "More Than Just a Ride";

  // Gallery
  const galleryLabel   = "El Salvador Awaits";
  const galleryHeading = (gallerySection?.heading as string) ?? "Tourism Gallery";

  // Contact
  const contactLabel       = "Get in Touch";
  const contactHeading     = (contactSection?.heading as string) ?? "Contact Me";
  const contactDescription = "Have a question or want to plan your trip? Drop me a message!";
  const contactOtherWays   = "Other Ways to Reach Me";

  // CTA / Book
  const bookLabel    = (ctaSection?.heading as string) ?? "Ready to Explore El Salvador?";
  const bookSubtext  = (ctaSection?.subheading as string) ?? "Book your ride in seconds. Just send a WhatsApp message or give a quick call — Josh will take care of the rest.";
  const bookSurfTour = "Book a Surf Tour";

  // Buttons (static labels)
  const btnBookWhatsApp = "Book via WhatsApp";
  const btnWhatsApp     = "WhatsApp";
  const btnCallNow      = "Call Now";
  const btnBookNow      = "Book Now";
  const btnLeaveReview  = "Leave a Review";
  const btnSendMessage  = "Send Message";

  // Why Us items from CMS or fallback
  type WhyItem = { title: string; description: string; icon: string };
  const whyItems: WhyItem[] = ((whyUsSection?.items as WhyItem[]) ?? [
    { title: "Surfer's Inside Knowledge", description: "Josh surfs these breaks himself. He knows which spot fires on which swell, which tide to hit Punta Roca, and where the crowd won't be.", icon: "🏄" },
    { title: "Safe & Reliable", description: "Licensed, insured, and always on time. Board racks on the vehicle — no squeezing boards into a sedan.", icon: "🛡️" },
    { title: "24/7 Availability", description: "Dawn patrol or sunset session? Early flights? Josh is available around the clock.", icon: "🕐" },
    { title: "Bilingual & Local", description: "Born and raised in El Salvador. Fluent in English and Spanish — he'll talk waves, tides, and local spots all the way there.", icon: "🗣️" },
  ]);
  const whyTitle1 = whyItems[0]?.title ?? "Safe & Reliable";
  const whyDesc1  = whyItems[0]?.description ?? "";
  const whyTitle2 = whyItems[1]?.title ?? "Local Expertise";
  const whyDesc2  = whyItems[1]?.description ?? "";
  const whyTitle3 = whyItems[2]?.title ?? "24/7 Availability";
  const whyDesc3  = whyItems[2]?.description ?? "";
  const whyTitle4 = whyItems[3]?.title ?? "Bilingual Service";
  const whyDesc4  = whyItems[3]?.description ?? "";

  // Contact details from CMS or fallback
  const cmsContactEmail   = (contactSection?.email as string) ?? EMAIL_ADDRESS;
  const cmsContactPhone   = (contactSection?.phone as string) ?? PHONE_NUMBER;
  const contactAddress = (contactSection?.address as string) ?? "El Salvador, Central America";

  // Form labels (static)
  const formLabelName    = "Name";
  const formLabelEmail   = "Email";
  const formLabelMessage = "Message";

  // Footer (static)
  const footerBrand      = "Josh's Surf Taxi";
  const footerDesc       = "Your trusted ride across El Salvador. Airport transfers, surf tours, and custom adventures — driven by a local who knows every hidden gem.";
  const footerExplore    = "Explore";
  const footerGetInTouch = "Get in Touch";
  const footerLocation   = contactAddress;
  const footerCopyright  = `© ${new Date().getFullYear()} Josh's Surf Taxi. All rights reserved.`;
  const footerMadeWith   = "Made with 🤙 in El Salvador";

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b-2 border-primary shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 h-[60px] md:h-20">
          <img src={logoImg} alt="Josh's Surf Taxi logo" className="h-11 md:h-16 w-auto rounded-full" />
          {/* Social icons - mobile & desktop */}
          <div className="flex items-center gap-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:opacity-80 transition-opacity">
              <Facebook className="w-7 h-7" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:opacity-80 transition-opacity">
              <Instagram className="w-7 h-7" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity">
              <TikTokIcon className="w-7 h-7" />
            </a>
          </div>
          <div className="hidden md:flex items-center gap-1 font-heading">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-bold text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={whatsappLink("Hi Josh! I'd like to book a ride.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground px-3 py-2 rounded-lg text-sm font-semibold font-heading flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 rounded-lg text-secondary-foreground hover:bg-primary/20 transition-colors" aria-label="Open menu">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-secondary border-primary/20 w-72">
                <nav className="flex flex-col gap-1 mt-8 font-heading">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-base font-bold text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 uppercase tracking-wider"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="border-t border-primary/20 mt-4 pt-4">
                    <a
                      href={whatsappLink("Hi Josh! I'd like to book a ride.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-accent-foreground px-4 py-3 rounded-lg font-heading font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      {btnBookWhatsApp}
                    </a>
                    <a
                      href={`tel:${cmsContactPhone.replace(/\s/g, "")}`}
                      className="mt-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-heading font-bold text-sm flex items-center gap-2 hover:bg-primary/80 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {cmsContactPhone}
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-0 md:min-h-[90vh] flex items-end pb-0 md:pb-20 pt-[60px] md:pt-16">

        {/* WSL Modal Popup */}
        {wslBannerVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setWslBannerVisible(false)} />

            {/* Modal card */}
            <div className="relative w-full max-w-sm md:max-w-md rounded-3xl overflow-hidden shadow-2xl">

              {/* Punta Roca background */}
              <img
                src={spotPuntaRocaImg}
                alt="Punta Roca surf break"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105"
              />
              {/* Ocean overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(170deg, rgba(3,14,28,0.88) 0%, rgba(6,40,70,0.78) 55%, rgba(3,14,28,0.93) 100%)" }} />
              {/* Wave decoration */}
              <svg viewBox="0 0 400 40" className="absolute bottom-0 left-0 w-full opacity-25" preserveAspectRatio="none">
                <path d="M0,20 C60,5 120,35 200,20 C280,5 340,35 400,20 L400,40 L0,40 Z" fill="white"/>
              </svg>

              {/* Content */}
              <div className="relative z-10 px-7 pt-8 pb-7 flex flex-col gap-3">

                {/* WSL badge row */}
                <div className="flex items-center gap-2">
                  <span className="bg-cyan-400 text-[#051428] text-[10px] font-heading font-extrabold px-2.5 py-1 rounded-lg tracking-widest uppercase">WSL CT</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/60 text-xs font-heading font-bold uppercase tracking-wider">Event 05</span>
                </div>

                {/* Title */}
                <div>
                  <p className="font-heading font-extrabold text-white text-3xl md:text-4xl leading-tight">Surf City</p>
                  <p className="font-heading font-extrabold text-cyan-300 text-3xl md:text-4xl leading-tight">El Salvador Pro</p>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-white/90 text-sm font-semibold">Punta Roca, La Libertad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📅</span>
                    <span className="text-white/80 text-sm font-semibold">June 5 – 15, 2026</span>
                  </div>
                </div>

                {/* Tagline */}
                <div className="border-t border-white/20 mt-1 pt-3">
                  <p className="text-white/70 text-sm leading-relaxed">Coming to watch the world's best surfers at Punta Roca? Josh will get you there — and back.</p>
                </div>

                {/* CTA button */}
                <a
                  href={whatsappLink("Aloha Josh! 🤙 I need a ride to the Surf City El Salvador Pro at Punta Roca (Jun 5–15).")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 bg-cyan-400 hover:bg-cyan-300 text-[#051428] rounded-2xl px-4 py-3.5 flex items-center justify-center gap-2.5 transition-colors shadow-lg"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span className="text-sm md:text-base font-heading font-extrabold uppercase tracking-wide">Book Your Ride 🤙</span>
                </a>

                {/* Dismiss — big, attractive, part of the card */}
                <button
                  onClick={() => setWslBannerVisible(false)}
                  className="mt-1 w-full py-3 rounded-2xl bg-white/15 hover:bg-white/25 border-2 border-white text-white text-sm font-heading font-extrabold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-xl font-black leading-none">✕</span> Back to website
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile: image drives height */}
        <div className="md:hidden relative w-full">
          <img
            src={heroMobileImg}
            alt="Josh's surf taxi on the beach with surfboards"
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/50" />
          <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
            <p className="text-primary font-heading font-bold text-xs tracking-widest uppercase mb-3 drop-shadow-sm">
              {heroLabel}
            </p>
            <h1 className="font-heading font-extrabold text-[28px] leading-[1.2] text-primary mb-3 max-w-[320px] drop-shadow-md">
              {heroTitle}
            </h1>
            <p className="text-white/90 text-sm leading-relaxed max-w-[300px] drop-shadow-sm">
              {heroSubtitle}
            </p>
          </div>
        </div>
        {/* Desktop: original absolute layout */}
        <div className="absolute inset-0 hidden md:block">
          <img
            src={heroImg}
            alt="Josh standing at scenic viewpoint with El Salvador flag"
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-5 md:px-4 hidden md:block">
          <div className="max-w-xl">
            <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-3 drop-shadow-sm">
              {heroLabel}
            </p>
            <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-primary leading-tight mb-4 drop-shadow-md">
              {heroTitle}
            </h1>
            <p className="text-white/90 text-lg mb-6 leading-relaxed max-w-md drop-shadow-sm">
              {heroSubtitle}
            </p>
            <div className="hidden md:flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink("Hi Josh! I'd like to book a ride from the airport.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-heading font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
              >
                <WhatsAppIcon className="w-5 h-5" />
                {btnBookWhatsApp}
              </a>
              <a
                href={`tel:${cmsContactPhone.replace(/\s/g, "")}`}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                {btnCallNow}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT OUR CLIENTS SAY ===== */}
      <section id="testimonials" className="pt-3 pb-6 md:pb-8">
        <div className="container mx-auto px-5 md:px-4">
          <div className="text-center mb-3">
            <p className="text-primary font-heading font-bold text-[10px] tracking-widest uppercase mb-1">{testimonialsLabel}</p>
            <h2 className="font-heading font-extrabold text-lg md:text-2xl">{testimonialsHeading}</h2>
          </div>

          {/* Video + quotes layout */}
          <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-start">

            {/* Main video carousel */}
            <div className="md:col-span-3 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-muted shadow-lg">
                <video
                  key={carouselIndex}
                  ref={reviewVideoRef}
                  src={carouselVideos[carouselIndex]}
                  controls
                  muted
                  autoPlay
                  playsInline
                  className="w-full h-auto object-cover"
                />

                {/* Mute / Unmute button */}
                <button
                  onClick={toggleMute}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors text-lg"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>
                {isMuted && (
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <div className="bg-black/60 text-white text-xs font-heading font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      🔇 Tap to unmute
                    </div>
                  </div>
                )}
                {/* Prev / Next arrows */}
                <button
                  onClick={() => goTo(carouselIndex - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                  aria-label="Previous video"
                >
                  ‹
                </button>
                <button
                  onClick={() => goTo(carouselIndex + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
                  aria-label="Next video"
                >
                  ›
                </button>
              </div>
              {/* Dot indicators */}
              <div className="flex justify-center gap-2">
                {carouselVideos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${i === carouselIndex ? "bg-primary" : "bg-primary/30"}`}
                    aria-label={`Go to video ${i + 1}`}
                  />
                ))}
              </div>
              {/* Quote below video */}
              <div className="bg-card rounded-xl p-5 border border-border flex gap-4 items-start">
                <span className="text-primary text-3xl font-serif leading-none mt-[-4px] shrink-0">"</span>
                <div>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed italic">
                    Josh got us from the airport to the surf break without any stress. Friendly, punctual, and he knew exactly which spots had the best waves that day.
                  </p>
                  <p className="mt-3 text-sm font-heading font-bold">Sarah & Mike <span className="font-normal text-muted-foreground">· California, USA</span></p>
                </div>
              </div>
            </div>

            {/* Side quotes */}
            <div className="md:col-span-2 flex flex-col gap-4">
              {[
                {
                  name: "Tom Henriksen",
                  origin: "Oslo, Norway",
                  quote: "Travelling solo and Josh made me feel completely at home. Reliable, friendly and knows every hidden spot on the coast.",
                  avatar: "TH",
                },
                {
                  name: "The Morales Family",
                  origin: "Mexico City, Mexico",
                  quote: "Best part of our El Salvador trip! Kids loved it. Josh knew which beaches were safe and which had the best waves for the kids.",
                  avatar: "MF",
                },
                {
                  name: "Carlos R.",
                  origin: "Madrid, Spain",
                  quote: "Five stars. Zero stress. Just showed up and Josh handled everything — route, timing, even local lunch recommendations.",
                  avatar: "CR",
                },
              ].map((t) => (
                <div key={t.name} className="bg-card rounded-xl p-4 border border-border flex gap-3 items-start hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.quote}"</p>
                    <p className="mt-2 text-xs font-heading font-bold">{t.name} <span className="font-normal text-muted-foreground">· {t.origin}</span></p>
                  </div>
                </div>
              ))}

              {/* Star rating */}
              <div className="flex items-center gap-2 justify-center mt-1 text-muted-foreground text-xs">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="text-primary">
                      <path d="M8 1l1.76 3.57L14 5.27l-3 2.92.71 4.14L8 10.19l-3.71 2.14.71-4.14L2 5.27l4.24-.7L8 1z" />
                    </svg>
                  ))}
                </div>
                <span>5.0 rating · 200+ rides</span>
              </div>

              {/* Live DB reviews */}
              {dbTestimonials.slice(0, 3).map((t) => (
                <div key={t.id} className="bg-card rounded-xl p-4 border border-border flex gap-3 items-start hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold shrink-0">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-primary">
                          <path d="M8 1l1.76 3.57L14 5.27l-3 2.92.71 4.14L8 10.19l-3.71 2.14.71-4.14L2 5.27l4.24-.7L8 1z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.message}"</p>
                    <p className="mt-2 text-xs font-heading font-bold">{t.name}</p>
                  </div>
                </div>
              ))}

              {/* Leave a review CTA */}
              <ReviewModal onSubmitted={fetchTestimonials}>
                <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-4 py-2.5 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                  <MessageSquarePlus className="w-4 h-4" />
                  {btnLeaveReview}
                </button>
              </ReviewModal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEET YOUR DRIVER ===== */}
      <section id="driver" className="py-14 md:py-20 bg-muted">
        <div className="container mx-auto px-5 md:px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">
                {driverLabel}
              </p>
              <h2 className="font-heading font-extrabold text-2xl md:text-4xl mb-4 md:mb-6">
                {driverHeading}
              </h2>
              {driverBioText ? (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5 md:mb-6">
                  {driverBioText}
                </p>
              ) : (
                <>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-3 md:mb-4">
                    I've been driving visitors around El Salvador for over 5 years.
                    Whether you're chasing waves at El Tunco, exploring Mayan ruins,
                    or just need a safe ride from the airport — I've got you covered.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5 md:mb-6">
                    My goal is simple: make your trip stress-free, safe, and
                    unforgettable. Every ride comes with local tips, good vibes, and
                    a clean, comfortable vehicle.
                  </p>
                </>
              )}
              <a
                href={whatsappLink("Hey Josh! I'd love to book a ride.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-heading font-bold text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {btnBookNow}
              </a>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={viewpointImg}
                alt="Josh at scenic viewpoint with El Salvador flag"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">{servicesLabel}</p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">{servicesHeading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {((servicesSection?.items as { title: string; description: string; icon: string; image: string }[]) ?? [
              { title: "Airport Transfers", description: "Comfortable, on-time pickups and drop-offs at San Salvador International Airport (SAL). AC vehicle, flight tracking, board racks included.", icon: "✈️", image: serviceAirportImg },
              { title: "Surf Spot Tours", description: "Josh surfs these breaks himself — he'll match you to the right spot for your level, hit the right tide, and get you in the water fast. No guessing, no wasted sessions.", icon: "🏄", image: heroImg },
              { title: "Custom Day Trips", description: "Explore Ruta de las Flores, Joya de Cerén, Lake Coatepeque and beyond. Fully personalised itineraries.", icon: "🗺️", image: serviceDaytripImg },
              { title: "Volcano & Nature Tours", description: "Hike Volcán Santa Ana, explore national parks, and discover El Salvador's stunning landscapes with a local guide by your side.", icon: "🌋", image: serviceVolcanoImg },
            ]).map((service) => (
              <div key={service.title} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {service.image && (
                  <img src={service.image} alt={service.title} className="w-full aspect-video object-cover" loading="lazy" />
                )}
                <div className="p-5 md:p-6 text-center">
                  {service.icon && (
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 text-xl">
                      {service.icon}
                    </div>
                  )}
                  <h3 className="font-heading font-bold text-lg md:text-xl mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== POPULAR SURF SPOTS ===== */}
      <section id="surf-spots" className="py-14 md:py-20 bg-muted">
        <div className="container mx-auto px-5 md:px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">
              {surfSpotsLabel}
            </p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">{surfSpotsHeading}</h2>
            <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl mx-auto">
              {surfSpotsDescription}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {([
              { title: "El Tunco", level: "Beginner", levelColor: "bg-green-500", description: "The most famous surf beach in El Salvador. Consistent beach break with forgiving waves — perfect for first-timers and progression surfers.", image: spotElTuncoImg },
              { title: "El Sunzal", level: "Intermediate", levelColor: "bg-yellow-500", description: "World-renowned right-hand point break with long, clean rides. Josh times it for the best tide window so you get the full ride.", image: spotElSunzalImg },
              { title: "Punta Roca", level: "Advanced", levelColor: "bg-red-500", description: "El Salvador's most iconic wave — powerful right-hand point break over rocks. Josh knows exactly when it fires and how to position you.", image: spotPuntaRocaImg },
              { title: "La Bocana", level: "All Levels", levelColor: "bg-blue-500", description: "Mellow river-mouth break ideal for longboarders and beginners. Uncrowded, relaxed vibe — a hidden gem most tourists never find.", image: spotLaBocanaImg },
            ]).map((spot) => (
              <div key={spot.title} className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  <img
                    src={spot.image}
                    alt={`${spot.title} surf spot, El Salvador`}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className={`absolute top-3 left-3 ${spot.levelColor} text-white text-[11px] font-heading font-bold px-2.5 py-1 rounded-full`}>
                    {spot.level}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Waves className="w-4 h-4 text-primary" />
                    <h3 className="font-heading font-bold text-lg">{spot.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{spot.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-10">
            <a
              href={whatsappLink("Hi Josh! I'd like to book a surf spot tour.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-heading font-bold text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-4 h-4" />
              {bookSurfTour}
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section id="why-us" className="py-14 md:py-20 bg-muted">
        <div className="container mx-auto px-5 md:px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img
                src={carImg}
                alt="Josh's Toyota taxi van"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
              />
            </div>
            <div>
              <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">
                {whyUsLabel}
              </p>
              <h2 className="font-heading font-extrabold text-2xl md:text-4xl mb-6 md:mb-8">
                {whyUsHeading}
              </h2>
              <div className="space-y-5 md:space-y-6">
                {[
                  { icon: Shield, title: whyTitle1, desc: whyDesc1 },
                  { icon: Star,   title: whyTitle2, desc: whyDesc2 },
                  { icon: Clock,  title: whyTitle3, desc: whyDesc3 },
                  { icon: Users,  title: whyTitle4, desc: whyDesc4 },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 md:w-11 md:h-11 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base md:text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">
              {galleryLabel}
            </p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">{galleryHeading}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {((gallerySection?.images as { url: string; caption: string }[]) ?? [
              { url: galleryBeachImg, caption: "Beautiful beach in El Salvador" },
              { url: spotElTuncoImg, caption: "El Tunco beach at sunset" },
              { url: spotPuntaRocaImg, caption: "Punta Roca — WSL Surf City" },
              { url: heroImg, caption: "Josh's surf taxi on the beach" },
              { url: spotElSunzalImg, caption: "Surfer riding a wave at El Sunzal" },
              { url: serviceVolcanoImg, caption: "Volcano tour — Volcán Santa Ana" },
              { url: galleryPoolImg, caption: "Infinity pool with ocean view" },
              { url: gallerySunsetSurfImg, caption: "Sunset on El Salvador's Pacific coast" },
              { url: carImg, caption: "Airport pickup with surfboards" },
              { url: galleryPalmBeachImg, caption: "Tropical palm beach paradise" },
              { url: viewpointImg, caption: "Josh at scenic viewpoint" },
              { url: galleryFlightImg, caption: "Flying into El Salvador" },
            ]).map((img, i) => (
              <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : i === 5 ? "col-span-2 row-span-2" : ""}`}>
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 aspect-[4/3]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section id="contact" className="py-14 md:py-20 bg-muted">
        <div className="container mx-auto px-5 md:px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">
              {contactLabel}
            </p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">{contactHeading}</h2>
            <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-xl mx-auto">
              {contactDescription}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const subject = encodeURIComponent(`Message from ${contactName}`);
                const body = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\n${contactMessage}`);
                window.open(`mailto:${cmsContactEmail}?subject=${subject}&body=${body}`, "_self");
                toast({ title: "Opening your email client!", description: "Your message is ready to send." });
                setContactName("");
                setContactEmail("");
                setContactMessage("");
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="contact-name" className="block text-sm font-heading font-bold mb-1.5">{formLabelName}</label>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  maxLength={100}
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-heading font-bold mb-1.5">{formLabelEmail}</label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="bg-background"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-heading font-bold mb-1.5">{formLabelMessage}</label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell me about your trip plans..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  maxLength={1000}
                  rows={4}
                  className="bg-background"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-heading font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors"
              >
                <Send className="w-4 h-4" />
                {btnSendMessage}
              </button>
            </form>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-lg mb-3">{contactOtherWays}</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${cmsContactEmail}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm">{cmsContactEmail}</span>
                  </a>
                  <a
                    href={whatsappLink("Hi Josh! I have a question.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-10 h-10 bg-accent/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <WhatsAppIcon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm">{cmsContactPhone}</span>
                  </a>
                  <a
                    href={`tel:${cmsContactPhone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm">{cmsContactPhone}</span>
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm">{footerLocation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOOKING CTA ===== */}
      <section id="book" className="py-14 md:py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-5 md:px-4 text-center">
          <h2 className="font-heading font-extrabold text-2xl md:text-4xl mb-3 md:mb-4">
            {bookLabel}
          </h2>
          <p className="text-secondary-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10">
            {bookSubtext}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href={whatsappLink("Hi Josh! I'd like to book a ride.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-accent text-accent-foreground px-8 py-4 rounded-xl font-heading font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6" />
              {btnBookWhatsApp}
            </a>
            <a
              href={`tel:${cmsContactPhone.replace(/\s/g, "")}`}
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:bg-primary/80 transition-colors"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
              {cmsContactPhone}
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-secondary text-secondary-foreground pb-28 md:pb-0">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

        <div className="container mx-auto px-5 md:px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Brand column */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-5">
                <img src={logoImg} alt="Josh's Surf Taxi" className="h-12 w-12 rounded-full" />
                <span className="font-heading font-extrabold text-xl text-primary">{footerBrand}</span>
              </div>
              <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-sm mb-6">
                {footerDesc}
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a href={whatsappLink("Hi Josh!")} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all">
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-5 text-primary">{footerExplore}</h4>
              <nav className="flex flex-col gap-3 text-sm">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors hover:translate-x-1 transform duration-200">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-5 text-primary">{footerGetInTouch}</h4>
              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${cmsContactEmail}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  {cmsContactEmail}
                </a>
                <a
                  href={`tel:${cmsContactPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  {cmsContactPhone}
                </a>
                <div className="flex items-center gap-3 text-secondary-foreground/70">
                  <span className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  {footerLocation}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-foreground/10">
          <div className="container mx-auto px-5 md:px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary-foreground/50">
            <span>{footerCopyright}</span>
            <span>{footerMadeWith}</span>
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-secondary/95 backdrop-blur-md border-t border-primary/30 px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] flex gap-3">
        <a
          href={whatsappLink("Hi Josh! I'd like to book a ride.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-accent text-accent-foreground py-2.5 rounded-lg font-heading font-bold text-sm flex items-center justify-center gap-2"
        >
          <WhatsAppIcon className="w-4 h-4" />
          {btnWhatsApp}
        </a>
        <a
          href={`tel:${cmsContactPhone.replace(/\s/g, "")}`}
          className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-heading font-bold text-sm flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          {btnCallNow}
        </a>
      </div>
    </div>
  );
};

export default Index;
