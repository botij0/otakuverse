import { Link } from "react-router";
import { Heart, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              OtakuVerse
            </h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for discovering anime and manga. Powered by
              MyAnimeList data.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Anime</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/anime/top" className="hover:text-primary transition-colors">
                  Top Anime
                </Link>
              </li>
              <li>
                <Link
                  to="/anime/seasonal"
                  className="hover:text-primary transition-colors"
                >
                  Seasonal Anime
                </Link>
              </li>
              <li>
                <Link to="/anime/search" className="hover:text-primary transition-colors">
                  Search Anime
                </Link>
              </li>
              <li>
                <a
                  href="/anime/recommendations"
                  className="hover:text-primary transition-colors"
                >
                  Recommendations
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Manga</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/manga/top" className="hover:text-primary transition-colors">
                  Top Manga
                </a>
              </li>
              <li>
                <a href="/manga/search" className="hover:text-primary transition-colors">
                  Search Manga
                </a>
              </li>
              <li>
                <a
                  href="/manga/recommendations"
                  className="hover:text-primary transition-colors"
                >
                  Recommendations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Characters</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/character/top" className="hover:text-primary transition-colors">
                  Top Characters
                </a>
              </li>
              <li>
                <a
                  href="/character/search"
                  className="hover:text-primary transition-colors"
                >
                  Search Character
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/botij0"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/javier-gonzalez-soldado/"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Botij0. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 fill-accent text-accent" /> for anime fans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
