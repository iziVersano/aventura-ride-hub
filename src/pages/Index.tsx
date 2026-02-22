import heroImg from "@/assets/hero.jfif";
import vanImg from "@/assets/van.jfif";
import surfTaxiImg from "@/assets/surf-taxi.jfif";
import galleryBeachImg from "@/assets/gallery-beach.jfif";
import galleryPoolImg from "@/assets/gallery-pool.jfif";
import promoImg from "@/assets/promo.jfif";
import viewpointImg from "@/assets/viewpoint.png";
import logoImg from "@/assets/logo.png";
import serviceAirportImg from "@/assets/service-airport.jpg";
import serviceSurfImg from "@/assets/service-surf.jpg";
import serviceDaytripImg from "@/assets/service-daytrip.jpg";
import { Phone, MapPin, Shield, Star, Clock, Car, Compass, Camera, Users, Menu } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const WHATSAPP_NUMBER = "50370001234";
const PHONE_NUMBER = "+503 7000-1234";

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#driver", label: "Meet Josh" },
    { href: "#services", label: "Services" },
    { href: "#why-us", label: "Why Us" },
    { href: "#gallery", label: "Gallery" },
    { href: "#book", label: "Book Now" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b-2 border-primary shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 h-16 md:h-20">
          <img src={logoImg} alt="Josh's Surf Taxi logo" className="h-12 md:h-16 w-auto rounded-full" />
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
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-end pb-24 md:pb-20 pt-16">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Josh standing at scenic viewpoint with El Salvador flag"
            className="w-full h-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/20 to-transparent md:from-black/30 md:via-black/15 md:to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-5 md:px-4">
          <div className="max-w-xl">
            <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2 md:mb-3">
              El Salvador's Trusted Surf Taxi
            </p>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mb-3 md:mb-4">
              Your Ride to Paradise Starts Here
            </h1>
            <p className="text-secondary-foreground text-sm md:text-lg mb-5 md:mb-6 leading-relaxed max-w-md">
              Airport transfers, surf tours, and custom adventures — by a local who knows every hidden gem.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappLink("Hi Josh! I'd like to book a ride from the airport.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-heading font-bold text-base md:text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Book via WhatsApp
              </a>
              <a
                href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                className="bg-primary text-primary-foreground px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-heading font-bold text-base md:text-lg flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors shadow-lg"
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

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-14 md:py-20">
        <div className="container mx-auto px-5 md:px-4">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-primary font-heading font-bold text-xs md:text-sm tracking-widest uppercase mb-2">What We Offer</p>
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl">Our Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
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
                img: serviceSurfImg,
              },
              {
                icon: Camera,
                title: "Custom Day Trips",
                desc: "Explore Ruta de las Flores, Joya de Cerén, Lake Coatepeque and beyond. Fully personalised itineraries.",
                img: serviceDaytripImg,
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

      {/* ===== WHY CHOOSE US ===== */}
      <section id="why-us" className="py-14 md:py-20 bg-muted">
        <div className="container mx-auto px-5 md:px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <img
                src={vanImg}
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { src: galleryBeachImg, alt: "Beautiful beach in El Salvador" },
              { src: galleryPoolImg, alt: "Infinity pool with ocean view" },
              { src: promoImg, alt: "Scenic El Salvador landscape" },
              { src: viewpointImg, alt: "Josh at scenic viewpoint with El Salvador flag" },
              { src: surfTaxiImg, alt: "Surf taxi adventure" },
              { src: vanImg, alt: "Comfortable transport vehicle" },
            ].map((img, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl ${
                  i === 0 ? "col-span-2 row-span-2" : ""
                }`}
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
      <footer className="bg-foreground text-primary-foreground py-10 md:py-12 pb-28 md:pb-12">
        <div className="container mx-auto px-5 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={logoImg} alt="Josh's Surf Taxi" className="h-10 mb-4 brightness-0 invert rounded-full" />
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Your trusted ride across El Salvador. Airport transfers, surf
                tours, and custom adventures.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-primary">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#services" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Services</a>
                <a href="#why-us" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Why Choose Us</a>
                <a href="#driver" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Meet Josh</a>
                <a href="#gallery" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Gallery</a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-primary">Contact</h4>
              <div className="space-y-3 text-sm">
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE_NUMBER}
                </a>
                <a
                  href={whatsappLink("Hi Josh!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp
                </a>
                <div className="flex items-center gap-2 text-primary-foreground/70">
                  <MapPin className="w-4 h-4" />
                  El Salvador, Central America
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Josh's Surf Taxi. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-secondary/95 backdrop-blur-md border-t border-primary/30 px-4 py-3 flex gap-2">
        <a
          href={whatsappLink("Hi Josh! I'd like to book a ride.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-accent text-accent-foreground py-3 rounded-lg font-heading font-bold text-sm flex items-center justify-center gap-2"
        >
          <WhatsAppIcon className="w-4 h-4" />
          WhatsApp
        </a>
        <a
          href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
          className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-heading font-bold text-sm flex items-center justify-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
      </div>
    </div>
  );
};

export default Index;
