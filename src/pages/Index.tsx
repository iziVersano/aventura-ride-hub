import heroImg from "@/assets/hero.jfif";
import vanImg from "@/assets/van.jfif";
import surfTaxiImg from "@/assets/surf-taxi.jfif";
import galleryBeachImg from "@/assets/gallery-beach.jfif";
import galleryPoolImg from "@/assets/gallery-pool.jfif";
import promoImg from "@/assets/promo.jfif";
import viewpointImg from "@/assets/viewpoint.png";
import logoImg from "@/assets/logo.png";
import { Phone, MessageCircle, MapPin, Shield, Star, Clock, Car, Compass, Camera, Users, Menu } from "lucide-react";
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
    { href: "#services", label: "Services" },
    { href: "#why-us", label: "Why Us" },
    { href: "#driver", label: "Meet Josh" },
    { href: "#gallery", label: "Gallery" },
    { href: "#book", label: "Book Now" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-b-2 border-primary shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 h-24">
          <img src={logoImg} alt="Josh's Surf Taxi logo" className="h-20 w-auto rounded-full" />
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
              className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-semibold font-heading flex items-center gap-2 hover:opacity-90 transition-opacity"
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
                <nav className="flex flex-col gap-2 mt-8 font-heading">
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
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Josh standing at scenic viewpoint with El Salvador flag"
            className="w-full h-full object-cover object-right md:object-right object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/60 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-xl">
            <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-3">
              El Salvador's Trusted Surf Taxi
            </p>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-primary leading-tight mb-4">
              Your Ride to Paradise Starts Here
            </h1>
            <p className="text-secondary-foreground/90 text-base md:text-lg mb-6 leading-relaxed">
              Safe, reliable airport transfers, surf spot tours, and custom day
              trips across El Salvador — driven by a local who knows every wave
              and hidden gem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors shadow-lg border-2 border-primary"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-2">What We Offer</p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">Our Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: "Airport Transfers",
                desc: "Comfortable, on-time pickups and drop-offs at San Salvador International Airport (SAL). AC vehicle, flight tracking included.",
              },
              {
                icon: Compass,
                title: "Surf Spot Tours",
                desc: "Hit El Tunco, El Zonte, Punta Roca and more. Josh knows the best breaks, tides, and hidden spots only locals find.",
              },
              {
                icon: Camera,
                title: "Custom Day Trips",
                desc: "Explore Ruta de las Flores, Joya de Cerén, Lake Coatepeque and beyond. Fully personalised itineraries.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section id="why-us" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={vanImg}
                alt="Josh's Toyota taxi van"
                className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]"
              />
            </div>
            <div>
              <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-2">
                Why Choose Us
              </p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-8">
                More Than Just a Ride
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Shield, title: "Safe & Reliable", desc: "Licensed, insured, and always on time. Your safety is the top priority." },
                  { icon: Star, title: "Local Expertise", desc: "Born and raised in El Salvador — Josh knows every shortcut, every wave, every hidden restaurant." },
                  { icon: Clock, title: "24/7 Availability", desc: "Early flights? Late-night arrivals? No problem. Available around the clock." },
                  { icon: Users, title: "Bilingual Service", desc: "Fluent in English and Spanish — no communication barriers." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-11 h-11 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MEET YOUR DRIVER ===== */}
      <section id="driver" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-2">
                Meet Your Driver
              </p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-6">
                Hey, I'm Josh! 🤙
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                I've been driving visitors around El Salvador for over 5 years.
                Whether you're chasing waves at El Tunco, exploring Mayan ruins,
                or just need a safe ride from the airport — I've got you covered.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                My goal is simple: make your trip stress-free, safe, and
                unforgettable. Every ride comes with local tips, good vibes, and
                a clean, comfortable vehicle.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={whatsappLink("Hey Josh! I'd love to learn more about your services.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-foreground px-5 py-3 rounded-lg font-heading font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Say Hello
                </a>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={viewpointImg}
                alt="Josh at scenic viewpoint with El Salvador flag"
                className="rounded-2xl shadow-lg w-full object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-2">
              El Salvador Awaits
            </p>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl">Tourism Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 aspect-square"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOOKING CTA ===== */}
      <section id="book" className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-4">
            Ready to Explore El Salvador?
          </h2>
          <p className="text-secondary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
            Book your ride in seconds. Just send a WhatsApp message or give a
            quick call — Josh will take care of the rest.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappLink("Hi Josh! I'd like to book a ride.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground px-8 py-4 rounded-xl font-heading font-bold text-lg flex items-center gap-3 hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Book via WhatsApp
            </a>
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`}
              className="bg-secondary-foreground/10 border-2 border-secondary-foreground/30 text-secondary-foreground px-8 py-4 rounded-xl font-heading font-bold text-lg flex items-center gap-3 hover:bg-secondary-foreground/20 transition-colors"
            >
              <Phone className="w-6 h-6" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={logoImg} alt="Josh's Surf Taxi" className="h-10 mb-4 brightness-0 invert" />
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Your trusted ride across El Salvador. Airport transfers, surf
                tours, and custom adventures.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#services" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Services</a>
                <a href="#why-us" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Why Choose Us</a>
                <a href="#driver" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Meet Josh</a>
                <a href="#gallery" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">Gallery</a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
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
    </div>
  );
};

export default Index;
