import heroImg from "@/assets/surf-car-beach.png";
import heroMobileImg from "@/assets/surf-car-beach.png";
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
import reviewSarahImg from "@/assets/review-sarah.png";
import reviewCarlosImg from "@/assets/review-carlos.png";
import reviewEmilyJakeImg from "@/assets/review-emily-jake.png";
import { Phone, MapPin, Shield, Star, Clock, Car, Compass, Camera, Users, Menu, Mail, Send, MessageSquarePlus, Mountain, Waves } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import TikTokIcon from "@/components/TikTokIcon";
import { Facebook, Instagram } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useCallback } from "react";
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

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
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
  const { toast } = useToast();
  const navLinks = [
    { href: "#driver", label: "Meet Josh" },
    { href: "#services", label: "Services" },
    { href: "#surf-spots", label: "Surf Spots" },
    { href: "#why-us", label: "Why Us" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
    { href: "#book", label: "Book Now" },
  ];

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
                      Book via WhatsApp
                    </a>
                    <a
                      href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                      className="mt-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-heading font-bold text-sm flex items-center gap-2 hover:bg-primary/80 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {PHONE_NUMBER}
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
              El Salvador's Trusted Surf Taxi
            </p>
            <h1 className="font-heading font-extrabold text-[28px] leading-[1.2] text-primary mb-3 max-w-[320px] drop-shadow-md">
              Your Ride to Paradise Starts Here
            </h1>
            <p className="text-white/90 text-sm leading-relaxed max-w-[300px] drop-shadow-sm">
              Airport transfers, surf tours, and custom adventures — by a local who knows every hidden gem.
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
              El Salvador's Trusted Surf Taxi
            </p>
            <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-primary leading-tight mb-4 drop-shadow-md">
              Your Ride to Paradise Starts Here
            </h1>
            <p className="text-white/90 text-lg mb-6 leading-relaxed max-w-md drop-shadow-sm">
              Airport transfers, surf tours, and custom adventures — by a local who knows every hidden gem.
            </p>
            <div className="hidden md:flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink("Hi Josh! I'd like to book a ride from the airport.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-heading font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Book via WhatsApp
              </a>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
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
                Meet Your Driver
              </p>
              <h2 className="font-heading font-extrabold text-2xl md:text-4xl mb-4 md:mb-6">
                Hey, I'm Josh! 🤙
              </h2>
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
              <a
                href={whatsappLink("Hey Josh! I'd love to book a ride.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-heading font-bold text-sm inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Book Now
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

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">
              Testimonials
            </p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">What Our Clients Say</h2>
          </div>

          {/* Featured reviews */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "California, USA",
                text: "Josh made our entire trip to El Salvador stress-free! He picked us up from the airport, took us surfing, and even recommended the best local restaurants. Highly recommend!",
                stars: 5,
                avatar: reviewSarahImg,
              },
              {
                name: "Tyler B.",
                location: "San Diego, USA",
                text: "Josh took us to El Zonte and Punta Roca — two must-visit surf spots we never would have found on our own. He waited with the boards while we surfed and even joined us for a few sets. Absolute legend!",
                stars: 5,
                avatar: reviewCarlosImg,
              },
              {
                name: "Emily & Jake",
                location: "London, UK",
                text: "We booked Josh for a full day trip and it was the highlight of our vacation. His local knowledge is incredible and his van is super comfortable. 10/10!",
                stars: 5,
                avatar: reviewEmilyJakeImg,
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-primary/5 border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm md:text-base mb-6 flex-1 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-heading font-bold text-sm md:text-base">{review.name}</p>
                    <p className="text-muted-foreground text-xs md:text-sm">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic testimonials from database */}
          {dbTestimonials.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {dbTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-primary/5 border border-border rounded-2xl p-6 md:p-8 shadow-sm flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base mb-6 flex-1 italic">
                    "{t.message}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-heading font-bold text-lg">
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm md:text-base">{t.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Leave a Review button */}
          <div className="text-center mt-10">
            <ReviewModal onSubmitted={fetchTestimonials}>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-heading font-bold text-sm inline-flex items-center gap-2 hover:bg-primary/80 transition-colors">
                <MessageSquarePlus className="w-4 h-4" />
                Leave a Review
              </button>
            </ReviewModal>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">What We Offer</p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">Our Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {[
              {
                icon: Car,
                title: "Airport Transfers",
                desc: "Comfortable, on-time pickups and drop-offs at San Salvador International Airport (SAL). AC vehicle, flight tracking included.",
                img: serviceAirportImg,
              },
              {
                icon: Compass,
                title: "Surf Spot Tours",
                desc: "Hit El Tunco, El Zonte, Punta Roca and more. Josh knows the best breaks, tides, and hidden spots only locals find.",
                img: heroImg,
              },
              {
                icon: Camera,
                title: "Custom Day Trips",
                desc: "Explore Ruta de las Flores, Joya de Cerén, Lake Coatepeque and beyond. Fully personalised itineraries.",
                img: serviceDaytripImg,
              },
              {
                icon: Mountain,
                title: "Volcano & Nature Tours",
                desc: "Hike Volcán Santa Ana, explore national parks, and discover El Salvador's stunning landscapes with a local guide by your side.",
                img: serviceVolcanoImg,
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
                <div className="p-5 md:p-6 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <service.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-lg md:text-xl mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{service.desc}</p>
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
              La Libertad Coast
            </p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">Popular Surf Spots</h2>
            <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl mx-auto">
              El Salvador's Pacific coast is home to world-class waves. Josh will take you to the best breaks along the La Libertad coastline.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              {
                name: "El Tunco",
                desc: "The most famous surf beach in El Salvador. Perfect for beginners and party lovers with consistent waves and vibrant nightlife.",
                img: spotElTuncoImg,
                level: "All Levels",
              },
              {
                name: "El Sunzal",
                desc: "A world-renowned right-hand point break with long, clean rides. A favorite for intermediate to advanced surfers.",
                img: spotElSunzalImg,
                level: "Intermediate",
              },
              {
                name: "Punta Roca",
                desc: "El Salvador's most iconic wave — a powerful right-hand point break over rocks. The spot that put the country on the surf map.",
                img: spotPuntaRocaImg,
                level: "Advanced",
              },
              {
                name: "La Bocana",
                desc: "A mellow river-mouth break ideal for longboarders and beginners. Uncrowded waves in a laid-back setting.",
                img: spotLaBocanaImg,
                level: "Beginner",
              },
            ].map((spot) => (
              <div
                key={spot.name}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={spot.img}
                    alt={`${spot.name} surf spot, El Salvador`}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-secondary/90 text-secondary-foreground text-xs font-heading font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {spot.level}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Waves className="w-4 h-4 text-primary" />
                    <h3 className="font-heading font-bold text-lg">{spot.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{spot.desc}</p>
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
              Book a Surf Tour
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
                Why Choose Us
              </p>
              <h2 className="font-heading font-extrabold text-2xl md:text-4xl mb-6 md:mb-8">
                More Than Just a Ride
              </h2>
              <div className="space-y-5 md:space-y-6">
                {[
                  { icon: Shield, title: "Safe & Reliable", desc: "Licensed, insured, and always on time. Your safety is the top priority." },
                  { icon: Star, title: "Local Expertise", desc: "Born and raised in El Salvador — Josh knows every shortcut, every wave, every hidden restaurant." },
                  { icon: Clock, title: "24/7 Availability", desc: "Early flights? Late-night arrivals? No problem. Available around the clock." },
                  { icon: Users, title: "Bilingual Service", desc: "Fluent in English and Spanish — no communication barriers." },
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
              El Salvador Awaits
            </p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">Tourism Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: galleryBeachImg, alt: "Beautiful beach in El Salvador", span: "col-span-2 row-span-2" },
              { src: spotElTuncoImg, alt: "El Tunco beach at sunset with surfer and iconic rocks" },
              { src: spotPuntaRocaImg, alt: "Punta Roca — WSL Surf City El Salvador Pro" },
              { src: heroImg, alt: "Josh's surf taxi on the beach with surfboards" },
              { src: spotElSunzalImg, alt: "Surfer riding a wave at El Sunzal" },
              { src: serviceVolcanoImg, alt: "Volcano tour with friends at Volcán Santa Ana", span: "col-span-2 row-span-2" },
              { src: galleryPoolImg, alt: "Infinity pool with ocean view" },
              { src: gallerySunsetSurfImg, alt: "Sunset on El Salvador's Pacific coast" },
              { src: carImg, alt: "Airport pickup with surfboards and luggage" },
              { src: galleryPalmBeachImg, alt: "Tropical palm beach paradise" },
              { src: viewpointImg, alt: "Josh at scenic viewpoint with El Salvador flag" },
              { src: galleryFlightImg, alt: "Flying into El Salvador — your adventure begins" },
            ].map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl ${img.span || ""}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
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
              Get in Touch
            </p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">Contact Me</h2>
            <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-xl mx-auto">
              Have a question or want to plan your trip? Drop me a message!
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const subject = encodeURIComponent(`Message from ${contactName}`);
                const body = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\n${contactMessage}`);
                window.open(`mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`, "_self");
                toast({ title: "Opening your email client!", description: "Your message is ready to send." });
                setContactName("");
                setContactEmail("");
                setContactMessage("");
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="contact-name" className="block text-sm font-heading font-bold mb-1.5">Name</label>
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
                <label htmlFor="contact-email" className="block text-sm font-heading font-bold mb-1.5">Email</label>
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
                <label htmlFor="contact-message" className="block text-sm font-heading font-bold mb-1.5">Message</label>
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
                Send Message
              </button>
            </form>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-lg mb-3">Other Ways to Reach Me</h3>
                <div className="space-y-3">
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm">{EMAIL_ADDRESS}</span>
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
                    <span className="text-sm">{PHONE_NUMBER}</span>
                  </a>
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm">{PHONE_NUMBER}</span>
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm">El Salvador, Central America</span>
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
            Ready to Explore El Salvador?
          </h2>
          <p className="text-secondary-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10">
            Book your ride in seconds. Just send a WhatsApp message or give a
            quick call — Josh will take care of the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a
              href={whatsappLink("Hi Josh! I'd like to book a ride.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-accent text-accent-foreground px-8 py-4 rounded-xl font-heading font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6" />
              Book via WhatsApp
            </a>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-bold text-base md:text-lg flex items-center justify-center gap-3 hover:bg-primary/80 transition-colors"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
              {PHONE_NUMBER}
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
                <span className="font-heading font-extrabold text-xl text-primary">Josh's Surf Taxi</span>
              </div>
              <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-sm mb-6">
                Your trusted ride across El Salvador. Airport transfers, surf tours, and custom adventures — driven by a local who knows every hidden gem.
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
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-5 text-primary">Explore</h4>
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
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-5 text-primary">Get in Touch</h4>
              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  {EMAIL_ADDRESS}
                </a>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors group"
                >
                  <span className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  {PHONE_NUMBER}
                </a>
                <div className="flex items-center gap-3 text-secondary-foreground/70">
                  <span className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  El Salvador, Central America
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-secondary-foreground/10">
          <div className="container mx-auto px-5 md:px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary-foreground/50">
            <span>© {new Date().getFullYear()} Josh's Surf Taxi. All rights reserved.</span>
            <span>Made with 🤙 in El Salvador</span>
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
          WhatsApp
        </a>
        <a
          href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
          className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-heading font-bold text-sm flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
      </div>
    </div>
  );
};

export default Index;
